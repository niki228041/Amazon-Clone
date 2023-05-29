
import img from "../images/user.png";

const SideBar=()=>{

    return <>
        <div className="fixed z-10 top-0 left-0 w-[85%] max-w-[380px] overflow-hidden bg-slate-300 h-full">
            <div className=" pl-10 pt-3 pb-3 text-[20px] font-bold flex bg-slate-900">
                <img src={img} className="h-8 mr-3"></img>
                <p className=" text-white">Hello, Login pls</p>
            </div>
            <div className=" mt-2 pr-4 pl-4 font-bold">

            </div>
            <p>Best Sellers</p>
            <p>New Releases</p>
            <p>Movers and Something More</p>
            <p>Best Sellers</p>
        </div>
    </>
}
    
export default SideBar