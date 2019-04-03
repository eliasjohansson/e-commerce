using System.Collections.Generic;
using System.Linq;
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

        public List<Order> GetByUser(int userId)
        {
            using (var connection = new MySqlConnection(connectionString))
            {
                var orderSQL = "SELECT * FROM Orders WHERE customerId = @customerId";
                var productsSQL = "SELECT * FROM OrderProducts WHERE orderId = @orderId";
                
                var orders = connection.Query<Order>(orderSQL, new { customerId = userId }).ToList();
                if (orders.Any())
                {
                    foreach (var order in orders)
                    {
                        var products = (List<Product>)connection.Query<Product>(productsSQL,new {orderId = order.Id});
                        order.Products = products;
                    }
                   
                }
                return orders;
            }
        }
        
        public int Create(Order order)
        {
            using (var connection = new MySqlConnection(connectionString))
            {
                dynamic orderId;
                
                if (order.CustomerId != null)
                {
                    orderId = connection.QuerySingle<int>("INSERT INTO Orders (customerId, shippingAddress, shippingCountry, shippingCity shippingZipcode) VALUES(@customerId, @shippingAddress, @shippingCountry, @shippingCity, @shippingZipcode); SELECT LAST_INSERT_ID()", order);
                }
                else
                {
                    orderId = connection.QuerySingle<int>("INSERT INTO Orders (shippingAddress, shippingCountry, shippingCity shippingZipcode, customerEmail, customerName) VALUES(@shippingAddress, @shippingCountry, @shippingCity, @shippingZipcode, @customerEmail, @customerName); SELECT LAST_INSERT_ID()", order);
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