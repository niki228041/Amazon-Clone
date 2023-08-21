import { useNavigate } from "react-router-dom";
import { apiCompanySlice, useGetAllCompaniesQuery } from "../../features/user/apiCompanySlice";
import { Company } from "./types";




export const CompanyList=()=>{

    // const [deleteCategory_,{}] = apiCompanySlice.useDeleteCategoryMutation();
    const {data:companies,isSuccess:isSuccessCompanies}:{data?:Company[] ,isSuccess:boolean,error:any} = useGetAllCompaniesQuery();


    var navigate = useNavigate();

    const deleteCategoryHandle=(id:number)=>{
        // deleteCategory_({id:id});
      }

    return <>
      {
      isSuccessCompanies ? companies?.map((category:Company) => (
    <li key={category.id} className="grid grid-cols-3 justify-between gap-x-6 py-5">
      <div className="flex gap-x-4 ">
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900">{category.name}</p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500">{category.name}</p>
        </div>
      </div>

      <div className="grid grid-cols-6 justify-end gap-2">
        
          
      </div>

      <div className="flex justify-end">
        <button
         type="button"
         className="mt-2 mr-1 inline-flex items-center rounded-md  cursor-pointer  bg-indigo-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
         Add User To Company
        </button>

        <button
         type="button"
         onClick={()=>{deleteCategoryHandle(category.id)}}
         className="mt-2 mr-1 inline-flex items-center rounded-md  cursor-pointer  bg-rose-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
         Delete
        </button>
          
        <button
         type="button"
         className="mt-2 mr-1 inline-flex items-center rounded-md  cursor-pointer  bg-yellow-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
         Edit
        </button>

      </div>
    </li>
  )):""}
  </>;
  }