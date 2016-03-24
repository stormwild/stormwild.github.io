---
title: Jekyll Permalinks and Redirects
permalink: jekyll-permalinks-and-redirects
---

I recently changed the permalinks for my blog posts in my Github Jekyll Blog. I also added redirects from the previous urls to the new one.

By default blog post urls are prepended with the filename date.

    2014/12/14/working-with-jekyll/


To create a new permalink just add the permalink in the front matter of the post.

    ---
    permalink: working-with-jekyll
    ---

However I also wanted to have the older links redirect to the new permalink of the post.

To do that I used the jekyll-redirect-from plugin. Just follow the [installation steps](https://github.com/jekyll/jekyll-redirect-from#installation).

And in your post frontmatter:

    ---
    title: Working With Jekyll
    permalink: working-with-jekyll
    redirect_from: 2014/12/14/working-with-jekyll/
    ---



References

1. [Jekyll Filename Without Date](http://stackoverflow.com/questions/27099427/jekyll-filename-without-date)
2. [Github - Jekyll - Old pages redirection - best approach](http://stackoverflow.com/questions/10178304/github-jekyll-old-pages-redirection-best-approach/19717455#19717455)
3. [JekyllRedirectFrom](https://github.com/jekyll/jekyll-redirect-from)
4. [Redirects on GitHub Pages](https://help.github.com/articles/redirects-on-github-pages/)