import { useNavigate } from "react-router-dom";
import "../index.css"
import { useState } from "react";
import SideBar from "./SideBar";

const Header=()=> {

    const navigate = useNavigate(); 

    const routeChange = (path:string) =>{ 
        window.scroll({top: 0, left: 0, behavior: 'smooth' })
        navigate(path);
    }

    var [openMenu,setOpenMenu] = useState(false);
    const handleOpenMenu=()=>
    {
      setOpenMenu(!openMenu);
    }

    return <>
    <div className=" bg-slate-800 w-full pt-5 pb-5 pl-2 pr-2 flex justify-between text-sm">
        <p className=" text-white">Logo</p>
        <div  className=" text-white ava_background rounded-full mt-auto mb-auto mr-3 cursor-pointer">
            
            {/*  outline outline-2 outline-white */}
            <div className="flex"> 

                <div className="mr-14 hover:bg-slate-800 hover:contrast-75 cursor-pointer bg-whiteYellow flex items-center">
                    <div onClick={()=>routeChange("/admin")} className=' pl-1 pr-1' >
                        Admin
                    </div>
                </div>

                <div className="mr-14"  onClick={handleOpenMenu}>
                    Menu
                    {openMenu ?
                    <div className='absolute w-40 bg-mainYellow right-0 mt-5 grid gap-y-1 grid-cols-1 p-2 mr-24 bg-slate-900'>
                      <div onClick={()=>routeChange("/profile")} className='hover:bg-slate-800 hover:contrast-75 cursor-pointer bg-whiteYellow pl-1 flex items-center text-[12px]'>Profile</div>
                      <div onClick={()=>routeChange("/products")} className='hover:bg-slate-800 hover:contrast-75 cursor-pointer bg-whiteYellow  pl-1 flex items-center text-[12px]'>Products</div>
                      <div onClick={()=>routeChange("/setting")} className='hover:bg-slate-800 hover:contrast-75 cursor-pointer bg-whiteYellow pl-1 flex items-center text-[12px]'>Settings</div>
                      <div onClick={()=>routeChange("/login")} className='hover:bg-slate-800 hover:contrast-75 cursor-pointer bg-whiteYellow pl-1 flex items-center text-[12px]'>Log In</div>
                    </div>
                    :""}
                </div>
                

                <div className="mr-14">
                    Orders
                </div>

                <div >
                    Basket
                </div>
            </div>
            
            
        </div>

    </div>

    <div className=" bg-slate-500 w-full h-6 flex flex-row-reverse text-sm">
        <div className=" text-white text-center mr-2 hover:bg-slate-400 w-14"> Item 1 </div>
        <div className=" text-white text-center mr-2 hover:bg-slate-400 w-14"> Item 2 </div>
        <div className=" text-white text-center mr-2 hover:bg-slate-400 w-14"> Item 3 </div>
        <div className=" text-white text-center mr-2 hover:bg-slate-400 w-14"> Item 4 </div>
    </div>

    <SideBar/>
    </>;
  }
  
  export default Header;
  