using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Entities
{
    public class UserFollower : BaseEntity<int>
    {
        public int UserId { get; set; }
        public User User { get; set; }

        public int FollowerId { get; set; }
        public User Follower { get; set; }
    }
}
