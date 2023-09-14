import { useState } from "react";
import { apiCategorySlice, useGetCategoriesQuery } from "../../features/user/apiCategorySlice";
import { apiProductSlice } from "../../features/user/apiProductSlice";
import { Category, Options, Variant, createCategory, createProduct } from "./types";
import { v4 as uuidv4 } from 'uuid';
import { useGetOptionsQuery } from "../../features/user/apiOptionsSlice";
import { useFormik } from "formik";
import { createCategorySchema } from "./Validation/CreateCategoryValidation";
import { useNavigate } from "react-router-dom";



const CreateCategory = () => {
  var [createCategory, { }] = apiCategorySlice.useCreateCategoryMutation();

  var [filesToSend, setFilesToSend] = useState([]);
  var [imagesToShow,setImagesToShow] = useState([]);

  var [getLinksFromServer,{}]= apiCategorySlice.useGetLinksForCategoryMutation();

  const { data: categories, isSuccess } = useGetCategoriesQuery();
  const [showServerErrorLogin, setServerErrorLogin] = useState(false);
  var navigate = useNavigate();

  const { data: options, isSuccess: isOptionsSuccess } = useGetOptionsQuery() as {
    data: Options[];
    isSuccess: boolean;
  };

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: createCategorySchema,
    onSubmit: values => {

      var e: any = document.getElementById("Category");
      var categoryId = e.value;
      var canCreate: boolean = true;



      var optionsIds: number[] = [];

      inputIds.forEach(id => optionsIds.push(parseInt(id)));

      if (e.value == "-") {
        categoryId = 0;
      }

      if (optionsIds.length <= 0) {
        console.log("Select at least 1 Option");
        canCreate = false;
      }
      const promises = filesToSend.map((img: any) => {
        return new Promise((resolve) => {
          let byte_img = toBase64(img);
          byte_img.then((res: any) => {
            let res_byte_img = res.split(',')[1];
            let ext = getFileExtension(img.name);

            resolve({ data: res_byte_img, extension: ext });
          });
        });
      });
      if (canCreate) {

        Promise.all(promises).then((imagesBytes_toSend) => {
          var newCategory: createCategory = {
            name: values.name,
            categoryId: categoryId,
            optionsIds: optionsIds,
            images_: imagesBytes_toSend
          };
          console.log(newCategory);

          var err = createCategory(newCategory);
          console.log("res");

          err.then((res: any) => {
            console.log(res);
            if (res.data == null) {
              console.log(res.error.data.message);
              setServerErrorLogin(res.error.data.message);
            }
            else {
              console.log(res.data.message);
              console.log(res.data.message);
              setServerErrorLogin(res.data.message);
            }

            if (res.data.isSuccess) {
              navigate("/admin/categories");

            }
          })

        });


        var { files }: any = document?.getElementById("Images");

        var imagesBytes = [];


        for (var it = 0; it < files.length; it++) {
          imagesBytes.push(files[it]);
        }
      }


    },
  });
  const toBase64: any = (file: File) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);

  });

  function getFileExtension(filename: any) {
    // get file extension
    const extension = "." + filename.split('.').pop();
    return extension;
  }
  const handleDeleteImg=(img:any)=>{
    var index = imagesToShow.findIndex((img_:any)=>img_==img);
    var imagesToShow_tmp = imagesToShow.filter((img_:any)=>{return img_!=img});
    setImagesToShow(imagesToShow_tmp);

    setFilesToSend(filesToSend.filter((file:any)=>{return filesToSend.findIndex((file_2:any)=>file_2 == file) != index}));
  }

  const HandleFileSelection = async (event:any)=>{
    const files = event.target.files;

    console.log(files);

    var imagesBytes:any = [];
    for(var it = 0;it<files.length;it++){
      imagesBytes.push(files[it]);
    } 
    setFilesToSend(imagesBytes);
    console.log("files_to_send");
    console.log(filesToSend);

    const promises = imagesBytes.map((img: any) => {
      return new Promise((resolve) => {
          let byte_img = toBase64(img);
          byte_img.then((res: any) => {
          let res_byte_img = res.split(',')[1];
          let ext = getFileExtension(img.name);
          
          resolve(res_byte_img);
        });
      });
    });

    try {
      const imagesBytes_toSend = await Promise.all(promises);
      console.log(imagesBytes_toSend);
      var response = await getLinksFromServer({ images: imagesBytes_toSend });
      setImagesToShow(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }

    // console.log(response?.data);
  }

  const handleCreate = (data: React.FormEvent<HTMLFormElement>) => {

    data.preventDefault();

  }



  const [divContent, setDivContent] = useState<JSX.Element[]>([]);
  const [inputValues, setInputValues] = useState<string[]>([]);
  const [inputIds, setInputIds] = useState<string[]>([]);
  const [optionsIds, setOptionsIds] = useState<number>(0);
  console.log(options);

  const addElement = () => {
    var e: any = document.getElementById("OptionsTitle");
    var value: number = e.value;
    console.log(value);
    if (e.value != "-") {
      var id = uuidv4();
      const newElement = (
        <div key={value.toString()} >
          <p>{options.find(opt => opt.id == value)?.title} </p>
          <div className="flex">

            <div className='rounded-full flex flex-col w-full'>
              <select name='Category' id={value.toString()} className=' bg-yellowForInputs text-[15px] mediumFont outline-none rounded-full h-10 pl-3 pr-3 bg-slate-100'>
                <option>-</option>
                {/* {companys.data.map} */}
                {isSuccess ? options.find(opt => opt.id == value)?.variants.map((a: Variant) => { return <option value={a.id} key={a.id}>{a.title}</option>; }) : ""}
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
      var canBeCreated: boolean = true;

      for (let index = 0; index < inputIds.length; index++) {
        var tmp: any = document.getElementById(inputIds[index]);
        console.log("tmp");
        if (tmp.id == value) {
          canBeCreated = false;
        }
        // request.variants.push(Variant);
      }

      if (canBeCreated) {
        setDivContent(prevContent => [...prevContent, newElement]);
        setInputIds(prevContent => [...prevContent, value.toString()]);
      }
    }
  };

  const handleDeleteNewVariant = (id: string) => {
    setDivContent(prevContent => prevContent.filter(element => element.key !== id));
    setInputIds(prevContent => prevContent.filter(element => element !== id));
  };

  const handelCreateNewVariant = () => {
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

          <div>
            <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
              Category
            </label>

            <div className='rounded-full flex flex-col mb-4  pr-3'>
              <select name='Category' id="Category" className=' bg-yellowForInputs text-[15px] mediumFont outline-none rounded-full h-10 pl-3 pr-3'>
                <option>-</option>
                {/* {companys.data.map} */}
                {isSuccess ? categories.payload?.map((a: Category) => { return <option value={a.id} key={a.id}>{a.name}</option>; }) : ""}
              </select>
            </div>
          </div>

          <div className=' rounded-full flex flex-col mb-4'>
              <span>Select Images</span>
      

              <input onChange={HandleFileSelection} name="Images" id="Images" multiple type="file" className='hidden' />
              <label htmlFor='Images' className=' bg-yellowForInputs hover:opacity-90 text-[15px] mediumFont outline-none rounded-full h-10 pl-3 pr-3 flex justify-center items-center cursor-pointer' >
                  Upload Images
              </label>
            </div>
            Click to delete image
            <div className="grid grid-cols-5 gap-5 transition-all">
              {imagesToShow.map((img:any,it:any)=><div onClick={()=>{handleDeleteImg(img)}} key={it} className="h-20 w-full  bg-contain bg-no-repeat rounded-xl hover:scale-[1.05] transition-all" style={{ backgroundImage:"url("+img+")", backgroundPosition:"center"}}>

              </div>)}
            </div>

          <div className="flex">
            <div className=" w-full mr-1">
              <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                Options
              </label>
              <div id="variants" className="mt-2 flex">
                <div className="w-10 cursor-pointer flex justify-center self-center" onClick={() => handelCreateNewVariant()}>
                  +
                </div>
                <div className='rounded-full flex flex-col w-full'>
                  <select name='OptionsTitle' id="OptionsTitle" className=' bg-yellowForInputs text-[15px] mediumFont outline-none rounded-full h-10 pl-3 pr-3 bg-slate-100'>
                    <option>-</option>
                    {/* {companys.data.map} */}
                    {isOptionsSuccess ? options.map((a: Options) => { return <option value={a.id} key={a.id}>{a.title}</option>; }) : ""}
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
