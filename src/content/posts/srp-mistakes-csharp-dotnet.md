---
title: 'Common SRP Mistakes in C# .NET: 10 Costly Errors to Avoid'
published: 2025-08-01
description: 'A summary of the most common Single Responsibility Principle violations in C# .NET development and how to fix them for better code maintainability.'
image: '@assets/posts/placeholder-globules.png'
tags: [".NET", "C#", "SOLID", "SRP", "clean-code", "architecture", "best-practices", "featured"]
draft: true
---

The Single Responsibility Principle (SRP) is the first principle of SOLID, yet it's one of the most misunderstood and violated principles in .NET development. This post summarizes the key insights from [You're Doing SRP Wrong: 10 Costly Mistakes in C# .NET and How to Fix Them](https://medium.com/stackademic/youre-doing-srp-wrong-10-costly-mistakes-in-c-net-and-how-to-fix-them-16f51debde66).

## Understanding SRP: More Than "One Method, One Thing"

**The Single Responsibility Principle states**: *A class should have only one reason to change.*

This doesn't mean "one method" or "one function" — it means one **responsibility** or **concern**.

## The 10 Costly SRP Mistakes

### 1. **God Classes/Objects**

**❌ Problem**: Classes that do everything

```csharp
public class UserManager
{
    public void CreateUser(User user) { }
    public void SendEmail(string email) { }
    public void LogActivity(string activity) { }
    public void ValidateUser(User user) { }
    public void GenerateReport() { }
    // ... 50 more methods
}
```

**✅ Solution**: Split into focused classes

```csharp
public class UserService
{
    public void CreateUser(User user) { }
}

public class EmailService
{
    public void SendEmail(string email) { }
}

public class ActivityLogger
{
    public void LogActivity(string activity) { }
}
```

### 2. **Mixed Abstraction Levels**

**❌ Problem**: High-level business logic mixed with low-level implementation details

```csharp
public class OrderProcessor
{
    public void ProcessOrder(Order order)
    {
        // High-level business logic
        if (order.IsValid())
        {
            // Low-level database details
            using var connection = new SqlConnection(connectionString);
            connection.Open();
            var command = new SqlCommand("INSERT INTO Orders...", connection);
            // ... raw SQL implementation
        }
    }
}
```

**✅ Solution**: Separate concerns by abstraction level

```csharp
public class OrderProcessor
{
    private readonly IOrderRepository _repository;
    
    public void ProcessOrder(Order order)
    {
        if (order.IsValid())
        {
            _repository.Save(order); // Abstracted persistence
        }
    }
}
```

### 3. **Anemic Domain Models**

**❌ Problem**: Data containers with no behavior, forcing business logic elsewhere

```csharp
public class User
{
    public string Name { get; set; }
    public string Email { get; set; }
    public DateTime LastLogin { get; set; }
}

public class UserService
{
    public bool IsActiveUser(User user)
    {
        return (DateTime.Now - user.LastLogin).TotalDays < 30;
    }
}
```

**✅ Solution**: Rich domain models with encapsulated behavior

```csharp
public class User
{
    public string Name { get; private set; }
    public string Email { get; private set; }
    public DateTime LastLogin { get; private set; }
    
    public bool IsActive()
    {
        return (DateTime.Now - LastLogin).TotalDays < 30;
    }
    
    public void UpdateLastLogin()
    {
        LastLogin = DateTime.Now;
    }
}
```

### 4. **Fat Controllers/Services**

**❌ Problem**: Controllers or services handling multiple concerns

```csharp
[ApiController]
public class UserController : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> CreateUser(CreateUserRequest request)
    {
        // Validation logic
        if (string.IsNullOrEmpty(request.Email)) return BadRequest();
        
        // Business logic
        var user = new User { Email = request.Email };
        
        // Data access
        await _context.Users.AddAsync(user);
        await _context.SaveChangesAsync();
        
        // Notification logic
        await _emailService.SendWelcomeEmail(user.Email);
        
        // Logging
        _logger.LogInformation($"User created: {user.Id}");
        
        return Ok();
    }
}
```

**✅ Solution**: Use focused services and handlers

