import { useEffect, useRef, useState } from "react";
import song from '../../songs/videoplayback (44) (online-audio-converter.com).mp3';
import song_2 from '../../songs/videoplayback (46) (online-audio-converter.com).mp3';
import song_3 from '../../songs/videoplayback (48) (online-audio-converter.com).mp3';


import Slider from "./Slider/Slider";

import "./Player.css"
import { Outlet, useNavigate } from "react-router-dom";
import { useGetTracksQuery } from "../../features/user/apiPlayerSlice";
import classNames from "classnames";

import circle from "../../images/black-circle.png";

import { useAppSelector } from "../../app/hooks";
import { changeTrack, setCurrentTime, setDurationTime, setIsPlay, setPercentageTime } from "../../features/user/musicStateSlice";
import { useDispatch } from "react-redux";
import MiniPlayer from "./MiniPlayer";
import SelectSongsForAlbumModal from "./Album/SelectSongsForAlbumModal";
import { UserVM } from "../types";



export interface Track{
  song:any,
  title:string,
  progress:any,
  length:any,
  image:string,
  background:string,
  likes:number,
  id:number,
  dateCreated:string,
}

export interface TrackFromServer{
  song:any,
  title:string,
  image:string,
  background:string,
  likes:string,
  userId:number,
  username:string,
  id:number,
  dateCreated:string,
  subscribers:UserVM[],
  comments:number,
  wasLikedByUsers:any,
  trackHistoryDateCreated:string,
  views:number,
  genres:GenreVM[]
}

export interface GenreVM{
  title:string,
  description:string,
}


