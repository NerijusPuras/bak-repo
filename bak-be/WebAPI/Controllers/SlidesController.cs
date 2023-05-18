namespace WebAPI.Controllers;

using Data.Models;
using Microsoft.AspNetCore.Mvc;

using WebAPI.Services.Interfaces;

[Route("api/[controller]")]
[ApiController]
public class SlidesController : ControllerBase
{
    private readonly ISlideService _slideService;

    public SlidesController(ISlideService slideService)
    {
        _slideService = slideService;
    }

    [HttpPost("{lectureId}")]
    public async Task<IActionResult> CreateDefaultSlide([FromRoute] Guid lectureId)
    {
        var slide = new Slide
        {
            Text = "Lecture def",
            Index = 1,
            IsQuestion = false,
            LectureId = lectureId,
        };

        var slideId = await _slideService.CreateSlide(slide);

        return Ok(slideId);
    }

    //[HttpGet("{lectureId}")]
    //public async Task<List<Slide>> GetSlidesByLectureId([FromRoute] Guid lectureId)
    //{
    //    return await _slideService.GetSlidesByLectureId(lectureId);
    //}


    /// TO DO sitoj vietoj
    [HttpGet("{slideId}/CorrectAnswer")]
    public async Task<Guid?> GetCorrectAnswerId([FromRoute] Guid slideId)
    {
        return await _slideService.GetCorrectAnswerId(slideId);
    }
}
