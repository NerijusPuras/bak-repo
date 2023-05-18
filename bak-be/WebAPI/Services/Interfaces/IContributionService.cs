namespace WebAPI.Services.Interfaces;

using System;
using System.Threading.Tasks;
using Data.Models;


public interface IContributionService
{
    Task<ContributionDto?> GetRandomContributionByLectureId(Guid lectureId);
    Task CreateDefaultContribution(Guid lectureId);
}
