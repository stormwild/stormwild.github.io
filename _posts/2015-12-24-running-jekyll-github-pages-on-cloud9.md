---
title: Running Jekyll Github Pages on Cloud9
permalink: running-jekyll-github-pages-on-cloud9
redirect_from: 2015/12/24/running-jekyll-github-pages-on-cloud9/ 
---

Develop and run your [Jekyll Github Pages](https://help.github.com/articles/using-jekyll-with-pages/) on [Cloud9](https://c9.io/?redirect=0)

## Create a new workspace

Create a new workspace using either a custom template or the ruby template.

If you choose the Ruby template you need to delete the default rails project in the workspace directory or delete the directory.

A workspace folder will be recreated with a hidden .c9 folder.

Git is configured to ignore this folder.

## Install Jekyll and Github Pages

```shell
$ gem install jekyll github-pages
```

## Initial Git Repository on Workspace Folder

Initial a git repository in the workspace folder.

```shell
$ git init
```

Add your github pages repository as remote.

```
$ git remote add origin <your repository>
```

Pull from the remote.

```shell
$ git pull origin master
```

## Run the Jekyll Server

```shell
$ jekyll serve --host $IP --port $PORT
```

`$IP` and `$PORT` provide the environment's host ip and port.



