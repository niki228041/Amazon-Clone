import React, { useEffect, useState } from 'react'
import circle from '../../images/black-circle.png';
import Calendar from '../../images/Calendar.svg';
import SharpArrowRight from '../../images/SharpArrowRight.svg';
import WhitePlus from '../../images/WhitePlus.svg';
import BlankProfilePicture from '../../images/blankProfilePicture.webp';
import arrowRight from '../../images/ArrowRightS.svg';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.module.css'

import classNames from 'classnames';
import { parseISO ,format, add} from 'date-fns';
import { useAppSelector } from '../../app/hooks';
import { useDispatch } from 'react-redux';
import { apiAddressSlice, useGetAddressByUserIdQuery, useGetAddressesByUserIdQuery, useSetDefaultAddressByAddressIdMutation } from '../../features/user/apiAddressSlice';
import { Address } from '../types';
import { setAddressModalWindow } from '../../features/user/modalWindowsStateSlice';
import { useGetCountriesQuery } from '../../features/user/apiCountriesSlice';
import { apiPlayerSlice } from '../../features/user/apiPlayerSlice';
import { getFileExtension, toBase64 } from '../ImageConvert/imageConvert';
import { useFormik } from 'formik';
import { editProfileSchema } from './Validation/editProfileSchema';
import { AuthUser, postEditUser } from '../../features/user/user-slice';
import { SetAccessToken } from '../../api/jwtDecodeToken';
import { useNavigate } from 'react-router-dom';

interface editProfile{
  displayName:string,
  firstName:string,
  lastName: string,
  fathersName: string,
  phoneNumber:string,
  email: string
}

export interface editProfileDTO{
  id:string,
  displayName:string,
  firstName:string,
  lastName: string,
  fathersName: string,
  AvatarImage: string,
  gender: string,
  dateOfBirth: string,
  phoneNumber:string,
  email: string
}

