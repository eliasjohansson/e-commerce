using API.Models;
using Dapper;
using Microsoft.AspNetCore.Authorization;
using MySql.Data.MySqlClient;

namespace API.Repositories
{
    
    public class OrderRepository
    {
        
        private readonly string connectionString;
        private readonly CartRepository cartRepository;

        public OrderRepository(string connectionString)
        {
            this.connectionString = connectionString;
            cartRepository = new CartRepository(connectionString);
        }
        
        public int Create(Order order)
        {
            using (var connection = new MySqlConnection(connectionString))
            {
                dynamic orderId;
                
                if (order.CustomerId != null)
                {
                    orderId = connection.QuerySingle<int>("INSERT INTO Orders (customerId, shippingAddress, shippingCountry, shippingZipcode) VALUES(@customerId, @shippingAddress, @shippingCountry, @shippingZipcode); SELECT LAST_INSERT_ID()", order);
                }
                else
                {
                    orderId = connection.QuerySingle<int>("INSERT INTO Orders (shippingAddress, shippingCountry, shippingZipcode, customerEmail, customerName) VALUES(@shippingAddress, @shippingCountry, @shippingZipcode, @customerEmail, @customerName); SELECT LAST_INSERT_ID()", order);
                }
                
                var cart = cartRepository.Get(order.CartId);
                
                foreach (var product in cart.Products)
                {
                    connection.Execute(
                        "INSERT INTO OrderProducts (orderId, name, price, quantity, image) VALUES (@orderId, @name, @price, @quantity, @image)",
                        new { orderId, name = product.Name, price = product.Price, quantity = product.Quantity, image = product.Image });
                }

                cartRepository.Delete(order.CartId);
                
                return orderId;
            }
        }
    }
}