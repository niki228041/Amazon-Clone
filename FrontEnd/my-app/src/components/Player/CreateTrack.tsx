import { useEffect, useState } from "react";
import img from '../../images/ronpa.png';
import { apiPlayerSlice, useGetGenresQuery} from "../../features/user/apiPlayerSlice";
import { useNavigate } from "react-router-dom";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

export interface createTrack{
    title:string,
    background:string,
    image:string,
    genresIds:number[],
    song:string,
}

export interface Genre{
  title:string,
  description:string,
  id:number,
}

const CreateTrack=()=>{
    const [getImageByBase64,{}] = apiPlayerSlice.useGetImageLinkByBase64Mutation();
    const [createTrack,{}] = apiPlayerSlice.useCreateTrackMutation();

    const navigate = useNavigate();

    const [mainImage,setMainImage]=useState("");
    const [backgroundImage,setBackgroundImage]=useState("");

    const [mainImageToSend,setMainImageToSend]=useState("");
    const [backgroundImageToSend,setBackgroundImageToSend]=useState("");

    const [divContent, setDivContent] = useState<JSX.Element[]>([]);
    const [genresIds, setGenresIds] = useState<string[]>([]);

    const {data:genres,isSuccess:isGenresSuccess} = useGetGenresQuery() as {
      data: Genre[];
      isSuccess: boolean;
    };

    console.log(genres);

    const [selectedSong, setSelectedSong] = useState<File | null>(null);

    const handleSetSong = (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = event.target.files?.[0] || null;
      setSelectedSong(selectedFile);
    };

    const handleCreateTrack= async (data:React.FormEvent<HTMLFormElement>)=>{
        data.preventDefault();
        console.log(genresIds);

        var curentData = new FormData(data.currentTarget);
    
        var title = curentData?.get("title")?.toString()!;

        const promise = new Promise((resolve) => {
          let byte_song = toBase64(selectedSong);
          byte_song.then((res: any) => {
          let res_byte_song = res.split(',')[1];
          resolve(res_byte_song);
          });
        });

        var songBytes:any = await Promise.resolve(promise);
        const numberArrayGenresIds: number[] = genresIds.map((str:string) => Number(str));

        var request:createTrack = {title:title,background:backgroundImageToSend,image:mainImageToSend,song:songBytes,genresIds:numberArrayGenresIds};
        console.log(request);
    
        createTrack(request);
        navigate("/music");
    }

    const HandleSetMainImage = async (event:any)=>{
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
        <div key={value.toString()} className=" cursor-pointer hover:underline ml-2" onClick={() => handleDeleteNewVariant(value.toString())}>
          <p className="mt-1" id={value.toString()}>-{genres[value-1].title}</p>
        </div >
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

    return<>
    <div className="pt-16 h-[100vh]" style={{backgroundImage:`url(${img})`,backgroundPosition:"center"}}>

    <div className=" bg-gray-200 w-1/3 m-auto rounded-md p-10" >
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          
          <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight  text-gray-900">
           CREATE TRACK
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleCreateTrack}>
            <div>
              <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                Title
              </label>
              <div className="mt-2">
                <input
                  id="title"
                  name="title"
                  autoComplete="title"
                  required
                  className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="flex">
            <div className=" w-full mr-1">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Background
              </label>
              <div className="mt-3 ">
                <label htmlFor="background" className=" cursor-pointer w-full select-none bg-slate-100 p-2 rounded-md">
                  Set Background
                </label>
                <input
                  onChange={HandleSetBackgroundImage}
                  id="background"
                  name="background"
                  autoComplete="background"
                  type="file"
                  required
                  className="hidden "
                />
                {/* onClick={()=>{handleDeleteImg(img)}} key={it} */}
                { backgroundImage!=""? <div className="h-40 w-full mt-3 bg-cover  rounded-xl hover:scale-[1.05] transition-all" style={{ backgroundImage:"url("+backgroundImage+")", backgroundPosition:"center"}}></div>:""}
              </div>
            </div>

            <div  className=" w-full ml-1">
              <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                Main Image
              </label>
              <div className="mt-3 ">
                <label htmlFor="mainImage" className=" cursor-pointer w-full select-none bg-slate-100 p-2 rounded-md">
                  Set Main Image
                </label>
                <input
                  onChange={HandleSetMainImage}
                  id="mainImage"
                  name="mainImage"
                  autoComplete="mainImage"
                  accept="image/*" // Принимаем только изображения
                  type="file"
                  required
                  className="hidden "
                />
                 { mainImage!=""? <div className="h-40 w-full mt-3 bg-cover  rounded-xl hover:scale-[1.05] transition-all" style={{ backgroundImage:"url("+mainImage+")", backgroundPosition:"center"}}></div>:""}

              </div>
            </div>
            </div>
            
            <div className="flex">
              <div className=" w-full mr-1">
                <label htmlFor="Genres" className="block text-sm font-medium leading-6 text-gray-900">
                  Genres
                </label>
                <div id="GersesOptions" className="mt-2 flex">
                  <div className="w-10 cursor-pointer flex justify-center self-center" onClick={()=>handelCreateNewVariant()}>
                    +
                  </div>
                  <div className='rounded-full flex flex-col w-full'>
                    <select name='Genres' id="Genres"  className=' bg-yellowForInputs text-[15px] mediumFont outline-none rounded-md h-10 pl-3 pr-3 bg-slate-100'>
                      <option>-</option>
                      {/* {companys.data.map} */}
                      {isGenresSuccess ? genres.map((a:Genre)=>{return <option value={a.id} key={a.id}>{a.title}</option>;}) : ""}
                    </select>
                  </div>
                </div>
                {divContent}
              </div>
            </div>

            <div>
              <div className="w-full">
                <label htmlFor="song" className="cursor-pointer block w-full select-none bg-slate-100 p-2 rounded-md mb-5">
                  Select song
                </label>
                <input
                  onChange={handleSetSong}
                  id="song"
                  name="song"
                  accept="audio/*"
                  type="file"
                  required
                  className="hidden"
                />
              </div>

              {selectedSong && selectedSong.type.startsWith('audio/') ? (
                <AudioPlayer
                  src={URL.createObjectURL(selectedSong)}
                />
              ) : null}
            </div>
            
            
            
            
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Create
              </button>
            </div>

          </form>

          
        </div>
      </div>
    </div>

  </>
}

export default CreateTrack;