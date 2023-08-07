import { Link, useNavigate } from "react-router-dom";
import "../index.css"
import { useEffect, useState } from "react";
import logo from "../images/logo.svg"
import langlogo from "../images/language.svg";
import loginlogo from "../images/login.svg"
import cart from "../images/cart.svg"
import "../css/MainPage.css"

import { LiaSistrix } from "react-icons/lia";

import { LiaLanguageSolid } from "react-icons/lia";
import { AiOutlineLogin } from "react-icons/ai";
import { GrCart } from "react-icons/gr";
// import "../css/header.css"

import { useAppSelector } from "../app/hooks";
import { apiProductSlice } from "../features/user/apiProductSlice";
import { Product } from "./types";
import { useSelector } from "react-redux";
import { UserState } from "../features/user/user-slice";
import { Orders } from "../features/user/ordersStateSlice";
import search from "../images/search.png"


const Header=()=> {
    const orders = useAppSelector((state)=>state.orders);
    var user = useAppSelector(((state: { user: UserState; orders: Orders })=>state.user.user));

    const [onSearch,setSearch]= useState(false);
    const [inputText, setInputText] = useState("");
    const [dropdown, setDropdown] = useState(false);
    var [products,setProducts] = useState<Product[]>([]);

    const navigate = useNavigate();

    var totalCount:number = 0;

    orders.orders.forEach(order => {
      totalCount += order.count;
    });

    const [getProductsByCategory,{}] = apiProductSlice.useGetProductsByCategoryIdMutation();

    useEffect(()=>{
        setDropdown(inputText.length != 0 );
        getProducts();
    },[inputText])



    const getProducts=async()=>{
      let response:any = await getProductsByCategory({id:-1});
      setProducts((prevProducts) => response?.data?.payload);
    }

    const handleGo=(e:string)=>{
        // sortArr();
        setInputText(e);

        if(e == '' || e == null){
            setSearch(false);
            // navigate("posts")
        }
        else{
            setSearch(true);
            // navigate("search");
        }
    }

    const openFoundedModel=(id:any)=>{
        setDropdown(false);
        let path = "/product/"+ id;
        navigate(path);
        setDropdown(false);
    }

    const handleToSearchPage=()=>{
      navigate("/findProducts" + `?productName=${encodeURIComponent(inputText)}`);
      setDropdown(false);
    }

    const sortProductsByInput=()=>{
      // products = products?.filter(
      //     (item:any)=>{
      //         return inputText.toLowerCase() === ' ' ? item : item.name.toLowerCase().includes(inputText) });
      // console.log(isSuccess);
  }


  

  return(<div>
    <div className="header grid grid-cols-12 gap-x-3">

      {/* <div className="div_span" style={{ backgroundColor: "#2B2B2B" }} onClick={()=>navigate("#")}>
        <span style={{ color: "#FF9A02" }}>ALL</span>
        <span style={{ color: "#BABABA"}}>mart</span>
      </div> */}
    <div onClick={()=>navigate("/")} className="col-span-2">
      <img className="headerLogo" src={logo} />
    </div>

    <div className="relative col-span-7">
      <div className="col-start-3 col-span-3 flex justify-center relative my-auto ">
        <input value={inputText} onChange={event => handleGo(event.target.value)}  className="h-10 pl-12 bg-white rounded-full w-full text-black text-[12px] px-4 pr-8" type="text" placeholder="Пошук" />
        <div className=" w-9 rounded-l-full h-8 absolute  cursor-pointer  active:transition-none select-none ml-1 hover:bg-orange-300 left-0 flex  justify-center transition-all self-center m-auto">
          <LiaSistrix onClick={()=>handleToSearchPage()} className="self-center" />
        </div>
      </div>
  {/* Ваш іконка для пошуку тут */}


  {/* Батьківський контейнер з position: relative для результатів пошуку */}
  {dropdown &&
    <div className="absolute w-full">
      {/* Результати пошуку тут */}
      {products?.length > 0 && (
        <div className="absolute left-6 right-6 mt-1 bg-white border border-gray-300 shadow-md">
          {/* Контент результатів пошуку тут */}
          {products?.filter((item:any) => {
            console.log(item);
            return inputText.toLowerCase() === ' ' ? item : item.name.toLowerCase().includes(inputText.toLowerCase());
          }).map((product:any, it:any=0) => (
            <div className="searchBar_selector px-4 bg-white border-gray-300 hover:bg-gray-400 cursor-pointer" key={(it++).toString()} onClick={() => openFoundedModel(product.id)}>
              {product.name}
            </div>
          ))}
        </div>
      )}
    </div>
  }
      </div>

      <div className="grid grid-cols-3 col-span-3 px-10">

      <div className="languagediv">
        <img src={langlogo}/>
        <a className="alang">UA</a>
      </div>

      <Link to="/login">
        <div className="singindiv">
        <img src={loginlogo}/>
          <a className="alang">Вхід</a>
        </div>
      </Link>

      <Link to="/orders">
        <div className="cartdiv">

          <img src={cart} />
          <a className="alang">Кошик({totalCount})</a>

          {/*<GrCart className="cartIcon" />
          <a className="alang">Кошик ({orders.orders.length})</a> */}

        </div>
      </Link>
      
      </div>

    </div>

  <div className="flex flex-col">
    {/* header  */}
        <div className="flex flex-col">
          <div>
            
          </div>
            
            
          <div className="underheader">
            <div onClick={() => navigate("/products")} className=" ml-3 text-white px-4 hover:outline hover:outline-[1px] rounded-xl outline-offset-[-1px] cursor-pointer  p-auto h-full flex items-center font-medium justify-center">All</div>
            <div onClick={() => navigate("/admin")} className="text-white px-4 hover:outline hover:outline-[1px] rounded-xl outline-offset-[-1px] cursor-pointer  p-auto h-full flex items-center font-medium justify-center">Admin</div>
            <div className="text-white px-4 hover:outline hover:outline-[1px] rounded-xl outline-offset-[-1px] cursor-pointer  p-auto h-full flex items-center font-medium justify-center">Best Sellers</div>
            <div className="text-white px-4 hover:outline hover:outline-[1px] rounded-xl outline-offset-[-1px] cursor-pointer  p-auto h-full flex items-center font-medium justify-center">Amazon Basic</div>
            <div className="text-white px-4 hover:outline hover:outline-[1px] rounded-xl outline-offset-[-1px] cursor-pointer  p-auto h-full flex items-center font-medium justify-center">Today's Deals</div>
            <div className="text-white px-4 hover:outline hover:outline-[1px] rounded-xl outline-offset-[-1px] cursor-pointer  p-auto h-full flex items-center font-medium justify-center">Prime Video</div>
            <div onClick={()=>navigate("/music")} className="text-white px-4 hover:outline hover:outline-[1px] rounded-xl outline-offset-[-1px] cursor-pointer  p-auto h-full flex items-center font-medium justify-center">Music</div>
            <div onClick={()=>navigate("/tempProfile")} className="text-white px-4 hover:outline hover:outline-[1px] rounded-xl outline-offset-[-1px] cursor-pointer  p-auto h-full flex items-center font-medium justify-center">TempProfile</div>
          </div>
        </div>
      </div>
    </div>
  );
}
  
export default Header;
  