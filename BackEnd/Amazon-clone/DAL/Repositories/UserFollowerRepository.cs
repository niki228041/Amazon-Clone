using DAL.Entities;
using DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public class UserFollowerRepository : GenericRepository<UserFollower>, IUserFollowerRepository
    {
        public UserFollowerRepository(AppEFContext context) : base(context)
        {

        }
    }
}
