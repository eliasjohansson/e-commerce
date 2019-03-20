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
                if (cart != null)
                {
                    var products = cart.Products = (List<Product>)connection.Query<Product>(productsSQL,new {id});
                    cart.Products = products;
                }
                return cart;
            }
        }

        public int Create()
        {
            using (var connection = new MySqlConnection(connectionString))
            {
                var createSQL = "INSERT INTO Carts() VALUES (); SELECT CAST(SCOPE_IDENTITY() as int)";
                var cartId = connection.QuerySingle<int>(createSQL);
                return cartId;
            }
        }

        public void Delete(int id)
        {
            
        }

        public void AddProduct(int? cartId, int productId)
        {
            using (var connection = new MySqlConnection(connectionString))
            {   
                var cartSQL = "SELECT * FROM Carts_Products WHERE cartId = @cartId AND productId = @productId";

                var relation = connection.QuerySingleOrDefault(cartSQL, new {cartId, productId});
                if (relation != null)
                {
                    var incrementSQL = "UPDATE Carts_Products SET Quantity = @quantity WHERE cartId = @cartId AND productId = @productId";
                    var quantity = relation.quantity + 1;
                    connection.Execute(incrementSQL, new {quantity, cartId, productId});
                }
                else
                {
                    var createSQL = "INSERT INTO Carts_Products (cartId, productId, quantity) VALUES (@cartId, @productId, 1)";
                    connection.Execute(createSQL, new {cartId, productId});
                }
            }
        }
        
        public void RemoveProduct(int cartId, int productId)
        {
            // Decrement quantity column
            // If quantity decreases to 0 remove relation completely
        }
    }
}