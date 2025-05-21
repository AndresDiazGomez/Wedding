using Wedding.Module.Vote;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddVoteModule();

var app = builder.Build();

app.UseDefaultFiles();
app.MapStaticAssets();

app.UseHttpsRedirection();

app.MapVotingEndpoints();

app.MapFallbackToFile("/index.html");

app.Run();
