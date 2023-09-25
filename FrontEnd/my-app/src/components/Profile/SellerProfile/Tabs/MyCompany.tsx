import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../../../app/hooks';
import { apiCompanySlice, useGetCompanyByUserIdQuery } from '../../../../features/user/apiCompanySlice';
import { Company } from '../../../Admin/types';
import plus from '../../../../images/plusIcon.png'
import { useDispatch } from 'react-redux';
import { setCompanyModalWindow } from '../../../../features/user/modalWindowsStateSlice';


interface AddUserToCompany{
  userEmail:string,
  companyId:number,
}

interface AddAvatarToCompany{
  image:string,
  companyId:number,
}

interface ServerResponse{
  message:string,
  isSuccess:boolean
}


function MySellerCompany() {
  var user = useAppSelector(((state)=>state.user.user));

  var {data:company}:{data:Company} = useGetCompanyByUserIdQuery({id:user.id});


  var [addUserToCompany,{}] = apiCompanySlice.useAddUserToCompanyMutation();
  var [uploadCompanyImage,{}] = apiCompanySlice.useUploadCompanyImageMutation();
  var [addAvatarToCompany,{}] = apiCompanySlice.useAddAvatarToCompanyMutation();

  
  var [fileToSend,setFileToSend] = useState("");
  var [serverError,setServerError] = useState<ServerResponse>({isSuccess:true,message:""});
  var [selectedImage,setSelectedImage] = useState<string>();
  
  var dispatch = useDispatch();

  const handleAddMember= async (data:React.FormEvent<HTMLFormElement>)=>{
    data.preventDefault();
    var curentData = new FormData(data.currentTarget);
    var email = curentData?.get("email")?.toString()!;

    var request:AddUserToCompany = {userEmail:email,companyId:company.id};
    var res = await addUserToCompany(request);

    if(res?.data){
      setServerError({isSuccess:res.data.isSuccess,message:res?.data.message});
    }

  }

  
  const HandleFileSelection = async (event:any)=>{
    const files = event.target.files;
    if (files[0] && files[0].type.startsWith('image/')) {
      
      console.log(files);
      
      console.log("files_to_send");
      
      const promise = new Promise((resolve) => {
          let byte_img = toBase64(files[0]);
          byte_img.then((res: any) => {
          let res_byte_img = res.split(',')[1];
          resolve(res_byte_img);
        });
      });
    
      try {
        var base64img:any = await Promise.resolve(promise);
        setFileToSend(base64img);
        var response = await uploadCompanyImage({ image: base64img });
        // setBackgroundImage(response.data);
        console.log(response.data.link);
        setSelectedImage(response.data.link);
      } catch (error) {
        console.error(error);
      }
    }
  }

  const HandleAddAvatarToCompany = async ()=>{
    console.log(fileToSend);
    if(fileToSend!= "")
    {
    var request:AddAvatarToCompany = {image:fileToSend,companyId:company.id};
      addAvatarToCompany(request);
    }
  }

  
  const toBase64:any = (file:File) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);

  });

  useEffect(()=>{

    setSelectedImage(company?.image);
  
  },[company?.image])


  return (
    <div>
      {company?
      <div className='grid grid-cols-6'>

        <div className=' col-span-1 '>
          <label htmlFor='image' className='flex self-center justify-center'>
            <div className='h-[250px] w-[250px] flex justify-center bg-cover  rounded-lg' style={{ backgroundImage:"url("+selectedImage+")", backgroundPosition:"center"}} >
              <span className=' self-center'>
                <img className='hover:scale-105' src={plus} />
              </span>
            </div>
          </label>
          
        </div>

        <div className=' col-span-5 relative'>
          <div className=' px-10'>
            <span className=' text-[40px] font-semibold'>{company?.name}</span>
            <br/>
            <div className=' w-4/5'>
              <span className=' text-lg'>{company?.description}</span>
            </div>
            <span className=' text-sm absolute bottom-0'>Добавити учасника за емайл адресом</span>
          </div>
        </div>

        <div className='col-span-1'>
          <div onClick={()=>{HandleAddAvatarToCompany()}} className=' mt-2 hover:bg-slate-100 active:scale-105 px-1 m-auto border select-none  rounded-lg bg-cover flex self-center justify-center' >
            <span className=' text-sm self-center'>
              Save as company avatar image
            </span>
          </div>
          <input onChange={HandleFileSelection} id='image' name='image' className='hidden' type='file' />

        </div>

        <div className=' col-span-5'>
          <div className='px-10'>
            
            <div className='relative mt-2'>
    
              <form className=' col-span-2' onSubmit={handleAddMember}>
                <div className='flex '>
                  <div className=' flex justify-end'>
                    <input id='email' name='email' className=' bg-slate-200 rounded-lg w-full outline-0 py-1 text-sm px-2' />
                    <button className=' bg-mainYellowColor  absolute h-full px-2 rounded-r-lg text-white font-semibold hover:scale-105 cursor-pointer active:bg-orange-300'>+</button>
                  </div>
                </div>
              </form>
            </div>
            <p>{serverError?.message}</p>
          </div>
        </div>

        

      </div>
      :
      <div onClick={()=>dispatch(setCompanyModalWindow(true))} className=' w-full py-5 bg-slate-400 rounded-lg flex justify-center font-semibold text-[20px] text-white select-none transition-all cursor-pointer'>
        Створити компанію
      </div>
        }
    </div>
  )
}

export default MySellerCompany