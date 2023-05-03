---
layout: blog
title: "Migrating to Spring Boot 3"
description: "Some tips for migrating to Spring Boot 3"
author: tom
publishdate: "2023-05-03"
featureImage: aws-cdk-migration-guide
toc: true
slug: migrate-to-spring-boot-3
---

With Spring Boot 3 available for a bit now, we thought to share our experience with migrating some codebases from Spring Boot 2 to Spring Boot 3.

So, here are some things that we stumbled over then migrating. If you're thinking about migrating, this might help you on your journey!

## JDK 17

The elephant in the room. Spring 6 (and by extension Spring Boot 3) now compiles against JDK17. By extension, this means that we have to compile our Spring Boot applications against JDK17, too.

In a Maven project, it looks like this:

```
<properties>
    <maven.compiler.source>17</maven.compiler.source>
    <maven.compiler.target>17</maven.compiler.target>
</properties>
```

We can compile against higher versions than JDK17, too, of course.

Aside from compiling against JDK17, we also need to make sure that the runtime of our application contains a JDK17 or higher. So, if running in Docker, we need to make sure that the base Docker image we're using has a JDK17 instead of an older JDK.

## Jakarta namespace

You might have heard that much of the `javax` namespace has moved to the `jakarta` namespace. Spring 6 has now embraced that change and changed all the dependencies on the old `javax` artifacts over to the newer `jakarta` artifacts.

This means that we need to use `jakarta.Servlet` in our imports rather than `javax.Servlet`, for example. Aside from Servlet API, some annotations have moved from `javax` to `jakarta`, too.

