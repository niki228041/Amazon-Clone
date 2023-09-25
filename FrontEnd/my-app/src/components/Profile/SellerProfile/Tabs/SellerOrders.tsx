import { parseISO,format } from 'date-fns';
import React, { useEffect, useState } from 'react'
import { uk } from 'date-fns/locale';
import { Order, OrderForSeller, OrderedOrder } from '../../../types';
import { useAppSelector } from '../../../../app/hooks';
import {  apiOrderSlice, useGetOrdersByCompanyIdWithPaginationQuery} from '../../../../features/user/apiOrderSlice';
import classNames from 'classnames';
import arrowDownForSearch from '../../../../images/arrow_down.svg';
import { useGetCompanyByUserIdQuery } from '../../../../features/user/apiCompanySlice';
import { Company } from '../../../Admin/types';
import { Link } from 'react-router-dom';


export interface OrdersWithPagination{
  orders:OrderForSeller[],
  total:number
}

export const OrderItem=({order}:{order:OrderForSeller})=>{

    var currency = useAppSelector((state)=>state.currency.currency);
    var [closeAnOrderById,{}] = apiOrderSlice.useCloseAnOrderByIdMutation();


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

      console.log("order?.products");
      console.log(order?.products);

    return(
    <div className='my-1 text-zinc-950'>
        <div className=' bg-gray-200 p-4 px-6 rounded-lg flex justify-between'>

        <div className='flex'>
          <div className=''>
            <p className='font-medium text-[16px] text-grayColorForHeader '>Дата замовлення</p>
            <span className=' text-sm font-medium text-grayColorForHeader'>{formatDateDifference(order?.dateCreated)}</span>
          </div>
          <div className='mx-4'></div>
          <div className=''>
            <p className='font-medium text-[16px] text-grayColorForHeader '>Сума</p>
            <span className=' text-sm font-medium text-grayColorForHeader'>{order?.price} {currency}</span>
          </div>
          <div className='mx-4'></div>
          <div className=''>
            <p className='font-medium text-[16px] text-grayColorForHeader '>Клієнт</p>
            <span className=' text-sm font-medium cursor-pointer text-darkBlueColor'>{order.userName}</span>
          </div>

        </div>

        <div className=''>
          <span className=' text-grayColorForHeader text-sm font-medium'>ЗАМОВЛЕННЯ № {order.id}</span>
          <div className='flex justify-between'>
            <span className=' font-medium cursor-pointer text-sm text-darkBlueColor'>Деталі </span>
            <div className='flex cursor-pointer' onClick={()=>{setDropDown(!dropDown);setElementHeight(dropDown ? '0px' : (order?.products?.length * 167 + 300)+ "px");}}>
              <span className=' font-medium text-sm text-darkBlueColor' >Invoice</span>
              <img className={classNames(" transition-all h-6 ",{"rotate-180":dropDown})} src={arrowDownForSearch} />
            </div>

          </div>
        </div>

        

        </div>



        <div className='  w-full is-profile overflow-hidden  ' style={{ height: elementHeight}}>

            <p className=' pt-4 font-semibold text-xl mt-2'>Адреса</p>
            <div className=' flex justify-between px-16'>
              <div>
                <p className=' pt-2 font-semibold text-md'>Країна</p>
                <p className=' pt-2  text-md'>{order.address.country}</p>
              </div>

              <div className=' w-[4px] self-center h-[55px] bg-slate-300 rounded-lg'/>
              
              <div>
                <p className=' pt-2 font-semibold text-md'>Місто</p>
                <p className=' pt-2  text-md'>{order.address.city}</p>
              </div>

              <div className=' w-[4px] self-center h-[55px] bg-slate-300 rounded-lg'/>

              <div>
                <p className=' pt-2 font-semibold text-md'>Вулиця</p>
                <p className=' pt-2  text-md'>{order.address.street}</p>
              </div>

              <div className=' w-[4px] self-center h-[55px] bg-slate-300 rounded-lg'/>

              <div>
                <p className=' pt-2 font-semibold text-md'>Поштовий індех</p>
                <p className=' pt-2  text-md'>{order.address.postcode}</p>
              </div>

              <div className=' w-[4px] self-center h-[55px] bg-slate-300 rounded-lg'/>

              <div className=''>
                <p className=' pt-2 font-semibold text-md'>Телефон</p>
                <p className=' pt-2  text-md'>{order.address.phone}</p>
              </div>

            </div>

            <p className=' pt-4 font-semibold text-xl mt-2'>Банківська картка</p>
            <div className=' flex justify-between px-16 w-1/2'>
              <div>
                <p className=' pt-2 font-semibold text-md'>Ім’я Власника</p>
                <p className=' pt-2  text-md'>{order.card.ownerName}</p>
              </div>

              <div className=' w-[4px] self-center h-[55px] bg-slate-300 rounded-lg'/>
              
              <div>
                <p className=' pt-2 font-semibold text-md'>Номер картки</p>
                <p className=' pt-2  text-md'>{order.card.cardNumber}</p>
              </div>

              <div className=' w-[4px] self-center h-[55px] bg-slate-300 rounded-lg'/>

              <div>
                <p className=' pt-2 font-semibold text-md'>Дата</p>
                <p className=' pt-2  text-md'>{order.card.month}/{order.card.year}</p>
              </div>
              
            </div>


            {order.products != null ?
            <>
              <p className=' pt-4 font-semibold text-xl mt-2'>Замовлені товари</p>
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
                      {!prod.isBought  ?
                      <button  onClick={()=>{closeAnOrderById({id:prod.id})}} className=' bg-mainYellowColor rounded-lg py-2 px-2 text-sm text-white hover:bg-orange-500 transition-all'>Закрити замовлення</button>
                      :"Замовлення позначенно як доставленне"}
                      <button className=' border border-gray-300 rounded-lg py-2 px-2 text-sm shadow-lg ml-4 hover:shadow-none transition-all'>Скасувати замовлення</button>
                    </div>
                  </div>
                </div>
            
                <div className=' p-2 self-center flex'>
                  <Link to={"/product/description/"+prod?.product.id} className=' rounded-sm flex text-sm flex-nowrap whitespace-nowrap justify-center border py-1 px-6 hover:bg-gray-200 cursor-pointer self-center mb-7'>Переглянути сторінку товара</Link>
                </div>
              </div>
            ) }
        </div>

    </div>
    )
}


