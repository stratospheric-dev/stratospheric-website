---
layout: blog
title: Stratospheric 1.6 Release 🥳
description: "Release notes for the Stratospheric 1.6 ebook release"
author: philip
publishdate: "2022-03-31"
featureImage: cloud-rocket-launch-two
toc: true
slug: stratospheric-1.6-release
---

It's time for a new Stratospheric eBook release 🥳

We somehow entirely missed talking about an important topic: Bootstrapping an AWS environment for the AWS CDK.

You may have already run into this issue when trying to deploy one of our AWS CDK stacks:

<br/><br/>

```
Has the environment been bootstrapped? Please run 'cdk bootstrap'
```

We've now added a dedicated section on the AWS environment bootstrapping and explained the why & how.

In short, with the revision v1.6 of Stratospheric, we changed the following:

- added a new section on bootstrapping an AWS environment (thanks to [ThomasSchmidt81](https://github.com/ThomasSchmidt81) for [reporting this](https://github.com/stratospheric-dev/stratospheric/issues/93))
- added the required policies for the technical GitHub Actions user to the appendix
- improved the CI/CD chapter to help with more easily locating the corresponding GitHub Actions files (thanks to [stevenschewenke](https://github.com/stevenschwenke) for [reporting this](https://github.com/stratospheric-dev/stratospheric/issues/66))
- migrated to PostgreSQL 12.9

Thanks again for supporting us and our work. Remember, every [mailing list subscriber](/#mailing-list) gets 30% off the final price of the eBook.

» [Get Stratospheric 1.6](https://leanpub.com/stratospheric)

If you've already purchased the eBook, you can now download the latest version at no extra charge in your [Leanpub Book Library](https://leanpub.com/user_dashboard/library).

For further questions, feedback, errata, either drop us a message (info@stratospheric.dev) or open an [issue at the GitHub repository](https://github.com/stratospheric-dev/stratospheric/issues).
