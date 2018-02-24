---
title: ASP .NET Core i18n notes
permalink: aspnetcore-i18n-notes
excerpt: Notes on internationalization in ASP .NET Core applications
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