function SellerOrders() {

    var user = useAppSelector(((state)=>state.user.user));

    var {data:company}:{data:Company} = useGetCompanyByUserIdQuery({id:user.id});
    var [closeAnOrderById,{}] = apiOrderSlice.useCloseAnOrderByIdMutation();
    const [countOfViewedPage, setCountOfViewedPage] = useState<string[]>(["1","2","3"]);
    var [ordersCount, setOrdersCount] = useState<number>();
  
    var [page, setPage] = useState(1);
    var [limit, setLimit] = useState(4);



    const handleSetCountOfPagesToView=()=>{
      setCountOfViewedPage([]);
  
      for (let index = 0; index <= 4; index++) {
        if(page>=2)
        {
          if(((index+page) * limit)<ordersCount!+limit)
          {
            setCountOfViewedPage(prev=>[...prev,((index+page)).toString()]);
          }
        }
        else{
          if(((index+1) * limit)<ordersCount!+limit)
          {
            setCountOfViewedPage(prev=>[...prev,(index+1).toString()]);
          }
        }
      }

    }

    const handleSetPage=(page:number)=>{
      setPage(page);
    }

    var request = {id:company?.id,page:page,limit:limit};
    var {data:orders,isSuccess}:{data:{payload:OrdersWithPagination},isSuccess:boolean} = useGetOrdersByCompanyIdWithPaginationQuery(request);

    useEffect(()=>{
      setOrdersCount(orders?.payload.total);
    },[orders?.payload.orders?.length])

    useEffect(()=>{
      handleSetCountOfPagesToView();
    },[page,orders?.payload.orders?.length])

    useEffect(()=>{
      handleSetCountOfPagesToView();
    })

  return (
    <div>
      <div className=''>

        <div className=' w-full py-4 '>
            {orders?.payload.orders?.length>0 ? orders?.payload.orders?.slice().map(order=>{
                return <OrderItem order={order} />
            }) :"У вас немає поки замовлень"}
        </div>

        <div className='bottom-0 mb-10 mx-auto flex self-center'>
          <div className='w-full flex flex-col  mx-auto'>
            {/* <span className=' flex justify-center'>
              <span className='mx-1'>Page: {page}</span>
              <span className='mx-1'>Limit: {limit}</span>
            </span> */}

            <div className='flex mt-2 justify-center'>
              <div onClick={()=>{if(page > 1)(handleSetPage(page-1))}} className={classNames(' border transition-all select-none mx-2 cursor-pointer active:scale-110 p-1 px-4 rounded-md',{"text-gray-400":page == 1})}>
                Назад
              </div>
              {countOfViewedPage.map((pageNum)=><div className='border rounded-md py-1 px-3 mx-1 cursor-pointer' onClick={()=>handleSetPage(parseInt(pageNum))}>{pageNum}</div>)}
              <div onClick={()=>{if((page * (limit))<ordersCount!)(handleSetPage(page+1))}}  className={classNames(' border transition-all select-none mx-2 cursor-pointer active:scale-110 p-1 px-4 rounded-md',{"text-gray-400":(page * limit)>=ordersCount! })}>
                Вперед
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default SellerOrders