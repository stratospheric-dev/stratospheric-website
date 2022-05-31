# Stratospheric Landing Page & Blog

## Local Development

1. [Install Hugo](https://gohugo.io/getting-started/installing/) (e.g., `brew install hugo`)
2. Make sure you're running Node >= 16 `node -v`
3. Build the thumbnail `.webp` images with `npm run images:optimize`
4. Run the development server with `hugo server -D`
5. Visit `http://localhost:1313` to visit the site (changes made to the site are hot reloaded)
6. Build the static content with `hugo --minify`

## Create a New Site

Create a new single site (like `/privacy` ) with `hugo new my-site.html`. You can now add HTML content (`content/my-site.html`) to this site below the last `---`.

## Create a New Blog Post

Create a new blog post with `hugo new blog/my-first-post.md`. Add the article content and finally remove `draft` to publish the article.

Make sure the following metadata exists for each blog post:

```
layout: blog
title: Stratospheric 1.6 Release 🥳
description: "Release notes for the Stratospheric 1.6 Release"
author: philip
publishdate: "2022-03-31"
featureImage: release-image-cloud
slug: stratospheric-1.6-release
```
