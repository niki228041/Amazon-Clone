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

interface Track{
  song:any,
  title:string,
  progress:any,
  length:any
}

const Player=()=>{
  const [songsdata, setSongs] = useState<Track[]>([{song:song,title:"1",progress:0,length:0},{song:song_2,title:"2",progress:0,length:0},{song:song_3,title:"3",progress:0,length:0}]);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState<any>(songsdata[1]);
  const audioRef:any = useRef<HTMLAudioElement>(null);
  const clickRef:any = useRef();
  const [percentage, setPercentage] = useState(0)

  const [isRewinding, setIsRewinding] = useState(false);

  const onChange = (e:any) => {

    const audio = audioRef.current
    audio.currentTime = (audio.duration / 100) * e.target.value
    // setPercentage(e.target.value)
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
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
    let rewindTimeout:any;
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

  
  

    return<>
      <div className="bg-cover h-[80vh] w-full"  style={{backgroundImage:`url(${img})`,backgroundPosition:"center"}}>
      <audio src={currentSong.song} ref={audioRef} onTimeUpdate={onPlaying} onTimeUpdateCapture={getCurrDuration}/>
      <div className="flex content-center justify-center px-40 flex-col m-auto self-center w-full" >
        <div className="w-full flex self-center justify-center m-auto content-center p-10">

            <div className="flex justify-center h-[500px] w-[500px] hover:w-full self-auto hover:h-[500px] bg-gray-700 rounded-xl shadow-2xl bg-cover transition-all duration-200 m-auto" style={{backgroundImage:`url(${img})`,backgroundPosition:"center"}} >
                <div className="flex flex-col justify-end self-end w-[80%]">

                  <div className=" flex self-center mt-2">
                      <div onClick={skipBack} className=" h-[35px] w-[35px] rounded-[50px] hover:bg-slate-400/[.82]  shadow-indigo-600/[.50] self-center  flex justify-center">
                          <img className="h-4 w-4 self-center" src={arrowLeft} />
                      </div>

                      <div onClick={handlePlayPause} className="cursor-pointer h-[60px] w-[60px] rounded-[50px] hover:bg-slate-500/[.82] shadow-indigo-600/[.50] mx-10 self-center flex justify-center">
                          <img className="h-7 w-7 self-center" src={!isPlaying ? play : pause} />
                          {/* {!isPlaying ? <IconPlay/> : pause} */}
                      </div>

                      <div onClick={skiptoNext} className=" h-[35px] w-[35px] rounded-[50px] hover:bg-slate-500/[.82] shadow-indigo-600/[.50] self-center  flex justify-center">
                          <img className="h-4 w-4 self-center" src={arrowRight} />
                      </div>
                  </div>

                  <div className="flex justify-between text-white text-[12px] h-2 relative mt-[-55px] mb-5">
                    <div>{formatTime(Math.trunc(audioRef.current?.currentTime))}</div>
                    <div>{formatTime(Math.trunc(audioRef?.current?.duration))}</div>
                  </div>
                  <div className="mb-8"></div>
                  
                  
                </div>
                
            </div>

            
        </div>
        
      </div>
      <div className="px-3 m-0 my-0 py-0 bottom-0 fixed w-full h-[20px]  bg-slate-800 transition-all">
          <Slider percentage={percentage} onChange={onChange} />
            {/* <div className=" flex self-center justify-center">
              <div onClick={skipBack} className=" h-[35px] w-[35px] rounded-[50px] hover:bg-slate-400/[.82]  shadow-indigo-600/[.50] self-center  flex justify-center">
                  <img className="h-4 w-4 self-center" src={arrowLeft} />
              </div>

              <div onClick={handlePlayPause} className="cursor-pointer h-[60px] w-[60px] rounded-[50px] hover:bg-slate-500/[.82] shadow-indigo-600/[.50] mx-10 self-center flex justify-center">
                  <img className="h-7 w-7 self-center" src={!isPlaying ? play : pause} />
                  
              </div>

              <div onClick={skiptoNext} className=" h-[35px] w-[35px] rounded-[50px] hover:bg-slate-500/[.82] shadow-indigo-600/[.50] self-center  flex justify-center">
                  <img className="h-4 w-4 self-center" src={arrowRight} />
              </div>
            </div> */}
        </div>
      </div>
    </>
}

export default Player;