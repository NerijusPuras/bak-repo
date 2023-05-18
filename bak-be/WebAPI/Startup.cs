namespace WebAPI;

using Autofac;
using Autofac.Extras.DynamicProxy;
using Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Autofac.Extensions.DependencyInjection;
using WebAPI.Services.Interfaces;
using WebAPI.Services;
using SFKR.DataAccess;

public class Startup
{
    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public IConfiguration Configuration { get; }
    public ILifetimeScope AutofacContainer { get; private set; }

    public void ConfigureServices(IServiceCollection services)
    {
        services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

        }).AddJwtBearer(options =>
        {
            options.Authority = Configuration.GetValue<string>("Auth0:Authority");
            options.Audience = Configuration.GetValue<string>("Auth0:Audience");
            options.RequireHttpsMetadata = false;
        });

        services.AddCors(options =>
        {
            options.AddPolicy("CorsPolicy", builder =>
            {
                builder.WithOrigins("http://localhost:3000")
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials();
            });
        });
        services.AddControllers();
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();

        services.AddDbContext<BakbeContext>();

        services.AddScoped<ITopicService, TopicService>();
        services.AddScoped<ILectureService, LectureService>();
        services.AddScoped<ISlideService, SlideService>();
        services.AddScoped<IContributionService, ContributionService>();
        services.AddScoped<ILectureEntryScoreService, LectureEntryScoreService>();
        services.AddScoped<IContributionValidationService, ContributionValidationService>();

        services.AddScoped<ITopicRepository, TopicRepository>();
        services.AddScoped<ILectureRepository, LectureRepository>();
        services.AddScoped<ISlideRepository, SlideRepository>();
        services.AddScoped<IContributionRepository, ContributionRepository>();
        services.AddScoped<ILectureEntryScoreRepository, LectureEntryScoreRepository>();
        services.AddScoped<IContributionValidationRepository, ContributionValidationRepository>();
    }

    //public void ConfigureContainer(ContainerBuilder b)
    //{
    //    b.Register(i => new LoggerInterceptor());
    //    b.RegisterType<ItemService>()
    //        .AsImplementedInterfaces()
    //        .EnableInterfaceInterceptors()
    //        .InterceptedBy(typeof(LoggerInterceptor));
    //    b.RegisterType<AddressService>()
    //        .AsImplementedInterfaces()
    //        .EnableInterfaceInterceptors()
    //        .InterceptedBy(typeof(LoggerInterceptor));
    //    b.RegisterType<UserService>()
    //        .AsImplementedInterfaces()
    //        .EnableInterfaceInterceptors()
    //        .InterceptedBy(typeof(LoggerInterceptor));
    //}

    public void Configure(IApplicationBuilder app)
    {
        // Configure the HTTP request pipeline.
        app.UseSwagger();
        app.UseSwaggerUI();
        app.UseDeveloperExceptionPage();

        app.UseAuthentication();
        AutofacContainer = app.ApplicationServices.GetAutofacRoot();

        using (var scope = app.ApplicationServices.CreateScope())
        using (var context = scope.ServiceProvider.GetRequiredService<BakbeContext>())
        context.Database.EnsureCreated();

        app.UseHttpsRedirection();

        app.UseCors("CorsPolicy");

        app.UseRouting();
        app.UseAuthorization();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
        });
    }
}
