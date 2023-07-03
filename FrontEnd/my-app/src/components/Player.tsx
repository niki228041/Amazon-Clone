import { useEffect, useRef, useState } from "react";
import song from '../songs/videoplayback (44) (online-audio-converter.com).mp3';
import song_2 from '../songs/videoplayback (46) (online-audio-converter.com).mp3';
import song_3 from '../songs/videoplayback (48) (online-audio-converter.com).mp3';


import background from '../images/KrismasKlub.jpg';
import pause from '../images/pause.png';
import play from '../images/play.png';

import arrowLeft from '../images/arrowLeft.png';
import arrowRight from '../images/arrowRight.png';

import IconPlay from "../icons/Play";

const Player=()=>{
  const [songsdata, setSongs] = useState([{song:song,title:1},{song:song_2,title:2},{song:song_3,title:3}]);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(songsdata[1]);
  const audioRef:any = useRef<HTMLAudioElement>(null);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    }
    else {
      audioRef.current.pause();
    }
    console.log("lol");
  }, [isPlaying,currentSong])
    
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

  const onPlaying = () => {
    const duration = audioRef.current.duration;
    const ct = audioRef.current.currentTime;

    // setCurrentSong({ ...currentSong, "progress": ct / duration * 100, "length": duration })
  }

    return<>
      
      <audio src={currentSong.song} ref={audioRef} onTimeUpdate={onPlaying}/>
      <div className="flex content-center justify-center px-40 mt-10" >
        <div className=" bg-gray-200 w-full flex justify-center">
            <div className="flex justify-center h-[500px] w-[500px] bg-gray-700 border border-1 bg-cover" style={{backgroundImage:`url(${background})`}} >

                <div className=" self-end pb-10 flex">
                    <div className=" h-[60px] w-[60px] rounded-[50px] bg-slate-900/[.82] hover:bg-slate-600/[.82]  shadow-indigo-900/[.50] self-center  flex justify-center">
                        <img className="h-7 w-7 self-center" src={arrowLeft} onClick={skipBack} />
                    </div>

                    <div className=" h-[90px] w-[90px] rounded-[50px] bg-slate-900/[.82] hover:bg-slate-700/[.82] shadow-indigo-900/[.50] mx-10 self-center flex justify-center">
                        <img className="h-16 w-16 self-center" src={!isPlaying ? play : pause} onClick={handlePlayPause} />
                        {/* {!isPlaying ? <IconPlay/> : pause} */}
                    </div>

                    <div className=" h-[60px] w-[60px] rounded-[50px] bg-slate-900/[.82] hover:bg-slate-600/[.82] shadow-indigo-900/[.50] self-center  flex justify-center">
                        <img className="h-7 w-7 self-center" src={arrowRight} onClick={skiptoNext} />
                    </div>
                </div>


            </div>
        </div>
      </div>
    </>
}

export default Player;