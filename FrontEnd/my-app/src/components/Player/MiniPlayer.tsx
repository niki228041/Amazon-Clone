
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Track } from './Player'

import tmp from "../../images/maxre.png";

import Play from "../../images/Play.svg";
import SkipRight from "../../images/Skip right.svg";
import Stop from "../../images/Stop.svg";

import DotsMenu from "../../images/MenuDots.svg";
import Like from "../../images/clickLike.png";
import Comment from "../../images/createComment.png";
import LikeOrange from "../../images/clickLike_orange.png";
import Slider from './Slider/Slider';

function MiniPlayer(
    {currentSong,isPlaying,skipBack,handlePlayPause,skiptoNext,audioRef,percentage,onChange}:
    {
        currentSong:Track,
        isPlaying:boolean,
        skipBack:()=>void,
        handlePlayPause:()=>void,
        skiptoNext:()=>void,
        audioRef:any,
        percentage:number,
        onChange:(e:any)=>void
    }) {


  const [isLikePressed, setLikePressed] = useState(false);

  const formatTime = (seconds:number) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
    
      const formattedMinutes = String(minutes).padStart(2, "0");
      const formattedSeconds = String(remainingSeconds).padStart(2, "0");
    
      return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <div>
        <div className="bg-middleGrayColor  rounded-lg mt-2 self-center gap-3 text-white text-[15px] select-none p-1">
          <div className="flex p-1">
            <div className="col-span-1 mr-2 h-28 w-28 bg-cover bg-center rounded-lg" style={{backgroundImage:`url(${currentSong.image})`}}>
            </div>
            <div className="flex rounded-lg w-full">
              <div className="bg-whiteGrayColor w-full justify-center rounded-lg flex relative self-center h-full">
                <div className=" self-center relative w-full">
                  <div className="flex flex-col m-auto self-center mt-2">
                    <p className=" text-[16px] self-center">{currentSong.title}</p>
                    <div className="flex justify-center mt-2">
                      <img onClick={skipBack} src={SkipRight}                       className="transition-all self-center active:scale-105 rotate-180 px-1 h-7" />
                      <img onClick={handlePlayPause} src={!isPlaying ? Play : Stop} className="transition-all self-center active:scale-105 px-2 h-12" />
                      <img onClick={skiptoNext} src={SkipRight}                     className="transition-all self-center active:scale-105 px-1 h-7" />
                    </div>
                  </div>
                  <div className="flex justify-between text-white text-[12px] w-full px-2 absolute mt-[-12px]">
                    <div className="">{formatTime(Math.trunc(audioRef.current?.currentTime))}</div>
                    <div className="">{formatTime(Math.trunc(audioRef?.current?.duration))}</div>
                  </div>
                  <div className=" w-full mt-1">
                      <Slider percentage={percentage} onChange={onChange} />
                  </div>
                </div>
              </div>

              <div className="w-10 bg-whiteGrayColor ml-2 rounded-lg grid grid-rows-3 ">
                <div className="flex justify-center self-center hover:scale-125">
                  <img className="h-4" src={DotsMenu} />
                </div>
                <div className="flex justify-center self-center hover:scale-125">
                  <img className="h-4" src={Comment} />
                </div>
                <div className="flex justify-center self-center hover:scale-125 active:scale-150 transition-all">
                  <img className="h-4" onClick={()=>setLikePressed(!isLikePressed)} src={isLikePressed ? LikeOrange : Like} />
                </div>
              </div>

              
            </div>

          </div>

          
          
        </div>

    </div>
  )
}

export default MiniPlayer
