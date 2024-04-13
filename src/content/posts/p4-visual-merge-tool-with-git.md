---
title: Setup P4 Visual Merge Tool with Git
published: 2015-02-24
description: 'Setup P4 Visual Merge Tool with Git'
image: '@assets/posts/placeholder-red-circle.png'
tags: ["Perfoce", "Git", "P4Merge", "Visual Merge Tool"]
---


* [Download P4 Visual Merge Tool](http://www.perforce.com/product/components/perforce-visual-merge-and-diff-tools)

* [Install P4 Visual Merge Tool](http://stackoverflow.com/questions/426026/git-on-windows-how-do-you-set-up-a-mergetool)

You can display list of supported tools by running:

```shell
git mergetool --tool-help
```

You should see p4merge in either available or valid list. If not, please update your git.

If p4merge was listed as available, it is in your PATH and you only have to set merge.tool:

```shell
git config --global merge.tool p4merge
```

If it was listed as valid, you have to define mergetool.p4merge.path in addition to merge.tool:

```shell
git config --global mergetool.p4merge.path c:/Users/my-login/AppData/Local/Perforce/p4merge.exe
```

The above is an example path when p4merge was installed for the current user, not system-wide (does not need admin rights or UAC elevation)

Although ~ should expand to current user's home directory (so in theory the path should be `~/AppData/Local/Perforce/p4merge.exe)`, this did not work for me
Even better would have been to take advantage of an environment variable (e.g. `$LOCALAPPDATA/Perforce/p4merge.exe`), git does not seem to be expanding environment variables for paths (if you know how to get this working, please let me know or update this answer)
