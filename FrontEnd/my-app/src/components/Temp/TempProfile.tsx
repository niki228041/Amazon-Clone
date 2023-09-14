import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link, Outlet } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks';
import { UserState } from "../../features/user/user-slice";
import { Orders } from "../../features/user/ordersStateSlice";
import { CardModal } from '../BuyProduct/CardModal';
import { AdressModal } from '../BuyProduct/AdressModal';
import { CompanyModal } from '../BuyProduct/CompanyModal';
import { setAddressModalWindow, setCardModalWindow } from '../../features/user/modalWindowsStateSlice';
import { useDispatch } from 'react-redux';

const TempProfile=()=> {
    var user = useAppSelector(((state: { user: UserState; orders: Orders })=>state.user.user));


    const [isCardModalOpen,setCardModalOpen]= useState(false);
    const toggleCardModal = (prop:boolean)=>{setCardModalOpen(prop)};

    const [isAdressModalOpen,setAdressModalOpen]= useState(false);
    const toggleModal = (prop:boolean)=>{setAdressModalOpen(prop)};

    const [isCompanyModalOpen,setCompanyModalOpen]= useState(false);
    const toggleCompanyModal = (prop:boolean)=>{setCompanyModalOpen(prop)};

    var dispatch= useDispatch();

    return (<>
    <CompanyModal/>
    <div className='grid gap-4 grid-cols-4 border rounded-lg p-4 mx-auto w-2/3 mt-24'>
        <div className=' border p-2 col-span-1 rounded-lg my-2 font-semibold'>
            <div>
                <Link to="becomeASeller" className='my-2 flex justify-center self-center active:bg-orange-400 active:scale-95 bg-mainYellowColor py-2 w-full rounded-lg text-white transition-all'>
                    Become a Seller
                </Link>
                <Link to="viewMyOrders" className='my-2 flex justify-center self-center active:bg-orange-400 active:scale-95 bg-mainYellowColor py-2 w-full rounded-lg text-white transition-all'>
                    View My Orders
                </Link>
                <div className='flex my-2'>
                    <Link to="cardsSite" className=' mr-2 flex justify-center self-center active:bg-orange-400 active:scale-95 bg-mainYellowColor py-2 w-full rounded-lg text-white transition-all'>
                        My Cards
                    </Link>
                    <button onClick={()=> dispatch(setCardModalWindow(true))} className='active:scale-95 bg-green-400 flex  p-2 px-4 rounded-lg self-center'>
                        +
                    </button>
                </div>

                <div className='flex my-2'>
                    <Link to="addressSite" className=' mr-2 flex justify-center self-center active:bg-orange-400 active:scale-95 bg-mainYellowColor py-2 w-full rounded-lg text-white transition-all'>
                        My Address
                    </Link>
                    <button onClick={()=>dispatch(setAddressModalWindow(true))} className='active:scale-95 bg-green-400 flex  p-2 px-4 rounded-lg self-center'>
                        +
                    </button>
                </div>

                <div className='flex my-2'>
                    <Link to="myCompany" className='mr-2 flex justify-center self-center active:bg-orange-400 active:scale-95 bg-mainYellowColor py-2 w-full rounded-lg text-white transition-all'>
                        My Company
                    </Link>
                    <button onClick={()=>setCompanyModalOpen(true)} className='active:scale-95 bg-green-400 flex  p-2 px-4 rounded-lg self-center'>
                        +
                    </button>
                </div>

                <Link to="ordersForSeller" className='my-2 flex justify-center self-center active:bg-orange-400 active:scale-95 bg-mainYellowColor py-2 w-full rounded-lg text-white transition-all'>
                    Orders For Seller
                </Link>
                
            </div>

            {/* <Link to="viewOrdersOfMyProducts" className='flex justify-center self-center active:bg-orange-400 active:scale-95 bg-mainYellowColor py-2 w-full rounded-lg text-white transition-all'>
                View Orders Of My Products
            </Link> */}
            
        </div>
        <div className='border p-4 col-span-3 rounded-lg my-2'>
            <div className="w-fullbg-slate-300 flex-row-reverse flex justify-between">
                <p className=''>Your role is {Array.isArray(user?.roles) ? user?.roles?.map((role:string)=><span className='px-1 underline select-none'>{role}</span>) : user?.roles}</p>
            </div>
            <Outlet/>
        </div>
    </div>
    </>
  )
}

export default TempProfile
