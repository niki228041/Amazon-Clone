import React from 'react'
import PropTypes from 'prop-types'
import checkGray from "../../../images/check_gray.svg"
import { useGetCommentsByProductIdQuery } from '../../../features/user/apiCommentSlice';
import { useParams } from 'react-router-dom';
import circle from '../../../images/black-circle.png';
import { Comment } from '../../types';
import arrowAnswer from '../../../images/ArrowAnswer.svg';
import filled_star from '../../../images/filled_star.svg';
import unfilled_star from '../../../images/unfiled_star.svg';

import "../../Player/ScrollBar.css";

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

export const CommentItem=({comment}:{comment:CommentFromServer})=>{

    
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
    <div className='mb-7'>
        <div className='flex'>
            <img className='h-14' src={circle} />
            <span className=' self-center ml-2'>Поліщук Тетяна</span>
        </div>
        <div className='flex mt-2'>
            {getStarts()}
        </div>
        <div className='flex mt-2 text-lg'>
            {comment.message}
        </div>
        <div className='flex text-lg mt-2 text-grayForText select-none hover:text-black'>
            <img src={arrowAnswer} className='h-2 self-center' />
            Відповісти 
        </div>
    </div>
    </>
}

const Reviews=()=> {
    const params = useParams();

    console.log(params.productId);

    const {data:comments,isSuccess:isCommentsSuccess} = useGetCommentsByProductIdQuery({id:params.productId}) as {
        data: CommentFromServer[];
        isSuccess: boolean;
    };
    console.log(comments);

  return (
    <div className='p-5 px-10 overflow-y-scroll h-[400px] '>
        {comments?.map((comment: CommentFromServer, id: number) => {
          return <div key={id}>{<CommentItem  comment={comment} />}</div> })}
        {comments?.length == 0 ? "Product still don't have any Review." : ""}
    </div>
  )
}


export default Reviews
