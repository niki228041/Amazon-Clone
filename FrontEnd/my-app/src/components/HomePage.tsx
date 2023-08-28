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
import example from './../images/example-pic.svg'
import arrowRight from './../images/main-arrow-right.svg'
import arrowLeft from './../images/main-arrow-left.svg'
import headphonesMain from './../images/headphones-main.svg'
import laptopExample from './../images/laptop-example.svg'

import { url } from "inspector";
import { right } from "@popperjs/core";

const HomePage = () => {

    return (
        <div style={{ height: "4500px" }}>
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
                </div>
            </div>

            <hr style={{ borderWidth: "1px", marginTop: "40px", width: "1700px", marginLeft: "110px" }} />

            <div style={{ display: "flex", marginTop: "50px", height: "360px", background: "#F7F7F7", marginBottom: "80px" }} >
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

            <div className="arrivals">
                <div className="arrivals-header flex justify-between">
                    <h2>Нові надходження</h2>
                    <span>Закінчується через : 08:13:48</span>
                </div>
                <div className="arrivals-main">
                    <div className="container-for-card">
                        <div className="arrivals-card">
                            <span>Bin Bakar Електроніка</span>
                            <h4>Samsung 40N5300 S..</h4>
                            <img src={example} />
                            <div className="price-container flex justify-between">
                                <span className="old-price">14 800 грн</span>
                                <span className="new-price">12 399 грн</span>
                            </div>
                            <button>Додати в кошик</button>
                        </div>
                        <div className="arrivals-card">
                            <span>Bin Bakar Електроніка</span>
                            <h4>Samsung Automatic..</h4>
                            <img src={example} />
                            <div className="price-container flex justify-between">
                                <span className="old-price">14 800 грн</span>
                                <span className="new-price">12 399 грн</span>
                            </div>
                            <button>Додати в кошик</button>
                        </div>
                        <div className="arrivals-card">
                            <span>Bin Bakar Електроніка</span>
                            <h4>Haier HSU-12HFMAC ..</h4>
                            <img src={example} />
                            <div className="price-container flex justify-between">
                                <span className="old-price">14 800 грн</span>
                                <span className="new-price">12 399 грн</span>
                            </div>
                            <button>Додати в кошик</button>
                        </div>
                        <div className="arrivals-card">
                            <span>Bin Bakar Електроніка</span>
                            <h4>Anex Roti Maker ..</h4>
                            <img src={example} />
                            <div className="price-container flex justify-between">
                                <span className="old-price">14 800 грн</span>
                                <span className="new-price">12 399 грн</span>
                            </div>
                            <button>Додати в кошик</button>
                        </div>
                        <div className="arrivals-card">
                            <span>Bin Bakar Електроніка</span>
                            <h4>Gree GS-12FITH..</h4>
                            <img src={example} />
                            <div className="price-container flex justify-between">
                                <span className="old-price">14 800 грн</span>
                                <span className="new-price">12 399 грн</span>
                            </div>
                            <button>Додати в кошик</button>
                        </div>
                        <div className="arrivals-card">
                            <span>Bin Bakar Електроніка</span>
                            <h4>Gree Air Conditioner..</h4>
                            <img src={example} />
                            <div className="price-container flex justify-between">
                                <span className="old-price">14 800 грн</span>
                                <span className="new-price">12 399 грн</span>
                            </div>
                            <button>Додати в кошик</button>
                        </div>
                        <div className="arrivals-card">
                            <span>Bin Bakar Електроніка</span>
                            <h4>Gree Air Conditioner..</h4>
                            <img src={example} />
                            <div className="price-container flex justify-between">
                                <span className="old-price">14 800 грн</span>
                                <span className="new-price">12 399 грн</span>
                            </div>
                            <button>Додати в кошик</button>
                        </div>
                        <div className="arrivals-card">
                            <span>Bin Bakar Електроніка</span>
                            <h4>Gree Air Conditioner..</h4>
                            <img src={example} />
                            <div className="price-container flex justify-between">
                                <span className="old-price">14 800 грн</span>
                                <span className="new-price">12 399 грн</span>
                            </div>
                            <button>Додати в кошик</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="our-products bg-[#F7F7F7]">
                <div className="our-products-header flex justify-between">
                    <h2 className="text-[#002A42]">Наші Товари</h2>
                    <div className="our-products-header-variants">
                        <h3 className="text-[#002A42]">Прості щомісячні платежі</h3>
                        <h3>розпродаж</h3>
                        <h3>Топ</h3>
                    </div>
                    <div className="our-products-header-arrows">
                        <img className="mr-7" src={arrowLeft} />
                        <img src={arrowRight} />
                    </div>
                </div>
                <div className="our-products-main">
                    <div className="our-products-main-special">
                        <div className="our-products-main-special-img">
                            <div>
                                <h2 className="text-[#FF9A02]">Спеціальна</h2>
                                <h2 className="second-span">пропозиція</h2>
                            </div>
                            <div className="our-products-right-circle">
                                <div className="circle-block"><span>Save 10%</span></div>
                            </div>
                        </div>
                        <div className="our-products-main-special-labels">
                            <span className="text-lgMain">Nintendo Switch Console</span>
                            <br />
                            <span className="text-xlMain pr-5">12 399 грн</span>
                            <span className="text-lgMain line-through">14 800 грн</span>
                            <br />
                            <span className="text-baseMain text-[#002A42] pr-10">Продано: 6</span>
                            <span className="text-baseMain text-[#002A42]">В наявності: 30</span>
                        </div>
                    </div>
                    <div className="container-main-cards">
                        <div className="first-container-main">
                            <div className="our-products-main-card">
                                <span>Bin Bakar Електроніка</span>
                                <h4>Gree Air Conditioner..</h4>
                                <img src={example} />
                                <div className="price-container flex justify-between">
                                    <span className="old-price">14 800 грн</span>
                                    <span className="new-price">12 399 грн</span>
                                </div>
                                <button>Додати в кошик</button>
                            </div>
                            <div className="our-products-main-card">
                                <span>Bin Bakar Електроніка</span>
                                <h4>Gree Air Conditioner..</h4>
                                <img src={example} />
                                <div className="price-container flex justify-between">
                                    <span className="old-price">14 800 грн</span>
                                    <span className="new-price">12 399 грн</span>
                                </div>
                                <button>Додати в кошик</button>
                            </div>
                            <div className="our-products-main-card">
                                <span>Bin Bakar Електроніка</span>
                                <h4>Gree Air Conditioner..</h4>
                                <img src={example} />
                                <div className="price-container flex justify-between">
                                    <span className="old-price">14 800 грн</span>
                                    <span className="new-price">12 399 грн</span>
                                </div>
                                <button>Додати в кошик</button>
                            </div>
                            <div className="our-products-main-card">
                                <span>Bin Bakar Електроніка</span>
                                <h4>Gree Air Conditioner..</h4>
                                <img src={example} />
                                <div className="price-container flex justify-between">
                                    <span className="old-price">14 800 грн</span>
                                    <span className="new-price">12 399 грн</span>
                                </div>
                                <button>Додати в кошик</button>
                            </div>
                            <div className="our-products-main-card">
                                <span>Bin Bakar Електроніка</span>
                                <h4>Gree Air Conditioner..</h4>
                                <img src={example} />
                                <div className="price-container flex justify-between">
                                    <span className="old-price">14 800 грн</span>
                                    <span className="new-price">12 399 грн</span>
                                </div>
                                <button>Додати в кошик</button>
                            </div>
                        </div>

                        <div className="second-container-main">
                            <div className="our-products-main-card">
                                <span>Bin Bakar Електроніка</span>
                                <h4>Gree Air Conditioner..</h4>
                                <img src={example} />
                                <div className="price-container flex justify-between">
                                    <span className="old-price">14 800 грн</span>
                                    <span className="new-price">12 399 грн</span>
                                </div>
                                <button>Додати в кошик</button>
                            </div>
                            <div className="our-products-main-card">
                                <span>Bin Bakar Електроніка</span>
                                <h4>Gree Air Conditioner..</h4>
                                <img src={example} />
                                <div className="price-container flex justify-between">
                                    <span className="old-price">14 800 грн</span>
                                    <span className="new-price">12 399 грн</span>
                                </div>
                                <button>Додати в кошик</button>
                            </div>
                            <div className="our-products-main-card">
                                <span>Bin Bakar Електроніка</span>
                                <h4>Gree Air Conditioner..</h4>
                                <img src={example} />
                                <div className="price-container flex justify-between">
                                    <span className="old-price">14 800 грн</span>
                                    <span className="new-price">12 399 грн</span>
                                </div>
                                <button>Додати в кошик</button>
                            </div>
                            <div className="our-products-main-card">
                                <span>Bin Bakar Електроніка</span>
                                <h4>Gree Air Conditioner..</h4>
                                <img src={example} />
                                <div className="price-container flex justify-between">
                                    <span className="old-price">14 800 грн</span>
                                    <span className="new-price">12 399 грн</span>
                                </div>
                                <button>Додати в кошик</button>
                            </div>
                            <div className="our-products-main-card">
                                <span>Bin Bakar Електроніка</span>
                                <h4>Gree Air Conditioner..</h4>
                                <img src={example} />
                                <div className="price-container flex justify-between">
                                    <span className="old-price">14 800 грн</span>
                                    <span className="new-price">12 399 грн</span>
                                </div>
                                <button>Додати в кошик</button>
                            </div>
                        </div>

                    </div>


                </div>
            </div>
            <div className="best-offers bg-[#F7F7F7]">
                <div className="best-offers-header flex justify-between mb-10">
                    <h2 className="text-[#002A42]">Найкращі пропозиції</h2>
                    <div className="best-offers-header-variants">
                        <h3 className="text-[#002A42]">Кухонна техніка</h3>
                        <h3>Аксесуари</h3>
                        <h3>ТБ та відео</h3>
                        <h3>Смартфони</h3>
                        <h3>Продукти</h3>
                    </div>
                    <div className="best-offers-header-arrows">
                        <img className="mr-7" src={arrowLeft} />
                        <img src={arrowRight} />
                    </div>
                </div>
                <div className="best-offers-main grid-rows-2 gap-5">
                    <div className="bg-white best-offers-main-element-border">
                        <div className="best-offers-main-element flex justify-between ">
                            <div>
                                <h4 className="text-[20px]">Nintendo Switch <br />Console</h4>
                                <span className="text-[22px] text-[#002A42]">12 399 грн</span>
                                <br />
                                <span className="text-[19px] text-[#828282] line-through">14 800 грн</span>
                                <div className="mt-5">
                                    <button className="">ЗНИЖКА 10%</button>
                                </div>
                            </div>
                            <div className="element-2">
                                <div className="special-offer">
                                    <span className="text-[#FF9A02] text-[24px]">Спеціальна</span>
                                    <span className="text-[24px]">пропозиція</span>
                                </div>
                                <div className="img-container">
                                    <img src={laptopExample} alt="laptop" />
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="row-span-2 best-offers-main-element-2">
                        <div className="best-offers-main-element-img">
                            <div>
                                <span className="text-[#FF9A02] text-[24px]">Спеціальна</span>
                                <br />
                                <span className="text-[24px]">пропозиція</span>

                            </div>
                            <div className="best-offers-right-circle">
                                <div className="offers-circle-block"><span>ЗНИЖКА <br /> 10%</span></div>
                            </div>
                        </div>
                        <div className="receipts-product-img-labels">
                            <span className="text-[22px]">Nintendo Switch Console</span>
                            <br />
                            <span className="text-[27px] text-[#002A42] pr-4">12 399 грн</span>
                            <span className="text-[19px] line-through text-[#828282]">14 800 грн</span>
                            <br />
                            <span className="text-[20px] text-[#002A42]" style={{ paddingRight: "53px" }}>Продано: 6</span>
                            <span className="text-[20px] text-[#002A42]">В наявності: 30</span>
                        </div>
                    </div>

                    <div className="bg-white best-offers-main-element-border">
                        <div className="best-offers-main-element-3 flex justify-between ">
                            <div>
                                <h4 className="text-[20px]">Nintendo Switch <br />Console</h4>
                                <span className="text-[22px] text-[#002A42]">12 399 грн</span>
                                <br />
                                <span className="text-[19px] text-[#828282] line-through">14 800 грн</span>
                                <div className=" mt-5">
                                    <button className="">Save <br /> 10%</button>
                                </div>
                            </div>
                            <div className="element-2">
                                <div className="special-offer">
                                    <span className="text-[#FF9A02] text-[24px]">Спеціальна</span>
                                    <span className="text-[24px]">пропозиція</span>
                                </div>
                                <div className="img-container">
                                    <img src={laptopExample} alt="laptop" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white best-offers-main-element-border">
                        <div className="best-offers-main-element-4 flex justify-between ">
                            <div className="special-offer">
                                <span className="text-[#FF9A02] text-[26px]">Спеціальна</span>
                                <span className="text-[26px]">пропозиція</span>
                                <div>
                                    <span className="text-[20px]">Nintendo Switch</ span>
                                    <div>
                                        <span className="text-[22px] text-[#002A42]">12 399 грн</span>
                                        <span className="text-[19px] text-[#828282] line-through">14 800 грн</span>

                                    </div>
                                    <div>
                                        <span className="text-[17px] text-[#002A42]">Продано: 6</span>
                                        <span className="text-[17px] text-[#002A42]">В наявності: 30</span>

                                    </div>
                                </div>
                            </div>
                            <div className="element-2">
                                <div className="best-offers-right-circle-4">
                                    <div className="offers-circle-block-4"><span>ЗНИЖКА <br /> 10%</span></div>
                                </div>
                                <div className="img-container-4">
                                    <img src={laptopExample} alt="laptop" />
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="bg-white best-offers-main-element-border">
                        <div className="best-offers-main-element-img-5">
                            <div>
                                <span className="text-[#FF9A02] text-[20px]">Спеціальна</span>
                                <br />
                                <span className="text-[20px]">пропозиція</span>

                            </div>
                            <div className="best-offers-right-circle">
                                <div className="offers-circle-block-5 "><span>ЗНИЖКА <br /> 10%</span></div>
                            </div>
                        </div>
                        <div className="receipts-product-img-labels">
                            <span className="text-[22px]">Nintendo Switch Console</span>
                            <br />
                            <span className="text-[27px] text-[#002A42] pr-4">12 399 грн</span>
                            <span className="text-[19px] line-through text-[#828282]">14 800 грн</span>
                            <br />
                            <span className="text-[20px] text-[#002A42]" style={{ paddingRight: "53px" }}>Продано: 6</span>
                            <span className="text-[20px] text-[#002A42]">В наявності: 30</span>
                        </div>
                    </div>



                </div>
            </div>

            <div className="winMart">

            </div>

            <div className="new-receipts">
                <div className="new-receipts-header">
                    <h1 className="text-[#FF9A02]">Нові</h1>
                    <h1 className="text-[#000000]">Надходження</h1>
                </div>
                <div className="new-receipts-main">

                    <div className="new-receipts-product">
                        <div className="new-receipts-product-card">
                            <div className="new-receipts-product-img">
                                <div className="new-reseipts-right-circle">
                                    <div className="receipts-circle-block"><span>Save <br /> 10%</span></div>
                                </div>
                            </div>
                            <div className="receipts-product-img-labels">
                                <span className="text-lgMain">Nintendo Switch Console</span>
                                <br />
                                <span className="text-xlBiggerMain text-[#002A42] pr-4">12 399 грн</span>
                                <span className="text-baseMain line-through text-[#828282]">14 800 грн</span>
                                <br />
                                <span className="text-baseMain text-[#002A42]" style={{ paddingRight: "53px" }}>Продано: 6</span>
                                <span className="text-baseMain text-[#002A42]">В наявності: 30</span>
                            </div>
                        </div>
                        <div className="new-receipts-product-card">
                            <div className="new-receipts-product-img">
                                <div className="new-reseipts-right-circle">
                                    <div className="receipts-circle-block"><span>Save <br /> 10%</span></div>
                                </div>
                            </div>
                            <div className="receipts-product-img-labels">
                                <span className="text-lgMain">Nintendo Switch Console</span>
                                <br />
                                <span className="text-xlBiggerMain text-[#002A42] pr-4">12 399 грн</span>
                                <span className="text-baseMain line-through text-[#828282]">14 800 грн</span>
                                <br />
                                <span className="text-baseMain text-[#002A42]" style={{ paddingRight: "53px" }}>Продано: 6</span>
                                <span className="text-baseMain text-[#002A42]">В наявності: 30</span>
                            </div>
                        </div>
                        <div className="new-receipts-product-card">
                            <div className="new-receipts-product-img">
                                <div className="new-reseipts-right-circle">
                                    <div className="receipts-circle-block"><span>Save <br /> 10%</span></div>
                                </div>
                            </div>
                            <div className="receipts-product-img-labels">
                                <span className="text-lgMain">Nintendo Switch Console</span>
                                <br />
                                <span className="text-xlBiggerMain text-[#002A42] pr-4">12 399 грн</span>
                                <span className="text-baseMain line-through text-[#828282]">14 800 грн</span>
                                <br />
                                <span className="text-baseMain text-[#002A42]" style={{ paddingRight: "53px" }}>Продано: 6</span>
                                <span className="text-baseMain text-[#002A42]">В наявності: 30</span>
                            </div>
                        </div>
                        <div className="new-receipts-product-card">
                            <div className="new-receipts-product-img">
                                <div className="new-reseipts-right-circle">
                                    <div className="receipts-circle-block"><span>Save <br /> 10%</span></div>
                                </div>
                            </div>
                            <div className="receipts-product-img-labels">
                                <span className="text-lgMain">Nintendo Switch Console</span>
                                <br />
                                <span className="text-xlBiggerMain text-[#002A42] pr-4">12 399 грн</span>
                                <span className="text-baseMain line-through text-[#828282]">14 800 грн</span>
                                <br />
                                <span className="text-baseMain text-[#002A42]" style={{ paddingRight: "53px" }}>Продано: 6</span>
                                <span className="text-baseMain text-[#002A42]">В наявності: 30</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="last-element bg-white">
                <div className="last-element-header">
                    <h1>Рекомендовані товари</h1>
                    <h1>Розпродаж</h1>
                    <h1>Популярні товари</h1>
                </div>
                <div className="last-element-main mt-10">
                    <div className="last-element-first-container">
                        <div className="last-element-card">
                            <div>
                                <img src={example} />
                            </div>
                            <div>
                                <span className="text-[12px]">Bin Bakar Електроніка</span>
                                <br />
                                <span className="text-[15px]">Samsung 40N5300 S..</span>
                                <br />
                                <span className="text-[13px] text-[#697475] line-through mr-2">14 800 грн.</span>
                                <span className="text-[15px] text[#002A42]">12 399 грн.</span>
                                <br />
                                <button className="text-[15px] text-[white]">Додати в кошик</button>
                            </div>
                        </div>
                        <div className="last-element-card">
                            <div>
                                <img src={example} />
                            </div>
                            <div>
                                <span className="text-[12px]">Bin Bakar Електроніка</span>
                                <br />
                                <span className="text-[15px]">Samsung 40N5300 S..</span>
                                <br />
                                <span className="text-[13px] text-[#697475] line-through mr-2">14 800 грн.</span>
                                <span className="text-[15px] text[#002A42]">12 399 грн.</span>
                                <br />
                                <button className="text-[15px] text-[white]">Додати в кошик</button>
                            </div>
                        </div>
                        <div className="last-element-card">
                            <div>
                                <img src={example} />
                            </div>
                            <div>
                                <span className="text-[12px]">Bin Bakar Електроніка</span>
                                <br />
                                <span className="text-[15px]">Samsung 40N5300 S..</span>
                                <br />
                                <span className="text-[13px] text-[#697475] line-through mr-2">14 800 грн.</span>
                                <span className="text-[15px] text[#002A42]">12 399 грн.</span>
                                <br />
                                <button className="text-[15px] text-[white]">Додати в кошик</button>
                            </div>
                        </div>
                        <div className="last-element-card">
                            <div>
                                <img src={example} />
                            </div>
                            <div>
                                <span className="text-[12px]">Bin Bakar Електроніка</span>
                                <br />
                                <span className="text-[15px]">Samsung 40N5300 S..</span>
                                <br />
                                <span className="text-[13px] text-[#697475] line-through mr-2">14 800 грн.</span>
                                <span className="text-[15px] text[#002A42]">12 399 грн.</span>
                                <br />
                                <button className="text-[15px] text-[white]">Додати в кошик</button>
                            </div>
                        </div>
                    </div>

                    <div className="last-element-second-container">
                        <div className="last-element-card">
                            <div>
                                <img src={example} />
                            </div>
                            <div>
                                <span className="text-[12px]">Bin Bakar Електроніка</span>
                                <br />
                                <span className="text-[15px]">Samsung 40N5300 S..</span>
                                <br />
                                <span className="text-[13px] text-[#697475] line-through mr-2">14 800 грн.</span>
                                <span className="text-[15px] text[#002A42]">12 399 грн.</span>
                                <br />
                                <button className="text-[15px] text-[white]">Додати в кошик</button>
                            </div>
                        </div>
                        <div className="last-element-card">
                            <div>
                                <img src={example} />
                            </div>
                            <div>
                                <span className="text-[12px]">Bin Bakar Електроніка</span>
                                <br />
                                <span className="text-[15px]">Samsung 40N5300 S..</span>
                                <br />
                                <span className="text-[13px] text-[#697475] line-through mr-2">14 800 грн.</span>
                                <span className="text-[15px] text[#002A42]">12 399 грн.</span>
                                <br />
                                <button className="text-[15px] text-[white]">Додати в кошик</button>
                            </div>
                        </div>
                        <div className="last-element-card">
                            <div>
                                <img src={example} />
                            </div>
                            <div>
                                <span className="text-[12px]">Bin Bakar Електроніка</span>
                                <br />
                                <span className="text-[15px]">Samsung 40N5300 S..</span>
                                <br />
                                <span className="text-[13px] text-[#697475] line-through mr-2">14 800 грн.</span>
                                <span className="text-[15px] text[#002A42]">12 399 грн.</span>
                                <br />
                                <button className="text-[15px] text-[white]">Додати в кошик</button>
                            </div>
                        </div>
                        <div className="last-element-card">
                            <div>
                                <img src={example} />
                            </div>
                            <div>
                                <span className="text-[12px]">Bin Bakar Електроніка</span>
                                <br />
                                <span className="text-[15px]">Samsung 40N5300 S..</span>
                                <br />
                                <span className="text-[13px] text-[#697475] line-through mr-2">14 800 грн.</span>
                                <span className="text-[15px] text[#002A42]">12 399 грн.</span>
                                <br />
                                <button className="text-[15px] text-[white]">Додати в кошик</button>
                            </div>
                        </div>
                    </div>

                    <div className="last-element-third-container">
                        <div className="last-element-card">
                            <div>
                                <img src={example} />
                            </div>
                            <div>
                                <span className="text-[12px]">Bin Bakar Електроніка</span>
                                <br />
                                <span className="text-[15px]">Samsung 40N5300 S..</span>
                                <br />
                                <span className="text-[13px] text-[#697475] line-through mr-2">14 800 грн.</span>
                                <span className="text-[15px] text[#002A42]">12 399 грн.</span>
                                <br />
                                <button className="text-[15px] text-[white]">Додати в кошик</button>
                            </div>
                        </div>
                        <div className="last-element-card">
                            <div>
                                <img src={example} />
                            </div>
                            <div>
                                <span className="text-[12px]">Bin Bakar Електроніка</span>
                                <br />
                                <span className="text-[15px]">Samsung 40N5300 S..</span>
                                <br />
                                <span className="text-[13px] text-[#697475] line-through mr-2">14 800 грн.</span>
                                <span className="text-[15px] text[#002A42]">12 399 грн.</span>
                                <br />
                                <button className="text-[15px] text-[white]">Додати в кошик</button>
                            </div>
                        </div>
                        <div className="last-element-card">
                            <div>
                                <img src={example} />
                            </div>
                            <div>
                                <span className="text-[12px]">Bin Bakar Електроніка</span>
                                <br />
                                <span className="text-[15px]">Samsung 40N5300 S..</span>
                                <br />
                                <span className="text-[13px] text-[#697475] line-through mr-2">14 800 грн.</span>
                                <span className="text-[15px] text[#002A42]">12 399 грн.</span>
                                <br />
                                <button className="text-[15px] text-[white]">Додати в кошик</button>
                            </div>
                        </div>
                        <div className="last-element-card">
                            <div>
                                <img src={example} />
                            </div>
                            <div>
                                <span className="text-[12px]">Bin Bakar Електроніка</span>
                                <br />
                                <span className="text-[15px]">Samsung 40N5300 S..</span>
                                <br />
                                <span className="text-[13px] text-[#697475] line-through mr-2">14 800 грн.</span>
                                <span className="text-[15px] text[#002A42]">12 399 грн.</span>
                                <br />
                                <button className="text-[15px] text-[white]">Додати в кошик</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}



export default HomePage;