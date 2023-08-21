import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../app/hooks";
import { deleteWishitem, updateWishitem } from "../../../features/user/apiWishListItemSlice";
import {  useGetLinksForProductByProductsIdsQuery } from "../../../features/user/apiProductSlice";
import { ChangeOrderCount, FindById, ImageLink, Order } from "../../types";
import {  useNavigate } from "react-router-dom";

import { useState } from "react";
    







export const BuyLater = () => {
    return <>

        <div className="px-6">
            <div className="border p-6 rounded-md">
                <div className=" h-[200px] mx-1 rounded-md bg-contain bg-center bg-no-repeat m-2" />
            </div>

            <p className="mt-2">2600грн.</p>
            <p className="mt-1 text-[15px] text-grayForText font-normal">GoPro HERO6 4K Action </p>
            <p className="mt-[-5px] text-[15px] text-grayForText font-normal">Camera - Black</p>

            <button className="mt-2 flex border hover:bg-slate-100 border-grayColorForBorder text-sm py-2 px-5 rounded-lg">

                Додати в кошик</button>
        </div>

    </>
}

interface OrderComponentProps {
    order: Order;
    productsImages: ImageLink[];
}

export const WishComponent: React.FC<OrderComponentProps> = ({ order, productsImages }) => {
    console.log(productsImages);
    const dispatch = useDispatch();
    const availableCounts = [1, 2, 3, 4, 5];
    const orders = useAppSelector((state) => state.orders.orders);

    const handleCountChange = (id: string, count: any) => {
        var index = orders.findIndex((ord: Order) => ord.id == id);
        var changeOrderCount: ChangeOrderCount = { index: index, count: Number(count.value) };
        console.log(changeOrderCount);
        dispatch(updateWishitem(changeOrderCount));
    }

    return <>

        <div className="rounded-lg p-3 grid grid-cols-10 mt-2">
            <div className="flex col-span-8">

                <div className="m-2">
                    <div className="h-24 w-24 border rounded-md bg-contain bg-center bg-no-repeat" style={{ backgroundImage: "url(" + productsImages?.find((img: any) => img.productId == order.product_id)?.image + ")", backgroundPosition: "center" }} />
                </div>

                <div className="text-sm mt-1 ml-3 text-[16px]">
                    <p className="font-medium">{order.name}</p>
                    <p className="text-grayForText mt-2" >{order.name}</p>

                    <div className="flex mt-9 font-medium text-sm" >
                        <button onClick={() => { dispatch(deleteWishitem(order.id)) }} className=" select-none active:bg-red-400 hover:bg-red-500 hover:text-white rounded-lg px-2 py-1 border border-grayColorForBorder text-red-500">Видалити</button>
                        
                    </div>
                </div>
            </div>

            
        </div>
        <hr className="mt-4 mx-6"></hr>

    </>
}


