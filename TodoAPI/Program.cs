using System;
using Microsoft.EntityFrameworkCore;
using TodoAPI;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Register controllers
builder.Services.AddControllers();

// Configure Entity Framework Core with SQL Server
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        sqlOptions => sqlOptions.EnableRetryOnFailure(
            maxRetryCount: 5,
            maxRetryDelay: TimeSpan.FromSeconds(10),
            errorNumbersToAdd: null
        )
    )
);

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
        policy.WithOrigins("http://localhost:3000", "https://todoapphanzala.azurewebsites.net") 
              .AllowAnyMethod()
              .AllowAnyHeader()
    );
});

var app = builder.Build();

// Enable Swagger in Development Mode
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Serve React Frontend (if deployed with .NET)
app.UseDefaultFiles();
app.UseStaticFiles();

app.UseHttpsRedirection();

// Enable CORS before routing
app.UseCors("AllowReactApp");

// Map Controller Endpoints
app.MapControllers();

// Redirect Unmatched Routes to React App (Important for SPA)
app.MapFallbackToFile("/index.html");

app.Run();