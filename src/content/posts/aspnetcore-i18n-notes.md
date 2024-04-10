---
# layout: '@layouts/markdown-post-layout.astro'
title: 'ASP .NET Core i18n notes'
published: 2017-10-07
description: 'Notes on internationalization in ASP .NET Core applications'
image: '@assets/posts/placeholder-globules.png'
tags: ["default", "featured"]
---

DotNet Core is basically a console app running on the host os.

On Windows the regional setting affects the CultureInfo.CurrentCulture value in a console app.

```csharp
using System;
using System.Globalization;

namespace Mosaic
{
    class Program
    {
        static void Main(string[] args)
        {
            
            Console.WriteLine(CultureInfo.CurrentCulture);
            Console.ReadLine();
        }
    }
}
```

This will display `en-US` if your regional settings on Windows is set to English US.