Yeah, this `javax` to `jakarta` thing is messy (as [this article](https://blog.ltgt.net/javax-jakarta-mess-even-worse/) is pointing out).

However, I didn't have much trouble migrating some libraries to the new namespace. First, I replaced the `javax` dependency with the `jakarta` dependency:

So, instead of this:
```
<dependency>
    <groupId>javax.servlet</groupId>
    <artifactId>javax.servlet-api</artifactId>
</dependency>
```

I now had this:
```
<dependency>
    <groupId>jakarta.servlet</groupId>
    <artifactId>jakarta.servlet-api</artifactId>
</dependency>
```

This would cause a lot of compile errors in the codebase, because the compiler can't find the `javax.*` imports anymore.

So, the next step was a global search & replace to replace all occurrences of `import javax.servlet` with `import jakarta.servlet`. This would fix all imports regarding the servlet API.

In some cases, the code had been using an annotation from the `javax` package so I did another search to replace all occurrences of `import javax.annotation` with `import jakarta.annotation`.

## `@ConstructorBinding`

When using Spring Boot's `@ConfigurationProperties`, we usually want to make them immutable. That means final fields and no setters. Until now, we had to tell Spring to bind configuration properties via the constructor by adding the `@ConstructorBinding` annotation:

```
@ConstructorBinding
@ConfigurationProperties("flyway")
public class FlywayProperties {

    private final boolean migrateOnStartup;

    public boolean isMigrateOnStartup() {
        return migrateOnStartup;
    }

    public FlywayProperties(@DefaultValue("false") boolean migrateOnStartup) {
        this.migrateOnStartup = migrateOnStartup;
    }
}
```

With Spring Boot 3, we no longer need to use the `@ConstructorBinding` annotation (unless there is more than one constructor).

The `@ConstructorBinding` annotation is no longer applicable to types (i.e. the `@Target` has changed). If you have annotated a class, you will get the following error:

```
annotation interface not applicable to this kind of declaration
```

The annotation `org.springframework.boot.context.properties.ConstructorBinding` has also been deprecated in favor of a new annotation with the same name in another package: `org.springframework.boot.context.properties.bind.ConstructorBinding`.

So, what do we need to do?
- remove the `@ConstructorBinding` annotation from all classes that only have a single constructor
- in classes that have more than one constructor, leave the `@ConstructorBinding` annotation on the constructor that Spring Boot should use, and fix the import from `import org.springframework.boot.context.properties.ConstructorBinding` to `import org.springframework.boot.context.properties.bind.ConstructorBinding`.

### Using IntelliJ's Structural Search

You can use IntelliJ’s “Structural search and replace” functionality to remove all invalid `@ConstructorBinding` annotations on classes.

1.  Settings → Editor → General → Auto Import → enable “Optimize imports on the fly” (so that you don’t have to remove the imports manually).

2.  Edit → Find → Replace Structurally

3.  Use this as the search template:
   ```
   @org.springframework.boot.context.properties.ConstructorBinding
   class $Class${

   }
   ```

4.  Use this as the replace template:
   ```
   class $Class${ 2 3}
   ```


## Deprecation of Spring Cloud Sleuth

The [Spring Cloud Sleuth](https://github.com/spring-cloud/spring-cloud-sleuth/tree/main "https://github.com/spring-cloud/spring-cloud-sleuth/tree/main") project has been deprecated in favour of Micrometer:

> Spring Cloud Sleuth’s last minor version is 3.1. You can check the [3.1.x](https://github.com/spring-cloud/spring-cloud-sleuth/tree/3.1.x "https://github.com/spring-cloud/spring-cloud-sleuth/tree/3.1.x") branch for the latest commits.
>
> The core of this project got moved to [Micrometer Tracing](https://micrometer.io/docs/tracing "https://micrometer.io/docs/tracing") project and the instrumentations will be moved to [Micrometer](https://micrometer.io/ "https://micrometer.io/") and all respective projects (no longer all instrumentations will be done in a single repository.

If you try to use Spring Cloud Sleuth with Spring Boot 3, you will get warnings in your log that link to the [migration guide](https://github.com/micrometer-metrics/tracing/wiki/Spring-Cloud-Sleuth-3.1-Migration-Guide "https://github.com/micrometer-metrics/tracing/wiki/Spring-Cloud-Sleuth-3.1-Migration-Guide"). Follow the steps there if you currently depend on Sleuth.


## `ObservationRegistry`

Spring Boot 3 will auto-configure an `ObservationRegistry` bean for us. From what I understand, Micrometer has now introduced the generic concept of an `Observation`, that covers all metrics, logging, and tracing.

This means we can make use of the `ObservationRegistry` to implement all things observability.

Spring Boot 3 will still auto-configure a `MeterRegistry` bean, however, so there won't be a breaking change

Other changes in observability:

-   Bean implementing the `MeterBinder` interface are now bound to meter registries only after all singleton beans have been initialized.
-   `SpanCustomizer` beans for Brave and OpenTelemetry are now auto-configured.


## Auto-Configurations

Spring Boot 3 rethinks the way auto-configurations work.

As a refresher: an auto-configuration is a Spring `@Configuration` class that will be loaded by Spring Boot automatically when the application starts, potentially depending on some conditions (that we can define via one or more of the `@Conditional...` annotations).

The old way of writing auto-configurations was this:

-   create a `@Configuration` class
-   add it to the file `META-INF/spring.factories` under the key `org.springframework.boot.autoconfigure.EnableAutoConfiguration`

Spring Boot 2.7 has introduced a new way of defining auto configurations, and Spring Boot 3 has now dropped the old way. The new way is:

-   create a `@AutoConfiguration` class
-   add it to the file `META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports`

Note that you can do this change in Spring Boot 2.7 already, as a preparation for moving to Spring Boot 3! This will make the jump to Spring Boot 3 a bit smaller.

## `HttpStatusCode` interface

Spring 6 has introduced the `HttpStatusCode` interface. Some methods that previously returned an `HttpStatus` enum constant will now return an `HttpStatusCode` object (which most likely is still an `HttpStatus` enum constant under the hood, because that now implements the `HttpStatusCode` interface.

Example:
```
HttpStatus responseStatus = restTemplate
  .postForEntity(localhost("/flywayMigrate"), request(), String.class)
  .getStatusCode(); // <-- will cause compile error because it now returns HttpStatusCode and not HttpStatus!
```

So, we'll have to update all calls to `getStatusCode()` and then transform the `HttpStatusCode` object into the object we need to satisfy the compiler.

## Configuration property changes

Spring Boot 3 has changed the names of a bunch of configuration properties.

**Example:** `management.metrics.export.statsd.enabled` has moved to `management.statsd.metrics.export.enabled`.

A list of all the changed properties can be found in the [configuration changelog](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-3.0.0-Configuration-Changelog "https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-3.0.0-Configuration-Changelog").

So make sure to go through these and change all configuration properties to their new names!

## Spring Boot Migrator

The [Spring Boot Migrator](https://github.com/spring-projects-experimental/spring-boot-migrator) project aims to make upgrading to Spring Boot 3 as easy as possible. You run it against the codebase of your Spring Boot application and it creates an HTML report that lists all the necessary changes.

For many changes, it provides a button that you can click for it to make the change for you. It will then create a local commit against your Git repository with the changes for your to test afterward.

Sadly, the tool does NOT work for libraries. It has to be a Spring Boot application to work.

## Resources
- [Spring Boot 3 Migration Guide](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-3.0-Migration-Guide)
- [Spring 6 Migration Guide](https://github.com/spring-projects/spring-framework/wiki/Upgrading-to-Spring-Framework-6.x)
