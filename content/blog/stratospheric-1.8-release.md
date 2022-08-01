---
layout: blog
title: "1 Year Anniversary Sale and Release 1.8"
description: "1 Year Anniversary Sale and Release 1.8"
author: tom
publishdate: "2022-08-01"
featureImage: cloud-rocket-launch-one
toc: true
slug: stratospheric-1.8-release
---

It's been exactly one year since we have released version 1.0 of the Stratospheric book.

The book already has 900 readers on Leanpub. Let's make it 1,000 this month!

We want to celebrate the anniversary with you by releasing version 1.8 of the book and doing an anniversary sale. Read more below.

## Stratospheric Book Release 1.8

Today, we released version 1.8 of the Stratospheric book. Let's look at the changes we deliver with this release!

In the chapter about tracing user actions, we're making use of DynamoDB. Previously, we relied on custom code within our demo application to create our DynamoDB table. Starting in this release, **we're taking advantage of Amazon CDK to create the DynamoDB table for us**. This streamlines the setup because we're using CDK for all the other infrastructure and hopefully makes for a better developer experience.

Across a couple of chapters, **we have addressed some issues to improve security**. Instead of allowing access to certain resources to ALL other AWS resources by using the `*` wildcard, we're not narrowing down the allow list to only those roles and resources who really need the access.

Finally, in the user registration chapter, we have **removed the deprecated usage of `WebSecurityConfigurerAdapter`** and instead created a `SecurityFilterChain` Spring bean to configure the security of our web app to make it future-proof.

If you already own a copy of Stratospheric, you can now get the newest version in your [Leanpub library](https://leanpub.com/user_dashboard/library).

## Anniversary Sale

If you don't own a copy of the Stratospheric ebook yet, you can **get it for 50% of the original price until Sunday, August 8**!

**Use the link below to get your discounted copy today!** If you already own a copy and want to spread some love for Spring Boot and AWS, please share this link with your co-workers and friends!

» **[Get the Anniversary Discount](https://leanpub.com/stratospheric/c/k6SGIM3B5Qo0)**

For further questions, feedback, or errata, either drop us a message (info@stratospheric.dev) or open an [issue at the GitHub repository](https://github.com/stratospheric-dev/stratospheric/issues).
