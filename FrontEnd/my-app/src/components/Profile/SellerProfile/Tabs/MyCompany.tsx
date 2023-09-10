import React from 'react'

function MySellerCompany() {
  return (
    <div>
      <div className='flex'>
        <div className='mr-5'>
          <div className='h-[250px] w-[250px] bg-slate-200 rounded-lg'/>
        </div>

        <div className=''>
          <span className=' text-[40px] font-semibold'>Apple</span>
          <br/>
          <div className=' w-4/5'>
            <span className='mt-4 text-lg'>Американская корпорация, разработчик персональных и планшетных компьютеров, аудиоплееров, смартфонов</span>
          </div>
          <div className=' mt-4'>
            <span>Добавити учасника за емайл адресом</span>
            <div className='relative mt-2'>
              <div className='flex '>
                <div className=' flex justify-end w-1/3 '>
                  <input className=' bg-slate-100 rounded-lg w-full outline-0 py-1 text-sm px-2' />
                  <div className=' bg-mainYellowColor  absolute h-full px-2 rounded-r-lg text-white font-semibold hover:scale-105 cursor-pointer active:bg-orange-300'>+</div>
                </div>
              </div>
              
              
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default MySellerCompany