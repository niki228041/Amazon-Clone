import { apiCategorySlice, useGetCategoriesQuery } from "../../features/user/apiCategorySlice";
import { apiProductSlice } from "../../features/user/apiProductSlice";
import { Category, createCategory, createProduct } from "./types";

const CreateCategory=()=> {
    var [createCategory,{}] = apiCategorySlice.useCreateCategoryMutation();

    const {data:categories,isSuccess} = useGetCategoriesQuery();

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

      

      
      var newCategory:createCategory = {
        name:name,
        categoryId:categoryId
      };

      console.log(newCategory);
      createCategory(newCategory);
  }
    
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
  