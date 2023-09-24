import { Link, useLocation, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
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
import arrowRight from '../images/ArrowRightS.svg';
import arrowDownWhite from "../images/arrowDownWhite.svg"
import tringle from "../images/Tringle.svg"
import "../css/MainPage.css"

import { LiaSistrix } from "react-icons/lia";

import { LiaLanguageSolid } from "react-icons/lia";
import { AiOutlineLogin } from "react-icons/ai";
import { GrCart } from "react-icons/gr";
// import "../css/header.css"

import { useAppSelector } from "../app/hooks";
import { apiProductSlice } from "../features/user/apiProductSlice";
import { Product } from "./types";
import { useDispatch, useSelector } from "react-redux";
import { UserState } from "../features/user/user-slice";
import { Orders, turnWasAddedToFalse } from "../features/user/ordersStateSlice";
import search from "../images/search.png"
import { BurgerModal } from "./BurgerModal";
import classNames from "classnames";
import { CardModal } from "./BuyProduct/CardModal";
import { AdressModal } from "./BuyProduct/AdressModal";
import { GetCurrency, SetCurrency } from "../api/jwtDecodeToken";
import { ua, us, eu } from "../const/constants";
import { setCurrency } from "../features/user/CurrencyStateSlice";
import RequestToLogin from "./ModalWindows/RequestToLogin";
import { setBurgerModalWindow, setLoginRequestWindow } from "../features/user/modalWindowsStateSlice";
import { CompanyModal } from "./BuyProduct/CompanyModal";
import { useGetCurrencyQuery } from "../features/user/apiCurrencySlice";


const Header = () => {
  const orders = useAppSelector((state) => state.orders);
  var user = useAppSelector(((state: { user: UserState; orders: Orders }) => state.user.user));
  var orderWasAdded = useAppSelector((state) => state.orders.orderWasAdded);
  var isAuth = useAppSelector((state) => state.user.isAuth);
  var isBurgerModalOpen = useAppSelector((state) => state.modalWindows.isBurgerModalOpen);
  
  const [onSearch, setSearch] = useState(false);
  const [inputText, setInputText] = useState("");
  const [dropdown, setDropdown] = useState(false);
  var [products, setProducts] = useState<Product[]>([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  var totalCount: number = 0;

  orders?.orders?.forEach(order => {
    totalCount += order.count;
  });

  const [getProductsByCategory, { }] = apiProductSlice.useGetProductsByCategoryIdMutation();

  useEffect(() => {
    setDropdown(inputText.length != 0);
    getProducts();
  }, [inputText])


  useEffect(()=>{
    // setTimeout(() => {
    //   dispatch(turnWasAddedToFalse());
    // }, 2000);
    console.log("yo");
    
  },[orderWasAdded])


  var user = useAppSelector(((state: { user: UserState; orders: Orders })=>state.user.user));

  const handleBecomeASeller=()=>{

  }

  var request = {
    access_key:"cced39933489c33dfef9699f1e3fc638",
    currencies:"EUR,GBP,CAD,PLN",
    source:"USD",
    format:1
  };

  var {data} = useGetCurrencyQuery();

  console.log("useGetCurrencyQuery");
  console.log(data);

  

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

  const [isBurgerOpen,setIsBurgerOpen] = useState(false);
  const [isCurrencyDrop,setCurrencyDrop] = useState(false);

  useEffect(()=>{
    console.log(GetCurrency());
  },[isCurrencyDrop])

  var loc = useLocation();

  var allLocation = loc.pathname.split('/').filter(Boolean);
 
  console.log(allLocation);

  function capitalizeFirstLetter(text:string) {
   return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
 }


  const handleIsAuth=(path:string)=>{
    if(!isAuth)
      dispatch(setLoginRequestWindow(true));
    else
      navigate(path);
  }

  console.log(isBurgerOpen);

  return (<div className=" ">
    <BurgerModal/>
    <CardModal/>
    <AdressModal/>
    <RequestToLogin/>
    <CompanyModal/>
    
    <div className="sticky z-30 bg-white">

    <div className="relarive">

      <div className="top-header text-sm">
        <div className="">

          <div className="left-elements">
            <div className="language-container">
              <img src={languagelogo} />
              <span>Мова</span>
              <img src={arrowDown} />
            </div>

            <div className=" relative">

              <div onClick={()=>setCurrencyDrop(!isCurrencyDrop)} className="currency-container">
                <img src={currency} />
                <span>Валюта</span>
                <img src={arrowDown} />
              </div>

              {isCurrencyDrop?
              <div className=" bg-white border w-full right-0 absolute z-30">
                <div onClick={()=>{dispatch(setCurrency(ua)); SetCurrency(ua);setCurrencyDrop(false)}} className="py-1 px-2 cursor-pointer hover:bg-gray-200 active:bg-gray-400">Гривня</div>
                <hr/>
                <div onClick={()=>{dispatch(setCurrency(eu));SetCurrency(eu);setCurrencyDrop(false)}} className="py-1 px-2 cursor-pointer hover:bg-gray-200 active:bg-gray-400">Євро</div>
                <hr/>
                <div onClick={()=>{dispatch(setCurrency(us));SetCurrency(us);setCurrencyDrop(false)}} className="py-1 px-2 cursor-pointer hover:bg-gray-200 active:bg-gray-400">Долар</div>
              </div>
              :""}
            </div>

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
          <div onClick={()=>handleIsAuth("/seller/mycompany")} className=" cursor-pointer shop-container">
            <img src={shop} />
            <span>Сторінка Продавця</span>
          </div>
          <div className="settings-container">
            <img src={settings} />
            <span>Налаштування</span>
          </div>
          <Link to="/help" className="faq-container">
            <span>FAQ</span>
          </Link>
        </div>
      </div>
      
      
    </div>

    <div className="header grid text-whiteForHeader relative z-20 bg-white ">
      <div className="languagediv">
        <div className="hamburger xl:p-5 p-2" onClick={()=>{dispatch(setBurgerModalWindow(!isBurgerModalOpen))}}>
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
            <div onClick={() => handleToSearchPage()} className="  xl:w-12 lg:w-10 mr-[2px] rounded-l-full w-7 xl:h-9  lg:h-7 h-5 absolute cursor-pointer active:transition-none select-none bg-mainYellowColor right-0 flex justify-center transition-all self-center"
              style={{ transform: "scaleX(-1)" }}>
              <img src={arrowDownForSearch} className="self-center" />
            </div>
          </div>
          {/* Ваш іконка для пошуку тут */}


          {/* Батьківський контейнер з position: relative для результатів пошуку */}
          {dropdown &&
            <div className="absolute w-full z-10">
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
          <div onClick={()=>handleIsAuth("/profile")} className="singindiv cursor-pointer">
            <div className="image-container">
              <img src={profile} alt="Profile"  />
            </div>
            <a className="alang">Профіль</a>
          </div>

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
        <div style={{transformOrigin:"top center"}} className={classNames(" duration-200 z-10 absolute h-20 w-1/12 right-0 mr-1 transition-all",{"-translate-y-full":!orderWasAdded})}>
          <div className="flex justify-end">
            <img className="h-3 mr-16 my-1 shadow-xl " src={tringle} />
          </div>
          <div className="text-sm p-2 absolute bg-white w-full rounded-lg  shadow-xl">
            +1 Product was added to Basket!
          </div>
        </div>
    </div>

    <div className="flex flex-col w-full xl:text-[16px] sm:text-[10px] ">
      {/* header  */}
      <div className="flex flex-col">
        <div>

        </div>



        <div className="underheader text-[6px] lg:text-sm xl:text-sm flex justify-between px-10 xl:h-10 h-6 ">
          <div onClick={() => navigate("/todaysDeals")}                  className="  w-full text-white hover:outline hover:outline-[1px]  outline-offset-[-1px] cursor-pointer  h-full flex items-center font-medium justify-center ">Сьогоднішні пропозиції</div>
          <div className="hidden xl:block w-full"><div onClick={() => navigate("/giftCards")}                  className=" w-full text-white hover:outline hover:outline-[1px] outline-offset-[-1px] cursor-pointer   h-full flex items-center font-medium justify-center ">Подарункові карти </div></div>
          <div onClick={() => navigate("/help")}                  className=" w-full text-white hover:outline hover:outline-[1px] outline-offset-[-1px] cursor-pointer  h-full flex items-center font-medium justify-center">Обслуговування клієнтів </div>
          {user?.roles?.includes("admin")? <div className="hidden xl:block w-full"><div onClick={() => navigate("/admin/products")}            className=" w-full text-white hover:outline hover:outline-[1px] outline-offset-[-1px] cursor-pointer  h-full flex items-center font-medium justify-center">Сторінка для адміна</div></div> : ""}
          <div onClick={() => navigate("/music/home")}                className=" w-full text-white hover:outline hover:outline-[1px] outline-offset-[-1px] cursor-pointer h-full flex items-center font-medium justify-center">Музика</div>
          {/* <div onClick={() => navigate("/tempProfile/becomeASeller")} className=" w-full text-white hover:outline hover:outline-[1px] outline-offset-[-1px] cursor-pointer  h-full flex items-center font-medium justify-center">Тимчасовий Профіль</div> */}
          <div className="hidden xl:block w-full"><div onClick={() => navigate("/aboutUs")}                   className="  w-full text-white hover:outline hover:outline-[1px] outline-offset-[-1px] cursor-pointer h-full flex items-center font-medium justify-center">Про нас</div></div>
        </div>
      </div>
    </div>
    
    { allLocation.length <=0 || allLocation.includes("help") ? "" :
    <div className="mx-auto w-10/12 ">
      <div className=' text-whiteGray mt-8 mb-4 flex'>
        {allLocation.map((path:string,index)=>
          <Link key={index}
          to={`/${allLocation.slice(0, index + 1).join('/')}`} className='flex' >
            <span className=' self-center mr-2 hover:underline cursor-pointer'>{capitalizeFirstLetter(path)}</span>
            <img className=' self-center mr-2' src={arrowRight} />
          </Link>
        )}
      </div>
    </div>
    }

  </div>
  );

}

export default Header;