import { useNavigate } from "react-router-dom";
import search from "../../images/search.png"

const MusicHeader=()=>{
    var navigate = useNavigate();
    
    
    return(
      <div className="bg-cover  w-full "  >
            
        <div className="w-full h-9 grid grid-cols-12 bg-stone-950 text-white px-2 gap-2">
          <div className="bg-stone-950 rounded-md col-start-1  flex justify-center m-auto h-full w-full items-center cursor-pointer hover:translate-y-1 hover:bg-blue-600 font-medium text-sm select-none hover:scale-105  transition-all" onClick={()=>navigate("/products")}>Back To Site</div>
          <div className="col-start-3 col-span-3 flex justify-center py-1 relative my-auto">
            <input className=" bg-white rounded-full h-6 w-full text-black text-[12px] px-4 pr-8"/>
            <div className=" w-9 h-6 absolute mr-[-1.3px] cursor-pointer active:bg-blue-500   active:transition-none select-none right-0 rounded-r-[10px] flex flex-1 justify-center transition-all self-center m-auto">
              <img className="h-4  m-auto" src={search} />
            </div>
          </div>

          <div className="bg-stone-950 rounded-md col-start-9  flex justify-center m-auto h-full w-full items-center cursor-pointer hover:translate-y-1 hover:bg-blue-600 font-medium text-sm select-none hover:scale-105  transition-all" onClick={()=>navigate("createTrack")}>New Track</div>
          <div className="bg-stone-950 rounded-md col-start-10 flex justify-center m-auto h-full w-full items-center cursor-pointer hover:translate-y-1 hover:bg-blue-600 font-medium text-sm select-none hover:scale-105  transition-all" onClick={()=>navigate("createGenre")}>New Genre</div>
          <div className="bg-stone-950 rounded-md col-start-11 flex justify-center m-auto h-full w-full items-center cursor-pointer hover:translate-y-1 hover:bg-indigo-600 font-medium text-sm select-none hover:scale-105  transition-all">New Album</div>
          <div className="bg-stone-950 rounded-md col-start-12 flex justify-center m-auto h-full w-full items-center cursor-pointer hover:translate-y-1 hover:bg-indigo-600 font-medium text-sm select-none hover:scale-105  transition-all" onClick={()=>navigate("/music")}>Home</div>
        </div>
        
      </div>
    )
}

export default MusicHeader;