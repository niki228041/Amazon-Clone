import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import tmp from '../../images/telik.jpg'
import CoworkingSetup from '../../images/CoworkingSetup.png'
import arrowRight from '../../images/arrowRight.png'
import arrowRightGray from '../../images/arrowRightGray.svg'
import discount from '../../images/discount.png'
import classNames from 'classnames'
import { getRecomendedProducts } from './OneProduct'
import { Product } from '../types'
import { apiProductSlice } from '../../features/user/apiProductSlice'
import { Link } from 'react-router-dom'
import { Oval } from 'react-loader-spinner'
import { GetCurrency } from '../../api/jwtDecodeToken'
import { useAppSelector } from '../../app/hooks'


const loader = () => {
    return (
      <div className='m-auto flex self-center justify-center '>
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
          strokeWidthSecondary={2} />
      </div>
  
    )
  }

function TodaysDeals() {
   var [countOfDeals,setCountOfDeals] = useState(0);
   var [currentDeals,setCurrentDeals] = useState(0);

   var [offset,setOffset] = useState(currentDeals * 220*5);

   var currency = useAppSelector((state)=>state.currency.currency);

   var [countOfSmallIconDeals,setCountOfSmallIcon] = useState(5);
   var [currentSmallIcon,setCurrentSmallIcon] = useState(0);
   var [recomendedProducts,setRecomendedProducts] = useState<Product[]>([]);

   var [smallIconOffset,setSmallIconOffset] = useState(currentSmallIcon * 220*5);
   const currencyRef = useRef(GetCurrency());
   
   var request:getRecomendedProducts = {limit:12,categoryId:0}; 
   const [getRecomendedProducts,{}] = apiProductSlice.useGetProductWithLimitByCategoryIdMutation();

   useEffect(()=>{
      if (recomendedProducts?.length <= 0) {
        getRecomendedProducts(request).then((res: any) => {
          console.log(res.data?.payload);
          setRecomendedProducts(res.data?.payload);
        });
      }
   },[])    

   useEffect(()=>{
    console.log(recomendedProducts?.length/4);
    setCountOfDeals(recomendedProducts?.length/4);
   },[recomendedProducts])



  return (
    <div>
       <div className="mx-auto w-10/12 ">
        <div className='mb-4 flex text-[20px] font-bold'>CЬОГОДНІШНІ ПРОПОЗИЦІЇ </div>

        
        
        <div className=' overflow-x-hidden flex relative h-[370px] w-full'>
            
        {recomendedProducts?.length>0 ? 
        <div className="flex absolute h-[320px] justify-center self-center transition-all duration-500" style={{ transform: `translateX(-${offset}px)` }}>


                <Link to={"/product/description/" + recomendedProducts[0]?.id} className='rounded-lg w-[500px]  mr-3 bg-center bg-contain bg-no-repeat hover:scale-95 transition-all duration-200 active:duration-100 cursor-pointer active:scale-100 ' style={{backgroundImage:`url(${recomendedProducts[0]?.image})`}}>
                </Link>

                {recomendedProducts?.map((prod:Product)=>{
                    return<>
                    <Link to={"/product/description/" + prod.id} className='border relative flex hover:border-mainYellowColor p-3 rounded-lg mx-3  w-[220px] hover:scale-105 transition-all duration-200 active:duration-100 cursor-pointer active:scale-100 '>
                        <div className=' self-center'>
                            <div className='w-full h-[100px] bg-contain bg-center bg-no-repeat mt-2' style={{backgroundImage:`url(${prod.image})`}} ></div>
                            <div className=' text-sm font-semibold mt-2'>Гаряча пропозиція</div>
                            <div className=' text-sm mt-2 h-10 overflow-hidden '>{prod.name}</div>
                            <div className='flex mt-1'>
                                <div className=' self-center'>
                                    <div className=' bg-rose-600 text-white rounded-lg py-1 px-3 font-semibold text-sm overflow-x-clip w-14 '>-{prod.discount}%</div>
                                </div>
                                <div className=' text-rose-600 rounded-lg py-1 ml-2 font-semibold text-sm '>Пропозиція лімітована по часу </div>
                            </div>
                            <div className=' font-bold text-lg '>
                                {prod.price} {currency}
                            </div>
                        </div>
                    </Link>
                    </>
                })}
                
        </div>
        :<>{loader()}</>  }

            <div onClick={()=>{
                

                if(currentDeals > 0)
                {
                    setCurrentDeals(currentDeals-1);
                    setOffset(((currentDeals-2) * 240*3) + 500);
                }

                if(currentDeals == 1)
                {
                    setOffset(0);
                }

              


            }} className=' left-0 self-center ml-5  bg-whiteGray rounded-full h-20 w-20 absolute m-auto flex justify-center hover:scale-110 active:scale-90 transition-all duration-100'>
                <img className=' rotate-180 self-center h-10' src={arrowRight} />
            </div>
            <div onClick={()=>{
                

                if(currentDeals <= countOfDeals)
                {
                    setCurrentDeals(currentDeals+1);
                    setOffset(((currentDeals) * 240*3) + 500);
                    console.log(((currentDeals) * 240*3) + 500);
                    console.log((currentDeals));
                }

                if(currentDeals == 0)
                {
                    setOffset(500);
                }
                
                
                
            }}  className=' right-0 self-center mr-5  bg-whiteGray rounded-full h-20 w-20 absolute m-auto flex justify-center hover:scale-110 active:scale-90 transition-all duration-100'>
                <img className=' self-center h-10' src={arrowRight} />
            </div>
        </div>
        
        <div className=' overflow-x-hidden flex relative h-[200px] w-full px-20 bg-slate-100'>
            <div className='overflow-x-hidden flex relative h-[200px] w-full px-4  justify-center'>
            <div className="flex absolute justify-center self-center transition-all duration-500" style={{ transform: `translateX(-${smallIconOffset}px)` }}>
                <div className=''>
                    <div style={{backgroundImage:`url(${discount})`}} className=' bg-contain bg-center bg-no-repeat border relative flex justify-center  hover:border-mainYellowColor p-3 rounded-full mx-3 w-[117px]  h-[117px]  hover:scale-105 transition-all duration-200 active:duration-100 cursor-pointer active:scale-100 '>
                        <div className=' self-center' >
                            <div className='w-full h-[100px]  mt-2'  ></div>
                        </div>
                    </div>

                    <span className=' text-sm font-semibold mt-2 flex justify-center '>Всі пропозиції </span>
                </div>
                <div className=''>
                    <div style={{backgroundImage:`url(${discount})`}} className=' bg-contain bg-center bg-no-repeat border relative flex justify-center  hover:border-mainYellowColor p-3 rounded-full mx-3 w-[117px]  h-[117px]  hover:scale-105 transition-all duration-200 active:duration-100 cursor-pointer active:scale-100 '>
                        <div className=' self-center' >
                            <div className='w-full h-[100px]  mt-2'  ></div>
                        </div>
                    </div>

                    <span className=' text-sm font-semibold mt-2 flex justify-center '>Всі пропозиції </span>
                </div>
                <div className=''>
                    <div style={{backgroundImage:`url(${discount})`}} className=' bg-contain bg-center bg-no-repeat border relative flex justify-center  hover:border-mainYellowColor p-3 rounded-full mx-3 w-[117px]  h-[117px]  hover:scale-105 transition-all duration-200 active:duration-100 cursor-pointer active:scale-100 '>
                        <div className=' self-center' >
                            <div className='w-full h-[100px]  mt-2'  ></div>
                        </div>
                    </div>

                    <span className=' text-sm font-semibold mt-2 flex justify-center '>Всі пропозиції </span>
                </div>
                <div className=''>
                    <div style={{backgroundImage:`url(${discount})`}} className=' bg-contain bg-center bg-no-repeat border relative flex justify-center  hover:border-mainYellowColor p-3 rounded-full mx-3 w-[117px]  h-[117px]  hover:scale-105 transition-all duration-200 active:duration-100 cursor-pointer active:scale-100 '>
                        <div className=' self-center' >
                            <div className='w-full h-[100px]  mt-2'  ></div>
                        </div>
                    </div>

                    <span className=' text-sm font-semibold mt-2 flex justify-center '>Всі пропозиції </span>
                </div>
                <div className=''>
                    <div style={{backgroundImage:`url(${discount})`}} className=' bg-contain bg-center bg-no-repeat border relative flex justify-center  hover:border-mainYellowColor p-3 rounded-full mx-3 w-[117px]  h-[117px]  hover:scale-105 transition-all duration-200 active:duration-100 cursor-pointer active:scale-100 '>
                        <div className=' self-center' >
                            <div className='w-full h-[100px]  mt-2'  ></div>
                        </div>
                    </div>

                    <span className=' text-sm font-semibold mt-2 flex justify-center '>Всі пропозиції </span>
                </div>
                <div className=''>
                    <div style={{backgroundImage:`url(${discount})`}} className=' bg-contain bg-center bg-no-repeat border relative flex justify-center  hover:border-mainYellowColor p-3 rounded-full mx-3 w-[117px]  h-[117px]  hover:scale-105 transition-all duration-200 active:duration-100 cursor-pointer active:scale-100 '>
                        <div className=' self-center' >
                            <div className='w-full h-[100px]  mt-2'  ></div>
                        </div>
                    </div>

                    <span className=' text-sm font-semibold mt-2 flex justify-center '>Всі пропозиції </span>
                </div>
                <div className=''>
                    <div style={{backgroundImage:`url(${discount})`}} className=' bg-contain bg-center bg-no-repeat border relative flex justify-center  hover:border-mainYellowColor p-3 rounded-full mx-3 w-[117px]  h-[117px]  hover:scale-105 transition-all duration-200 active:duration-100 cursor-pointer active:scale-100 '>
                        <div className=' self-center' >
                            <div className='w-full h-[100px]  mt-2'  ></div>
                        </div>
                    </div>

                    <span className=' text-sm font-semibold mt-2 flex justify-center '>Всі пропозиції </span>
                </div>
                <div className=''>
                    <div style={{backgroundImage:`url(${discount})`}} className=' bg-contain bg-center bg-no-repeat border relative flex justify-center  hover:border-mainYellowColor p-3 rounded-full mx-3 w-[117px]  h-[117px]  hover:scale-105 transition-all duration-200 active:duration-100 cursor-pointer active:scale-100 '>
                        <div className=' self-center' >
                            <div className='w-full h-[100px]  mt-2'  ></div>
                        </div>
                    </div>

                    <span className=' text-sm font-semibold mt-2 flex justify-center '>Всі пропозиції </span>
                </div>
                <div className=''>
                    <div style={{backgroundImage:`url(${discount})`}} className=' bg-contain bg-center bg-no-repeat border relative flex justify-center  hover:border-mainYellowColor p-3 rounded-full mx-3 w-[117px]  h-[117px]  hover:scale-105 transition-all duration-200 active:duration-100 cursor-pointer active:scale-100 '>
                        <div className=' self-center' >
                            <div className='w-full h-[100px]  mt-2'  ></div>
                        </div>
                    </div>

                    <span className=' text-sm font-semibold mt-2 flex justify-center '>Всі пропозиції </span>
                </div>
                <div className=''>
                    <div style={{backgroundImage:`url(${discount})`}} className=' bg-contain bg-center bg-no-repeat border relative flex justify-center  hover:border-mainYellowColor p-3 rounded-full mx-3 w-[117px]  h-[117px]  hover:scale-105 transition-all duration-200 active:duration-100 cursor-pointer active:scale-100 '>
                        <div className=' self-center' >
                            <div className='w-full h-[100px]  mt-2'  ></div>
                        </div>
                    </div>

                    <span className=' text-sm font-semibold mt-2 flex justify-center '>Всі пропозиції </span>
                </div>
                <div className=''>
                    <div style={{backgroundImage:`url(${discount})`}} className=' bg-contain bg-center bg-no-repeat border relative flex justify-center  hover:border-mainYellowColor p-3 rounded-full mx-3 w-[117px]  h-[117px]  hover:scale-105 transition-all duration-200 active:duration-100 cursor-pointer active:scale-100 '>
                        <div className=' self-center' >
                            <div className='w-full h-[100px]  mt-2'  ></div>
                        </div>
                    </div>

                    <span className=' text-sm font-semibold mt-2 flex justify-center '>Всі пропозиції </span>
                </div>
                <div className=''>
                    <div style={{backgroundImage:`url(${discount})`}} className=' bg-contain bg-center bg-no-repeat border relative flex justify-center  hover:border-mainYellowColor p-3 rounded-full mx-3 w-[117px]  h-[117px]  hover:scale-105 transition-all duration-200 active:duration-100 cursor-pointer active:scale-100 '>
                        <div className=' self-center' >
                            <div className='w-full h-[100px]  mt-2'  ></div>
                        </div>
                    </div>

                    <span className=' text-sm font-semibold mt-2 flex justify-center '>Всі пропозиції </span>
                </div>
            </div>
            </div>

            <div onClick={()=>{
                

                if(currentSmallIcon > 0)
                {
                    setCurrentSmallIcon(currentSmallIcon-1);
                    setSmallIconOffset(((currentSmallIcon-1) * 70*2));
                }

                if(currentSmallIcon == 1)
                {
                    setSmallIconOffset(0);
                }

              


            }} className=' left-0 self-center ml-5  bg-white rounded-lg h-12 w-12 absolute m-auto flex justify-center hover:scale-110 active:scale-90 transition-all duration-100'>
                <img className=' rotate-180 self-center h-6' src={arrowRightGray} />
            </div>
            <div onClick={()=>{
                

                if(currentSmallIcon <= countOfSmallIconDeals)
                {
                    setCurrentSmallIcon(currentSmallIcon+1);
                    setSmallIconOffset(((currentSmallIcon+1) * 70*2));
                    console.log(((currentSmallIcon) * 70*2));
                    console.log((currentSmallIcon));
                }

                
                
                
            }}  className=' right-0 self-center mr-5  bg-white rounded-lg h-12 w-12 absolute m-auto flex justify-center hover:scale-110 active:scale-90 transition-all duration-100'>
                <img className=' self-center h-6' src={arrowRightGray} />
            </div>
        </div>

       </div>
    </div>
  )
}


export default TodaysDeals
