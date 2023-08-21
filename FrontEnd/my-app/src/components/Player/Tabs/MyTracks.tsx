import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import DotsMenu from "../../../images/MenuDots.svg";
import Like from "../../../images/clickLike.png";
import Comment from "../../../images/createComment.png";
import LikeOrange from "../../../images/clickLike_orange.png";
import Play from "../../../images/Play.svg";
import Stop from "../../../images/Stop.svg";
import deleteIcon from "../../../images/deleteicon.png";
import editIcon from "../../../images/editIcon.png";
import { useNavigate } from 'react-router-dom';
import { apiPlayerSlice, useGetTracksByUserIdQuery } from '../../../features/user/apiPlayerSlice';
import { useAppSelector } from '../../../app/hooks';
import { TrackFromServer } from '../Player';
import { changeTrack, deleteTrack, setIsPlay, setLikes } from '../../../features/user/musicStateSlice';
import { useDispatch } from 'react-redux';
import Play_small from "../../../images/play.png";

import { formatDistanceToNow, parseISO } from 'date-fns';



export interface setLike{
  trackId:number,
  userId:number,
  isLiked:boolean
}

export interface addHistoryElement{
  trackId:number,
  userId:number,
}

export const TrackItem=({ track,changePressed }
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
    const navigate = useNavigate();

    var [setLike,{}] = apiPlayerSlice.useSetLikeMutation();
    const [addHistory,{}]=apiPlayerSlice.useAddHistoryMutation();
    const [deleteTrack,{}]=apiPlayerSlice.useDeleteTrackMutation();


    const changeTrack=()=>{
      if(globalTrack?.id != track.id)
      {
        var request:addHistoryElement = {userId:Number(user.id),trackId:track.id};
        addHistory(request);
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

      

    },[globalTrack?.song,isPlay,globalTrack?.id,track.id])

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
        dispath(setLikes(track.wasLikedByUsers));
      }
      else
      {
        request.isLiked=false;
        setLike(request);
        dispath(setLikes(track.wasLikedByUsers));
      }


      setLikePressed(!isLikePressed);
    }
    
    return(
    <div className="flex my-4">
    <div className="mr-2 h-28 w-28 rounded-lg bg-cover bg-center" style={{backgroundImage:`url(${track.image})`}} >
      {/* <div className=" rounded-lg self-center h-28 w-28" src={track.image}  /> */}
    </div>
    <div className=" flex rounded-lg w-full">
      
      <div className="bg-whiteGrayColor w-full flex rounded-lg relative">
      <div className="flex flex-row-reverse w-full absolute">  
        <span className="font-semibold text-sm p-2 text-almostWhiteColor cursor-pointer ">{formatDateDifference(track.dateCreated)}</span>
      </div>
      <div className='flex justify-between w-full m-auto px-2 self-center'>
          <div className="flex">
            <img onClick={()=>changeTrack()} src={!isSongPressed ? Play : Stop} className="transition-all active:scale-105 pr-2 h-12 self-center" />
            {/* <span className=" text-almostWhiteColor self-center">{track.id} - </span> */}
            <span className=" text-[16px] self-center"> {track.title}</span>
          </div>
          <div className="flex">
              <span className=' self-center font-semibold mr-2'>{track.views} </span><img className='h-4 self-center' src={Play_small} />
          </div>
      </div>

      </div>

      <div className='flex bg-whiteGrayColor rounded-lg ml-2'>
          <div className="w-10 rounded-lg grid grid-rows-3 ">

            <div className="flex justify-center self-center hover:scale-125 row-start-2">
              <img className="h-6" src={editIcon} />
            </div>
            <div onClick={()=>{deleteTrack({id:track.id})}} className="flex justify-center self-center hover:scale-125 row-start-3 active:scale-150 transition-all">
              <img className="h-5" src={deleteIcon} />
            </div>
          </div>
          <div className="w-10 rounded-lg grid grid-rows-3 ">
            <div className="flex justify-center self-center hover:scale-125">
              <img className="h-5" src={DotsMenu} />
            </div>
            <div className="flex justify-center self-center hover:scale-125">
              <img onClick={()=>navigate("/music/viewTrack/"+track.id)} className="h-5" src={Comment} />
            </div>
            <div className="flex justify-center self-center hover:scale-125 active:scale-150 transition-all">
              <img className="h-5" onClick={()=>handleClickLike()} src={isLikePressed ? LikeOrange : Like} />
            </div>
          </div>
      </div>
      
    </div>
    </div>

    )
}

const MyTracks=()=> {

  const navigate = useNavigate();
  const user = useAppSelector((state)=>state.user.user);
  const currentTrack = useAppSelector((state)=>state.track.currentTrack);
  const {data:tracks,isSuccess:isSuccessTracks}:{data:TrackFromServer[],isSuccess:boolean} = useGetTracksByUserIdQuery({id:user.id});
  const dispath = useDispatch();


  const handleChangeStand=(value:TrackFromServer)=>{
    dispath(changeTrack(value));
    return "";
  }


  return (
    <div className="bg-middleGrayColor rounded-lg mt-2 self-center gap-3 text-white text-[15px] select-none py-3 px-6">
        <div className='flex justify-between'>
            <p className=' text-xl font-semibold'>My Tracks</p>
            <div>
              <button onClick={()=>{navigate("/music/createTrack")}} className='ml-2 px-10 transition-all active:bg-slate-50/50 py-2 bg-whiteGrayColor rounded-xl'>Add Song</button>

              {user?.roles?.includes("admin") ? <button onClick={()=>{navigate("/music/createGenre")}} className='ml-2 px-10 transition-all active:bg-slate-50/50 py-2 bg-whiteGrayColor rounded-xl'>Add Genre</button> : ""}
            </div>
            
        </div>

        <div className=''>
          {tracks?.map((track)=>{
            return <TrackItem track={track} changePressed={handleChangeStand}/>;
          })}
        </div>

    </div>
  )
}


export default MyTracks
