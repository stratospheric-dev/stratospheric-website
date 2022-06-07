---
layout: blog
title: Faster ECS Deployments
description: "Optimizations in our ECS deployment setup"
author: bjoern
publishdate: "2022-06-09"
featureImage: containers
toc: true
slug: faster-ecs-deployments
---

Some time ago, [Nathan Peck](https://nathanpeck.com/), who is a senior developer advocate for Container Services at AWS,  wrote [this in-depth article on speeding up Amazon ECS container deployments](https://nathanpeck.com/speeding-up-amazon-ecs-container-deployments/).

Independent consultant Tobias Schmidt, in turn, neatly summarized that article's crucial takeaways [in this tweet](https://twitter.com/tpschmidt_/status/1433470197361520648).

Essentially, optimizing ECS deployment speeds boils down to:

- Adapting ECS agent settings to both reduced shutdown grace periods and prefer cached Docker images.
- Customizing your load balancer settings to reduce keep-alive time for connections and limit health check intervals.
- Decreasing the minimum number of healthy tasks in the deployment configuration to allow ECS to start more tasks in parallel.

Since our own deployments for our [sample Todo application](https://app.stratospheric.dev/) used to clock in at 12-13 minutes on average, we thought we might give those optimizations a try, to see if we can shave off at least some of that time. After all, fast deployments and - consequently - fast turnaround times make for a vital part of a good developer experience. 

Being able to see the effect of our changes in a test environment or production in a timely manner allows us to test, experiment, and iterate rapidly. A product that can be changed frequently and easily, in turn, is much more amenable to changing requirements and an approach to product developments that favors experiments and frequent iterations over rigid planning and huge monolithic deployments.

Now, since we're using [ECS on Fargate](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html) (i.e. we don't specify our own EC2 instances, because Fargate does that for us), we don't directly use [Amazon Machine Images (AMIs)](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html), but rather the abstractions [AWS Fargate](https://aws.amazon.com/fargate/) provides us with.

Unfortunately, this (apparently) precludes our deployment process from using the environment-based optimizations outlined in both Nathan's article and Tobias's tweet: As detailed in [the official AWS documentation and Amazon ECS container agent configuration](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-agent-config.html)
the `ECS_CONTAINER_STOP_TIMEOUT` and `ECS_IMAGE_PULL_BEHAVIOR` environment variables have to be set in the Amazon ECS-optimized AMI's `/etc/ecs/ecs.config` configuration file.

However, with Fargate we neither have access to the underlying AMI nor the configuration files it contains. So far, we haven't been able to find an alternative way of customizing these settings. If you know how to achieve this with Fargate, [please get in touch](mailto:info@stratospheric.dev).

Anyway, there were still some potential optimization to try out with our own setup, that is those about the health check intervals and timeouts.

To try and address those opportunities for improvement, we had to take a look at our [Stratospheric CDK Constructs library](https://github.com/stratospheric-dev/cdk-constructs), which provides the [CDK constructs](https://docs.aws.amazon.com/cdk/v2/guide/constructs.html) for our core infrastructure. Specifically, we needed to modify our [`Network`](https://github.com/stratospheric-dev/cdk-constructs/blob/main/src/main/java/dev/stratospheric/cdk/Network.java) and [`Service`](https://github.com/stratospheric-dev/cdk-constructs/blob/main/src/main/java/dev/stratospheric/cdk/Service.java) classes, because those are the ones responsible for our load balancer and setup.

In `Network` we made the following change to our `IApplicationTargetGroup` to account for both the recommended setting for `deregistration_delay.timeout_seconds` and the ones for `HealthCheckIntervalSeconds` and `HealthyThresholdCount` from Nathan's article:

```
// ...
      .healthCheck(
        HealthCheck
          .builder()
          .healthyThresholdCount(2)
          .interval(Duration.seconds(10))
          .timeout(Duration.seconds(5))
          .build()
      )
// ...
```

It's worth noting here that we have to explicitly define a timeout of `Duration.seconds(5)` (i.e. less than the health check interval here, because otherwise we'd get this deployment time error from [AWS Elastic Load Balancing](https://aws.amazon.com/elasticloadbalancing/) (thanks to our reader *grr lgd* for pointing this out): "Health check interval must be greater than timeout."

Also note that we opted for an interval of 10 seconds here, rather than the 5 seconds suggested in Nathan's article, in order for the timeout value not having to be too low and still allow our instances to spin up without the health check kicking in.

In `Service`, on the other hand, we added a new `deregistrationDelayConfiguration` as well as a `stopTimeout(2)` to our `CfnTargetGroup` to accommodate the suggestions for the `deregistration_delay.timeout_seconds` and `ECS_CONTAINER_STOP_TIMEOUT` settings from Nathan's article:

```
// ...
    List<CfnTargetGroup.TargetGroupAttributeProperty> deregistrationDelayConfiguration = List.of(
      CfnTargetGroup.TargetGroupAttributeProperty.builder().key("deregistration_delay.timeout_seconds").value("5").build()
    );
// ...
```

```
// ...
    List<CfnTargetGroup.TargetGroupAttributeProperty> deregistrationDelayConfiguration = List.of(
      CfnTargetGroup.TargetGroupAttributeProperty.builder().key("deregistration_delay.timeout_seconds").value("5").build()
    );
// ...
```

With these rather small changes, our deployment times are now down to about 5-6 minutes on average (from an original 12-13 minutes)! So, we're talking about a 50 percent improvement here, which is no small feat, especially in case of frequent, parallel builds and deployments.

That's it for the relevant modifications to our setup in terms of optimizing ECR deployments. If you have any questions, comments, or suggestions [please get in touch](mailto:info@stratospheric.dev).