```csharp
[ApiController]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;
    
    [HttpPost]
    public async Task<IActionResult> CreateUser(CreateUserRequest request)
    {
        var result = await _userService.CreateUserAsync(request);
        return result.IsSuccess ? Ok(result.User) : BadRequest(result.Errors);
    }
}

public class UserService
{
    private readonly IUserRepository _repository;
    private readonly IUserNotificationService _notificationService;
    
    public async Task<CreateUserResult> CreateUserAsync(CreateUserRequest request)
    {
        // Focused on user creation orchestration
        var user = User.Create(request.Email);
        await _repository.SaveAsync(user);
        await _notificationService.SendWelcomeEmailAsync(user);
        return CreateUserResult.Success(user);
    }
}
```

### 5. **Mixing Business Rules with Infrastructure**

**❌ Problem**: Business logic tightly coupled to infrastructure concerns

```csharp
public class DiscountCalculator
{
    public decimal CalculateDiscount(int customerId)
    {
        // Business logic mixed with data access
        using var connection = new SqlConnection(connectionString);
        var customer = GetCustomer(customerId, connection);
        
        if (customer.IsPremium && customer.OrderCount > 10)
        {
            return 0.15m; // 15% discount
        }
        
        return 0.05m; // 5% discount
    }
}
```

**✅ Solution**: Separate business rules from infrastructure

```csharp
public class DiscountCalculator
{
    public decimal CalculateDiscount(Customer customer)
    {
        // Pure business logic
        if (customer.IsPremium && customer.OrderCount > 10)
        {
            return 0.15m;
        }
        
        return 0.05m;
    }
}

public class DiscountService
{
    private readonly ICustomerRepository _customerRepository;
    private readonly DiscountCalculator _calculator;
    
    public async Task<decimal> GetDiscountForCustomerAsync(int customerId)
    {
        var customer = await _customerRepository.GetByIdAsync(customerId);
        return _calculator.CalculateDiscount(customer);
    }
}
```

### 6. **Utility Classes with Multiple Concerns**

**❌ Problem**: Helper classes that do unrelated things

```csharp
public static class Helper
{
    public static string FormatDate(DateTime date) { }
    public static bool ValidateEmail(string email) { }
    public static void LogError(Exception ex) { }
    public static string EncryptPassword(string password) { }
    public static decimal CalculateTax(decimal amount) { }
}
```

**✅ Solution**: Focused utility classes

```csharp
public static class DateFormatter
{
    public static string FormatDate(DateTime date) { }
}

public static class EmailValidator
{
    public static bool IsValid(string email) { }
}

public static class PasswordEncryption
{
    public static string Encrypt(string password) { }
}
```

### 7. **Configuration and Business Logic Mixing**

**❌ Problem**: Configuration concerns mixed with business logic

```csharp
public class PaymentProcessor
{
    public void ProcessPayment(Payment payment)
    {
        var maxAmount = decimal.Parse(ConfigurationManager.AppSettings["MaxPaymentAmount"]);
        var apiKey = ConfigurationManager.AppSettings["PaymentApiKey"];
        
        if (payment.Amount > maxAmount)
        {
            throw new InvalidOperationException("Amount too high");
        }
        
        // Payment processing logic...
    }
}
```

**✅ Solution**: Inject configuration and separate concerns

```csharp
public class PaymentProcessor
{
    private readonly PaymentConfiguration _config;
    private readonly IPaymentGateway _gateway;
    
    public PaymentProcessor(PaymentConfiguration config, IPaymentGateway gateway)
    {
        _config = config;
        _gateway = gateway;
    }
    
    public async Task ProcessPaymentAsync(Payment payment)
    {
        if (payment.Amount > _config.MaxAmount)
        {
            throw new InvalidOperationException("Amount too high");
        }
        
        await _gateway.ProcessAsync(payment);
    }
}
```

### 8. **Exception Handling Everywhere**

**❌ Problem**: Exception handling mixed with business logic in every method

```csharp
public class UserService
{
    public User GetUser(int id)
    {
        try
        {
            return _repository.GetById(id);
        }
        catch (SqlException ex)
        {
            _logger.LogError(ex, "Database error");
            throw new UserServiceException("Failed to get user");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unexpected error");
            throw;
        }
    }
}
```

**✅ Solution**: Centralized exception handling with focused business logic

```csharp
public class UserService
{
    private readonly IUserRepository _repository;
    
    public async Task<User> GetUserAsync(int id)
    {
        // Pure business logic - exceptions handled at boundaries
        return await _repository.GetByIdAsync(id);
    }
}

// Global exception handler middleware handles cross-cutting concerns
```

