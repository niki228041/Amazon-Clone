import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Outlet } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks';
import { UserState, becomeASeller } from "../../features/user/user-slice";
import { Orders } from "../../features/user/ordersStateSlice";
import { useDispatch } from 'react-redux';
import { apiCompanySlice, useGetCompanyByUserIdQuery } from '../../features/user/apiCompanySlice';
import { Company } from '../Admin/types';
import { apiCommentSlice } from '../../features/user/apiCommentSlice';

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

const MyCompanyTemp =()=> {
  var user = useAppSelector(((state: { user: UserState; orders: Orders })=>state.user.user));

  var {data:company}:{data:Company} = useGetCompanyByUserIdQuery({id:user.id});
  var [addUserToCompany,{}] = apiCompanySlice.useAddUserToCompanyMutation();
  var [uploadCompanyImage,{}] = apiCompanySlice.useUploadCompanyImageMutation();
  var [addAvatarToCompany,{}] = apiCompanySlice.useAddAvatarToCompanyMutation();

  
  var [fileToSend,setFileToSend] = useState("");
  var [serverError,setServerError] = useState<ServerResponse>({isSuccess:true,message:""});
  var [selectedImage,setSelectedImage] = useState();
  

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

  

  return (
    <div className=''>
      <div className=' flex'>
        <div className=''>
          <span className='text-lg font-semibold mr-2'>Your Company</span>
          <p>Company name : {company?.name}</p>
          <p>Company description : {company?.description}</p>
        </div>
        <div>
          <div className='ml-5 hover:bg-slate-100 active:scale-105 border flex justify-center select-none w-20 h-20  rounded-lg bg-cover' style={{ backgroundImage:"url("+company?.image+")", backgroundPosition:"center"}} >
        </div>
        </div>
      </div>

      {company?.creatorId == Number(user.id) ?
      <div className='grid grid-cols-4 gap-3'>
        <form className=' col-span-2' onSubmit={handleAddMember}>
          <p className=' text-sm mt-4'>Enter the user's email address to add them to your company</p>
          <input id='email' name='email' className='border outline-0 rounded-lg p-2 text-sm' />
          <br/>
          <button className=' hover:bg-orange-500 bg-orange-600 py-1 px-5 mt-2 rounded-lg text-white'>
              Add Member to your company
          </button>
          <p>{serverError?.message}</p>
        </form>
        
        <div className=' col-span-1 m-auto'>
          <p className='my-2 flex self-center justify-center'>Add image</p>
          <label htmlFor='image' className='flex self-center justify-center'>
            <div className='hover:bg-slate-100 active:scale-105 border flex justify-center select-none w-20 h-20  rounded-lg bg-cover' style={{ backgroundImage:"url("+selectedImage+")", backgroundPosition:"center"}} >
              <span className=' self-center'>
                +
              </span>
            </div>
          </label>
          <div onClick={()=>{HandleAddAvatarToCompany()}} className='hover:bg-slate-100 active:scale-105 px-1 m-auto border mt-1 select-none  rounded-lg bg-cover flex self-center justify-center' >
            <span className=' text-sm self-center'>
              Save as company avatar image
            </span>
          </div>
          <input onChange={HandleFileSelection} id='image' name='image' className='hidden' type='file' />
        </div>
      </div>
      :""}
    </div>
  )
}


export default MyCompanyTemp
