import React, { useEffect, useState } from 'react'
import img from '../../../images/d33644fc9c30c11105de0b3112780647.jpg'
import classNames from 'classnames';
import { Outlet, useLocation, useParams, useSearchParams } from 'react-router-dom';
import { setMainMusicProfile } from '../../../features/user/musicStateSlice';
import { useAppSelector } from '../../../app/hooks';
import { useDispatch } from 'react-redux';
import './Profile.css';
import { apiPlayerSlice, useGetMySubscribesByUserIdQuery, useGetSubscribersByUserIdQuery, useGetTracksByUserIdQuery} from '../../../features/user/apiPlayerSlice';
import { User, UserVM } from '../../types';
import { TrackFromServer } from '../Player';
import { useGetUserByIdQuery } from '../../../features/user/apiUserSlice';
import { FollowDTO } from '../ViewTrack';

const MusicProfile=()=> {
  const [isFollow, setIsFollow] = useState(false);
  // const [search_, setSearch] = useSearchParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const fullPath = location.pathname + location.search + location.hash;
  const isMusicProfile = useAppSelector((state)=>state.track.mainMusicProfile);

  const user = useAppSelector((state)=>state.user.user);
  
  var params = useParams();
  console.log("userId");
  console.log(params.userId);
  var userId = params.userId;

  var {data:followers}:{data:{payload:UserVM[]}} = useGetSubscribersByUserIdQuery({id:userId});
  var {data:following}:{data:{payload:UserVM[]}} = useGetMySubscribesByUserIdQuery({id:userId});
  var {data:userTracks}:{data:TrackFromServer[]} = useGetTracksByUserIdQuery({id:userId});




  var {data:userFromServer}:{data:{payload:UserVM}} = useGetUserByIdQuery({id:userId});
  console.log(userFromServer);

  const [elementHeight, setElementHeight] = useState('300px'); // Initial height

  const [subscribe,{}] = apiPlayerSlice.useSubscribeMutation();

  const handleFollow=()=>{
    console.log(user.id);
    var request:FollowDTO = {userId:userId!,subscriberId:user.id};
    subscribe(request);
  }

  useEffect(()=>{
    var isFollow = false;
    console.log("followers?.payload");
    console.log(followers?.payload);
    if(followers?.payload)
    {
      for (let index = 0; index < followers?.payload.length; index++) {
        const element = followers.payload[index];
        if(element.id == parseInt(user.id))
        {
          isFollow = true;
        }
      }
    }

    setIsFollow(isFollow);
    console.log("YO");

  },[followers?.payload])


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
        <span className={classNames("text-white text-[80px] font-semibold transition-all self-end")}>{userFromServer?.payload.displayName}</span>
      </div>
    </div>

      <div className='bg-middleGrayColor p-4 px-6 rounded-b-lg flex justify-between pb-10'>
        <div className='flex self-center'>
          <span className='mr-10 text-white text-sm  self-end hover:underline cursor-pointer'>{followers?.payload?.length} Followers</span>
          <span className='mr-10 text-white text-sm  self-end hover:underline cursor-pointer'>{following?.payload?.length} Following</span>
          <span className='mr-10 text-white text-sm  self-end hover:underline cursor-pointer'>{userTracks?.length } Tracks</span>
        </div>

        <div className=''>
          <div className="flex h-full ">
            {
              user.id == userFromServer?.payload.id.toString() ?
              ""
                :
              <button onClick={()=>handleFollow()} className={classNames(
                "rounded-lg transition-all duration-125 py-1",
                {
                  "bg-orangeColor text-black px-12 ": !isFollow,
                  "bg-almostBlackColor text-orangeColor px-6 ": isFollow,
                }
              )}>
                <span >{!isFollow ? "Follow" : "Followed"}</span>
              </button>
            }
          </div>
        </div>
      </div>
      <Outlet/>
    </div>
  )
}


export default MusicProfile
