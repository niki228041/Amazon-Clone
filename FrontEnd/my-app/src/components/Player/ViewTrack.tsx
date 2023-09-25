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
import { apiPlayerSlice, useGetTrackByIdQuery, useGetTrackCommentsByTrackIdQuery } from "../../features/user/apiPlayerSlice";
import { TrackFromServer } from "./Player";
import { User, UserVM } from "../types";
import { formatDistanceToNow, parseISO } from 'date-fns';


export interface TrackComment{
  message:string,
  dateCreated:string,
  user:UserVM
}

export interface AddTrackCommentDTO{
  message:string,
  userId:number,
  trackId:number
}

export interface FollowDTO{
  userId:string,
  subscriberId:string
}

const ViewTrack=()=>{
    var navigate = useNavigate();
    const [isFollow, setIsFollow] = useState(false);
    const [isLikePressed, setLikePressed] = useState(false);

    const [isPlayPressed, setPlayPressed] = useState(false);
    const [commentText, setCommentText] = useState("");

    const [previewDuration, setPreviewDuration] = useState<number>(0);
    const track = useAppSelector((state)=>state.track);
    const user = useAppSelector((state)=>state.user.user);
    const isPlay = useAppSelector((state)=>state.track.isPlay);

    const [addCommentTrack,{}] = apiPlayerSlice.useAddTrackCommentMutation();
    
    const [subscribe,{}] = apiPlayerSlice.useSubscribeMutation();

    const params = useParams();
    const {data}: { data?: TrackFromServer} = useGetTrackByIdQuery({ Id: params.trackId });
    
    const {data:comments}: { data?: TrackComment[]} = useGetTrackCommentsByTrackIdQuery({ Id: params.trackId });

    function formatDateDifference(dateString:string) {
      const date = parseISO(dateString);
      const now = new Date();

    
      const difference = formatDistanceToNow(date, { addSuffix: true });
    
      return difference;
    }
    
    useEffect(()=>{
      const handleKeyDown = (event:any) => {
        if(event.key === "Enter" && commentText != "" && user.id != undefined) {
          console.log("Im in");
          var request:AddTrackCommentDTO = {message:commentText,userId:Number(user.id),trackId:Number(data?.id)};
          setCommentText("");
          addCommentTrack(request);
        }
        
        
      };
  
      document.addEventListener("keydown", handleKeyDown);

      if(data?.id == track.currentTrack?.id && isPlay == true)
      {
        setPlayPressed(true);
      }

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    },[commentText,user.id,data?.id,track.currentTrack?.id,isPlay])

    useEffect(()=>{
      var isFollow = false;

      if(data?.subscribers)
      {
        for (let index = 0; index < data.subscribers.length; index++) {
          const element = data.subscribers[index];
          if(element.id == parseInt(user.id))
          {
            isFollow = true;

          }
        }
        
      }

      setIsFollow(isFollow);
      console.log("YO");

    },[data?.subscribers])



    const onChangeLocal= (e:any)=>{
      
      
      if(track.currentTrack?.id != data?.id)
      {
        dispath(changeTrack(data!));
      }
      else
      {
        dispath(setOnChangeSlider(e.target.value));
      }
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
      else if(isPlayPressed == true && track.currentTrack?.id != data?.id)
      {
        if(data != undefined)
        {
          setPlayPressed(true);
          dispath(changeTrack(data!));
          dispath(setIsPlay(true))
        }
      }
      else if(isPlayPressed == false && track.currentTrack?.id == data?.id)
      {
        setPlayPressed(true);
        dispath(setIsPlay(true))
      }

      
    }

    const handleFollow=()=>{
      setIsFollow(!isFollow);
      console.log(user.id);
      console.log(data?.userId!);
      var request:FollowDTO = {userId:data?.userId.toString()!,subscriberId:user.id};
      subscribe(request);
    }

    
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
                  <p className="text-lg">{data?.username}</p>
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
                  <button onClick={()=>{handleFollow()}} className={classNames(
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
            <span>{comments?.length} Comments</span>
            <img className="h-4 ml-2 self-center" src={Comment} />
          </div>

          <div className="grid grid-cols-12 w-full mt-2">
            <img className="h-12 w-12 rounded-full" src={img} />
            <div className="flex w-full px-2 col-span-11">
                <input onChange={(e)=>setCommentText(e.target.value)} value={commentText} className=" outline-0 bg-almostBlackColor rounded-sm px-4 w-full text-sm" placeholder="Write comment..." />
            </div>
          </div>

          <div className="grid grid-cols-12 w-full mt-2">
            <div className="col-start-2 col-span-11 px-2 w-full" >
              <div className=" bg-almostWhiteColor/60 h-[2px] rounded-full"/>
            </div>
          </div>
          
          {comments?.map((comment: TrackComment, id: number) => {
          return(
            <div key={id} className="grid grid-cols-12 w-full mt-6">
            <div className="flex justify-center col-start-2">
              <img className="h-12 w-12 rounded-full" src={comment.user.avatar != null ?comment.user.avatar : img} />
            </div>
            <div className="w-full px-2 col-span-10">
              <div className="flex justify-between w-full">
                  <span className=" text-almostWhiteColor hover:text-white">{comment.user.userName != null ? comment.user.userName : "Probably admin"}</span>
                  <span className="text-sm text-almostWhiteColor">{formatDateDifference(comment.dateCreated)}</span>
              </div>
              <div className="mt-2 text-sm">{comment.message}</div>

            </div>
          </div>)
           })}

        </div>
      </div>

    </div>
    )
}

export default ViewTrack;