import { useNavigate } from "react-router-dom";
import search from "../../images/search.png"

import iconMenu from "../../images/iconMenu.png";

const MusicFooter=()=>{
    var navigate = useNavigate();
    
    
    return(
      <div className="bg-cover  w-full "  >
        <div className="w-full h-20 flex justify-center bg-grayForPlayerColor text-white px-2 gap-2">
            <span className=" self-end mb-4 text-sm">
                All rights reserved© 2023
            </span>
        </div>
        
      </div>
    )
}

export default MusicFooter;