import { useEffect, useState } from "react";
import { apiCategorySlice, useGetCategoriesQuery } from "../../features/user/apiCategorySlice";
import { apiProductSlice } from "../../features/user/apiProductSlice";
import { Category, Options, Variant, createCategory, createProduct } from "./types";
import { v4 as uuidv4 } from 'uuid';
import { apiOptionsSlice, useGetOptionsQuery } from "../../features/user/apiOptionsSlice";
import { useFormik } from "formik";
import { createCategorySchema } from "./Validation/CreateCategoryValidation";
import { useNavigate, useParams } from "react-router-dom";



export interface EditCategoryDTO{
    categoryId: number,
    name: string,
    optionsIds:number[]
}


const EditCategory=()=> {
    var [editCategory,{}] = apiCategorySlice.useEditCategoryMutation();

    var params = useParams();

    const {data:categories,isSuccess} = useGetCategoriesQuery();
    const [showServerErrorLogin, setServerErrorLogin] = useState(false);
    var navigate = useNavigate();
    // const [getOptions,{}] = apiOptionsSlice.useGetOptionsByCategoryIdToCreateProductMutation();
    const {data:options}:{data:Options[]} = useGetOptionsQuery();
    // var [options,setOptions] = useState<Options[]>();

    // const {data:options,isSuccess:isOptionsSuccess} = useGetOptionsQuery() as {
    //   data: Options[];
    //   isSuccess: boolean;
    // };

    const formik = useFormik({
      initialValues: {
        name: '',
      },
      validationSchema:createCategorySchema,
      onSubmit: values => {

        var canCreate:boolean=true;

        var optionsIds:number[] = [];
  
        inputIds.forEach(id=>optionsIds.push(parseInt(id)));
        
        if(canCreate)
        {
            var editCategoryRequest:EditCategoryDTO = {
              name: values.name,
              categoryId: parseInt(params.categoryId!),
              optionsIds: optionsIds
            };
        
            var err = editCategory(editCategoryRequest);
        
            err.then((res:any)=>{
              console.log(res.data.message);
              setServerErrorLogin(res.data.message);
              if(res.data.isSuccess)
              {
                navigate("/admin/categories");
              }
            })
      
        }

        navigate("/admin/categories");
      
      },
    });

    const handleCreate=(data:React.FormEvent<HTMLFormElement>)=>{

      data.preventDefault();
     
    }


    useEffect(()=>{
        // console.log(inputIds);
        // handleOptionsByCategoryId(parseInt(params.categoryId!));
    },[])

  const [divContent, setDivContent] = useState<JSX.Element[]>([]);
  const [inputValues, setInputValues] = useState<string[]>([]);
  const [inputIds, setInputIds] = useState<string[]>([]);
  const [optionsIds, setOptionsIds] = useState<number>(0);

  if(inputIds != null)
  {
    console.log("inputIds")
    console.log(inputIds)
  }
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
        <p>{options?.find(opt=>opt.id==value)?.title} </p>
        <div className="flex">

        <div className='rounded-full flex flex-col w-full'>
        <select name='Category' id={value.toString()} className=' bg-yellowForInputs text-[15px] mediumFont outline-none rounded-full h-10 pl-3 pr-3 bg-slate-100'>
          <option>-</option>
          {/* {companys.data.map} */}
          {isSuccess ? options?.find(opt=>opt.id==value)?.variants.map((a:Variant)=>{return <option value={a.id} key={a.id}>{a.title}</option>;}) : ""}
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

//   const handleOptionsByCategoryId=async(categoryId:number)=>{
//     if(Number.isInteger(categoryId))
//     {
//       setDivContent([]);
//       var res = await getOptions({id:categoryId});
//       res.data.map((opt:Options)=>
//       {
//         console.log(opt);
//       })
//       setOptions(res.data);
//     }
//   }
    
    return <>
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
           EDIT CATEGORY
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST" onSubmit={formik.handleSubmit}>
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
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
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
                      {options?.map((a:Options)=>{return <option value={a.id} key={a.id}>{a.title}</option>;})}
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
  
  export default EditCategory;
  