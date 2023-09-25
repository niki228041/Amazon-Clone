
import React, { useEffect, useState } from 'react'
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
import { useDispatch } from 'react-redux';
import { setIsPlay, setLikes, setOnChangeSlider } from '../../features/user/musicStateSlice';
import { useAppSelector } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { setLike } from './Tabs/MyTracks';
import { apiPlayerSlice } from '../../features/user/apiPlayerSlice';

function MiniPlayer() {


  const [isLikePressed, setLikePressed] = useState(false);
  const isPlay = useAppSelector((state)=>state.track.isPlay);
  const track = useAppSelector((state)=>state.track);
  const user = useAppSelector((state)=>state.user.user);

  const dispath = useDispatch()

  const formatTime = (seconds:number) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
    
      const formattedMinutes = String(minutes).padStart(2, "0");
      const formattedSeconds = String(remainingSeconds).padStart(2, "0");
    
      return `${formattedMinutes}:${formattedSeconds}`;
  };

  
  const onChangeLocal= (e:any)=>{
    dispath(setOnChangeSlider(e.target.value));
  }
  const navigate = useNavigate();
  var [setLike,{}] = apiPlayerSlice.useSetLikeMutation();

  const handleClickLike=()=>{
    var request:setLike = {userId:Number(user.id),trackId:track?.currentTrack?.id!,isLiked:!isLikePressed};
    
    if(!isLikePressed)
    {
      setLike(request);
    }
    else
    {
      request.isLiked=false;
      setLike(request);
    }
    // dispath(setLikes(track?.currentTrack?.wasLikedByUsers));

    setLikePressed(!isLikePressed);
  }

  useEffect(()=>{
    var likedUser = track?.currentTrack?.wasLikedByUsers?.find((trk:any)=>trk == Number(user.id));
      
    if(likedUser != undefined)
    {
      setLikePressed(true);
    }
    else{
      setLikePressed(false);
    }
    

  },[track.currentTrack?.wasLikedByUsers,track.currentTrack?.id])


  return (
    <>
    {track.currentTrack != null?
    <div className=''>
        <div className="bg-middleGrayColor  rounded-lg mt-2 self-center gap-3 text-white text-[15px] select-none p-1">
          <div className="flex p-1">
            <div className="col-span-1 mr-2 h-28 w-28 bg-cover bg-center rounded-lg" style={{backgroundImage:`url(${track?.currentTrack?.image})`}}>
            </div>
            <div className="flex rounded-lg w-full ">
              <div className="bg-whiteGrayColor w-full  justify-center rounded-lg flex relative self-center h-full">
                <div className=" self-center relative w-full ">
                  <div className="flex flex-col m-auto self-center mt-2">
                    <p className=" text-[16px] self-center">{track?.currentTrack?.title}</p>
                    <div className="flex justify-center mt-2">
                      <img src={SkipRight} className="transition-all self-center active:scale-105 rotate-180 px-1 h-7" />
                      <img onClick={()=>dispath(setIsPlay(!isPlay))} src={!isPlay ? Play : Stop} className="transition-all self-center active:scale-105 px-2 h-12" />
                      <img src={SkipRight} className="transition-all self-center active:scale-105 px-1 h-7" />
                    </div>
                  </div>
                  <div className="flex  justify-between text-white text-[12px] w-full px-2 absolute mt-[-12px]">
                    <div className="">{formatTime(Math.trunc(track.currentTime))}</div>
                    <div className="">{formatTime(Math.trunc(track.duration))}</div>
                  </div>
                  <div className=" w-full mt-1">
                      <Slider percentage={track.percentage} onChange={onChangeLocal} />
                  </div>
                </div>
              </div>

              <div className="w-10 bg-whiteGrayColor ml-2 rounded-lg grid grid-rows-3 ">
                <div className="flex justify-center self-center hover:scale-125">
                  <img className="h-4" src={DotsMenu} />
                </div>
                <div className="flex justify-center self-center hover:scale-125">
                  <img className="h-4" onClick={()=>navigate("/music/viewTrack/"+track?.currentTrack?.id)} src={Comment} />
                </div>
                <div className="flex justify-center self-center hover:scale-125 active:scale-150 transition-all">
                  <img className="h-4"  onClick={()=>handleClickLike()} src={isLikePressed ? LikeOrange : Like} />
                </div>
              </div>

              
            </div>

          </div>

          
          
        </div>

    </div>
    :""}
    </>
  )
}

export default MiniPlayer
