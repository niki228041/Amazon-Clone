import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import DotsMenu from "../../../images/MenuDots.svg";
import Play from "../../../images/Play.svg";
import Stop from "../../../images/Stop.svg";

import { apiPlayerSlice, useGetAlbumsByUserIdQuery, useGetLikedTracksByUserIdQuery } from '../../../features/user/apiPlayerSlice';
import { useAppSelector } from '../../../app/hooks';
import { TrackFromServer } from '../Player';
import { useDispatch } from 'react-redux';
import { changeTrack, setIsPlay } from '../../../features/user/musicStateSlice';
import { addHistoryElement } from './MyTracks';
import { Link, useNavigate } from 'react-router-dom';


export interface Album{
  id:number,
  title:string,
  background:string,
  username:string,
  userId:number,
}

export const AlbumItem=({ album,changePressed }
  : { album: Album,
      changePressed:(value:Album)=>{},
    }
  )=>{
    const globalTrack = useAppSelector((state)=>state.track.currentTrack);
    const isPlay = useAppSelector((state)=>state.track.isPlay);
    const user = useAppSelector((state)=>state.user.user);

    const [isLikePressed, setLikePressed] = useState(false);
    const [isSongPressed, setSongPressed] = useState(false);
    const dispath = useDispatch();


    return(
    <div className="flex my-4">
      <div>
        <Link to={"/music/album/" + album.id} className=" rounded-lg self-center w-52 h-52 flex justify-center bg-cover bg-center" style={{backgroundImage:`url(${album.background})`}}>
          <img className='h-16 self-center' src={Play} />
        </Link>
        <div className='text-sm'>
          <p className='mt-1'>{album.title}</p>

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

const Playlists=()=> {
  const user = useAppSelector((state)=>state.user.user);

  const {data:albums,isSuccess:isSuccessTracks}:{data:{payload:Album[]},isSuccess:boolean} = useGetAlbumsByUserIdQuery({id:user.id});
  const dispath = useDispatch();
  const navigate = useNavigate();

  console.log("albums");
  console.log(albums?.payload);
  console.log(user.id);

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


  const handleChangeStand=(value:Album)=>{
    return "";
  }


  return (
    <div className="bg-middleGrayColor rounded-lg mt-2 self-center gap-3 text-white text-[15px] select-none py-3 px-6">
        <div className='flex justify-between'>
            <p className=' text-xl font-semibold'>Playlists</p>
            <div>
              <input value={inputText} onChange={event => handleGo(event.target.value)} placeholder='Search a song..' className=" self-center bg-white rounded-full h-6 text-black text-[12px] px-4 pr-8 mr-2"/>
              <button onClick={()=>{navigate("/music/createAlbum")}} className='ml-2 px-10 transition-all active:bg-slate-50/50 py-2 bg-whiteGrayColor rounded-xl'>Add Playlist</button>
            </div>
        </div>

        <div className='grid grid-cols-5'>
            
        {albums?.payload?.filter((item) => {
            return inputText.toLowerCase() === ' ' ? item : item.title?.toLowerCase().includes(inputText.toLowerCase());
          }).map((album)=>{
            return <AlbumItem album={album} changePressed={handleChangeStand}/>
          })}
        </div>

    </div>
  )
}


export default Playlists
