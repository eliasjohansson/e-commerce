using API.Models;
using API.Repositories;

namespace API.Services
{
    public class OrderService
    {
        private readonly OrderRepository OrderRepository;

        public OrderService(OrderRepository OrderRepository)
        {
            this.OrderRepository = OrderRepository;
        }

        public int Create(Order order)
        {
            var orderId = OrderRepository.Create(order);
            return orderId;
        }
    }
}