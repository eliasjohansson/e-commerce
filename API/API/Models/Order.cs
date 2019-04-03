using System.Collections.Generic;

namespace API.Models
{
    public class Order
    {
        public int Id { get; set; }
        public int CartId { get; set; }
        public int? CustomerId { get; set; }
        public string ShippingAddress { get; set; }
        public string ShippingCity { get; set; }
        public string ShippingCountry { get; set; }
        public string ShippingZipcode { get; set; }
        public string CustomerEmail { get; set; }
        public string CustomerName { get; set; }
        
        public List<Product> Products { get; set; }
    }
}