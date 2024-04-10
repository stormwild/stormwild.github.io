---
title: Studying Owin
published: 2014-12-16
updated: 2024-04-10
description: 'Studying Owin'
image: '@assets/posts/studying-owin.webp'
tags: ["OWIN", "spec", "Katana", ".NET", ".NET Core"]
---

[Owin](http://owin.org/) is a specification for an abstraction between an application and it's host. It can be implemented using a delegate to allow a host to invoke an application passing in a properties collection.

>The host invokes the server startup code with the given application delegate and the Properties dictionary.  The server finishes configuring itself, starts accepting requests, and invokes the application delegate to process those requests.
>
>Source [Owin Spec](http://owin.org/spec/spec/owin-1.0.0.html)

References:

1. [Getting Started with OWIN and Katana](http://www.asp.net/aspnet/overview/owin-and-katana/getting-started-with-owin-and-katana)
2. [Owin](http://owin.org/)
3. [My Sample Owin code on Github: stormwild/Owin](https://github.com/stormwild/Owin)

[Open Web Interface for .NET (OWIN) with ASP.NET Core | Microsoft Learn](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/owin?view=aspnetcore-8.0)

> OWIN allows web apps to be decoupled from web servers. It defines a standard way for middleware to be used in a pipeline to handle requests and associated responses. ASP.NET Core applications and middleware can interoperate with OWIN-based applications, servers, and middleware.
