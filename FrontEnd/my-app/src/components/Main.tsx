import {useEffect,useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGetProductsQuery } from '../features/user/apiProductSlice';
import img from '../images/t-shirt-png.webp'
import { useParams} from 'react-router-dom'
import star from "../images/Gold_Star.png"
import { Product, categorySequence } from './types';
import { apiCategorySlice, useGetCategoriesQuery, useGetMainCategoriesQuery } from '../features/user/apiCategorySlice';

const Product_Component=(data:Product)=>{

  return<>
  <div >
  <Link to={"/product/" + data.id}>
    <div className='pb-2 px-3 mt-20 w-full'>
      <div>
          <div className='w-full h-[200px]' style={{ backgroundImage: `url(${'data:image/gif;base64,' + data?.image})`,backgroundPosition:"center",backgroundSize:"cover"}}>

          </div>
          {/* <img src={data?.image ? "data:image/png;base64," + data?.image : img} className=' w-full h-[100px] ' />         */}
        </div>
        <div className='p-1 '>
          <div className=' max-h-[60px] overflow-hidden '>
            <p className='text-blue-950 text-sm hover:text-red-700 cursor-pointer hover:underline '>
              {data.name}
            </p>
          </div>

          <div className='flex'>
            <img className='h-4' src={star}/>
            <img className='h-4' src={star}/>
            <img className='h-4' src={star}/>
            <img className='h-4' src={star}/>
            <span className='ml-1 text-blue-950 hover:text-red-700 cursor-pointer hover:underline text-[12px] font-medium'>144</span>
          </div>
          <p className='text-sm text-red-700 font-medium'>$ {data.price}</p>
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


  var [categoriesToView,setCategoriesToView] = useState([]);

  var [categoriesSequence,setCategoriesSequence] = useState<categorySequence[]>([]);
  

  useEffect(()=>{
    if(categories)
      setCategoriesToView(categories.payload);
    
    console.log("categoriesToView");
    console.log(categoriesToView);
    
  },[categories])


  const changeCategory=async(id:number,name:string)=>{
    let response:any = await getSubcategories({id:id});
    console.log(id);
    console.log("RESPONSE:");
    console.log(response.data.payload.subcategories);

    if(response.data.payload.subcategories.length != 0){
      setCategoriesToView(response.data.payload.subcategories);

      const newCategoriesSequence = [...categoriesSequence];

      const index = newCategoriesSequence.findIndex((category) => category.id === id);
      if (index !== -1) {
        newCategoriesSequence.splice(index + 1);
        setCategoriesSequence(newCategoriesSequence);
      }
      else
      {
        newCategoriesSequence.push({id:id,name:name});
        setCategoriesSequence(newCategoriesSequence);
      }

      console.log(newCategoriesSequence);
    }
  }

  const setMainCategories=async()=>{
    setCategoriesToView(categories.payload);
    setCategoriesSequence([]);
  }

  return (
    <div className='flex p-2 '>
      
      <div className='whitespace-nowrap pl-2 pr-2 mt-2'>

        <div>
          <h1 className='text-[30px] font-bold'>
          Best Sellers
          </h1>
        </div>

        <div className='ml-3 mt-10'>
          <div onClick={()=>{setMainCategories()}} className='font-medium text-sm cursor-pointer'>All Categories</div>

          <div className='ml-1 font-medium text-sm'>
          {categoriesSequence ? categoriesSequence.map((category:any,id:number) => (
            <div className=' cursor-pointer hover:underline' style={{marginLeft:id*6}} onClick={()=>{changeCategory(category.id,category.name)}} key={category.id}>{category.name}</div>
          )) : ""}
          </div>

          <div className='ml-3 text-sm'>
            {categoriesToView.map((category:any) => (
              <div className=' cursor-pointer hover:underline' onClick={()=>{changeCategory(category.id,category.name)}} key={category.id}>{category.name}</div>
            ))}
          </div>
        </div>
        
        {/* idk */}
        {/* {isSuccessCategory ? categories.payload.map((a:any,id:number)=>{return <div key={id}>
          <div className='text-blue-950 cursor-pointer hover:underline'>{a.name}</div>
          <div className='ml-2'>
            {a.subcategories?.map((sub:any,id:number)=>{return <p key={id} onClick={()=>{toNextCategory(sub.id)}} className='text-blue-950 cursor-pointer hover:underline'>{sub.name}</p>  })}
          </div>
          { fetchedSubcategories ? fetchedSubcategories.map((sub:any,id:number)=>{return <div key={id}>{sub.name}</div>}) : "g"}
        
        
        </div> }) : ""} */}




          {/* <div className='text-blue-950 cursor-pointer hover:underline'>sdfds</div> */}
      </div>
        
      
    <div className='grid grid-cols-6 gap-1 pr-44 pl-24 w-full'>

      {/* grid */}
      
      
      {isSuccess ? data?.payload?.map((a:any,id:number)=>{return <div key={id}>{Product_Component(a)}</div>  }): ""}



    </div>
    </div>
)
}

export default Main