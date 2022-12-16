using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FAQProject.Entity
{
    [Table("Answer")]
    public class Answer
    {
       [Key]
       public Guid Id { get; set; }
       public string Name { get; set; }

       public Guid? QuestionId { get; set; }
       public Question Question { get; set; }
    }
}
