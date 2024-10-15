using Play.Common.CORS;
using Play.Catalog.Service.Entities;
using Play.Common.MassTransit;
using Play.Common.Service.MongoDB;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddMongo()
                .AddMongoRepository<Item>("items")
                .AddMassTransitWithRabbitMQ(builder.Configuration)
                .AddCORSConfig(builder.Configuration);

// Add controllers
builder.Services.AddControllers(options =>
{
    options.SuppressAsyncSuffixInActionNames = false;
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowSpecificOrigin");
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
