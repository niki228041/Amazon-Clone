import React, { useEffect, useState } from 'react'

import DotsMenu from "../../../images/MenuDots.svg";
import Like from "../../../images/clickLike.png";
import Comment from "../../../images/createComment.png";
import LikeOrange from "../../../images/clickLike_orange.png";
import Play from "../../../images/Play.svg";
import Play_small from "../../../images/play.png";
import Stop from "../../../images/Stop.svg";
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import { TrackFromServer } from '../Player';
import { apiPlayerSlice, useGetTrackHistoryByUserIdQuery } from '../../../features/user/apiPlayerSlice';
import { useDispatch } from 'react-redux';
import { changeTrack, setIsPlay, setLikes } from '../../../features/user/musicStateSlice';
import { addHistoryElement, setLike } from './MyTracks';
import { formatDistanceToNow, parseISO } from 'date-fns';

export const HistoryItem=({ track,changePressed }
  : { track: TrackFromServer,
      changePressed:(value:TrackFromServer)=>{},
    }
  )=>{

    const globalTrack = useAppSelector((state)=>state.track.currentTrack);
    const isPlay = useAppSelector((state)=>state.track.isPlay);
    const user = useAppSelector((state)=>state.user.user);

    const [isLikePressed, setLikePressed] = useState(false);
    const [isSongPressed, setSongPressed] = useState(false);
    const dispath = useDispatch();

    var [setLike,{}] = apiPlayerSlice.useSetLikeMutation();
    const [addHistory,{}]=apiPlayerSlice.useAddHistoryMutation();

    const changeTrack=()=>{
      if(globalTrack?.id != track.id)
      {
        var request:addHistoryElement = {userId:Number(user.id),trackId:track.id};
        setSongPressed(false);
        dispath(setIsPlay(true));
        addHistory(request);
      }

      if(globalTrack?.id == track.id)
      {
        setSongPressed(true);
      }

      if(isSongPressed)
      {
        setSongPressed(false);
        dispath(setIsPlay(false));
      }
      else{
        setSongPressed(true);
        changePressed(track);
        dispath(setIsPlay(true));
      }

    }
    const navigate = useNavigate();
    

    useEffect(()=>{

      if(globalTrack?.id != track.id)
      {
        setSongPressed(false);
      }

      if(globalTrack?.id == track.id && isPlay == true)
      {
        setSongPressed(true);
      }

      if(!isPlay)
      {
        setSongPressed(false);
      }

      var likedUser = track.wasLikedByUsers?.find((trk:any)=>trk == Number(user.id));
      
      if(likedUser != undefined)
      {
        setLikePressed(true);
      }
      
      dispath(setLikes(track.wasLikedByUsers));

    },[globalTrack?.song,track.wasLikedByUsers,track.id,track.title,isSongPressed,isPlay])

    function formatDateDifference(dateString:string) {
      const date = parseISO(dateString);
      const now = new Date();

    
      const difference = formatDistanceToNow(date, { addSuffix: true });
    
      return difference;
    }
    

    const handleClickLike=()=>{
      var request:setLike = {userId:Number(user.id),trackId:track.id,isLiked:!isLikePressed};
      
      if(!isLikePressed)
      {
        setLike(request);
      }
      else
      {
        request.isLiked=false;
        setLike(request);
      }


      setLikePressed(!isLikePressed);
    }

    
    return(
    <div key={track.id} className="flex my-4">
    <div className="mr-2 h-24 w-24 rounded-lg bg-cover bg-center" style={{backgroundImage:`url(${track.image})`}}>
    </div>
    <div className=" flex rounded-lg w-full">
      
      <div className="bg-whiteGrayColor w-full flex rounded-lg relative">
      <div className="flex flex-row-reverse w-full absolute">  
        <span className="text-[13px] p-2 text-almostWhiteColor cursor-pointer ">{formatDateDifference(track.trackHistoryDateCreated)}</span>
      </div>
      <div className='flex justify-between w-full m-auto px-2 self-center'>
          <div className="flex">
            <img onClick={()=>changeTrack()} src={!isSongPressed ? Play : Stop} className="transition-all active:scale-105 pr-2 h-12 self-center" />
            <span className="self-center">{track.title}</span>
            {/* <span className=" text-[16px] self-center"> ダーリン (darling)</span> */}
          </div>
          <div className="flex">
              <span className=' self-center mr-2 font-semibold'>{track.views} </span><img className='h-4 self-center' src={Play_small} />
          </div>
      </div>

      </div>
      <div className="w-10 bg-whiteGrayColor ml-2 rounded-lg grid grid-rows-3 ">
        <div className="flex justify-center self-center hover:scale-125">
          <img className="h-4" src={DotsMenu} />
        </div>
        <div className="flex justify-center self-center hover:scale-125">
          <img className="h-4" onClick={()=>navigate("/music/viewTrack/"+track.id)} src={Comment} />
        </div>
        <div className="flex justify-center self-center hover:scale-125 active:scale-150 transition-all">
          <img className="h-4" onClick={()=>handleClickLike()} src={isLikePressed ? LikeOrange : Like} />
        </div>
      </div>
    </div>
    </div>

    )
}

const History=()=> {
  const navigate = useNavigate();
  const user = useAppSelector((state)=>state.user.user);
  const {data:tracks,isSuccess:isSuccessTracks}:{data:TrackFromServer[],isSuccess:boolean} = useGetTrackHistoryByUserIdQuery({id:user.id});

  
  const [onSearch,setSearch]= useState(false);
  const [inputText, setInputText] = useState("");
  const dispath = useDispatch();

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
  

  const handleChangeStand=(value:TrackFromServer)=>{
    dispath(changeTrack(value));
    return "";
  }

  const sortedTracks = tracks
  ?.slice() // Создаем глубокую копию массива
  .sort((a, b) => new Date(b.trackHistoryDateCreated).getTime() - new Date(a.trackHistoryDateCreated).getTime());

  return (
    <div className="bg-middleGrayColor rounded-lg mt-2 self-center gap-3 text-white text-[15px] select-none py-3 px-6">
        <div className='flex justify-between'>
            <p className=' text-xl font-semibold'>History</p>
            <input value={inputText} onChange={event => handleGo(event.target.value)}  placeholder='Search a song..' className=" self-center bg-white rounded-full h-6 text-black text-[12px] px-4 pr-8"/>
        </div>

        
        <div className=''>
          {sortedTracks?.filter((item) => {
            return inputText.toLowerCase() === ' ' ? item : item.title?.toLowerCase().includes(inputText.toLowerCase());
          }).map((track) => (
            <HistoryItem key={track.id} track={track} changePressed={handleChangeStand} />
          ))}
        </div>

    </div>
  )
}


export default History
