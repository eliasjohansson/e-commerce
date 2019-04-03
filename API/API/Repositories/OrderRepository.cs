using API.Models;
using Dapper;
using Microsoft.AspNetCore.Authorization;
using MySql.Data.MySqlClient;

namespace API.Repositories
{
    
    public class OrderRepository
    {
        
        private readonly string connectionString;

        public OrderRepository(string connectionString)
        {
            this.connectionString = connectionString;
        }
        
        public int Create(Order order)
        {
            using (var connection = new MySqlConnection(connectionString))
            {
                dynamic orderId;
                
                if (order.CustomerId != null)
                {
                    var cart = connection.QuerySingleOrDefault<Cart>("SELECT * FROM Carts WHERE id = @cartId",
                        new {order.CartId});
       
                    
                    orderId = connection.QuerySingle<int>("INSERT INTO Orders (cartId, customerId, shippingAddress, shippingCountry, shippingZipcode) VALUES(@cartId, @customerId, @shippingAddress, @shippingCountry, @shippingZipcode); SELECT LAST_INSERT_ID()", order);
                }
                else
                {
                    orderId = connection.QuerySingle<int>("INSERT INTO Orders (cartId, shippingAddress, shippingCountry, shippingZipcode, customerEmail, customerName) VALUES(@cartId, @shippingAddress, @shippingCountry, @shippingZipcode, @customerEmail, @customerName); SELECT LAST_INSERT_ID()", order);
                }
                
                connection.Execute("UPDATE Carts SET Ordered = 1 WHERE id = @cartId", new {order.CartId});
                
                return orderId;
            }
        }
    }
}