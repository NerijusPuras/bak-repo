using Data.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System;
using System.Threading.Tasks;
using WebAPI.Controllers;
using WebAPI.Services.Interfaces;

namespace WebAPI.Controllers.Tests
{
    [TestClass]
    public class SlidesControllerTests
    {
        [TestMethod]
        public async Task CreateDefaultSlideTest()
        {
            // Arrange
            Guid lectureId = Guid.NewGuid();
            var slideServiceMock = new Mock<ISlideService>();
            slideServiceMock.Setup(x => x.CreateSlide(It.IsAny<Slide>()))
                .ReturnsAsync(Guid.NewGuid());

            var controller = new SlidesController(slideServiceMock.Object);

            // Act
            var result = await controller.CreateDefaultSlide(lectureId);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result, typeof(OkObjectResult));
        }

        [TestMethod]
        public async Task GetCorrectAnswerIdTest()
        {
            // Arrange
            Guid slideId = Guid.NewGuid();
            var slideServiceMock = new Mock<ISlideService>();
            slideServiceMock.Setup(x => x.GetCorrectAnswerId(slideId))
                .ReturnsAsync(Guid.NewGuid());

            var controller = new SlidesController(slideServiceMock.Object);

            // Act
            var result = await controller.GetCorrectAnswerId(slideId);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result, typeof(Guid));
        }
    }
}
