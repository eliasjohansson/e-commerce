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
    }
}