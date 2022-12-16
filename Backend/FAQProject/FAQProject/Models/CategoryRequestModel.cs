using System;

namespace FAQProject.Models
{
    public class CategoryRequestModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Guid? ParentId { get; set; }
    }
}
