using API.Models;
using API.Repositories;
using API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace API.Controllers
{
    [Route("api/[controller]s")]
    public class ProductController : Controller
    {
        private string connectionString;
        private readonly ProductService productService;
        
        public ProductController(IConfiguration configuration)
        {
            connectionString = configuration.GetConnectionString("ConnectionString");
            productService = new ProductService(new ProductRepository(connectionString));
        }
        
        [HttpGet]
        public IActionResult Get()
        {
            var product = productService.Get();
            return Ok(product);
        }
        
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var productItem = productService.Get(id);
            
            if (productItem != null)
            {
                return Ok(productItem);
            }
    
            return NotFound();
        }
        
        [HttpPost]
        public IActionResult Post([FromBody]Product product)
        {
            var result = productService.Add(product);
            if (!result)
            {
                return BadRequest();
            }
            
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var result = productService.Delete(id);
           
            if (!result)
            {
                return NotFound();
            }
    
            return Ok();
        }
    }
}