using System.Collections.Generic;
using System.Linq;
using API.Models;
using API.Repositories;

namespace API.Services
{
    public class ProductService
    {
        private readonly ProductRepository ProductRepository;

        public ProductService(ProductRepository ProductRepository)
        {
            this.ProductRepository = ProductRepository;
        }

        public List<Product> Get()
        {
            return ProductRepository.Get();
        }
        
        public Product Get(int id)
        {
            return ProductRepository.Get(id);
        }

        public bool Add(Product product)
        {
            if (product == null) return false;
            if (!product.GetType().GetProperties().Any(p => p.GetValue(product) != null)) return false;
            
            ProductRepository.Add(product);
            return true;

        }

        public bool Delete(int id)
        {
            if (ProductRepository.Get(id) == null) return false;
            
            ProductRepository.Delete(id);
            return true;
        }
    }
}