export const WishList = () => {
    const navigate = useNavigate();

    const orders = useAppSelector((state) => state.orders.orders);

    var request: FindById[] = [];
    orders.forEach(order => {
        request.push({ id: order.product_id });
    });

    const { data: productsImages, isSuccess: isProductsImages } = useGetLinksForProductByProductsIdsQuery(request);

    var totalCount: number = 0;

    orders.forEach(order => {
        totalCount += order.count;
    });

    const [isAdressModalOpen, setAdressModalOpen] = useState(false);
    const [isCardModalOpen, setCardModalOpen] = useState(false);
    const [isBuy, setBuy] = useState(false);
    const toggleModal = (prop: boolean) => { setAdressModalOpen(prop) };
    const toggleCardModal = (prop: boolean) => { setCardModalOpen(prop) };



    return <>
       

        <div className="mx-auto mt-10 w-9/12 ">
            {/* КОШИК */}
            <div className="">
                <p className=" text-xl font-medium">Список Бажаного ({totalCount})</p>

                <div className="grid grid-cols-4 gap-5 mt-5">

                    <div className="col-span-3">

                        <div className="w-full border border-grayColorForBorder rounded-lg pb-4 px-1">

                            {orders.map((order: Order) => (<WishComponent order={order} productsImages={productsImages} />))}


                            <div className=" flex justify-between p-2 mx-4">
                                <button className=" hover:bg-orange-300 transition-all active:shadow-lg active:transition-none bg-mainYellowColor text-white px-5 py-1 rounded-lg mt-3">
                                    Повернутися
                                </button>
                                <button className=" transition-all active:shadow-lg active:transition-none border border-grayColorForBorder text-mainYellowColor px-4 py-2 rounded-lg mt-3">
                                    Видалити все
                                </button>
                            </div>
                        </div>

                        {/* <div className="grid grid-cols-3 mt-7">
                            <div className="flex">
                                <img className="h-16 mr-3" />
                                <div>
                                    <p> Безпечний платіж</p>
                                    <p className=" text-grayForText text-sm">рвариврвт</p>
                                </div>

                            </div>
                            <div className="flex">
                                <img className="h-16 mr-3" />
                                <div>
                                    <p>Підтримка клієнтів</p>
                                    <p className=" text-grayForText text-sm">пвімвм</p>
                                </div>

                            </div>
                            <div className="flex">
                                <img className="h-16 mr-3" />
                                <div>
                                    <p>Безкоштовна доставка</p>
                                    <p className=" text-grayForText text-sm">впівпп</p>
                                </div>

                            </div>
                        </div> */}



                    </div>

                    {/* <div className="">
                        <div className="p-4 border border-grayColorForBorder rounded-lg">
                            <p>Маєте промокод?</p>
                            <div className="flex mt-3">
                                <input type="text" placeholder="Додати купон" className=" border rounded-l-lg px-2  h-10 outline-0  w-full border-grayColorForBorder "></input>
                                <button className=" font-bold hover:text-orange-300 text-mainYellowColor border rounded-r-lg px-3 h-10 outline-1 outline-gray-200 border-grayColorForBorder ">+</button>
                            </div>

                        </div>

                        <div className="p-4 mt-4 shadow-lg border border-grayColorForBorder rounded-lg">
                            <div className=" flex justify-between">
                                <span>Підсумок:</span>
                                <span>${orders.map((order) => order.price * order.count).reduce((sum, price) => sum + price, 0).toFixed(2)}</span>
                            </div>

                            <div className=" flex justify-between">
                                <span>Знижка:</span>
                                <span className=" text-red-500">- 160 грн.</span>
                            </div>
                            <hr className="my-4 mx-3"></hr>
                            <div className=" flex justify-between font-semibold">
                                <span>Total:</span>
                                <span className=" ">${orders.map((order) => order.price * order.count).reduce((sum, price) => sum + price, 0).toFixed(2)}</span>
                            </div>

                            <button className="  font-medium hover:bg-orange-300 transition-all active:shadow-lg active:transition-none bg-mainYellowColor text-white px-2 w-full py-3 rounded-lg mt-3">
                                Оплатити
                            </button>

                            
                        </div>



                    </div> */}
                </div>
            </div>

            {/* РЕКОМЕНДАЦІЇ ЩО ДО ПОКУПОК */}
            <div className=" font-semibold text-lg my-14 border border-grayColorForBorder rounded-lg p-4">
                <p className="pl-6">Купити пізніше</p>
                <div className=" gap-4 grid grid-cols-4 mt-4">

                    {<BuyLater />}
                    {<BuyLater />}
                    {<BuyLater />}
                    {<BuyLater />}

                </div>
            </div>

            {/* РОЗСИЛКА НА ЕМАЙЛ */}
            <div className=" my-14">
                <div className="text-white p-6 w-full bg-darkBlueColor flex justify-between ">
                    <p className=" text-sm self-center">
                        Підпишіться на нашу розсилку - отримайте купон на 300 грн. на перше замовлення!
                    </p>
                    <div className="flex self-center text-sm w-4/12 ">
                        <input type="text" placeholder="Введіть адресу електронної пошти" className="border text-black rounded-l-full px-2 h-9 outline-0  w-full border-grayColorForBorder "></input>
                        <button className=" bg-mainYellowColor rounded-r-full p-1 px-3">Apply</button>
                    </div>
                </div>
            </div>

        </div>

        {/* <div className="flex w-4/5 mx-auto bg-slate-50 mt-3">

        <div className=" justify-center w-full p-4 rounded-xl">

            <div className="flex content-center self-center text-center place-content-between">
                <span className="text-xl font-semibold leading-6 text-gray-900">Orders</span>

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

    </div> */}
    </>
}

export default WishList;
