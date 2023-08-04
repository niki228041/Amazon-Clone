import { useEffect, useRef, useState } from "react";
import song from '../../songs/videoplayback (44) (online-audio-converter.com).mp3';
import song_2 from '../../songs/videoplayback (46) (online-audio-converter.com).mp3';
import song_3 from '../../songs/videoplayback (48) (online-audio-converter.com).mp3';


import background from '../../images/KrismasKlub.jpg';
import img from '../../images/ronpa.png';
import pause from '../../images/pause.png';
import play from '../../images/play.png';

import arrowLeft from '../../images/arrowLeft.png';
import arrowRight from '../../images/arrowRight.png';

import IconPlay from "../../icons/Play";
import blackCircle from "../../images/black-circle.png";
import Slider from "./Slider/Slider";

import "./Player.css"
import { useNavigate } from "react-router-dom";
import { useGetTracksQuery } from "../../features/user/apiPlayerSlice";
import classNames from "classnames";

interface Track{
  song:any,
  title:string,
  progress:any,
  length:any,
  image:string,
  background:string,
  id:number
}

interface TrackFromServer{
  song:any,
  title:string,
  image:string,
  background:string,
  likes:string,
  id:number,
  dateCreated:string,
}


const Player=()=>{
  const [songsdata, setSongs] = useState<Track[]>([{song:song,title:"1",progress:0,length:0,image:"",background:"",id:0},{song:song_2,title:"2",progress:0,length:0,image:"",background:"",id:0},{song:song_3,title:"3",progress:0,length:0,image:"",background:"",id:0}]);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState<Track>(songsdata[1]);
  const audioRef:any = useRef<HTMLAudioElement>(null);
  const clickRef:any = useRef();
  const [percentage, setPercentage] = useState(0);

  const {data:tracks,isSuccess:isSuccessTracks}:{data:TrackFromServer[],isSuccess:boolean} = useGetTracksQuery();

  const [isRewinding, setIsRewinding] = useState(false);

  const navigate = useNavigate();

  const onChange = (e:any) => {

    const audio = audioRef.current
    audio.currentTime = (audio.duration / 100) * e.target.value
    // setPercentage(e.target.value)
  }

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
    const percent = ((e.currentTarget.currentTime / e.currentTarget.duration) * 100).toFixed(2)
    const time = e.currentTarget.currentTime

    setPercentage(+percent)
    const audio = audioRef.current
    // audio.currentTime = time.toFixed(2);
  }

  useEffect(() => {
    if (isPlaying) {
      onPlaying();
      audioRef.current.play();
    }
    else {
      onPlaying();
      audioRef.current.pause();
    }


  }, [isPlaying,currentSong.song])
    
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
    

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isRewinding]);

  
  const skipBack = ()=>
  {
    const index = songsdata.findIndex((x:any)=>x.title == currentSong.title);
    if (index == 0)
    {
      setCurrentSong(songsdata[songsdata.length - 1])
    }
    else
    {
      setCurrentSong(songsdata[index - 1])
    }
    audioRef.current.currentTime = 0;
    console.log(audioRef.current);
}


  const skiptoNext = ()=>
  {
    const index = songsdata.findIndex((x:any)=>x.title == currentSong.title);
    console.log(index);
    if (index == songsdata.length-1)
    {
      setCurrentSong(songsdata[0])
    }
    else
    {
      setCurrentSong(songsdata[index + 1])
    }
    audioRef.current.currentTime = 0;
  }

  const checkWidth = (e:any)=>
  {
    console.log("sdsdf")
    let width = clickRef.current.clientWidth;
    const offset = e.nativeEvent.offsetX;

    const divprogress = offset / width * 100;

    audioRef.current.currentTime = divprogress / 100 * currentSong.length;
  }

  const onPlaying = () => {
    const duration = audioRef.current.duration;
    const ct = audioRef.current.currentTime;

    setCurrentSong({ ...currentSong, "progress": ct / duration * 100, "length": duration })
  }

  const formatTime = (seconds:number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
  
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");
  
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const getNormalTime = (dateCreated:any)=>{
    const dateTime = new Date(dateCreated);
    return dateTime.toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }

  const handleSetAnotherSong = async (track:TrackFromServer)=>{
    // var obj = URL.createObjectURL(track.song);
    console.log(currentSong.song);
    var newTrack:Track = {song:track.song,title:track.title,progress:0,length:0,image:track.image,background:track.background,id:track.id};
    setCurrentSong(newTrack);
    setIsPlaying(true);
    scrollToTop();
    console.log(newTrack);
  }

  const handleSongEnd = ()=>{
    var Index = tracks.findIndex(track=>Number(track.id)==currentSong.id);
    
    
    
    if(tracks[Index]==null || tracks[Index] == undefined)
    {
      console.log(tracks[0]);
      var newTrack:Track = {song:tracks[0].song,title:tracks[0].title,progress:0,length:0,image:tracks[0].image,background:tracks[0].background,id:tracks[0].id};
      setCurrentSong(newTrack);
    }
    else
    {
      var newTrack:Track = {song:tracks[Index+1].song,title:tracks[Index+1].title,progress:0,length:0,image:tracks[Index+1].image,background:tracks[Index+1].background,id:tracks[Index+1].id};
      console.log(Index);
      console.log(tracks);
      setCurrentSong(newTrack);
    }
    // setCurrentSong((prevIndex) => (prevIndex + 1) % songs.length);
    
  }

  const playerClass = classNames('h-44 w-44 bg-gray-700 rounded-xl shadow-2xl bg-cover transition-all duration-200 bg-gray-200', 
  {
    '': isPlaying, // Класс 'scale-130' будет добавлен, если isPlaying === true
  });

    return<>
    <audio onEnded={handleSongEnd} src={currentSong.song} ref={audioRef} onTimeUpdate={onPlaying} onTimeUpdateCapture={getCurrDuration}/>
      <div className="px-20" >
      <div className="flex content-center justify-center px-52 flex-col m-auto self-center w-full" >
        
        <div className="w-full self-center justify-center content-center p-7 bg-slate-500 " style={{backgroundImage:`url(${currentSong.background})`,backgroundPosition:"center"}}>
            <div className="flex w-full">
              <div className={playerClass} style={{backgroundImage:`url(${currentSong.image})`,backgroundPosition:"center"}} />
              
              <div className=" rounded-xl p-4 text-white">
                <div className=" text-[18px]  font-medium ">
                    {currentSong.title}
                </div>
                <div className=" font-light  text-[13px] ">
                  {/* ddfsopffffffffffsd */}
                </div>
              </div>
            </div>
        </div>

            {/* play pause etc */}
        <div className="flex justify-center self-end h-full w-full m-auto relative">

          {/* song time */}
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
                    {/* {!isPlaying ? <IconPlay/> : pause} */}
                </div>

                <div onClick={skiptoNext} className="cursor-pointer h-[52px] w-[52px] rounded-[50px] hover:bg-slate-500/[.82] shadow-indigo-600/[.50] self-center  flex justify-center">
                    <img className="h-4 w-4 self-center" src={arrowRight} />
                </div>
                
            </div>

            
            {/* fixed w-full  */}
            

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

      </div>

      
    </>
}

export default Player;