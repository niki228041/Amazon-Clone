import { useState } from "react";
import { useGetCategoriesQuery } from "../../features/user/apiCategorySlice";
import { apiProductSlice } from "../../features/user/apiProductSlice";
import { Category, createProduct } from "./types";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

const CreateProduct=()=> {
  const [value, setValue] = useState('');
    
    var [createProduct,{}] = apiProductSlice.useCreateProductMutation();
    var [imagesToShow,setImagesToShow] = useState([]);
    var [filesToSend,setFilesToSend] = useState([]);

    const {data:categories,isSuccess} = useGetCategoriesQuery();

    var [getLinksFromServer,{}]= apiProductSlice.useGetLinksForProductMutation();


    const handleCreate=async (data:React.FormEvent<HTMLFormElement>)=>{
      data.preventDefault();

      var curentData = new FormData(data.currentTarget);

      var e:any = document.getElementById("Category");
      var categoryId = e.value;
      
      var name = curentData?.get("name")?.toString()!;
      var price = parseFloat(curentData?.get("price")?.toString()!);
      var discount = parseInt(curentData?.get("discount")?.toString()!);
      var description = value;
      var quantity = parseInt(curentData?.get("quantity")?.toString()!);
      var isInTheStock = curentData?.get("isInTheStock");
      var numberOfDaysForDelivery = parseInt(curentData?.get("numberOfDaysForDelivery")?.toString()!);
      var address = curentData?.get("address")?.toString()!;

      var isInTheStock_bool = true;
      
      if(isInTheStock == null)
      isInTheStock_bool = false;

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

      console.log(filesToSend);

      Promise.all(promises).then((imagesBytes_toSend) => {
        var newProduct: createProduct = {
          name: name,
          price: price,
          discount: discount,
          description: description,
          quantity: quantity,
          isInTheStock: isInTheStock_bool,
          numberOfDaysForDelivery: numberOfDaysForDelivery,
          address: address,
          categoryId: categoryId,
          images_: imagesBytes_toSend
        };
        console.log(newProduct);
      
        createProduct(newProduct);
      });

  }

  const toBase64:any = (file:File) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);

  });

  function getFileExtension(filename:any){
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


    // let byte_img = toBase64(files[0]);
    //       byte_img.then((res: any) => {
    //         let res_byte_img = res.split(',')[1];
    //         // let ext = getFileExtension(img.name);
    //         console.log(res_byte_img);
            
    //         // resolve({ data: res_byte_img, extension: ext });
    //         // resolve({ data: res_byte_img, extension: ext });
    //       });
    // // var response = await getLinksFromServer({images:images});

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
    
    return <>
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-500/40">
      <div className=" bg-slate-50 p-10 w-6/12 m-auto">

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          
          <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
           CREATE PRODUCT
          </h2>
        </div>

        <div className="mt-10 ">
          <form className="space-y-6" action="#" method="POST" onSubmit={handleCreate}>
            
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
                    required
                    className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
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
                    required
                    className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
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
                  required
                  className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
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
                  required
                  className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
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
                  required
                  className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
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
                  required
                  className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
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
                  className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                /> */}
              <ReactQuill theme="snow" value={value} onChange={setValue} />
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
    </>;
  }
  
  export default CreateProduct;
  