using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure.Models.Mappers;

public class AutoMapperConfiguration
{
    public static void Config(IServiceCollection services)
    {
        services.AddAutoMapper(typeof(AppMappingProfile));
    }
}