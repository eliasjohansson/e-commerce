using System.Collections.Generic;
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

        public Order Get(int id)
        {
            var order = OrderRepository.Get(id);
            return order;
        }
        public List<Order> GetByUser(int userId)
        {
            var orders = OrderRepository.GetByUser(userId);
            return orders;
        }

        public int Create(Order order)
        {
            var orderId = OrderRepository.Create(order);
            return orderId;
        }
    }
}