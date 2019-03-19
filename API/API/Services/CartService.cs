using System.Collections.Generic;
using System.Linq;
using API.Models;
using API.Repositories;

namespace API.Services
{
    public class CartService
    {
        private readonly CartRepository CartRepository;

        public CartService(CartRepository CartRepository)
        {
            this.CartRepository = CartRepository;
        }
        
        public Cart Get(int id)
        {
            return CartRepository.Get(id);
        }

        public bool Create()
        {
            CartRepository.Create();
            return true;
        }

        public bool Delete(int id)
        {
            CartRepository.Delete(id);
            return true;
        }

        public bool AddProduct(int cartId, int productId)
        {   
            // Validation:
                // Product ID exists
                // Cart ID exists
                
            CartRepository.AddProduct(cartId, productId);
            return true;
        }

        public bool RemoveProduct(int cartId, int productId)
        {
            // Add validation ! 
                // Cart ID exists
                // Product ID exists
                // Cart<->Product relation exists
                
            
            CartRepository.RemoveProduct(cartId, productId);
            return true;
        }
    }
}