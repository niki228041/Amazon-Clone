import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import DotsMenu from "../../../images/MenuDots.svg";
import Play from "../../../images/Play.svg";
import Stop from "../../../images/Stop.svg";

import { apiPlayerSlice, useGetLikedTracksByUserIdQuery } from '../../../features/user/apiPlayerSlice';
import { useAppSelector } from '../../../app/hooks';
import { TrackFromServer } from '../Player';
import { useDispatch } from 'react-redux';
import { changeTrack, setIsPlay } from '../../../features/user/musicStateSlice';
import { addHistoryElement } from './MyTracks';


export const LikesItem=({ track,changePressed }
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

      

    },[globalTrack?.song,isPlay])


    return(
    <div className="flex my-4">
      <div>
        <div className=" rounded-lg self-center w-52 h-52 flex justify-center bg-cover bg-center" style={{backgroundImage:`url(${track.image})`}}>
          <img className='h-16 self-center' onClick={()=>changeTrack()} src={!isSongPressed ? Play : Stop} />
        </div>
        <div className='text-sm'>
          <p className='mt-1'>{track.title}</p>

          <div className='flex justify-between mt-1 w-52'>
            <p className=' text-[12px] self-center text-almostWhiteColor'>Liked 11 hours ago</p>
            <div className=' hover:bg-almostWhiteColor/20 p-1 rounded-lg'>
              <img className='h-4 w-4 self-center' src={DotsMenu} />
            </div>
          </div>
        </div>
      </div>
        
    </div>

    )
}

const Likes=()=> {
  const user = useAppSelector((state)=>state.user.user);

  const {data:tracks,isSuccess:isSuccessTracks}:{data:TrackFromServer[],isSuccess:boolean} = useGetLikedTracksByUserIdQuery({id:user.id});
  const dispath = useDispatch();

  const [onSearch,setSearch]= useState(false);
  const [inputText, setInputText] = useState("");

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


  return (
    <div className="bg-middleGrayColor rounded-lg mt-2 self-center gap-3 text-white text-[15px] select-none py-3 px-6">
        <div className='flex justify-between'>
            <p className=' text-xl font-semibold'>Likes</p>
            <input value={inputText} onChange={event => handleGo(event.target.value)} placeholder='Search a song..' className=" self-center bg-white rounded-full h-6 text-black text-[12px] px-4 pr-8"/>
        </div>

        <div className='grid grid-cols-5'>
            
        {tracks?.filter((item) => {
            return inputText.toLowerCase() === ' ' ? item : item.title?.toLowerCase().includes(inputText.toLowerCase());
          }).map((track)=>{
            return <LikesItem track={track} changePressed={handleChangeStand}/>
          })}
        </div>

    </div>
  )
}


export default Likes
