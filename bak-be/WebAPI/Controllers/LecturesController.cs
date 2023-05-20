namespace WebAPI.Controllers;

using Data.Models;
using Microsoft.AspNetCore.Mvc;

using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using WebAPI.Services.Interfaces;

[Route("api/[controller]")]
[ApiController]
public class LecturesController : ControllerBase
{
    private readonly ILectureService _lectureService;
    private readonly ISlideService _slideService;
    private readonly IContributionService _contributionService;
    private readonly ILectureEntryScoreService _lectureEntryScoreService;
    private readonly IContributionValidationService _contributionValidationService;

    public LecturesController(
        ILectureService lectureService,
        ISlideService slideService,
        IContributionService contributionService,
        ILectureEntryScoreService lectureEntryScoreService,
        IContributionValidationService contributionValidationService)
    {
        _lectureService = lectureService;
        _slideService = slideService;
        _contributionService = contributionService;
        _lectureEntryScoreService = lectureEntryScoreService;
        _contributionValidationService = contributionValidationService;
    }

    [HttpPost]
    public async Task<IActionResult> CreateDefaultLecture()
    {
        var lecture = new Lecture
        {
            Created = DateTime.Now,
            Modified = DateTime.Now,
            Title = "Default POST",
            Description =  "Default desc"
        };

        var lectureId = await _lectureService.CreateLecture(lecture);

        return Ok(lectureId);
    }

    [HttpGet]
    public async Task<List<LectureDto>> GetLectureDtos()
    {
        return await _lectureService.GetLectureDtos();
    }

    [HttpGet("{lectureId}")]
    public async Task<Lecture?> GetLectureById([FromRoute] Guid lectureId)
    {
        return await _lectureService.GetLectureById(lectureId);
    }

    //[HttpGet("{topicId}")]
    //public async Task<List<LectureDto>?> GetLectureDtosByTopicId([FromRoute] Guid topicId)
    //{
    //    return await _lectureService.GetLectureDtosByTopicId(topicId);
    //}

    [HttpGet("{lectureId}/Slides")]
    public async Task<List<SlideDto>?> GetSlideDtosByLectureId([FromRoute] Guid lectureId)
    {
        return await _slideService.GetSlideDtosByLectureId(lectureId);
    }

    [HttpGet("{lectureId}/SlideIds")]
    public async Task<List<Guid>?> GetSlideIdsByIndexByLectureId([FromRoute] Guid lectureId)
    {
        return await _slideService.GetSlideIdsByIndexByLectureId(lectureId);
    }

    [HttpGet("{lectureId}/Slides/{slideId}")]
    public async Task<SlideDto?> GetSlideDtosByLectureIdAndSlideId([FromRoute] Guid lectureId, [FromRoute] Guid slideId)
    {
        return await _slideService.GetSlideDtoByLectureIdAndSlideId(lectureId, slideId);
    }

    [HttpGet("{lectureId}/Contribution")]
    public async Task<ContributionDto?> GetRandomContributionByLectureId([FromRoute] Guid lectureId)
    {
        //await _contributionService.CreateDefaultContribution(lectureId);
        return await _contributionService.GetRandomContributionByLectureId(lectureId);
    }

    [HttpGet("{lectureId}/Leaderboard")]
    public async Task<List<LectureEntryScore>> GetLectureEntryScoresByLectureId([FromRoute] Guid lectureId)
    {
        return await _lectureEntryScoreService.GetLeaderboardScoresByLectureId(lectureId);
    }

    [HttpPost("{lectureId}/Leaderboard")]
    public async Task<Guid> CreateLectureEntryScore([FromBody] LectureEntryScore lectureEntryScore)
    {
        return await _lectureEntryScoreService.CreateLectureScoreEntry(lectureEntryScore);
    }

    [HttpPost("ContributionValidation")]
    public async Task<Guid> CreateContributionValidation([FromBody] ContributionValidation contributionValidation)
    {
        return await _contributionValidationService.CreateContributionValidation(contributionValidation);
    }

    [HttpPost("{lectureId}/slides/{slideId}/contribution")]
    public async Task<Guid> SaveContributionForSlide([FromRoute] Guid lectureId, [FromRoute] Guid slideId, [FromBody] string contribution)
    {
        return await _slideService.SaveContributionForSlide(lectureId, slideId, contribution);
    }

    [HttpGet("{lectureId}/contributionsCount")]
    public async Task<int> GetContributionsCountForLecture([FromRoute] Guid lectureId)
    {
        return await _lectureService.GetContributionsCountForLecture(lectureId);
    }
}
