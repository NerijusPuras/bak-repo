
namespace SFKR.DataAccess;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Data.Models;

public interface IContributionValidationRepository
{
    Task<Guid> CreateContributionValidation(ContributionValidation contributionValidation);
}

