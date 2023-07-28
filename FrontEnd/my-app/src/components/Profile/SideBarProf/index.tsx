import React, { useRef,useState } from 'react';
import "../index.css";
import { Link } from 'react-router-dom';


const ProfileCategory: React.FC = () => {
    // const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
    
  
    // const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    //   const file = event.target.files?.[0];
  
    //   if (file) {
    //     const reader = new FileReader();
    //     reader.onloadend = () => {
    //       setProfilePhoto(reader.result as string);
    //     };
    //     reader.readAsDataURL(file);
    //   }
    // };
  
  return (
    <div className="sidebar">
     <div className="overlisttdiv flex flex-col py-8 px-4 text-gray-100">
        <div className="flex items-center mb-8">
         <Link to="/profile">
         <span className="text-xl font-bold">Account</span>
         </Link>
          
        </div>
        <ul >
          <Link to="/proforder">
          <li className="lisidebar" >
            <div className="listdiv"></div>
            <span className="listspan">Orders</span>
          </li>
          </Link>
          <Link to="/payment">
          <li className="lisidebar" >
          <div className="listdiv"></div>
            <span className="listspan">Payment</span>
          </li>
          </Link>
          <Link to="/editprofile"> 
          <li className="lisidebar">
            <div className="listdiv"></div>
            <span className="listspan">Edit Profile</span>
          </li>
          </Link>
          <Link to="/address">
          <li className="lisidebar">
            <div className="listdiv"></div>
            <span className="listspan">Shipping Address</span>
          </li>
          </Link>
          
          
         
        </ul>
      </div>
      
    </div>
    
  );
};

export default ProfileCategory;

//  <div className="bg-amber-600 h-52 w-3/5 rounded mt-5 mb-5 ml-5 ">
    
// </div> 
