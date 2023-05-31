import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGetProductsQuery } from '../features/user/apiProductSlice';
import img from '../images/t-shirt-png.webp'
import { useParams} from 'react-router-dom'

const Category=(data:any)=>{

  return(
  <Link key={data.id} to={"/product/" + data.id}>
    <div className=' pb-2 hover:bg-slate-300 mt-20'>
      <div>
        <img src={img} className=' ' />        
      </div>
      <div className='p-1'>
        <p className=' text-sm'>432.44$</p>
        {data.name}
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