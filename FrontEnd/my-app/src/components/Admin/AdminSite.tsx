import { useLocation, useNavigate } from "react-router-dom";
import { apiProductSlice, useGetProductsQuery } from "../../features/user/apiProductSlice";
import { apiCategorySlice, useGetCategoriesQuery } from "../../features/user/apiCategorySlice";
import { Category } from "./types";
import { useState } from "react";
import { Product } from "../types";

const AdminSite=()=> {

    var people = [{email:"Email",name:"Name"},{email:"Email_2",name:"Name_2"}];

    const [list,setList] = useState("products");

    
    const [deleteProduct_,{}] = apiProductSlice.useDeleteProductMutation();
    const [deleteCategory_,{}] = apiCategorySlice.useDeleteCategoryMutation();
    // const [deleteProduct_,{}] = apiProductSlice.useDeleteProductByIdMutation();
    const {data,isSuccess} = useGetProductsQuery();
    const {data:categories,isSuccess:isSuccessCategory}:{data:any,isSuccess:boolean,error:any} = useGetCategoriesQuery();


    var navigate = useNavigate();

    const getList=()=>{
      if(isSuccess && isSuccessCategory)
      switch(list){
        case "products" :return productList(data.payload,isSuccess,deleteProductHandle);
        case "categories" :return categoryList(categories.payload,isSuccessCategory,deleteCategoryHandle,handleToCreateOptions,navigate);
      }
    }

    const deleteProductHandle=(id:number)=>{
      deleteProduct_({id:id});
    }

    const deleteCategoryHandle=(id:number)=>{
      deleteCategory_({id:id});
    }

    const handleToCreateOptions=()=>{
      navigate("/createOptions");
    }




    return <>
    <div className="flex">
        <div className=" w-[10%] justify-center ">
            <div className="px-2">
               <button
               type="button"
               onClick={()=>{setList("products")}}
               className="mt-2 inline-flex items-center rounded-md  w-full cursor-pointer bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
               Products
             </button>

             <button
               type="button"
               onClick={()=>{setList("categories")}}
               className="mt-2 inline-flex items-center rounded-md  w-full cursor-pointer bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
               Categories
             </button>
            </div>
          

            
        </div>

        <div className=" justify-center w-full p-4 rounded-xl">

            <div className="flex content-center self-center text-center place-content-between">
                <span className="text-xl font-semibold leading-6 text-gray-900">{list}</span>
                <div className="gap-2 grid grid-cols-2">
                  <button
                     type="button"
                     onClick={()=>{navigate("create/" + list)}}
                     className="items-center rounded-md flex justify-center cursor-pointer bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                     Create
                   </button>
                   <button
                    type="button"
                    onClick={()=>{handleToCreateOptions()}}
                    className=" inline-flex items-center rounded-md  cursor-pointer  bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    AddOptions
                  </button>
                </div>
                
            </div>
            

            <ul role="list" className="divide-y divide-gray-100">
              {isSuccess && isSuccessCategory ? getList():""}
            </ul>
            
        </div>

    </div>
    
    </>;
  }

  const productList=(data:Product[],isSuccess:boolean,deleteProduct:any)=>{
    return <>
      {
      isSuccess ? data.map((product:any) => (
    <li key={product.id} className="flex justify-between gap-x-6 py-5">
      <div className="flex gap-x-4">
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900">{product.name}</p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500">{product.name}</p>
        </div>
      </div>

      <div className="">
        <button
         type="button"
         onClick={()=>{deleteProduct(product.id)}}
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

  const categoryList=(data:Category[],isSuccess:boolean,deleteCategory:any,handleToCreateOptions=(id:number)=>{},navigate=(text:string)=>{})=>{
    return <>
      {
      isSuccess ? data.map((category:Category) => (
    <li key={category.id} className="grid grid-cols-3 justify-between gap-x-6 py-5">
      <div className="flex gap-x-4 ">
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900">{category.name}</p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500">{category.name}</p>
        </div>
      </div>

      <div className="grid grid-cols-6 justify-end gap-2">
        
          <button onClick={()=>{navigate("/get-options-by-category/"+category.id)}} className="w-full bg-purple-500 mt-2 mr-1 rounded-md col-span-2 text-white">
            See Options
          </button>
      </div>

      <div className="flex justify-end">
        <button
         type="button"
         onClick={()=>{deleteCategory(category.id)}}
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

  
  export default AdminSite;
  