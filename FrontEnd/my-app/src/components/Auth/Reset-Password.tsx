import { useParams } from "react-router-dom";
import { useState } from 'react'
import TestPage from '.././auxiliary pages/Sidebarauth';
import "./auth.css"
import IconButton from '@mui/material/IconButton';

import OutlinedInput from '@mui/material/OutlinedInput';

import InputAdornment from '@mui/material/InputAdornment';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { Link } from 'react-router-dom';
import logo_auth from '../../images/logo_auth.svg';


const ResetPasswordScreen = () => {
    const [modal, setModal] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const toggleModal = () => {
        setModal(!modal);
    };

    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    return (
        // <div className='overlogin'>
        //     <div className="leftside">

        //         <svg className="logosing" width="345" height="92" viewBox="0 0 345 92" fill="none" xmlns="http://www.w3.org/2000/svg">
        //             <path d="M84.4419 27.92H92.9379L104.65 62H96.5859L93.9459 54.368H83.3379L80.7459 62H72.6819L84.4419 27.92ZM92.6499 48.944L88.6659 35.84L84.5859 48.944H92.6499ZM108.006 62V27.92H115.878V55.088H132.39V62H108.006ZM136.084 62V27.92H143.956V55.088H160.468V62H136.084Z" fill="#FF9A02" />
        //             <path d="M203.378 62H195.698V47.84C195.698 46.208 195.394 45.008 194.786 44.24C194.178 43.472 193.394 43.088 192.434 43.088C191.41 43.088 190.402 43.504 189.41 44.336C188.418 45.168 187.714 46.24 187.298 47.552V62H179.618V47.84C179.618 46.176 179.314 44.976 178.706 44.24C178.098 43.472 177.314 43.088 176.354 43.088C175.362 43.088 174.37 43.504 173.378 44.336C172.386 45.168 171.666 46.24 171.218 47.552V62H163.538V36.8H170.45V41.024C171.378 39.52 172.626 38.368 174.194 37.568C175.794 36.736 177.65 36.32 179.762 36.32C181.842 36.32 183.442 36.816 184.562 37.808C185.682 38.768 186.402 39.904 186.722 41.216C187.682 39.648 188.946 38.448 190.514 37.616C192.114 36.752 193.906 36.32 195.89 36.32C197.49 36.32 198.786 36.624 199.778 37.232C200.77 37.808 201.522 38.576 202.034 39.536C202.546 40.496 202.898 41.536 203.09 42.656C203.282 43.744 203.378 44.816 203.378 45.872V62ZM206.814 54.464C206.814 52.8 207.278 51.344 208.206 50.096C209.134 48.848 210.414 47.872 212.046 47.168C213.678 46.432 215.55 46.064 217.662 46.064C218.686 46.064 219.694 46.16 220.686 46.352C221.678 46.512 222.542 46.752 223.278 47.072V45.968C223.278 44.592 222.862 43.536 222.03 42.8C221.198 42.064 219.934 41.696 218.238 41.696C216.83 41.696 215.502 41.936 214.254 42.416C213.038 42.896 211.742 43.584 210.366 44.48L208.062 39.584C209.726 38.496 211.454 37.68 213.246 37.136C215.07 36.592 216.99 36.32 219.006 36.32C222.782 36.32 225.71 37.232 227.79 39.056C229.902 40.848 230.958 43.456 230.958 46.88V53.456C230.958 54.224 231.07 54.768 231.294 55.088C231.55 55.376 231.982 55.552 232.59 55.616V62C231.95 62.128 231.342 62.224 230.766 62.288C230.222 62.352 229.742 62.384 229.326 62.384C227.886 62.384 226.782 62.096 226.014 61.52C225.278 60.944 224.814 60.16 224.622 59.168L224.478 58.064C223.358 59.504 222.014 60.608 220.446 61.376C218.91 62.112 217.294 62.48 215.598 62.48C213.934 62.48 212.43 62.128 211.086 61.424C209.774 60.72 208.734 59.76 207.966 58.544C207.198 57.328 206.814 55.968 206.814 54.464ZM222.078 55.424C222.43 55.136 222.718 54.816 222.942 54.464C223.166 54.112 223.278 53.776 223.278 53.456V51.2C222.638 50.944 221.918 50.752 221.118 50.624C220.35 50.464 219.63 50.384 218.958 50.384C217.55 50.384 216.382 50.704 215.454 51.344C214.526 51.952 214.062 52.768 214.062 53.792C214.062 54.368 214.222 54.896 214.542 55.376C214.862 55.856 215.294 56.24 215.838 56.528C216.414 56.816 217.086 56.96 217.854 56.96C218.622 56.96 219.39 56.816 220.158 56.528C220.926 56.24 221.566 55.872 222.078 55.424ZM252.507 43.376C250.651 43.376 248.971 43.68 247.467 44.288C245.963 44.864 244.875 45.728 244.203 46.88V62H236.523V36.8H243.579V41.888C244.443 40.192 245.563 38.864 246.939 37.904C248.315 36.944 249.755 36.448 251.259 36.416C251.611 36.416 251.867 36.416 252.027 36.416C252.219 36.416 252.379 36.432 252.507 36.464V43.376ZM272.062 60.656C271.358 60.944 270.574 61.232 269.71 61.52C268.878 61.808 267.998 62.032 267.07 62.192C266.142 62.384 265.23 62.48 264.334 62.48C263.054 62.48 261.87 62.272 260.782 61.856C259.726 61.408 258.878 60.688 258.238 59.696C257.63 58.704 257.326 57.392 257.326 55.76V42.608H254.11V36.8H257.326V28.784H265.006V36.8H270.142V42.608H265.006V53.12C265.006 53.952 265.214 54.56 265.63 54.944C266.046 55.296 266.574 55.472 267.214 55.472C267.758 55.472 268.334 55.376 268.942 55.184C269.582 54.992 270.126 54.784 270.574 54.56L272.062 60.656Z" fill="#666666" />
        //         </svg>
        //         <div className="resopass" >
        //             <a style={{ color: "rgb(109, 104, 104)" }}>
        //                 Зміна паролю
        //             </a>
        //         </div>
        //         <div className="createpass" >
        //             <a style={{ color: "rgb(109, 104, 104)" }}>
        //                 Створіть новий пароль і підтвердіть його
        //             </a>
        //         </div>
        //         <div style={{ display: "flex", flexWrap: "wrap", height: "70px" }}>

        //             <OutlinedInput className='passinput'
        //                 placeholder='Новий пароль'

        //                 id="password"
        //                 name="password"
        //                 type={showPassword ? 'text' : 'password'}
        //                 autoComplete="current-password"
        //                 required
        //                 // id="outlined-adornment-password"
        //                 // 
        //                 endAdornment={
        //                     <InputAdornment position="end">
        //                         <IconButton
        //                             aria-label="toggle password visibility"
        //                             onClick={handleClickShowPassword}
        //                             onMouseDown={handleMouseDownPassword}
        //                             edge="end"
        //                         >
        //                             {showPassword ? <VisibilityOff /> : <Visibility />}
        //                         </IconButton>
        //                     </InputAdornment>
        //                 }

        //             />



        //             <OutlinedInput className='passinput'
        //                 placeholder='Підтвердить пароль'

        //                 id="password"
        //                 name="password"
        //                 type={showPassword ? 'text' : 'password'}
        //                 autoComplete="current-password"
        //                 required
        //                 // id="outlined-adornment-password"
        //                 // 
        //                 endAdornment={
        //                     <InputAdornment position="end">
        //                         <IconButton
        //                             aria-label="toggle password visibility"
        //                             onClick={handleClickShowPassword}
        //                             onMouseDown={handleMouseDownPassword}
        //                             edge="end"
        //                         >
        //                             {showPassword ? <VisibilityOff /> : <Visibility />}
        //                         </IconButton>
        //                     </InputAdornment>
        //                 }

        //             />




        //         </div>


        //         <div style={{ marginTop: "130px" }}>




        //             {/* style={{ width:"800px",display: "flex", marginLeft: "280" }} */}

        //                 <button style={{ borderRadius: "7px", color: "white", background: "#FF9A02", height: "50px",  marginTop: "30px" }} type="submit" onClick={toggleModal} className="submitbut btn-modal">
        //                     Зберегти пароль
        //                 </button>



        //         </div>

        //     </div>
        //     <TestPage ></TestPage>
        //     {modal && (
        //         <div className="modal">
        //             <div onClick={toggleModal} className="overlay"></div>
        //             <div className="modal-content">
        //                 <h2 style={{ marginLeft: "110px", fontSize: "40px", fontWeight: "500", color: "rgb(109, 104, 104)" }}>Ваш пароль
        //                 </h2>
        //                 <h2 style={{ marginLeft: "70px", fontSize: "40px", fontWeight: "500", color: "rgb(109, 104, 104)" }}>успішно змінено
        //                 </h2>
        //                 <div>
        //                     <svg style={{marginLeft:"170px",marginTop:"50px"}} width="126" height="126" viewBox="0 0 126 126" fill="none" xmlns="http://www.w3.org/2000/svg">
        //                         <g clip-path="url(#clip0_1_3169)">
        //                             <path d="M63.3815 125.053C97.8775 125.053 125.842 97.0881 125.842 62.5921C125.842 28.0961 97.8775 0.131592 63.3815 0.131592C28.8855 0.131592 0.921021 28.0961 0.921021 62.5921C0.921021 97.0881 28.8855 125.053 63.3815 125.053Z" fill="#3DB39E" />
        //                             <path d="M122.775 43.2569C121.006 37.8191 118.518 32.7098 115.414 28.0415L60.7394 84.988L60.8494 91.3253L63.4302 91.309L122.775 43.2569Z" fill="#37A18E" />
        //                             <path d="M125.937 24.7186L114.799 13.7143C113.279 12.2115 110.813 12.2115 109.293 13.7143L61.6814 62.7558L41.1493 42.4686C39.6266 40.9658 37.1631 40.9658 35.6416 42.4686L25.7691 52.2237C24.2488 53.7252 24.2488 56.1612 25.7691 57.6627L58.722 90.2184C59.6002 91.0866 60.7907 91.4364 61.935 91.3015C63.0792 91.4351 64.2697 91.0866 65.1479 90.2184L125.937 30.1589C127.457 28.6561 127.457 26.2214 125.937 24.7186Z" fill="#F8F8F8" />
        //                             <path d="M65.148 90.2183L125.937 30.1588C127.457 28.656 127.457 26.2213 125.937 24.7185L124.119 22.9221L61.5877 84.427L27.1495 50.8582L25.7703 52.2224C24.2501 53.7239 24.2501 56.1599 25.7703 57.6614L58.722 90.2183C59.6002 91.0865 60.7907 91.4363 61.935 91.3014C63.0793 91.4363 64.2698 91.0878 65.148 90.2183Z" fill="#EBEBEB" />
        //                         </g>
        //                         <defs>
        //                             <clipPath id="clip0_1_3169">
        //                                 <rect width="124.921" height="124.921" fill="white" transform="translate(0.921021 0.131592)" />
        //                             </clipPath>
        //                         </defs>
        //                     </svg>


        //                 </div>
        //                 <div style={{ marginLeft: "40px", marginBottom: "30px" }}>
        //                     <button
        //                         style={{ borderRadius: "7px", color: "white", background: "#FF9A02", height: "60px", width: "400px", marginTop: "30px" }}
        //                         type="submit"

        //                     >
        //                         Увійти
        //                     </button>
        //                 </div>

        //             </div>
        //         </div>
        //     )}


        // </div>


        <form>
            <div className="w-full grid grid-cols-2 h-full fixed ">
                <div className="left p-2 bg-litleYellow ">
                    <div className=" leftsd w-1/2 p-2 mx-auto">
                        <div className=" flex justify-center mt-10">
                            <img src={logo_auth} />
                        </div>

                        <div className=" flex flex-col justify-center text-grayColorForHeader mt-28">
                            <p className="flex self-center text-[40px] font-bold"> Зміна паролю</p>

                            <p className=" mt-4  flex self-center text-[17px] font-bold"> Створіть новий пароль і підтвердіть його</p>
                        </div>

                        <div className="flex flex-col justify-center w-6/6 mt-4 mx-auto">
                            <input id="password" name="password" type="password" className=" w-full border outline-0 rounded-lg mt-2 py-3 border-gray-400/90 px-4 mx-auto text-sm placeholder-veryYellowColor" placeholder="Новий пароль" />
                            {/* {formik.errors.password ? <div className=' text-red-500 text-sm font-semibold mt-1'>{formik.errors.password}</div> : null} */}
                            <input id="password" name="password" type="password" className=" w-full border outline-0 rounded-lg mt-2 py-3 border-gray-400/90 px-4 mx-auto text-sm placeholder-veryYellowColor" placeholder="Підтвердити пароль" />
                            {/* {formik.errors.password ? <div className=' text-red-500 text-sm font-semibold mt-1'>{formik.errors.password}</div> : null} */}


                        </div>

                        {/* <div className="flex justify-end w-6/6 mx-auto mt-1">
                        <div className="">
                            <span className=" mx-auto flex whitespace-nowrap  text-sm text-mainYellowColor cursor-pointer  hover:scale-105 transition-all">Забули пароль?</span>
                        </div>
                    </div> */}

                        <div className="w-6/6 mx-auto mt-10 ">
                            <button className="text-white text-[22px] py-2 bg-mainYellowColor w-full rounded-lg font-semibold">Зберегти пароль</button>

                        </div>


                        <div className="flex justify-center w-5/6 mx-auto mt-1">
                            {/* {showServerErrorLogin ? <div className=' text-red-500 font-semibold text-sm'>{showServerErrorLogin}</div> : null} */}
                        </div>

                        {/* <div className="flex justify-center w-5/6 mx-auto mt-4">
                        <Link to="/registration" className="">
                            <span className="flex whitespace-nowrap text-sm text-mainYellowColor cursor-pointer hover:scale-105 transition-all ">або створити обліковий запис</span>
                        </Link>
                    </div> */}

                    </div>
                </div>

                <div className="rig bg-mainYellowColor">
                    <div className=" w-4/6 mx-auto ">
                        <div className="w-4/6 text-darkBlueColor text-[20px] mt-20">
                            <span>
                                Зручний та широкий вибір товарів, що доставляє радість прямо до вашого дому — наша мета!
                            </span>
                        </div>

                    </div>

                    <div className="flex justify-end mt-10 h-full">
                        <div className=" bg-black border-slate-200 border-l-4 border-t-4  pt-10 pl-10 w-11/12 rounded-tl-[40px]">
                            <div className=" bg-white h-full rounded-tl-xl">

                            </div>
                        </div>
                    </div>


                </div>
            </div>

        </form>
    );
}

export default ResetPasswordScreen;