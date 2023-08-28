
import classNames from 'classnames';
import React, { useEffect, useState } from 'react'
import tmp from "../../images/ronpa.png";
import Play from "../../images/Play.svg";
import Stop from "../../images/Stop.svg";
import Play_small from "../../images/play.png";
import DotsMenu from "../../images/MenuDots.svg";
import Like from "../../images/clickLike.png";
import Comment from "../../images/createComment.png";
import LikeOrange from "../../images/clickLike_orange.png";
import { apiPlayerSlice} from '../../features/user/apiPlayerSlice';
import { TrackFromServer } from './Player';
import { useDispatch } from 'react-redux';
import { changeTrack, setIsPlay, setLikes } from '../../features/user/musicStateSlice';
import { useAppSelector } from '../../app/hooks';
import { addHistoryElement, setLike } from './Tabs/MyTracks';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { formatDistanceToNow, parseISO } from 'date-fns';

interface searchDTO{
    name:string,
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


    //   searchTitle
  
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
  
      },[globalTrack?.song,track.wasLikedByUsers,track.id,track.title,isSongPressed,isPlay,isLikePressed])
  
      function formatDateDifference(dateString:string) {
        const date = parseISO(dateString);
        const now = new Date();
  
      
        const difference = formatDistanceToNow(date, { addSuffix: true });
      
        return difference;
      }
      
  
      const handleClickLike = () => {
        setLikePressed(prevIsLikePressed => !prevIsLikePressed);
        
        const request = { userId: Number(user.id), trackId: track.id, isLiked: !isLikePressed };
        
        setLike(request).catch(() => {
          // If the API request fails, revert the like status
          setLikePressed(prevIsLikePressed => !prevIsLikePressed);
        });
      };
      
      
      
      return(
        <div className=' bg-middleGrayColor p-2 rounded-lg mt-4'>
            <div className='flex'>
                <div>
                    <div className=' w-36 h-36 rounded-lg bg-center bg-cover flex justify-center relative' style={{backgroundImage:`url(${track.image})`}}>
                        <span className='absolute right-0 flex text-white text-sm p-1'>{track.views} <img className='h-4 self-center' src={Play_small}/></span>
                        <img onClick={()=>changeTrack()} src={!isSongPressed ? Play : Stop} className="transition-all active:scale-105 pr-2 h-12 self-center" />
                    </div>
                </div>
                <div className='grid grid-cols-7 w-full'>
                    <div className='w-full p-2 ml-2  col-span-4 '>
                        <span className='text-xl font-semibold text-white'>{track.title}</span>
                        <div className='flex flex-wrap mt-2 text-sm'>

                        {track.genres?.map((genre)=>{
                          return <div className='  bg-almostBlackColor cursor-pointer hover:bg-whiteGrayColor p-1 mr-3 mt-1 px-6 text-almostWhiteColor rounded-lg'>#{genre.title}</div>;
                        })}

                        </div>
                    </div>
                    <div className='col-span-3 p-2 relative'>
                        <div className='flex flex-row-reverse text-almostWhiteColor text-sm font-medium absolute right-0 mr-1'>{formatDateDifference(track.dateCreated)}</div>
                        <div className='flex h-full flex-row-reverse'>
                            <div className='flex self-end'>
                                <div className='flex text-sm text-almostWhiteColor mr-2'>
                                    <span className='mr-2 font-medium'>Likes {track.wasLikedByUsers?.length}</span>
                                    <img className='h-5 self-center hover:scale-125 active:scale-150 transition-all' onClick={()=>handleClickLike()} src={isLikePressed ? LikeOrange : Like} />
                                </div>
                                <div className='flex text-sm text-almostWhiteColor mr-2'>
                                    <span className='mr-2 font-medium'>Comments {track.comments}</span>
                                    <img className='h-5 self-center hover:scale-125 active:scale-150 transition-all' onClick={()=>navigate("/music/viewTrack/"+track.id)} src={Comment} />
                                </div>
                                <div className='flex text-sm text-almostWhiteColor'>
                                    <img className='h-4 self-center' src={DotsMenu} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
  
      )
  }

