using System;

namespace FAQProject.Models
{
    public class AnswerRequestModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Guid? QuestionId { get; set; }
    }
}
