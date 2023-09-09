import React, { useState } from 'react'

import tmp from '../../../images/CoworkingSetup.png'
import tmp_2 from '../../../images/Billie-Eilish-Happier-Than-Ever 1.png'
import { useDispatch } from 'react-redux';
import { changeTrack, setIsPlay, setOnChangeSlider } from '../../../features/user/musicStateSlice';
import { useAppSelector } from '../../../app/hooks';
import { useGetTrackByIdQuery } from '../../../features/user/apiPlayerSlice';
import { TrackFromServer } from '../Player';
import { useParams } from 'react-router-dom';
import Play from "../../../images/Play.svg";
import SkipRight from "../../../images/Skip right.svg";
import Stop from "../../../images/Stop.svg";
import Slider from '../Slider/Slider';

import DotsMenu from "../../../images/MenuDots.svg";
import Like from "../../../images/clickLike.png";
import Comment from "../../../images/createComment.png";
import LikeOrange from "../../../images/clickLike_orange.png";
import Play_small from "../../../images/play.png";


function HearAlbum() {
    const [isPlayPressed, setPlayPressed] = useState(false);
    const dispath = useDispatch();

    const track = useAppSelector((state)=>state.track);
    const isPlay = useAppSelector((state)=>state.track.isPlay);

    const params = useParams();
    var data:any;
    // const {data}: { data?: TrackFromServer} = useGetTrackByIdQuery({ Id: params?.trackId });

    const handlePlayPressed=()=>{
      if(isPlayPressed == false && track.currentTrack?.id != data?.id)
      {
        if(data != undefined)
        {
          setPlayPressed(true);
          dispath(changeTrack(data!));
          dispath(setIsPlay(true))
        }
      }
      else if(isPlayPressed == true && track.currentTrack?.id == data?.id)
      {
        setPlayPressed(false);
        dispath(setIsPlay(false))
      }
      else if(isPlayPressed == false && track.currentTrack?.id == data?.id)
      {
        setPlayPressed(true);
        dispath(setIsPlay(true))
      }
  
      
    }

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


    return (
    <div>
        <div className=' grid grid-cols-7 gap-4'>
            <div className=' col-span-3'>
                <div className=' bg-middleGrayColor px-4 pt-4 pb-2  rounded-lg'>
                    <div className='flex '>
                        <div className='rounded w-[350px] bg-center bg-cover mr-2' style={{ backgroundImage:`url(${tmp})`}}>
                        </div>
                        <div className='  w-full h-full text-almostWhiteColor'>
                            <div className='flex'>
                                <div className=' h-20 w-20 bg-center bg-cover rounded-lg mr-2' style={{ backgroundImage:`url(${tmp_2})`}}></div>
                                <div className=' flex flex-col h-20'>
                                    <div className='flex h-full'>
                                        <span className='flex self-start text-[25px]'>Britni spiers</span>
                                    </div>
                                    <div className='flex h-full text-sm'>
                                        <span className='flex self-end'>362k Followers</span>
                                        <div className=' h-4 w-[1px] bg-black self-end mx-2'></div>
                                        <span className='flex self-end'>8 Tracks</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className=' bg-whiteGrayColor justify-center flex-col flex p-2 mt-4 rounded-lg'>
                                <span className=' self-center'>ダーリン (darling)</span>
                                <div className="flex justify-center mt-2">
                                  <img src={SkipRight} className="transition-all self-center active:scale-105 rotate-180 px-1 h-7" />
                                  <img onClick={()=>handlePlayPressed()} src={!isPlayPressed ? Play : Stop} className="transition-all self-center active:scale-105 px-2 h-12" />
                                  <img src={SkipRight} className="transition-all self-center active:scale-105 px-1 h-7" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className=''>
                        <div className=" self-center relative w-full ">
                          <div className="flex  justify-between text-white text-[14px] px-1 w-full  absolute mt-[-12px]">
                            <div className="">{formatTime(Math.trunc(track.currentTime))}</div>
                            <div className="">{formatTime(Math.trunc(track.duration))}</div>
                          </div>
                          <div className=" w-full mt-5 pt-1 ">
                              <Slider percentage={track.percentage} onChange={onChangeLocal} />
                          </div>
                        </div>
                        <div className='flex justify-end text-white text-sm'>
                            <span className=' self-center'>162</span>
                            <div className='mx-1' />
                            <img className='self-center h-5 cursor-pointer' src={Like} />
                            
                            <div className='mx-1' />

                            <span className=' self-center'>32</span>
                            <div className='mx-1' />
                            <img className='self-center h-5 cursor-pointer' src={Comment} />

                            <div className='mx-1 mr-2' />
                            <img className='self-center h-4 cursor-pointer' src={DotsMenu} />

                        </div>
                    </div>
                </div>
            </div>
            <div className=' col-span-4'>
                <span className='text-almostWhiteColor'>Tracks in this album</span>
                <div className=' bg-middleGrayColor rounded-lg p-2 px-4 mt-3'>
                    <div className='text-almostWhiteColor mt-2 text-[18px]'>7 Tracks</div>
                    
                    <div className=' bg-middleGrayColor rounded-lg mt-2 cursor-pointer'>
                        <div>
                            <div className='  hover:bg-whiteGrayColor active:bg-almostWhiteColor/60 p-2 flex text-white rounded-lg'>
                                <span className=' self-center mr-2'>1</span>
                                <div>
                                    <div className=' h-12 w-12 bg-cover rounded-lg mx-2' style={{backgroundImage:`url(${tmp})`}}/>
                                </div>
                                <span className=' self-center mx-2 text-sm flex-nowrap whitespace-nowrap'>Destructo Disk - Electric Sock</span>
                                <div className=' w-full text-sm  flex flex-row-reverse'>
                                    <span className=' self-center mx-4 flex'>
                                        52
                                        <img className='h-4 self-center' src={Play_small} />
                                    </span>
                                </div>
                            </div>
                            <div className='  hover:bg-whiteGrayColor active:bg-almostWhiteColor/60 p-2 flex text-white rounded-lg'>
                                <span className=' self-center mr-2'>2</span>
                                <div>
                                    <div className=' h-12 w-12 bg-cover rounded-lg mx-2' style={{backgroundImage:`url(${tmp})`}}/>
                                </div>
                                <span className=' self-center mx-2 text-sm flex-nowrap whitespace-nowrap'>Destructo Disk - Electric Sock</span>
                                <div className=' w-full text-sm  flex flex-row-reverse'>
                                    <span className=' self-center mx-4 flex'>
                                        52
                                        <img className='h-4 self-center' src={Play_small} />
                                    </span>
                                </div>
                            </div>
                            <div className='  hover:bg-whiteGrayColor active:bg-almostWhiteColor/60 p-2 flex text-white rounded-lg'>
                                <span className=' self-center mr-2'>3</span>
                                <div>
                                    <div className=' h-12 w-12 bg-cover rounded-lg mx-2' style={{backgroundImage:`url(${tmp})`}}/>
                                </div>
                                <span className=' self-center mx-2 text-sm flex-nowrap whitespace-nowrap'>Destructo Disk - Electric Sock</span>
                                <div className=' w-full text-sm  flex flex-row-reverse'>
                                    <span className=' self-center mx-4 flex'>
                                        52
                                        <img className='h-4 self-center' src={Play_small} />
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    </div>

  )
}

export default HearAlbum