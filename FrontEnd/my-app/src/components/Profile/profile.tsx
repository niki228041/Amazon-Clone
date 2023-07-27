import React, { useRef, useState } from 'react';
import SideBar from './SideBarProf';
import "./index.css";
import { GiWallet } from "react-icons/gi";
import { FaTruck } from "react-icons/fa";
import { HiMiniWallet } from "react-icons/hi2";
import { BsFillClipboardCheckFill } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { BiSolidCoupon } from "react-icons/bi";
import { FaCommentsDollar } from "react-icons/fa";



const ProfilePage: React.FC = () => {



  return (
    <div className="flex bg-slate-100" >

      <SideBar></SideBar>
      <div className="">
        <div className="profileheader" >
          <div className="headerdiv">
            <a className="nickname">John Doe</a>
            <div className="overoptions">
              <div className="wishlistdiv">

                <AiOutlineHeart className="wishlist"></AiOutlineHeart>
                <a>Wish List</a>
              </div>
              <div className="coupondiv">
                <BiSolidCoupon className="coupon"></BiSolidCoupon>
                <a>Coupons</a>
              </div>
              <div className="comentsdiv">
                <FaCommentsDollar className="coments"></FaCommentsDollar>
                <a>Comments</a>
              </div>
            </div>



          </div>


        </div>
        <div className="profilebody">
          <div className="headerofbody">
            <span className="orders">My Orders</span>
          </div>
          <div className="divlist">
            <div>
              <GiWallet className="unpaid"></GiWallet>
              <a>Unpaid</a>
            </div>
            <div>
              <HiMiniWallet className="tobeshipped"></HiMiniWallet>
              <a>To be Shiped</a>
            </div>
            <div>
              <FaTruck className="shipped"></FaTruck>
              <a>Shiped</a>
            </div>
            <div>
              <BsFillClipboardCheckFill className="tobereviewd"></BsFillClipboardCheckFill>
              <a>To be reviewed</a>
            </div>



          </div>



        </div>
      </div>
    </div>

  );
};

export default ProfilePage;

// <div className="divlist"></div>
