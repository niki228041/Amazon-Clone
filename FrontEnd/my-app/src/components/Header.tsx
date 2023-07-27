import { Link, useNavigate } from "react-router-dom";
import "../index.css"
import { useState } from "react";
import logo from "../images/amazon.png"
import cart from "../images/cart.svg"
import "../css/MainPage.css"
import { LiaSistrix } from "react-icons/lia";

import { LiaLanguageSolid } from "react-icons/lia";
import { AiOutlineLogin } from "react-icons/ai";
import { GrCart } from "react-icons/gr";
// import "../css/header.css"
import { useAppSelector } from "../app/hooks";


const Header = () => {
  const navigate = useNavigate();

  const orders = useAppSelector((state) => state.orders);


  return <>

    <div className="flex flex-col">

      <div className="header">
        <div onClick={() => navigate("#")} >
          <img className="headerLogo" src={logo} />
        </div>
        
        

        <div className="header__search">
          <LiaSistrix className="searchico"/>
          <input className="headerSearchInput" type="text" placeholder="Пошук" />
          
        </div>

        <div className="languagediv">
          <LiaLanguageSolid className="languageico"/>
          <a className="alang">UA</a>
        </div>

        <Link to="/login"><div className="singindiv">
          <AiOutlineLogin className="loginico"/>
          <a className="alang">Вхід</a>
        </div>
        </Link>

        <div className="cartdiv">
        <GrCart className="cartIcon" />
          <a className="alang">Кошик</a>
        </div>
        
        
        
        {/* <div className="header__nav">
         


         



          


          {/* <Link to="orders">
            <div className="header__optionBasket mr-1">
              
              <span className="numberOfOrders" >
                {orders.orders.length}
              </span>
            </div>
          </Link> */}


        {/* </div>  */}



      </div>

      <div className="underheader">
        <div onClick={() => navigate("/products")} className=" ml-3 text-white px-4 hover:outline hover:outline-[1px] rounded-xl outline-offset-[-1px] cursor-pointer  p-auto h-full flex items-center font-medium justify-center">All</div>
        <div onClick={() => navigate("/admin")} className="text-white px-4 hover:outline hover:outline-[1px] rounded-xl outline-offset-[-1px] cursor-pointer  p-auto h-full flex items-center font-medium justify-center">Admin</div>
        <div className="text-white px-4 hover:outline hover:outline-[1px] rounded-xl outline-offset-[-1px] cursor-pointer  p-auto h-full flex items-center font-medium justify-center">Best Sellers</div>
        <div className="text-white px-4 hover:outline hover:outline-[1px] rounded-xl outline-offset-[-1px] cursor-pointer  p-auto h-full flex items-center font-medium justify-center">Amazon Basic</div>
        <div className="text-white px-4 hover:outline hover:outline-[1px] rounded-xl outline-offset-[-1px] cursor-pointer  p-auto h-full flex items-center font-medium justify-center">Today's Deals</div>
        <div className="text-white px-4 hover:outline hover:outline-[1px] rounded-xl outline-offset-[-1px] cursor-pointer  p-auto h-full flex items-center font-medium justify-center">Prime Video</div>
        <div className="text-white px-4 hover:outline hover:outline-[1px] rounded-xl outline-offset-[-1px] cursor-pointer  p-auto h-full flex items-center font-medium justify-center">Music</div>
      </div>
    </div>
  </>;
}

export default Header;
