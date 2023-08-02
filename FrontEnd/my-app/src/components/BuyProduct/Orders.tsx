import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/hooks";
import { deleteOrder, updateOrder } from "../../features/user/ordersStateSlice";
import { apiProductSlice, useGetLinksForProductByProductsIdsQuery } from "../../features/user/apiProductSlice";
import { ChangeOrderCount, FindById, Order } from "../types";
import { Outlet, useNavigate } from "react-router-dom";
import OrdersList from "./OrdersList";
import { AdressModal } from "./AdressModal";
import { useState } from "react";
import BuyProduct from "./BuyProduct";
import { CardModal } from "./CardModal";



const Orders=()=>{
  const navigate = useNavigate();
    
    


  
    const orders = useAppSelector((state)=>state.orders.orders);
    var request:FindById[] = [];
    orders.forEach(order => {
      request.push({id:order.product_id});
    });

    var totalCount:number = 0;

    orders.forEach(order => {
      totalCount += order.count;
    });

    const [isAdressModalOpen,setAdressModalOpen]= useState(false);
    const [isCardModalOpen,setCardModalOpen]= useState(false);
    const [isBuy,setBuy]= useState(false);
    const toggleModal = (prop:boolean)=>{setAdressModalOpen(prop)};
    const toggleCardModal = (prop:boolean)=>{setCardModalOpen(prop)};



    
    return <>
    <AdressModal isOpen={isAdressModalOpen} onClose={toggleModal}/>
    <CardModal isOpen={isCardModalOpen} onClose={toggleCardModal}/>

    <div className="flex w-4/5 mx-auto bg-slate-50 mt-3">
        

        <div className=" justify-center w-full p-4 rounded-xl">

            <div className="flex content-center self-center text-center place-content-between">
                <span className="text-xl font-semibold leading-6 text-gray-900">Orders</span>
                {/* <button
                   type="button"
                   className="inline-flex items-center rounded-md   cursor-pointer bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                   Create
                 </button> */}
            </div>
            

      <div className="grid grid-cols-12 mt-5">
        {!isBuy?
          <OrdersList/>
        
        :<BuyProduct setAdressOpen={toggleModal} setCardOpen={toggleCardModal} />}

          <div className="col-span-2 bg-slate-100 flex justify-center">
            <div className=" p-3">

              <div className="w-full flex mb-2">
                All item ({totalCount}) preis <span className="font-medium ml-1"> ${orders.map((order) => order.price*order.count).reduce((sum, price) => sum + price, 0).toFixed(2)}</span>
              </div>

              <div className="w-full flex justify-center">
                <button onClick={()=>setBuy(true)} className=" bg-yellow-400 rounded-xl w-full py-1 hover:bg-yellow-300 font-medium">
                  Buy Products
                </button>
              </div>

           
            </div>
          </div>
      </div>
            
      </div>

    </div>
    </>
}
    
export default Orders


// {
//   "fullName": "Some mega bad order by some admin",
//   "userId": 1,
//   "cardId": 4,
//   "addressId": 7,
//   "orderedProducts": [
//     {
//       "productId": 6,
//       "count": 2
//     },
//     {
//       "productId": 24,
//       "count": 1
//     },
//     {
//       "productId": 1020,
//       "count": 1
//     }
//   ]
// }