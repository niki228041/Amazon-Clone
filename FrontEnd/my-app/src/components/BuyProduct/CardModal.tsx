
import InputMask from 'react-input-mask';
import close from "../../images/close.png"
import mastercard from "../../images/mastercard_logo.png"
import visa from "../../images/visa-logo.jpg"

import mastercard_logo from "../../images/MasterCard_Logo.svg.png"
import visa_logo from "../../images/Visa_2021.svg.png"
import { useState } from 'react';
import { apiCardSlice } from '../../features/user/apiCardSlice';
import { useAppSelector } from '../../app/hooks';
import { UserState } from '../../features/user/user-slice';
import { Orders } from '../../features/user/ordersStateSlice';
import { addCard } from '../types';
import { useGetAddressByUserIdQuery } from '../../features/user/apiAddressSlice';
import { setCardModalWindow } from '../../features/user/modalWindowsStateSlice';
import { useDispatch } from 'react-redux';




export const CardModal = () => {

  const [cardNumber, setCardNumber] = useState("");
  const [cardMonth, setCardMonth] = useState("");
  const [cardYear, setCardYear] = useState("");

  const [cardType, setCardType] = useState("");

  const [addCard, { }] = apiCardSlice.useAddCardMutation();

  var isOpen = useAppSelector((state)=> state.modalWindows.isCardOpen);
  
  var dispatch = useDispatch();



  var user = useAppSelector(((state: { user: UserState; orders: Orders }) => state.user.user));

  console.log(cardNumber);

  const handleChangeCardNumber = (e: any) => {
    setCardNumber(e.currentTarget.value.replace(/\D/g, ''));
    if (cardNumber[0] == "4") {
      setCardType("Visa");
    }
    else if (cardNumber[0] == "6") {
      setCardType("Mastercard");
    }
    else {
      setCardType("Undefine card");
    }
  }

  const handleAddCard = (data: React.FormEvent<HTMLFormElement>) => {
    data.preventDefault();
    var curentData = new FormData(data.currentTarget);

    // var e:any = document.getElementById("Category");
    // var categoryId = e.value;
    // if(e.value=="-")
    // {
    //   categoryId = 0;
    // }


    var nameOnCard = curentData?.get("nameOnCard")?.toString()!;
    var cardNumber = curentData?.get("cardNumber")?.toString()!;
    var expirationDateMonth = curentData?.get("expirationDateMonth")?.toString()!;
    var expirationDateYear = curentData?.get("expirationDateYear")?.toString()!;
    var defaultCard = curentData?.get("defaultCard")?.toString()!;

    var defaultValue = false;

    if (defaultCard != undefined) {
      defaultValue = true;
    }

    var numericCardNumber = cardNumber.replace(/\D/g, '');

    if (Number(numericCardNumber) && numericCardNumber.length == 16) {
      var request: addCard = {
        ownerName: nameOnCard,
        cardNumber: numericCardNumber,
        month: expirationDateMonth,
        year: expirationDateYear,
        userId: user.id,
        isDefault: defaultValue
      };
      console.log(defaultValue);

      console.log(request);
      dispatch(setCardModalWindow(false))
      addCard(request);
    }
  }

  return (
    <form onSubmit={handleAddCard} className=''>
      {isOpen ?
        <div className="flex justify-center h-full w-full fixed bg-black/30 transition-all z-30">
          <div className=" absolute w-2/4 rounded-xl bg-gray-100 grid mt-48" >


            <div className=" relative box-border p-2 flex place-content-between select-none px-8 pt-8">
              <div className=" font-medium text-xl">
                Додати карту
              </div>
              <span onClick={() => dispatch(setCardModalWindow(false))} className="p-2 cursor-pointer" >
                <img className=' h-5' src={close}></img>
              </span>
            </div>


            <div className=' grid-cols-6 grid'>

              <div className=" px-16 pb-16 pt-6 col-span-3">



                <div className="w-full mr-1 mb-4 mt-2">
                  <label htmlFor="nameOnCard" className="block text-sm font-medium leading-6 text-gray-900">
                    Назва карти
                  </label>
                  <div className="mt-2">
                    <input
                      id="nameOnCard"
                      name="nameOnCard"
                      autoComplete="nameOnCard"
                      required
                      className="p-2 block h-8 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="w-full mr-1 mb-4 mt-2">
                  <label htmlFor="cardNumber" className="block text-sm font-medium leading-6 text-gray-900">
                    Номер карти
                  </label>
                  <div className="mt-2">
                    <InputMask
                      id="cardNumber"
                      name="cardNumber"
                      mask="9999 9999 9999 9999"
                      maskChar="_" // You can customize the maskChar if you want a different placeholder character
                      autoComplete="cardNumber"
                      required
                      onChange={(e) => handleChangeCardNumber(e)}
                      className="p-2 block h-8 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className=" w-full mr-2">
                  <label htmlFor="expirationDateMonth" className="block text-sm font-medium leading-6 text-gray-900">
                    Дата дії карти
                  </label>

                  <select
                    name='expirationDateMonth'
                    id="expirationDateMonth"
                    className='bg-yellowForInputs text-[15px] mediumFont outline-none rounded-full h-7 px-2 bg-slate-200 mr-3 mt-2'
                    onChange={(e) => setCardMonth(e.currentTarget.value)}
                  >
                    <option value='01'>01</option>
                    <option value='02'>02</option>
                    <option value='03'>03</option>
                    <option value='04'>04</option>
                    <option value='05'>05</option>
                    <option value='06'>06</option>
                    <option value='07'>07</option>
                    <option value='08'>08</option>
                    <option value='09'>09</option>
                    <option value='10'>10</option>
                    <option value='11'>11</option>
                    <option value='12'>12</option>
                  </select>

                  <select
                    name='expirationDateYear'
                    id="expirationDateYear"
                    className='bg-yellowForInputs text-[15px] mediumFont outline-none rounded-full h-7 px-2 bg-slate-200 mt-2'
                    onChange={(e) => setCardYear(e.currentTarget.value)}
                  >
                    <option value='2023'>2023</option>
                    <option value='2024'>2024</option>
                    <option value='2025'>2025</option>
                    <option value='2026'>2026</option>
                    <option value='2027'>2027</option>
                  </select>
                </div>


                <div className="space-y-10">
                  <fieldset>
                    <div className="mt-6 space-y-6">
                      <div className="relative flex gap-x-3">
                        <div className="flex h-6 items-center">
                          <input
                            id="defaultCard"
                            name="defaultCard"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                        </div>
                        <div className="text-sm leading-6">
                          <label htmlFor="defaultCard" className="font-medium text-gray-900">
                            Вибрати як основну
                          </label>
                          <p className="text-gray-500">Можете змінити картку в профілі</p>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                </div>

                <div className="w-full flex justify-center mt-5">
                  {/* <button type='submit' className=" text-sm bg-yellow-400 rounded-xl w-full py-1 hover:bg-yellow-300 font-medium">
                    Save Card
                  </button> */}
                  <button style={{ borderRadius: "7px", color: "white", background: "#FF9A02", height: "50px", width: "400px", marginTop: "30px" }} type="submit">
                    Додати карту
                  </button>
                </div>

              </div>


              <div className='col-span-3 pr-16' >
                <div className='flex w-full whitespace-nowrap'>
                  <span className='self-center mr-4'> AllMarkt accept: </span>
                  <img src={mastercard} className='h-8 mr-5 border border-1 '></img>
                  <img src={visa} className='h-8 border border-1'></img>
                </div>
                <span className='self-center '>Your Card is: </span>

                <div className='flex  py-4 px-3  w-[300px] h-[165px] whitespace-nowrap bg-slate-200 rounded-xl m-auto mt-4'>
                  <div className='w-full flex flex-col'>
                    <p className='pb-4'>{cardType}</p>
                    <div className='flex justify-center text-[22px] '>
                      <p>{cardNumber}</p>
                    </div>
                    <div className='flex text-sm justify-center'>
                      <span className='px-2'>{cardMonth}</span>
                      <span className='px-2'>{cardYear}</span>
                    </div>
                    <div className='flex flex-row-reverse align-bottom '>
                      {cardType == "Mastercard" ? <img src={mastercard_logo} className='w-10 mr-5 right-0 mt-3'></img> : ""}
                      {cardType == "Visa" ? <img src={visa_logo} className='w-10 mr-5 right-0 mt-3'></img> : ""}

                    </div>

                  </div>

                </div>
              </div>

            </div>

          </div>
        </div>
        : ""}
    </form>
  );
}
