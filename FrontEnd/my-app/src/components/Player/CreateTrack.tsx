import { useEffect, useState } from "react";
import img from '../../images/ronpa.png';
import { apiPlayerSlice } from "../../features/user/apiPlayerSlice";
import { useNavigate } from "react-router-dom";

export interface createTrack{
    title:string,
    background:string,
    image:string,
    genresIds:number[],
    song:string,
}

const CreateTrack=()=>{

    const [createGenre,{}] = apiPlayerSlice.useCreateGenreMutation();
    const navigate = useNavigate();

    const [mainImage,setMainImage]=useState();
    const [backgroundImage,setBackgroundImage]=useState();

    const handleCreateGenre=(data:React.FormEvent<HTMLFormElement>)=>{
        data.preventDefault();
        var curentData = new FormData(data.currentTarget);
    
    
        // var request:createTrack = {title:""};
    
        // request.title = curentData?.get("title")?.toString()!;
        // request.description = curentData?.get("description")?.toString()!;
        // createGenre(request);
        navigate("/player");
    }

    const HandleSetMainImage = async (event:any)=>{
      const files = event.target.files;
  
      console.log(files);
  
      var imagesBytes:any = [];
      for(var it = 0;it<files.length;it++){
        imagesBytes.push(files[it]);
      } 
      setMainImage(imagesBytes);
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
        const imagesBytes_toSend = await Promise.resolve(promise);
        console.log(imagesBytes_toSend);
        // var response = await getLinkFromServer({ images: imagesBytes_toSend });
        // setMainImage(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error(error);
      }
  
      // console.log(response?.data);
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

    return<>
    <div className="pt-16 h-[90vh]" style={{backgroundImage:`url(${img})`,backgroundPosition:"center"}}>

    <div className=" bg-gray-200 w-1/3 m-auto rounded-md p-10" >
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          
          <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight  text-gray-900">
           CREATE TRACK
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleCreateGenre}>
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
                  id="background"
                  name="background"
                  autoComplete="background"
                  type="file"
                  required
                  className="hidden "
                />
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
                  type="file"
                  required
                  className="hidden "
                />
              </div>
            </div>
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