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
    public class CategoryControllers : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly Context _context;

        public CategoryControllers(IConfiguration configuration, Context context)
        {
            _configuration = configuration;
            _context = context;
        }

        [HttpGet("List")]
        public JsonResult List()
        {
            var categories = _context.Category.Select(x => new { x.Id, x.Name, x.ParentId }).ToList();
            return new JsonResult(categories);
        }

        [HttpGet("GetById/{Id}")]
        public JsonResult GetById(Guid Id)
        {
            var category = _context.Category.FirstOrDefault(x => x.Id == Id);
            return new JsonResult(category);
        }

        [HttpPost("Create")]
        public JsonResult Create(CategoryRequestModel model)
        {
            var ss = _context.Category.Add(new Category
            {
                Name = model.Name,
            });

            _context.SaveChanges();
            return new JsonResult(true);
        }

        [HttpPost("Update")]
        public JsonResult Update(CategoryRequestModel model)
        {
            var ss = _context.Category.FirstOrDefault(x => x.Id == model.Id);
            ss.Name = model.Name;
            ss.ParentId = model.ParentId;

            _context.Update(ss);
            _context.SaveChanges();
            return new JsonResult(true);
        }

        [HttpGet("Delete/{Id}")]
        public JsonResult Delete(Guid Id)
        {
            var categoryToDelete = _context.Category.Find(Id);

            _context.Category.Remove(categoryToDelete);
            _context.SaveChanges();
            return new JsonResult(categoryToDelete);
            //hata için bırak try catch 
        }

        [HttpGet("GetSubCatByCatId/{Id}")]
        public JsonResult GetSubCatByCatId(Guid Id)
        {
            var SubCategory = _context.Category.Where(x=>x.ParentId==Id);
            return new JsonResult(SubCategory);
        }

        [HttpGet("SubList")]
        public JsonResult SubList()
        {
            var categories = _context.Category.Select(x => new {x.ParentId, x.Name }).ToList();
            return new JsonResult(categories);
        }

        [HttpPost("CreateSub")]
        public JsonResult CreateSub(CategoryRequestModel model)
        {
            var ss = _context.Category.Add(new Category
            {
                Name = model.Name,
                ParentId = model.ParentId
            });

            _context.SaveChanges();
            return new JsonResult(true);
        }

        [HttpPost("UpdateSub")]
        public JsonResult UpdateSub(CategoryRequestModel model)
        {
            var ss = _context.Category.FirstOrDefault(x => x.ParentId == model.ParentId);
            ss.Id = model.Id;
            ss.Name = model.Name;

            //_context.Category.Update(category);
            _context.Update(ss);
            _context.SaveChanges();
            return new JsonResult(true);
        }

        [HttpGet("DeleteSub/{ParentId}")]
        public JsonResult DeleteSub(Guid ParentId)
        {
            var categoryToDelete = _context.Category.Find(ParentId);

            _context.Category.Remove(categoryToDelete);
            _context.SaveChanges();
            return new JsonResult(categoryToDelete);
        }
    }
}
