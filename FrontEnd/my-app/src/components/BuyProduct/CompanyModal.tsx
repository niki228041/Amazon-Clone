
import InputMask from 'react-input-mask';
import close from "../../images/close.png"
import { UserState } from '../../features/user/user-slice';
import { Orders } from '../../features/user/ordersStateSlice';
import { useAppSelector } from '../../app/hooks';
import { useState } from 'react';
import { apiAddressSlice} from '../../features/user/apiAddressSlice';
import { apiCompanySlice } from '../../features/user/apiCompanySlice';
import { useDispatch } from 'react-redux';
import { setCompanyModalWindow } from '../../features/user/modalWindowsStateSlice';

interface addCompany{
  name:string,
  description:string,
  userId:number,
}


export const CompanyModal=()=>{

  var user = useAppSelector(((state: { user: UserState; orders: Orders })=>state.user.user));
  var isOpen = useAppSelector(((state)=>state.modalWindows.isCompanyOpen));
  const [country, setCountry] = useState('');

  const [addCompany,{}] = apiCompanySlice.useCreateCompanyMutation();


  var dispatch = useDispatch();

  const handleAddCompany=(data:React.FormEvent<HTMLFormElement>)=>{
    data.preventDefault();
    var curentData = new FormData(data.currentTarget);

    var name = curentData?.get("name")?.toString()!;
    var description = curentData?.get("description")?.toString()!;

    var request:addCompany={
      name:name,
      description:description,
      userId:Number(user.id)
    }

    addCompany(request);
    dispatch(setCompanyModalWindow(false));
    console.log(request);
  }


    return( 
        <form onSubmit={handleAddCompany}>
        {isOpen?
        <div className="flex justify-center h-full w-full fixed bg-black/30 transition-all z-30">
        <div className=" absolute w-2/4 rounded-xl bg-gray-100 grid mt-48" >
                
                <div className=" relative box-border p-2  flex place-content-between select-none px-8 pt-8">
                    <div className=" font-medium text-xl">
                        Add Company
                    </div>
                    <span  onClick={()=>dispatch(setCompanyModalWindow(false))} className="p-2 cursor-pointer" >
                        <img className=' h-5' src={close}></img>
                    </span>
                </div>
                

                <div className=" px-16 pb-16 pt-6">
                    <div className=" w-full mr-1 mb-4 mt-2">
                      <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                        Name
                      </label>
                      <div className="mt-2">
                        <input
                          id="name"
                          name="name"
                          autoComplete="name"
                          placeholder='Name of company...'
                          required
                          className="p-2 block h-8 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>


                    <div className=" w-full mr-1 mb-4 mt-2">
                      <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                        Description
                      </label>
                      <div className="mt-2">
                        <input
                          id="description"
                          name="description"
                          autoComplete="description"
                          placeholder='Description...'
                          required
                          className="p-2 block h-8 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                
                <div className="w-full flex justify-center mt-5">
                <button type='submit' className=" text-sm bg-yellow-400 rounded-xl w-full py-1 hover:bg-yellow-300 font-medium">
                  Save Company
                </button>
              </div>
              </div>

            </div>
        </div>
        :""}
        </form>
    );
}
