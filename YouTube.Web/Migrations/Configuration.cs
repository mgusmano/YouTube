namespace YouTube.Web.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using YouTube.Domain;

    internal sealed class Configuration : DbMigrationsConfiguration<YouTube.Web.Infrastructure.DepartmentDb>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
        }

        protected override void Seed(YouTube.Web.Infrastructure.DepartmentDb context)
        {
            context.Departments.AddOrUpdate(d => d.Name,
                     new Department() { Name = "Engineering" },
                     new Department() { Name = "Sales" },
                     new Department() { Name = "Shipping" },
                     new Department() { Name = "Human Resources" }
                ); 
        }
    }
}
