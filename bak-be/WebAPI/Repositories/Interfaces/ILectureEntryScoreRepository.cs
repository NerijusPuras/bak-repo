
namespace WebAPI;

using Data.Models;

public interface ILectureEntryScoreRepository
{
    Task<List<LectureEntryScore>> GetLeaderboardScoresByLectureId(Guid lectureId);
    Task<Guid> CreateLectureScoreEntry(LectureEntryScore lectureEntryScore);
    Task<List<MainLectureEntryScore>> GetOverallLeaderboardScoreList();
}

