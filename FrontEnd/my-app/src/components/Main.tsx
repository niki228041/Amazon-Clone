import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGetProductsQuery } from '../features/user/apiProductSlice';
import img from '../images/t-shirt-png.webp'
import { useParams} from 'react-router-dom'
import star from "../images/Gold_Star.png"

const Category=(data:any)=>{

  return(
  <Link key={data.id} to={"/product/" + data.id}>
    <div className='pb-2 mt-20'>
      <div>
        <img src={img} className=' ' />        
      </div>
      <div className='p-1'>
        <p className='text-blue-950 hover:text-red-700 cursor-pointer hover:underline '>
          {data.name}
        </p>
        <div className='flex'>
          <img className='h-4' src={star}/>
          <img className='h-4' src={star}/>
          <img className='h-4' src={star}/>
          <img className='h-4' src={star}/>
          <span className='ml-1 text-blue-950 hover:text-red-700 cursor-pointer hover:underline text-[12px] font-medium'>144</span>
        </div>
        <p className='text-sm text-red-700 font-medium'>$ 432.44</p>
      </div>
    </div>
  </Link>)
  
}


const Main=()=>{

  // const navigate = useNavigate();
  const {data,isSuccess,error} = useGetProductsQuery();
  console.log(data);
  console.log(error);

return (
    <div className='w-full pl-44 pr-44 grid grid-cols-6 gap-1 '>

      {/* grid */}
      {isSuccess ? data?.payload?.map((a:any)=>{return Category(a) }): ""}


    </div>
)
}

export default Main