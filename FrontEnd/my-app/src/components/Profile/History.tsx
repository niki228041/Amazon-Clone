import React, { useState } from 'react'
import circle from '../../images/black-circle.png';
import Calendar from '../../images/Calendar.svg';
import SharpArrowRight from '../../images/SharpArrowRight.svg';
import WhitePlus from '../../images/WhitePlus.svg';
import BlankProfilePicture from '../../images/blankProfilePicture.webp';
import background_1 from '../../images/yellowBlackBackground.jpg'
import background_2 from '../../images/blackWaves.jpg'
import background_3 from '../../images/purpleWavesBackground.jpg'
import blackDot from '../../images/blackDot.svg'
import arrowRight from '../../images/ArrowRightS.svg';
import search from '../../images/searchLittleBlue.svg';
import arrowDownForSearch from '../../images/arrow_down.svg';
import './Profile.css';

import waves from '../../images/waves.png'
import dd from '../../images/Billie-Eilish-Happier-Than-Ever 1.png'
import chip from '../../images/chip.png'

import classNames from 'classnames';
import { OrderedOrder } from '../types';
import { useGetOrdersByUserIdQuery } from '../../features/user/apiOrderSlice';
import { useAppSelector } from '../../app/hooks';
import { parseISO ,format} from 'date-fns';
import { uk } from 'date-fns/locale';
import { GetCurrency } from '../../api/jwtDecodeToken';
import { Link } from 'react-router-dom';

const HistoryItem=({order}:{order:OrderedOrder})=>{
  const [dropDown,setDropDown] =  useState(false);
  const [elementHeight, setElementHeight] = useState("0px"); // Initial height
  console.log(order);
  var currency = useAppSelector((state)=>state.currency.currency);


  function formatDateDifference(dateString:string) {
    const date = parseISO(dateString);
    const now = new Date();
  
  
    const difference = format(date, 'dd MMMM yyyy', { locale: uk })
  
    return difference;
  }

  console.log(order.dateCreated);

  // Create a DOMParser
  const parser = new DOMParser();
  
  return<>
  
  <div className='my-1'>
    <div className=' bg-gray-200 p-4 px-6 rounded-lg flex justify-between'>

    <div className='flex'>
      <div className=''>
        <p className='font-medium text-[16px] text-grayColorForHeader '>Дата замовлення</p>
        <span className=' text-sm font-medium text-grayColorForHeader'>{formatDateDifference(order?.dateCreated)}</span>
      </div>
      <div className='mx-4'></div>
      <div className=''>
        <p className='font-medium text-[16px] text-grayColorForHeader '>Сума</p>
        <span className=' text-sm font-medium text-grayColorForHeader'>{order.price} {currency}</span>
      </div>
      <div className='mx-4'></div>
      <div className=''>
        <p className='font-medium text-[16px] text-grayColorForHeader '>Відправлено до</p>
        <span className=' text-sm font-medium cursor-pointer text-darkBlueColor'>{order.userName}</span>
      </div>

    </div>

    <div className=''>
      <span className=' text-grayColorForHeader text-sm font-medium'>ЗАМОВЛЕННЯ № {order.id}</span>
      <div className='flex justify-between'>
        <span className=' font-medium cursor-pointer text-sm text-darkBlueColor'>Деталі </span>
        <div className='flex cursor-pointer' onClick={()=>{setDropDown(!dropDown);setElementHeight(dropDown ? '0px' : (order?.products?.length * 167 + 60)+ "px");}}>
          <span className=' font-medium text-sm text-darkBlueColor' >Invoice</span>
          <img className={classNames(" transition-all h-6 ",{"rotate-180":dropDown})} src={arrowDownForSearch} />
        </div>
        
      </div>
    </div>

    

    </div>

    <div className='  w-full is-profile overflow-hidden  ' style={{ height: elementHeight}}>
      {order?.products != null ?
      <>
        <p className=' pt-4 font-semibold text-lg'>Доставлено {formatDateDifference(order?.dateCreated)}</p>
        <p className=' font-semibold '>{order?.isBought ? "Посилка була передана покупцю " : "Обробка замовлення"}</p>
      </>

      :""}
      
      {order?.products?.map((prod)=>
        <div className=' py-3 flex  justify-between'>
          
          <div className='flex w-2/3'>
            <div>
              <div className='h-28 w-28 rounded-lg bg-center bg-cover' style={{backgroundImage:`url(${prod.product?.image})`}} />
            </div>
            <div className='ml-2 text-gray-500 '>
              <p className=' font-medium h-7 overflow-hidden'>{prod.product?.name}</p>
              <p className=' text-gray-400 h-7 overflow-hidden'>{parser.parseFromString(prod.product?.description, 'text/html').body.textContent?.slice(0,30)}</p>
              <p className=' text-gray-500 text-sm'>Час на повернення товару скінчився 6 вересня</p>
              <div className='mt-4'>
                <Link to={"/product/description/"+prod.product?.id} className=' bg-mainYellowColor rounded-lg py-2 px-2 text-sm text-white hover:bg-orange-500 transition-all'>Купити знову</Link>
                <button className=' border border-gray-300 rounded-lg py-2 px-2 text-sm shadow-lg ml-4 hover:shadow-none transition-all'>Детальніше</button>
              </div>
            </div>
          </div>

          <div className=' p-2 self-center'>
            <div className=' rounded-sm flex justify-center border py-1 px-16 hover:bg-gray-200 cursor-pointer self-center mb-7'>Допомога</div>
            <Link to={"/product/reviews/"+prod.product?.id} className=' rounded-sm flex justify-center border py-1 px-16 hover:bg-gray-200 cursor-pointer self-center '>Залишити відгук</Link>
          </div>
        </div>
      )}

      


    </div>
  </div>
  
  </>
}


