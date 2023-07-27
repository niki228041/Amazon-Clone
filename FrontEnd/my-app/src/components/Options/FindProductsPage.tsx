import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { apiProductSlice, useGetProductsQuery } from '../../features/user/apiProductSlice';
import { useParams} from 'react-router-dom'
import { ImageLink, Product, categorySequence } from '../types';
import { apiCategorySlice, useGetCategoriesQuery, useGetMainCategoriesQuery } from '../../features/user/apiCategorySlice';
import "../../css/stars.css";
import search from "../../images/search.png";
import '../NumberFieldWithoutArrows.css';
import { VariantDTO } from '../Admin/types';
import { Oval } from  'react-loader-spinner'

interface AllFilters{
  categoryId:number,
  productName:string,
  min_Preis:number,
  max_Preis:number,
  stars:number,
  variants:VariantDTO[]
}


const loader=()=> {
  return(
    <div className='m-auto pt-32'>
    <Oval
      height={80}
      width={80}
      color="#46424f"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel='oval-loading'
      secondaryColor="#424a4f"
      strokeWidth={2}
      strokeWidthSecondary={2}/>
</div>

  )
}

const Product_Component=({ data , productsImages}: { data: Product ,productsImages:ImageLink})=>{
  var stars = 0;

  const handleStarsFunctionality=()=>{
    var sumOfStars = 0;
    data.comments.map(com=>sumOfStars += com.stars);
    stars = Math.round(sumOfStars/(data.comments.length));
  }

  const getStarts=()=>{
    var jsx_stars: JSX.Element[] = [];
    handleStarsFunctionality();
    for(var i = 0;i<5;i++)
    {
      if(i<stars)
      {
        jsx_stars.push(<div key={i} className='star-small h-10 ml-0.5'/>);
      }
      else
      {
        jsx_stars.push(<div key={i} className='empty_star-small h-10 ml-0.5' />);
      }
    }

    return jsx_stars;
  }


  return<>
  <div >
  <Link to={"/product/" + data.id}>
    <div className='pb-2 mt-20 w-full border border-1 border-gray-100 h-[450px]'>
      <div>
          <div className='w-full h-[300px] m-0 py-10' style={{ backgroundImage:"url("+ productsImages?.image +")",backgroundPosition:"center",backgroundSize:"contain",backgroundRepeat:"no-repeat"}}>

            </div>
            {/* <img src={data?.image ? "data:image/png;base64," + data?.image : img} className=' w-full h-[100px] ' />         */}
          </div>
          <div className='p-1 '>
            <div className=' max-h-[70px] overflow-hidden '>
              <p className='text-blue-950 text-md hover:text-red-700 cursor-pointer hover:underline text-center '>
                {data.name}
              </p>
            </div>

          <div className='flex text-center m-auto self-center mt-2 justify-center'>
            <div className='flex'>
            {getStarts()}
            <span className='ml-1 text-blue-950 hover:text-red-700 cursor-pointer hover:underline text-[12px] font-medium'>{data.comments.length}</span>
            </div>

          </div>
          <div className='flex justify-center'>
            <p className='text-[20px] text-red-700 font-medium'>$ {data.price}</p>
          </div>

        </div>
      </div>
    </Link>
  </div>
  </>
}


