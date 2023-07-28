


import { useParams} from 'react-router-dom'
import img from '../../images/t-shirt-png.webp'
import { useGetProductByIdQuery, useGetProductsQuery } from '../../features/user/apiProductSlice';
import { Order, Product, SelectedOption } from '../types';
import { useAppSelector } from '../../app/hooks';
import { useDispatch } from 'react-redux';
import { addOrder } from '../../features/user/ordersStateSlice';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import star from "../../images/star (2).png"
import empty_star from "../../images/star (3).png"
import circle from "../../images/black-circle.png"
import { apiCommentSlice, useGetCommentsByProductIdQuery } from '../../features/user/apiCommentSlice';



interface createCommentDTO{
    title: string,
    message: string,
    stars: number,
    likes: number,
    dislikes: number,
    userId: number,
    productId: number,
    images: [],
}
interface Comment{
    id:number,
    dateCreated:string,
    title: string,
    message: string,
    stars: number,
    likes: number,
    dislikes: number,
    userId: number,
    userName: string,
    productId: number,
    images: [],
}

const OneProduct=()=>{
    const dispatch = useDispatch();
    const params = useParams();
    const orders = useAppSelector((state)=>state.orders);
    var [stars,setStars] = useState(5);

    const user = useAppSelector((state)=>state.user.user);
    var [createComment,{}] = apiCommentSlice.useCreateCommentMutation();

    const {data:comments,isSuccess:isCommentsSuccess} = useGetCommentsByProductIdQuery({id:params.productId}) as {
        data: Comment[];
        isSuccess: boolean;
      };
    

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

    
    const getStarts=(stars_:number)=>{
      var jsx_stars: JSX.Element[] = [];
      for(var i = 0;i<5;i++)
      {
        if(i<stars_)
        {
          jsx_stars.push(<div key={i} className='star-small'/>);
        }
        else
        {
          jsx_stars.push(<div key={i} className='empty_star-small h-3' />);
        }
      }
      return jsx_stars;
    }

    const createNewComment=(data:React.FormEvent<HTMLFormElement>)=>{
        data.preventDefault();

        var curentData = new FormData(data.currentTarget);
        var title = curentData?.get("Title")?.toString()!;
        var text = curentData?.get("Text")?.toString()!;

        var newComment:createCommentDTO = {title:title,message:text,stars:stars,likes:0,dislikes:0,userId:parseInt(user.id),productId: parseInt(params.productId!),images:[]};
        createComment(newComment);
        //НАДА ЗАЛОГІНЕННИЙ ЮЗЕР ДЛЯ ПРОДОВЖЕННЯ КОДУ ---------------------------------------------------
    }

    // const { data, isSuccess } = useGetProductByIdQuery({ Id: params.productId });
    
    const { data, isSuccess }: { data?: { payload: Product }, isSuccess: boolean } = useGetProductByIdQuery({ Id: params.productId });

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
                    

                </div>
                <div className='w-full col-span-2 justify-center'>
                    <button  onClick={()=>{handleAddNewOrder(data?.payload)}} className='bg-yellow-300 w-full p-2 rounded-xl'>Add to cart</button>
                    <div className='mt-10'>
                        {data?.payload.options.map((opt:SelectedOption,index:number)=><div key={index} className='flex justify-between'>
                            <div className=' font-medium'>
                            {opt.title}
                            </div>
                            <div>
                            {opt.variant}
                            </div>

                        </div>)}
                    </div>
                </div>
            </div>
        </div>

        <form className='pl-40 pr-40' onSubmit={createNewComment}>
            <div className='mb-10'>
            <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Add Comment
                </label>
                
              </div>
            <hr/>
            <div className='grid grid-cols-6 mt-4'>
            <div className=' col-span-1'>
                <p className=' text-md font-medium'>
                Create your own review
                </p>
                <div className=' mt-4 w-full flex rounded-full self-end'>
                    <img onClick={()=>changeStars("1")} id='1' className='h-6 mr-1 hover:contrast-75 image-container' src={star} />
                    <img onClick={()=>changeStars("2")} id='2' className='h-6 mr-1 hover:contrast-75 image-container' src={star} />
                    <img onClick={()=>changeStars("3")} id='3' className='h-6 mr-1 hover:contrast-75 image-container' src={star} />
                    <img onClick={()=>changeStars("4")} id='4' className='h-6 mr-1 hover:contrast-75 image-container' src={star} />
                    <img onClick={()=>changeStars("5")} id='5' className='h-6 mr-1 hover:contrast-75 image-container' src={star} />
                </div>

                <button
                  type="submit"
                  className=" pt-1 mt-8 self-center text-[14px] w-full h-8  flex justify-center rounded-md bg-gray-600  text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Add Comment
                </button>

            </div>
            <div className=' col-span-5'>

                <div className='w-full flex  rounded-xl  pl-2'>

                    <div className='flex flex-col w-full mt-1'>
                        <label htmlFor='Title' className='text-sm mb-1 font-medium '>Title</label>
                        <input 
                          id="Title"
                          name="Title"
                          required
                          className="shadow-xl outline-0 text-[12px] w-full p-3 block rounded-md  py-1.5 text-gray-900 focus:shadow-xl ring-gray-300 placeholder:text-gray-400 " />
                        
                        <label htmlFor='Text'  className='text-sm mb-1 font-medium '>Text</label>
                        <textarea 
                          id="Text"
                          name="Text"
                          required
                          className="shadow-xl outline-0 text-[12px] w-full p-3 block rounded-md  py-1.5 text-gray-900 focus:shadow-xl ring-gray-300 placeholder:text-gray-400 " />
                    </div>
                    
                    {/* <div className='ml-2'>
                        <div className='p-2 w-full flex rounded-full self-end'>
                            <img onClick={()=>changeStars("1")} id='1' className='h-4 mr-1 hover:contrast-75 image-container' src={star} />
                            <img onClick={()=>changeStars("2")} id='2' className='h-4 mr-1 hover:contrast-75 image-container' src={star} />
                            <img onClick={()=>changeStars("3")} id='3' className='h-4 mr-1 hover:contrast-75 image-container' src={star} />
                            <img onClick={()=>changeStars("4")} id='4' className='h-4 mr-1 hover:contrast-75 image-container' src={star} />
                            <img onClick={()=>changeStars("5")} id='5' className='h-4 mr-1 hover:contrast-75 image-container' src={star} />
                        </div>

                        
                    </div> */}
                    
                </div>

            </div>
            </div>

           
            </div>


            <div className='grid grid-cols-6 mt-4'>
                <div className=' col-span-1 '>
                    dfsfdsdasd
                </div>
                <div className='col-span-5'>
                    {comments?.map((comm:Comment)=>{
                        const dateTime = new Date(comm.dateCreated);
                        const dateOnly = new Date(dateTime.getFullYear(), dateTime.getMonth(), dateTime.getDate());

                        return <div className='p-2 flex' key={comm.id}>
                        <div className='mr-3 h-8 w-10'>
                            <img className='h-8 w-8' src={circle} />
                        </div>
                        <div className=' w-full'>
                            <div>
                                <div className='flex content-center self-center text-[14px]'>
                                    {comm.userName}
                                </div>
                                <div className=' text-[18px] font-medium '>
                                    <div className=' font-normal text-[11px]  '>{dateOnly.toLocaleDateString()}</div> 

                                    <div className=''>
                                        {comm.title}
                                    </div>
                                    <div className='mt-1 w-full flex rounded-full self-end'>
                                        {getStarts(comm.stars)}
                                    </div>


                                </div>
                            </div>
                            <div className=' text-[13px] mb-5'>
                                {comm.message}
                            </div>
                            {/* <div className='grid gap-3 grid-cols-6 mt-2 mb-7'>
                                <div className='h-20 w-20 border rounded-md'>
                                    <div className='h-20 w-20 bg-cover hover:scale-105 transition-all' style={{backgroundImage:`url(${img})`,backgroundPosition:"center",backgroundRepeat:"no-repeat"}} />
                                </div>
                                <div className='h-20 w-20 border rounded-md'>
                                    <div className='h-20 w-20 bg-cover hover:scale-105  transition-all' style={{backgroundImage:`url(${img})`,backgroundPosition:"center",backgroundRepeat:"no-repeat"}} />
                                </div>
                                <div className='h-20 w-20 border rounded-md '>
                                    <div className='h-20 w-20 bg-cover hover:scale-105  transition-all ' style={{backgroundImage:`url(${img})`,backgroundPosition:"center",backgroundRepeat:"no-repeat"}} />
                                </div>
                                <div className='h-20 w-20 border rounded-md flex justify-center self-center text-center content-center m-auto py-6'>
                                    <p>3+...</p>
                                </div>
                            </div> */}
                            
                        </div>
                    </div>
                    })}
                    
                   
                </div>
            </div>
        </form>

        </div>
        :""}
    </>
}
    
export default OneProduct