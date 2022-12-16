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
    public class DepartmentControllers : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly Context _context;

        public DepartmentControllers(IConfiguration configuration, Context context)
        {
            _configuration = configuration;
            _context = context;
        }

        [HttpGet("List")]
        public JsonResult List()
        {
            var departments = _context.Department.ToList();
            return new JsonResult(departments);
        }

        [HttpGet("GetById/{Id}")]
        public JsonResult GetById(Guid Id)
        {
            var department = _context.Department.FirstOrDefault(x => x.Id == Id);
            return new JsonResult(department);
        }

        [HttpPost("Create")]
        public JsonResult Create(DepartmentRequestModel model)
        {
            var ss = _context.Department.Add(new Department
            {
                Name = model.Name,
                Code = model.Code
            });

            _context.SaveChanges();
            return new JsonResult(true);
        }

        [HttpPost("Update")]
        public JsonResult Update(DepartmentRequestModel model)
        {
            var ss = _context.Department.FirstOrDefault(x => x.Id == model.Id);

            ss.Name = model.Name;
            ss.Code = model.Code;
        
            _context.Update(ss);
            _context.SaveChanges();
            return new JsonResult(true);
        }

        [HttpGet("Delete/{Id}")]
        public JsonResult Delete(Guid Id)
        {
            var departmentToDelete = _context.Department.Find(Id);

            _context.Department.Remove(departmentToDelete);
            _context.SaveChanges();
            return new JsonResult(departmentToDelete);
        }
    }
}
