using Data;
using Data.Models;
using Microsoft.EntityFrameworkCore;


namespace SFKR.DataAccess;

public class LectureEntryScoreRepository : ILectureEntryScoreRepository
{
    private readonly BakbeContext _context;

    public LectureEntryScoreRepository(BakbeContext context)
    {
        _context = context;
    }

    public async Task<Guid> CreateLectureScoreEntry(LectureEntryScore lectureEntryScore)
    {
        await _context.LectureEntryScores.AddAsync(lectureEntryScore);
        await _context.SaveChangesAsync();

        return lectureEntryScore.Id;
    }

    public async Task<List<LectureEntryScore>> GetLeaderboardScoresByLectureId(Guid lectureId)
    {
        var scores = await _context.LectureEntryScores.ToListAsync();

        var lastEntry = scores.Where(x => x.PlayerName == "Vardenis Pavardenis")
            .LastOrDefault();

        var scoresGroupedByNicknames = 
            scores.Where(x => x.LectureId == lectureId)
                .GroupBy(x => x.PlayerName)
                .Select(g => new LectureEntryScore
                {
                    Id = g.First().Id,
                    PlayerName = g.Key,
                    CorrectAnswers = 
                        g.Key == "Vardenis Pavardenis"
                            ? (int)lastEntry?.CorrectAnswers
                            : g.Max(x => x.CorrectAnswers),
                    TotalQuestions = 
                        g.Key == "Vardenis Pavardenis"
                            ? (int)lastEntry?.TotalQuestions
                            : g.Max(x => x.TotalQuestions),
                    TotalScore = 
                        g.Key == "Vardenis Pavardenis"
                            ? (int)lastEntry?.TotalScore
                            : g.Max(x => x.TotalScore),
                    HasKnowledgeSharingBadge = 
                        g.Key == "Vardenis Pavardenis" 
                            ? lastEntry?.HasKnowledgeSharingBadge ?? false 
                            : g.Any(x => x.HasKnowledgeSharingBadge),
                    HasExpertBadge = 
                        g.Key == "Vardenis Pavardenis"
                            ? lastEntry?.HasExpertBadge ?? false
                            : g.Any(x => x.HasExpertBadge),
                }
                )
                .OrderByDescending(x => x.TotalScore)
                .Take(10)
                .ToList();

        return scoresGroupedByNicknames;
    }

    public async Task<List<MainLectureEntryScore>> GetOverallLeaderboardScoreList()
    {
        var scores = await _context.LectureEntryScores.ToListAsync();
        var scoresGroupedByNicknames =
            scores.GroupBy(x => x.PlayerName)
            .Select(g => new MainLectureEntryScore()
            {
                Id = g.First().Id,
                PlayerName = g.Key,
                TotalScore = g.Sum(x => x.TotalScore),
                CorrectAnswers = g.Sum(x => x.CorrectAnswers),
                TotalQuestions = g.Sum(x => x.TotalQuestions),
                HasKnowledgeSharingBadge = g.Any(x => x.HasKnowledgeSharingBadge),
                HasExpertBadge = g.Any(x => x.HasExpertBadge),
                KnowledgeSharingBadgeCount = g.Where(x => x.HasKnowledgeSharingBadge).Count(),
                ExpertBadgeCount = g.Where(x => x.HasExpertBadge).Count(),
            })
            .OrderByDescending(x => x.TotalScore)
            .Take(10).ToList();
        return scoresGroupedByNicknames;
    }
}
