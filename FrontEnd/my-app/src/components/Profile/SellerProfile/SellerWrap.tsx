import classNames from 'classnames';
import React, { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { useGetCompanyByUserIdQuery } from '../../../features/user/apiCompanySlice';
import { Company } from '../../Admin/types';
import { useAppSelector } from '../../../app/hooks';



function SellerWrap() {

   var [selectedTab,setSelectedTab]= useState("Моя компанія");
   var user = useAppSelector((state)=>state.user.user); 

   var location = useLocation();

   

   var {data:company}:{data:Company} = useGetCompanyByUserIdQuery({id:user.id});
  return (
    <div className='mx-auto w-10/12'>
        <div className='bg-gray-500 rounded-xl '>

            <div className='flex h-full'>
                <Link to={'mycompany'} className={classNames(' cursor-pointer duration-200 px-10 flex rounded-t-lg border-t border-x border-gray-500 h-full py-2  font-medium transition-all ',{" bg-white text-black  border-gray-200":location.pathname.includes('mycompany')," text-white":!location.pathname.includes('mycompany')})} onClick={()=>{setSelectedTab("Моя компанія")}}>Моя компанія</Link>
                {company?
                    <>
                        <Link to={'toOrders'}  className={classNames(' cursor-pointer duration-200 px-10 flex rounded-t-lg border-t border-x border-gray-500 h-full py-2  font-medium transition-all ',{" bg-white text-black  border-gray-200":location.pathname.includes('toOrders')," text-white":!location.pathname.includes('toOrders')})}  onClick={()=>{setSelectedTab("Замовлені товари")}}>Замовлені товари</Link>
                        <Link to={'addedProducts'}  className={classNames(' cursor-pointer duration-200 px-10 flex rounded-t-lg border-t border-x border-gray-500 h-full py-2  font-medium transition-all ',{" bg-white text-black  border-gray-200":location.pathname.includes('addedProducts')," text-white":!location.pathname.includes('addedProducts')})}  onClick={()=>{setSelectedTab("Замовлені товари")}}>Добавленні товари</Link>
                    </>
                :""}
            </div>

            <div className=' border py-5 bg-white rounded-b-lg px-10'>
                <Outlet/>
            </div>
        </div>
    </div>
   
  )
}


export default SellerWrap
