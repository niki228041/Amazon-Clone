import { useLocation, useNavigate } from "react-router-dom";
import search from "../../images/search.png"

import iconMenu from "../../images/iconMenu.png";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setMenu } from "../../features/user/musicStateSlice";
import allMartMusicLogo from "../../images/ALLmart musik.svg"
import Message from "../../images/Message.svg"
import ShoppingBasket from "../../images/shopping_basket.svg"
import UserLogo from "../../images/UserLogo.svg"
import Heart from "../../images/Heart.svg"

import __1 from "../../images/__1.png"
import __2 from "../../images/__2.png"
import __3 from "../../images/__3.png"
import __4 from "../../images/__4.png"
import SelectSongsForAlbumModal from "./Album/SelectSongsForAlbumModal";


const MusicHeader=()=>{
    var navigate = useNavigate();
    var dispatch = useDispatch();
    const [inputText, setInputText] = useState("");
    const location = useLocation();

    const handleChangeTab=()=>{
      window.scrollTo(0, 0);
      var url = `/music/searchTracks?search=${encodeURIComponent(inputText)}`;
      navigate(url);
    }
    const searchParams = new URLSearchParams(location.search);
  
  
    const getSearchParams = () => {
      return new URLSearchParams(window.location.search);
    };
  
    var [categoryId, setcategoryId] = useState(getSearchParams().get('id'));
  
    

    return(
      <>
      <SelectSongsForAlbumModal/>
      <div className="bg-cover w-full z-20 relative">
            
        <div className="w-full bg-musicHeaderGray text-white">
          <div className="grid py-1 grid-cols-12 w-5/6 m-auto px-4">

          <div className="col-start-1  flex justify-center py-2 relative my-auto self-center">
              <img className="h-10 my-1  m-auto" src={allMartMusicLogo} />
          </div>

          <div onClick={()=>navigate("/")} className="col-start-3 font-semibold text-mainYellowColor flex justify-center cursor-pointer  my-auto self-center">
            ГОЛОВНА
          </div>

          {/* <div className="bg-stone-950 rounded-md col-start-1  flex justify-center m-auto h-full w-full items-center cursor-pointer hover:translate-y-1 hover:bg-blue-600 font-medium text-sm select-none hover:scale-105  transition-all" onClick={()=>navigate("/products")}>Back To Site</div> */}
          <div className="col-start-5 col-span-5 flex justify-center py-1 relative my-auto self-center">
            <input value={inputText} onChange={event => setInputText(event.target.value)} placeholder="Search..." className=" bg-white rounded-full h-6 w-full text-black text-[12px] px-4 pr-8"/>
            <div onClick={()=>handleChangeTab()} className=" w-9 h-6 absolute mr-[-1.3px] cursor-pointer active:bg-blue-500   active:transition-none select-none right-0 rounded-r-[10px] flex flex-1 justify-center transition-all self-center m-auto">
              <img className="h-4  m-auto" src={search} />
            </div>
          </div>

          <div className="col-start-10 col-span-3 font-semibold  flex justify-center cursor-pointer  my-auto self-center">
            <div className="flex justify-between w-full pl-12 self-center">
              <div className="flex justify-center flex-col self-center">
                <img className="h-5 self-center" src={UserLogo} />
                <p className="text-[11px] font-normal">Профіль</p>
              </div>
              <div className="flex justify-center flex-col self-center">
                <img className="h-5 self-center" src={Message} />
                <p className="text-[11px] font-normal">Повідомлення</p>
              </div>
              <div className="flex justify-center flex-col self-center">
                <img className="h-4 self-center" src={Heart} />
                <p className="text-[11px] font-normal">Улюблені</p>
              </div>
              <div className="flex justify-center flex-col self-center">
                <img className="h-6 self-center" src={ShoppingBasket} />
                <p className="text-[11px] font-normal">Кошик</p>
              </div>


            </div>
          </div>

          

          {/* <div className="bg-stone-950 rounded-md col-start-9  flex justify-center m-auto h-full w-full items-center cursor-pointer hover:translate-y-1 hover:bg-blue-600 font-medium text-sm select-none hover:scale-105  transition-all" onClick={()=>navigate("createTrack")}>New Track</div>
          <div className="bg-stone-950 rounded-md col-start-10 flex justify-center m-auto h-full w-full items-center cursor-pointer hover:translate-y-1 hover:bg-blue-600 font-medium text-sm select-none hover:scale-105  transition-all" onClick={()=>navigate("createGenre")}>New Genre</div>
          <div className="bg-stone-950 rounded-md col-start-11 flex justify-center m-auto h-full w-full items-center cursor-pointer hover:translate-y-1 hover:bg-indigo-600 font-medium text-sm select-none hover:scale-105  transition-all">New Album</div>
          <div className="bg-stone-950 rounded-md col-start-12 flex justify-center m-auto h-full w-full items-center cursor-pointer hover:translate-y-1 hover:bg-indigo-600 font-medium text-sm select-none hover:scale-105  transition-all" onClick={()=>navigate("/music")}>Home</div> */}
          </div>

        </div>
        
      </div>
      </>
    )
}

export default MusicHeader;