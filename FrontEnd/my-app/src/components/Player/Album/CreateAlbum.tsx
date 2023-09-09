import React from 'react'

function CreateAlbum() {
  return (
    // onSubmit={handleCreateTrack}
    <form  className="bg-middleGrayColor rounded-lg mt-2 self-center gap-3 text-white text-[15px] select-none py-3 px-6">
      <div className='flex justify-between'>
          <p className=' text-xl font-semibold'>Add Song</p>
          
      </div>
      <div className='mt-6 grid-cols-9 grid'>
        {/* <label style={{ backgroundImage:"url("+mainImage+")", backgroundPosition:"center"}} htmlFor="mainImage" className=" bg-cover bg-almostWhiteColor col-span-2 cursor-pointer active:scale-95 transition-all rounded-lg p-2 h-64 flex justify-center hover:bg-almostWhiteColor/80 ">
        </label> */}

        <input
        // onChange={HandleSetMainImage}
        id="mainImage"
        name="mainImage"
        autoComplete="mainImage"
        accept="image/*" // Принимаем только изображения
        type="file"
        className="hidden " />

        <div className=" bg-whiteGrayColor ml-2 col-span-7 rounded-lg p-1 px-5">
          <div className="mt-2">
            <label className=" text-almostWhiteColor font-semibold">Title</label>
            <br/>
            <input id="title" name="title" placeholder="Type Title..." className="py-3 w-full mt-1 rounded-lg font-medium outline-0 bg-almostBlackColor px-3" />
          </div>

          <div className="grid grid-cols-5 gap-4 mt-2">
            <div className="col-span-2">
              <label className=" text-almostWhiteColor font-semibold">Genre</label>
              <br/>
              <div className="flex">
                <select name="Genres" id="Genres" placeholder="Enter..." className="py-3 w-full mt-1 rounded-lg font-medium outline-0 bg-almostBlackColor px-3" >
                  {/* {isGenresSuccess ? genres.map((a:Genre)=>{return <option value={a.id} key={a.id}>{a.title}</option>;}) : ""} */}
                </select>
                {/* <img className=" cursor-pointer h-10 self-center ml-2" onClick={()=>handelCreateNewVariant()} src={plusIcon} /> */}
              </div>
              <div className="mt-2">
                {/* {divContent} */}
                
              </div>
              
            </div>

            <div className=" col-span-3">
              <label className=" text-almostWhiteColor font-semibold">Select Audio</label>
              <br/>
              <div className="flex">
                <label htmlFor="song" className="py-3 w-full mt-1 flex justify-center cursor-pointer rounded-lg font-medium outline-0 bg-almostBlackColor px-3">
                  <span>Select song</span>
                </label>
                <input
                //   onChange={handleSetSong}
                  id="song"
                  name="song"
                  accept="audio/*"
                  type="file"
                  className="hidden"
                />
              </div>
              <div className="mt-4">
                {/* {selectedSong && selectedSong.type.startsWith('audio/') ? (
                  <AudioPlayer
                    src={URL.createObjectURL(selectedSong)}
                    defaultCurrentTime="Loading" defaultDuration="Loading"
                    customVolumeControls={[]}
                    customAdditionalControls={[]}
                    customIcons={{
                      play: <img src={Play} />,
                      pause: <img src={Stop} />,
                      forward:<img className="self-center h-7 m-auto" src={SkipRight} />,
                      rewind:<img className=" rotate-180 self-center h-7 m-auto" src={SkipRight} />,
                    }}
                  />
                ) : null} */}
              </div>
              

            </div>


          </div>

          <div className="my-5">
            <button type="submit" placeholder="Type Title..." className=" hover:bg-almostWhiteColor/60 py-3 w-full mt-1 rounded-lg font-medium outline-0 bg-almostBlackColor px-3" >
            Add Song
            </button>
          </div>

        </div>
      
          
    
    
      </div>
      
    </form>
  )
}

export default CreateAlbum