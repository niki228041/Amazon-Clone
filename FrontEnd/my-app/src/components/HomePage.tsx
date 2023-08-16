import mainImg from "../images/main-img.svg"
import prev from "../images/prev.svg"
import "../css/HomePage.css"
import modaimg from './../images/moda.jpg';
import elecimg from './../images/elec.jpg';
import childimg from './../images/childrens.jpg';
import technicimg from './../images/technic.jpg';
import iphoneimg from './../images/iphone.jpg';
import mibandimg from './../images/miband.jpg';
import usbcimg from './../images/usbc.jpg';


import { url } from "inspector";

const HomePage = () => {

    return (
        <div style={{ height: "3000px" }}>
            <div className="first-section">
                <div className="image-div">
                    <div className="left-elements-image">
                        <h1 className="text-[#002A42] text-[40px]">Комп'ютери купуй та <br /> експерементуй</h1>
                        <span className="text-[13px]">"Від потужних ігрових систем до стильних і ультратонких ноутбуків – ми пропонуємо <br /> найсучасніші рішення для будь-яких потреб. Оберіть ідеальний комп'ютер за <br /> сьогоднішніми стандартами технологій та стилю вже сьогодні."</span>
                        <div className="forButton">
                            <button>Дізнатися більше</button>
                        </div>
                    </div>
                    <div className="right-elements-image">
                        <div className="circle-block"><span>40% Off</span></div>
                    </div>
                </div>
            </div>
            <div className="second-section">
                <div className="container-for-carousel">
                    <div className="prev-item">
                        <svg style={{ marginTop: "80px" }} width="66" height="66" viewBox="0 0 66 66" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M41.25 49.5L24.75 33L41.25 16.5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>


                    </div>
                    <div style={{ marginLeft: "50px", backgroundImage: `url(${elecimg})` }} className="card-main">
                        <div style={{ display: "flex", marginTop: "190px", height: "60px", width: "350px", background: "rgba(254, 249, 249, 0.95)" }}>
                            <a style={{ marginTop: "5px", marginLeft: "15px", fontSize: "30px" }}>Електроніка</a>
                            <a style={{ marginTop: "5px", marginLeft: "45px", fontSize: "30px", color: "rgba(255, 154, 2, 1)" }}>Купити</a>
                        </div>
                    </div>
                    <div style={{ backgroundImage: `url(${modaimg})` }} className="card-main">
                        <div style={{ display: "flex", marginTop: "190px", height: "60px", width: "350px", background: "rgba(254, 249, 249, 0.95)" }}>
                            <a style={{ marginTop: "5px", marginLeft: "15px", fontSize: "30px" }}>Мода</a>
                            <a style={{ marginTop: "5px", marginLeft: "130px", fontSize: "30px", color: "rgba(255, 154, 2, 1)" }}>Купити</a>
                        </div>
                    </div>
                    <div style={{ backgroundImage: `url(${technicimg})` }} className="card-main">
                        <div style={{ display: "flex", marginTop: "190px", height: "60px", width: "350px", background: "rgba(254, 249, 249, 0.95)" }}>
                            <a style={{ marginTop: "5px", marginLeft: "15px", fontSize: "30px" }}>Прилади</a>
                            <a style={{ marginTop: "5px", marginLeft: "90px", fontSize: "30px", color: "rgba(255, 154, 2, 1)" }}>Купити</a>
                        </div>
                    </div>
                    <div style={{ backgroundImage: `url(${childimg})` }} className="card-main">
                        <div style={{ display: "flex", marginTop: "190px", height: "60px", width: "350px", background: "rgba(254, 249, 249, 0.95)" }}>
                            <a style={{ marginTop: "5px", marginLeft: "15px", fontSize: "30px" }}>Дитячі речі</a>
                            <a style={{ marginTop: "5px", marginLeft: "55px", fontSize: "30px", color: "rgba(255, 154, 2, 1)" }}>Купити</a>
                        </div>
                    </div>
                    <div className="prev-item">
                        <svg style={{ marginTop: "80px" }} width="66" height="66" viewBox="0 0 66 66" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M24.75 49.5L41.25 33L24.75 16.5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>

                    </div>

                    {/* <div className="card-main">
                        <div>test123</div>
                    </div>
                    <div className="card-main">
                        <div>test123</div>
                    </div>
                    <div className="card-main">
                        <div>test123</div>
                    </div>
                    <div className="card-main">
                        <div>test123</div>
                    </div> */}
                </div>
            </div>
            <hr style={{ borderWidth: "1px", marginTop: "40px", width: "1700px", marginLeft: "110px" }} />
            <div style={{ display: "flex", marginTop: "50px", height: "360px", background: "white" }} >
                <svg style={{ marginLeft: "35px", marginTop: "100px" }} width="66" height="66" viewBox="0 0 66 66" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M40.3364 49.5L23.4019 33L40.3364 16.5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>

                <div style={{ marginLeft: "50px" }}>
                    <h1 style={{ fontSize: "40px" }}>ПРОПОЗИЦІЇ</h1>
                    <h1 style={{ fontSize: "40px", color: "#FF9A02" }}>ДНЯ</h1>
                    <span style={{ fontWeight: "400" }} className="text-[14px]">"Сьогоднішня пропозиція дня в нашому інтернет-магазині: <br /> найкраща можливість придбати якісний товар за  <br /> неймовірно вигідною ціною! Поспішайте пропозиція <br /> обмедженою часом та кількістю товару. "</span>
                    <div className="forButton">
                        <button>Дізнатися більше</button>
                    </div>
                </div>
                <div style={{ marginLeft: "200px", height: "350px", width: "270px", borderRadius: "10px", background: "#FFFFFF", boxShadow: " 0 4px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>
                    <img style={{ height: "220px", marginLeft: "50px", marginTop: "20px" }} src={iphoneimg}></img>
                    <a style={{ fontSize: "20px", marginLeft: "100px", marginTop: "10px" }}>800 грн</a>
                    <button style={{ borderRadius: "7px", color: "white", background: "#FF9A02", height: "50px", width: "200px", marginLeft: "35px", marginTop: "10px" }} type="submit">
                        Додати до кошика
                    </button>
                </div>
                <div style={{ marginLeft: "50px", height: "350px", width: "270px", borderRadius: "10px", background: "#FFFFFF", boxShadow: " 0 4px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>
                    <img style={{ height: "100px", marginLeft: "30px", marginTop: "40px", marginBottom: "100px" }} src={mibandimg}></img>
                    <a style={{ fontSize: "20px", marginLeft: "100px", marginTop: "10px" }}>800 грн</a>
                    <button style={{ borderRadius: "7px", color: "white", background: "#FF9A02", height: "50px", width: "200px", marginLeft: "35px", marginTop: "10px" }} type="submit">
                        Додати до кошика
                    </button>
                </div>
                <div style={{ marginLeft: "50px", height: "350px", width: "270px", borderRadius: "10px", background: "#FFFFFF", boxShadow: " 0 4px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>

                    <img style={{ height: "180px", marginLeft: "50px", marginTop: "20px", marginBottom: "40px" }} src={usbcimg}></img>
                    <a style={{ fontSize: "20px", marginLeft: "100px", marginTop: "100px" }}>800 грн</a>
                    <button style={{ borderRadius: "7px", color: "white", background: "#FF9A02", height: "50px", width: "200px", marginLeft: "35px", marginTop: "10px" }} type="submit">
                        Додати до кошика
                    </button>
                </div>
                <svg style={{ marginLeft: "170px", marginTop: "100px" }} width="68" height="66" viewBox="0 0 68 66" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M25.6636 49.5L42.5981 33L25.6636 16.5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>

            </div>
        </div>
    )

}



export default HomePage;