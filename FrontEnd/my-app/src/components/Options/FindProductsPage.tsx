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
import classNames from 'classnames';

import check from "../../images/check_gray.svg"

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
    <div className='pb-2 mt-20 w-full border border-1 border-gray-100 h-[350px]'>
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




  const [selectedBrends, setSelectedBrends] = useState<string[]>([]);

  const handleCheckboxChange = (value: any) => {
    if (selectedBrends.includes(value)) {
      setSelectedBrends(selectedBrends.filter((item) => item !== value));
    } else {
      setSelectedBrends([...selectedBrends, value]);
    }
  };

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
    <div className='flex'>
      
      <div className='  w-11/12 m-auto'>

      
      <div className=' '>
        Головна / одяг / жіноче
      </div>

      <div className='whitespace-nowrap pl-2 pr-2 mt-10'>

      
        <div className=' grid grid-cols-10 gap-4'>
    
          <div className='col-span-2'>
            <div className='bg-optionsGrayColor p-4 rounded-lg'>
              <div className='font-semibold text-sm mb-2 cursor-pointer text-optionsGrayDarkBlueColor'>Категорії</div>

              <div className=' text-sm mb-2 cursor-pointer '>
                <div className='my-3'>
                  <span className=' font-semibold mr-3 text-optionsGrayDarkBlueColor'>Все</span>
                  <span className=' text-optionsGrayBlueColor'>(10487)</span>
                </div>
                <div className='my-3'>
                  <span className=' mr-3 text-optionsGrayDarkBlueColor'>Телебачення та аудіо</span>
                  <span className=' text-optionsGrayBlueColor'>(10487)</span>
                </div>
                <div className='my-3'>
                  <span className=' mr-3 text-optionsGrayDarkBlueColor'>Смартфони</span>
                  <span className=' text-optionsGrayBlueColor'>(5236)</span>
                </div>
                <div className='my-3'>
                  <span className=' mr-3 text-optionsGrayDarkBlueColor'>Ноутбуки та ПК</span>
                  <span className=' text-optionsGrayBlueColor'>(290)</span>
                </div>

              </div>
            </div>
            
            <div className=' p-4 rounded-lg mt-4 border border-grayColorForBorder'>
              <div className='font-semibold text-sm mb-2 cursor-pointer text-optionsGrayDarkBlueColor'>Бренди</div>
              
              <div className=' text-sm mb-2 cursor-pointer '>
                <div className='my-3'>

                  <label className="flex self-center" onClick={()=>handleCheckboxChange("1")}>
                    <div
                      
                      className={classNames("mr-2 h-[17px] w-[17px] self-center justify-center flex rounded-sm border border-optionsGrayDarkBlueColor",{
                        "   ":selectedBrends.includes("1"),
                        "  ":!selectedBrends.includes("1")
                      })}
                    >
                     {selectedBrends.includes("1") ? <img src={check} className=' h-2 self-center' /> :""}
                    </div>
                    <span className=' mr-3 text-optionsWhiterDarkBlueColor'>Apple</span>
                    <span className='  text-almostWhiteColor'>(6422)</span>
                  </label>

                </div>
                <div className='my-3'>

                  <label className="flex self-center" onClick={()=>handleCheckboxChange("2")}>
                    <div
                      
                      className={classNames("mr-2 h-[17px] w-[17px] self-center justify-center flex rounded-sm border border-optionsGrayDarkBlueColor",{
                        "   ":selectedBrends.includes("2"),
                        "  ":!selectedBrends.includes("2")
                      })}
                    >
                     {selectedBrends.includes("2") ? <img src={check} className=' h-2 self-center' /> :""}
                    </div>
                    <span className=' mr-3 text-optionsWhiterDarkBlueColor'>Samsung</span>
                    <span className='  text-almostWhiteColor'>(725)</span>
                  </label>

                  
                </div>
                <div className='my-3'>

                  <label className="flex self-center" onClick={()=>handleCheckboxChange("3")}>
                    <div
                      
                      className={classNames("mr-2 h-[17px] w-[17px] self-center justify-center flex rounded-sm border border-optionsGrayDarkBlueColor",{
                        "   ":selectedBrends.includes("3"),
                        "  ":!selectedBrends.includes("3")
                      })}
                    >
                     {selectedBrends.includes("3") ? <img src={check} className=' h-2 self-center' /> :""}
                    </div>
                    <span className=' mr-3 text-optionsWhiterDarkBlueColor'>Lenovo</span>
                    <span className='  text-almostWhiteColor'>(631)</span>
                  </label>
                  
                </div>

              </div>
            </div>
            

    
            {/* <form className='ml-1 text-sm ' onSubmit={handlePriceFilter}>
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
            </div> */}
            
           
          </div>
    
    
          {/* grid */}
    
        
          {!isLoading?
          <div className='col-span-8 '>

            <button className='border rounded-md justify-start flex px-10 py-2 border-grayColorForHeader'>
              Рейтингом
            </button>

            <div className='grid grid-cols-4 gap-4  px-10 w-full'>
            

              {products?.map((product: Product, id: number) => {
                const b: Product = product;
                return <div key={id}>{<Product_Component  data={b} productsImages={imagesLinks?.find((img:ImageLink)=>img.productId==product.id)!} />}</div> })}
            </div>
          </div>

          :loader()}
        </div>

      </div>

      </div>

    </div>
  )
}

export default PageWithOptions