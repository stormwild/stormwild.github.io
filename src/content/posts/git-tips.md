---
title: Git Tips (Rough Draft)
published: 2015-02-24
description: 'Git Tips (Rough Draft)'
image: '@assets/posts/placeholder-alien-city.png'
tags: ["Git", "Version Control", "Tips"]
categories: ["Development Tools", "Version Control"]
---

Git Tips (Rough Draft)

#### Creating keys

    $ ls -al ~/.ssh
    # Lists the files in your .ssh directory, if they exist

    $ ssh-keygen -t rsa -C "your_email@example.com"
    # Creates a new ssh key, using the provided email as a label

    Generating public/private rsa key pair.
    # Enter file in which to save the key (/c/Users/you/.ssh/id_rsa): [Press enter]

    Enter passphrase (empty for no passphrase): [Type a passphrase]
    # Enter same passphrase again: [Type passphrase again]

    Your identification has been saved in /c/Users/you/.ssh/id_rsa.
    # Your public key has been saved in /c/Users/you/.ssh/id_rsa.pub.
    # The key fingerprint is:
    # 01:0f:f4:3b:ca:85:d6:17:a1:7d:f0:68:9d:f0:a2:db your_email@example.com

    # start the ssh-agent in the background
    $ ssh-agent -s
    # Agent pid 59566
    $ ssh-add ~/.ssh/id_rsa

On Windows to run ssh-agent

    $ eval $(ssh-agent) > /dev/null
    $ ssh-add ~/ssh/id_rsa
    Enter passphrase for /c/Users/Torrijos/.ssh/id_rsa:
    Identity added: /c/Users/Torrijos/.ssh/id_rsa (/c/Users/Torrijos/.ssh/id_rsa)

This will allow you to perform remote operations with Bitbucket, or any other remote service, without having to enter your private key passphrase everytime.

#### Configuration

    $ git config --list
    user.name=Scott Chacon
    user.email=schacon@gmail.com
    color.status=auto
    color.branch=auto
    color.interactive=auto
    color.diff=auto
    ...
    # Shows a list of config settings

##### Set name and email

    git config --global user.name "John Doe"
    git config --global user.email johndoe@example.com

##### Configure Line Ending

Todo

### Workflow

#### Remotes

View remotes

    $ git remote
    origin
    upstream

View remote urls

    $ git config --get remote.origin.url
    git@bitbucket.org:localrepo/development-wiki.git/wiki

    $ git config --get remote.upstream.url
    git@bitbucket.org:remoterepo/development-wiki.git/wiki

Add remote url

    $ git remote add origin git@bitbucket.org:remoterepo/development-wiki.git/wiki
    # Set a new remote

    $ git remote -v
    # Verify new remote
    origin  git@bitbucket.org:localrepo/development-wiki.git/wiki (fetch)
    origin  git@bitbucket.org:localrepo/development-wiki.git/wiki (push)
    upstream        git@bitbucket.org:remoterepo/development-wiki.git/wiki (fetch)
    upstream        git@bitbucket.org:remoterepo/development-wiki.git/wiki (push)

Change remote url

    $ git remote rename origin destination
    # Change remote name from 'origin' to 'destination' 

    $ git remote set-url origin git@github.com:USERNAME/REPOSITORY2.git
    # Change the url for an existing remote

...
other topics here

#### Updating Local branch

From local branch

    $ git pull --rebase upstream develop
    # Rewrites current branch to match remote and replay your local changes on top
    $ git pull --rebase -s recursive -X theirs upstream develop
    # Does the same except any conflicts favors your local branch's changes
    # Thus you may lose changes from the remote using this.

Sometimes you may need to abort a rebase:

    git rebase --abort

or a merge

    git merge --abort

When merging another branch onto your current branch, it may be good to merge all changes into one commit

    git merge --squash otherbranch

then

    git commit -m 'Consolidated commits from other branch'

In case of merge conflicts you can also use:

    git merge -s recursive -X ours otherbranch
or

    $ git merge --squash -s recursive -X ours otherbranch
    # This favors your current branch's changes rather than the other branch.

For actually resolving merge and rebase conflicts, open the repository with a git GUI application, i.e. Git Extensions, Atlassian SourceTree, etc.

Launch the merge tool, KDiff or Perforce P4 Merge to resolve conflicts.

#### Update Remote Branch List On Local

To get a copy of branch list on remote

`$ git fetch` or `$ git fetch upstream`

If you are sure that remote server repo contains more branches and they are not shown when you type

`$ git branch -a`

or

`$ git branch -r`

Then you have to update your remote list, by:

`$ git remote update upstream --prune`

Assuming your remote is named as upstream (This is true most of times).

```
for brname in `git branch -r | grep upstream | grep -v master | grep -v HEAD | sed -e 's/upstream\///'`; do echo $brname upstream/$brname; git branch --track $brname upstream/$brname; done
```

Once you have created a local branch corresponding to each upstream branch. Update your fork (origin)

`$ git push --all origin`

(origin being your fork): that supposes that:
you have all the local branches tracking all the upstream branches (see previous step).
Otherwise, you would push only one local branch by default, since a clone would create only one local branch (the default one)
you haven't pushed commits of your own on those branches.

`$ git push --prune origin`

References:

- [How To Delete a Git Branch Locally and Remotely](http://stackoverflow.com/questions/2003505/how-to-delete-a-git-branch-both-locally-and-remotely)
- [Sed](http://www.grymoire.com/Unix/Sed.html#uh-13)
- [How To Update Remote branch List on Local Machine](http://junaidpven.wordpress.com/2011/12/29/how-to-update-remote-branch-list-on-local-machine/)
- [How To Update My Fork To Have The Same Branches and Tags as the Original Repository](http://stackoverflow.com/questions/15779740/how-to-update-my-fork-to-have-the-same-branches-and-tags-as-the-original-reposit)
