namespace WebAPI;

using Data.Models;

public interface IContributionRepository
{
    Task<ContributionDto?> GetRandomContributionByLectureId(Guid lectureId);
    Task CreateDefaultContribution(Guid lectureId);
}

