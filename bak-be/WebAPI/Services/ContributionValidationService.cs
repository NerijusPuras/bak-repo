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
using System.Threading.Tasks;
using System;
using System.Collections.Generic;

public class ContributionValidationService : IContributionValidationService
{
    private readonly IContributionValidationRepository _contributionValidationRepository;
    public ContributionValidationService(IContributionValidationRepository contributionValidationRepository)
    {
        _contributionValidationRepository = contributionValidationRepository;
    }

    public async Task<Guid> CreateContributionValidation(ContributionValidation contributionValidation)
    {
        return await _contributionValidationRepository.CreateContributionValidation(contributionValidation);
    }
}
