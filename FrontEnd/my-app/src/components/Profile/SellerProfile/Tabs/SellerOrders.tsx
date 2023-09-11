import { parseISO,format } from 'date-fns';
import React, { useState } from 'react'
import { uk } from 'date-fns/locale';
import { Order, OrderForSeller, OrderedOrder } from '../../../types';
import { useAppSelector } from '../../../../app/hooks';
import { useGetOrdersByUserIdQuery } from '../../../../features/user/apiOrderSlice';
import classNames from 'classnames';
import arrowDownForSearch from '../../../../images/arrow_down.svg';

export const OrderItem=({order}:{order:OrderedOrder})=>{

    var currency = useAppSelector((state)=>state.currency.currency);

    const [dropDown,setDropDown] =  useState(false);
    const [elementHeight, setElementHeight] = useState("0px"); // Initial height
    console.log(order);
    var currency = useAppSelector((state)=>state.currency.currency);
    const parser = new DOMParser();
  

    function formatDateDifference(dateString:string) {
        const date = parseISO(dateString);
        const now = new Date();
      
      
        const difference = format(date, 'dd MMMM yyyy', { locale: uk })
      
        return difference;
      }

    return(
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
            <p className='font-medium text-[16px] text-grayColorForHeader '>Клієнт</p>
            <span className=' text-sm font-medium cursor-pointer text-darkBlueColor'>Шафранська Анна</span>
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
            {order.products != null ?
            <>
              <p className=' pt-4 font-semibold text-lg'>Доставлено {formatDateDifference(order?.dateCreated)}</p>
              <p className=' font-semibold '>Посилка була передана покупцю </p>
            </>

            :""}

            {order?.products?.map((prod)=>
              <div className=' py-3 flex  justify-between'>
                <div className='flex '>
                  <div>
                    <div className='h-28 w-28 rounded-lg bg-center bg-cover' style={{backgroundImage:`url(${prod.product?.image})`}} />
                  </div>
                  <div className='ml-2 text-gray-500 '>
                    <p className=' font-medium '>{prod.product?.name}</p>
                    <p className=' text-gray-400 mt-2'>{parser.parseFromString(prod.product?.description, 'text/html').body.textContent?.slice(0,30)}</p>
                    <p className=' text-gray-500 text-sm'>Час на повернення товару скінчився 6 вересня</p>
                    <div className='mt-4'>
                      <button className=' bg-mainYellowColor rounded-lg py-2 px-2 text-sm text-white hover:bg-orange-500 transition-all'>Закрити замовлення</button>
                      <button className=' border border-gray-300 rounded-lg py-2 px-2 text-sm shadow-lg ml-4 hover:shadow-none transition-all'>Скасувати замовлення</button>
                    </div>
                  </div>
                </div>
            
                <div className=' p-2 self-center flex'>
                  <div className=' rounded-sm flex text-sm flex-nowrap whitespace-nowrap justify-center border py-1 px-6 hover:bg-gray-200 cursor-pointer self-center mb-7'>Переглянути сторінку товара</div>
                </div>
              </div>
            )}
        </div>


    </div>
    )
}


function SellerOrders() {

    var user = useAppSelector(((state)=>state.user.user));
    var {data:orders,isSuccess}:{data:OrderedOrder[],isSuccess:boolean} = useGetOrdersByUserIdQuery({id:user.id});


  return (
    <div>
      <div className='flex'>

        <div className=' w-full py-4 '>
            { orders?.map(order=>{
                return <OrderItem order={order} />
            }) }
        </div>

      </div>
    </div>
  )
}

export default SellerOrders