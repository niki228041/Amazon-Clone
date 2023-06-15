import {useEffect,useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGetProductsQuery } from '../features/user/apiProductSlice';
import img from '../images/t-shirt-png.webp'
import { useParams} from 'react-router-dom'
import star from "../images/Gold_Star.png"
import { Product } from './types';
import { apiCategorySlice, useGetCategoriesQuery, useGetMainCategoriesQuery } from '../features/user/apiCategorySlice';

const Category=(data:Product)=>{

  return<>
  <div >
  <Link to={"/product/" + data.id}>
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
    </Link>
  </div>
  </>
}


const Main=()=>{

  // const navigate = useNavigate();
  const {data,isSuccess,error} = useGetProductsQuery();
  const {data:categories,isSuccess:isSuccessCategory} = useGetMainCategoriesQuery();
  const [getSubcategories,{}] = apiCategorySlice.useGetAllSubcategoriesByCategoryIdMutation();

  var [fetchedSubcategories,setFetchedSubcategories] = useState([]);
  
  console.log(categories);

  useEffect(()=>{
  },[])

  const toNextCategory= async (id:number)=>{
    let response:any = await  getSubcategories({id:id});
    console.log(id);
    console.log("RESPONSE:");
    console.log(response.data.payload.subcategories);
    setFetchedSubcategories (response.data.payload.subcategories);
  }
  

  return (
    <div className='flex p-2 '>
      <div className='w-full'>
        <div className=' font-medium'>All Categories</div>
        {isSuccessCategory ? categories.payload.map((a:any,id:number)=>{return <div key={id}>
          <div className='text-blue-950 cursor-pointer hover:underline'>{a.name}</div>
          <div className='ml-2'>
            {a.subcategories?.map((sub:any,id:number)=>{return <p key={id} onClick={()=>{toNextCategory(sub.id)}} className='text-blue-950 cursor-pointer hover:underline'>{sub.name}</p>  })}
          </div>
          { fetchedSubcategories ? fetchedSubcategories.map((sub:any,id:number)=>{return <div key={id}>{sub.name}</div>}) : "g"}
        </div> }) : ""}
          {/* <div className='text-blue-950 cursor-pointer hover:underline'>sdfds</div> */}
      </div>
        
      
    <div className=' pl-44 pr-44 grid grid-cols-6 gap-1 '>

      {/* grid */}
      
      
      {isSuccess ? data?.payload?.map((a:any,id:number)=>{return <div key={id}>{Category(a)}</div>  }): ""}



    </div>
    </div>
)
}

export default Main