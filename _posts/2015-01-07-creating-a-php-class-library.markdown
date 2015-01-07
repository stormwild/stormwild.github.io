---
title: Creating a PHP class library
---

Today I created a PHP class library and shared it on Packagist. In this post I hope to share my experience. 

The class library I created for this project is available on Github and Packagist:

* https://github.com/stormwild/ImageResizer
* https://packagist.org/packages/stormwild/image-resizer

Before we start the following need to be installed on your development environment.

* PHP
* Git
* Composer

I currently use PHPStorm (version 8 as of this writing) as my PHP IDE and I also have PHP_CodeSniffer installed and configured to check my PHP source code for compliance with [PSR coding standards](http://www.php-fig.org/). A good intro can be found [here](http://code.tutsplus.com/tutorials/psr-huh--net-29314)

Create a PHP Project in PHPStorm
--------------------------------

I created a new PHP Project with the following files and folder structure:

/ImageResizer
/src/Stormwild/ImageResizer.php
composer.json

Initialize Git
--------------

From the git bash run:

    git init    

Create Github Repository
------------------------

Create a Github repository with the name of your class library project, ImageResizer in my case. Github will ask you to initialize your git repository with a README.md and a license.

Create Initial Commit
---------------------

On your local machine add and commit your initial files. Run:

    git add --all
    git commit -am 'Initial commit'

The command `git add --all` adds or stages all unstaged files in your working directory to git.

The command `git commit -am 'Initial commit'` commits your changes. The parameter -a adds or stages modified files. The parameter -m followed by 'Your commit message' allows you to specify the commit message.

Add Git Remote
--------------

Add your Github repository as a remote for your local git repo. Run:

    git remote add origin git@github.com:stormwild/ImageResizer.git

Replace git@github.com:stormwild/ImageResizer.git with the url of your own repository.

Verify that the remote was added by running:

    git config --get remote.origin.url

This should output your the url to your Github repo.

To be continued...

Notes:
Outline:

Prerequisites
PHP
Git & Github
PHPStorm/Editor/IDE
Composer
Packagist

Steps
Create Project
    Create composer.json
    Sample folder structure
    Create class            
Create a git repository 
    Initialize git
    Create Github repository
    Add remote
    Commit
    Push changes
    Tag
    Push Tags
Share on Packagist    
Appendices:




