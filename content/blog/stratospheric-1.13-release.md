---
layout: blog
title: "Stratospheric 1.13 Release 🥳"
description: "Release notes for the Stratospheric 1.13 ebook release"
author: tom
publishdate: "2023-10-03"
featureImage: cloud-rocket-launch-two
toc: true
slug: stratospheric-1.13-release
---

It's time for a new Stratospheric eBook release 🥳

With the latest release we did some general maintenance and housekeeping.

Previously, throughout the book, there were links to chapter-specific example applications. For each chapter, we had an example application in our [repository](https://github.com/stratospheric-dev/stratospheric) in the minimal state needed for the given chapter. This turned out to be a maintenance nightmare. Each time we changed something in the text of one chapter, we had to do the corresponding changes not only in that chapter's example application, but also in many others. We forgot to update the code in a few places, which led to a bad reader experience in a couple of cases.

So, we decided to ditch the chapter-specific example applications (except in very few cases) and instead link to the finished example application in all chapters. This will hopefully lead to a better reader experience overall.

In addition to this, we added two quality-of-life features to the book.

The first is a small change in the chapter "Designing a CDK Project". After publishing the CDK app, you have to find the public IP address of the app to test it. Previously the book only explained via text how to find the IP address in the AWS Console. We added a screenshot and some additional text to help you find the IP address more easily.

The second quality-of-life feature is a new CDK app that automatically creates the IAM permissions you need to deploy the app from a GitHub Actions workflow. Previously, we explained which permissions you needed, but you had to set up those permissions manually. With the new [GitHubActionsApp](https://github.com/stratospheric-dev/stratospheric/blob/main/cdk/src/main/java/dev/stratospheric/todoapp/cdk/GitHubActionsApp.java), this has become much more comfortable.

With our goal to keep the content relevant and up-to-date, we sometimes fail to keep the manuscript in sync or miss sections to adjust. Feel free [to report](https://github.com/stratospheric-dev/stratospheric/issues/new/choose) any inconsistencies as soon as you find them.

» [Get Stratospheric 1.13](https://leanpub.com/stratospheric)

If you've already purchased the eBook, you can now download the latest version at no extra charge in your [Leanpub Book Library](https://leanpub.com/user_dashboard/library).

For further questions, feedback, or errata, either drop us a message ([info@stratospheric.dev](info@stratospheric.dev)) or open an [issue at the GitHub repository](https://github.com/stratospheric-dev/stratospheric/issues).

