import React, { useState } from 'react'
import PropTypes from 'prop-types'

import DotsMenu from "../../images/MenuDots.svg";
import Like from "../../images/clickLike.png";
import Comment from "../../images/createComment.png";
import LikeOrange from "../../images/clickLike_orange.png";
import Play from "../../images/Play.svg";
import Stop from "../../images/Stop.svg";
import tmp from "../../images/maxre.png";


export const HistoryItem=()=>{
    const [isLikePressed, setLikePressed] = useState(false);
    const [isSongPressed, setSongPressed] = useState(false);

    return(
    <div className="flex my-4">
    <div className="mr-2 h-28 w-28 rounded-lg" >
      <img className=" rounded-lg self-center h-28 w-28" src={tmp}  />
    </div>
    <div className=" flex rounded-lg w-full">
      
      <div className="bg-whiteGrayColor w-full flex rounded-lg relative">
      <div className="flex flex-row-reverse w-full absolute">  
        <span className="font-semibold text-sm p-2 text-almostWhiteColor cursor-pointer ">11 Days ago</span>
      </div>
      <div className='flex justify-between w-full m-auto px-2 self-center'>
          <div className="flex">
            <img onClick={()=>setSongPressed(!isSongPressed)} src={!isSongPressed ? Play : Stop} className="transition-all active:scale-105 pr-2 h-12 self-center" />
            <span className=" text-almostWhiteColor self-center">Raon - </span>
            <span className=" text-[16px] self-center"> ダーリン (darling)</span>
          </div>
          <div className="flex">
              <span className=' self-center font-semibold'>200K </span>
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

    )
}

const History=()=> {



  return (
    <div className="bg-middleGrayColor rounded-lg mt-2 self-center gap-3 text-white text-[15px] select-none py-3 px-6">
        <div className='flex justify-between'>
            <p className=' text-xl font-semibold'>History</p>
            <input placeholder='Search a song..' className=" self-center bg-white rounded-full h-6 text-black text-[12px] px-4 pr-8"/>
        </div>

        <div className=''>
            <HistoryItem/>
            <HistoryItem/>
            <HistoryItem/>
            <HistoryItem/>
            <HistoryItem/>
            <HistoryItem/>
            <HistoryItem/>
            <HistoryItem/>
            <HistoryItem/>
        </div>

    </div>
  )
}


export default History