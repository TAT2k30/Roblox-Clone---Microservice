# syntax=docker/dockerfile:1

# Create a stage for building the application.
FROM mcr.microsoft.com/dotnet/sdk:8.0-alpine AS build

# Copy the source code
COPY . /source
WORKDIR /source

# Thêm thư mục chứa các gói .nupkg
COPY /root/.nuget/packages /root/.nuget/packages
COPY C:/Users/Admin/Desktop/Streaming\ Project/BackEnd/packages/*.nupkg ./
# Restore and build the application
RUN dotnet nuget add source /root/.nuget/packages --name LocalNuget --store-password-in-clear-text
RUN dotnet restore
RUN dotnet publish -c Release -o /app

# Create a new stage for running the application
FROM mcr.microsoft.com/dotnet/aspnet:8.0-alpine AS final
WORKDIR /app

# Copy the published output
COPY --from=build /app .

ENTRYPOINT ["dotnet", "Play.Catalog.Service.dll"]
