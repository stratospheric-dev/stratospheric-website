---
layout: blog
title: Stratospheric 1.7 Release 🥳
description: "Release notes for the Stratospheric 1.7 ebook release"
author: philip
publishdate: "2022-07-13"
featureImage: cloud-rocket-launch-one
toc: true
slug: stratospheric-1.7-release
---

It's time for a new Stratospheric eBook release 🥳

With [this bug](https://github.com/stratospheric-dev/stratospheric/issues/117) as additional motivation, we took the opportunity to invest some time into refactoring and adding a test suite to our sample Todo app for improving code coverage: We've added both an integration test to cover the CRUD operations for our `Todo` entity and a basic web test for verifying interaction with the OAuth 2 login and for ensuring the crucial pages of our app render properly.

Although there's no dedicated section in the book about testing (yet), if you're curious, you can have a sneak peek at the `src/test/resources` folder of our application [at GitHub](https://github.com/stratospheric-dev/stratospheric/tree/main/application/src/test).

Once we'll have finished our current [online course efforts](https://stratospheric.dev/online-course/), we'll get back to the subject of testing and dedicate an entire chapter about testing to the book! In the meantime, check out the various articles about testing on [Philip's blog](https://rieckpil.de/all-posts/).

Furthermore, with the revision v1.7 of Stratospheric, we changed the following:

- We added Apple M1 processor (ARM64) support for local development by upgrading to the latest Keycloak and LocalStack Docker images, respectively.
- We favored custom properties over Spring profiles for loading beans and configuring the application (see [this article](https://reflectoring.io/dont-use-spring-profile-annotation/) for the rationale behind this).
- Basic refactoring efforts for the `TodoService` and `TodoController`. The previous implementation admittedly was a bit sloppy.

Thanks again for supporting us and our work. Remember, every [mailing list subscriber](/#mailing-list) gets 30% off the final price of the eBook.

» [Get Stratospheric 1.7](https://leanpub.com/stratospheric)

If you've already purchased the eBook, you can now download the latest version at no extra charge in your [Leanpub Book Library](https://leanpub.com/user_dashboard/library).

For further questions, feedback, or errata, either drop us a message (info@stratospheric.dev) or open an [issue at the GitHub repository](https://github.com/stratospheric-dev/stratospheric/issues).

PS: We're about to upload the next videos for the [Stratospheric online course](https://stratospheric.dev/online-course/). You can expect more information about this topic in the next few days.
