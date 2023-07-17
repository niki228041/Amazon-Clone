FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /app

# Copy and restore the project
COPY . .
RUN dotnet restore "ShopApi/ShopApi.csproj"


# Install the dotnet-ef tool locally
RUN dotnet tool install -g dotnet-ef
ENV PATH $PATH:/root/.dotnet/tools
RUN dotnet-ef database update --startup-project "ShopApi" --project "DAL/DAL.csproj"

# Publish the application
RUN dotnet publish "ShopApi/ShopApi.csproj" -c Release -o /app/build
# Build the final image
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS final
WORKDIR /app
COPY --from=build /app/build .
EXPOSE 5034
ENTRYPOINT ["dotnet", "ShopApi.dll", "--urls", "http://0.0.0.0:5034"]