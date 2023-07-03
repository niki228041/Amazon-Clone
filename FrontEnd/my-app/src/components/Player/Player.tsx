import { useEffect, useRef, useState } from "react";
import song from '../../songs/videoplayback (44) (online-audio-converter.com).mp3';
import song_2 from '../../songs/videoplayback (46) (online-audio-converter.com).mp3';
import song_3 from '../../songs/videoplayback (48) (online-audio-converter.com).mp3';


import background from '../../images/KrismasKlub.jpg';
import pause from '../../images/pause.png';
import play from '../../images/play.png';

import arrowLeft from '../../images/arrowLeft.png';
import arrowRight from '../../images/arrowRight.png';

import IconPlay from "../../icons/Play";
import blackCircle from "../../images/black-circle.png";
import Slider from "./Slider/Slider";

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
    console.log("lol");
  }, [isPlaying,currentSong.song])
    
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

    return<>
      
      <audio src={currentSong.song} ref={audioRef} onTimeUpdate={onPlaying} onTimeUpdateCapture={getCurrDuration}/>
      <div className="flex content-center justify-center px-40 mt-10" >
        <div className=" bg-gray-200 w-full flex justify-center">
            <div className="flex justify-center h-[500px] w-[500px] bg-gray-700 border border-1 bg-cover" style={{backgroundImage:`url(${background})`}} >
                
                <div className="flex flex-col justify-end bg-black self-end w-[80%]">

                  <div className=" flex self-center mt-2">
                      <div className=" h-[25px] w-[25px] rounded-[50px] hover:bg-slate-400/[.82]  shadow-indigo-600/[.50] self-center  flex justify-center">
                          <img className="h-4 w-4 self-center" src={arrowLeft} onClick={skipBack} />
                      </div>

                      <div className=" h-[50px] w-[50px] rounded-[50px] hover:bg-slate-500/[.82] shadow-indigo-600/[.50] mx-10 self-center flex justify-center">
                          <img className="h-7 w-7 self-center" src={!isPlaying ? play : pause} onClick={handlePlayPause} />
                          {/* {!isPlaying ? <IconPlay/> : pause} */}
                      </div>

                      <div className=" h-[25px] w-[25px] rounded-[50px] hover:bg-slate-500/[.82] shadow-indigo-600/[.50] self-center  flex justify-center">
                          <img className="h-4 w-4 self-center" src={arrowRight} onClick={skiptoNext} />
                      </div>
                  </div>

                  <div className="flex justify-between text-white text-[12px] h-2 relative mt-[-15px]">
                    {/* <div>{Math.trunc(currentSong.length/60)}</div> */}
                    {/* <div>{audioRef?.current?.duration}</div> */}
                  </div>

                  <div className="px-1">
                    <Slider percentage={percentage} onChange={onChange} />
                  </div>

                </div>
            </div>
            
        </div>
      </div>
    </>
}

export default Player;