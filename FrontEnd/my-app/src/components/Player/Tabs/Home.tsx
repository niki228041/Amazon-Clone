

import Metal from "../../../images/metal.png";
import Pop from "../../../images/pop.png";
import BlackMetal from "../../../images/black metal.png";
import Alternative from "../../../images/alternative.png";
import Rock from "../../../images/rock.png";
import Rap from "../../../images/rap.png";
import Punk from "../../../images/punk.png";
import Tecno from "../../../images/techno.png";

import Deftones from "../../../images/deftones.jpg";

import Play from "../../../images/Play.svg";
import Stop from "../../../images/Stop.svg";

import "../ScrollBar.css";
import { useState } from "react";

const Home=()=> {
  const [isForYouPressed, setForYouPressed] = useState(false);

  return (
    <div className=" mt-6 self-center gap-3 text-white text-[15px] select-none">
          <p className=" text-xl font-semibold my-1">Popular genres</p>

          <div className="flex gap-4 my-2">
            <div className="bg-whiteGrayColor p-2 w-40 h-40 flex rounded-lg justify-center hover:bg-slate-200/50">
              <img className="h-12 self-center" src={Metal} />
            </div>
            <div className="bg-whiteGrayColor p-2 w-40 h-40 flex rounded-lg justify-center hover:bg-slate-200/50">
              <img className="h-14 self-center" src={Pop} />
            </div>
            <div className="bg-whiteGrayColor p-2 w-40 h-40 flex rounded-lg justify-center hover:bg-slate-200/50">
              <img className="h-14 self-center" src={BlackMetal} />
            </div>
            <div className="bg-whiteGrayColor p-2 w-40 h-40 flex rounded-lg justify-center hover:bg-slate-200/50">
              <img className="h-14 self-center" src={Rock} />
            </div>
            <div className="bg-whiteGrayColor p-2 w-40 h-40 flex rounded-lg justify-center hover:bg-slate-200/50">
              <img className="h-14 self-center" src={Rap} />
            </div>
            <div className="bg-whiteGrayColor p-2 w-40 h-40 flex rounded-lg justify-center hover:bg-slate-200/50">
              <img className="h-14 self-center" src={Punk} />
            </div>
            <div className="bg-whiteGrayColor p-2 w-40 h-40 flex rounded-lg justify-center hover:bg-slate-200/50">
              <img className="h-14 self-center" src={Tecno} />
            </div>
          </div>

          <p className=" text-xl font-semibold mt-8 mb-4">Albums in trend</p>
          
          <div className="p-2 w-40 h-40 flex rounded-lg justify-center bg-cover"  style={{backgroundImage:`url(${Deftones})`,backgroundPosition:"center"}}/>
          
          <p className=" text-xl font-semibold mt-8 mb-4">Made for you</p>
            
          <div className="flex">
            
            
            
            <div onClick={()=>setForYouPressed(!isForYouPressed)} className="p-2 w-72 h-72 flex rounded-lg justify-center mr-6 relative bg-cover bg-center"  style={{backgroundImage:`url(${Deftones})`,backgroundPosition:"center"}}>
              <div className="absolute top-0 left-0 w-full h-full hover:bg-black active:bg-white/20 transition-all opacity-50 rounded-lg"></div>
              <img className="h-1/3 self-center" src={isForYouPressed ? Play : Stop} />
            </div>
            
            
            <div className="bg-whiteGrayColor/60 w-2/3 rounded-lg p-3 px-4 h-72">
              <div className="flex flex-row-reverse w-full">  
                <span className="font-semibold text-almostWhiteColor cursor-pointer ">See All</span>
              </div>
              <div className="custom-scrollbar h-60 scrollbar-thin scrollbar-thumb-gray-400">
              
                <div className="font-medium flex justify-between  hover:scale-95 transition-all cursor-pointer active:bg-slate-50/50 active:transition-none  px-2 py-3 rounded-lg ">
                  <span>
                    <span className=" text-almostWhiteColor font-normal">Smashing Pumpkins</span> - Today 
                  </span>
                  <span className=" font-semibold">200k</span>
                </div>
  
                <div className=" bg-almostWhiteColor h-[1px] w-full my-1" />
  
                <div className="font-medium flex justify-between  hover:scale-95 transition-all cursor-pointer active:bg-slate-50/50 active:transition-none  px-2 py-3 rounded-lg ">
                  <span>
                    <span className=" text-almostWhiteColor font-normal">Smashing Pumpkins</span> - Today 
                  </span>
                  <span className=" font-semibold">200k</span>
                </div>
  
                <div className=" bg-almostWhiteColor h-[1px] w-full my-1" />
  
                <div className="font-medium flex justify-between  hover:scale-95 transition-all cursor-pointer active:bg-slate-50/50 active:transition-none  px-2 py-3 rounded-lg ">
                  <span>
                    <span className=" text-almostWhiteColor font-normal">Smashing Pumpkins</span> - Today 
                  </span>
                  <span className=" font-semibold">200k</span>
                </div>
  
                <div className=" bg-almostWhiteColor h-[1px] w-full my-1" />
  
                <div className="font-medium flex justify-between  hover:scale-95 transition-all cursor-pointer active:bg-slate-50/50 active:transition-none  px-2 py-3 rounded-lg ">
                  <span>
                    <span className=" text-almostWhiteColor font-normal">Smashing Pumpkins</span> - Today 
                  </span>
                  <span className=" font-semibold">200k</span>
                </div>
  
                <div className=" bg-almostWhiteColor h-[1px] w-full my-1" />
  
                <div className="font-medium flex justify-between  hover:scale-95 transition-all cursor-pointer active:bg-slate-50/50 active:transition-none  px-2 py-3 rounded-lg ">
                  <span>
                    <span className=" text-almostWhiteColor font-normal">Smashing Pumpkins</span> - Today 
                  </span>
                  <span className=" font-semibold">200k</span>
                </div>

                <div className=" bg-almostWhiteColor h-[1px] w-full my-1" />
  
                <div className="font-medium flex justify-between  hover:scale-95 transition-all cursor-pointer active:bg-slate-50/50 active:transition-none  px-2 py-3 rounded-lg ">
                  <span>
                    <span className=" text-almostWhiteColor font-normal">Smashing Pumpkins</span> - Today 
                  </span>
                  <span className=" font-semibold">200k</span>
                </div>

            </div>

            </div>
          </div>

          <div className="my-96" />

        </div>
  )
}

export default Home
