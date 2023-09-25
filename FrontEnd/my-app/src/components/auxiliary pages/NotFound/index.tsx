import { Link, useNavigate } from "react-router-dom";
import arrowLeft from './../../../images/arrow-left-not-found.svg'
import question from './../../../images/question-not-found.svg'

import aboutimag from '../../../images/About_us.jpg';
import { url } from "inspector";

const NotFound = () => {

    return (
        <div style={{ height: "800px " }} className="flex justify-between ml-[150px]  items-center mr-[250px]">

            <div className="flex flex-col font-['Inter']">
                <div className="flex text-center flex-col">
                    <span className="text-[#FF9A02] leading-[124px] text-[120px] font-extrabold">404</span>
                    <span className="text-[#FF9A02] text-[120px] font-extrabold">Не знайдено</span>
                </div>

                <div className="flex text-center flex-col mt-[45px]">
                    <span className="font-medium text-[16px] leading-[24px] text-[#697475]">Виникли проблеми з пошуком сторінки поверніться на головну <br /> сторінку, ми вже працюємо над цією проблемою</span>
                </div>

                <div className="flex text-center flex-col mt-[45px] items-center ">
                    <Link to={"/"}>
                        <button className="w-[368px] h-[43px] bg-[#102048] rounded-[4px] border-[#102048]">
                            <div className="flex text-center items-center justify-center">
                                <img src={arrowLeft} alt="arrowLeft" className="mr-[40px]" />
                                <span className="text-[white]">ГОЛОВНА</span>
                            </div>
                        </button>
                    </Link>
                </div>
            </div>

            <div style={{ backgroundImage: `url(${question})` }} className="h-[588px] w-[567px] bg-right right"> </div>


        </div>
    );
}

export default NotFound;