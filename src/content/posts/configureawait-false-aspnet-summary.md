---
title: 'Why You Should Avoid ConfigureAwait(false) in ASP.NET'
published: 2025-08-01
description: 'A summary of the key lessons from Mohamad Shokr’s article on why using ConfigureAwait(false) in ASP.NET can be a subtle but critical mistake.'
image: '@assets/posts/placeholder-alien-city.png'
tags: [".NET", "ASP.NET", "async", "await", "ConfigureAwait", "best-practices"]
draft: true
---

## Why You Should Avoid ConfigureAwait(false) in ASP.NET

This post summarizes the main points from [ConfigureAwait(false) in ASP.NET: The 9-Character Mistake Microsoft Tells You Not to Make](https://medium.com/@mohsho10/configureawait-false-in-asp-net-the-9-character-mistake-microsoft-tells-you-not-to-make-0b90bd50c286) by Mohamad Shokr.

### What is ConfigureAwait(false)?

- `ConfigureAwait(false)` is used in C# async/await code to avoid resuming on the original synchronization context (such as the UI or ASP.NET request context).
- It can improve performance in library code and desktop apps, but has important caveats in ASP.NET.

### Why is it a Problem in ASP.NET?

- ASP.NET (classic and Core) uses a synchronization context to manage request and response lifecycles.
- Using `ConfigureAwait(false)` in ASP.NET code can cause the continuation after `await` to run on a thread pool thread, not the original request context.
- This can break features that depend on the request context, such as:
  - `HttpContext.Current` (classic ASP.NET)
  - `HttpContext` in ASP.NET Core (request-bound services, user identity, etc.)
  - Per-request dependency injection
  - Logging, authentication, and other middleware
- Microsoft’s official guidance: **Do not use ConfigureAwait(false) in ASP.NET request-handling code.**

### When is ConfigureAwait(false) Safe?

#### What is "Library Code"?

**Library code** refers to reusable code that is designed to be consumed by different types of applications without being tied to a specific execution context. This includes:

- **NuGet packages** and class libraries
- **Utility methods** that perform generic operations
- **Data access layers** that don't need UI or request context
- **Business logic** that is context-agnostic
- **Third-party SDKs** and APIs

#### Examples of Safe Usage (Library Code)

```csharp
// ✅ GOOD: Data access library method
public async Task<User> GetUserAsync(int userId)
{
    // This code doesn't need ASP.NET context
    var user = await _database.QueryAsync<User>(
        "SELECT * FROM Users WHERE Id = @id", 
        new { id = userId }
    ).ConfigureAwait(false);
    
    return user;
}

// ✅ GOOD: HTTP client wrapper in a library
public async Task<string> CallExternalApiAsync(string endpoint)
{
    // External API call doesn't need request context
    var response = await _httpClient.GetAsync(endpoint)
        .ConfigureAwait(false);
    
    return await response.Content.ReadAsStringAsync()
        .ConfigureAwait(false);
}

// ✅ GOOD: File operations utility
public async Task<string> ReadFileAsync(string path)
{
    // File I/O doesn't need web context
    return await File.ReadAllTextAsync(path)
        .ConfigureAwait(false);
}
```

#### Examples of Unsafe Usage (ASP.NET Application Code)

```csharp
// ❌ BAD: Controller action
[HttpGet]
public async Task<ActionResult<User>> GetUser(int id)
{
    // DON'T use ConfigureAwait(false) here!
    var user = await _userService.GetUserAsync(id)
        .ConfigureAwait(false); // This can break HttpContext access
    
    // This might fail if HttpContext is lost
    var currentUserId = HttpContext.User.FindFirst("id")?.Value;
    
    return Ok(user);
}

// ❌ BAD: Middleware
public async Task InvokeAsync(HttpContext context, RequestDelegate next)
{
    // DON'T use ConfigureAwait(false) in middleware!
    await _logger.LogRequestAsync(context.Request)
        .ConfigureAwait(false); // This can break context flow
    
    await next(context); // Context might be lost
}

// ❌ BAD: Service that needs HttpContext
public async Task<bool> AuthorizeUserAsync()
{
    // This service needs the current request context
    var token = await _tokenService.GetTokenAsync()
        .ConfigureAwait(false); // This breaks HttpContext access
    
    // This will fail if we lost the HttpContext
    var userId = _httpContextAccessor.HttpContext?.User.FindFirst("id")?.Value;
    
    return await _authService.ValidateAsync(token, userId);
}
```

#### The Key Distinction

- **Library code** = Code that works independently of any specific application context
- **Application code** = Code that runs within ASP.NET and needs access to request-specific data

#### When is ConfigureAwait(false) Safe?

**✅ Safe to use:**

- **Pure library code** that doesn't depend on HttpContext, UI context, or any specific synchronization context
- **Data access layers** that only interact with databases or external services
- **Utility functions** that perform calculations, file I/O, or network calls
- **Background services** that run independently of web requests
- **Console applications** or desktop apps (with caveats for UI)

**❌ Not safe to use:**

- **Controller actions** and API endpoints
- **Middleware components**
- **Services** that need HttpContext, User identity, or request-scoped dependencies
- **Any code** that might need to access ASP.NET features later in the call chain

### Best Practices

1. **Default to NOT using ConfigureAwait(false) in ASP.NET application code**
2. **Use it ONLY in library/utility code that is context-agnostic**
3. **Ask yourself**: "Does this code (or any code it calls) need access to HttpContext, User identity, or request-scoped services?"
   - If **YES** → Don't use `ConfigureAwait(false)`
   - If **NO** → It's probably safe to use
4. **When in doubt, leave it out** — incorrect use can cause hard-to-debug issues
5. **Always test thoroughly** when using async/await in ASP.NET, especially across different threads
6. **Document your intent** clearly when writing library code that uses `ConfigureAwait(false)`

### Real-World Rule of Thumb

**If your code is part of an ASP.NET application and there's any chance it might need to access request-specific data (now or in the future), don't use `ConfigureAwait(false)`.**

The performance gain is usually minimal compared to the risk of breaking request context flow.

### Key Takeaways

- `ConfigureAwait(false)` can break ASP.NET request context and lead to subtle bugs.
- Microsoft recommends avoiding it in ASP.NET request-handling code.
- Use it only in code that does not depend on the ASP.NET context.
- When writing shared libraries, document the intended usage clearly.

### References

- [ConfigureAwait(false) in ASP.NET: The 9-Character Mistake Microsoft Tells You Not to Make (Medium)](https://medium.com/@mohsho10/configureawait-false-in-asp-net-the-9-character-mistake-microsoft-tells-you-not-to-make-0b90bd50c286)
- [Microsoft Docs: Best practices for async/await](https://learn.microsoft.com/en-us/dotnet/standard/asynchronous-programming-patterns/async-in-depth)
- [Stephen Cleary: ConfigureAwait FAQ](https://devblogs.microsoft.com/dotnet/configureawait-faq/)
