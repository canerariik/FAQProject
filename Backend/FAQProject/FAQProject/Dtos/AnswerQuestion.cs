using System;

namespace FAQProject.Dtos
{
    public class AnswerQuestion
    {
        public Guid AnswerId { get; set; }
        public string AnswerName { get; set; }
        public string QuestionName { get; set; }
    }
}
