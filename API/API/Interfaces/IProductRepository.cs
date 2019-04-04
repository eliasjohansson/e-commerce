using System.Collections.Generic;
using System.Linq;
using API.Models;
using Dapper;
using MySql.Data.MySqlClient;

namespace API.Interfaces
{
    public interface IProductRepository
    {
        List<Product> Get();
        Product Get(int id);
        void Create(Product Product);
        void Delete(int id);
    }
}