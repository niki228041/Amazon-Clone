import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import checkGray from "../../../images/check_gray.svg"
import { useParams } from 'react-router-dom';
import circle from '../../../images/black-circle.png';
import { Comment, OneProductVM } from '../../types';
import arrowAnswer from '../../../images/ArrowAnswer.svg';
import filled_star from '../../../images/filled_star.svg';
import unfilled_star from '../../../images/unfiled_star.svg';
import checkForReview from "../../../images/CheckForReview.svg"
import plusForComment from "../../../images/PlusForComment.svg"
import { format, formatDistanceToNow, parseISO } from 'date-fns';


import star from "../../../images/star (2).png"
import empty_star from "../../../images/star (3).png"

import "../../Player/ScrollBar.css";
import { useAppSelector } from '../../../app/hooks';
import { apiProductSlice, useCanLeaveCommentQuery, useGetProductByIdQuery } from '../../../features/user/apiProductSlice';

export interface CommentFromServer{
    id:number,
    stars:number,
    title:string,
    message:string,
    dateCreated:string,
    likes:number,
    dislikes:number,
    userId:number,
    userName:string,
    productId:number,
}

export interface createComment{
  stars:number,
  message:string,
  userId:number,
  productId:number,
}

export interface canLeaveComment{
  userId:number,
  productId:number,
}




export const CommentItem=({comment}:{comment:CommentFromServer})=>{

  function formatDateDifference(dateString:string) {
    const date = parseISO(dateString);
    const now = new Date();
  
  
    const difference = format(date, 'dd.MM.yyyy');
  
    return difference;
  }

    const getStarts=()=>{
      var jsx_stars: JSX.Element[] = [];
      for(var i = 0;i<5;i++)
      {
        if(i<comment.stars)
        {
          jsx_stars.push(<img key={i} className='' src={filled_star} />);
        }
        else
        {
          jsx_stars.push(<img key={i} className='h-4 ' src={unfilled_star} />);
        }
      }
      return jsx_stars;
    }

    return <>
    <div className='mb-7  '>
        <div className='flex justify-between'>
          <div className='flex'>
            <img className='h-12' src={circle} />
            <span className=' self-center ml-2'>{comment.userName}</span>
          </div>
          <div>
            <div className='text-sm'>{formatDateDifference(comment.dateCreated)}</div>
          </div>
        </div>
        <div className='flex mt-2'>
            {getStarts()}
        </div>
        <div className='flex mt-2 text-sm'>
            {comment.message}
        </div>
        <div className='flex text-sm mt-2 text-grayForText select-none hover:text-black'>
            <img src={arrowAnswer} className='h-2 self-center' />
            Відповісти 
        </div>
    </div>
    </>
}

const Reviews=()=> {
    const params = useParams();

    console.log(params.productId);
    var [stars,setStars] = useState(5);
    var [commentText,setCommentText] = useState("");
    const user = useAppSelector((state)=>state.user.user);

    var [createComment,{}] = apiProductSlice.useCreateCommentMutation();
    const { data, isSuccess }: { data?: { payload: OneProductVM }, isSuccess: boolean } = useGetProductByIdQuery({ Id: params.productId });

    const {data:comments,isSuccess:isCommentsSuccess} = apiProductSlice.useGetCommentsByProductIdQuery({id:params.productId}) as {
      data: CommentFromServer[];
      isSuccess: boolean;
    };

    var request:canLeaveComment = {productId:parseInt(params.productId!), userId:parseInt(user.id)};

    const {data:canLeaveComment} = useCanLeaveCommentQuery(request) as {
      data:{payload:boolean};
      isSuccess: boolean;
    };


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

    useEffect(()=>{},[comments?.length,canLeaveComment?.payload])

    console.log(canLeaveComment);

  return (
    <div className='p-5 px-10 '>

      {canLeaveComment?.payload ?
      <div className='mb-5'>
        <div className="flex ">
          <img className='h-10 self-center mr-3' src={checkForReview} />
          <div className='flex justify-between'>
            <div className=' font-semibold w-3/4 '>
            Висловлюємо щирі подяки за ваш вибір!  Нам дуже цікава ваша думка ,тому будемо щиро вдячні за ваш відгук.
            </div>
            <div className='mt-4 flex self-end'>
                <img onClick={()=>changeStars("1")} id='1' className='h-4 w-4 mr-1 hover:contrast-75 image-container' src={star} />
                <img onClick={()=>changeStars("2")} id='2' className='h-4 w-4 mr-1 hover:contrast-75 image-container' src={star} />
                <img onClick={()=>changeStars("3")} id='3' className='h-4 w-4 mr-1 hover:contrast-75 image-container' src={star} />
                <img onClick={()=>changeStars("4")} id='4' className='h-4 w-4 mr-1 hover:contrast-75 image-container' src={star} />
                <img onClick={()=>changeStars("5")} id='5' className='h-4 w-4 mr-1 hover:contrast-75 image-container' src={star} />
            </div>
          </div>
          
        </div>

        <div className='mt-3 flex '>
          <input className='w-full bg-whiteGrayComment outline-0 px-4 py-2 rounded-lg mr-2 ' onChange={(e)=>setCommentText(e.target.value)} value={commentText} />
          <div className=' bg-whiteGrayComment flex justify-center rounded-lg  hover:scale-105  outline-grayForText'>
            <span className=' self-center px-3' onClick={async ()=>{
              var request:createComment = {message:commentText,stars:stars,userId:parseInt(user.id),productId:data?.payload.id!};
              console.log(request);
              var res = await createComment(request);
              setCommentText("");
              console.log(res);
              }}>
              <img className='h-6' src={plusForComment} />
            </span>
          </div>
        </div>

        
  
        <div className=" text-grayColorForHeader text-sm">
          Ви можете написати тільки он коментар за один куплений товар. В подальшому його можна буде редагувати.
        </div>

      </div>
      :""}

        {comments?.map((comment: CommentFromServer, id: number) => {
          return <div key={id}>{<CommentItem  comment={comment} />}</div> })}
        {comments?.length == 0 ? "Product still don't have any Review." : ""}
    </div>
  )
}


export default Reviews
