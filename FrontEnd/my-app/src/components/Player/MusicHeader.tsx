import { useNavigate } from "react-router-dom";

const MusicHeader=()=>{
    var navigate = useNavigate();

    return(
        <div className="bg-cover  w-full"  >
            
        <div className="w-full h-8 grid grid-cols-12 bg-stone-950 text-white px-2 gap-2">
          <div className="bg-stone-950 rounded-md col-start-1  flex justify-center m-auto h-full w-full items-center cursor-pointer hover:translate-y-1 hover:bg-blue-600 font-medium text-sm select-none hover:scale-105  transition-all" onClick={()=>navigate("/products")}>Back To Site</div>
          <div className="bg-stone-950 rounded-md col-start-9  flex justify-center m-auto h-full w-full items-center cursor-pointer hover:translate-y-1 hover:bg-blue-600 font-medium text-sm select-none hover:scale-105  transition-all" onClick={()=>navigate("createTrack")}>New Track</div>
          <div className="bg-stone-950 rounded-md col-start-10 flex justify-center m-auto h-full w-full items-center cursor-pointer hover:translate-y-1 hover:bg-blue-600 font-medium text-sm select-none hover:scale-105  transition-all" onClick={()=>navigate("createGenre")}>New Genre</div>
          <div className="bg-stone-950 rounded-md col-start-11 flex justify-center m-auto h-full w-full items-center cursor-pointer hover:translate-y-1 hover:bg-indigo-600 font-medium text-sm select-none hover:scale-105  transition-all">New Album</div>
          <div className="bg-stone-950 rounded-md col-start-12 flex justify-center m-auto h-full w-full items-center cursor-pointer hover:translate-y-1 hover:bg-indigo-600 font-medium text-sm select-none hover:scale-105  transition-all" onClick={()=>navigate("/music")}>Home</div>
        </div>
        </div>
    )
}

export default MusicHeader;