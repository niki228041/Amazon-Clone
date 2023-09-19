import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import close from "../../../images/close.png"
import { setAlbumModalWindow, setSelectedTracksIds } from '../../../features/user/modalWindowsStateSlice';
import { useAppSelector } from '../../../app/hooks';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import miniplay from '../../../images/play.png'
import { useGetTracksQuery } from '../../../features/user/apiPlayerSlice';
import { Track, TrackFromServer } from '../Player';

function SelectSongsForAlbumModal() {
  var dispatch = useDispatch();
  var isOpen = useAppSelector((state)=>state.modalWindows.isAlbumModalOpen);

  var {data:tracks}:{data:TrackFromServer[]} = useGetTracksQuery();

  var navigate = useNavigate();
  var dispatch = useDispatch();

  const [selectedTrackIds,setSelectedTrackIds]= useState<number[]>([]);


  const [onSearch,setSearch]= useState(false);
  const [inputText, setInputText] = useState("");
  const [isAutoPlay, setAutoPlay] = useState(false);

  const handleSelectTrackId=(id:number)=>{
    if(selectedTrackIds.includes(id))
    {
      setSelectedTrackIds(selectedTrackIds.filter(value=>value != id));
    }
    else
    {
      setSelectedTrackIds(prev=>[...prev,id]);
    }

  }

  const handleGo=(e:string)=>{
    // sortArr();
    setInputText(e);

    if(e == '' || e == null){
        setSearch(false);
        // navigate("posts")
    }
    else{
        setSearch(true);
        // navigate("search");
    }
  }

  return (
    <>
    {isOpen?
    <div className="flex justify-center h-full w-full fixed bg-black/40 transition-all z-30">

      <div className=" absolute px-10 rounded-xl bg-whiteGrayColor grid mt-48 w-1/2" >
        <div className="absolute flex select-none right-0 p-2 ">
          <span onClick={() => dispatch(setAlbumModalWindow(false))} className="p-2 cursor-pointer" >
            <img className=' h-4' src={close}></img>
          </span>
        </div>

        <div className='flex justify-between mt-5'>
            <div className=' text-white '>
              <div>
                <span className=' text-lg font-medium'>Settings</span>
                <div className='flex justify-between text-sm mt-2'>
                    <div>
                        <div onClick={()=>{setAutoPlay(!isAutoPlay)}} className={classNames('cursor-pointer bg-almostBlackColor w-12 rounded-full flex p-1 transition-all ',{" bg-orangeColor":isAutoPlay})}>
                            <div className={classNames(' bg-orangeColor h-5 w-5 rounded-full self-center cursor-pointer transition-all ',
                            {" bg-white translate-x-5":isAutoPlay}
                            )}>

                            </div>
                        </div>
                    </div>
                    <span className=' text-almostWhiteColor ml-4 self-center'>Choose from your own track</span>
                </div>
              </div>
            </div>
            <input value={inputText} onChange={event => handleGo(event.target.value)} placeholder='Search a song..' className=" self-center bg-white rounded-full h-6 text-black text-[12px] px-4 pr-8"/>
        </div>

        <div className=' text-md  my-5 text-white'>
          Founded Tracks 3
        </div>

        <div className=' bg-grayForPlayerColor w-full rounded-lg'>

          {tracks?.filter((item) => {
            return inputText.toLowerCase() === ' ' ? item : item.title?.toLowerCase().includes(inputText.toLowerCase());
          })?.map((track,index)=>{
            return <>
            
            <div onClick={()=>handleSelectTrackId(track.id)} className={classNames(' hover:bg-veryWhiteGrayColor mb-1 flex justify-between active:bg-mostWhiteGrayColor p-1 rounded-lg select-none cursor-pointer',{"bg-veryWhiteGrayColor":selectedTrackIds.includes(track.id)})}>
              <div className=' flex'>
                <span className=' self-center text-white font-medium ml-3'>{index+1}</span>
                <div className=' h-12 w-12  rounded-lg ml-3 bg-center bg-cover ' style={{backgroundImage:`url(${track.image})`}}>

                </div>
                <span className=' self-center text-white px-3'>{track.title}</span>
              </div>

              <div className='flex'>
                <span className=' self-center text-white px-1'>{track.views}</span>
                <img src={miniplay} className=' h-4 self-center mr-3' />
              </div>

            </div>
            
            </>
          })}
          
        </div>


        {/* <div onClick={()=>{dispatch(setAlbumModalWindow(false)); navigate("/login");}} className='flex justify-center bg-mainYellowColor rounded-lg border py-1 px-10 my-5 text-white font-medium cursor-pointer'>Увійти</div> */}
        <div className="my-5">
            <button onClick={()=>{dispatch(setSelectedTracksIds(selectedTrackIds));dispatch(setAlbumModalWindow(false));}} placeholder="Type Title..." className=" text-whiteForHeader hover:bg-almostWhiteColor/60 py-3 w-full mt-1 rounded-lg font-medium outline-0 bg-almostBlackColor px-3" >
            Add Tracks
            </button>
          </div>
      </div>

    </div>
    :""}
    </>
  )
}

export default SelectSongsForAlbumModal