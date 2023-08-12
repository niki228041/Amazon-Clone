import { useParams } from "react-router-dom";
import { apiOptionsSlice } from "../../features/user/apiOptionsSlice"
import { Options, Variant } from "../Admin/types";



const GetOptionsByCategory=()=>{
    const params = useParams();
    console.log(params.categoryId);
  
    const {data:options,isSuccess:isSuccessOptions}:{data:Options[],isSuccess:boolean} = apiOptionsSlice.useGetOptionsByCategoryIdQuery({id:params.categoryId});
    console.log(options);

    return <>

    {isSuccessOptions ? options.map((option:Options) => (
        <li key={option.id} className="flex justify-between gap-x-6 py-5 p-10 border">
            <div className="flex flex-col">

            <div className="flex gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">{option.title}</p>
              </div>
            </div>
                {option?.variants?.map((variant:Variant)=>{return <div>-{variant.title}</div>})}
            </div>

            <div className="">
              <button
               type="button"
               className="mt-2 mr-1 inline-flex items-center rounded-md  cursor-pointer  bg-rose-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
               Delete
                </button>

            </div>
        </li>
  )):""}

   
    </>
}
    
export default GetOptionsByCategory