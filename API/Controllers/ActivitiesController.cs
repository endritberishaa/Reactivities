using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ActivitiesController : BaseAPIController
    {
        private readonly DataContext context;
        public ActivitiesController(DataContext context)
        {
            this.context = context;
        }
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities(){
            return await this.context.Activities.ToListAsync();
        }
        [HttpGet("{id}")] //activities/id
        public async Task<ActionResult<Activity>> GetActivity(Guid id) {
            return await this.context.Activities.FindAsync(id);
        }
    }
}