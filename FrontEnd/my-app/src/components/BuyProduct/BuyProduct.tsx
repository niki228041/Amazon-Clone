import { useState } from "react";
import { AdressModal } from "./AdressModal";
import { apiCardSlice, useGetCardsByUserIdQuery } from "../../features/user/apiCardSlice";
import { useAppSelector } from "../../app/hooks";

import { UserState } from '../../features/user/user-slice';
import { Orders } from '../../features/user/ordersStateSlice';
import { Card } from "../types";

const BuyProduct=({setAdressOpen,setCardOpen}:{setAdressOpen:(prop:boolean)=>void,setCardOpen:(prop:boolean)=>void})=>{

    var user = useAppSelector(((state: { user: UserState; orders: Orders })=>state.user.user));
    const [selectedCard,setSelectedCard] = useState<Card>();

    const { data: cards, isSuccess: isCardsSuccess } = useGetCardsByUserIdQuery({id:user.id}) as {
        data: Card[];
        isSuccess: boolean;
    };;  

    function hideStringWithAsterisks(str:string) {
      const length = str.length;
      if (length <= 4) {
        return str;
      }
    
      const hiddenPart = '*'.repeat(length - 4);
      const visiblePart = str.substring(length - 4);
      return hiddenPart + visiblePart;
    }

    return <>
    
        <div className="w-full mx-auto mt-5 col-span-10">
            <div className="mx-auto  p-3">
                <label className="text-[22px] font-medium ">Your addresses</label>
                <br></br>
                <div className="pl-4">
                    <button onClick={()=>setAdressOpen(true)} className=" bg-orange-300 rounded-xl px-4 py-2 mt-2 text-sm hover:bg-orange-200 select-none">
                        Select Adress
                    </button>
                    

                    <span className="ml-5">Your adress 45/2 street and etc...</span>
                </div>
            </div>
            <div className="mx-auto  p-3">
                <label className="text-[22px] font-medium ">Your payment method</label>
                <br></br>
                <div className="pl-4">
                    <p className="font-medium">Add a credit or debit card</p>
                    <button onClick={()=>setCardOpen(true)} className=" bg-orange-300 rounded-xl px-4 py-2 mt-2 text-sm hover:bg-orange-200 select-none">
                        +
                    </button>
                    <span className="ml-5 bg-green-300 rounded-md p-1">{selectedCard?.ownerName} {selectedCard?.month}/{selectedCard?.year}</span>

                    <p className="font-medium mt-2">Or chosse your card:</p>
                    <div className="flex mt-2">
                        {isCardsSuccess ? cards.map((card:Card)=>{return <div onClick={()=>setSelectedCard(card)} className=" bg-yellow-300 rounded-md h-6 px-3 hover:bg-yellow-400 select-none cursor-pointer mr-2">{hideStringWithAsterisks(card.cardNumber)}</div>;}) : ""}
                    </div>

                </div>
            </div>
            <div className="mx-auto  p-3">
                <div className="pl-4">
                    <button className=" bg-orange-300 rounded-xl px-4 py-2 mt-2 text-sm w-full hover:bg-orange-200 select-none">
                        Buy Products
                    </button>
                </div>
            </div>
        </div>
        
    </>
}
    
export default BuyProduct