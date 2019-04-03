using System;
using API.Models;
using API.Repositories;
using API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace API.Controllers
{
    [Route("api/[controller]s")]
    public class CartController : Controller
    {
        private string connectionString;
        private readonly CartService cartService;
        
        public CartController (IConfiguration configuration)
        {
            connectionString = configuration.GetConnectionString("ConnectionString");
            cartService = new CartService(new CartRepository(connectionString), new ProductRepository(connectionString));
  
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var cart = cartService.Get(id);

            if (cart != null)
            {
                return Ok(cart);
            }

            return NotFound();
        }

        [HttpPost]
        public IActionResult Create()
        {
            var cartId = cartService.Create();
            return Ok(cartId);
        }

        [HttpPost("{id}")]
        public IActionResult Delete(int id)
        {
            cartService.Delete(id);
            return Ok();
        }
        
        [Route("{cartId}/products")]
        [HttpPost]
        public IActionResult AddProduct(int cartId, [FromBody] dynamic data )
        {
            if (cartService.AddProduct(cartId, (int) data.productId))
            {
                var cart = cartService.Get(cartId);
                var addedProduct = cart.Products.Find(p => p.Id == (int) data.productId);
                return Ok(addedProduct);
            }

            return NotFound();
        }

        [Route("{cartId}/products")]
        [HttpDelete]
        public IActionResult RemoveProduct(int cartId, [FromBody] dynamic data)
        {
            if (cartService.RemoveProduct(cartId, (int) data.productId))
            {
                var cart = cartService.Get(cartId);
                var removedProduct = cart.Products.Find(p => p.Id == (int) data.productId);
                if (removedProduct == null)
                {
                    return Ok(new {id = (int) data.productId, quantity = 0});
                }
                
                return Ok(removedProduct);
            }

            return NotFound();
        }
    }
}