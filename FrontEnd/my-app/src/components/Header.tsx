import { Link, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import loginlogo from "../images/login.svg"
import languagelogo from "../images/Languagae-topheader.svg"
import currency from "../images/Currency.svg"
import profile from "../images/Profile.svg"
import message from "../images/Message.svg"
import favorite from "../images/Favorite.svg"
import basket from "../images/shopping_basket.svg"
import union from "../images/Union.svg"
import youtube from "../images/Youtube.svg"
import twitter from "../images/Twitter.svg"
import In from "../images/In.svg"
import instagram from "../images/Instagram.svg"
import facebook from "../images/Facebook.svg"
import trackOrder from "../images/TrackOrder.svg"
import shop from "../images/Shop.svg"
import settings from "../images/Settings.svg"
import arrowDown from "../images/arrow_down.svg"
import arrowDownForSearch from "../images/arrowDownForSearch.svg"
import arrowDownWhite from "../images/arrowDownWhite.svg"
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


const Header = () => {
  const orders = useAppSelector((state) => state.orders);
  var user = useAppSelector(((state: { user: UserState; orders: Orders }) => state.user.user));

  const [onSearch, setSearch] = useState(false);
  const [inputText, setInputText] = useState("");
  const [dropdown, setDropdown] = useState(false);
  var [products, setProducts] = useState<Product[]>([]);

  const navigate = useNavigate();

  var totalCount: number = 0;

  orders.orders.forEach(order => {
    totalCount += order.count;
  });

  const [getProductsByCategory, { }] = apiProductSlice.useGetProductsByCategoryIdMutation();

  useEffect(() => {
    setDropdown(inputText.length != 0);
    getProducts();
  }, [inputText])



  const getProducts = async () => {
    let response: any = await getProductsByCategory({ id: -1 });
    setProducts((prevProducts) => response?.data?.payload);
  }

  const handleGo = (e: string) => {
    // sortArr();
    setInputText(e);

    if (e == '' || e == null) {
      setSearch(false);
      // navigate("posts")
    }
    else {
      setSearch(true);
      // navigate("search");
    }
  }

  const openFoundedModel = (id: any) => {
    setDropdown(false);
    let path = "/product/" + id;
    navigate(path);
    setDropdown(false);
  }

  const handleToSearchPage = () => {
    navigate("/findProducts" + `?productName=${encodeURIComponent(inputText)}`);
    setDropdown(false);
  }

  const sortProductsByInput = () => {
    // products = products?.filter(
    //     (item:any)=>{
    //         return inputText.toLowerCase() === ' ' ? item : item.name.toLowerCase().includes(inputText) });
    // console.log(isSuccess);
  }




  return (<div>

    {/* <div className="top-header text-sm">
      <div className="left-elements">
        <div className="language-container">
          <img src={languagelogo} />
          <span>Мова</span>
          <img src={arrowDown} />
        </div>
        <div className="currency-container">
          <img src={currency} />
          <span>Валюта</span>
          <img src={arrowDown} />
        </div>
      </div>
      <div className="right-elements">
        <div className="pr-5 grid grid-cols-5 gap-4">
          <img src={facebook} />
          <img src={instagram} />
          <img src={In} />
          <img src={twitter} />
          <img src={youtube} />
        </div>
        <div className="trackOrder-container">
          <img src={trackOrder} />
          <span>Відслідкувати замовлення</span>
        </div>
        <div className="shop-container">
          <img src={shop} />
          <span>Магазин</span>
        </div>
        <div className="settings-container">
          <img src={settings} />
          <span>Налаштування</span>
        </div>
        <div className="faq-container">
          <span>FAQ</span>
        </div>
      </div>
    </div> */}

    <div className="header grid text-whiteForHeader ">
      <div className="languagediv">
        <div className="hamburger xl:p-5 p-2">
          <img src={union} />
        </div>
        <div onClick={() => navigate("/")} className="pl-2 xl:mr-10 mr-2">
          <div className="cursor-pointer">
            <span className="text-mainYellowColor font-['Raleway'] text-sm  xl:text-[48px] lg:text-lg ">ALL</span>
            <span className="text-grayColorForHeader font-['Raleway'] xl:text-[48px]  text-sm lg:text-lg ">mart</span>
          </div>
        </div>

        <div className="relative grow">
          <div className="flex justify-between items-center relative my-auto mr-2">
            <input
              value={inputText}
              onChange={event => handleGo(event.target.value)}

              className="xl:h-10 lg:h-8 h-6 bg-white border border-black rounded-full w-full text-[12px] px-4 pr-12 text-black"

              type="text"
              placeholder="Пошук"
            />
            <div className="xl:w-12 lg:w-10 mr-[2px] rounded-l-full w-7 xl:h-9  lg:h-7 h-5 absolute cursor-pointer active:transition-none select-none bg-mainYellowColor right-0 flex justify-center transition-all self-center"
              style={{ transform: "scaleX(-1)" }}>
              <img src={arrowDownForSearch} onClick={() => handleToSearchPage()} className="self-center" />
            </div>
          </div>
          {/* Ваш іконка для пошуку тут */}


          {/* Батьківський контейнер з position: relative для результатів пошуку */}
          {dropdown &&
            <div className="absolute w-full">
              {/* asdasd */}
              {/* Результати пошуку тут */}
              {products?.length > 0 && (
                <div className="absolute left-6 right-6 mt-1 bg-white border border-gray-300 shadow-md">
                  {/* Контент результатів пошуку тут */}
                  {products?.filter((item: any) => {
                    console.log(item);
                    return inputText.toLowerCase() === ' ' ? item : item.name.toLowerCase().includes(inputText.toLowerCase());
                  }).map((product: any, it: any = 0) => (
                    <div className="text-black searchBar_selector px-4 bg-white border-gray-300 hover:bg-gray-400 cursor-pointer" key={(it++).toString()} onClick={() => openFoundedModel(product.id)}>
                      {product.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          }
        </div>

      <div className=" xl:block lg:block sm:block hidden">
        <div className=" grid grid-cols-4 xl:pr-9">
          <Link to="/profile" className="singindiv">
            <div className="image-container">
              <img src={profile} alt="Profile"  />
            </div>
            <a className="alang">Профіль</a>
          </Link>

          <Link to="/message" className="singindiv">
            <div className="image-container">
              <img src={message} alt="Messages" />
            </div>
            <a className="alang">Повідомлення</a>
          </Link>

          <Link to="/wishlist" className="singindiv">
            <div className="image-container">
              <img src={favorite} alt="Favorites" />
            </div>
            <a className="alang">Улюблені</a>
          </Link>

          <Link to="/orders" className="singindiv">
            <div className="image-container">
              <img src={basket} alt="Basket" />
            </div>
            <a className="alang">Кошик</a>
          </Link>
        </div>
      </div>

      </div>

    </div>

    <div className="flex flex-col w-full xl:text-[16px] sm:text-[10px] ">
      {/* header  */}
      <div className="flex flex-col">
        <div>

        </div>



        <div className="underheader text-[6px] text-sm lg:text-lg xl:text-lg flex justify-between px-10 xl:h-10 h-6">
          <div onClick={() => navigate("/products")}                  className="  w-full text-white hover:outline hover:outline-[1px]  outline-offset-[-1px] cursor-pointer  h-full flex items-center font-medium justify-center ">Сьогоднішні пропозиції</div>
          <div className="hidden xl:block w-full"><div onClick={() => navigate("/products")}                  className=" w-full text-white hover:outline hover:outline-[1px] outline-offset-[-1px] cursor-pointer   h-full flex items-center font-medium justify-center ">Подарункові карти </div></div>
          <div onClick={() => navigate("/products")}                  className=" w-full text-white hover:outline hover:outline-[1px] outline-offset-[-1px] cursor-pointer  h-full flex items-center font-medium justify-center">Обслуговування клієнтів </div>
          <div className="hidden xl:block w-full"><div onClick={() => navigate("/admin/products")}            className=" w-full text-white hover:outline hover:outline-[1px] outline-offset-[-1px] cursor-pointer  h-full flex items-center font-medium justify-center">Сторінка для адміна</div></div>
          <div onClick={() => navigate("/music/home")}                className=" w-full text-white hover:outline hover:outline-[1px] outline-offset-[-1px] cursor-pointer h-full flex items-center font-medium justify-center">Музика</div>
          <div onClick={() => navigate("/tempProfile/becomeASeller")} className=" w-full text-white hover:outline hover:outline-[1px] outline-offset-[-1px] cursor-pointer  h-full flex items-center font-medium justify-center">Тимчасовий Профіль</div>
          <div className="hidden xl:block w-full"><div onClick={() => navigate("/aboutUs")}                   className="  w-full text-white hover:outline hover:outline-[1px] outline-offset-[-1px] cursor-pointer h-full flex items-center font-medium justify-center">Про нас</div></div>
        </div>
      </div>
    </div>
  </div>
  );

}

export default Header;