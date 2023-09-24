import React, { useState } from 'react'
import tmp from '../../../images/KrismasKlub.jpg'
import Play_small from "../../../images/play.png";
import { useAppSelector } from '../../../app/hooks';
import { TrackFromServer } from '../Player';
import { useGetLikedTracksByUserIdQuery, useGetMySubscribesByUserIdQuery, useGetSubscribersByUserIdQuery, useGetTracksByUserIdQuery } from '../../../features/user/apiPlayerSlice';
import { Link, useNavigate, useParams } from 'react-router-dom';

import plus from '../../../images/PlusForComment.svg'
import classNames from 'classnames';
import { User, UserVM } from '../../types';
import { apiUserSlice, useGetUserByIdQuery } from '../../../features/user/apiUserSlice';

const MainProfile=()=> {

//   const user = useAppSelector((state)=>state.user.user);

  var params = useParams();
  
  var userId = params.userId;

  var {data:userTracks}:{data:TrackFromServer[]} = useGetTracksByUserIdQuery({id:userId});
  var {data:followers}:{data:{payload:UserVM[]}} = useGetSubscribersByUserIdQuery({id:userId});
  var {data:following}:{data:{payload:UserVM[]}} = useGetMySubscribesByUserIdQuery({id:userId});
  var {data:userTracks}:{data:TrackFromServer[]} = useGetTracksByUserIdQuery({id:userId});
  var {data:likedTracks}:{data:TrackFromServer[]} = useGetLikedTracksByUserIdQuery({id:userId});

  var navigate = useNavigate();

  var [dropdownCreateLink,setDropdownCreateLink] = useState<boolean>(false);

  return (
    <div>
        <div className=' grid grid-cols-6 gap-10 mt-8'>
            <div className=' col-span-4'>
                <div className=' text-white text-lg'>User Tracks</div>
                <div className=' bg-middleGrayColor p-1 rounded-lg mt-4'>
                    <div>
                        {userTracks?.map((track,index)=>{
                            return <>
                            <div onClick={()=>{navigate("/music/viewTrack/"+track.id)}} className='  hover:bg-whiteGrayColor active:bg-almostWhiteColor/60 p-2 flex text-white rounded-lg'>
                                <span className=' self-center mx-2'>{index+1}</span>
                                <div>
                                    <div className=' h-12 w-12 bg-cover rounded-lg mx-2 bg-center' style={{backgroundImage:`url(${track.image})`}}/>
                                </div>
                                <span className=' self-center mx-2 text-sm flex-nowrap whitespace-nowrap'>{track.title}</span>
                                <div className=' w-full text-sm  flex flex-row-reverse'>
                                    <span className=' self-center mx-4 flex'>
                                        {track.views}
                                        <img className='h-4 self-center' src={Play_small} />
                                    </span>
                                </div>
                            </div>
                            </>
                        })}

                        
                    </div>
                    
                </div>
            </div>
            <div className='col-span-2'>
                <div className=' mt-2 flex justify-between'>
                    <div className=' text-white text-lg'>Links</div>
                    
                    <span className=' text-sm text-almostWhiteColor hover:text-white cursor-pointer'>
                        <div onClick={()=>{setDropdownCreateLink(!dropdownCreateLink)}} className=' flex bg-gray-300 hover:scale-110 active:scale-90 p-1 rounded-md'>
                            <img src={plus} className='h-3' />
                        </div>
                    </span>
                </div>

                <div className={classNames('transition-all',{"hidden":!dropdownCreateLink})}>
                    <input className=' w-full bg-grayForPlayerColor cursor-pointer p-1 mr-3 mt-2 px-6 text-almostWhiteColor rounded-sm outline-0' placeholder='Назва соц. мережі'/>
                    <input className=' w-full bg-grayForPlayerColor cursor-pointer p-1 mr-3 mt-2 px-6 text-almostWhiteColor rounded-sm outline-0' placeholder='Cилка'/>
                    <div className='flex'>
                        <div className=' bg-grayForPlayerColor hover:bg-whiteGrayColor cursor-pointer p-1 mr-3 mt-2 px-6 text-almostWhiteColor rounded-sm ' >Добавити</div>
                    </div>
                </div>

                <div className={classNames('p-1 rounded-lg mt-1',{"hidden":dropdownCreateLink})}>
                    <div className='flex flex-wrap text-sm'>
                        <div className='   bg-grayForPlayerColor cursor-pointer hover:bg-whiteGrayColor p-1 mr-3 mt-2 px-6 text-almostWhiteColor rounded-lg'>Instagram</div>
                        <div className='   bg-grayForPlayerColor cursor-pointer hover:bg-whiteGrayColor p-1 mr-3 mt-2 px-6 text-almostWhiteColor rounded-lg'>Telegram</div>
                        <div className='   bg-grayForPlayerColor cursor-pointer hover:bg-whiteGrayColor p-1 mr-3 mt-2 px-6 text-almostWhiteColor rounded-lg'>Youtube</div>
                        <div className='   bg-grayForPlayerColor cursor-pointer hover:bg-whiteGrayColor p-1 mr-3 mt-2 px-6 text-almostWhiteColor rounded-lg'>Twitter</div>

                    </div>
                </div>

                <div className=' text-white text-lg mt-6 flex justify-between'>
                    <span>{followers?.payload?.length} Followers</span>
                    <span className=' text-sm text-almostWhiteColor hover:text-white cursor-pointer'>View all</span>
                </div>

                <div className='rounded-lg mt-1'>
                    <div className=' bg-middleGrayColor p-1 rounded-lg mt-4'>
                    {followers?.payload?.map((follower)=>{
                        return<>
                        <div>
                            <Link to={"/music/profile/main/"+follower.id} className='  hover:bg-whiteGrayColor select-none active:bg-almostWhiteColor/60 p-2 flex text-white rounded-lg'>
                                <div>
                                    <div className=' h-12 w-12 bg-cover rounded-lg mx-2' style={{backgroundImage:`url(${follower?.avatar})`}}/>
                                </div>
                                <div className='flex relative'>
                                    <span className=' self-start mx-2 flex-nowrap whitespace-nowrap'>{follower?.firstName}</span>
                                    <span className=' self-end mx-2 text-sm text-almostWhiteColor flex-nowrap whitespace-nowrap absolute'>See Profile</span>
                                </div>

                            </Link>
                        </div>

                        </>
                    })}

                </div>
                <div className=' text-white text-lg mt-6 flex justify-between'>
                    <span>{likedTracks?.length} Liked Tracks</span>
                    <span className=' text-sm text-almostWhiteColor hover:text-white cursor-pointer'>View all</span>
                </div>

                <div className='rounded-lg mt-1 mb-14 '>
                    <div className=' bg-middleGrayColor p-1 rounded-lg mt-4 '>
                    {likedTracks?.slice(0,3).map((liked)=>{
                        return<>
                        <div onClick={()=>{navigate("/music/viewTrack/"+liked.id)}} className='  hover:bg-whiteGrayColor active:bg-almostWhiteColor/60 p-2 flex text-white rounded-lg'>
                            <div >
                                <div className=' h-12 w-12 bg-cover rounded-lg mx-2 bg-center' style={{backgroundImage:`url(${liked.image})`}}/>
                            </div>
                            <span className=' self-center mx-2 text-sm flex-nowrap whitespace-nowrap overflow-hidden w-full'>{liked.title}</span>
                            <span className=' self-center  text-sm  mx-4 flex'>
                                {liked.views}
                                <img className='h-4 self-center' src={Play_small} />
                            </span>
                        </div>
                        </>
                    })}


                </div>
                </div>

                

            </div>

            </div>
        </div>
    </div>
  )
}

export default MainProfile
