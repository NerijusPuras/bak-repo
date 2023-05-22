using Data.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebAPI.Controllers;
using WebAPI.Services.Interfaces;

namespace WebAPI.Controllers.Tests
{
    [TestClass]
    public class LecturesControllerTests
    {
        [TestMethod]
        public async Task GetLectureByIdTest()
        {
            // Arrange
            Guid lectureId = Guid.NewGuid();
            var lectureServiceMock = new Mock<ILectureService>();
            lectureServiceMock.Setup(x => x.GetLectureById(lectureId))
                .ReturnsAsync(new Lecture());

            var controller = new LecturesController(
                lectureService: lectureServiceMock.Object,
                slideService: null,
                contributionService: null,
                lectureEntryScoreService: null,
                contributionValidationService: null);

            // Act
            var result = await controller.GetLectureById(lectureId);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result, typeof(Lecture));
        }

        [TestMethod]
        public async Task GetSlideDtosByLectureIdTest()
        {
            // Arrange
            Guid lectureId = Guid.NewGuid();
            var slideServiceMock = new Mock<ISlideService>();
            slideServiceMock.Setup(x => x.GetSlideDtosByLectureId(lectureId))
                .ReturnsAsync(new List<SlideDto>());

            var controller = new LecturesController(
                lectureService: null,
                slideService: slideServiceMock.Object,
                contributionService: null,
                lectureEntryScoreService: null,
                contributionValidationService: null);

            // Act
            var result = await controller.GetSlideDtosByLectureId(lectureId);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result, typeof(List<SlideDto>));
        }

        [TestMethod]
        public async Task GetSlideIdsByIndexByLectureIdTest()
        {
            // Arrange
            Guid lectureId = Guid.NewGuid();
            var slideServiceMock = new Mock<ISlideService>();
            slideServiceMock.Setup(x => x.GetSlideIdsByIndexByLectureId(lectureId))
                .ReturnsAsync(new List<Guid>());

            var controller = new LecturesController(
                lectureService: null,
                slideService: slideServiceMock.Object,
                contributionService: null,
                lectureEntryScoreService: null,
                contributionValidationService: null);

            // Act
            var result = await controller.GetSlideIdsByIndexByLectureId(lectureId);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result, typeof(List<Guid>));
        }

        [TestMethod]
        public async Task GetSlideDtosByLectureIdAndSlideIdTest()
        {
            // Arrange
            Guid lectureId = Guid.NewGuid();
            Guid slideId = Guid.NewGuid();
            var slideServiceMock = new Mock<ISlideService>();
            slideServiceMock.Setup(x => x.GetSlideDtoByLectureIdAndSlideId(lectureId, slideId))
                .ReturnsAsync(new SlideDto());

            var controller = new LecturesController(
                lectureService: null,
                slideService: slideServiceMock.Object,
                contributionService: null,
                lectureEntryScoreService: null,
                contributionValidationService: null);

            // Act
            var result = await controller.GetSlideDtosByLectureIdAndSlideId(lectureId, slideId);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result, typeof(SlideDto));
        }

        [TestMethod]
        public async Task GetRandomContributionByLectureIdTest()
        {
            // Arrange
            Guid lectureId = Guid.NewGuid();
            var contributionServiceMock = new Mock<IContributionService>();
            contributionServiceMock.Setup(x => x.GetRandomContributionByLectureId(lectureId))
                .ReturnsAsync(new ContributionDto());

            var controller = new LecturesController(
                lectureService: null,
                slideService: null,
                contributionService: contributionServiceMock.Object,
                lectureEntryScoreService: null,
                contributionValidationService: null);

            // Act
            var result = await controller.GetRandomContributionByLectureId(lectureId);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result, typeof(ContributionDto));
        }

        [TestMethod]
        public async Task GetLectureEntryScoresByLectureIdTest()
        {
            // Arrange
            Guid lectureId = Guid.NewGuid();
            var lectureEntryScoreServiceMock = new Mock<ILectureEntryScoreService>();
            lectureEntryScoreServiceMock.Setup(x => x.GetLeaderboardScoresByLectureId(lectureId))
                .ReturnsAsync(new List<LectureEntryScore>());

            var controller = new LecturesController(
                lectureService: null,
                slideService: null,
                contributionService: null,
                lectureEntryScoreService: lectureEntryScoreServiceMock.Object,
                contributionValidationService: null);

            // Act
            var result = await controller.GetLectureEntryScoresByLectureId(lectureId);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result, typeof(List<LectureEntryScore>));
        }

        [TestMethod]
        public async Task CreateLectureEntryScoreTest()
        {
            // Arrange
            var lectureEntryScore = new LectureEntryScore();
            var lectureEntryScoreServiceMock = new Mock<ILectureEntryScoreService>();
            lectureEntryScoreServiceMock.Setup(x => x.CreateLectureScoreEntry(lectureEntryScore))
                .ReturnsAsync(Guid.NewGuid());

            var controller = new LecturesController(
                lectureService: null,
                slideService: null,
                contributionService: null,
                lectureEntryScoreService: lectureEntryScoreServiceMock.Object,
                contributionValidationService: null);

            // Act
            var result = await controller.CreateLectureEntryScore(lectureEntryScore);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result, typeof(Guid));
        }

        [TestMethod]
        public async Task CreateContributionValidationTest()
        {
            // Arrange
            var contributionValidation = new ContributionValidation();
            var contributionValidationServiceMock = new Mock<IContributionValidationService>();
            contributionValidationServiceMock.Setup(x => x.CreateContributionValidation(contributionValidation))
                .ReturnsAsync(Guid.NewGuid());

            var controller = new LecturesController(
                lectureService: null,
                slideService: null,
                contributionService: null,
                lectureEntryScoreService: null,
                contributionValidationService: contributionValidationServiceMock.Object);

            // Act
            var result = await controller.CreateContributionValidation(contributionValidation);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result, typeof(Guid));
        }

        [TestMethod]
        public async Task GetContributionsCountForLectureTest()
        {
            // Arrange
            Guid lectureId = Guid.NewGuid();
            var lectureServiceMock = new Mock<ILectureService>();
            lectureServiceMock.Setup(x => x.GetContributionsCountForLecture(lectureId))
                .ReturnsAsync(10);

            var controller = new LecturesController(
                lectureService: lectureServiceMock.Object,
                slideService: null,
                contributionService: null,
                lectureEntryScoreService: null,
                contributionValidationService: null);

            // Act
            var result = await controller.GetContributionsCountForLecture(lectureId);

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(10, result);
        }
    }
}
