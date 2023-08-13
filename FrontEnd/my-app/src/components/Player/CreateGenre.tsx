import { useEffect, useState } from "react";
import img from '../../images/ronpa.png';
import { apiPlayerSlice } from "../../features/user/apiPlayerSlice";
import { useNavigate } from "react-router-dom";

export interface createGenre{
    title:string,
    description:string
}

const CreateGenre=()=>{

    const [createGenre,{}] = apiPlayerSlice.useCreateGenreMutation();
    const navigate = useNavigate();

    const handleCreateGenre=(data:React.FormEvent<HTMLFormElement>)=>{
        data.preventDefault();
        var curentData = new FormData(data.currentTarget);
    
    
        var request:createGenre = {title:"",description:""};
    
        request.title = curentData?.get("title")?.toString()!;
        request.description = curentData?.get("description")?.toString()!;
        createGenre(request);
        navigate("/music/home");
    }

    return<>
        <form onSubmit={handleCreateGenre} className="bg-middleGrayColor rounded-lg mt-2 self-center gap-3 text-white text-[15px] select-none py-3 px-6">
      <div className='flex justify-between'>
          <p className=' text-xl font-semibold'>Add Genre</p>
          
      </div>
      <div className='mt-6'>

        <div className=" bg-whiteGrayColor ml-2 col-span-7 rounded-lg p-1 px-5">
          <div className="mt-2">
            <label className=" text-almostWhiteColor font-semibold">Title</label>
            <br/>
            <input id="title" name="title" placeholder="Type Title..." className="py-3 w-full mt-1 rounded-lg font-medium outline-0 bg-almostBlackColor px-3" />
          </div>
          <div className="mt-2">
            <label className=" text-almostWhiteColor font-semibold">Description</label>
            <br/>
            <input id="description" name="description" placeholder="Type Description..." className="py-3 w-full mt-1 rounded-lg font-medium outline-0 bg-almostBlackColor px-3" />
          </div>

          <div className="my-5">
            <button type="submit" className=" hover:bg-almostWhiteColor/60 py-3 w-full mt-1 rounded-lg font-medium outline-0 bg-almostBlackColor px-3" >
            Add Genre
            </button>
          </div>

        </div>
      
          
    
    
      </div>
      
    </form>

    </>
}

export default CreateGenre;