using API.Models;
using API.Repositories;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace API.Controllers
{
    [Route("api/[controller]s")]
    public class OrderController : Controller
    {
        private string connectionString;
        private readonly OrderService orderService;
        
        public OrderController (IConfiguration configuration)
        {
            connectionString = configuration.GetConnectionString("ConnectionString");
            orderService = new OrderService(new OrderRepository(connectionString));
        }

        /* [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var order = orderService.Get(id);

            if (order != null)
            {
                return Ok(order);
            }

            return NotFound();
        }*/

        [HttpPost("guest")]
        public IActionResult GuestCreate([FromBody] Order order)
        {
            var orderId = orderService.Create(order);
            return Ok(orderId);
        }
        
        [HttpPost, Authorize]
        public IActionResult Create([FromBody] Order order)
        {
            int customerId;

            if (int.TryParse(this.User.Identity.Name, out customerId))
            {
                order.CustomerId = customerId;
                var orderId = orderService.Create(order);
                if (orderId != 0) return Ok(orderId);
                return BadRequest();
            }

            return Unauthorized();
        }
        
    }
}