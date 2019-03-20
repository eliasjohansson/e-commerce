using System.Collections.Generic;
using System.Linq;
using API.Models;
using API.Repositories;

namespace API.Services
{
    public class CartService
    {
        private readonly CartRepository CartRepository;
        private readonly ProductRepository ProductRepository;

        public CartService(CartRepository CartRepository, ProductRepository ProductRepository)
        {
            this.CartRepository = CartRepository;
            this.ProductRepository = ProductRepository;
        }
        
        public Cart Get(int id)
        {
            return CartRepository.Get(id);
        }

        public int Create()
        {
            return CartRepository.Create();
        }

        public bool Delete(int id)
        {
            CartRepository.Delete(id);
            return true;
        }

        public bool AddProduct(int cartId, int productId)
        {
            if (ProductRepository.Get(productId) == null) return false;
            if (CartRepository.Get(cartId) == null) return false;
            
            CartRepository.AddProduct(cartId, productId);
            return true;
        }

        public bool RemoveProduct(int cartId, int productId)
        {       
            if (ProductRepository.Get(productId) == null) return false;
            if (CartRepository.Get(cartId) == null) return false;
                
            CartRepository.RemoveProduct(cartId, productId);
            return true;
        }
    }
}