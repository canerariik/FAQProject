using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace FAQProject.Entity
{
    [Table("Category")]
    public class Category
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Guid? ParentId { get; set; }

        [ForeignKey("ParentId")]
        public Category Parent { get; set; }
        public virtual ICollection<Category> Children { get; set; }
        public virtual ICollection<Question> Questions { get; set; } 
    }
}
