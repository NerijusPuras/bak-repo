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

public class LectureEntryScoreService : ILectureEntryScoreService
{
    private readonly ILectureEntryScoreRepository _lectureEntryScoreRepository;
    public LectureEntryScoreService(ILectureEntryScoreRepository lectureEntryScoreRepository)
    {
        _lectureEntryScoreRepository = lectureEntryScoreRepository;
    }

    public async Task<Guid> CreateLectureScoreEntry(LectureEntryScore lectureEntryScore)
    {
        return await _lectureEntryScoreRepository.CreateLectureScoreEntry(lectureEntryScore);
    }

    public async Task<List<LectureEntryScore>> GetLeaderboardScoresByLectureId(Guid lectureId)
    {
        return await _lectureEntryScoreRepository.GetLeaderboardScoresByLectureId(lectureId);
    }

    public async Task<List<MainLectureEntryScore>> GetOverallLeaderboardScoreList()
    {
        return await _lectureEntryScoreRepository.GetOverallLeaderboardScoreList();
    }
}
