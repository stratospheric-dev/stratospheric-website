---
layout: blog
title: Migrating Java AWS CDK v1 Projects to AWS CDK v2 🏗
description: "General tips and recommendations for migrating a Java AWS CDK v1 project to AWS CDK v2."
author: philip
publishdate: "2022-06-03"
featureImage: aws-cdk-migration-guide
toc: true
slug: java-aws-cdk-v1-to-v2-migration-guide
---

This article provides some guidance and tips for migrating your existing infrastructure setup from the AWS CDK v1 to v2.

We've recently performed this migration for the entire AWS CDK Java infrastructure for [Stratospheric](/).

## Adjusting the Java Infrastructure Setup

Every stable AWS CDK construct is now part of a single library. This simplifies the import for our Maven project as we don't have to add a dependency for each AWS service, as was the case with the AWS CDK v1.

We now depend on a single artifact and hence can remove all previous dependency declarations:

{{< linebreak >}}


```xml
<dependency>
  <groupId>software.amazon.awscdk</groupId>
  <artifactId>aws-cdk-lib</artifactId>
  <version>2.8.0</version>
</dependency>
```

L1 constructs (the counterparts for CloudFormation's `CfnXXXX` entities) are now considered stable for all AWS services. If we want to use experimental L2 and L3 constructs, we need to import them specifically as `aws-cdk-lib` only contains stable constructs.

The `Construct` class that we use when defining our own L2 or L3 construct has moved to a dedicated package:

{{< linebreak >}}

```xml
<dependency>
  <groupId>software.constructs</groupId>
  <artifactId>constructs</artifactId>
  <version>10.0.43</version>
</dependency>
```

After replacing the old AWS CDK v1 dependency imports, we have to adjust the import statements for the Construct class and some other CDK-specific classes.
We might have to adjust the infrastructure setup on rare occasions as some methods might no longer be available. For the Stratospheric setup, this happened in two places:

- the subnet type `SubnetType.ISOLATED` is now `SubnetType.PRIVATE_ISOLATE `
- when passing dimensions for a CloudWatch metric, the dimensions method was replaced with dimensionsMap

From version 0.1.0 onwards, our [cdk-constructs library](https://github.com/stratospheric-dev/cdk-constructs) only supports the AWS CDK v2.

Once the Maven project compiles, we can move to the next step and prepare the migration.

## Preparing the Migration

To deploy our CDK constructs, we now need a 2.x version of the CDK Toolkit (which we install with NPM). The CDK v2 toolkit is backwards-compatible with CDK v1. However, the AWS CDK team suggests not installing v2 globally if you have projects using both v1 and v2. A better approach is to use **npx** (a package runner, which has been part of NPM since version 5.2) and create an alias:

{{< linebreak >}}

```shell
alias cdk1="npx aws-cdk@1.x"
alias cdk="npx aws-cdk@2.x"
```

Next, remove all feature flags in the `cdk.json` file that are part of the context attribute and start with `@aws-cdk/` . There's only a small subset of CDK v1 feature flags that can be used with CDK v2. You'll find those flags as part of the [AWS migration guide](https://docs.aws.amazon.com/cdk/v2/guide/migrating-v2.html).

## Performing the Migration

Before we can deploy our CDK v2 constructs, we have to re-bootstrap our account. Therefore, we run cdk bootstrap using the CDK v2 toolkit. This will override the CDK v1 bootstrapping and add [some more AWS resources](https://docs.aws.amazon.com/cdk/v2/guide/bootstrapping.html) to our AWS account that the CDK needs internally.

Now it's time to re-deploy our stacks. We can use the cdk diff command to ensure nothing changes except internal CDK metadata and updated hashes. Changes to the logical IDs of our resources would result in a replacement of these resources but are not expected. **Carefully read the result of the diff before re-deploying the stacks**.

Congrats, you're now using the AWS CDK v2!

Further references:

- the [CDK v2 API reference](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-construct-library.html)
- the official [AWS CDK v2 migration guide](https://docs.aws.amazon.com/cdk/v2/guide/migrating-v2.html) for more information

PS: If you're stuck migrating to the AWS CDK v2, don't hesitate to ask a question in our Stratospheric Slack community.

Cheers,

Tom, Philip, Björn
