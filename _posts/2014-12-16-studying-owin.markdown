---
title: Studying Owin
permalink: studying-owin
redirect_from: 2014/12/16/studying-owin/
---

[Owin](http://owin.org/) is a specification for an abstraction between an application and it's host. It can be implemented using a delegate to allow a host to invoke an application passing in a properties collection.

>The host invokes the server startup code with the given application delegate and the Properties dictionary.  The server finishes configuring itself, starts accepting requests, and invokes the application delegate to process those requests. 
>
>Source [Owin Spec](http://owin.org/spec/spec/owin-1.0.0.html)

References:

1. [Getting Started with OWIN and Katana](http://www.asp.net/aspnet/overview/owin-and-katana/getting-started-with-owin-and-katana)
2. [Owin](http://owin.org/)
3. [My Sample Owin code on Github: stormwild/Owin](https://github.com/stormwild/Owin)