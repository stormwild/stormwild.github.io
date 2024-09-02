---
title: Add Open API to .NET 8
published: 2024-09-03
description: 'Add Open API to .NET 8'
image: '@assets/posts/placeholder-red-circle.png'
tags: ["Open API", ".NET", "Swagger", "API", "Documentation", "featured"]
---

## Pre-requisites

- [.NET 8](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Visual Studio Code](https://code.visualstudio.com/)
- [C# for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp)
- [C# Dev Kit - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit)
- [Git](https://gitforwindows.org/)

## Overview

OpenAPI is a specification for building APIs. It provides a way to describe the structure of an API and the operations that can be performed on it. OpenAPI is a standard that is used by many tools to generate documentation, client libraries, and other useful resources for working with APIs.

The following shows how to add OpenAPI support to a .NET 8 Minimap API project.

Source code: [OpenApiSwagger.Demo](https://github.com/stormwild/OpenApiSwagger.Demo)

## Steps

1. Create a new ASP.NET Core API project

```bash
dotnet new web --framework net8.0 --no-https -o OpenApiSwagger.Demo
cd OpenApiSwagger.Demo
```

This will create a new ASP.NET Core API project with a single endpoint that returns "Hello World!".

```csharp
// Program.cs
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.Run();
```

Run the application

```bash
dotnet run
```

Sample output

```bash
$ dotnet run
Building...
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: http://localhost:5041
info: Microsoft.Hosting.Lifetime[0]
      Application started. Press Ctrl+C to shut down.
info: Microsoft.Hosting.Lifetime[0]
      Hosting environment: Development
info: Microsoft.Hosting.Lifetime[0]
      Content root path: C:\Users\ExampleUser\source\repos\DotNet\OpenApiSwagger.Demo
```

Open a browser and navigate to `http://localhost:5041` to see the "Hello World!" message or use `curl` to test the endpoint.

```bash
curl http://localhost:5041
Hello World!
```

2. Add the `Swashbuckle.AspNetCore` and `Microsoft.AspNetCore.OpenApi` NuGet packages to the project

```bash
dotnet add package Swashbuckle.AspNetCore
dotnet add package Microsoft.AspNetCore.OpenApi
```

3. Update the project's `Program.cs` to include the Swagger support

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapGet("/", () => "Hello World!")
    .WithOpenApi(operation => new(operation)
    {
        Summary = "Hello World",
        Tags = [new() { Name = "HelloWorld" }]
    });

app.Run();
```

4. Update `launchSettings.json` to include the Swagger UI URL

```json
{
  "profiles": {
    "http": {
        "commandName": "Project",
        "dotnetRunMessages": true,
        "launchBrowser": true,
        "launchUrl": "swagger",
        "applicationUrl": "http://localhost:5041",
        "environmentVariables": {
            "ASPNETCORE_ENVIRONMENT": "Development"
        }
        },
    }
}
```

In `vscode` open the project in Solution Explorer, right-click on the project node and select `Debug` > `Start New Instance`.

The Swagger UI will be displayed on `http://localhost:5041/swagger`.

![SwaggerUI for HelloWorld Api](@assets/posts/swagger-ui-hello-word.png "Swagger UI for Hello World")

## References

- [Overview of OpenAPI support in ASP.NET Core API apps | Microsoft Learn](https://learn.microsoft.com/en-us/aspnet/core/tutorials/getting-started-with-swashbuckle?view=aspnetcore-8.0&tabs=visual-studio-code)
