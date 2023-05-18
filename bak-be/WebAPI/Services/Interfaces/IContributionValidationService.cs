namespace WebAPI.Services.Interfaces;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Data.Models;

public interface IContributionValidationService
{
    Task<Guid> CreateContributionValidation(ContributionValidation contributionValidation);
}
