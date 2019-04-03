using System.Collections.Generic;

namespace API.Models
{
    public class Cart
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public List<Product> Products { get; set; }
        public bool Ordered { get; set; }
    }
}