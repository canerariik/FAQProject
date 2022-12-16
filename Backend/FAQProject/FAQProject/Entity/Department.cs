using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FAQProject.Entity
{
    [Table("Department")]
    public class Department
    {
        [Key]
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }

        public virtual ICollection<Question> Questions { get; set; }
    }
}
