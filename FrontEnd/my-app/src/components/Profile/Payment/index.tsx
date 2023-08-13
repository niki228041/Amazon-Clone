import React, { useRef, useState } from 'react';
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../app/hooks";
import { deleteWishitem, updateWishitem } from "../../../features/user/apiWishListItemSlice";
import { useGetLinksForProductByProductsIdsQuery } from "../../../features/user/apiProductSlice";
import { ChangeOrderCount, FindById, ImageLink, Order } from "../../types";
import { useNavigate } from "react-router-dom";
import "../index.css"




// export const WishComponent: React.FC = ({ }) => {

//   const dispatch = useDispatch();
//   const availableCounts = [1, 2, 3, 4, 5];
//   const orders = useAppSelector((state) => state.orders.orders);

//   const handleCountChange = (id: string, count: any) => {
//     var index = orders.findIndex((ord: Order) => ord.id == id);
//     var changeOrderCount: ChangeOrderCount = { index: index, count: Number(count.value) };
//     console.log(changeOrderCount);
//     dispatch(updateWishitem(changeOrderCount));
//   }

//   return <>

//     <div className="rounded-lg p-3 grid grid-cols-10 mt-2">

//     </div>


//   </>
// }


export const Payment = () => {
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }


  return (
    <div  >

      <div style={{ borderWidth: "2px", borderRadius: "20px", height: "250px", width: "1150px", marginLeft: "300px", marginTop: "90px", display: "inline-flex" }}>

      </div>



      <svg onClick={toggleModal} width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="48" cy="48" r="47.5" fill="#FF9C00" stroke="#FF9A02" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M51.2432 44.1081V24H44.1081V44.1081H24V51.2432H44.1081V72H51.2432V51.2432H72V44.1081H51.2432Z" fill="white" />
      </svg>
      {modal && (
        <div className="modalpay">
          <div onClick={toggleModal} className="overlaypay"></div>
          

            

          
        </div>
      )}

    </div>

  );
};
export default Payment;

