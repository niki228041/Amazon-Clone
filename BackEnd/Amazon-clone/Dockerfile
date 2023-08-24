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
RUN dotnet build "ShopApi/ShopApi.csproj" -c Release -o /app/build
FROM build AS publish

RUN dotnet publish "ShopApi/ShopApi.csproj" -c Release -o /app/publish
COPY ShopApi/images /app/publish/images
COPY ShopApi/comment_images /app/publish/comment_images
COPY ShopApi/company_images /app/publish/company_images
COPY ShopApi/music_images /app/publish/music_images
# Build the final image
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .

EXPOSE 5034
ENTRYPOINT ["dotnet", "ShopApi.dll","--urls","http://0.0.0.0:5034"]