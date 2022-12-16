
using System;

namespace FAQProject.Models
{
    public class QuestionRequestModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Guid? CategoryId { get; set; }
        public Guid? DepartmentId { get; set; }

    }
}
