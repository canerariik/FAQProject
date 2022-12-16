using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FAQProject.Entity
{
    [Table("Question")]
    public class Question
    {
        [Key]
        public Guid Id { get; set; }
        public string Name { get; set; }

        public Guid? CategoryId { get; set; }
        public Category Category { get; set; }

        public Guid? DepartmentId { get; set; }
        public Department Department { get; set; }

        public virtual ICollection<Answer> Answers { get; set; }

    }
}
