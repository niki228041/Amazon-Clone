import "../index.css"

const Header=()=> {
    return <>
    <div className=" bg-slate-800 w-full pt-5 pb-5 pl-2 pr-2 flex justify-between text-sm">
        <p className=" text-white">Logo</p>
        <p className=" text-white">Menu</p>
    </div>
    <div className=" bg-slate-500 w-full h-6 flex flex-row-reverse text-sm">
        <div className=" text-white text-center mr-2 hover:bg-slate-400 w-14"> Item 1 </div>
        <div className=" text-white text-center mr-2 hover:bg-slate-400 w-14"> Item 2 </div>
        <div className=" text-white text-center mr-2 hover:bg-slate-400 w-14"> Item 3 </div>
        <div className=" text-white text-center mr-2 hover:bg-slate-400 w-14"> Item 4 </div>
    </div>
    </>;
  }
  
  export default Header;
  