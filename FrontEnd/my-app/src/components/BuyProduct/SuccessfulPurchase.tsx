
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { UserState } from '../../features/user/user-slice';
import { Orders } from '../../features/user/ordersStateSlice';


const SuccessfulPurchase = () => {
  const navigate = useNavigate();
  var user = useAppSelector(((state: { user: UserState; orders: Orders }) => state.user.user));

  return <>
    <div className="flex w-10/12 mx-auto bg-slate-50 mt-3">

      <div className=" justify-center w-full p-4 rounded-xl">
        <div className="flex content-center self-center text-center place-content-between">
          <span className="text-xl font-semibold leading-6 text-gray-900">Congratulations on your purchase!</span>
        </div>


        <div className="mt-3 flex flex-col">
          <span className="text-sm font-semibold leading-6 text-gray-900">You will receive a letter to your email <span className=" font-bold">({user.email})</span>. You can also track your purchase in your profile.</span>
            {/* <button className="mt-10 bg-yellow-300 rounded-xl p-1">
            Return to Main Menu
            </button> */}
           <button onClick={() => navigate("/todaysDeals")} style={{ borderRadius: "7px", color: "white", background: "#FF9A02", height: "40px",  marginTop: "30px" }}>
            Return to Main Menu
          </button> 
        </div>

      </div>

    </div>
  </>
}

export default SuccessfulPurchase