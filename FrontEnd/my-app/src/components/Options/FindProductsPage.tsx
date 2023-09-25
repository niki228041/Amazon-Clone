import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { apiProductSlice, useGetProductCountQuery, useGetProductsQuery } from '../../features/user/apiProductSlice';
import { useParams} from 'react-router-dom'
import { ImageLink, OneProductVM, Product, ProductsWithPagination, categorySequence } from '../types';
import { apiCategorySlice, useGetCategoriesQuery, useGetMainCategoriesQuery } from '../../features/user/apiCategorySlice';
import "../../css/stars.css";
import search from "../../images/search.png";
import '../NumberFieldWithoutArrows.css';
import { Category, Options, Variant, VariantDTO } from '../Admin/types';
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


import check from "../../images/check (1).png"
import { useGetAllBaseOptionsAsyncQuery } from '../../features/user/apiOptionsSlice';
import { turnWasAddedToFalse } from '../../features/user/ordersStateSlice';
import { useDispatch } from 'react-redux';
import { GetCurrency } from '../../api/jwtDecodeToken';
import { useAppSelector } from '../../app/hooks';

interface AllFilters{
  categoryId:number,
  productName:string,
  min_Preis:number,
  max_Preis:number,
  stars:number,
  variants:VariantDTO[],
  page:number,
  limit:number,
  sortBy:string,
}


