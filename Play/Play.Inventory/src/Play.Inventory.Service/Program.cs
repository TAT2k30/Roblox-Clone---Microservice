
using Amazon.Auth.AccessControlPolicy;
using Play.Common.Service.MongoDB;
using Play.Inventory.Service.Clients;
using Play.Inventory.Service.Entities;
using Polly;
using Polly.Timeout;

var builder = WebApplication.CreateBuilder(args);
var serviceProvider = builder.Services.BuildServiceProvider();
// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddControllers();
builder.Services.AddSwaggerGen();
//Adding Repository of MongoDB
builder.Services.AddMongo().AddMongoRepository<InventoryItem>("inventoryItems");
builder.Services.AddHttpClient<CatalogClient>(client =>
{
    client.BaseAddress = new Uri("http://localhost:5001");
})
.AddTransientHttpErrorPolicy(builder => builder.Or<TimeoutRejectedException>().WaitAndRetryAsync(
    5,
    retryAttempt => TimeSpan.FromSeconds(Math.Pow(2, retryAttempt)),
    onRetry: (outCome, timespan, retryAttempt) =>
     {
         serviceProvider.GetService<ILogger<CatalogClient>>()?
         .LogWarning($"Delaying for {timespan.TotalSeconds} seconds, then making retry {retryAttempt}");
     }
))
.AddTransientHttpErrorPolicy(builder => builder.Or<TimeoutRejectedException>().CircuitBreakerAsync(
    3,
    TimeSpan.FromSeconds(15),
    onBreak: (outcome, timespan) =>
    {
        serviceProvider.GetService<ILogger<CatalogClient>>()?
        .LogWarning($"Opening the circuit for {timespan.TotalSeconds} seconds ...");
    },
    onReset: () =>
    {
        serviceProvider.GetService<ILogger<CatalogClient>>()?
       .LogWarning($"Closing the circuit...");
    }
))
.AddPolicyHandler(Polly.Policy.TimeoutAsync<HttpResponseMessage>(1)); //settime là 1 giây
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.MapControllers();
app.UseHttpsRedirection();

app.Run();
