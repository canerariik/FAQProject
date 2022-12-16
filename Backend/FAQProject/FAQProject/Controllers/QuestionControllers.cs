using FAQProject.DBContext;
using FAQProject.Dtos;
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
    public class QuestionControllers : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly Context _context;

        public QuestionControllers(IConfiguration configuration, Context context)
        {
            _configuration = configuration;
            _context = context;
        }

        [HttpGet("GetQueByCatId/{Id}")]
        public JsonResult GetQueByCatId(Guid Id)
        {
            var QueCategory = _context.Question.Where(x => x.CategoryId == Id);
            return new JsonResult(QueCategory);
        }

        [HttpGet("GetQueByDepId/{Id}")]
        public JsonResult GetQueByDepId(Guid Id)
        {
            var QueDepartment = _context.Question.Where(x => x.DepartmentId == Id).ToList();
            return new JsonResult(QueDepartment);
        }

        [HttpGet("List")]
        public JsonResult List()
        {
            var query = (from q in _context.Question.ToList()
                         join d in _context.Department.ToList() on q.DepartmentId equals d.Id
                         join c in _context.Category.ToList() on q.CategoryId equals c.Id
                         select new QuestionCategory { QuestionId = q.Id, QuestionName = q.Name, CategoryName = c.Name, CategoryId = c.Id, DepartmentName = d.Name, DepartmentId=d.Id }).Select(x => new { x.QuestionId, x.QuestionName, x.CategoryName, x.CategoryId, x.DepartmentName,x.DepartmentId }).ToList();
            return new JsonResult(query);
        }

        [HttpPost("Create")]
        public JsonResult Create(QuestionRequestModel model)
        {
            Question question = new Question();
            question.Name = model.Name;
            question.CategoryId = model.CategoryId;
            question.DepartmentId = model.DepartmentId;

            _context.Question.Add(question);
            _context.SaveChanges();
            return new JsonResult(question);
        }

        [HttpGet("GetById/{Id}")]
        public JsonResult GetById(Guid Id)
        {
            var dd = _context.Question.Select(x => new{
                x.Id,
                x.CategoryId,
                x.DepartmentId,
                CategoryName=x.Category.Name,
                DepartmentName=x.Department.Name,
                x.Name,
                Answers = x.Answers.Select(x => new
                {
                    x.Name,
                    x.Id
                })
            }).Where(x=>x.Id==Id).FirstOrDefault();

            return new JsonResult(dd);
        }

        [HttpPost("Update")]
        public JsonResult Update(QuestionRequestModel model)
        {

            var qq = _context.Question.FirstOrDefault(x => x.Id == model.Id);
            qq.Name = model.Name;
            qq.CategoryId = model.CategoryId;
            qq.DepartmentId = model.DepartmentId;

            _context.Update(qq);
            _context.SaveChanges();
            return new JsonResult(true);
        }

        [HttpGet("Delete/{Id}")]
        public JsonResult Delete(Guid Id)
        {
            var questionToDelete = _context.Question.Find(Id);

            _context.Question.Remove(questionToDelete);
            _context.SaveChanges();
            return new JsonResult(questionToDelete);
        }
    }
}
