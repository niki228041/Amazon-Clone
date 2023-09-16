import React, { useEffect, useState } from 'react'
import deleteicon from '../../../../images/deleteicon.png'
import editicon from '../../../../images/editIcon.png'
import eyeicon from '../../../../images/openedEye.svg'
import { apiProductSlice } from '../../../../features/user/apiProductSlice'
import { useAppSelector } from '../../../../app/hooks'
import { Product } from '../../../types'
import { Link } from 'react-router-dom'

interface ProdutsByUserIdWithPagination{
  id:number,
  page:number,
  limit:number,
}

function AddedProducts() {

  var user = useAppSelector((state)=>state.user.user);
  var [page, setPage] = useState(1);
  var [limit, setLimit] = useState(8);
  var [products, setProducts] = useState<Product[]>([]);

  const [deleteProduct_,{}] = apiProductSlice.useDeleteProductMutation();

  const deleteProductHandle=(id:number)=>{
      setProducts(products.filter(prod=>prod.id != id));
      deleteProduct_({id:id});
  }

  var request:ProdutsByUserIdWithPagination = {id:parseInt(user.id),page:page,limit:limit};

  var [getProductsByUserId,{}] = apiProductSlice.useGetProductWithLimitByUserIdMutation();

  useEffect(()=>{

  },[products]);

  useEffect(()=>{
    getProductsByUserId(request).then((result:{data:{payload:Product[]}})=>{
      console.log(result?.data?.payload);
      if(result?.data?.payload)
      setProducts(result.data.payload);
    });
  },[]);

  console.log(products);
  const parser = new DOMParser();

  return (
    <div className=''>
      <div className=' flex justify-between mb-4 '>
        <div className='self-center text-[30px]'>Товари які ви продаєте</div>
        <div className=' self-center ' >
          <Link to={"/seller/createProduct"} className=' bg-mainYellowColor rounded-lg text-white font-semibold py-2 px-2 cursor-pointer hover:scale-105 active:bg-orange-300'>Добавити Товар</Link>
        </div>
      </div>

      {products.length>0 ? products?.map((prod)=>{
        return <>
          <div className='grid grid-cols-8  gap-6'>
            <div className='col-span-1'>
              <div className=' h-40 bg-center bg-contain bg-no-repeat ' style={{backgroundImage:`url(${prod.image})`}}>

              </div>
              <div className=' bg-slate-800 mt-2 flex p-1'>
                <div onClick={()=>deleteProductHandle(prod.id)} className=' bg-slate-600 mr-2 hover:bg-slate-400 active:bg-slate-300 '>
                  <img className='h-6' src={deleteicon} />
                </div>
                <Link to={"/seller/editProduct/"+prod.id} className=' bg-slate-600 mr-2 hover:bg-slate-400 active:bg-slate-300 '>
                  <img className='h-6' src={editicon} />
                </Link>
                <Link to={"/product/description/"+prod.id} className=' bg-slate-600 flex mr-2 hover:bg-slate-400 active:bg-slate-300 '>
                  <img className='h-4 self-center' src={eyeicon} />
                </Link>
              </div>
            </div>


            <div className=' col-span-7 overflow-hidden'>
              <p className=' text-[20px] h-9 overflow-hidden'>{prod.name}</p>
              <p className=' h-40 overflow-hidden '>{parser.parseFromString(prod?.description, 'text/html').body.textContent?.slice(0,30)}</p>
            </div>

          </div>
        </>
      }) :"У вас ще не має добавлених товарів"}

      


      {/* У вас ще не має добавлених товарів */}
    </div>
  )
}

export default AddedProducts