const SearchTracks=()=>{
  const [checkSetting,setCheckSetting] = useState("everything");
  const [tracks,setTracks] = useState<TrackFromServer[]>();
  

  const [getSearchTracks,{}] = apiPlayerSlice.useGetSearchTracksByNameMutation();
  const dispath = useDispatch();
  const [search_, setSearch] = useSearchParams();
  
  const handleChangeStand=(value:TrackFromServer)=>{
    dispath(changeTrack(value));
    return "";
  }

  const getSearchParams = () => {
    return new URLSearchParams(window.location.search);
  };


  useEffect(()=>{
    handleGetSearchTracksAsync();

  },[search_,tracks])

  const handleGetSearchTracksAsync = async ()=>{
    var searchValue = search_.get("search");
    var request:searchDTO = {name:searchValue!};
    if(searchValue != null)
    {
      let response: any = await getSearchTracks(request);
      console.log("HERE PLS:");
      console.log(response?.data);
      setTracks(response?.data);
    }

  }

  return (
    <div className='mt-2'>
        <div className='grid grid-cols-6 gap-2'>
            <div className='col-span-2'>
                <div className='bg-middleGrayColor p-4 rounded-lg text-white text-xl font-medium self-center mt-2'>
                    Search for “{search_?.get("search")}”
                </div>
                <div className='bg-middleGrayColor p-4 rounded-lg font-medium self-center mt-5'>
                    <span className='text-white text-lg'>I’m searching for</span>
                    <div className='flex justify-between mt-3'>
                        <span className=' text-almostWhiteColor self-center text-sm'>Everything</span>
                        <div onClick={()=>setCheckSetting("everything")} className={classNames(
                            'h-3 self-center  rounded-full cursor-pointer transition-all ',
                            {" bg-orangeColor w-20":checkSetting == "everything",
                             "bg-grayForCheckBox w-10":checkSetting != "everything"}
                        )} />
                    </div>
                    <div className='flex justify-between mt-3'>
                        <span className=' text-almostWhiteColor self-center text-sm'>People</span>
                        <div onClick={()=>setCheckSetting("people")} className={classNames(
                            'h-3 self-center  rounded-full cursor-pointer transition-all ',
                            {" bg-orangeColor w-20":checkSetting == "people",
                             "bg-grayForCheckBox w-10":checkSetting != "people"}
                        )} />
                    </div>
                    <div className='flex justify-between mt-3'>
                        <span className=' text-almostWhiteColor self-center text-sm'>Tracks</span>
                        <div onClick={()=>setCheckSetting("tracks")} className={classNames(
                            'h-3 self-center  rounded-full cursor-pointer transition-all ',
                            {" bg-orangeColor w-20":checkSetting == "tracks",
                             "bg-grayForCheckBox w-10":checkSetting != "tracks"}
                        )} />
                    </div>
                    <div className='flex justify-between mt-3'>
                        <span className=' text-almostWhiteColor self-center text-sm'>Albums</span>
                        <div onClick={()=>setCheckSetting("albums")} className={classNames(
                            'h-3 self-center  rounded-full cursor-pointer transition-all ',
                            {" bg-orangeColor w-20":checkSetting == "albums",
                             "bg-grayForCheckBox w-10":checkSetting != "albums"}
                        )} />
                    </div>
                </div>
            </div>
            <div className='col-span-4 mb-20'>
                <p className=' text-almostWhiteColor mt-6'>{tracks?.length} Tracks was founded, {0} People was founded, {0} Albums was founded</p>

                {tracks?.map((track)=>{
                  return <TrackItem track={track} changePressed={handleChangeStand}/>;
                })}

                
            </div>
        </div>
    </div>
  )
}


export default SearchTracks
