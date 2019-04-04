using System.Collections.Generic;
using System.Linq;
using API.Interfaces;
using API.Models;
using API.Services;
using FakeItEasy;
using NUnit.Framework;

namespace APU.UnitTests.Services
{
    public class ProductServiceTests
    {
        private IProductRepository productRepository;
        private ProductService productService;
        
        [SetUp] 
        public void SetUp()
        {
            this.productRepository = A.Fake<IProductRepository>();
            this.productService = new ProductService(this.productRepository);
        }
        
        [Test]
        public void Get_ReturnsResultFromRepository()
        {
            // Arrange
            var product = new Product
            {
                Id = 1,
                Name = "Test",
                Description = "Test description",
                Price = 100,
                Stock = 100,
                Image = "123"
      
            };
            

            var products = new List<Product>
            {
                product
            };

            A.CallTo(() => this.productRepository.Get()).Returns(products);
            // Act
            var result = this.productService.Get().Single();

            // Assert
            Assert.That(result, Is.EqualTo(product));
        }
        
        [Test]
        public void Get_GivenId_ReturnsResultFromRepository()
        {
            // Arrange
            var product = new Product
            {
                Id = 1,
                Name = "Test",
                Description = "Test description",
                Price = 100,
                Stock = 100,
                Image = "123"
      
            };

            A.CallTo(() => this.productRepository.Get(product.Id)).Returns(product);
            // Act
            var result = this.productService.Get(product.Id);

            // Assert
            Assert.That(result, Is.EqualTo(product));
        }
    }
}