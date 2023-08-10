import React, { useState } from 'react'
import PropTypes from 'prop-types'

import DotsMenu from "../../images/MenuDots.svg";
import Like from "../../images/clickLike.png";
import Comment from "../../images/createComment.png";
import LikeOrange from "../../images/clickLike_orange.png";
import Play from "../../images/Play.svg";
import Stop from "../../images/Stop.svg";
import tmp from "../../images/maxre.png";


export const LikesItem=()=>{
    const [isLikePressed, setLikePressed] = useState(false);
    const [isSongPressed, setSongPressed] = useState(false);

    return(
    <div className="flex my-4">
      <div>
        <div className=" rounded-lg self-center w-52 h-52 flex justify-center bg-cover" style={{backgroundImage:`url(${tmp})`,backgroundPosition:"center"}}>
          <img className='h-16 self-center' src={Play} />
        </div>
        <div className='text-sm'>
          <p className='mt-1'>Smashing Pumpkins - Today</p>

          <div className='flex justify-between mt-1'>
            <p className=' text-[12px] self-center text-almostWhiteColor'>Liked 11 hours ago</p>
            <div className=' hover:bg-almostWhiteColor/20 p-1 rounded-full'>
              <img className='h-4 w-4 self-center' src={DotsMenu} />
            </div>
          </div>
        </div>
      </div>
        
    </div>

    )
}

const Likes=()=> {



  return (
    <div className="bg-middleGrayColor rounded-lg mt-2 self-center gap-3 text-white text-[15px] select-none py-3 px-6">
        <div className='flex justify-between'>
            <p className=' text-xl font-semibold'>Likes</p>
            <input placeholder='Search a song..' className=" self-center bg-white rounded-full h-6 text-black text-[12px] px-4 pr-8"/>
        </div>

        <div className='grid grid-cols-5'>
            <LikesItem/>
            <LikesItem/>
            <LikesItem/>
            <LikesItem/>
            <LikesItem/>
            <LikesItem/>
            <LikesItem/>
            <LikesItem/>
            <LikesItem/>
            <LikesItem/>
            <LikesItem/>
        </div>

    </div>
  )
}


export default Likes
