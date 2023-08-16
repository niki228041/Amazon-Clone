import React, { useRef, useState } from 'react';



const Address: React.FC = () => {



  return (
    <div >
      <div style={{height:"200px",width:"100px",borderWidth:"2px",borderColor:"black"}}>
        <div>
          <div className='w-full h-[160px]' style={{ backgroundImage: "url(" +  + ")", backgroundPosition: "center", backgroundSize: "contain", backgroundRepeat: "no-repeat" }}>

          </div>
          {/* <img src={data?.image ? "data:image/png;base64," + data?.image : img} className=' w-full h-[100px] ' />         */}
        </div>
        <div className='p-1 '>
          <div className=' max-h-[60px] overflow-hidden '>
            <p className='text-blue-950 text-sm hover:text-red-700 cursor-pointer hover:underline '>
              
            </p>
          </div>

          <div className='flex'>
            
            <span className='ml-1 text-blue-950 hover:text-red-700 cursor-pointer hover:underline text-[12px] font-medium'></span>
          </div>

          <p className='text-sm text-red-700 font-medium'></p>
        </div>
      </div>


    </div>
  );


};
export default Address;