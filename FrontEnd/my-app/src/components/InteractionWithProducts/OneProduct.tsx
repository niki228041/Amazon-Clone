


import { Link, Outlet, useLocation, useNavigate, useParams} from 'react-router-dom'
import img from '../../images/t-shirt-png.webp'
import { apiProductSlice, useGetCommentsByProductIdQuery, useGetProductByIdQuery, useGetProductsQuery } from '../../features/user/apiProductSlice';
import { ChangeOrderCount, OneProductVM, Order, Product, SelectedOption } from '../types';
import { useAppSelector } from '../../app/hooks';
import { useDispatch } from 'react-redux';
import { addOrder, turnWasAddedToFalse, updateOrder } from '../../features/user/ordersStateSlice';
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import star from "../../images/star (2).png"
import empty_star from "../../images/star (3).png"
import circle from "../../images/black-circle.png"
import { addWishitem, updateWishitem } from '../../features/user/apiWishListItemSlice';
import check from "../../images/check.png"
import filled_star from "../../images/filled_star.svg"
import unfilled_star from "../../images/unfiled_star.svg"
import Dot from "../../images/Dot.svg"
import message_img from "../../images/message_small_icon.svg"
import miniBasket from "../../images/miniBasket.svg"
import line from "../../images/Line.svg"
import germany from "../../images/germany.png"
import verified_user from "../../images/verified_user.svg"
import planet from "../../images/planet.svg"
import classNames from 'classnames';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import BreadcrumbsLink from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';



interface createCommentDTO{
    title: string,
    message: string,
    stars: number,
    likes: number,
    dislikes: number,
    userId: number,
    productId: number,
    images: [],
}


export interface getRecomendedProducts{
    limit: number,
    categoryId: number,
}

interface Comment{
    id:number,
    dateCreated:string,
    title: string,
    message: string,
    stars: number,
    likes: number,
    dislikes: number,
    userId: number,
    userName: string,
    productId: number,
    images: [],
}

