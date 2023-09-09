import React from 'react'
import PropTypes from 'prop-types'
import checkGray from "../../../images/check_gray.svg"
import { useParams } from 'react-router-dom';
import { OneProductVM } from '../../types';
import { useGetProductByIdQuery } from '../../../features/user/apiProductSlice';

const Description=()=> {
  const params = useParams();
  const { data, isSuccess }: { data?: { payload: OneProductVM }, isSuccess: boolean } = useGetProductByIdQuery({ Id: params.productId });


  return (
    <div className='text-[18] '>
    <div dangerouslySetInnerHTML={{ __html: data?.payload.description.toString()! }} className='mx-4 py-1 pb-3 w-11/12 text-gray-600'>
                            
    </div>

    {/* ТАБЛИЦЯ З ІНФОРМАЦІЄЮ */}
    {/* <div className=' ml-4'>
    <div className=' w-3/5 border'>
    <div className=' grid grid-cols-6'>
        <div className=' bg-grayColorForBorder col-span-2 p-1 px-2'>
            Модель
        </div>
        <div className=' h-full col-span-4 px-4 self-center'>
            #8786867
        </div>
    </div>
    <hr/>
    <div className=' grid grid-cols-6'>
        <div className=' bg-grayColorForBorder col-span-2 p-1 px-2'>
            Стиль
        </div>
        <div className=' h-full col-span-4 px-4 self-center'>
            Classic style
        </div>
    </div>
    <hr/>
    <div className=' grid grid-cols-6'>
        <div className=' bg-grayColorForBorder col-span-2 p-1 px-2'>
            Сертифікат
        </div>
        <div className=' h-full col-span-4 px-4 self-center'>
            ISO-898921212
        </div>
    </div>
    <hr/>
        <div className=' grid grid-cols-6'>
            <div className=' bg-grayColorForBorder col-span-2 p-1 px-2'>
                Розмір
            </div>
            <div className=' h-full col-span-4 px-4 self-center'>
                34mm x 450mm x 19mm
            </div>
        </div>
        <hr/>
        <div className=' grid grid-cols-6'>
            <div className=' bg-grayColorForBorder col-span-2 p-1 px-2'>
                Модель
            </div>
            <div className=' h-full col-span-4 px-4 self-center'>
                36GBRAM
            </div>
        </div>
    </div>

    </div>


        <div className='ml-4 mt-6'>
            <div className='flex py-2'>
                <img src={checkGray} />
                <p>Some great feature name here</p>
            </div>
        <div className='flex py-2'>
            <img src={checkGray} />
            <p>Lorem ipsum dolor sit amet, consectetur </p>
        </div>
        <div className='flex py-2'>
            <img src={checkGray} />
            <p>Duis aute irure dolor in reprehenderit</p>
        </div>
        <div className='flex py-2'>
            <img src={checkGray} />
            <p>Some great feature name here</p>
        </div>
        </div> */}

    </div>
  )
}


export default Description
