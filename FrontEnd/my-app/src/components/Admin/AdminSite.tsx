import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { apiProductSlice, useGetProductsQuery } from "../../features/user/apiProductSlice";
import { apiCategorySlice, useGetCategoriesQuery } from "../../features/user/apiCategorySlice";
import { Category, Company } from "./types";
import { useEffect, useState } from "react";
import { Product } from "../types";
import { UserState, becomeASeller } from "../../features/user/user-slice";
import { Orders } from "../../features/user/ordersStateSlice";
import { useAppSelector } from "../../app/hooks";
import { useGetCompanyByUserIdQuery } from "../../features/user/apiCompanySlice";


const AdminSite=()=> {

  const [list,setList] = useState("products");

  var user = useAppSelector(((state: { user: UserState; orders: Orders })=>state.user.user));

  var {data:company}:{data:Company} = useGetCompanyByUserIdQuery({id:user.id});

  console.log("company");
  console.log(company);

  var navigate = useNavigate();

  const handleToCreateOptions=()=>{
    navigate("/createOptions");
  }

  const changeRoute=(title:string)=>{
    setList(title);
    navigate(title);
  }

  // useEffect(()=>{},[list])


  return <>
  <div className="flex">
      <div className=" w-[10%] justify-center ">
          <div className="px-2">
             <button
             type="button"
             onClick={()=>{changeRoute("products")}}
             className="mt-2 inline-flex items-center rounded-md  w-full cursor-pointer bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
             Products
           </button>

           <button
             type="button"
             onClick={()=>{changeRoute("categories")}}
             className="mt-2 inline-flex items-center rounded-md  w-full cursor-pointer bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
             Categories
           </button>

           <button
             type="button"
             onClick={()=>{changeRoute("companies")}}
             className="mt-2 inline-flex items-center rounded-md  w-full cursor-pointer bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
             Companies
           </button>

           <button
             type="button"
             onClick={()=>{changeRoute("FAQs")}}
             className="mt-2 inline-flex items-center rounded-md  w-full cursor-pointer bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
             FAQs
           </button>
           

          </div>
        

          
      </div>

      <div className=" justify-center w-full mt-3 rounded-xl">

          <div className="flex content-center self-center text-center place-content-between mr-2">
              <span className="text-xl font-semibold leading-6 text-gray-900">{list}</span>
              <div className="gap-2 flex">
                { company == null && list=="products"?
                <span className="items-center rounded-md flex justify-center cursor-pointer bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">You need have a Company to create Product</span>
                :
                <button
                type="button"
                onClick={()=>{navigate("create/" + list)}}
                className="items-center rounded-md flex justify-center cursor-pointer bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Create
                </button>}
                {list=="categories" ?
                <button
                 type="button"
                 onClick={()=>{handleToCreateOptions()}}
                 className="items-center rounded-md  cursor-pointer  bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                 AddOptions
                </button>
                :""}
              </div>
              
          </div>
          

          <div className="divide-y divide-gray-100 ">
            <Outlet/>
          </div>
          
      </div>

  </div>
  
  </>;
  }

  

 

  
  export default AdminSite;
  