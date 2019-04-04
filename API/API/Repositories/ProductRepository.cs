using System.Collections.Generic;
using System.Linq;
using API.Interfaces;
using API.Models;
using Dapper;
using MySql.Data.MySqlClient;

namespace API.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly string connectionString;

        public ProductRepository(string connectionString)
        {
            this.connectionString = connectionString;
        }
        
        public List<Product> Get(){
            using (var connection = new MySqlConnection(connectionString))
            {
                return connection.Query<Product>("SELECT * FROM Products").ToList();
            }
        }

        public Product Get(int id)
        {
            using (var connection = new MySqlConnection(connectionString))
            {
                return connection.QuerySingleOrDefault<Product>("SELECT * FROM Products WHERE Id = @id", new { id });
            }
        }

        public void Create(Product Product)
        {
            using (var connection = new MySqlConnection(connectionString))
            {
                connection.Execute("INSERT INTO Products (name, description, price, stock, image) VALUES(@name, @description, @price, @stock, @image)", Product);
            }
        }

        public void Delete(int id)
        {
            using (var connection = new MySqlConnection(connectionString))
            {
                connection.Execute("DELETE FROM Products WHERE id=@id", new { id });
            }
        }
    }
}