using System.Collections.Generic;
using System.Linq;
using API.Models;
using Dapper;
using MySql.Data.MySqlClient;

namespace API.Repositories
{
    public class CartRepository
    {
        private readonly string connectionString;

        public CartRepository(string connectionString)
        {
            this.connectionString = connectionString;
        }
        
        public Cart Get(int id)
        {
            using (var connection = new MySqlConnection(connectionString))
            {
                var cartSQL = "SELECT * FROM Carts WHERE Id = @id";
                var productsSQL =
                    @"SELECT 
                        P.*,
                        CP.quantity 
                      FROM 
                        Carts_Products AS CP 
                        INNER JOIN Products AS P ON CP.productId = P.id 
                        WHERE CP.cartId = 1";
                
                var cart = connection.QuerySingleOrDefault<Cart>(cartSQL, new { id });
                var products = cart.Products = (List<Product>)connection.Query<Product>(productsSQL,new {id});
                cart.Products = products;
                return cart;
            }
        }
    }
}