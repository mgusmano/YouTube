using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using YouTube.Web.Infrastructure;

namespace YouTube.Web.Controllers
{
    public class HomeController : Controller
    {

        private DepartmentDb db = new DepartmentDb();
        public ActionResult Index()
        {
            return View("Index", "", GetSerializedDepartmentsVms());
        }

        public ActionResult JQuery()
        {
            return View();
        }

        public ActionResult JQD()
        {
            return View();
        }

        private string GetSerializedDepartmentsVms()
        {
            var departments = from r in db.Departments
                              orderby r.Name ascending
                              select r;
            return JsonConvert.SerializeObject(departments);
            //var courses = new[]
            //{
            //    new CourseVm {Number = "1", Name = "Name 1", Instructor = "Ins1"},
            //    new CourseVm {Number = "1", Name = "Name 1", Instructor = "Ins1"},
            //    new CourseVm {Number = "1", Name = "Name 1", Instructor = "Ins1"}
            //};
            ////var settings = new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() }
            //return JsonConvert.SerializeObject(courses);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}