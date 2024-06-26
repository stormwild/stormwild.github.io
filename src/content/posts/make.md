---
title: 'Make'
published: 2017-09-20
description: 'GNU Make is an automation tool for compiling and building applications and is part of the GNU Toolchain.'
image: '@assets/posts/placeholder-alien-city.png'
tags: ["Make", "GNU", "Build Tools"]
---

GNU Make is an automation tool for compiling and building applications and is part of the GNU Toolchain.

A `Makefile` tells `make` what to do, like how to compile and link a program.

> To use Make to its full potential, you need to properly frame your desired results as build targets, their prerequisites (dependencies), and the recipe to turn those dependencies into the intended output. ie:
>
> ```make
> # Makefile
> htdocs/robots.txt: support-files/robots.txt
        cp support-files/robots.txt htdocs/robots.txt
> ```

Makefiles are composed of rules which consist of build targets, their prerequisites (dependencies), and the recipes (commands) to produce the target.

Build Targets:

```
htdocs/robots.txt: 
```

Prerequisites:

```
support-files/robots.txt
```

Recipes (Commands):

```
cp support-files/robots.txt htdocs/robots.txt
```

Note: Prerequisites can be targets of other rules

In the Makefile, the recipes are tab indented below the build target.

When `make` parses the `Makefile`, it reads the rules and detects if the source file has changed and if so re-generates the target.

## References

- [GCC and Make](https://www3.ntu.edu.sg/home/ehchua/programming/cpp/gcc_make.html)
- [Practical Makefiles, by example](http://nuclear.mutantstargoat.com/articles/make/)
- [Using GNU Make as a Front-end Development Build Tool](https://www.sitepoint.com/using-gnu-make-front-end-development-build-tool/)
- [GNU make](https://www.gnu.org/software/make/manual/make.html#Automatic-Variables)
- [Automatic Variables](https://www.gnu.org/software/make/manual/make.html#Automatic-Variables)
