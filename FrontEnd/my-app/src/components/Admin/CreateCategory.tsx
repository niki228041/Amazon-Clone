import { useState } from "react";
import { apiCategorySlice, useGetCategoriesQuery } from "../../features/user/apiCategorySlice";
import { apiProductSlice } from "../../features/user/apiProductSlice";
import { Category, Options, Variant, createCategory, createProduct } from "./types";
import { v4 as uuidv4 } from 'uuid';
import { useGetOptionsQuery } from "../../features/user/apiOptionsSlice";



const CreateCategory=()=> {
    var [createCategory,{}] = apiCategorySlice.useCreateCategoryMutation();

    const {data:categories,isSuccess} = useGetCategoriesQuery();

    const {data:options,isSuccess:isOptionsSuccess} = useGetOptionsQuery() as {
      data: Options[];
      isSuccess: boolean;
    };



    const handleCreate=(data:React.FormEvent<HTMLFormElement>)=>{

      data.preventDefault();
      var curentData = new FormData(data.currentTarget);

      var e:any = document.getElementById("Category");
      var categoryId = e.value;
      if(e.value=="-")
      {
        categoryId = 0;
      }
      
      var name = curentData?.get("name")?.toString()!;

      var optionsIds:number[] = [];

      inputIds.forEach(id=>optionsIds.push(parseInt(id)));

      
      var newCategory:createCategory = {
        name:name,
        categoryId:categoryId,
        optionsIds:optionsIds
      };

      console.log(newCategory);
      createCategory(newCategory);
  }

  

  const [divContent, setDivContent] = useState<JSX.Element[]>([]);
  const [inputValues, setInputValues] = useState<string[]>([]);
  const [inputIds, setInputIds] = useState<string[]>([]);
  const [optionsIds, setOptionsIds] = useState<number>(0);
  console.log(options);

  const addElement = () => {
    var e:any = document.getElementById("OptionsTitle");
    var value:number = e.value;
    console.log(value);
    if(e.value != "-")
    {
    var id = uuidv4();
    const newElement = (
      <div key={value.toString()} >
        <p>{options.find(opt=>opt.id==value)?.title} </p>
        <div className="flex">

        <div className='rounded-full flex flex-col w-full'>
        <select name='Category' id={value.toString()} className=' bg-yellowForInputs text-[15px] mediumFont outline-none rounded-full h-10 pl-3 pr-3 bg-slate-100'>
          <option>-</option>
          {/* {companys.data.map} */}
          {isSuccess ? options.find(opt=>opt.id==value)?.variants.map((a:Variant)=>{return <option value={a.id} key={a.id}>{a.title}</option>;}) : ""}
        </select>
        </div>
        <button
            className="w-10 self-center h-10 text-[15px] bg-slate-100 rounded-full"
            onClick={() => handleDeleteNewVariant(value.toString())}
        >
            -
        </button>
        </div>

      </div>
    );
    var canBeCreated:boolean = true;
    
    for (let index = 0; index < inputIds.length; index++) {
      var tmp:any = document.getElementById(inputIds[index]);
      console.log("tmp");
      if(tmp.id == value)
      {
        canBeCreated=false;
      }
      // request.variants.push(Variant);
    }

    if(canBeCreated)
    {
    setDivContent(prevContent => [...prevContent, newElement]);
    setInputIds(prevContent => [...prevContent, value.toString()] );
    }
    }
  };

  const handleDeleteNewVariant = (id: string) => {
    setDivContent(prevContent => prevContent.filter(element => element.key !== id));
    setInputIds(prevContent => prevContent.filter(element => element !== id));
  };

  const handelCreateNewVariant=()=>{
    addElement();
    console.log(inputValues);
  }
  
  // const handleCreate = (data: React.FormEvent<HTMLFormElement>) => {
  //   data.preventDefault();
  //   var curentData = new FormData(data.currentTarget);


  //   var request:createOptions = {title:"",variants:[]};
  //   for (let index = 0; index < inputIds.length; index++) {
  //     var tmp:any = document.getElementById(inputIds[index]);
  //     var Variant:createVariant = {title:tmp.value};
  //     request.variants.push(Variant);
  //   }

  //   request.title = curentData?.get("Title")?.toString()!;

  //   createOptions(request);

  //   navigate("/admin");

  //   console.log(request);
  // };


    
    return <>
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
           CREATE CATEGORY
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST" onSubmit={handleCreate}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  autoComplete="name"
                  required
                  className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                Category
              </label>

                <div className='rounded-full flex flex-col mb-4  pr-3'>
                  <select name='Category' id="Category" className=' bg-yellowForInputs text-[15px] mediumFont outline-none rounded-full h-10 pl-3 pr-3'>
                    <option>-</option>
                    {/* {companys.data.map} */}
                    {isSuccess ? categories.payload?.map((a:Category)=>{return <option value={a.id} key={a.id}>{a.name}</option>;}) : ""}
                  </select>
                </div>
            </div>

            <div className="flex">
              <div className=" w-full mr-1">
                <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                  Options
                </label>
                <div id="variants" className="mt-2 flex">
                  <div className="w-10 cursor-pointer flex justify-center self-center" onClick={()=>handelCreateNewVariant()}>
                    +
                  </div>
                  <div className='rounded-full flex flex-col w-full'>
                    <select name='OptionsTitle' id="OptionsTitle" className=' bg-yellowForInputs text-[15px] mediumFont outline-none rounded-full h-10 pl-3 pr-3 bg-slate-100'>
                      <option>-</option>
                      {/* {companys.data.map} */}
                      {isOptionsSuccess ? options.map((a:Options)=>{return <option value={a.id} key={a.id}>{a.title}</option>;}) : ""}
                    </select>
                  </div>
                </div>
                {divContent}
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
    </>;
  }
  
  export default CreateCategory;
  