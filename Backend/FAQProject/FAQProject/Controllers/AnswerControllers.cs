using FAQProject.DBContext;
using FAQProject.Entity;
using FAQProject.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Linq;

namespace FAQProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AnswerControllers : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly Context _context;

        public AnswerControllers(IConfiguration configuration, Context context)
        {
            _configuration = configuration;
            _context = context;
        }

        [HttpGet("List")]
        public JsonResult List()
        {
            var answers = _context.Answer.Select(x => new { x.Id, x.Name, x.QuestionId }).ToList();
            return new JsonResult(answers);
        }

        [HttpGet("GetQueByAnsId/{Id}")]
        public JsonResult GetQueByAnsId(Guid Id)
        {
            var QueAnswer = _context.Answer.Where(x => x.QuestionId == Id);
            return new JsonResult(QueAnswer);
        }

        [HttpGet("GetById/{Id}")]
        public JsonResult GetById(Guid Id)
        {
            var answer = _context.Answer.FirstOrDefault(x => x.Id == Id);
            return new JsonResult(answer);
        }

        [HttpPost("Create")]
        public JsonResult Create(AnswerRequestModel model)
        {
            var aa = _context.Answer.Add(new Answer
            {
                Name = model.Name,
                QuestionId = model.QuestionId,
            });

            _context.SaveChanges();
            return new JsonResult(true);
        }

        [HttpPost("Update")]
        public JsonResult Update(AnswerRequestModel model)
        {
            var aa = _context.Answer.FirstOrDefault(x => x.Id == model.Id);
            aa.Name = model.Name;
            aa.QuestionId = model.QuestionId;

            _context.Update(aa);
            _context.SaveChanges();
            return new JsonResult(true);
        }

        [HttpGet("Delete/{Id}")]
        public JsonResult Delete(Guid Id)
        {
            var answerToDelete = _context.Answer.Find(Id);

            _context.Answer.Remove(answerToDelete);
            _context.SaveChanges();
            return new JsonResult(answerToDelete);
        }
    }
}
