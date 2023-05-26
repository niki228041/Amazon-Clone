import React from 'react';
import { Link } from 'react-router-dom';
import { useGetProductsQuery } from '../features/user/apiProductSlice';


const Category=(data:any)=>{

  return<>
  <div className=' bg-slate-200 rounded-xl p-2 hover:bg-slate-300'>
    {data.name}
  </div>
  </>
}

const Main=()=>{

const {data,isSuccess,error} = useGetProductsQuery();
console.log(data);
console.log(error);

return (
  <div className='flex flex-col '>
      <div className='w-full flex justify-center'>

          {/* grid */}
          <div className='grid lg:grid-cols-6 gap-x-16 gap-y-28 sm:grid-cols-3 mt-11 text-sm'>
              {isSuccess ? data?.payload?.map((a:any)=>{return Category(a) }): ""}
          </div>

      </div>
      
  </div>

)
}

export default Main