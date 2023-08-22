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
import ReactSlider from 'react-slider';
import unfiledStar from '../../images/unfiled_star.svg';
import filedStar from '../../images/Star 1.svg';
import werbung from '../../images/reklama.jpg';
import dropdown from '../../images/Right Icons.svg';
import viewList from '../../images/view-list.svg';
import heart from '../../images/Heart unfilled.svg';
import viewGrid from '../../images/view-grid (1).svg';
import "./SliderStiles.css"

import headphones from '../../images/headphones.svg';
import userAvatar from '../../images/user.svg';
import discount from '../../images/discount.svg';

import arrowRight from '../../images/ArrowRightS.svg';


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
    <div className='m-auto pt-32 flex self-center justify-center'>
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

const Product_Component=({ data , productsImages,viewListOrGrid}: { data: Product ,productsImages:ImageLink,viewListOrGrid:string})=>{
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
        jsx_stars.push(<img key={i} className='h-3 mr-0.5' src={filedStar}/>);
      }
      else
      {
        jsx_stars.push(<img key={i} className='h-3 mr-0.5' src={unfiledStar}/>);
      }
    }

    return jsx_stars;
  }

  const handleStarsRetingFunctionality=(comments:any)=>{
    var sumOfStars = 0;
    comments.map((com:any)=>sumOfStars += com.stars);
    var rating = sumOfStars/(comments.length!);
    if(!Number.isNaN(rating))
      return rating.toFixed(1);
    else
      return "0.0";
  }
  // viewListOrGrid

  return<div
  className={classNames("col-span-4",{
    " col-span-4 ":viewListOrGrid=="list",
    " col-span-1 ":viewListOrGrid=="grid"
  })}
  >
  <Link to={"/product/" + data.id}>
    <div className='pb-2 w-full hover:shadow-lg rounded-lg p-2 py-10 bg-whiteColor' >
          <div>
          <div className='w-full h-[170px] m-0 py-10' style={{ backgroundImage:"url("+ productsImages?.image +")",backgroundPosition:"center",backgroundSize:"contain",backgroundRepeat:"no-repeat"}}>

          </div>
            {/* <img src={data?.image ? "data:image/png;base64," + data?.image : img} className=' w-full h-[100px] ' />         */}
          </div>
          <div className='p-1 '>
            <div className='flex flex-wrap h-12 overflow-hidden mt-6'>
              <p className=' text-optionsGrayDarkBlueColor  text-md hover:text-red-700 cursor-pointer hover:underline '>
                {data.name}
              </p>
            </div>

            <div className='flex mt-2 justify-between'>
              <p className='text-optionsGrayDarkBlueColor text-[20px] font-bold text-xl'>{data.price} грн.</p>
              {data.discount ?
              <div className='text-[20px] text-sm rounded-lg self-center bg-almostWhiteGreen px-2 py-1 text-optionsGreenColorFor' style={{ fontFamily:"Roboto"}}>{data.discount}% OFF</div>
              :""}
            </div>

            <div className='flex justify-between mt-4'>
              <span>Продано: 6</span>
              <span>В наявності: 30</span>
            </div>

            <div className='flex justify-between mt-4'>
              <div className='flex self-center py-1'>
                <div className='flex self-center text-center'>
                  {getStarts()}
                </div>
                <div className='ml-2 self-center text-sm'>{handleStarsRetingFunctionality(data.comments)}</div>
              </div>

              <button className='border rounded-lg flex justify-center px-2 hover:scale-105'>
                <span className=' self-center py-2 mr-1 text-sm text-mainYellowColor  font-medium'>Дивитись</span>
                <img className=' self-center' src={heart}/>
              </button>
            </div>

            {/* <div className='flex text-center m-auto self-center mt-2 justify-center'>
              <div className='flex'>
              {getStarts()}
              <span className='ml-1 text-blue-950 hover:text-red-700 cursor-pointer hover:underline text-[12px] font-medium'>{data.comments.length}</span>
              </div>

            </div> */}
            

        </div>
      </div>
    </Link>
  </div>
  
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

  var [minPreis, setMinPreis] = useState("0");
  var [maxPreis, setmaxPreis] = useState("20000");

  var [viewListOrGrid, setViewListOrGrid] = useState("grid");


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
        jsx_stars.push(<img key={i} className='h-4 w-4 mr-0.5' src={filedStar} />);
      }
      else
      {
        jsx_stars.push(<img key={i} className='h-4 w-4 mr-0.5' src={unfiledStar} />);
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
    <div className='flex flex-col'>
      
      <div className='  w-10/12 m-auto'>

      
      <div className=' text-whiteGray mt-8 ml-2 flex'>
        <span className=' self-center mr-2 hover:underline cursor-pointer'>Головна </span>
        <img className=' self-center mr-2' src={arrowRight} />
        <span className=' self-center mr-2 hover:underline cursor-pointer'>Одяг </span>
        <img className=' self-center mr-2' src={arrowRight} />
        <span className=' self-center mr-2 hover:underline cursor-pointer'>Чоловічий одяг </span>
        <img className=' self-center mr-2' src={arrowRight} />
        <span className=' self-center mr-2 hover:underline cursor-pointer'>Футболки</span>
      </div>

      <div className=' pl-2 pr-2 mt-4'>

      
        <div className=' grid grid-cols-11 gap-4'>
    
          <div className='col-span-2'>
            <div className='bg-optionsGrayColor p-4 rounded-lg'>
              <div className='font-semibold mb-2 cursor-pointer  text-[16px] text-optionsGrayDarkBlueColor'>Категорії</div>

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
              <div className='font-semibold  text-[16px] mb-2 cursor-pointer text-optionsGrayDarkBlueColor'>Бренди</div>
              
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

            <div className=' p-4 rounded-lg mt-4 border border-grayColorForBorder'>
              <div className='font-semibold  text-[16px] mb-2 cursor-pointer text-optionsGrayDarkBlueColor'>Ціна</div>
              
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
                    <span className=' mr-3 text-optionsWhiterDarkBlueColor'>{"<50"}</span>
                    <span className='  text-almostWhiteColor'>(523)</span>
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
                    <span className=' mr-3 text-optionsWhiterDarkBlueColor'>100-200</span>
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
                    <span className=' mr-3 text-optionsWhiterDarkBlueColor'>200-300</span>
                    <span className='  text-almostWhiteColor'>(62)</span>
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
                    <span className=' mr-3 text-optionsWhiterDarkBlueColor'>400-500</span>
                    <span className='  text-almostWhiteColor'>(62)</span>
                  </label>
                  
                </div>  


                <hr/>

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
                    <span className=' mr-3 text-optionsWhiterDarkBlueColor'>Інтервал ціни</span>
                  </label>


                  {/* СЛАЙДЕР ЦІНИ */}
                    <div className=' w-full h-9 mt-6'>
                    <ReactSlider
                      className="horizontal-slider"
                      thumbClassName="example-thumb"
                      trackClassName="example-track"
                      defaultValue={[0, 20000]}
                      ariaLabel={['Lower thumb', 'Upper thumb']}
                      ariaValuetext={state => `Thumb value ${state.valueNow}`}
                      renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                      onChange={(props, state)=>{setMinPreis(props[0].toString());setmaxPreis(props[1].toString())}}
                      pearling
                      min={0}
                      max={20000}
                      minDistance={300}
                  />
                    </div>
                    <label className="flex self-center" >
                    <span className=' mr-3 text-optionsWhiterDarkBlueColor'>Ціна: {minPreis} грн - {maxPreis} грн</span>
                  </label>
                  
                </div>  


              </div>
            </div>





            <div className=' p-4 rounded-lg mt-4 border border-grayColorForBorder'>
              <div className='font-semibold text-[16px] mb-2 cursor-pointer text-optionsGrayDarkBlueColor'>Кольори</div>
              
              <div className='grid grid-cols-5'>
                <div className=' border-grayColorForHeader bg-black h-7 w-7 rounded-lg border'/>
                <div className=' border-grayColorForHeader bg-white h-7 w-7 rounded-lg border'/>
                <div className=' border-grayColorForHeader bg-blue-300 h-7 w-7 rounded-lg border'/>
                <div className=' border-grayColorForHeader bg-yellow-300 h-7 w-7 rounded-lg border'/>
                <div className=' border-grayColorForHeader bg-red-500 h-7 w-7 rounded-lg border'/>
              </div>
              <div className='grid grid-cols-5 mt-4'>
                <div className=' border-grayColorForHeader bg-green-400 h-7 w-7 rounded-lg border'/>
                <div className=' border-grayColorForHeader bg-violet-400 h-7 w-7 rounded-lg border'/>
                <div className=' border-grayColorForHeader bg-orange-300 h-7 w-7 rounded-lg border'/>
                <div className=' border-grayColorForHeader bg-rose-300 h-7 w-7 rounded-lg border'/>
                <div className=' border-grayColorForHeader bg-lime-300 h-7 w-7 rounded-lg border'/>
              </div>
            </div>


            <div className=' p-4 rounded-lg mt-4 border border-grayColorForBorder  text-sm'>
              <div className='font-semibold text-[16px] mb-2 cursor-pointer text-optionsGrayDarkBlueColor'>Рейтинг</div>
              
              <label className="flex self-center mt-3" onClick={()=>handleCheckboxChange("2")}>
                <div
                  
                  className={classNames("mr-2 h-4 w-4 self-center justify-center flex rounded-sm border border-optionsGrayDarkBlueColor",{
                    "   ":selectedBrends.includes("2"),
                    "  ":!selectedBrends.includes("2")
                  })}
                >
                 {selectedBrends.includes("2") ? <img src={check} className=' h-2 self-center' /> :""}
                </div>
                <span className=' mr-3 text-optionsWhiterDarkBlueColor flex self-center'>{getStarts(5)}</span>
                <span className='  text-almostWhiteColor self-center'>(725)</span>
              </label>

              <label className="flex self-center mt-3" onClick={()=>handleCheckboxChange("2")}>
                <div
                  
                  className={classNames("mr-2 h-4 w-4 self-center justify-center flex rounded-sm border border-optionsGrayDarkBlueColor",{
                    "   ":selectedBrends.includes("2"),
                    "  ":!selectedBrends.includes("2")
                  })}
                >
                 {selectedBrends.includes("2") ? <img src={check} className=' h-2 self-center' /> :""}
                </div>
                <span className=' mr-3 text-optionsWhiterDarkBlueColor flex self-center'>{getStarts(4)}</span>
                <span className='  text-almostWhiteColor self-center'>(725)</span>
              </label>

              <label className="flex self-center mt-3" onClick={()=>handleCheckboxChange("2")}>
                <div
                  
                  className={classNames("mr-2 h-4 w-4 self-center justify-center flex rounded-sm border border-optionsGrayDarkBlueColor",{
                    "   ":selectedBrends.includes("2"),
                    "  ":!selectedBrends.includes("2")
                  })}
                >
                 {selectedBrends.includes("2") ? <img src={check} className=' h-2 self-center' /> :""}
                </div>
                <span className=' mr-3 text-optionsWhiterDarkBlueColor flex self-center'>{getStarts(3)}</span>
                <span className='  text-almostWhiteColor self-center'>(725)</span>
              </label>

              <label className="flex self-center mt-3" onClick={()=>handleCheckboxChange("2")}>
                <div
                  
                  className={classNames("mr-2 h-4 w-4 self-center justify-center flex rounded-sm border border-optionsGrayDarkBlueColor",{
                    "   ":selectedBrends.includes("2"),
                    "  ":!selectedBrends.includes("2")
                  })}
                >
                 {selectedBrends.includes("2") ? <img src={check} className=' h-2 self-center' /> :""}
                </div>
                <span className=' mr-3 text-optionsWhiterDarkBlueColor flex self-center'>{getStarts(2)}</span>
                <span className='  text-almostWhiteColor self-center'>(725)</span>
              </label>

              <label className="flex self-center mt-3" onClick={()=>handleCheckboxChange("2")}>
                <div
                  
                  className={classNames("mr-2 h-4 w-4 self-center justify-center flex rounded-sm border border-optionsGrayDarkBlueColor",{
                    "   ":selectedBrends.includes("2"),
                    "  ":!selectedBrends.includes("2")
                  })}
                >
                 {selectedBrends.includes("2") ? <img src={check} className=' h-2 self-center' /> :""}
                </div>
                <span className=' mr-3 text-optionsWhiterDarkBlueColor flex self-center'>{getStarts(1)}</span>
                <span className='  text-almostWhiteColor self-center'>(725)</span>
              </label>

            </div>
            
            <img className='mt-4' src={werbung}/>

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
    
        
          
          <div className='col-span-9 shadow-md p-2 pt-4'>

            <div className='flex h-10 justify-between '>
              <div className='relative'>
                <div className='text-[11px] ml-12 mt-[-6px] text-grayForText bg-bodyColor border border-bodyColor border-x-2 rounded-lg absolute mb-2 ' style={{ fontFamily:"Roboto"}}>СОРТУВАТИ ЗА</div>
                <button className='border justify-between border-optionsGrayForBorder rounded-md text-sm ml-8 flex py-2 font-medium px-3'>
                  <span className='mr-12'>Рейтингом</span>
                  <img className='h-5 self-center' src={dropdown} />
                </button>
              </div>

              <div className='flex relative bg-almostWhiteBlue justify-between h-full w-28 rounded-md'>
                <div
                
                className={classNames("self-center transition-all flex absolute bg-white shadow-md shadow-almostWhiteBlue rounded-sm h-full w-14 justify-center",{
                  " ":viewListOrGrid == "list",
                  " translate-x-14":viewListOrGrid == "grid"
                })}
                >
                  <img
                  className={classNames(" self-center",{
                    "h-7 ":viewListOrGrid == "list",
                    "h-4":viewListOrGrid == "grid"
                  })}
                  src={viewListOrGrid == "list"? viewList : viewGrid} />
                </div>
                
                <div className='self-center' onClick={()=>setViewListOrGrid("list")}>
                  <img className='h-7 self-center pl-5' src={viewList} />
                </div>
                <div className='self-center' onClick={()=>setViewListOrGrid("grid")}>
                  <img className='h-4 self-center pr-5' src={viewGrid} />
                </div>
              </div>

            </div>
            {!isLoading?
            <div className='grid grid-cols-4 gap-12 px-10 w-full mt-5'>
            

              {products?.map((product: Product, id: number) => {
                const b: Product = product;
                return <div 
                className={classNames(" transition-all",{
                  " col-span-4 ":viewListOrGrid=="list",
                  " col-span-1 ":viewListOrGrid=="grid"
                })}
                key={id}>{<Product_Component viewListOrGrid={viewListOrGrid} data={b} productsImages={imagesLinks?.find((img:ImageLink)=>img.productId==product.id)!} />}</div> })}
            </div>
            :loader()}
          </div>

          
        </div>

        

      </div>
      
      </div>

      <div className=' w-full bg-slate-100 my-10 py-16'>
          <div className='w-2/3 m-auto grid grid-cols-3 justify-between'>
            <div className='flex flex-col justify-center'>
              <div className='h-16 w-16 justify-center m-auto flex rounded-full bg-slate-400'>
                <img src={headphones} />
              </div>
              <div className='mt-1 font-semibold flex justify-center text-sm '>
                Підтримка продукту
              </div>
              <div className='text-sm mt-3 text-center'>
                Для вашого спокою доступна гарантія до 3 років.
              </div>
              
            </div>

            <div className='flex flex-col justify-center'>
              <div className='h-16 w-16 justify-center m-auto flex rounded-full bg-slate-400'>
                <img src={userAvatar} />
              </div>
              <div className='mt-1 font-semibold flex justify-center text-sm '>
                Підтримка продукту
              </div>
              <div className='text-sm mt-3 text-center'>
                Для вашого спокою доступна гарантія до 3 років.
              </div>
              
            </div>

            <div className='flex flex-col justify-center'>
              <div className='h-16 w-16 justify-center m-auto flex rounded-full bg-slate-400'>
                <img src={discount} />
              </div>
              <div className='mt-1 font-semibold flex justify-center text-sm '>
                Підтримка продукту
              </div>
              <div className='text-sm mt-3 justify-center text-center'>
                Для вашого спокою доступна гарантія до 3 років.
              </div>
              
            </div>


          </div>
      </div>

    </div>
  )
}

export default PageWithOptions