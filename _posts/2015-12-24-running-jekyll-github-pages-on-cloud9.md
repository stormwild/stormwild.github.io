---
title: Running Jekyll Github Pages on Cloud9
---

Develop and run your Jekyll Github Pages on Cloud9

## Create a new workspace

Create a new workspace using either a custom template or the ruby template.

If you choose the Ruby template you need to delete the default rails project in the workspace directory or delete the directory.

A workspace folder will be recreated with a hidden .c9 folder.

Git is configured to ignore this folder.

## Install Jekyll and Github Pages

{% highlight bash %}$ gem install jekyll github-pages{% endhighlight %}

## Initial Git Repository on Workspace Folder

Initial a git repository in the workspace folder.

{% highlight bash %}$ git init{% endhighlight %}

Add your github pages repository as remote.

{% highlight bash %}$ git remote add origin <your repository>{% endhighlight %}

Pull from the remote.

{% highlight bash %}$ git pull origin master{% endhighlight %}

## Run the Jekyll Server

{% highlight bash %}$ jekyll serve --host $IP --port $PORT{% endhighlight %}

$IP and $PORT provide the environment's host ip and port.



