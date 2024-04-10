---
# layout: '@layouts/markdown-post-layout.astro'
title: 'Sample SPA using AngularJs MVC5/Web API and Google Maps'
published: 2015-07-06
description: 'Sample SPA using AngularJs MVC5/Web API and Google Maps'
image: '@assets/posts/placeholder-alien-city.png'
tags: ["default"]
---

Created a sample .NET MVC5 Single Page application that displays a list of events and displays a Google map of the location for each event.

A Next button allows the user to navigate each event such that the Google Map is updated with the address for the currently selected event.

The application used AngularJs to retrieve data from the Web Api.

It took me around 3 days to build and deploy the app. The first day I had to learn the basics of Angular. The second day was spent on the Google Maps api. And the third was spent in putting it all together in an .NET MVC/Web Api application and deployed to Azure Websites.

Source Code: [https://github.com/stormwild/StickyEvents](https://github.com/stormwild/StickyEvents)

Demo: [http://stickyevents.azurewebsites.net/](http://stickyevents.azurewebsites.net/)