### 9. **Data Transfer Objects (DTOs) Doing Too Much**

**❌ Problem**: DTOs with business logic and validation

```csharp
public class UserDto
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    
    public bool IsValid()
    {
        // DTOs shouldn't contain business logic
        return !string.IsNullOrEmpty(Email) && Email.Contains("@");
    }
    
    public string GetFullName()
    {
        // DTOs shouldn't have behavior
        return $"{FirstName} {LastName}";
    }
}
```

**✅ Solution**: Keep DTOs as pure data containers

```csharp
public class UserDto
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
}

public class UserValidator
{
    public bool IsValid(UserDto user)
    {
        return !string.IsNullOrEmpty(user.Email) && user.Email.Contains("@");
    }
}

public class UserDisplayService
{
    public string GetFullName(UserDto user)
    {
        return $"{user.FirstName} {user.LastName}";
    }
}
```

### 10. **Repository Pattern Violations**

**❌ Problem**: Repositories doing business logic and multiple data concerns

```csharp
public class UserRepository
{
    public User GetActiveUser(int id)
    {
        var user = GetById(id);
        
        // Business logic in repository
        if (user.LastLoginDate < DateTime.Now.AddDays(-30))
        {
            user.IsActive = false;
            Update(user);
        }
        
        return user;
    }
    
    // Multiple concerns: users, orders, logging
    public void LogUserActivity(int userId, string activity) { }
    public List<Order> GetUserOrders(int userId) { }
}
```

**✅ Solution**: Pure data access repositories

```csharp
public class UserRepository : IUserRepository
{
    public async Task<User> GetByIdAsync(int id)
    {
        // Pure data access
        return await _context.Users.FindAsync(id);
    }
    
    public async Task UpdateAsync(User user)
    {
        _context.Users.Update(user);
        await _context.SaveChangesAsync();
    }
}

public class UserService
{
    private readonly IUserRepository _userRepository;
    
    public async Task<User> GetActiveUserAsync(int id)
    {
        var user = await _userRepository.GetByIdAsync(id);
        
        // Business logic in service layer
        if (user.ShouldBeDeactivated())
        {
            user.Deactivate();
            await _userRepository.UpdateAsync(user);
        }
        
        return user;
    }
}
```

## Key Benefits of Following SRP

1. **Easier Testing**: Each class has a single, focused responsibility
2. **Better Maintainability**: Changes to one concern don't affect others
3. **Improved Readability**: Code intent is clearer
4. **Reduced Coupling**: Classes depend on fewer things
5. **Enhanced Reusability**: Focused classes are easier to reuse

## Practical Tips for Applying SRP

### 1. **Ask the Right Questions**

- "What is this class's single reason to change?"
- "Could I split this into multiple focused classes?"
- "Am I mixing different levels of abstraction?"

### 2. **Use the "Describe in One Sentence" Test**

If you can't describe a class's responsibility in one clear sentence, it probably violates SRP.

### 3. **Watch for These Warning Signs**

- Classes with many dependencies
- Methods with mixed abstraction levels
- Classes that are hard to name clearly
- Frequent changes to the same class for different reasons

### 4. **Refactor Gradually**

- Start with the most problematic classes
- Extract focused services and utilities
- Use dependency injection to manage relationships

## Conclusion

The Single Responsibility Principle isn't about having tiny classes or single methods. It's about **focused responsibilities** and **single reasons to change**. By avoiding these common mistakes, you'll create more maintainable, testable, and flexible .NET applications.

Remember: **Every class should do one thing well, and have only one reason to change.**

## References

- [You're Doing SRP Wrong: 10 Costly Mistakes in C# .NET and How to Fix Them](https://medium.com/stackademic/youre-doing-srp-wrong-10-costly-mistakes-in-c-net-and-how-to-fix-them-16f51debde66)
- [SOLID Principles in C#](https://learn.microsoft.com/en-us/archive/msdn-magazine/2014/may/csharp-best-practices-dangers-of-violating-solid-principles-in-csharp)
- [Clean Code by Robert C. Martin](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882)
- [Agile Principles, Patterns, and Practices in C#](https://www.amazon.com/Agile-Principles-Patterns-Practices-C/dp/0131857258)
