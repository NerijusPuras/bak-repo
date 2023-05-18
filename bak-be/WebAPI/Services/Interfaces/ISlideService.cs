namespace WebAPI.Services.Interfaces;

using System.Collections.Generic;
using System.Threading.Tasks;
using Data.Models;
using Microsoft.AspNetCore.Http;

public interface ISlideService
{
    Task<Guid> CreateSlide(Slide slide);
    Task<List<SlideDto>?> GetSlideDtosByLectureId(Guid lectureId);
    Task<SlideDto?> GetSlideDtoByLectureIdAndSlideId(Guid lectureId, Guid slideId);
    Task<List<Guid>?> GetSlideIdsByIndexByLectureId(Guid lectureId);
    Task<Guid?> GetCorrectAnswerId(Guid slideId);
    Task<Guid> SaveContributionForSlide(Guid lectureId, Guid slideId, string knowledge);
}
