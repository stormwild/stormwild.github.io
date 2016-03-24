---
title: Working With Jekyll
permalink: working-with-jekyll
redirect_from: 2014/12/14/working-with-jekyll/
---

I'm still learning how to use Jekyll, a static-site generator, used with [Github Pages](https://pages.github.com/). It's basically a [ruby gem](http://guides.rubygems.org/what-is-a-gem/), which is a library of ruby code, that compiles a directory of various file formats, primarily Markdown, into html pages.

>Jekyll is a simple, blog-aware, static site generator. It takes a template directory containing raw text files in various formats, runs it through Markdown (or Textile) and Liquid converters, and spits out a complete, ready-to-publish static website suitable for serving with your favorite web server. Jekyll also happens to be the engine behind GitHub Pages, which means you can use Jekyll to host your project’s page, blog, or website from GitHub’s servers for free. 
>
Source [Jekyllrb.com](http://jekyllrb.com/)

It has been a bit of a struggle for me to get the hang of Jekyll.  I hope to learn more about how to use it to generate my User Github Page.

I just learned that I had to use Liquid template tags to get code highlighting.

>[Liquid](http://liquidmarkup.org/) is an extraction from the e-commerce system [Shopify](http://www.shopify.com/)

Ruby
{% highlight ruby %}
def what?
  42
end
{% endhighlight %}

CSharp (C#)
{% highlight csharp %}
public class Greeting 
{
    private string _greeting = "Hello World.";

    public Greeting()
    {

    }

    public string Greeting { get { return _greeting; } }
}
{% endhighlight %}


Example Liquid snippet:

{% raw %}
    {% highlight php %}
        // your code here
        echo "Hello";
    {% endhighlight %}
{% endraw %}

To display Liquid tags I had to use:

{% raw %}
    { % raw % }
    { % endraw % }
    // but without the space between { and % as shown above
{% endraw %}

I also learned that you can specify line numbers by using ```linenos``` or ```linenos=table```:

{% raw %}
    {% highlight ruby linenos %}
    def what?
      42
    end
    {% endhighlight %}
{% endraw %}

However, due to problems with the mark-up generated, a better solution would be to create the line numbers using [css](https://reanimus.github.io/2014/04/14/fun-times-with-jekylls-code-highlighting.html) instead.

References:

1. [Github Pages](https://pages.github.com/)
2. [What is a gem?](http://guides.rubygems.org/what-is-a-gem/)
3. [Jekyllrb.com](http://jekyllrb.com/)
4. [Markdown](http://daringfireball.net/projects/markdown/syntax)
5. [Liquid](http://liquidmarkup.org/)
6. [Escape Liquid template tags in Jekyll posts](http://sarathlal.com/escape-liquid-template-tags-in-jekyll-posts/)
7. [Shopify](http://www.shopify.com/)
8. [CSS Line Nos](https://reanimus.github.io/2014/04/14/fun-times-with-jekylls-code-highlighting.html)
9. [Build A Blog With Jekyll And GitHub Pages](http://www.smashingmagazine.com/2014/08/build-blog-jekyll-github-pages/)



