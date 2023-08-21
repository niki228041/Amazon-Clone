import React from 'react'
import tmp from '../../../images/KrismasKlub.jpg'
import Play_small from "../../../images/play.png";

const MainProfile=()=> {
  return (
    <div>
        <div className=' grid grid-cols-6 gap-10 mt-8'>
            <div className=' col-span-4'>
                <div className=' text-white text-lg'>Best Tracks</div>
                <div className=' bg-middleGrayColor p-1 rounded-lg mt-4'>
                    <div>
                        <div className='  hover:bg-whiteGrayColor active:bg-almostWhiteColor/60 p-2 flex text-white rounded-lg'>
                            <span className=' self-center mx-2'>1</span>
                            <div>
                                <div className=' h-12 w-12 bg-cover rounded-lg mx-2' style={{backgroundImage:`url(${tmp})`}}/>
                            </div>
                            <span className=' self-center mx-2 text-sm flex-nowrap whitespace-nowrap'>Destructo Disk - Electric Sock</span>
                            <div className=' w-full text-sm  flex flex-row-reverse'>
                                <span className=' self-center mx-4 flex'>
                                    52
                                    <img className='h-4 self-center' src={Play_small} />
                                </span>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div className='col-span-2'>
                <div className=' text-white text-lg'>Links</div>
                <div className='  p-1 rounded-lg mt-1'>
                    <div className='flex flex-wrap text-sm'>
                        <div className='   bg-grayForPlayerColor cursor-pointer hover:bg-whiteGrayColor p-1 mr-3 mt-2 px-6 text-almostWhiteColor rounded-lg'>Instagram</div>
                        <div className='   bg-grayForPlayerColor cursor-pointer hover:bg-whiteGrayColor p-1 mr-3 mt-2 px-6 text-almostWhiteColor rounded-lg'>Telegram</div>
                        <div className='   bg-grayForPlayerColor cursor-pointer hover:bg-whiteGrayColor p-1 mr-3 mt-2 px-6 text-almostWhiteColor rounded-lg'>Youtube</div>
                        <div className='   bg-grayForPlayerColor cursor-pointer hover:bg-whiteGrayColor p-1 mr-3 mt-2 px-6 text-almostWhiteColor rounded-lg'>Twitter</div>

                    </div>
                </div>

                <div className=' text-white text-lg mt-6 flex justify-between'>
                    <span>3 Friends</span>
                    <span className=' text-sm text-almostWhiteColor hover:text-white cursor-pointer'>View all</span>
                </div>

                <div className='rounded-lg mt-1'>
                    <div className=' bg-middleGrayColor p-1 rounded-lg mt-4'>
                    <div>
                        <div className='  hover:bg-whiteGrayColor select-none active:bg-almostWhiteColor/60 p-2 flex text-white rounded-lg'>
                            <div>
                                <div className=' h-12 w-12 bg-cover rounded-lg mx-2' style={{backgroundImage:`url(${tmp})`}}/>
                            </div>
                            <div className='flex relative'>
                                <span className=' self-start mx-2 flex-nowrap whitespace-nowrap'>Uishjro</span>
                                <span className=' self-end mx-2 text-sm text-almostWhiteColor flex-nowrap whitespace-nowrap absolute'>342 Followers</span>
                            </div>
                           
                        </div>
                    </div>
                    <div>
                        <div className='  hover:bg-whiteGrayColor select-none active:bg-almostWhiteColor/60 p-2 flex text-white rounded-lg'>
                            <div>
                                <div className=' h-12 w-12 bg-cover rounded-lg mx-2' style={{backgroundImage:`url(${tmp})`}}/>
                            </div>
                            <div className='flex relative'>
                                <span className=' self-start mx-2 flex-nowrap whitespace-nowrap'>Uishjro</span>
                                <span className=' self-end mx-2 text-sm text-almostWhiteColor flex-nowrap whitespace-nowrap absolute'>342 Followers</span>
                            </div>
                           
                        </div>
                    </div>
                    <div>
                        <div className='  hover:bg-whiteGrayColor select-none active:bg-almostWhiteColor/60 p-2 flex text-white rounded-lg'>
                            <div>
                                <div className=' h-12 w-12 bg-cover rounded-lg mx-2' style={{backgroundImage:`url(${tmp})`}}/>
                            </div>
                            <div className='flex relative'>
                                <span className=' self-start mx-2 flex-nowrap whitespace-nowrap'>Uishjro</span>
                                <span className=' self-end mx-2 text-sm text-almostWhiteColor flex-nowrap whitespace-nowrap absolute'>342 Followers</span>
                            </div>
                           
                        </div>
                    </div>


                </div>
                <div className=' text-white text-lg mt-6 flex justify-between'>
                    <span>6 Liked Tracks</span>
                    <span className=' text-sm text-almostWhiteColor hover:text-white cursor-pointer'>View all</span>
                </div>

                <div className='rounded-lg mt-1'>
                    <div className=' bg-middleGrayColor p-1 rounded-lg mt-4'>
                    <div className='  hover:bg-whiteGrayColor active:bg-almostWhiteColor/60 p-2 flex text-white rounded-lg'>
                        <div>
                            <div className=' h-12 w-12 bg-cover rounded-lg mx-2' style={{backgroundImage:`url(${tmp})`}}/>
                        </div>
                        <span className=' self-center mx-2 text-sm flex-nowrap whitespace-nowrap'>Destructo Disk - Electric Sock</span>
                        <div className=' w-full text-sm  flex flex-row-reverse'>
                            <span className=' self-center mx-4 flex'>
                                52
                                <img className='h-4 self-center' src={Play_small} />
                            </span>
                        </div>
                    </div>
                    <div className='  hover:bg-whiteGrayColor active:bg-almostWhiteColor/60 p-2 flex text-white rounded-lg'>
                        <div>
                            <div className=' h-12 w-12 bg-cover rounded-lg mx-2' style={{backgroundImage:`url(${tmp})`}}/>
                        </div>
                        <span className=' self-center mx-2 text-sm flex-nowrap whitespace-nowrap'>Destructo Disk - Electric Sock</span>
                        <div className=' w-full text-sm  flex flex-row-reverse'>
                            <span className=' self-center mx-4 flex'>
                                52
                                <img className='h-4 self-center' src={Play_small} />
                            </span>
                        </div>
                    </div>
                    <div className='  hover:bg-whiteGrayColor active:bg-almostWhiteColor/60 p-2 flex text-white rounded-lg'>
                        <div>
                            <div className=' h-12 w-12 bg-cover rounded-lg mx-2' style={{backgroundImage:`url(${tmp})`}}/>
                        </div>
                        <span className=' self-center mx-2 text-sm flex-nowrap whitespace-nowrap'>Destructo Disk - Electric Sock</span>
                        <div className=' w-full text-sm  flex flex-row-reverse'>
                            <span className=' self-center mx-4 flex'>
                                52
                                <img className='h-4 self-center' src={Play_small} />
                            </span>
                        </div>
                    </div>


                </div>
                </div>

                

            </div>

            </div>
        </div>
    </div>
  )
}

export default MainProfile
