import { useEffect, useRef, useState } from "react";
import { useGetCategoriesQuery } from "../../features/user/apiCategorySlice";
import { apiProductSlice } from "../../features/user/apiProductSlice";
import { Category, createProduct, Options, Variant, VariantDTO } from "./types";
// import ReactQuill from "react-quill";
// import 'react-quill/dist/quill.snow.css';
import { apiOptionsSlice, useGetAllBaseOptionsAsyncQuery, useGetOptionsQuery } from "../../features/user/apiOptionsSlice";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { UserState } from "../../features/user/user-slice";
import { Orders } from "../../features/user/ordersStateSlice";
import { useFormik } from "formik";
import { createProductSchema } from "./Validation/ProductCreateValidation";
import EditorComponent from "./EditorComponent";
import { getFileExtension, toBase64 } from "../ImageConvert/imageConvert";


interface createProductValues{
  name: string,
  price: number,
  discount: number,
  description: string,
  quantity: number,
  isInTheStock: boolean,
  numberOfDaysForDelivery: number,
  address: string,
}

const CreateProduct=()=> {
  const [value, setValue] = useState('');
  const editorRef:any = useRef(null);  

    var [createProduct,{}] = apiProductSlice.useCreateProductMutation();
    var [imagesToShow,setImagesToShow] = useState([]);
    var [filesToSend,setFilesToSend] = useState([]);

    var navigate = useNavigate();
    const [getOptions,{}] = apiOptionsSlice.useGetOptionsByCategoryIdToCreateProductMutation();

    const {data:categories,isSuccess} = useGetCategoriesQuery();
    var user = useAppSelector(((state: { user: UserState; orders: Orders })=>state.user.user));

    // const {data:options,isSuccess:isOptionsSuccess} = useGetOptionsQuery() as {
    //   data: Options[];
    //   isSuccess: boolean;
    // };
    var [options,setOptions] = useState<Options[]>();

    const { data: baseOptions }:{data:Options[]} = useGetAllBaseOptionsAsyncQuery();

    // console.log(options);

    var [getLinksFromServer,{}]= apiProductSlice.useGetLinksForProductMutation();


    const formik = useFormik<createProductValues>({
      initialValues: {
        name: '',
        isInTheStock:false,
        price: 0,
        discount: 0,
        description: '',
        quantity: 0,
        numberOfDaysForDelivery: 0,
        address: ''
      },
      validationSchema:createProductSchema,
      onSubmit: values => {
        console.log("values");

      

      var e:any = document.getElementById("Category");
      var description:any = document.getElementById("description");
      
      console.log(description);
      
      var categoryId = e.value;
      
      var canCreate:boolean=true;

      var variantsIds:VariantDTO[] = [];

      inputIds.forEach(id=>{
        var e:any = document.getElementById(id);
        if(Number.isInteger(Number(e.value)))
        {
          variantsIds.push({id:parseInt(e.value)})
        }
        else
        {
          canCreate=false;
          console.log("Not all selected field was filled!!");
        }
      });

      if(imagesToShow.length <=0)
      {
        console.log("Виберіть хоча б одну картинку!!");
        setServerErrorLogin("Виберіть хоча б одну картинку!!");
        canCreate=false;
      }

      if(categoryId == '-')
      {
        console.log("Виберіть категорію товару!!");
        setServerErrorLogin("Виберіть категорію товару!!");
        canCreate=false;
      }

      if(variantsIds.length<=0 )
      {
        console.log("Виберіть принаймні один варіант, якщо ви хочете використовувати власні варіанти, вам потрібно створити варіант і додати його до своєї категорії!!");
        setServerErrorLogin("Виберіть принаймні один варіант, якщо ви хочете використовувати власні варіанти, вам потрібно створити варіант і додати його до своєї категорії!!");

        canCreate=false;
      }

      if(canCreate)
      {
        setServerErrorLogin("");

        console.log("YES U CAN");
        console.log("res");

        console.log(values);

        var {files}:any = document?.getElementById("Images");

        var imagesBytes = [];

      
        for(var it =0;it<files.length;it++){
          imagesBytes.push(files[it]);
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


        var variantsIds:VariantDTO[] = [];

        inputIds.forEach(id=>{
          var e:any = document.getElementById(id);
          variantsIds.push({id:parseInt(e.value)})
          });

        console.log(variantsIds);

        Promise.all(promises).then((imagesBytes_toSend) => {
          var newProduct: createProduct = {
            name: values.name,
            price: values.price,
            discount: values.discount,
            description: editorRef.current.getContent(),
            quantity: values.quantity,
            isInTheStock: values.isInTheStock,
            numberOfDaysForDelivery: values.numberOfDaysForDelivery,
            address: values.address,
            categoryId: categoryId,
            images_: imagesBytes_toSend,
            Variants_:variantsIds,
            userId:Number(user.id),
          };
          console.log(newProduct);
        
          var err = createProduct(newProduct);
          console.log("res");

          err.then((res:any)=>{
            console.log(res);
            if(res.data == null)
            {
              console.log(res.error.data.message);
              setServerErrorLogin(res.error.data.message);
            }
            else
            {
              console.log(res.data.message);
              console.log(res.data.message);
              setServerErrorLogin(res.data.message);
            }
            
            if(res?.data?.isSuccess)
            {
              navigate(-1);
            }
          })

        });

      }
      // navigate("/products");
  
      },
  });

  
  const [showServerErrorLogin, setServerErrorLogin] = useState("");



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

  const handleOptionsByCategoryId=async(categoryId:number)=>{
    if(Number.isInteger(categoryId))
    {
      setDivContent([]);
      var res = await getOptions({id:categoryId});
      var allOptions = res.data;
      setOptions(allOptions);
      baseOptions.forEach(element => {
        setOptions((prev)=>[...prev!,element]);
        console.log(element);
      });
    }
    
  }
  
  const [divContent, setDivContent] = useState<JSX.Element[]>([]);
  const [inputValues, setInputValues] = useState<string[]>([]);
  const [inputIds, setInputIds] = useState<string[]>([]);
  const [optionsIds, setOptionsIds] = useState<number>(0);

  const addElement = () => {
    var e:any = document.getElementById("OptionsTitle");
    var value:number = e.value;
    console.log(e);
    console.log("options");
    console.log(options);
    if(e.value != "-")
    {
    const newElement = (
      <div key={value} >
        <p>{options?.find(opt=>opt?.id==value)?.title} </p>
        <div className="flex">

        <div className='rounded-full flex flex-col w-full'>
        <select name='Category' id={value.toString()} className=' bg-yellowForInputs text-[15px] mediumFont outline-none rounded-full h-10 pl-3 pr-3 bg-slate-100'>
          <option>-</option>
          {/* {companys.data.map} */}
          {isSuccess ? options?.find(opt=>opt?.id==value)?.variants.map((a:Variant)=>{return <option value={a.id} key={a.id}>{a.title}</option>;}) : ""}
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
      if(tmp?.id == value)
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


  useEffect(()=>{
    // console.log(options);
    if(baseOptions && options == null)
      setOptions(baseOptions);

  },[options,baseOptions])
    
    return <>
    <div className="flex flex-col justify-center px-6 py-12 lg:px-8">
      <div className=" bg-slate-50 p-10 w-6/12 m-auto">

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          
          <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
           CREATE PRODUCT
          </h2>
        </div>

        <div className="mt-10 ">
          <form className="space-y-6" onSubmit={formik.handleSubmit}>
            
            <div className="flex">
              <div className=" w-full  mr-1">
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                  Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    autoComplete="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    required
                    className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {formik.errors.name ? <div className=' text-red-500 text-sm font-semibold'>{formik.errors.name}</div> : null}

                </div>
              </div>
  
              <div className=" w-full ml-1">
                <label htmlFor="discount" className="block text-sm font-medium leading-6 text-gray-900">
                  Discount
                </label>
                <div className="mt-2">
                  <input
                    id="discount"
                    name="discount"
                    type="number"
                    autoComplete="discount"
                    onChange={formik.handleChange}
                    value={formik.values.discount}
                    required
                    className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {formik.errors.discount ? <div className=' text-red-500 text-sm font-semibold'>{formik.errors.discount}</div> : null}

                </div>
              </div>
            </div>
            


            <div className="flex">
            <div className=" w-full mr-1">
              <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                Price
              </label>
              <div className="mt-2">
                <input
                  id="price"
                  name="price"
                  autoComplete="price"
                  onChange={formik.handleChange}
                  value={formik.values.price}
                  required
                  className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {formik.errors.price ? <div className=' text-red-500 text-sm font-semibold'>{formik.errors.price}</div> : null}

              </div>
            </div>

            <div  className=" w-full ml-1">
              <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                Address
              </label>
              <div className="mt-2">
                <input
                  id="address"
                  name="address"
                  autoComplete="address"
                  onChange={formik.handleChange}
                  value={formik.values.address}
                  required
                  className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {formik.errors.address ? <div className=' text-red-500 text-sm font-semibold'>{formik.errors.address}</div> : null}
              </div>
            </div>
            </div>


            <div className="flex">
            <div className=" w-full mr-1">
              <label htmlFor="quantity" className="block text-sm font-medium leading-6 text-gray-900">
                Quantity
              </label>
              <div className="mt-2">
                <input
                  id="quantity"
                  name="quantity"
                  type="number"
                  autoComplete="quantity"
                  onChange={formik.handleChange}
                  value={formik.values.quantity}
                  required
                  className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {formik.errors.quantity ? <div className=' text-red-500 text-sm font-semibold'>{formik.errors.quantity}</div> : null}
              </div>
            </div>

            <div className=" w-full ml-1">
              <label htmlFor="numberOfDaysForDelivery" className="block text-sm font-medium leading-6 text-gray-900">
                Number Of Days For Delivery
              </label>
              <div className="mt-2">
                <input
                  id="numberOfDaysForDelivery"
                  name="numberOfDaysForDelivery"
                  type="number"
                  autoComplete="numberOfDaysForDelivery"
                  onChange={formik.handleChange}
                  value={formik.values.numberOfDaysForDelivery}
                  required
                  className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {formik.errors.numberOfDaysForDelivery ? <div className=' text-red-500 text-sm font-semibold'>{formik.errors.numberOfDaysForDelivery}</div> : null}
              </div>
            </div>
            </div>


            

            <div className=" w-full ml-1">
              <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                Description
              </label>
              <div className="mt-2">
                {/* <textarea
                  id="description"
                  name="description"
                  autoComplete="description"
                  required
                  onChange={}
                  value={}
                  className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                /> */}
                <EditorComponent editorRef={editorRef} />
                {formik.errors.description ? <div className=' text-red-500 text-sm font-semibold'>{formik.errors.description}</div> : null}
              </div>

            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                Category
              </label>


              <div className='rounded-full flex flex-col mb-4  pr-3'>
                  <select onChange={(E)=>handleOptionsByCategoryId(parseInt(E.currentTarget.value))} name='Category' id="Category" className=' bg-yellowForInputs text-[15px] mediumFont outline-none rounded-full h-10 pl-3 pr-3'>
                    <option>-</option>
                    {/* {companys.data.map} */}
                    {isSuccess ? categories.payload?.map((a:Category)=>{return <option value={a.id} key={a.id}>{a.name}</option>;}) : ""}
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

            
            <div className="mt-10 space-y-10">
                <fieldset>
                  <div className="mt-6 space-y-6">
                    <div className="relative flex gap-x-3">
                      <div className="flex h-6 items-center">
                        <input
                          id="isInTheStock"
                          name="isInTheStock"
                          onChange={formik.handleChange}
                          checked={formik.values.isInTheStock}
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                      </div>
                      <div className="text-sm leading-6">
                        <label htmlFor="isInTheStock" className="font-medium text-gray-900">
                            A product is in the stock
                        </label>
                        <p className="text-gray-500">If the product is available for purchase</p>
                      </div>
                    </div>

                  </div>
                </fieldset>
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
            {showServerErrorLogin ? <div className=' text-red-500 font-semibold'>{showServerErrorLogin}</div> : null}
          </form>

          
        </div>
      </div>

      </div>
    </>;
  }
  
  export default CreateProduct;
  