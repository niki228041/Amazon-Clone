import React, { useEffect, useState } from 'react'
import img from '../../../images/d33644fc9c30c11105de0b3112780647.jpg'
import classNames from 'classnames';
import { Outlet, useLocation, useSearchParams } from 'react-router-dom';
import { setMainMusicProfile } from '../../../features/user/musicStateSlice';
import { useAppSelector } from '../../../app/hooks';
import { useDispatch } from 'react-redux';
import './Profile.css';
import { useGetMySubscribesByUserIdQuery, useGetSubscribersByUserIdQuery, useGetTracksByUserIdQuery} from '../../../features/user/apiPlayerSlice';
import { User } from '../../types';
import { TrackFromServer } from '../Player';

const MusicProfile=()=> {
  const [isFollow, setIsFollow] = useState(false);
  // const [search_, setSearch] = useSearchParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const fullPath = location.pathname + location.search + location.hash;
  const isMusicProfile = useAppSelector((state)=>state.track.mainMusicProfile);

  const user = useAppSelector((state)=>state.user.user);
  
  var {data:followers}:{data:{payload:User[]}} = useGetSubscribersByUserIdQuery({id:user.id});
  var {data:following}:{data:{payload:User[]}} = useGetMySubscribesByUserIdQuery({id:user.id});
  var {data:userTracks}:{data:TrackFromServer[]} = useGetTracksByUserIdQuery({id:user.id});

  

  const [elementHeight, setElementHeight] = useState('300px'); // Initial height



  useEffect(()=>{
    if(fullPath.includes("main"))
    {
      console.log(fullPath);
      dispatch(setMainMusicProfile(true));

      setElementHeight(!isMusicProfile ? '100px' : '300px'); // Change height
    }
    else{
      dispatch(setMainMusicProfile(false));

      setElementHeight(!isMusicProfile ? '100px' : '300px'); // Change height
    }

  },[fullPath,isMusicProfile])

  console.log(isMusicProfile);

  return (
    <div className=' '>
      <div className="your-container">
      <div
        className={classNames(
          'px-4 mt-2 rounded-tl-lg rounded-tr-lg bg-cover duration-500 bg-center flex transition-all is-music-profile',
          {
            '': isMusicProfile,
          }
        )}
        style={{
          backgroundImage: `url(${img})`,
          backgroundSize: 'cover',
          height: elementHeight, // Set the height dynamically
        }}
      >
        <span className={classNames("text-white text-[80px] font-semibold transition-all self-end")}>{user.username}</span>
      </div>
    </div>

      <div className='bg-middleGrayColor p-4 px-6 rounded-b-lg flex justify-between pb-10'>
        <div className='flex self-center'>
          <span className='mr-10 text-white text-sm  self-end hover:underline cursor-pointer'>{followers?.payload.length} Followers</span>
          <span className='mr-10 text-white text-sm  self-end hover:underline cursor-pointer'>{following?.payload.length} Following</span>
          <span className='mr-10 text-white text-sm  self-end hover:underline cursor-pointer'>{userTracks?.length } Tracks</span>
        </div>

        <div className=''>
          <div className="flex h-full ">
            <button onClick={()=>{setIsFollow(!isFollow)}} className={classNames(
              "rounded-lg transition-all duration-125 py-1",
              {
                "bg-orangeColor text-black px-12 ": !isFollow,
                "bg-almostBlackColor text-orangeColor px-6 ": isFollow,
              }
            )}>
              <span >{!isFollow ? "Follow" : "Followed"}</span>
            </button>
          </div>
        </div>
      </div>
      <Outlet/>
    </div>
  )
}


export default MusicProfile