const EditProfile=()=> {
   const [dropDownSex,setDropDownSex] =  useState(false);
   const [dropDownAddress,setDropDownAddress] =  useState(false);
   const [dropDownCountry,setDropDownCountry] =  useState(false);
   const [selectedDate,setSelectedDate] =  useState<Date|null>(null);

   var user = useAppSelector(((state)=>state.user.user));
   var dispatch = useDispatch();
   var navigate = useNavigate();
   
   const [getImageByBase64,{}] = apiPlayerSlice.useGetImageLinkByBase64Mutation();
 


   var {data:address,isSuccess}:{data:{payload:Address},isSuccess:boolean}  = useGetAddressByUserIdQuery({id:user.id});
   var {data:addresses,isSuccess}:{data:Address[],isSuccess:boolean}  = useGetAddressesByUserIdQuery({id:user.id});
   
   var [setDefaultAddress,{}] = useSetDefaultAddressByAddressIdMutation(); 

   const [selectedSex,setSelectedSex] =  useState("Стать");
   const [selectedAddress,setSelectedAddress] =  useState<Address>();

   useEffect(()=>{
    setSelectedAddress(address?.payload);
   },[address])

   const [mainImage,setMainImage]=useState("");
   const [showServerErrorLogin, setServerErrorLogin] = useState("");
   const [mainImageToSend,setMainImageToSend]=useState("");

   function formatDateDifference(date: Date) {
    if(date)
    {
      const difference = format(date, 'dd.MM.yyyy');
      return difference;
    }
    else
    {
      return "";
    }
  }
  console.log(user.phoneNumber);
  console.log(user);

  useEffect(()=>{
    setMainImage(user.avatar);
  },[])

  const formik = useFormik<editProfile>({
    initialValues: {
      displayName: user.username,
      firstName:user.name,
      lastName: user.surname,
      fathersName: '',
      phoneNumber: user.phoneNumber,
      email: user.email
    },
    validationSchema:editProfileSchema,
    onSubmit: values => {
      console.log("values");
      console.log(selectedDate);

      var editProfileRequest:editProfileDTO={
        id:user.id,
        displayName:values.displayName,
        firstName:values.firstName,
        lastName:values.lastName,
        fathersName:values.fathersName,
        phoneNumber:values.phoneNumber,
        email:values.email,
        AvatarImage: mainImageToSend,
        dateOfBirth:selectedDate?.toISOString()!,
        gender:selectedSex
      };

      console.log(editProfileRequest);
      dispatch(postEditUser(editProfileRequest));
      SetAccessToken("");
      dispatch(AuthUser(""));
      navigate("/todaysDeals");
      window.scroll(0,0);
    }

});

  const HandleSetMainImage = async (event:any)=>{
    console.log(mainImage);

    const files = event.target.files;
    if (files[0] && files[0].type.startsWith('image/')) {
      console.log(files);
      
      console.log("files_to_send");
      console.log(mainImage);
      
      const promise = new Promise((resolve) => {
          let byte_img = toBase64(files[0]);
          byte_img.then((res: any) => {
          let res_byte_img = res.split(',')[1];
          let ext = getFileExtension(files[0].name);
          console.log(ext);
          resolve(res_byte_img);
          });
      });

      try {
        var base64img:any = await Promise.resolve(promise);
        setMainImageToSend(base64img);
        var response = await getImageByBase64({ image: base64img });
        console.log(response.data.link);
        setMainImage(response.data.link);
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <form className="" onSubmit={formik.handleSubmit}>

        <div className=' mb-20 '>
            <div className='mb-8 flex text-[30px] text-grayColorForHeader font-semibold'>Особисті дані</div>

            <div className='flex '>
                <div>
                  <input
                    onChange={HandleSetMainImage}
                    id="mainImage"
                    name="mainImage"
                    autoComplete="mainImage"
                    accept="image/*" // Принимаем только изображения
                    type="file"
                    className="hidden " />
                </div>

                <label htmlFor="mainImage" className=' cursor-pointer h-32 w-32 mr-6 rounded-lg bg-center bg-cover' style={{backgroundImage:`url(${mainImage ? mainImage : BlankProfilePicture})`}} />
                <input
                  id="displayName"
                  name="displayName"
                  autoComplete="displayName"
                  onChange={formik.handleChange}
                  value={formik.values.displayName}
                  className=' flex h-10 self-center rounded-lg border border-gray-400 outline-0 px-4 w-1/4' placeholder='Ім`я користувача'/>
            </div>

            <div className='my-8 flex text-[20px] text-grayColorForHeader font-semibold mb-2'>Персональна інформація</div>
            <div className='grid grid-cols-3 gap-5 my-8'>
                <div>
                  <input className='w-full flex h-10 self-center rounded-lg border border-gray-400 outline-0 px-4 ' placeholder='Ім`я'
                    id="firstName"
                    name="firstName"
                    autoComplete="firstName"
                    onChange={formik.handleChange}
                    value={formik.values.firstName} />
                  {formik.errors.firstName ? <div className=' text-red-500 text-sm font-semibold'>{formik.errors.firstName}</div> : null}
                </div>

                <div>
                  <input className='w-full flex h-10 self-center rounded-lg border border-gray-400 outline-0 px-4 '  placeholder='Прізвище'
                    id="lastName"
                    name="lastName"
                    autoComplete="lastName"
                    onChange={formik.handleChange}
                    value={formik.values.lastName} />
                  {formik.errors.lastName ? <div className=' text-red-500 text-sm font-semibold'>{formik.errors.lastName}</div> : null}
                </div>

                <div>
                  <input className='w-full flex h-10 self-center rounded-lg border border-gray-400 outline-0 px-4 ' placeholder='По‑батькові'
                    id="fathersName"
                    name="fathersName"
                    autoComplete="fathersName"
                    onChange={formik.handleChange}
                    value={formik.values.fathersName} />
                  {formik.errors.fathersName ? <div className=' text-red-500 text-sm font-semibold'>{formik.errors.fathersName}</div> : null}
                </div>


            </div>
            <div className='grid grid-cols-3 gap-5 my-8'>
                <div className=' relative h-10 flex justify-end select-none'>
                    <img className={classNames(' absolute mr-3 self-center transition-all',{" rotate-90":dropDownSex})} onClick={()=>setDropDownSex(!dropDownSex)} src={SharpArrowRight} />
                    <div className='flex h-10 w-full self-center rounded-lg border border-gray-400 outline-0 px-4 ' onClick={()=>setDropDownSex(!dropDownSex)} placeholder='Стать'>
                        <span className=' self-center text-grayForText'>{selectedSex}</span>
                    </div>
                    

                    <div className={classNames('w-full mt-1 max-h-[200px] overflow-y-auto transition-all absolute translate-y-10 overflow-hidden rounded-sm border bg-white border-optionsGrayForBorder ',{
                    " opacity-100 ": dropDownSex,
                    " scale-y-0 " : !dropDownSex
                    })} style={{transformOrigin:" top center"}} >
                        <div className=' '>
                          <button type='button' onClick={()=>{setDropDownSex(false);setSelectedSex("Чоловік")}} className='justify-between text-sm flex py-1 font-medium px-3 active:bg-white hover:bg-grayColorForBorder w-full'>
                            <span className='mr-12'>Чоловік</span>
                          </button>
                        </div>
                        <hr/>
                        <div className=' '>
                          <button type='button' onClick={()=>{setDropDownSex(false);setSelectedSex("Жінка")}} className='justify-between text-sm flex py-1 font-medium px-3 active:bg-white hover:bg-grayColorForBorder w-full'>
                            <span className='mr-12'>Жінка</span>
                          </button>
                        </div>
                        <hr/>
                        <div className=' '>
                          <button type='button' onClick={()=>{setDropDownSex(false);setSelectedSex("Інше")}} className='justify-between text-sm flex py-1 font-medium px-3 active:bg-white hover:bg-grayColorForBorder w-full'>
                            <span className='mr-12'>Інше</span>
                          </button>
                        </div>
                        
                    </div>

                </div>

                
                
                <div className=' h-10 '>
                  <div className=' flex justify-end z-20'>
                    <div className='flex absolute justify-end h-10   ' >
                      <img className=' self-center mr-3 flex justify-end' src={Calendar} />
                    </div>
                    <label htmlFor='datePicker' className='z-20 w-full cursor-pointer flex h-10 self-center bg-transparent outline-0 px-4 border rounded-lg border-gray-400 ' >
                      <span className=' self-center'>
                      {formatDateDifference(selectedDate!)}
                      </span>
                    </label>
                  </div>
                  <div className=' relative mt-[-23px] ml-3  z-10'>
                    <DatePicker id='datePicker' name='datePicker' selected={selectedDate} onChange={(date)=>setSelectedDate(date!)} className=' hidden z-10' />
                  </div>
                  

                  {/* <input className='flex h-10 w-full self-center rounded-lg border border-gray-400 outline-0 px-4 ' placeholder='Дата народження' /> */}

                </div>

            </div>

            <div className='my-8 flex text-[20px] text-grayColorForHeader font-semibold mb-2'>Контактні дані</div>
            <div className='grid grid-cols-3 gap-5 my-8'>
              <div>
                <input placeholder='Номер' className=' w-full flex h-10 self-center rounded-lg border border-gray-400 outline-0 px-4 '
                  id="phoneNumber"
                  name="phoneNumber"
                  autoComplete="phoneNumber"
                  onChange={formik.handleChange}
                  value={formik.values.phoneNumber} />
                  {formik.errors.phoneNumber ? <div className=' text-red-500 text-sm font-semibold'>{formik.errors.phoneNumber}</div> : null}
              </div>

              <div>
                <input placeholder='Емайл' className=' w-full flex h-10 self-center rounded-lg border border-gray-400 outline-0 px-4 '
                  id="email"
                  name="email"
                  autoComplete="email"
                  onChange={formik.handleChange}
                  value={formik.values.email} />
              </div>

                  
            </div>

            <div className='my-8 flex text-[20px] text-grayColorForHeader font-semibold mb-2'>Адреса доставки</div>
            
            <div className='grid grid-cols-3 gap-5 mt-8 mb-4'>
              <div>

                <div className='  ' >
                  {address?

                    <div className=' flex justify-end z-20 self-center'>

                      <div className=' relative h-10 flex justify-end select-none w-full'>
                        <img className={classNames(' absolute mr-3 self-center transition-all',{" rotate-90":dropDownAddress})} onClick={()=>setDropDownAddress(!dropDownAddress)} src={SharpArrowRight} />
                        <div className='flex h-10 w-full self-center rounded-lg border border-gray-400 outline-0 px-4 ' onClick={()=>setDropDownAddress(!dropDownAddress)} placeholder='Стать'>
                            <span className=' self-center text-grayForText'>{selectedAddress?.country} / {selectedAddress?.city} / {selectedAddress?.postcode} / {selectedAddress?.street}</span>
                        </div>


                        <div className={classNames('w-full mt-1 max-h-[200px] overflow-y-auto transition-all absolute translate-y-10 overflow-hidden rounded-sm border bg-white border-optionsGrayForBorder ',{
                        " opacity-100 ": dropDownAddress,
                        " scale-y-0 " : !dropDownAddress
                        })} style={{transformOrigin:" top center"}} >
                          {addresses?.map((address_)=>{
                            return<>
                              <div className=' '>
                                <button type='button' onClick={()=>{setDefaultAddress({id:address_.id});setDropDownAddress(false);setSelectedAddress(address_);}} className='justify-between text-sm flex py-1 font-medium px-3 active:bg-white hover:bg-grayColorForBorder w-full'>
                                  <span className='mr-12'>{address_.country} / {address_.city} / {address_.postcode} / {address_.street}</span>
                                </button>
                              </div>
                              <hr/>

                            </>
                          })}

                            
                            

                        </div>

                      </div>

                    </div>
                    

                  :<div className=' self-center'>Ви ще не додали адресу</div>}
                </div>

                {/* <div className=' col-span-3'>
                    {address != undefined ? <span className=" text-sm">Is this not your address anymore? <span onClick={()=>handleDeleteAddress()} className=" text-black font-medium hover:text-red-500 select-none cursor-pointer">delete</span></span>:""}
                </div> */}
              </div>
            </div>

            <div>
              <button type='button' onClick={()=>{dispatch(setAddressModalWindow(true))}} className=' bg-mainYellowColor p-2  px-2 flex rounded-lg hover:bg-orange-400 text-white font-semibold'>
                Добавити адресу
              </button>
            </div>
            

            {/* <div className='grid grid-cols-3 gap-5 my-8'>


                <div className=' relative h-10 flex justify-end select-none'>
                    <img className={classNames(' absolute mr-3 self-center transition-all',{" rotate-90":dropDownCountry})} onClick={()=>setDropDownCountry(!dropDownCountry)} src={SharpArrowRight} />
                    <div className='flex h-10 w-full self-center rounded-lg border border-gray-400 outline-0 px-4 ' onClick={()=>setDropDownCountry(!dropDownCountry)} placeholder='Країна'>
                        <span className=' self-center text-grayForText'>{selectedCountry}</span>
                    </div>
                    

                    <div className={classNames('w-full mt-1 max-h-[200px] overflow-y-auto transition-all absolute translate-y-10 overflow-hidden rounded-sm border bg-white border-optionsGrayForBorder ',{
                    " opacity-100 ": dropDownCountry,
                    " scale-y-0 " : !dropDownCountry
                    })} style={{transformOrigin:" top center"}} >
                        <div className=' '>
                          <button onClick={()=>{setDropDownCountry(false);setSelectedCountry("Китай")}} className='justify-between text-sm flex py-1 font-medium px-3 active:bg-white hover:bg-grayColorForBorder w-full'>
                            <span className='mr-12'>Китай</span>
                          </button>
                        </div>
                        <hr/>
                        <div className=' '>
                          <button onClick={()=>{setDropDownCountry(false);setSelectedCountry("Нижний Новгород")}} className='justify-between text-sm flex py-1 font-medium px-3 active:bg-white hover:bg-grayColorForBorder w-full'>
                            <span className='mr-12'>Нижний Новгород</span>
                          </button>
                        </div>
                        <hr/>
                        <div className=' '>
                          <button onClick={()=>{setDropDownCountry(false);setSelectedCountry("CCCР")}} className='justify-between text-sm flex py-1 font-medium px-3 active:bg-white hover:bg-grayColorForBorder w-full'>
                            <span className='mr-12'>CCCР</span>
                          </button>
                        </div>
                        <hr/>
                        <div className=' '>
                          <button onClick={()=>{setDropDownCountry(false);setSelectedCountry("Америка")}} className='justify-between text-sm flex py-1 font-medium px-3 active:bg-white hover:bg-grayColorForBorder w-full'>
                            <span className='mr-12'>Америка</span>
                          </button>
                        </div>
                        <hr/>
                        <div className=' '>
                          <button onClick={()=>{setDropDownCountry(false);setSelectedCountry("Ерусалим")}} className='justify-between text-sm flex py-1 font-medium px-3 active:bg-white hover:bg-grayColorForBorder w-full'>
                            <span className='mr-12'>Ерусалим</span>
                          </button>
                        </div>
                        
                    </div>

                </div>

                <input className='flex h-10 self-center rounded-lg border border-gray-400 outline-0 px-4 ' placeholder='Місто ' />
                <input className='flex h-10 self-center rounded-lg border border-gray-400 outline-0 px-4 ' placeholder='Вулиця' />
            </div>

            <div className='grid grid-cols-3 gap-5 my-8'>
                <input className='flex h-10 self-center rounded-lg border border-gray-400 outline-0 px-4 ' placeholder='Номер будинку/квартири ' />
                <input className='flex h-10 self-center rounded-lg border border-gray-400 outline-0 px-4 ' placeholder='Номер відділення ' />
            </div>
            
             */}

            <button type='submit' className=' bg-mainYellowColor rounded-full h-20 w-20 mt-10 m-auto flex justify-center hover:scale-110 active:scale-90 transition-all duration-100'>
                <img className=' self-center h-10' src={WhitePlus} />
            </button>

        </div>

    </form>
  )
}

export default EditProfile