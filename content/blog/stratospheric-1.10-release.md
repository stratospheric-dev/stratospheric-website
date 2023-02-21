---
layout: blog
title: "Stratospheric 1.10 Release 🥳"
description: "Release notes for the Stratospheric 1.10 ebook release"
author: philip
publishdate: "2023-02-21"
featureImage: cloud-rocket-launch-three
toc: true
slug: stratospheric-1.10-release
---

It's time for a new Stratospheric eBook release 🥳

This time it's a pretty big one, as we've migrated the Stratospheric sample Todo application to **Spring Boot 3.0 and Spring Cloud AWS 3.0**.

The release of Spring Boot 3.0 marks a new era of developing applications with the Spring Framework. 4.5 years after the release of Spring Boot 2.0, we're now looking into a bright future and can make the most of **Spring Framework 6, Java 17, and GraalVM**.

Even though [Spring Boot 3.0 went GA in November 2022](https://spring.io/blog/2022/11/24/spring-boot-3-0-goes-ga), it took us some time to incorporate the changes and wait for a compatible [Spring Cloud AWS](https://awspring.io/) version. With the release of Spring Cloud AWS 3.0.0-RC1 we doubled down on the migration and wanted to provide a Spring Boot 3.0 compatible version of the ebook as soon as possible.

While you may want to wait until a GA version of Spring Cloud AWS 3.0 is released, our main goals is to move fast so that you have a blueprint for the migration path. Please note that things might still change, and we're closely following the development and will update to a GA version as soon as it is available.

With the migration to Spring Cloud AWS 3.0, we also applied various new features and improvements. For example, we're now using the new DynamoDB integration to simplify how we interact with DynamoDB in our Spring Boot application.

When it comes to breaking changes, these are the most important ones:

- Spring Cloud AWS: Namespace changes from `cloud.aws` to `spring.cloud.aws`
- Spring Cloud AWS: Usage of the AWS SDK v2 (coming from `software.amazon.awssdk` - no longer `com.amazonaws` This applies to any direct usage of the AWS SDK client APIs.
- Spring Cloud AWS: Usage of the new `SqsTemplate` as a successor of the `QueueMessagingTemplate`
- Spring Security: Removal of `mvcMatchers` in favor of `requestMatchers`
- Spring Core: Migration from the `javax` to the `jakarta` namespace
- Spring Core: Java 17 as a baseline

For a side-by-side comparison of the required code changes for the migration, have a look the [commit that introduced Spring Boot 3.0 and Spring Cloud AWS 3.0](https://github.com/stratospheric-dev/stratospheric/commit/dee3c97fca94e7c60c9a4eff2adaed44a1c71b0b).

Furthermore, we simplified the retrieval of the Cognito user pool client secret as part of our CDK setup. Thanks to Giulio ([giuliopulina](https://github.com/giuliopulina)) for [suggesting this improvement](https://github.com/stratospheric-dev/stratospheric/issues/169).

There is *one caveat* with the migration: As of now, there's no Spring Boot 3.0 compatible release for the Spring Boot Starter for Active MQ. As a workaround, we're still using Spring Boot 2.7.X for that area of our sample application. While mixing different Spring Boot versions within the same application is something to avoid, we didn't want to postpone this ebook release. The application works as expected, and we're working on a small refactoring to also bump this area to Spring Boot 3.0.

With our goal to keep the content relevant and up-to-date, we sometimes fail to keep the manuscript in sync or miss sections to adjust. Feel free [to report](https://github.com/stratospheric-dev/stratospheric/issues/new/choose) any inconsistencies as soon as you find them.

» [Get Stratospheric 1.10](https://leanpub.com/stratospheric)

If you've already purchased the eBook, you can now download the latest version at no extra charge in your [Leanpub Book Library](https://leanpub.com/user_dashboard/library).

For further questions, feedback, or errata, either drop us a message ([info@stratospheric.dev](info@stratospheric.dev)) or open an [issue at the GitHub repository](https://github.com/stratospheric-dev/stratospheric/issues).

PS: We're currently preparing and recording the remaining lessons for the [Stratospheric online course](https://stratospheric.dev/online-course/). Up until the last course lesson is available, you can enroll with a discount as part of our [early-bird offer](https://stratospheric.dev/online-course/#early-bird).