const ProfileHistory=()=> {
  const [selectedTab,setSelectedTab] =  useState("Всі замовлення");
  const [searchText,setSearchText] =  useState("");
  const [searchingText,setSearchingText] =  useState("");
  var user = useAppSelector((state)=>state.user.user);

  var {data,isSuccess}:{data:OrderedOrder[],isSuccess:boolean} = useGetOrdersByUserIdQuery({id:user.id});

  console.log(searchText);

  return (
    <div >

        <div className='flex justify-between'>
          <div className='mb-8 flex text-[30px] text-black font-semibold '>Історія замовлень</div>
          <div className=' flex w-2/6  '>
            
            <div className='w-full mr-4'>
              <div className='mr-3 relative flex w-full'>
                <img className=' absolute self-center pl-3' src={search} />
                <input onChange={(e)=>setSearchText(e.currentTarget.value)} value={searchText}  className=' outline-0 border w-full rounded-md text-sm py-2 flex pl-10' placeholder='Пошук по вашим замовленням ' />
              </div>
            </div>
            
            <div className=''>
              <div onClick={()=>setSearchingText(searchText)} className=' bg-darkBlueColor p-2 rounded-lg px-6 text-white hover:bg-blue-500 cursor-pointer'>
                Пошук
              </div>
            </div>

          </div>

          
          
        </div>
        
        <div className='mb-5 flex'>
          <span onClick={()=>setSelectedTab("Всі замовлення")} className={classNames(' text-lg font-semibold cursor-pointer',{"text-gray-400":selectedTab != "Всі замовлення"})}>Всі замовлення</span>
          <div className='mx-4'></div>
          <span onClick={()=>setSelectedTab("У обробці")} className={classNames(' text-lg font-semibold cursor-pointer',{"text-gray-400":selectedTab != "У обробці"})}>У обробці</span>
          <div className='mx-4'></div>
          <span onClick={()=>setSelectedTab("Куплені")} className={classNames(' text-lg font-semibold cursor-pointer',{"text-gray-400":selectedTab != "Куплені"})}>Куплені</span>
          <div className='mx-4'></div>
          <span onClick={()=>setSelectedTab("Скасовані")} className={classNames(' text-lg font-semibold cursor-pointer',{"text-gray-400":selectedTab != "Скасовані"})}>Скасовані</span>
        </div>

        {data?.filter(order => {
          if(selectedTab == "Всі замовлення")
          {
            return true;
          }
          if(selectedTab == "У обробці")
          {
            return !order.isBought;
          }
          if(selectedTab == "Куплені")
          {
            return order.isBought;
          }
        
        })
        ?.filter(order => {
          // Check if the order contains the searchingText in any of its products
          if (searchingText) {
            if (order.products) {
              // Convert the searchingText to lowercase for case-insensitive search
              const searchTextLower = searchingText.toLowerCase();
      
              // Check if any product's name (converted to lowercase) includes the searchingText (converted to lowercase)
              const productMatches = order.products.some(prod =>
                prod.product?.name.toLowerCase().includes(searchTextLower)
              );
      
              return productMatches;
            } else {
              // If there are no products, exclude the order
              return false;
            }
          }
      
          // If no searchingText is provided, return true to include the order.
          return true;
        })
        .map((order, id) => (
          <div key={id}>
            <HistoryItem order={order} />
          </div>
        ))}


        <div className=' font-medium text-gray-500 hover:underline cursor-pointer my-6'>
          Показати всі 
        </div>
       

    </div>
  )
}

export default ProfileHistory