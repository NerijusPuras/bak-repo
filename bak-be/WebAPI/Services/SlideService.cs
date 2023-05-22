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
using Microsoft.AspNetCore.Http;

public class SlideService : ISlideService
{
    private readonly ISlideRepository _slideRepository;
    public SlideService(ISlideRepository slideRepository)
    {
        _slideRepository = slideRepository;
    }

    public async Task<Guid> CreateSlide(Slide slide)
    {
        return await _slideRepository.CreateSlide(slide);
    }

    public async Task<Guid?> GetCorrectAnswerId(Guid slideId)
    {
        return await _slideRepository.GetCorrectAnswerId(slideId);
    }

    public async Task<SlideDto?> GetSlideDtoByLectureIdAndSlideId(Guid lectureId, Guid slideId)
    {
        return await _slideRepository.GetSlideDtoByLectureIdAndSlideId(lectureId, slideId);
    }

    public async Task<List<SlideDto>?> GetSlideDtosByLectureId(Guid lectureId)
    {
        return await _slideRepository.GetSlideDtosByLectureId(lectureId);
    }

    public async Task<List<Guid>?> GetSlideIdsByIndexByLectureId(Guid lectureId)
    {
        return await _slideRepository.GetSlideIdsByIndexByLectureId(lectureId);
    }

    public async Task<Guid> SaveContributionForSlide(Guid lectureId, Guid slideId, string contribution)
    {
        return await _slideRepository.SaveContributionForSlide(lectureId, slideId, contribution);
    }
}
