---
title: Creating a PHP class library
permalink: creating-a-php-class-library
redirect_from: 2015/01/07/creating-a-php-class-library/
---

Today I created a PHP class library and shared it on Packagist. In this post I hope to share my experience. 

The class library I created for this project is available on Github and Packagist:

* [https://github.com/stormwild/ImageResizer](https://github.com/stormwild/ImageResizer)
* [https://packagist.org/packages/stormwild/image-resizer](https://packagist.org/packages/stormwild/image-resizer)

The following need to be installed on your development environment.

* PHP
* Git
* Composer

I currently use PHPStorm (version 8 as of this writing) as my PHP IDE and I also have PHP_CodeSniffer installed and configured to check my PHP source code for compliance with [PSR coding standards](http://www.php-fig.org/). A good intro can be found [here](http://code.tutsplus.com/tutorials/psr-huh--net-29314)

Create a PHP Project in PHPStorm
--------------------------------

I created a new PHP Project with the following files and folder structure:

```shell
ImageResizer/
ImageResizer/src/Stormwild/ImageResizer.php
ImageResizer/composer.json
```

Initialize Git
--------------

From the git bash run:

```shell
git init    
```

Create Github Repository
------------------------

Create a Github repository with the name of your class library project, ImageResizer in my case. Github will ask you to initialize your git repository with a README.md and a license.

Create Initial Commit
---------------------

On your local machine add and commit your initial files. Run:

```shell
git add --all
git commit -am 'Initial commit'
```

The command `git add --all` adds or stages all unstaged files in your working directory to git.

The command `git commit -am 'Initial commit'` commits your changes. The parameter -a adds or stages modified files. The parameter -m followed by 'Your commit message' allows you to specify the commit message.

Add Git Remote
--------------

Add your Github repository as a remote for your local git repo. Run:

```shell
git remote add origin git@github.com:stormwild/ImageResizer.git
```

Replace git@github.com:stormwild/ImageResizer.git with the url of your own repository.

Verify that the remote was added by running:

```shell
git config --get remote.origin.url
```

This should output your the url to your Github repo.

Tag your stable commit to set a version which Packagist will read and assign to your package.

Create an Annotated Tag
-----------------------

```shell
git tag // Lists existing tags    
git tag -a v1.0.0 -m 'First version' // Creates an annotated tag
```

Push Tags to Remote
-------------------

```shell
git push origin v1.0.0 // pushes specific tag
git push origin --tags // pushes all tags 
```

Create Composer Json
--------------------

```json
{
    "name": "stormwild/image-resizer",
    "description": "PHP class to resize images using GD",
    "keywords": [
        "php",
        "image",
        "resize",
        "scale"
    ],
    "type": "library",
    "license": "MIT",
    "homepage": "https://github.com/stormwild/ImageResizer",
    "authors": [
        {
            "name": "Alexander R. Torrijos",
            "homepage": "http://stormwild.github.io/"
        }
    ],
    "require": {
        "php": ">=5.3.0",
        "ext-gd": "*"
    },
    "autoload": {
        "classmap": ["src"]
    }
}
```

Create An Account on Packagist
------------------------------

[Packagist](https://packagist.org/)

Submit Package
--------------

Submit the package to packagist by providing the github/bitbucket url.

Setup Service Hooks on Github
-----------------------------

You will need a token provided by Packagist

For more information:

[Service Hooks](https://developer.github.com/webhooks/#service-hooks)