const loader=()=> {
  return(
    <div className='m-auto pt-32 pb-60 flex self-center justify-center'>
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
  var dispatch = useDispatch();

  const handleStarsFunctionality=()=>{
    var sumOfStars = 0;
    data.comments.map(com=>sumOfStars += com.stars);
    stars = Math.round(sumOfStars/(data.comments.length));
  }

  var currency = useAppSelector((state)=>state.currency.currency);

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
  className={classNames(" z-10",{
    " col-span-4 ":viewListOrGrid=="list",
    " col-span-1 ":viewListOrGrid=="grid"
  })}
  >
  <Link to={"/product/description/" + data.id} >
    <div className={classNames('pb-2 w-full hover:shadow-lg grid rounded-lg p-2 py-10 bg-whiteColor ',{
    " grid-cols-10 ":viewListOrGrid=="list",
    " grid-cols-1 ":viewListOrGrid=="grid"})}>
          <div className={classNames(" col-span-2",{"px-5":viewListOrGrid=="list"})} >
            <div className='w-full h-[170px] m-0 py-10' style={{ backgroundImage:"url("+ productsImages?.image +")",backgroundPosition:"center",backgroundSize:"contain",backgroundRepeat:"no-repeat"}}>
            </div>
            {/* <img src={data?.image ? "data:image/png;base64," + data?.image : img} className=' w-full h-[100px] ' />         */}
          </div>
          <div className='p-1 col-span-8 '>
            <div className='flex flex-wrap overflow-hidden mt-6 h-12'>
              <p className=' text-optionsGrayDarkBlueColor  text-md hover:text-red-700 cursor-pointer hover:underline '>
                {data.name}
              </p>
            </div>

            <div className='flex mt-2 justify-between'>
              <p className='text-optionsGrayDarkBlueColor text-[20px] font-bold text-xl'>{data.price} {currency}</p>
              {data.discount ?
              <div className='text-[20px] text-sm rounded-lg self-center bg-almostWhiteGreen px-2 py-1 text-optionsGreenColorFor' style={{ fontFamily:"Roboto"}}>{data.discount}% OFF</div>
              :""}
            </div>

            <div className='flex justify-between mt-4'>
              <span>Продано: {data.selledCount}</span>
              <span>В наявності: {data.quantity}</span>
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
  const [selectedPrice, setSelectedPreis] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const [sortBy, setSortBy] = useState("Рейтингом");
  const [dropdownSortBy, setDropdownSortBy] = useState(false);
  const [countOfViewedPage, setCountOfViewedPage] = useState<string[]>(["1","2","3"]);
  

  const [selectedColor, setSelectedColor] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<string>("");

  const handleCheckboxChange = (value: any,selected:any,setSelected:(val:any)=>void) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((item:any) => item !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  
  console.log(selectedColor);
  const { data, isSuccess, error } = useGetProductsQuery();



  const { data: categories }:{data:{payload:Category[]}} = useGetMainCategoriesQuery();
  const { data: baseOptions }:{data:Options[]} = useGetAllBaseOptionsAsyncQuery();


  

  const [getSubcategories, { }] = apiCategorySlice.useGetAllSubcategoriesByCategoryIdMutation();


  const [getProductsByCategory, { }] = apiProductSlice.useGetProductsByCategoryIdMutation();

  const [search_, setSearch] = useSearchParams();

  var request:any=[];
  data?.payload?.forEach((data:any) => {
    request.push({id:data.id});
  });

  useGetProductCountQuery();
  const { data: productCount} = useGetProductCountQuery() as {
    data:{payload:number};
  };;  
  
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

  var [minPriceInterval, setMinPrice] = useState("0");
  var [maxPriceInterval, setMaxPrice] = useState("70000");
  var [page, setPage] = useState(1);
  var [limit, setLimit] = useState(8);


  var [viewListOrGrid, setViewListOrGrid] = useState("grid");
  var [seeAllCategories, setSeeAllCategories] = useState(true);



  var [categoriesToView, setCategoriesToView] = useState<Category[]>([]);
  var [products, setProducts] = useState([]);
  var [productsCount, setProductsCount] = useState<number>();


  // const { data:productsCount}: { data?: { payload: OneProductVM } } = useGetProductByIdQuery({ Id: params.productId });
  // data?.payload.selledCount


  var [categoriesSequence, setCategoriesSequence] = useState<categorySequence[]>([]);
  var url = `/products?category=${encodeURIComponent("")}`;


  useEffect(()=>{
    setPage(1);
  },[selectedCategory,selectedBrends,selectedColor,selectedPrice,selectedRating,sortBy])


  useEffect(()=>{
    if(categories)
    setCategoriesToView(categories?.payload);

    // Отримуємо новий productName з параметрів URL
    const newProductName = getSearchParams().get('productName') || '';
    const newSelectedCategory = getSearchParams().get('categoryId') || '';


    // Перевіряємо, чи змінилось значення productName в параметрах URL
    // console.log("useEffect");
    // console.log(newProductName);

    console.log("newSelectedCategory");
    console.log(newSelectedCategory);


    search_.set("productName",newProductName);
    search_.set("stars", selectedRating!);
    setSelectedCategory(newSelectedCategory);
    
    if(newSelectedCategory == "")
    {
      search_.set("categoryId","-1");
    }


    handlePriceFilter();

    setSearch(search_);
    funcs();

    handleSetCountOfPagesToView();

    console.log(countOfViewedPage);

    
    
  },[getSearchParams().get('categoryId')])


  useEffect(()=>{
    if(categories)
      setCategoriesToView(categories?.payload);

    // Отримуємо новий productName з параметрів URL
    const newProductName = getSearchParams().get('productName') || '';

    search_.set("productName",newProductName);
    search_.set("stars", selectedRating!);

    handlePriceFilter();
    
    setSearch(search_);
    funcs();

    handleSetCountOfPagesToView();

    console.log(countOfViewedPage);
    

  }, [categories, categoryId, getSearchParams().get('productName'),search_,page,selectedBrends,selectedColor,selectedPrice,selectedRating,selectedCategory,sortBy])
  
  useEffect(()=>{handleSetCountOfPagesToView();},[,isLoading])

  const handleSetCountOfPagesToView=()=>{
    setCountOfViewedPage([]);

    for (let index = 0; index <= 4; index++) {
      if(page>=2)
      {
        if(((index+page) * limit)<productsCount!+limit)
        {
          setCountOfViewedPage(prev=>[...prev,((index+page)).toString()]);
        }
      }
      else{
        if(((index+1) * limit)<productsCount!+limit)
        {
          setCountOfViewedPage(prev=>[...prev,(index+1).toString()]);
        }
      }
    }
  }

  const funcs = async ()=>{
    var categoryId = Number(search_.get("categoryId"));
    

    var minPrice = Number(search_.get("min-price"));
    if(!Number.isInteger(minPrice)){minPrice=-1;}

    var maxPrice = Number(search_.get("max-price"));
    if(!Number.isInteger(maxPrice)){maxPrice=-1;}
    
    var productName = search_.get("productName")!;
    var stars = Number(search_.get("stars"));
    if(!Number.isInteger(stars)){stars=-1;}

    var productName = search_.get("productName")!;

    var allVariantsToServer:VariantDTO[] = [];

    selectedColor.forEach(element => {
      allVariantsToServer.push({id:parseInt(element)});
    });

    selectedBrends.forEach(element => {
      allVariantsToServer.push({id:parseInt(element)});
    });

    var filters:AllFilters = {min_Preis:minPrice,max_Preis:maxPrice,productName:productName,stars:stars,categoryId:categoryId,variants:allVariantsToServer,page:page,limit:limit,sortBy:sortBy};
    console.log(filters);

    let response: any = await getProductsByFilter(filters);
    console.log("HERE PLS:");
    console.log();
    // if(response?.data?.payload.length > 0) //Розібратись з пустою сторінкою останєю page
    setProducts(response?.data?.payload?.products);
    setProductsCount(response?.data?.payload?.countOfProducts);


  }

  const getProducts = async () => {
    var id = parseInt(getSearchParams().get('id')!);

    if (!Number.isInteger(id)) {
      id = -1;
    }

    let response: any = await getProductsByCategory({ id: id });
  }

  const handlePriceFilter = async () => {
    
    var maxPrice = parseInt("");
    var minPrice = parseInt("");
    
    if(selectedPrice != "Interval")
    {
      var price = selectedPrice.split("-");
      console.log(price);
      maxPrice = parseInt(price[1]);
      minPrice = parseInt(price[0]);
    }

    if (selectedPrice == 'Interval')
    {
      minPrice = parseInt(minPriceInterval);
      maxPrice = parseInt(maxPriceInterval);
    }


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

  var currency = useAppSelector((state)=>state.currency.currency);



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

      
      {/* <div className=' text-whiteGray mt-8 ml-2 flex'>
        <span className=' self-center mr-2 hover:underline cursor-pointer'>Головна </span>
        <img className=' self-center mr-2' src={arrowRight} />
        <span className=' self-center mr-2 hover:underline cursor-pointer'>Одяг </span>
        <img className=' self-center mr-2' src={arrowRight} />
        <span className=' self-center mr-2 hover:underline cursor-pointer'>Чоловічий одяг </span>
        <img className=' self-center mr-2' src={arrowRight} />
        <span className=' self-center mr-2 hover:underline cursor-pointer'>Футболки</span>
      </div> */}


      <div className='  mt-4'>

      
        <div className=' grid grid-cols-11 gap-4'>
    
          <div className='col-span-2'>
            <div 
            className={classNames("bg-optionsGrayColor relative p-4 rounded-lg  overflow-hidden transition-all",{
              " h-[210px] ":seeAllCategories,
              " ":!seeAllCategories
            })}
            >


              <div className=' text-sm absolute bottom-0 right-0 p-2 text-optionsGrayBlueColor hover:text-optionsGrayDarkBlueColor cursor-pointer ' 
              onClick={()=>setSeeAllCategories(!seeAllCategories)}>{ !seeAllCategories ? "Cховати" : "Дивитись всі"}</div>
              <div className='font-semibold mb-2 cursor-pointer  text-[16px] text-optionsGrayDarkBlueColor'>Категорії</div>

              <div className=' text-sm mb-2  '>
                <div className='my-3 cursor-pointer'>
                  <span className=' font-semibold mr-3 text-optionsGrayDarkBlueColor' onClick={()=>{setSelectedCategory("-1");search_.set("categoryId","-1");}}>Всі</span>
                  <span className=' text-optionsGrayBlueColor'>({productCount?.payload})</span>
                </div>

                {categories?.payload?.map((category: Category, id: number) => {
                return <div className='my-3 cursor-pointer'>
                  <span 
                  
                  className={classNames(" text-sm hover:underline",{
                    "font-semibold underline":selectedCategory == category.id.toString()
                  })}
                  onClick={()=>{setSelectedCategory(category.id.toString());search_.set("categoryId",category.id.toString());}}>{category.name}</span>
                  <span className=' text-optionsGrayBlueColor'>({category.countOfProducts})</span>
                </div> })}

                

              </div>
            </div>
            
            <div className=' p-4 rounded-lg mt-4 border border-grayColorForBorder'>
              <div className='font-semibold  text-[16px] mb-2 cursor-pointer text-optionsGrayDarkBlueColor'>Бренди</div>
              
              <div className='text-sm mb-2'>
                

                {baseOptions?.find(opt=>opt.title=="Бренди")?.variants?.map((variant: Variant, id: number) => {

                return <div className='my-3 '>
                  <label className="flex self-center cursor-pointer" onClick={()=>handleCheckboxChange(variant.id.toString(),selectedBrends,setSelectedBrends)}>
                    <div

                      className={classNames("mr-2 h-[17px] w-[17px] self-center justify-center flex rounded-sm border border-optionsGrayDarkBlueColor",{
                        "   ":selectedBrends.includes(variant.id.toString()),
                        "  ":!selectedBrends.includes(variant.id.toString())
                      })}
                    >
                     {selectedBrends.includes(variant.id.toString()) ? <img src={check} className=' h-2 self-center' /> :""}
                    </div>
                    <span className=' mr-3 text-optionsWhiterDarkBlueColor'>{variant.title}</span>
                    <span className='  text-almostWhiteColor'>({variant.countOfProducts})</span>
                  </label>
                </div>})}
                

              </div>
            </div>

            <div className=' p-4 rounded-lg mt-4 border border-grayColorForBorder'>
              <div className='font-semibold  text-[16px] mb-2 cursor-pointer text-optionsGrayDarkBlueColor'>Ціна</div>
              
              <div className=' text-sm mb-2  '>
                <div className='my-3'>

                  <label className="flex self-center cursor-pointer" onClick={()=>setSelectedPreis("0-50")}>
                    <div
                      
                      className={classNames("mr-2 h-[17px] w-[17px] self-center justify-center flex rounded-sm border border-optionsGrayDarkBlueColor",{
                        "   ":selectedPrice == "0-50",
                        "  ":selectedPrice !="0-50"
                      })}
                    >
                     {selectedPrice == "0-50" ? <img src={check} className=' h-2 self-center' /> :""}
                    </div>
                    <span className=' mr-3 text-optionsWhiterDarkBlueColor'>{"<50"}</span>
                    <span className='  text-almostWhiteColor'>(523)</span>
                  </label>

                </div>
                <div className='my-3'>

                  <label className="flex self-center cursor-pointer"  onClick={()=>setSelectedPreis("100-200")}>
                    <div
                      
                      className={classNames("mr-2 h-[17px] w-[17px] self-center justify-center flex rounded-sm border border-optionsGrayDarkBlueColor",{
                        "   ":selectedPrice == "100-200",
                        "  ":selectedPrice != "100-200"
                      })}
                    >
                     {selectedPrice == "100-200" ? <img src={check} className=' h-2 self-center' /> :""}
                    </div>
                    <span className=' mr-3 text-optionsWhiterDarkBlueColor'>100-200</span>
                    <span className='  text-almostWhiteColor'>(725)</span>
                  </label>

                  
                </div>
                <div className='my-3'>

                  <label className="flex self-center cursor-pointer" onClick={()=>setSelectedPreis("200-300")}>
                    <div
                      
                      className={classNames("mr-2 h-[17px] w-[17px] self-center justify-center flex rounded-sm border border-optionsGrayDarkBlueColor",{
                        "   ":selectedPrice == "200-300",
                        "  ":selectedPrice != "200-300"
                      })}
                    >
                     {selectedPrice == "200-300" ? <img src={check} className=' h-2 self-center' /> :""}
                    </div>
                    <span className=' mr-3 text-optionsWhiterDarkBlueColor'>200-300</span>
                    <span className='  text-almostWhiteColor'>(62)</span>
                  </label>
                  
                </div>
                <div className='my-3'>

                  <label className="flex self-center cursor-pointer" onClick={()=>setSelectedPreis("400-500")}>
                    <div
                      
                      className={classNames("mr-2 h-[17px] w-[17px] self-center justify-center flex rounded-sm border border-optionsGrayDarkBlueColor",{
                        "   ":selectedPrice == "400-500",
                        "  ":selectedPrice != "400-500"
                      })}
                    >
                     {selectedPrice == "400-500" ? <img src={check} className=' h-2 self-center' /> :""}
                    </div>
                    <span className=' mr-3 text-optionsWhiterDarkBlueColor'>400-500</span>
                    <span className='  text-almostWhiteColor'>(62)</span>
                  </label>
                  
                </div>  


                <hr/>

                <div className='my-3'>

                  <label className="flex self-center cursor-pointer" 
                  onClick={()=>{
                    if(selectedPrice == "Interval")
                    {
                      setSelectedPreis("")
                    }
                    else
                    {
                      setSelectedPreis("Interval")
                    }

                    }}>
                    <div
                      
                      className={classNames("mr-2 h-[17px] w-[17px] self-center justify-center flex rounded-sm border border-optionsGrayDarkBlueColor",{
                        "   ":selectedPrice == "Interval",
                        "  ":selectedPrice != "Interval"
                      })}
                    >
                     {selectedPrice == "Interval" ? <img src={check} className=' h-2 self-center' /> :""}
                    </div>
                    <span className=' mr-3 text-optionsWhiterDarkBlueColor'>Інтервал ціни</span>
                  </label>


                  {/* СЛАЙДЕР ЦІНИ */}
                    <div className=' w-full h-9 mt-6'>
                    <ReactSlider
                      className="horizontal-slider cursor-pointer"
                      thumbClassName="example-thumb"
                      trackClassName="example-track"
                      defaultValue={[0, 70000]}
                      ariaLabel={['Lower thumb', 'Upper thumb']}
                      ariaValuetext={state => `Thumb value ${state.valueNow}`}
                      renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                      onChange={(props, state)=>{setMinPrice(props[0].toString());setMaxPrice(props[1].toString())}}
                      pearling
                      min={0}
                      max={70000}
                      minDistance={300}
                  />
                    </div>
                    <label className="flex self-center" >
                    <span className=' mr-3 text-optionsWhiterDarkBlueColor'>Ціна: {minPriceInterval} {currency} - {maxPriceInterval} {currency}</span>
                  </label>
                  
                </div>  


              </div>
            </div>





            <div className=' p-4 rounded-lg mt-4 border border-grayColorForBorder'>
              <div className='font-semibold text-[16px] mb-2 cursor-pointer text-optionsGrayDarkBlueColor'>Кольори</div>

              
              
              <div className='grid grid-cols-5'>
                <div 
                onClick={()=>handleCheckboxChange(baseOptions?.find(opt=>opt.title == "Кольори")?.variants.find(opt=>opt.title == "Чорний")?.id.toString()!,selectedColor,setSelectedColor)}
                className={classNames("border-grayColorForHeader cursor-pointer bg-black h-7 w-7 rounded-lg border transition-all",{
                  " scale-125 ":selectedColor.includes(baseOptions?.find(opt=>opt.title == "Кольори")?.variants.find(opt=>opt.title == "Чорний")?.id.toString()!),
                  " opacity-50 ":!selectedColor.includes(baseOptions?.find(opt=>opt.title == "Кольори")?.variants.find(opt=>opt.title == "Чорний")?.id.toString()!)
                })}
                />
                <div
                onClick={()=>handleCheckboxChange(baseOptions?.find(opt=>opt.title == "Кольори")?.variants.find(opt=>opt.title == "Білий")?.id.toString()!,selectedColor,setSelectedColor)}
                className={classNames("border-grayColorForHeader cursor-pointer bg-white h-7 w-7 rounded-lg border transition-all",{
                  " scale-125":selectedColor.includes(baseOptions?.find(opt=>opt.title == "Кольори")?.variants.find(opt=>opt.title == "Білий")?.id.toString()!),
                  " opacity-50 ":!selectedColor.includes(baseOptions?.find(opt=>opt.title == "Кольори")?.variants.find(opt=>opt.title == "Білий")?.id.toString()!)
                })}/>
                <div
                onClick={()=>handleCheckboxChange(baseOptions?.find(opt=>opt.title == "Кольори")?.variants.find(opt=>opt.title == "Синій")?.id.toString()!,selectedColor,setSelectedColor)}
                className={classNames("border-grayColorForHeader cursor-pointer bg-blue-300 h-7 w-7 rounded-lg border transition-all",{
                  " scale-125":selectedColor.includes(baseOptions?.find(opt=>opt.title == "Кольори")?.variants.find(opt=>opt.title == "Синій")?.id.toString()!),
                  " opacity-50 ":!selectedColor.includes(baseOptions?.find(opt=>opt.title == "Кольори")?.variants.find(opt=>opt.title == "Синій")?.id.toString()!)
                })}/>


                <div
                onClick={()=>handleCheckboxChange(baseOptions?.find(opt=>opt.title == "Кольори")?.variants.find(opt=>opt.title == "Жовтий")?.id.toString()!,selectedColor,setSelectedColor)}
                className={classNames("border-grayColorForHeader cursor-pointer bg-yellow-300 h-7 w-7 rounded-lg border transition-all",{
                  " scale-125":selectedColor.includes(baseOptions?.find(opt=>opt.title == "Кольори")?.variants.find(opt=>opt.title == "Жовтий")?.id.toString()!),
                  " opacity-50 ":!selectedColor.includes(baseOptions?.find(opt=>opt.title == "Кольори")?.variants.find(opt=>opt.title == "Жовтий")?.id.toString()!)
                })}/>

                <div
                onClick={()=>handleCheckboxChange(baseOptions?.find(opt=>opt.title == "Кольори")?.variants.find(opt=>opt.title == "Червоний")?.id.toString()!,selectedColor,setSelectedColor)}
                className={classNames(" border-grayColorForHeader cursor-pointer bg-red-500 h-7 w-7 rounded-lg border transition-all",{
                  " scale-125":selectedColor.includes(baseOptions?.find(opt=>opt.title == "Кольори")?.variants.find(opt=>opt.title == "Червоний")?.id.toString()!),
                  " opacity-50 ":!selectedColor.includes(baseOptions?.find(opt=>opt.title == "Кольори")?.variants.find(opt=>opt.title == "Червоний")?.id.toString()!)
                })}/>

              </div>
              <div className='grid grid-cols-5 mt-4'>
                <div
                onClick={()=>handleCheckboxChange(baseOptions?.find(opt=>opt.title == "Кольори")?.variants.find(opt=>opt.title == "Зелений")?.id.toString()!,selectedColor,setSelectedColor)}
                className={classNames("border-grayColorForHeader cursor-pointer bg-green-400 h-7 w-7 rounded-lg border transition-all",{
                  " scale-125":selectedColor.includes(baseOptions?.find(opt=>opt.title == "Кольори")?.variants.find(opt=>opt.title == "Зелений")?.id.toString()!),
                  " opacity-50 ":!selectedColor.includes(baseOptions?.find(opt=>opt.title == "Кольори")?.variants.find(opt=>opt.title == "Зелений")?.id.toString()!)
                })}/>
                <div
                onClick={()=>handleCheckboxChange(baseOptions?.find(opt=>opt.title == "Кольори")?.variants.find(opt=>opt.title == "Фіолетовий")?.id.toString()!,selectedColor,setSelectedColor)}
                className={classNames("border-grayColorForHeader cursor-pointer bg-violet-400 h-7 w-7 rounded-lg border transition-all",{
                  " scale-125":selectedColor.includes(baseOptions?.find(opt=>opt.title == "Кольори")?.variants.find(opt=>opt.title == "Фіолетовий")?.id.toString()!),
                  " opacity-50 ":!selectedColor.includes(baseOptions?.find(opt=>opt.title == "Кольори")?.variants.find(opt=>opt.title == "Фіолетовий")?.id.toString()!)
                })}/>
                <div
                onClick={()=>handleCheckboxChange(baseOptions?.find(opt=>opt.title == "Кольори")?.variants.find(opt=>opt.title == "Оранжевий")?.id.toString()!,selectedColor,setSelectedColor)}
                className={classNames("border-grayColorForHeader cursor-pointer bg-orange-300 h-7 w-7 rounded-lg border transition-all",{
                  " scale-125":selectedColor.includes(baseOptions?.find(opt=>opt.title == "Кольори")?.variants.find(opt=>opt.title == "Оранжевий")?.id.toString()!),
                  " opacity-50 ":!selectedColor.includes(baseOptions?.find(opt=>opt.title == "Кольори")?.variants.find(opt=>opt.title == "Оранжевий")?.id.toString()!)
                })}/>
                <div
                onClick={()=>handleCheckboxChange(baseOptions?.find(opt=>opt.title == "Кольори")?.variants.find(opt=>opt.title == "Рожевий")?.id.toString()!,selectedColor,setSelectedColor)}
                className={classNames("border-grayColorForHeader cursor-pointer bg-rose-300 h-7 w-7 rounded-lg border transition-all",{
                  " scale-125":selectedColor.includes(baseOptions?.find(opt=>opt.title == "Кольори")?.variants.find(opt=>opt.title == "Рожевий")?.id.toString()!),
                  " opacity-50 ":!selectedColor.includes(baseOptions?.find(opt=>opt.title == "Кольори")?.variants.find(opt=>opt.title == "Рожевий")?.id.toString()!)
                })}/>
                <div
                onClick={()=>handleCheckboxChange(baseOptions?.find(opt=>opt.title == "Кольори")?.variants.find(opt=>opt.title == "Салатовий")?.id.toString()!,selectedColor,setSelectedColor)}
                className={classNames("border-grayColorForHeader cursor-pointer bg-lime-300 h-7 w-7 rounded-lg border transition-all",{
                  " scale-125":selectedColor.includes(baseOptions?.find(opt=>opt.title == "Кольори")?.variants.find(opt=>opt.title == "Салатовий")?.id.toString()!),
                  " opacity-50 ":!selectedColor.includes(baseOptions?.find(opt=>opt.title == "Кольори")?.variants.find(opt=>opt.title == "Салатовий")?.id.toString()!)
                })}/>
              </div>
            </div>


            <div className=' p-4 rounded-lg mt-4 border border-grayColorForBorder  text-sm'>
              <div className='font-semibold text-[16px] mb-2 cursor-pointer text-optionsGrayDarkBlueColor'>
                Рейтинг
              </div>
              
              <label className="flex self-center mt-3 cursor-pointer" onClick={()=>{if(selectedRating == "5"){setSelectedRating("")}else{setSelectedRating("5")}}}>
                <div
                  
                  className={classNames("mr-2 h-4 w-4 self-center justify-center flex rounded-sm border border-optionsGrayDarkBlueColor",{

                  })}
                >
                 {selectedRating == "5" ? <img src={check} className=' h-2 self-center' /> :""}
                </div>
                <span className=' mr-3 text-optionsWhiterDarkBlueColor flex self-center'>{getStarts(5)}</span>
                <span className='  text-almostWhiteColor self-center'>(725)</span>
              </label>

              <label className="flex self-center mt-3 cursor-pointer" onClick={()=>{if(selectedRating == "4"){setSelectedRating("")}else{setSelectedRating("4")}}}>
                <div
                  
                  className={classNames("mr-2 h-4 w-4 self-center justify-center flex rounded-sm border border-optionsGrayDarkBlueColor",{

                  })}
                >
                 {selectedRating == "4" ? <img src={check} className=' h-2 self-center' /> :""}
                </div>
                <span className=' mr-3 text-optionsWhiterDarkBlueColor flex self-center'>{getStarts(4)}</span>
                <span className='  text-almostWhiteColor self-center'>(725)</span>
              </label>

              <label className="flex self-center mt-3 cursor-pointer" onClick={()=>{if(selectedRating == "3"){setSelectedRating("")}else{setSelectedRating("3")}}}>
                <div
                  
                  className={classNames("mr-2 h-4 w-4 self-center justify-center flex rounded-sm border border-optionsGrayDarkBlueColor",{

                  })}
                >
                 {selectedRating == "3" ? <img src={check} className=' h-2 self-center' /> :""}
                </div>
                <span className=' mr-3 text-optionsWhiterDarkBlueColor flex self-center'>{getStarts(3)}</span>
                <span className='  text-almostWhiteColor self-center'>(725)</span>
              </label>

              <label className="flex self-center mt-3 cursor-pointer" onClick={()=>{if(selectedRating == "2"){setSelectedRating("")}else{setSelectedRating("2")}}}>
                <div
                  
                  className={classNames("mr-2 h-4 w-4 self-center justify-center flex rounded-sm border border-optionsGrayDarkBlueColor",{

                  })}
                >
                 {selectedRating == "2" ? <img src={check} className=' h-2 self-center' /> :""}
                </div>
                <span className=' mr-3 text-optionsWhiterDarkBlueColor flex self-center'>{getStarts(2)}</span>
                <span className='  text-almostWhiteColor self-center'>(725)</span>
              </label>

              <label className="flex self-center mt-3 cursor-pointer" onClick={()=>{if(selectedRating == "1"){setSelectedRating("")}else{setSelectedRating("1")}}}>
                <div
                  
                  className={classNames("mr-2 h-4 w-4 self-center justify-center flex rounded-sm border border-optionsGrayDarkBlueColor",{

                  })}
                >
                 {selectedRating == "1" ? <img src={check} className=' h-2 self-center' /> :""}
                </div>
                <span className=' mr-3 text-optionsWhiterDarkBlueColor flex self-center'>{getStarts(1)}</span>
                <span className='  text-almostWhiteColor self-center'>(725)</span>
              </label>

            </div>
            
            <img className='mt-4' src={werbung}/>

          </div>
    
    
        
          <div className='col-span-9'>
          <div className='shadow-md p-2 pt-4  relative flex  flex-col'>
            <div>

            <div className='flex h-10 justify-between '>

              <div className='  z-10' >
                <div onClick={()=>setDropdownSortBy(!dropdownSortBy)} className='text-[11px] ml-12 mt-[-6px] text-grayForText bg-bodyColor border border-bodyColor border-x-2 rounded-lg absolute mb-2 select-none cursor-pointer' style={{ fontFamily:"Roboto"}} >СОРТУВАТИ ЗА</div>
                <button onClick={()=>setDropdownSortBy(!dropdownSortBy)} className=' bg-white border justify-between border-optionsGrayForBorder rounded-md text-sm ml-8 flex py-2 font-medium px-4'>
                  <span className='mr-12'>{sortBy}</span>
                  <img className='h-5 self-center' src={dropdown} />
                </button>

                <div style={{transformOrigin:"top"}} className={classNames('ml-8 mt-1  ',{
                    " opacity-100 ": dropdownSortBy,
                    " opacity-0 scale-0 " : !dropdownSortBy
                  })}>
                  <div className='w-full transition-all  overflow-hidden rounded-lg border bg-white border-optionsGrayForBorder '>
                    <div className=' '>
                      <button onClick={()=>{setDropdownSortBy(false);setSortBy("Рейтингом")}} className='justify-between text-sm flex py-2 font-medium px-3 active:bg-white hover:bg-grayColorForBorder w-full'>
                        <span className='mr-12'>Рейтингом</span>
                      </button>
                    </div>
                    <hr/>
                    <div className=' '>
                      <button onClick={()=>{setDropdownSortBy(false);setSortBy("Назвою")}} className='justify-between text-sm flex py-2 font-medium px-3 active:bg-white hover:bg-grayColorForBorder w-full'>
                        <span className='mr-12'>Назвою</span>
                      </button>
                    </div>
                    <hr/>
                    <div className=' '>
                      <button onClick={()=>{setDropdownSortBy(false);setSortBy("Ціною")}} className='justify-between text-sm flex py-2 font-medium px-3 active:bg-white hover:bg-grayColorForBorder w-full'>
                        <span className='mr-12'>Ціною</span>
                      </button>
                    </div>
                  </div>
                  
                </div>
                

              </div>

              <div className='flex relative bg-almostWhiteBlue justify-between h-full w-28 rounded-md '>
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
                
                <div className='self-center  h-full flex w-14 justify-center' onClick={()=>setViewListOrGrid("list")}>
                  <img className='h-7 self-center  flex' src={viewList} />
                </div>
                <div className='self-center h-full flex w-14 justify-center' onClick={()=>setViewListOrGrid("grid")}>
                  <img className='h-4 self-center flex' src={viewGrid} />
                </div>
              </div>

            </div>

            <div className=' relative flex justify-center pb-36'>
            {!isLoading?
            <div className='grid grid-cols-4 gap-12 px-10 w-full pt-5 '>
            

              { products?.map((product: Product, id: number) => {
                const b: Product = product;
                return <div 
                className={classNames(" transition-all ",{
                  " col-span-4 ":viewListOrGrid=="list",
                  " col-span-1 ":viewListOrGrid=="grid"
                })}
                key={id}>{<Product_Component viewListOrGrid={viewListOrGrid} data={b} productsImages={imagesLinks?.find((img:ImageLink)=>img.productId==product.id)!} />}</div> })}
            </div>
            :loader()}
            
           </div>

           </div>


           <div className='bottom-0 absolute mb-10 mx-auto self-center'>
              <div className='w-full flex flex-col mx-auto'>
                {/* <span className=' flex justify-center'>
                  <span className='mx-1'>Page: {page}</span>
                  <span className='mx-1'>Limit: {limit}</span>
                </span> */}

                <div className='flex mt-2'>
                  <div onClick={()=>{if(page > 1)(setPage(page-1))}} className={classNames(' border transition-all select-none mx-2 cursor-pointer active:scale-110 p-1 px-4 rounded-md',{"text-gray-400":page == 1})}>
                    Назад
                  </div>
                  {countOfViewedPage.map((pageNum)=><div className='border rounded-md py-1 px-3 mx-1 cursor-pointer' onClick={()=>setPage(parseInt(pageNum))}>{pageNum}</div>)}
                  <div onClick={()=>{if((page * limit)<=productsCount!)(setPage(page+1))}}  className={classNames(' border transition-all select-none mx-2 cursor-pointer active:scale-110 p-1 px-4 rounded-md',{"text-gray-400":(page * limit)>=productsCount! })}>
                    Вперед
                  </div>
                </div>

              </div>
            </div>

          </div>
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