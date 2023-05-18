namespace WebAPI.Services.Interfaces;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Data.Models;

public interface ILectureEntryScoreService
{
    Task<List<LectureEntryScore>> GetLeaderboardScoresByLectureId(Guid lectureId);
    Task<Guid> CreateLectureScoreEntry(LectureEntryScore lectureEntryScore);
    Task<List<MainLectureEntryScore>> GetOverallLeaderboardScoreList();
}
