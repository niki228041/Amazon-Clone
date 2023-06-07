import { useGetCategoriesQuery } from "../../features/user/apiCategorySlice";
import { apiProductSlice } from "../../features/user/apiProductSlice";
import { Category, createProduct } from "./types";

const CreateProduct=()=> {

    
    var [createProduct,{}] = apiProductSlice.useCreateProductMutation();

    const {data:categories,isSuccess} = useGetCategoriesQuery();

    const handleCreate=(data:React.FormEvent<HTMLFormElement>)=>{

      data.preventDefault();
      var curentData = new FormData(data.currentTarget);

      var e:any = document.getElementById("Category");
      var categoryId = e.value;
      
      var name = curentData?.get("name")?.toString()!;
      var price = parseFloat(curentData?.get("price")?.toString()!);
      var discount = parseInt(curentData?.get("discount")?.toString()!);
      var description = curentData?.get("description")?.toString()!;
      var quantity = parseInt(curentData?.get("quantity")?.toString()!);
      var isInTheStock = curentData?.get("isInTheStock");
      var numberOfDaysForDelivery = parseInt(curentData?.get("numberOfDaysForDelivery")?.toString()!);
      var address = curentData?.get("address")?.toString()!;

      var isInTheStock_bool = true;
      
      if(isInTheStock == null)
      isInTheStock_bool = false;

      

      
      var newProduct:createProduct = {
        name:name,
        price: price,
        discount: discount,
        description: description,
        quantity: quantity,
        isInTheStock: isInTheStock_bool,
        numberOfDaysForDelivery: numberOfDaysForDelivery,
        address: address,
        categoryId:categoryId
      };

      console.log(newProduct);

      createProduct(newProduct);

      // if(file.size.length < 7) return `${Math.round(file.size/1024).toFixed(2)}kb`
      //     var sizeInMb = `${(Math.round(file.size.toString()/1024)/1000).toFixed(2)}MB`;
      

      // var re:any = /(?:\.([^.]+))?$/;
      // var ext = re.exec(file.name)[1];


      // var e:any = document.getElementById("Company");
      // var companyId = e.value;

      // var fileBytes = toBase64(file);

      // var imagesBytes = [];
      // var imagesBytes_toSend:any = [];
      
      // for(var it =0;it<files.length;it++){
      //   imagesBytes.push(files[it]);
      // } 



      // imagesBytes.forEach((img:any)=>{
      //   let byte_img = toBase64(img);
      //   byte_img.then((res:any)=>{
      //     var res_byte_img = res.split(',')[1];
      //     imagesBytes_toSend.push({Data:res_byte_img,extension:'.' + getFileExtension(img.name)});
      //   })
      // })
      

      // fileBytes.then((res:any)=>{
      //     var bytesToRequest = res.split(',')[1];
      //     let newAsset:INewAsset = {
      //         name:Name,
      //         inWhichPrograms:InWhichPrograms,
      //         licenseType:LicenseType,
      //         extension:ext,uploadDate: new Date(Date.now()),
      //         userId:user.data.id,
      //         companyId:companyId,
      //         data:bytesToRequest,
      //         size:sizeInMb,
      //         price:Price,
      //         version:Version,
      //         images_:imagesBytes_toSend
      //     };
      //     console.log(newAsset);

      //     createProduct(newAsset);
      // })



      
  }
    
    return <>
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
           CREATE PRODUCT
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

            <div>
              <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                Price
              </label>
              <div className="mt-2">
                <input
                  id="price"
                  name="price"
                  type="number"
                  autoComplete="price"
                  required
                  className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                Description
              </label>
              <div className="mt-2">
                <input
                  id="description"
                  name="description"
                  autoComplete="description"
                  required
                  className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
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

            <div>
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

            <div>
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
    </>;
  }
  
  export default CreateProduct;
  