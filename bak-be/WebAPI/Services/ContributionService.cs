namespace WebAPI.Services;


using Microsoft.EntityFrameworkCore;
using WebAPI.Services.Interfaces;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;
using SixLabors.ImageSharp.Formats.Jpeg;
using Autofac.Extras.DynamicProxy;
using Microsoft.AspNetCore.Mvc;
using Data;
using Data.Models;

public class ContributionService : IContributionService
{
    private readonly IContributionRepository _contributionRepository;
    public ContributionService(IContributionRepository contributionRepository)
    {
        _contributionRepository = contributionRepository;
    }

    public async Task CreateDefaultContribution(Guid lectureId)
    {
        await _contributionRepository.CreateDefaultContribution(lectureId);
    }

    public async Task<ContributionDto?> GetRandomContributionByLectureId(Guid lectureId)
    {
        return await _contributionRepository.GetRandomContributionByLectureId(lectureId);
    }
}
