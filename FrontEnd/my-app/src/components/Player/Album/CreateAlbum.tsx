import React, { useEffect, useState } from 'react'
import { apiPlayerSlice, useGetGenresQuery, useGetTrackByIdQuery, useGetTrackByIdsQuery } from '../../../features/user/apiPlayerSlice';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import { Genre } from '../CreateTrack';
import minusIcon from "../../../images/minusIcon.png"
import plusIcon from "../../../images/plusIcon.png"
import { useDispatch } from 'react-redux';
import { setAlbumModalWindow } from '../../../features/user/modalWindowsStateSlice';
import SelectSongsForAlbumModal from './SelectSongsForAlbumModal';
import { FindById } from '../../types';
import { TrackFromServer } from '../Player';
import miniplay from '../../../images/play.png'

export interface createAlbum{
  title:string,
  background:string,
  userId:number,
  tracksIds:number[]
}

function CreateAlbum() {
  const [getImageByBase64,{}] = apiPlayerSlice.useGetImageLinkByBase64Mutation();
  const [createAlbum,{}] = apiPlayerSlice.useCreateAlbumMutation();


  const [selectedTrackIdsState,setSelectedTrackIdsState] = useState<FindById[]>([]);
  const {data:tracks}:{data:TrackFromServer[]} = useGetTrackByIdsQuery(selectedTrackIdsState);

  const navigate = useNavigate();

  const user = useAppSelector((state)=>state.user.user);
  const selectedTracksIds = useAppSelector((state)=>state.modalWindows.selectedTracksIds);

  useEffect(()=>{
    setSelectedTrackIdsState([]);
    for (let index = 0; index < selectedTracksIds.length; index++) {
      const element = selectedTracksIds[index];
      setSelectedTrackIdsState(prev=>[...prev,{id:element}]);
    }
  },[selectedTracksIds])

  console.log(tracks);

  const [mainImage,setMainImage]=useState("");
  const [backgroundImage,setBackgroundImage]=useState("");
  const [title,setTitle]=useState("");

  const [mainImageToSend,setMainImageToSend]=useState("");
  const [backgroundImageToSend,setBackgroundImageToSend]=useState("");

  const [isImageHover,setImageHover]=useState(false);
  var dispatch = useDispatch();


  const [divContent, setDivContent] = useState<JSX.Element[]>([]);
  const [genresIds, setGenresIds] = useState<string[]>([]);

  const {data:genres,isSuccess:isGenresSuccess} = useGetGenresQuery() as {
    data: Genre[];
    isSuccess: boolean;
  };


  const [selectedSong, setSelectedSong] = useState<File | null>(null);
  const [error, setError] = useState<string>("");

  const handleSetSong = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setSelectedSong(selectedFile);
  };

  const handleCreateAlbum= async ()=>{
    console.log(genresIds);
    const numberArrayGenresIds: number[] = genresIds.map((str:string) => Number(str));

    var canBeCreated = true;
    if(title.length <=0)
    {
      canBeCreated = false;
      setError("Заголовок є обов'язковим");
    }

    if(selectedTracksIds.length <= 0)
    {
      canBeCreated = false;
      setError("Виберіть треки для плейлісту");
    }

    if(mainImage == "")
    {
      canBeCreated = false;
      setError("Виберіть картинку для плейлісту");
    }

    if(canBeCreated)
    {
      setError("");
      var request:createAlbum = {title:title,background:mainImageToSend,userId:Number(user.id),tracksIds:selectedTracksIds};
      createAlbum(request);
      navigate("/music/home");
    }

  }

  const HandleSetMainImage = async (event:any)=>{
    console.log(mainImage);

    const files = event.target.files;
    if (files[0] && files[0].type.startsWith('image/')) {
      console.log(files);
      
      console.log("files_to_send");
      console.log(mainImage);
      
      const promise = new Promise((resolve) => {
          let byte_img = toBase64(files[0]);
          byte_img.then((res: any) => {
          let res_byte_img = res.split(',')[1];
          let ext = getFileExtension(files[0].name);
          console.log(ext);
          resolve(res_byte_img);
          });
      });

      try {
        var base64img:any = await Promise.resolve(promise);
        setMainImageToSend(base64img);
        var response = await getImageByBase64({ image: base64img });
        console.log(response.data.link);
        setMainImage(response.data.link);
      } catch (error) {
        console.error(error);
      }
    }
  }

  const HandleSetBackgroundImage = async (event:any)=>{
    const files = event.target.files;
    if (files[0] && files[0].type.startsWith('image/')) {
      
      console.log(files);
      
      console.log("files_to_send");
      console.log(mainImage);
      
      const promise = new Promise((resolve) => {
          let byte_img = toBase64(files[0]);
          byte_img.then((res: any) => {
          let res_byte_img = res.split(',')[1];
          let ext = getFileExtension(files[0].name);
          console.log(ext);
          resolve(res_byte_img);
        });
      });
    
      try {
        var base64img:any = await Promise.resolve(promise);
        setBackgroundImageToSend(base64img);
        var response = await getImageByBase64({ image: base64img });
        // setBackgroundImage(response.data);
        console.log(response.data.link);
        setBackgroundImage(response.data.link);
      } catch (error) {
        console.error(error);
      }
    }
  }

  const toBase64:any = (file:File) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);

  });

  function getFileExtension(filename:any){
    // get file extension
    const extension = "." + filename.split('.').pop();
    return extension;
  }

  const addElement = () => {
    var e:any = document.getElementById("Genres");
    var value:number = e.value;
    console.log("e");
    console.log(e.value);
    // setOptionsIds();
    if(e.value != "-")
    {
    const newElement = (
      // <div key={value.toString()} className=" cursor-pointer hover:underline ml-2" onClick={() => handleDeleteNewVariant(value.toString())}>
      //   <p className="mt-1" id={value.toString()}>-{genres[value-1].title}</p>
      // </div >
      <div key={value.toString()} className="flex w-full">
        <div id={value.toString()}  className="py-1 w-full text-almostBlackColor mt-1 rounded-lg font-medium outline-0  bg-almostWhiteColor/60 px-3">
        {genres.find(opt=>opt.id==value)?.title}
        </div>
        <img onClick={() => handleDeleteNewVariant(value.toString())} className=" cursor-pointer h-10 self-center ml-2" src={minusIcon} />
      </div>
    );
    var canBeCreated:boolean = true;
    
    for (let index = 0; index < genresIds.length; index++) {
      console.log(genresIds[index]);
      var tmp:any = document.getElementById(genresIds[index]);
      console.log("tmp");
      if(genresIds[index] == value.toString())
      {
        canBeCreated=false;
      }
      // request.variants.push(Variant);
    }

    if(canBeCreated)
    {
    setDivContent(prevContent => [...prevContent, newElement]);
    setGenresIds(prevContent => [...prevContent, value.toString()] );
    }
    }
  };

  const handleDeleteNewVariant = (id: string) => {
    setDivContent(prevContent => prevContent.filter(element => element.key !== id));
    setGenresIds(prevContent => prevContent.filter(element => element !== id));
  };

  const handelCreateNewVariant=()=>{
    addElement();
  }

  const HandleSetSong=(event:any)=>{
    const files = event.target.files;

    console.log(files[0]);
  }

  const customProgressBarStyles = {
    backgroundColor: 'blue', // Change to your desired color
  };

  const customProgressTrackStyles = {
    backgroundColor: 'red', // Change to your desired color
  };



  return (
    // onSubmit={handleCreateTrack}
    <div  className="bg-middleGrayColor rounded-lg mt-2 self-center gap-3 text-white text-[15px] select-none py-3 px-6">

      <div className='flex justify-between'>
          <p className=' text-xl font-semibold'>Add Playlist</p>
          
      </div>
      <div className='mt-6 grid-cols-9 grid'>
        <label style={{ backgroundImage:"url("+mainImage+")", backgroundPosition:"center"}} htmlFor="mainImage" className=" bg-cover bg-almostWhiteColor col-span-2 cursor-pointer active:scale-95 transition-all rounded-lg p-2 h-64 flex justify-center hover:bg-almostWhiteColor/80 ">
        </label>

        <input
        onChange={HandleSetMainImage}
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
            <input id="title" name="title" placeholder="Type Title..." value={title} onChange={(e)=>setTitle(e.currentTarget.value)} className="py-3 w-full mt-1 rounded-lg font-medium outline-0 bg-almostBlackColor px-3" />
          </div>

          <div className="grid grid-cols-5 gap-4 mt-2">
            <div className="col-span-2">
              <label className=" text-almostWhiteColor font-semibold">Genre</label>
              <br/>
              <div className="flex">
                <select name="Genres" id="Genres" placeholder="Enter..." className="py-3 w-full mt-1 rounded-lg font-medium outline-0 bg-almostBlackColor px-3" >
                  {isGenresSuccess ? genres.map((a:Genre)=>{return <option value={a.id} key={a.id}>{a.title}</option>;}) : ""}
                </select>
                <img className=" cursor-pointer h-10 self-center ml-2" onClick={()=>handelCreateNewVariant()} src={plusIcon} />
              </div>
              <div className="mt-2">
                {divContent}
                
              </div>
              
            </div>

            <div className=" col-span-3">
              <label className=" text-almostWhiteColor font-semibold">Select Audio</label>
              <br/>
              <div className="">
                <label onClick={()=>{dispatch(setAlbumModalWindow(true))}} className="py-3 w-full mt-1 flex justify-center cursor-pointer rounded-lg font-medium outline-0 bg-almostBlackColor px-3">
                  <span>Select songs</span>
                </label>

                <div className='mt-2'>
                  {tracks?.map((track,index)=>{
                    return <>
                    <div className={'hover:bg-veryWhiteGrayColor mb-1 flex justify-between  p-1 rounded-lg select-none cursor-pointer'}>
                      <div className=' flex'>
                        <span className=' self-center text-white font-medium ml-3'>{index+1}</span>
                        <div className=' h-12 w-12  rounded-lg ml-3 bg-center bg-cover ' style={{backgroundImage:`url(${track.image})`}}>

                        </div>
                        <span className=' self-center text-white px-3'>{track.title}</span>
                      </div>

                    </div>
                    </>
                  })}
                </div>
                
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
          
          <div className=' text-red-400'>
            {error}
          </div>

          <div className="my-5">
            <button onClick={()=>handleCreateAlbum()} placeholder="Type Title..." className=" hover:bg-almostWhiteColor/60 py-3 w-full mt-1 rounded-lg font-medium outline-0 bg-almostBlackColor px-3" >
              Add Playlist
            </button>
          </div>

        </div>
      
          
    
    
      </div>
      
    </div>
  )
}

export default CreateAlbum