using System;

namespace FAQProject.Dtos
{
    public class QuestionCategory
    {
        public Guid QuestionId { get; set; }
        public string QuestionName { get; set; }
        public string CategoryName { get; set; }
        public Guid CategoryId { get; set; }
        public string DepartmentName { get; set; }
        public Guid DepartmentId { get; set; }


    }
}