const PageWithOptions = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const { data, isSuccess, error } = useGetProductsQuery();



  const { data: categories, isSuccess: isSuccessCategory } = useGetMainCategoriesQuery();
  const [getSubcategories, { }] = apiCategorySlice.useGetAllSubcategoriesByCategoryIdMutation();

  const [getProductsByCategory, { }] = apiProductSlice.useGetProductsByCategoryIdMutation();

  const [search_, setSearch] = useSearchParams();

  var request:any=[];
  data?.payload?.forEach((data:any) => {
    request.push({id:data.id});
  });

  const { data: imagesLinks, isSuccess: isSuccessImagesLinks } = apiProductSlice.useGetLinksForProductByProductsIdsQuery(request) as {
    data: ImageLink[];
    isSuccess: boolean;
  };;  

  const navigate = useNavigate();

  const getSearchParams = () => {
    return new URLSearchParams(window.location.search);
  };

  var [categoryId, setcategoryId] = useState(getSearchParams().get('id'));
  var [getProductsByFilter, { isLoading }] = apiProductSlice.useGetProductWithFiltersMutation();



  var [categoriesToView, setCategoriesToView] = useState([]);
  // var allFilters:AllFilters = ({categoryId:-1,min_Preis:-1,max_Preis:-1,stars:-1,variants:[],productName:""});
  var [allFilters,setAllFilters] = useState<AllFilters>({categoryId:-1,min_Preis:-1,max_Preis:-1,stars:-1,variants:[],productName:""});
  var [products, setProducts] = useState([]);

  var [categoriesSequence, setCategoriesSequence] = useState<categorySequence[]>([]);
  var url = `/products?category=${encodeURIComponent("")}`;

  useEffect(()=>{
    if(categories)
      setCategoriesToView(categories?.payload);

    // Отримуємо новий productName з параметрів URL
    const newProductName = getSearchParams().get('productName') || '';
    
    // Перевіряємо, чи змінилось значення productName в параметрах URL
    // console.log("useEffect");
    // console.log(newProductName);
    search_.set("productName",newProductName);
    setSearch(search_);
    funcs();

  }, [categories, categoryId, getSearchParams().get('productName'),search_])

  // console.log(allFilters);

  const funcs = async ()=>{
    var minPrice = Number(search_.get("min-price"));
    if(!Number.isInteger(minPrice)){minPrice=-1;}

    var maxPrice = Number(search_.get("max-price"));
    if(!Number.isInteger(maxPrice)){maxPrice=-1;}
    
    var productName = search_.get("productName")!;
    var stars = Number(search_.get("stars"));
    if(!Number.isInteger(stars)){stars=-1;}

    var filters:AllFilters = {min_Preis:minPrice,max_Preis:maxPrice,productName:productName,stars:stars,categoryId:-1,variants:[]};
    console.log(filters);

    let response: any = await getProductsByFilter(filters);
    console.log("HERE PLS:");
    console.log(response?.data);
    setProducts(response?.data?.payload);
  }

  const getProducts = async () => {
    var id = parseInt(getSearchParams().get('id')!);

    if (!Number.isInteger(id)) {
      id = -1;
    }

    let response: any = await getProductsByCategory({ id: id });
  }

  const handlePriceFilter = async (data: React.FormEvent<HTMLFormElement>) => {
    data.preventDefault();
    var curentData = new FormData(data.currentTarget);
    var maxPrice = parseInt(curentData?.get("max-price")?.toString()!);
    var minPrice = parseInt(curentData?.get("min-price")?.toString()!);

    if (Number.isNaN(maxPrice)) maxPrice = -1;
    if (Number.isNaN(minPrice)) minPrice = -1;
  
    search_.set("max-price",maxPrice.toString());
    search_.set("min-price",minPrice.toString());
    setSearch(search_);
    funcs();

    // // Оновлюємо стан allFilters з новими значеннями
    // setAllFilters((prev) => ({
    //   ...prev,
    //   max_Preis: maxPrice,
    //   min_Preis: minPrice,
    // }));
  
    // console.log("priceFilter func");
    // // Викликаємо функцію для відправлення запиту на сервер зі зміненими фільтрами
    // await funcs(allFilters.productName);
  };

  const getStarts=(stars:number)=>{
    var jsx_stars: JSX.Element[] = [];
    for(var i = 0;i<5;i++)
    {
      if(i<stars)
      {
        jsx_stars.push(<div key={i} className='star-small h-10 ml-0.5'/>);
      }
      else
      {
        jsx_stars.push(<div key={i} className='empty_star-small h-10 ml-0.5' />);
      }
    }

    return jsx_stars;
  }

  const setStarts= async (stars:number)=>{
    search_.set("stars",stars.toString());
    setSearch(search_);
    funcs();

    if(stars==-1)
    {
      search_.delete("stars");
      setSearch(search_);
    }

    // setAllFilters(prev=>({...prev,stars:stars}));
    // let response: any = await getProductsByFilter(allFilters);
    // console.log(response?.data);
    // setProducts(response?.data?.payload);
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
          <div className='font-medium text-sm mb-2 cursor-pointer'>Filters</div>

          <form className='ml-1 text-sm ' onSubmit={handlePriceFilter}>
              <div className='font-medium cursor-pointer '>Price</div>
              <div className=''>
                <input id='min-price' name='min-price' 
                className='border w-8 mr-1 outline-none rounded-md p-1 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent' type='number'></input>
                <span>-</span>
                <input id='max-price'  name='max-price' className='border w-8 ml-1 outline-none rounded-md p-1 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent' type='number'></input>
                <button type='submit' className=' self-center absolute ml-2 border p-1.5'>
                    <img className='h-4 self-center' src={search}></img>
                </button>
              </div>
          </form>

          <div className='mt-4 ml-1'>
            <div className='font-medium text-sm cursor-pointer'>Customer Review</div>
            <div className='ml-1'>
              <div className='flex select-none cursor-pointer hover:underline mt-1 m-auto text-sm' onClick={()=>setStarts(4)}>{getStarts(4)} & Up</div>
              <div className='flex select-none cursor-pointer hover:underline mt-1 m-auto text-sm' onClick={()=>setStarts(3)}>{getStarts(3)} & Up</div>
              <div className='flex select-none cursor-pointer hover:underline mt-1 m-auto text-sm' onClick={()=>setStarts(2)}>{getStarts(2)} & Up</div>
              <div className='flex select-none cursor-pointer hover:underline mt-1 m-auto text-sm' onClick={()=>setStarts(1)}>{getStarts(1)} & Up</div>
              <div className='flex select-none cursor-pointer hover:underline mt-1 ml-1 m-auto text-sm' onClick={()=>setStarts(-1)}>None & Up</div>
            </div>
          </div>
          
         
        </div>
      </div>



        {/* grid */}

      
      {!isLoading?
      <div className='grid grid-cols-5 gap-2 pr-44 pl-24 w-full'>
        {products?.map((product: Product, id: number) => {
          const b: Product = product;
          return <div key={id}>{<Product_Component  data={b} productsImages={imagesLinks?.find((img:ImageLink)=>img.productId==product.id)!} />}</div> })}
      </div>
      :loader()}
    </div>
  )
}

export default PageWithOptions