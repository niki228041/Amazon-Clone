
import img from "../images/user.png";
import close from "../images/cancel.png";
import classNames from "classnames";
import { useState } from "react";



const SideBar=()=>{
    const [isPressed,setIsPressed] = useState(false);

    
    <ul className="bg-gray-200 p-4">
      <li>Menu Item 1</li>
      <li>Menu Item 2</li>
      <li>Menu Item 3</li>
    </ul>

    var menuClass = classNames({
        btn: true,
        ' collapse ': isPressed,
        ' ': !isPressed
      });

    return <>
        

        <div className={menuClass + "fixed z-10 top-0 left-0 w-[85%] max-w-[380px] overflow-hidden bg-slate-300 h-full "} >
            <div className=" pl-10 pt-3 pb-3 text-[20px] font-bold flex bg-slate-900">
                <img src={img} className="h-8 mr-3"></img>
                <p className=" text-white">Hello, Login pls</p>
            </div>

            <div className=" mt-2 pr-4 pl-4 font-bold">

            </div>

            <div className="p-4">
                <span className="cursor-pointer">Best Sellers</span>
                <br/>
                <span className="cursor-pointer">New Releases</span>
                <br/>
                <span className="cursor-pointer">Movers and Something More</span>
                <br/>
                <span className="cursor-pointer">Best Sellers</span>
            </div>
            

            <div className="absolute ml-[85%] top-0 p-3 cursor-pointer">
                <img src={close} className="h-8" onClick={()=>{setIsPressed(!isPressed)}} ></img>
            </div>
        </div>

    </>
}
    
export default SideBar