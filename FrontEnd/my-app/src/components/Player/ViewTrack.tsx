import { useNavigate, useParams } from "react-router-dom";

import img from "../../images/Billie-Eilish-Happier-Than-Ever 1.png"
import tmp from "../../images/ronpa.png"
import dots from "../../images/dotsMenu.png"
import { useEffect, useState } from "react";
import classNames from "classnames";
import { useAppSelector } from "../../app/hooks";

import Play from "../../images/Play.svg";
import SkipRight from "../../images/Skip right.svg";
import Stop from "../../images/Stop.svg";
import { useDispatch } from "react-redux";
import { changeTrack, setIsPlay, setOnChangeSlider } from "../../features/user/musicStateSlice";
import Slider from "./Slider/Slider";

import DotsMenu from "../../images/MenuDots.svg";
import Like from "../../images/clickLike.png";
import Comment from "../../images/createComment.png";
import LikeOrange from "../../images/clickLike_orange.png";
import { useGetTrackByIdQuery } from "../../features/user/apiPlayerSlice";
import { TrackFromServer } from "./Player";


const ViewTrack=()=>{
    var navigate = useNavigate();
    const [isFollow, setIsFollow] = useState(false);
    const [isLikePressed, setLikePressed] = useState(false);

    const [isPlayPressed, setPlayPressed] = useState(false);

    const [previewDuration, setPreviewDuration] = useState<number>(0);
    const track = useAppSelector((state)=>state.track);



    useEffect(()=>{
      if(track.currentTrack?.id == data?.id)
      {
      }

    },[])

    const isPlay = useAppSelector((state)=>state.track.isPlay);
    // const onChangeLocal = useAppSelector((state)=>state.track.onChangeSlider);
    const params = useParams();

    const onChangeLocal= (e:any)=>{
      
      
      if(track.currentTrack?.id != data?.id)
      {
        dispath(changeTrack(data!));
      }

      dispath(setOnChangeSlider(e.target.value));

    }
    

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


    const { data, isSuccess }: { data?: TrackFromServer , isSuccess: boolean } = useGetTrackByIdQuery({ Id: params.trackId });
    
    const formatTime = (seconds:number) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
    
      const formattedMinutes = String(minutes).padStart(2, "0");
      const formattedSeconds = String(remainingSeconds).padStart(2, "0");
    
      return `${formattedMinutes}:${formattedSeconds}`;
    };

    const dispath = useDispatch();

    return(
      <div>
        <div className="grid grid-cols-10 mt-2">

        <div className=" col-span-4">
        <div className="bg-middleGrayColor rounded-lg self-center gap-3 grid-cols-12 text-white  select-none mr-1 px-4 pt-4 pb-2 sticky top-3">
          <div className="flex w-full">
            <img className="h-16 w-16 rounded-lg" src={img} />
            <div className="flex w-full px-2">
              <div className="flex flex-col ">
                <div className="flex h-full">
                  <p className="text-lg">Britni spiers</p>
                </div>
                
                <div className="flex h-full">
                  <p className="self-end text-[15px] text-almostWhiteColor">362k Followers</p>
                </div>
                
              </div>
              
            </div>
            <div className="w-full flex flex-row-reverse">
              <div className="flex flex-col ">
                <div className="flex h-full flex-row-reverse">
                  <img className="h-5" src={dots} />
                </div>
                
                <div className="flex h-full">
                  <button onClick={()=>{setIsFollow(!isFollow)}} className={classNames(
                    "rounded-lg transition-all duration-125",
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

          </div>
          <div className="flex w-full mt-4">
            
            <div>
              <div className=" h-28 w-28 rounded-lg flex bg-center bg-cover mr-2" style={{ backgroundImage:`url(${data?.image})`}} />
            </div>
            
            <div className="flex w-full">
              <div className="bg-whiteGrayColor w-full justify-center rounded-lg flex self-center h-full">
                <div className=" self-center relative w-full">
                  <div className="flex flex-col m-auto self-center mt-2">
                    <p className=" text-[13px] self-center">{data?.title}</p>
                    <div className="flex justify-center mt-2">
                      <img src={SkipRight} className="transition-all self-center active:scale-105 rotate-180 px-1 h-7" />
                      <img onClick={()=>handlePlayPressed()} src={!isPlayPressed ? Play : Stop} className="transition-all self-center active:scale-105 px-2 h-12" />
                      <img src={SkipRight} className="transition-all self-center active:scale-105 px-1 h-7" />
                    </div>
                  </div>
                  
                </div>
              </div>

              <div className="w-10 bg-whiteGrayColor ml-2 rounded-lg grid grid-rows-3 ">
                <div className="flex justify-center self-center hover:scale-125">
                  <img className="h-4" src={DotsMenu} />
                </div>
                <div className="flex justify-center self-center hover:scale-125">
                  <img className="h-4" src={Comment} />
                </div>
                <div className="flex justify-center self-center hover:scale-125 active:scale-150 transition-all">
                  <img className="h-4" onClick={()=>setLikePressed(!isLikePressed)} src={isLikePressed ? LikeOrange : Like} />
                </div>
              </div>
            </div>


          </div>

          <div className=" relative mt-4">
            <div className="flex justify-between text-white text-[12px] w-full px-2 absolute mt-[-12px]">
              <div className="">{track?.currentTrack?.id == data?.id ? formatTime(Math.trunc(track?.currentTime)) : "00:00"}</div>
              <div className="">{track?.currentTrack?.id == data?.id ? formatTime(Math.trunc(track?.duration)) : "00:00"}</div>
            </div>
            <div className=" w-full mt-1">
                <Slider percentage={track?.currentTrack?.id == data?.id ? track.percentage : "0"} onChange={onChangeLocal} />
            </div>
          </div>

        </div>
        </div>

        <div className="bg-middleGrayColor rounded-lg text-white text-[15px] select-none col-span-6 ml-2 px-4 pt-4 pb-4">
          
          <div className="flex">
            <span>13 Comments</span>
            <img className="h-4 ml-2 self-center" src={Comment} />
          </div>

          <div className="grid grid-cols-12 w-full mt-2">
            <img className="h-12 w-12 rounded-full" src={img} />
            <div className="flex w-full px-2 col-span-11">
                <input className=" outline-0 bg-almostBlackColor rounded-sm px-4 w-full text-sm" placeholder="Write comment..." />
            </div>
          </div>

          <div className="grid grid-cols-12 w-full mt-2">
            <div className="col-start-2 col-span-11 px-2 w-full" >
              <div className=" bg-almostWhiteColor/60 h-[2px] rounded-full"/>
            </div>
          </div>

          <div className="grid grid-cols-12 w-full mt-4">
            <div className="flex justify-center col-start-2">
              <img className="h-12 w-12 rounded-full" src={img} />
            </div>
            <div className="w-full px-2 col-span-10">
              <div className="flex justify-between w-full">
                  <span className=" text-almostWhiteColor hover:text-white">Uishjro</span>
                  <span className="text-sm text-almostWhiteColor">3 days ago</span>
              </div>
              <div className="mt-2 text-sm">OMGG I LIKE THIS TRAK SO MUCH, i hear it literally every day....</div>

            </div>
          </div>

          <div className="grid grid-cols-12 w-full mt-7">
            <div className="flex justify-center col-start-2">
              <img className="h-12 w-12 rounded-full" src={img} />
            </div>
            <div className="w-full px-2 col-span-10">
              <div className="flex justify-between w-full">
                  <span className=" text-almostWhiteColor hover:text-white">Uishjro</span>
                  <span className="text-sm text-almostWhiteColor">3 days ago</span>
              </div>
              <div className="mt-2 text-sm">no way, it sound like shit. What kind of ppl u should be to like it? Disgusting
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</div>

            </div>
          </div>
          <div className="grid grid-cols-12 w-full mt-7">
            <div className="flex justify-center col-start-2">
              <img className="h-12 w-12 rounded-full" src={img} />
            </div>
            <div className="w-full px-2 col-span-10">
              <div className="flex justify-between w-full">
                  <span className=" text-almostWhiteColor hover:text-white">Uishjro</span>
                  <span className="text-sm text-almostWhiteColor">3 days ago</span>
              </div>
              <div className="mt-2 text-sm">no way, it sound like shit. What kind of ppl u should be to like it? Disgusting
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</div>

            </div>
          </div><div className="grid grid-cols-12 w-full mt-7">
            <div className="flex justify-center col-start-2">
              <img className="h-12 w-12 rounded-full" src={img} />
            </div>
            <div className="w-full px-2 col-span-10">
              <div className="flex justify-between w-full">
                  <span className=" text-almostWhiteColor hover:text-white">Uishjro</span>
                  <span className="text-sm text-almostWhiteColor">3 days ago</span>
              </div>
              <div className="mt-2 text-sm">no way, it sound like shit. What kind of ppl u should be to like it? Disgusting
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</div>

            </div>
          </div><div className="grid grid-cols-12 w-full mt-7">
            <div className="flex justify-center col-start-2">
              <img className="h-12 w-12 rounded-full" src={img} />
            </div>
            <div className="w-full px-2 col-span-10">
              <div className="flex justify-between w-full">
                  <span className=" text-almostWhiteColor hover:text-white">Uishjro</span>
                  <span className="text-sm text-almostWhiteColor">3 days ago</span>
              </div>
              <div className="mt-2 text-sm">no way, it sound like shit. What kind of ppl u should be to like it? Disgusting
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</div>

            </div>
          </div><div className="grid grid-cols-12 w-full mt-7">
            <div className="flex justify-center col-start-2">
              <img className="h-12 w-12 rounded-full" src={img} />
            </div>
            <div className="w-full px-2 col-span-10">
              <div className="flex justify-between w-full">
                  <span className=" text-almostWhiteColor hover:text-white">Uishjro</span>
                  <span className="text-sm text-almostWhiteColor">3 days ago</span>
              </div>
              <div className="mt-2 text-sm">no way, it sound like shit. What kind of ppl u should be to like it? Disgusting
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</div>

            </div>
          </div><div className="grid grid-cols-12 w-full mt-7">
            <div className="flex justify-center col-start-2">
              <img className="h-12 w-12 rounded-full" src={img} />
            </div>
            <div className="w-full px-2 col-span-10">
              <div className="flex justify-between w-full">
                  <span className=" text-almostWhiteColor hover:text-white">Uishjro</span>
                  <span className="text-sm text-almostWhiteColor">3 days ago</span>
              </div>
              <div className="mt-2 text-sm">no way, it sound like shit. What kind of ppl u should be to like it? Disgusting
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</div>

            </div>
          </div><div className="grid grid-cols-12 w-full mt-7">
            <div className="flex justify-center col-start-2">
              <img className="h-12 w-12 rounded-full" src={img} />
            </div>
            <div className="w-full px-2 col-span-10">
              <div className="flex justify-between w-full">
                  <span className=" text-almostWhiteColor hover:text-white">Uishjro</span>
                  <span className="text-sm text-almostWhiteColor">3 days ago</span>
              </div>
              <div className="mt-2 text-sm">no way, it sound like shit. What kind of ppl u should be to like it? Disgusting
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</div>

            </div>
          </div>
          

        </div>
      </div>

    </div>
    )
}

export default ViewTrack;