const OneProduct=()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const params = useParams();
    const orders = useAppSelector((state)=>state.orders);
    var [stars,setStars] = useState(5);

    var request:getRecomendedProducts = {limit:6,categoryId:0}; 
    // const {data:recomendedProducts_1 }:{data:{payload:Product[]}} = useGetProductWithLimitByCategoryIdQuery(request);
    // const {data:recomendedProducts_2 }:{data:{payload:Product[]}} = useGetProductWithLimitByCategoryIdQuery(request);

    var [recomendedProducts_1,setRecomendedProducts_1] = useState<Product[]>([]);
    var [recomendedProducts_2,setRecomendedProducts_2] = useState<Product[]>([]);

    var request:getRecomendedProducts = {limit:6,categoryId:0}; 
    const [getRecomendedProducts,{}] = apiProductSlice.useGetProductWithLimitByCategoryIdMutation();

    var [mainImage,setMainImage] = useState("");
    var [starsRating,setStarsRating] = useState("");
    const user = useAppSelector((state)=>state.user.user);
    // var [createComment,{}] = apiCommentSlice.useCreateCommentMutation();


    const {data:comments,isSuccess:isCommentsSuccess} = useGetCommentsByProductIdQuery({id:params.productId}) as {
        data: Comment[];
        isSuccess: boolean;
    };
    

    const handleAddNewOrder=(data:OneProductVM)=>{
        console.log('Data:', data);
        console.log(orders.orders);
        var order = orders.orders.find(ord=>ord.product_id==data.id);
        if(!order)
        {
            const newOrder:Order = {id:uuidv4(), name:data.name,product_id:data.id,price:data.price,count:1,discount:data.discount};
            dispatch(addOrder(newOrder));
        }
        else{
            var index = orders.orders.findIndex(order_=>order_.id==order?.id);
            if(order.count<5)
            {
                var changeOrderCount:ChangeOrderCount = {index:index,count:order.count+1}; 
                dispatch(updateOrder(changeOrderCount));
            }
        }
        setTimeout(() => {
          dispatch(turnWasAddedToFalse());
        }, 2000);
    }


    const handleAddNewWish=(data:OneProductVM)=>{
        console.log(orders.orders);
        var order = orders.orders.find(ord=>ord.product_id==data.id);
        if(!order)
        {
            const newWish:Order = {
                id: uuidv4(), name: data.name, product_id: data.id, price: data.price, count: 1,
                discount: undefined
            };
            dispatch(addWishitem(newWish));
        }
        else{
            var index = orders.orders.findIndex(order_=>order_.id==order?.id);
            if(order.count<5)
            {
                var changeOrderCount:ChangeOrderCount = {index:index,count:order.count+1}; 
                dispatch(updateWishitem(changeOrderCount));
            }
        }
    }
    const changeStars=(star_id:string)=>{

        setStars(parseInt(star_id));
    
        for(var i = 1;i<=5;i++){
    
          var val:any = document.getElementById(i.toString());
    
          if(i <= parseInt(star_id))
          {
            val.src = star;  
          }
          else
          {
            val.src = empty_star;
          }
          
        }
    }

    const breadcrumbs = [
        <BreadcrumbsLink underline="hover" key="1" color="inherit" href="/">
          Головна
        </BreadcrumbsLink>,
        <BreadcrumbsLink
          underline="hover"
          key="2"
          color="inherit"
          href=""
         >
          Одяг
        </BreadcrumbsLink>,
        <BreadcrumbsLink
            underline="hover"
            key="3"
            color="inherit"
            href=""
        >
            Чоловічий одяг
        </BreadcrumbsLink>,
        <Typography key="3" color="text.primary">
          Футболки
        </Typography>,
      ];

    
    const getStars=(stars_:number)=>{
      var jsx_stars: JSX.Element[] = [];
      for(var i = 0;i<5;i++)
      {
        if(i<stars_)
        {
          jsx_stars.push(<div key={i} className='star-small'/>);
        }
        else
        {
          jsx_stars.push(<div key={i} className='empty_star-small h-3' />);
        }
      }
      return jsx_stars;
    }

    // const createNewComment=(data:React.FormEvent<HTMLFormElement>)=>{
    //     data.preventDefault();

    //     var curentData = new FormData(data.currentTarget);
    //     var title = curentData?.get("Title")?.toString()!;
    //     var text = curentData?.get("Text")?.toString()!;

    //     var newComment:createCommentDTO = {title:title,message:text,stars:stars,likes:0,dislikes:0,userId:parseInt(user.id),productId: parseInt(params.productId!),images:[]};
    //     createComment(newComment);
    //     //НАДА ЗАЛОГІНЕННИЙ ЮЗЕР ДЛЯ ПРОДОВЖЕННЯ КОДУ ---------------------------------------------------
    // }

    // const { data, isSuccess } = useGetProductByIdQuery({ Id: params.productId });
    
    const { data, isSuccess } : { data?: { payload: OneProductVM }, isSuccess: boolean } = useGetProductByIdQuery({ Id: params.productId });



    const handleStarsFunctionality=()=>{
      var sumOfStars = 0;
      data?.payload.comments.map(com=>sumOfStars += com.stars);
      var stars_ = Math.round(sumOfStars/(data?.payload.comments.length!));
      return stars_;
    }

    const handleStarsRetingFunctionality=()=>{
        var sumOfStars = 0;
        data?.payload.comments.map(com=>sumOfStars += com.stars);
        var rating = sumOfStars/(data?.payload.comments.length!);
        if(!Number.isNaN(rating))
            setStarsRating(rating.toFixed(1));
        else
            setStarsRating("0.0");
    }

    const handleLinkClick = () => {
        // Perform actions you want when the Link is clicked
        // For example, you can scroll to the top of the page
        window.scrollTo(0, 0);
    };

    var currency = useAppSelector((state)=>state.currency.currency);
    

    const getStarsForProduct=()=>{
      var jsx_stars: JSX.Element[] = [];
      var stars_ = handleStarsFunctionality();
      console.log(stars_);
      for(var i = 0;i<5;i++)
      {
        if(i<stars_)
        {
          jsx_stars.push(<img key={i} className='ml-0.5 h-3 xl:h-4' src={filled_star}/>);
        }
        else
        {
          jsx_stars.push(<img key={i} className='ml-0.5 h-3  xl:h-4'  src={unfilled_star}  />);
        }
      }
      return jsx_stars;
    }

    useEffect(()=>{
        console.log(location.pathname);
        if(isSuccess)
        {
            setMainImage(data?.payload.images[0]!);
            handleStarsRetingFunctionality();
        }

        if (recomendedProducts_1?.length <= 0) {
          getRecomendedProducts(request).then((res: any) => {
            console.log(res.data?.payload);
            setRecomendedProducts_1(res.data?.payload);
          });
        }

        if (recomendedProducts_2?.length <= 0) {
            getRecomendedProducts(request).then((res: any) => {
              console.log(res.data?.payload);
              setRecomendedProducts_2(res.data?.payload);
            });
          }
    },[isSuccess,stars,location.pathname,data?.payload.images[0],data?.payload.comments])



    // Now you can access the payload directly

    return <>

        <div className="mx-auto mt-10 w-11/12 lg:w-10/12 xl:w-9/12">
            <div className='grid grid-cols-10 p-2 xl:py-4 border border-grayColorForBorder rounded-lg'>
                    <div className='xl:col-span-3 col-span-10'>
                        <div className='rounded-lg border border-grayColorForBorder '>
                            <div className='h-[410px] bg-contain bg-no-repeat bg-center' style={{backgroundImage: `url(${mainImage})`}} />
                        </div>
                        <div className='grid grid-cols-5 mt-3 gap-3 px-3'>
                            {data?.payload.images.map((image:string)=>{return<div>
                                <div onMouseEnter={()=>setMainImage(image)} className='rounded-md bg-cover bg-no-repeat bg-center h-[66px] w-full border border-grayColorForBorder'  style={{backgroundImage: `url(${image})`}}/>
                            </div>})}
                        </div>
                    </div>

                    <div className='xl:col-span-4 col-span-10 xl:px-8'>
                        <div className='flex '>
                            <img className='h-6 self-center' src={data?.payload.isInTheStock ? check : ""} /> 
                            <p className={classNames(
                                    'self-center ',
                                    {
                                        ' text-green-500': data?.payload.isInTheStock,
                                        ' text-red-500 font-semibold': !data?.payload.isInTheStock,
                                    }
                                    )}>{data?.payload?.isInTheStock ? "В наявності" : "Не в наявності"}</p>
                        </div>
                        <div className='flex xl:w-3/4'>
                            <p className='self-center font-semibold text-[18px]'>{data?.payload.name}</p>
                        </div>
                        <div className='flex mt-1 text-grayForText'>
                            <div className='flex rounded-full self-center'>
                                {getStarsForProduct()}
                                {/* <img onClick={()=>changeStars("1")} id='1' className='h-[13px]  hover:contrast-75 image-container' src={filled_star} />
                                <img onClick={()=>changeStars("2")} id='2' className='h-[13px]  hover:contrast-75 image-container' src={filled_star} />
                                <img onClick={()=>changeStars("3")} id='3' className='h-[13px]  hover:contrast-75 image-container' src={filled_star} />
                                <img onClick={()=>changeStars("4")} id='4' className='h-[13px]  hover:contrast-75 image-container' src={filled_star} />
                                <img onClick={()=>changeStars("5")} id='5' className='h-[13px]  hover:contrast-75 image-container' src={filled_star} /> */}
                            </div>

                            <span className='px-1 self-center text-mainYellowColor ml-2 flex text-sm '>{starsRating}</span>
                            <img className='px-1 self-center h-1.5' src={Dot} />
                            <img className='px-1 self-center h-4' src={message_img} />
                            <span className='px-1 self-center flex  hover:underline cursor-pointer select-none text-sm '>{data?.payload.comments.length} відгуки</span>
                            <img className='px-1 self-center h-1.5' src={Dot} />
                            <img className='px-1 self-center h-4' src={miniBasket} />
                            <span className='px-1 self-center text-sm flex'>{data?.payload.selledCount} продано</span>

                        </div>

                        <div className='w-full mt-2 bg-lightOrangeColor p-3 flex'>
                            <div className='self-center font-medium w-1/3 flex flex-col px-1'>
                                <span className='text-[18px] text-red-500'>{data?.payload.price} {currency}</span>
                                <span className=' text-grayForText text-sm font-normal'>50-100 pcs</span>
                            </div>
                            <img src={line}/>
                            <div className='self-center font-medium w-1/3 flex flex-col px-1'>
                                <span className='text-[18px] '>{(data?.payload.price!/1.1).toFixed(2)} {currency}</span>
                                <span className=' text-grayForText text-sm font-normal'>100-700 pcs</span>
                            </div>
                            <img src={line}/>
                            <div className='self-center font-medium w-1/3 flex flex-col px-1'>
                                <span className='text-[18px] '>{(data?.payload.price!/1.2).toFixed(2)} {currency}</span>
                                <span className=' text-grayForText text-sm font-normal'>700+ pcs</span>
                            </div>
                        </div>

                        <div className='w-full mt-2 py-3 text-[15px]'>
                            
                            <div className='w-full mt-2 py-3 text-[15px]'>
                                <div className='my-2 grid grid-cols-4'>
                                    <span className=' text-grayForText col-span-1  self-center'>Ціна:</span>
                                    <span className='col-span-3'>{data?.payload.price} {currency}</span>
                                </div>

                                    <hr className='my-1' />

                                    {data?.payload.options.map((opt:SelectedOption,index:number)=>
                                        <div key={index} className='my-2 grid grid-cols-4'>
                                            <span className=' text-grayForText col-span-1  text-sm self-center'>{opt.title}:</span>
                                            <span className='col-span-3'>{opt.variant}</span>
                                        </div>
                                    )}

                                    <hr className='my-1' />
                                    
                                {/* <div className='my-2 grid grid-cols-4'>
                                    <span className=' text-grayForText col-span-1  text-sm self-center'>Кастомізація:</span>
                                    <span className='col-span-3'>Індивідуальний логотип та дизайн індивідуальних пакетів</span>
                                </div> */}

                            </div>
                    

                        </div>
                    </div>

                    <div className='xl:col-span-3 col-span-10 px-2 xl:pl-10'>
                        <div className='border border-grayColorForBorder rounded-lg p-3'>
                            <div className=' flex'>
                                <div className=' bg-slate-400 w-16 h-16 rounded-lg bg-cover'  style={{backgroundImage: `url(${data?.payload.companyVM?.image})`}}/>
                                <div className='ml-4 my-auto'>
                                    <p>{data?.payload.companyVM?.name}</p>
                                    {/* <p>Guanjoi Trading LLC</p> */}
                                </div>
                            </div>
                            <hr className='my-4' />
                            <div className='grid grid-cols-10 my-2 text-grayForText'>
                                <div className='flex justify-center'>
                                    <img className='h-3 self-center' src={germany} />
                                </div>
                                <p className='ml-4 col-span-9 '>Німеччина, Берлін</p>
                            </div>
                            <div className='grid grid-cols-10 my-2 text-grayForText'>
                                <div className='flex justify-center'>
                                    <img className='h-4 self-center' src={verified_user} />
                                </div>
                                <p className='ml-4 col-span-9'>Перевірений продавець</p>
                            </div>
                            <div className='grid grid-cols-10 my-2 text-grayForText'>
                                <div className='flex justify-center'>
                                    <img className='h-4 self-center' src={planet} />
                                </div>
                                <p className='ml-4 col-span-9 '>Доставка по всьому світу</p>
                            </div>

                            <button onClick={()=>{ handleAddNewOrder(data?.payload!)}} className='hover:bg-orange-300 flex mx-auto bg-mainYellowColor py-2 w-full justify-center rounded-lg text-white'>
                                Надіслати запит
                            </button>
                            <button className='border border-grayColorForBorder mt-3 flex mx-auto py-2 w-full justify-center rounded-lg'>
                                Профіль продавця
                            </button>
                        </div>
                    </div>


                    <div className='grid grid-cols-12 col-span-12 mt-12'>
                        <div className='xl:mr-2 mb-4 xl:col-span-9 col-span-12'>
                            <div className='border border-grayColorForBorder rounded-lg pb-4'>
                                <div className='flex flex-col'>
                                <div className=' flex '>
                                    <div onClick={()=>navigate("/product/description/" + params.productId)} className=' '>
                                        <p className={classNames(
                                        'select-none cursor-pointer xl:px-10 px-2 p-4 text-sm ',
                                        {
                                            'text-grayForText': !location.pathname.includes('description'),
                                        }
                                        )}>Опис</p>
                                        <div className=' bg-slate-500 h-0.5 w-11/12 mx-auto' />
                                    </div>
                                    <div onClick={()=>navigate("/product/reviews/" + params.productId)} className=''>
                                        <p className={classNames(
                                        'select-none cursor-pointer xl:px-10 px-2 p-4 text-sm ',
                                        {
                                            'text-grayForText': !location.pathname.includes('reviews'),
                                        }
                                        )}>Відгуки</p>
                                        <div className=' bg-slate-500 h-0.5 w-11/12 mx-auto' />
                                    </div>
                                    <div className=''>
                                        <p className='select-none cursor-pointer xl:px-10 px-2 p-4 text-sm  text-grayForText'>Доставка</p>
                                        <div className=' bg-slate-500 h-0.5 w-11/12 mx-auto' />
                                    </div>
                                    <div className=''>
                                        <p className='select-none cursor-pointer xl:px-10 px-2 text-sm p-4 text-grayForText'>Про продавця</p>
                                        <div className=' bg-slate-500 h-0.5 w-11/12 mx-auto' />
                                    </div>
                                </div>
                                <hr className='mb-2'/>
                                </div>
                                <Outlet/>
                            </div>
                        </div>

                        <div className='ml-2 col-span-3 hidden  xl:block'>
                            <div className='border border-grayColorForBorder rounded-lg p-4'>
                            <p className=' font-semibold'>Вам може сподобатись</p>
                            {recomendedProducts_1?.map((prod)=>{
                                return <>
                                    <Link  onClick={()=>handleLinkClick()} to={"/product/description/"+prod.id} className='flex mt-4 h-[70px] my-4 mb-8'>
                                        <div>
                                            <div className='h-[80px] w-[80px] rounded-lg border bg-contain bg-no-repeat bg-center mr-2' style={{backgroundImage: `url(${prod.image})`}}  />
                                        </div>
                                        <div className='grid grid-rows-2  h-full'>
                                            <div className='h-12 overflow-hidden'>
                                                <p className='pr-4'>{prod.name}</p>
                                            </div>
                                            <p className=' self-end text-grayForText'>{prod.price} {currency}</p>
                                        </div>
                                    </Link>
                                </>
                            })}

                            {/* <div className='flex mt-4 h-[70px] my-4 mb-8'>
                                <div className='h-[80px] w-[80px] rounded-lg border bg-contain bg-no-repeat bg-center mr-2' style={{backgroundImage: `url(${mainImage})`}}  />
                                <div className='grid grid-rows-2'>
                                    <p className='pr-4'>Men Blazers Sets Elegant Formal</p>
                                    <p className=' self-end text-grayForText'>1000-25000 {currency}</p>
                                </div>
                            </div>
                            <div className='flex mt-4 h-[70px] my-4 mb-8'>
                                <div className='h-[80px] w-[80px] rounded-lg border bg-contain bg-no-repeat bg-center mr-2' style={{backgroundImage: `url(${mainImage})`}}  />
                                <div className='grid grid-rows-2'>
                                    <p className='pr-4'>Men Blazers Sets Elegant Formal</p>
                                    <p className=' self-end text-grayForText'>1000-25000 {currency}</p>
                                </div>
                            </div>
                            <div className='flex mt-4 h-[70px] my-4 mb-8'>
                                <div className='h-[80px] w-[80px] rounded-lg border bg-contain bg-no-repeat bg-center mr-2' style={{backgroundImage: `url(${mainImage})`}}  />
                                <div className='grid grid-rows-2'>
                                    <p className='pr-4'>Men Blazers Sets Elegant Formal</p>
                                    <p className=' self-end text-grayForText'>1000-25000 {currency}</p>
                                </div>
                            </div>
                            <div className='flex mt-4 h-[70px] my-4 '>
                                <div className='h-[80px] w-[80px] rounded-lg border bg-contain bg-no-repeat bg-center mr-2' style={{backgroundImage: `url(${mainImage})`}}  />
                                <div className='grid grid-rows-2'>
                                    <p className='pr-4'>Men Blazers Sets Elegant Formal</p>
                                    <p className=' self-end text-grayForText'>1000-25000 {currency}</p>
                                </div>
                            </div> */}
                            </div>


                        </div>

                        
                    </div>


                    <div className='p-2 border rounded-lg mb-4 text-[18px]  col-span-12'>
                        <p className='p-2  font-semibold'>Схожі товари</p>
                        <div className='mb-4 grid grid-cols-3 xl:grid-cols-6  xl:gap-2'>

                        {recomendedProducts_2?.map((prod)=>{
                            return <>
                                <Link onClick={()=>handleLinkClick()} to={"/product/description/"+prod.id}>
                                    <div className='p-2'>
                                        <div className='h-[70px] overflow-hidden lg:h-[150px] xl:h-[220px] hover:contrast-100 transition-all contrast-75 rounded-lg  bg-cover bg-no-repeat bg-center xl:mr-2' style={{backgroundImage: `url(${prod.image})`}}   />
                                        <p className='mt-2 h-[60px] overflow-hidden'>{prod.name} </p>
                                        <p className=' text-sm text-grayForText'>{prod.price} {currency}</p>
                                    </div>
                                </Link>
                            </>
                        })}



                        </div>
                    </div>

                    {/* РОЗСИЛКА НА ЕМАЙЛ */}
                    <div className=" my-14 xl:block lg:block hidden  col-span-12">
                      <div className="text-white p-6 w-full bg-darkBlueColor flex justify-between ">
                        <p className=" text-sm xl:text-base self-center">
                          Підпишіться на нашу розсилку - отримайте купон на 300 {currency} на перше замовлення!
                        </p>
                        <div className="flex self-center text-sm w-4/12 ">
                          <input type="text" placeholder="Введіть адресу електронної пошти" className="border text-black rounded-l-full px-2 h-9 outline-0  w-full border-grayColorForBorder "></input>
                          <button className=" bg-mainYellowColor rounded-r-full p-1 px-3">Apply</button>
                        </div>
                      </div>
                    </div>

            </div>

        </div>
        </>
        
};
    
export default OneProduct;