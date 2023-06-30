


import { useParams} from 'react-router-dom'
import img from '../images/t-shirt-png.webp'
import { useGetProductByIdQuery, useGetProductsQuery } from '../features/user/apiProductSlice';
import { Order, Product } from './types';
import { useAppSelector } from '../app/hooks';
import { useDispatch } from 'react-redux';
import { addOrder } from '../features/user/ordersStateSlice';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import star from "../images/star (2).png"
import empty_star from "../images/star (3).png"

const OneProduct=()=>{
    const dispatch = useDispatch();
    const params = useParams();
    const orders = useAppSelector((state)=>state.orders);
    var [stars,setStars] = useState(5);


    const handleAddNewOrder=(data:any)=>{
        const newOrder:Order = {id:uuidv4(), name:data.name,product_id:data.id};
        dispatch(addOrder(newOrder));
    }

    const changeStars=(star_id:string)=>{

        setStars(parseInt(star_id));
    
        for(var i = 1;i<=5;i++){
    
          var val:any = document.getElementById(i.toString());
    
          if(i <= parseInt(star_id))
          {
            val.src = star;  
          }
          else
          {
            val.src = empty_star;
          }
          
        }
    }

    const createNewComment=(data:React.FormEvent<HTMLFormElement>)=>{
        data.preventDefault();
        var curentData = new FormData(data.currentTarget);
        var title = curentData?.get("Title")?.toString()!;
        var text = curentData?.get("Text")?.toString()!;

        //НАДА ЗАЛОГІНЕННИЙ ЮЗЕР ДЛЯ ПРОДОВЖЕННЯ КОДУ ---------------------------------------------------
    }


    
    // const { data, isSuccess } = useGetProductByIdQuery({ Id: params.productId });
    
    const { data, isSuccess }: { data?: { payload: Product }, isSuccess: boolean } = useGetProductByIdQuery({ Id: params.productId });

    console.log(data);

    // Now you can access the payload directly

    return <>
        {isSuccess?
        <div className='pl-40 pr-40 '>
        
        <div className='mt-10 mb-20'>
            <div className='grid grid-cols-12 gap-2 '>
                <div className=' w-full col-span-5 h-[400px] px-12'>
                    <div className=' w-full h-[400px]' style={{backgroundImage: `url(${'data:image/gif;base64,' + data?.payload.image[0].image})`,backgroundPosition:"center",backgroundSize:"contain",backgroundRepeat:'no-repeat' }}>

                    </div>
                </div>
                
                <div className='w-full col-span-5 flex flex-col '>
                    <span className=" text-xl">{data?.payload.name}</span>
                    <hr className='my-3' />
                    <div className='flex'>
                        <span>Price:</span>
                        <div className='ml-2'>
                        <p> <span className="text-red-700 text-lg font-medium">
                            €{data?.payload.price}  
                            <span className='p-1 rounded-sm text-sm font-medium text-red-700'>
                            (%{data?.payload.discount})
                            </span>
                            </span>
                        </p>
                        
                        </div>
                    </div>
                    
                    <span className='text-sm font-medium mt-4'>About this item</span>
                    <div dangerouslySetInnerHTML={{ __html: data?.payload.description.toString()! }}/>
                    <div>
                        
                    </div>
                </div>
                <div className='w-full col-span-2 justify-center'>
                    <button  onClick={()=>{handleAddNewOrder(data?.payload)}} className='bg-yellow-300 w-full p-2 rounded-xl'>Add to cart</button>
                </div>
            </div>
        </div>

        <div>
            <div className='mb-10'>
            <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Add Comment
                </label>
                
                
              </div>
            <form className='flex' onSubmit={createNewComment}>

                <div className='w-full flex bg-slate-200 rounded-xl p-2'>

                    <div className='flex flex-col w-[90%] mt-4'>
                        <label htmlFor='Title' className='text-sm mb-1'>Title</label>
                        <input 
                          id="Title"
                          name="Title"
                          required
                          className="shadow-xl outline-0 text-[12px] w-full mr-2 p-3 block rounded-md  py-1.5 text-gray-900 focus:shadow-xl ring-gray-300 placeholder:text-gray-400 " />
                        
                        <label htmlFor='Text'  className='text-sm mb-1'>Text</label>
                        <textarea 
                          id="Text"
                          name="Text"
                          required
                          className="shadow-xl outline-0 text-[12px] w-full mr-2 p-3 block rounded-md  py-1.5 text-gray-900 focus:shadow-xl ring-gray-300 placeholder:text-gray-400 " />
                    </div>
                    
                    <div className='ml-2'>
                        <div className='p-2 w-full flex rounded-full self-end'>
                            <img onClick={()=>changeStars("1")} id='1' className='h-4 mr-1 hover:contrast-75 image-container' src={star} />
                            <img onClick={()=>changeStars("2")} id='2' className='h-4 mr-1 hover:contrast-75 image-container' src={star} />
                            <img onClick={()=>changeStars("3")} id='3' className='h-4 mr-1 hover:contrast-75 image-container' src={star} />
                            <img onClick={()=>changeStars("4")} id='4' className='h-4 mr-1 hover:contrast-75 image-container' src={star} />
                            <img onClick={()=>changeStars("5")} id='5' className='h-4 mr-1 hover:contrast-75 image-container' src={star} />
                        </div>

                        <button
                          type="submit"
                          className=" w-full h-10  flex justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Add Comment
                        </button>
                    </div>
                    
                </div>

            </form>
            <div className=' mt-2'>
                <div className='bg-slate-400'>
                    asasd
                </div>
            </div>
            </div>

        </div>

        </div>
        :""}
    </>
}
    
export default OneProduct