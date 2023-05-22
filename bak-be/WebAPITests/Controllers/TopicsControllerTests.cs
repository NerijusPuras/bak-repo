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
    public class TopicsControllerTests
    {
        [TestMethod]
        public async Task GetTopicDtosTest()
        {
            // Arrange
            var topicServiceMock = new Mock<ITopicService>();
            topicServiceMock.Setup(x => x.GetTopicDtos())
                .ReturnsAsync(new List<TopicDto>());

            var controller = new TopicsController(
                topicServiceMock.Object,
                lectureService: null,
                lectureEntryScoreService: null);

            // Act
            var result = await controller.GetTopicDtos();

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result, typeof(List<TopicDto>));
        }

        [TestMethod]
        public async Task CreateDefaultTopicTest()
        {
            // Arrange
            var topicServiceMock = new Mock<ITopicService>();
            topicServiceMock.Setup(x => x.CreateTopic(It.IsAny<Topic>()))
                .ReturnsAsync(Guid.NewGuid());

            var controller = new TopicsController(
                topicServiceMock.Object,
                lectureService: null,
                lectureEntryScoreService: null);

            // Act
            var result = await controller.CreateDefaultTopic();

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result, typeof(OkObjectResult));
        }

        [TestMethod]
        public async Task GetTopicByTopicIdAsyncTest()
        {
            // Arrange
            Guid topicId = Guid.NewGuid();
            var topicServiceMock = new Mock<ITopicService>();
            topicServiceMock.Setup(x => x.GetTopicById(topicId))
                .ReturnsAsync(new Topic());

            var controller = new TopicsController(
                topicServiceMock.Object,
                lectureService: null,
                lectureEntryScoreService: null);

            // Act
            var result = await controller.GetTopicByTopicIdAsync(topicId);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result, typeof(Topic));
        }

        [TestMethod]
        public async Task GetLectureDtosByTopicIdTest()
        {
            // Arrange
            Guid topicId = Guid.NewGuid();
            var lectureServiceMock = new Mock<ILectureService>();
            lectureServiceMock.Setup(x => x.GetLectureDtosByTopicId(topicId))
                .ReturnsAsync(new List<LectureDto>());

            var controller = new TopicsController(
                topicService: null,
                lectureServiceMock.Object,
                lectureEntryScoreService: null);

            // Act
            var result = await controller.GetLectureDtosByTopicId(topicId);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result, typeof(List<LectureDto>));
        }

        [TestMethod]
        public async Task GetOverallLeaderboardScoreListTest()
        {
            // Arrange
            var lectureEntryScoreServiceMock = new Mock<ILectureEntryScoreService>();
            lectureEntryScoreServiceMock.Setup(x => x.GetOverallLeaderboardScoreList())
                .ReturnsAsync(new List<MainLectureEntryScore>());

            var controller = new TopicsController(
                topicService: null,
                lectureService: null,
                lectureEntryScoreServiceMock.Object);

            // Act
            var result = await controller.GetOverallLeaderboardScoreList();

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result, typeof(List<MainLectureEntryScore>));
        }

        [TestMethod]
        public async Task GetLeaderboardScoreListByTopicIdTest()
        {
            // Arrange
            Guid topicId = Guid.NewGuid();
            var topicServiceMock = new Mock<ITopicService>();
            topicServiceMock.Setup(x => x.GetLeaderboardScoreListByTopicId(topicId))
                .ReturnsAsync(new List<LectureEntryScore>());

            var controller = new TopicsController(
                topicServiceMock.Object,
                lectureService: null,
                lectureEntryScoreService: null);

            // Act
            var result = await controller.GetLeaderboardScoreListByTopicId(topicId);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result, typeof(List<LectureEntryScore>));
        }
    }
}
