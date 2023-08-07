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
        navigate("/player");
    }

    return<>
    <div className="pt-16 h-[100vh]" style={{backgroundImage:`url(${img})`,backgroundPosition:"center"}}>

    <div className=" bg-gray-200 w-1/3 m-auto rounded-md p-10" >
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          
          <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight  text-gray-900">
           CREATE GENRE
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

            <div>
              <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                Description
              </label>
              <input
                  id="description"
                  name="description"
                  autoComplete="description"
                  required
                  className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
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

export default CreateGenre;