const Player=()=>{
  const [songsdata, setSongs] = useState<Track[]>([{song:song,title:"1",progress:0,length:0,image:"",background:"",id:0,likes:0,dateCreated:""},{song:song_2,title:"2",progress:0,length:0,image:"",background:"",id:0,likes:0,dateCreated:""},{song:song_3,title:"3",progress:0,length:0,image:"",background:"",id:0,likes:0,dateCreated:""}]);
  const auth = useAppSelector((state)=>state.user.isAuth);

  const track = useAppSelector((state)=>state.track.currentTrack);
  const user = useAppSelector((state)=>state.user.user);
  const isMenuOpen = useAppSelector((state)=>state.track.isMenuOpen);
  const onChangeSlider = useAppSelector((state)=>state.track.onChangeSlider);
  const isPlay = useAppSelector((state)=>state.track.isPlay);
  const tracksQuery = useAppSelector((state)=>state.track.tracksQuery);
  const trackForAudioAtribute = useAppSelector((state)=>state.track);


  const [isPlaying, setIsPlaying] = useState(false);


  const audioRef:any = useRef<HTMLAudioElement>(null);
  const clickRef:any = useRef();
  const [percentage, setPercentage] = useState(0);

  const [whatIsOpen,setWhatIsOpen]=useState("home");

  const {data:tracks,isSuccess:isSuccessTracks}:{data:TrackFromServer[],isSuccess:boolean} = useGetTracksQuery();

  const [isRewinding, setIsRewinding] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

 

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth" // Чтобы страница плавно перемещалась к верху
    });
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    scrollToTop();
  };

  const getCurrDuration = (e:any) => {
    const percent = ((e?.currentTarget?.currentTime / e?.currentTarget?.duration) * 100).toFixed(2)

    setPercentage(+percent);

    dispatch(setPercentageTime(percent));

    const audio = audioRef?.current;
    dispatch(setDurationTime(e?.currentTarget?.duration));

    // audio.currentTime = time.toFixed(2);
  }

  const onChange = () => {
    const audio = audioRef?.current;

    if(onChangeSlider != "" && audio?.duration != undefined && audio?.currentTime)
      audio.currentTime = (audio?.duration / 100) * Number(onChangeSlider);

  }

  useEffect(() => {
    
    dispatch(setCurrentTime(audioRef?.current?.currentTime));
    
  }, [audioRef?.current?.currentTime,onChangeSlider])


  useEffect(()=>{
    if (isPlay) {
      audioRef.current.play();
    }
    else {
      audioRef.current.pause();
    }
  },[isPlay,track?.song])


  useEffect(()=>{
    onChange();
  },[onChangeSlider])

  useEffect(() => {
    const handleKeyDown = (event:any) => {
      if (event.key === "ArrowRight") {
        skipForward();
        if(!isPlaying){audioRef.current.play();}
        
      }
      else if (event.key === "ArrowLeft") {
        skipBackward();
        if(!isPlaying){audioRef.current.play();}
      }
      
    };

    document.addEventListener("keydown", handleKeyDown);
    
    const skipForward = () => {
      // Код для перемотки песни вперед на 5 секунд
      setPercentage(percentage+5);
      audioRef.current.currentTime += 5;
    };
  
    const skipBackward = () => {
      // Код для перемотки песни назад на 5 секунд
      setPercentage(percentage-5);
      audioRef.current.currentTime -= 5;
    };
    



    

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isRewinding,track?.song,onChangeSlider]);



  
//   const skipBack = ()=>
//   {
//     const index = songsdata.findIndex((x:any)=>x.title == currentSong.title);
//     if (index == 0)
//     {
//       setCurrentSong(songsdata[songsdata.length - 1])
//     }
//     else
//     {
//       setCurrentSong(songsdata[index - 1])
//     }
//     audioRef.current.currentTime = 0;
// }


  // const skiptoNext = ()=>
  // {
  //   const index = songsdata.findIndex((x:any)=>x.title == currentSong.title);
  //   if (index == songsdata.length-1)
  //   {
  //     setCurrentSong(songsdata[0])
  //   }
  //   else
  //   {
  //     setCurrentSong(songsdata[index + 1])
  //   }
  //   audioRef.current.currentTime = 0;
  // }

  // const checkWidth = (e:any)=>
  // {
  //   let width = clickRef.current.clientWidth;
  //   const offset = e.nativeEvent.offsetX;

  //   const divprogress = offset / width * 100;

  //   audioRef.current.currentTime = divprogress / 100 * currentSong.length;
  // }





  const getNormalTime = (dateCreated:any)=>{
    const dateTime = new Date(dateCreated);
    return dateTime.toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }

  const handleSetAnotherSong = async (track:TrackFromServer)=>{
    // var obj = URL.createObjectURL(track.song);
    var newTrack:Track = {song:track.song,title:track.title,progress:0,length:0,image:track.image,background:track.background,id:track.id,likes:Number(track.likes),dateCreated:track.dateCreated};
    // setCurrentSong(newTrack);
    setIsPlaying(true);
    scrollToTop();
  }

  var dispath = useDispatch();

  console.log(trackForAudioAtribute);

  const handleSongEnd = async ()=>{
    // var Index = tracks.findIndex(track=>Number(track.id)==currentSong.id);
    dispatch(setCurrentTime(0));
    audioRef.current.currentTime = 0;

    if(tracksQuery?.length! > 0 && tracksQuery != null)
    {
      console.log("tracksQuery");
      var currentSongIndexInTracksQuery = tracksQuery.findIndex(qur=>qur.id == track?.id);
      console.log("currentSongIndexInTracksQuery:");
      console.log(currentSongIndexInTracksQuery);
      console.log(tracksQuery);
      
      if(tracksQuery[currentSongIndexInTracksQuery+1])
      {
        console.log("AFTER TRACK IS POSIBLE TO GO TO NEXT TRACK");
        dispath(changeTrack(tracksQuery[currentSongIndexInTracksQuery+1]!));
      }
      else
      {
        dispath(changeTrack(tracksQuery[0]!));
        console.log("it was LAST track in the query");
      }
    }
    else
    {
      dispatch(setIsPlay(true));
      audioRef.current.play();
    }
    
    // if(tracks[Index]==null || tracks[Index] == undefined)
    // {
    //   var newTrack:Track = {song:tracks[0].song,title:tracks[0].title,progress:0,length:0,image:tracks[0].image,background:tracks[0].background,id:tracks[0].id,likes:Number(tracks[0].likes),dateCreated:tracks[0].dateCreated};
    //   setCurrentSong(newTrack);
    // }
    // else
    // {
    //   var newTrack:Track = {song:tracks[Index+1].song,title:tracks[Index+1].title,progress:0,length:0,image:tracks[Index+1].image,background:tracks[Index+1].background,id:tracks[Index+1].id,likes:Number(tracks[1].likes),dateCreated:tracks[1].dateCreated};
    //   setCurrentSong(newTrack);
    // }
    // // setCurrentSong((prevIndex) => (prevIndex + 1) % songs.length);
    
  }

  const changeTab=(name:string)=>{
    setWhatIsOpen(name);
    navigate(name);
  }

  const playerClass = classNames('h-44 w-44 bg-gray-700 rounded-xl shadow-2xl bg-cover transition-all duration-200 bg-gray-200', 
  {
    '': isPlaying, // Класс 'scale-130' будет добавлен, если isPlaying === true
  });

    return<>
    <audio onEnded={handleSongEnd} src={track?.song} ref={audioRef} onTimeUpdateCapture={getCurrDuration}/>
    <div className=" w-5/6 mx-auto p-2 px-4 grid grid-cols-10 gap-4 ">
      <div className={classNames(
          'col-span-8 '
        )}>
        <div className="bg-middleGrayColor my-4 rounded-lg h-12 self-center gap-3 grid grid-cols-12 text-white text-[15px] px-5 select-none">
          <div onClick={() => changeTab("home")}
            className={
              "cursor-pointer flex p-1 justify-center self-center px-2" +
              (whatIsOpen === "home" ? " text-orangeColor" : "")
            }>
            Home
          </div>


          {auth == true ?
          <>
          <div onClick={()=>changeTab("history")}
          className={
            "cursor-pointer flex p-1 justify-center self-center px-2 col-start-9" +
            (whatIsOpen === "history" ? " text-orangeColor" : "")
          }>History</div>


          <div onClick={()=>changeTab("playlists")} className={
              "cursor-pointer flex p-1 justify-center self-center px-2 col-start-10" +
              (whatIsOpen === "playlists" ? " text-orangeColor" : "")
            }>Playlists</div>

          <div onClick={()=>changeTab("likes")}
            className={
              "cursor-pointer flex p-1 justify-center self-center px-2 col-start-11" +
              (whatIsOpen === "likes" ? " text-orangeColor" : "")
            }>Likes</div>

          
          <div onClick={()=>changeTab("mytracks")}
            className={
              "cursor-pointer flex p-1 justify-center self-center px-2 col-start-12" +
              (whatIsOpen === "mytracks" ? " text-orangeColor" : "")
            }>My Tracks</div>
          </>
          :""
          }
        </div>

        

        <Outlet/>

      </div>




      <div className=" col-span-2  my-4">
        
        <div className={classNames(" transition-all duration-300 ",{" -translate-y-[365px]":isMenuOpen})}>
          <div className={classNames(" bg-middleGrayColor hover:bg-whiteGrayColor p-2 rounded-lg h-20 flex transition-all select-none z-10")}>
            <img className=" h-16" src={circle} />
            <div className="w-full grid flex-col h-full">
              <div className="flex w-full justify-between text-white px-4">
                <span>Uishjro</span>
                <span className=" text-sm">Subscribers 89k</span>
              </div>

              <div className="flex w-full self-end justify-between text-almostWhiteColor px-4">
                <span className=" text-sm">+ Ultimate</span>
              </div>
            </div>
          </div>

          <div className={classNames("bg-middleGrayColor p-2 rounded-lg mt-4 text-almostWhiteColor select-none transition-all")}>
            <div onClick={()=>navigate("profile/main/"+user?.id)} className="p-3 flex pl-5 hover:scale-105 transition-all cursor-pointer active:bg-slate-50/50 active:transition-none rounded-lg m-2">
              <span>Account</span>
            </div>
            <div onClick={()=>navigate("profile/settings")} className="p-3 flex pl-5 hover:scale-105 transition-all cursor-pointer active:bg-slate-50/50 active:transition-none rounded-lg m-2">
              <span>Settings</span>
            </div>
            <div className="p-3 flex pl-5 hover:scale-105 transition-all cursor-pointer active:bg-slate-50/50 active:transition-none rounded-lg m-2">
              <span>Buy Ultimate+</span>
            </div>
            <div className="p-3 flex pl-5 hover:scale-105 transition-all cursor-pointer active:bg-slate-50/50 active:transition-none rounded-lg m-2">
              <span>Log out</span>
            </div>
          </div>
        
        <p className="text-white mt-4 mb-2">Recommended Artist ▼</p>
        <div className="flex">
          <div className="bg-whiteGrayColor h-20 w-20 rounded-lg mr-5" />
          <div className="bg-whiteGrayColor h-20 w-20 rounded-lg mr-5" />
          <div className="bg-whiteGrayColor h-20 w-20 rounded-lg mr-5" />
        </div>
        </div>

      </div>

    </div>
      {/* <div className="px-20" >
      <div className="flex content-center justify-center px-52 flex-col m-auto self-center w-full" >
        
        <div className="w-full self-center justify-center content-center p-7 bg-slate-500 " style={{backgroundImage:`url(${currentSong.background})`,backgroundPosition:"center"}}>
            <div className="flex w-full">
              <div className={playerClass} style={{backgroundImage:`url(${currentSong.image})`,backgroundPosition:"center"}} />
              
              <div className=" rounded-xl p-4 text-white">
                <div className=" text-[18px]  font-medium ">
                    {currentSong.title}
                </div>
                <div className=" font-light  text-[13px] ">
                </div>
              </div>
            </div>
        </div>

        <div className="flex justify-center self-end h-full w-full m-auto relative">

          <div className="flex justify-between text-white text-[12px] w-full px-10 bottom-0 mb-8 absolute">
            <div className="left-0 h-2 z-10 ">{formatTime(Math.trunc(audioRef.current?.currentTime))}</div>
            <div className="rifht-0 h-2 z-10 ">{formatTime(Math.trunc(audioRef?.current?.duration))}</div>
          </div>
          

          <div className="flex flex-col justify-end self-end w-[80%] z-50">
            
            <div className=" flex self-center mt-2 ">
                
                <div onClick={skipBack} className="cursor-pointer h-[52px] w-[52px] rounded-[50px] hover:bg-slate-400/[.82]  shadow-indigo-600/[.50] self-center  flex justify-center">
                    <img className="h-4 w-4 self-center" src={arrowLeft} />
                </div>

                <div onClick={handlePlayPause} className="cursor-pointer h-[60px] w-[60px] rounded-[60px] hover:bg-slate-500/[.82] shadow-indigo-600/[.50] mx-10 self-center flex justify-center">
                    <img className="h-7 w-7 self-center" src={!isPlaying ? play : pause} />
                </div>

                <div onClick={skiptoNext} className="cursor-pointer h-[52px] w-[52px] rounded-[50px] hover:bg-slate-500/[.82] shadow-indigo-600/[.50] self-center  flex justify-center">
                    <img className="h-4 w-4 self-center" src={arrowRight} />
                </div>
                
            </div>

            

          </div>
          
        </div>
            <div className="px-3 m-0 my-0 py-0 bottom-0 rounded-full w-full h-[20px] transition-all mt-[-6px]">
              
              <Slider percentage={percentage} onChange={onChange} />
            </div>
            
        
      </div>
      </div>


      <div className=" m-auto w-full px-72 pb-20 mt-2">
        <p className=" font-bold text-white text-xl pb-10">You can like it</p>
        <div className=" text-white grid-cols-6 gap-2 gap-y-16 grid">

          {isSuccessTracks ? tracks?.map((track: TrackFromServer, id: number) => (
            
            <div key={id} onClick={()=>handleSetAnotherSong(track)} className="w-[200px]  active:transition-shadow select-none m-auto bg-slate-300/10 hover:bg-slate-300/20 rounded-xl py-3">
                <div className=' w-[180px] h-[180px] flex justify-center content-end self-end bg-cover rounded-xl hover:pb-0 transition-all m-auto' style={{backgroundImage:"url("+track.image+")",backgroundPosition:"center"}}>

                </div>
                <div className=' px-2 self-end w-48 overflow-hidden h-[20px] mt-4'>
                  <p className=' font-medium text-sm cursor-pointer '>
                  {track.title}
                  </p>
                </div>
                <div className=' px-2 self-end w-48 overflow-hidden h-[20px]'>
                  <p className='text-[12px] cursor-pointer text-gray-400 '>
                  {getNormalTime(track.dateCreated)}
                  </p>
                </div>
                
            </div>

              )) : ""}
        </div>

      </div> */}

      
    </>
}

export default Player;