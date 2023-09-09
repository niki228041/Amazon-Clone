
import InputMask from 'react-input-mask';
import close from "../../images/close.png"
import { UserState } from '../../features/user/user-slice';
import { Orders } from '../../features/user/ordersStateSlice';
import { useAppSelector } from '../../app/hooks';
import { useState } from 'react';
import { apiAddressSlice} from '../../features/user/apiAddressSlice';
import { useDispatch } from 'react-redux';
import { setAddressModalWindow } from '../../features/user/modalWindowsStateSlice';

interface addAddress{
  street:string,
  city:string,
  phone :string,
  fullName :string,
  country :string,
  postcode :string,
  userId :number,
}


export const AdressModal=()=>{

  var user = useAppSelector(((state: { user: UserState; orders: Orders })=>state.user.user));
  var isOpen = useAppSelector((state)=>state.modalWindows.isAddressOpen);
  const [country, setCountry] = useState('');
  var dispatch = useDispatch();

  const [addAddress,{}] = apiAddressSlice.useAddAddressMutation();




  const handleAddAdress=(data:React.FormEvent<HTMLFormElement>)=>{
    data.preventDefault();
    var curentData = new FormData(data.currentTarget);

    var fullName = curentData?.get("fullName")?.toString()!;
    var phone = curentData?.get("phone")?.toString()!;
    var address = curentData?.get("address")?.toString()!;
    var plz = curentData?.get("plz")?.toString()!;
    var city = curentData?.get("city")?.toString()!;

    if(country!='')
    {
      var request:addAddress={
        street:address,
        city:city,
        phone:phone,
        fullName:fullName,
        country:country,
        postcode:plz,
        userId:Number(user.id)
      }
      addAddress(request);
      dispatch(setAddressModalWindow(false));

      console.log(request);
    }
    

  }


    return( 
        <form onSubmit={handleAddAdress}>
        {isOpen?
        <div className="flex justify-center fixed w-full h-full bg-black/30 transition-all z-30">
            <div className=" absolute w-2/4 mt-32 rounded-xl bg-gray-100">
                

                <div className=" relative box-border p-2  flex place-content-between select-none px-8 pt-8">
                    <div className=" font-medium text-xl">
                        Add Address
                    </div>
                    <span  onClick={()=>dispatch(setAddressModalWindow(false))} className="p-2 cursor-pointer" >
                        <img className=' h-5' src={close}></img>
                    </span>
                </div>

                

                <div className=" px-16 pb-16 pt-6">

                    <div>

                    <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                        Country/Region
                    </label>
                    <select
                        name='country'
                        id="country"
                        className='w-full bg-slate-200 text-[15px] mediumFont outline-none rounded-md h-8 px-2 mt-2'
                        onChange={(e)=>setCountry(e.currentTarget.value)}
                      >
                    <option value=''>-</option>
                    <option value='Ukraine'>Ukraine</option>
                    <option value='Germany'>Germany</option>
                    <option value='USA'>USA</option>
                    <option value='Itali'>Itali</option>
                    {/* {availableCounts.map((count) => (
                      <option  key={count} value={count}>{count}</option>
                    ))} */}
                    </select>
                    </div>


                    <div className=" w-full mr-1 mb-4 mt-2">
                      <label htmlFor="fullName" className="block text-sm font-medium leading-6 text-gray-900">
                        Full Name (first name & surname)
                      </label>
                      <div className="mt-2">
                        <input
                          id="fullName"
                          name="fullName"
                          autoComplete="fullName"
                          required
                          className="p-2 block h-8 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="w-full mr-1 mb-4 mt-2">
                      <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                        Phone
                      </label>
                      <div className="mt-2">
                        {/* <InputMask
                          id="phone"
                          name="phone"
                          mask="+99 (999) 9999-999"
                          maskChar="_" // You can customize the maskChar if you want a different placeholder character
                          autoComplete="name"
                          required
                          className="p-2 block h-8 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        /> */}
                        <input
                          id="phone"
                          name="phone"
                          autoComplete="phone"
                          type='number'
                          required
                          placeholder='Phone number'
                          className="p-2 block h-8 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className=" w-full mr-1 mb-4 mt-2">
                      <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                        Address
                      </label>
                      <div className="mt-2">
                        <input
                          id="address"
                          name="address"
                          autoComplete="address"
                          required
                          placeholder='Street name, house number'
                          className="p-2 block h-8 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="flex mb-4">
                        <div className=" w-full mr-1">
                          <label htmlFor="plz" className="block text-sm font-medium leading-6 text-gray-900">
                            PLZ
                          </label>
                          <div className="mt-2">
                            <input
                              id="plz"
                              name="plz"
                              autoComplete="plz"
                              required
                              className="p-2 block h-8 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className=" w-full ml-1">
                            <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                              Town/City
                            </label>
                            <div className="mt-2">
                              <input
                                id="city"
                                name="city"
                                autoComplete="city"
                                required
                                className="p-2 h-8 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                  </div>

                  
                </div>

                <div className=" space-y-10">
                    <fieldset>
                      <div className="mt-6 space-y-6">
                        <div className="relative flex gap-x-3">
                          <div className="flex h-6 items-center">
                            <input
                              id="isInTheStock"
                              name="isInTheStock"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                          </div>
                          <div className="text-sm leading-6">
                            <label htmlFor="isInTheStock" className="font-medium text-gray-900">
                                Save as default address
                            </label>
                            <p className="text-gray-500">You can change your address in profile</p>
                          </div>
                        </div>

                      </div>
                    </fieldset>
                </div>
                <div className="w-full flex justify-center mt-5">
                <button type='submit' className=" text-sm bg-yellow-400 rounded-xl w-full py-1 hover:bg-yellow-300 font-medium">
                  Save Address
                </button>
              </div>
              </div>

            </div>
        </div>
        :""}
        </form>
    );
}
