import React, { useState } from 'react'
import PropTypes from 'prop-types'

import DotsMenu from "../../images/MenuDots.svg";
import Like from "../../images/clickLike.png";
import Comment from "../../images/createComment.png";
import LikeOrange from "../../images/clickLike_orange.png";
import Play from "../../images/Play.svg";
import Stop from "../../images/Stop.svg";
import tmp from "../../images/maxre.png";
import deleteIcon from "../../images/deleteicon.png";
import editIcon from "../../images/editIcon.png";
import { useNavigate } from 'react-router-dom';
import { useGetTracksByUserIdQuery } from '../../features/user/apiPlayerSlice';
import { useAppSelector } from '../../app/hooks';
import { TrackFromServer } from './Player';
import { changeTrack, deleteTrack } from '../../features/user/musicStateSlice';
import { useDispatch } from 'react-redux';


export const TrackItem=({ track,setSongPressed,isSongPressed }: { track: TrackFromServer,setSongPressed:(value:any)=>{},isSongPressed:boolean})=>{
    const [isLikePressed, setLikePressed] = useState(false);

    console.log(track);
    
    return(
    <div className="flex my-4">
    <div className="mr-2 h-28 w-28 rounded-lg bg-cover bg-center" style={{backgroundImage:`url(${track.image})`}} >
      {/* <div className=" rounded-lg self-center h-28 w-28" src={track.image}  /> */}
    </div>
    <div className=" flex rounded-lg w-full">
      
      <div className="bg-whiteGrayColor w-full flex rounded-lg relative">
      <div className="flex flex-row-reverse w-full absolute">  
        <span className="font-semibold text-sm p-2 text-almostWhiteColor cursor-pointer ">11 Days ago</span>
      </div>
      <div className='flex justify-between w-full m-auto px-2 self-center'>
          <div className="flex">
            <img onClick={()=>setSongPressed(track)} src={!isSongPressed ? Play : Stop} className="transition-all active:scale-105 pr-2 h-12 self-center" />
            {/* <span className=" text-almostWhiteColor self-center">{track.id} - </span> */}
            <span className=" text-[16px] self-center"> {track.title}</span>
          </div>
          <div className="flex">
              <span className=' self-center font-semibold'>200K </span>
          </div>
      </div>

      </div>

      <div className='flex bg-whiteGrayColor rounded-lg ml-2'>
          <div className="w-10 rounded-lg grid grid-rows-3 ">

            <div className="flex justify-center self-center hover:scale-125 row-start-2">
              <img className="h-6" src={editIcon} />
            </div>
            <div className="flex justify-center self-center hover:scale-125 row-start-3 active:scale-150 transition-all">
              <img className="h-5" src={deleteIcon} />
            </div>
          </div>
          <div className="w-10 rounded-lg grid grid-rows-3 ">
            <div className="flex justify-center self-center hover:scale-125">
              <img className="h-5" src={DotsMenu} />
            </div>
            <div className="flex justify-center self-center hover:scale-125">
              <img className="h-5" src={Comment} />
            </div>
            <div className="flex justify-center self-center hover:scale-125 active:scale-150 transition-all">
              <img className="h-5" onClick={()=>setLikePressed(!isLikePressed)} src={isLikePressed ? LikeOrange : Like} />
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
  const dispath = useDispatch();

  const [isSongPressed, setSongPressed] = useState(false);
  const {data:tracks,isSuccess:isSuccessTracks}:{data:TrackFromServer[],isSuccess:boolean} = useGetTracksByUserIdQuery({id:user.id});

  const handleChangeStand=(value:any)=>{

    if(!isSongPressed)
    {
      dispath(changeTrack(value));
      console.log("change");
    }
    else{
      console.log("delete");
      dispath(deleteTrack());
    }

    setSongPressed(!isSongPressed);

    return "";
  }

  return (
    <div className="bg-middleGrayColor rounded-lg mt-2 self-center gap-3 text-white text-[15px] select-none py-3 px-6">
        <div className='flex justify-between'>
            <p className=' text-xl font-semibold'>My Tracks</p>
            <button onClick={()=>{navigate("/music/createTrack")}} className='px-10 transition-all active:bg-slate-50/50 py-2 bg-whiteGrayColor rounded-xl'>Add Song</button>
        </div>

        <div className=''>
          {tracks?.map((track)=>{
            return <TrackItem track={track} isSongPressed={isSongPressed} setSongPressed={handleChangeStand} />;
          })}
        </div>

    </div>
  )
}


export default MyTracks
