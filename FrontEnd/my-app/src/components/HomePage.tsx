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
import arrowRightHomePage from './../images/arrowRightHomePage.svg'
import arrowLeft from './../images/main-arrow-left.svg'
import headphonesMain from './../images/headphones-main.svg'
import laptopExample from './../images/laptop-example.svg'
import winMart from './../images/winMart.svg'
import foodExample from './../images/food-example.svg'
import topMainImage from './../images/topMainImage.svg'
import { v4 as uuidv4 } from 'uuid';
import { getRecomendedProducts } from './InteractionWithProducts/OneProduct'
import { url } from "inspector";
import { right } from "@popperjs/core";
import classNames from 'classnames';
import { Component, useEffect, useRef, useState } from "react";
import { ChangeOrderCount, OneProductVM, Order, Product } from "./types";
import { apiProductSlice, useGetProductByIdQuery, useGetProductsQuery } from "../features/user/apiProductSlice";
import axios from "axios";
import { GetCurrency } from "../api/jwtDecodeToken";
import { useAppSelector } from "../app/hooks";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { Category } from "./Admin/types";
import { useGetCategoriesQuery } from "../features/user/apiCategorySlice";
import { useDispatch } from "react-redux";
import { addOrder, turnWasAddedToFalse, updateOrder } from "../features/user/ordersStateSlice";

const HomePage = () => {
    const loader = () => {
        return (
            <div className='m-auto flex self-center justify-center '>
                <Oval
                    height={80}
                    width={80}
                    color="#46424f"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel='oval-loading'
                    secondaryColor="#424a4f"
                    strokeWidth={2}
                    strokeWidthSecondary={2} />
            </div>

        )
    }
    /////////
    const [selectedCategory, setSelectedCategory] = useState('Bin Bakar Електроніка');
    const handleCategoryClick = (category: any) => {
        setSelectedCategory(category);
    };

    const [selectedCategory2, setSelectedCategory2] = useState('Bin Bakar Електроніка');
    const handleCategoryClick2 = (category: any) => {
        setSelectedCategory2(category);
    };

    const [selectedCategory3, setSelectedCategory3] = useState('Bin Bakar Електроніка');
    const handleCategoryClick3 = (category: any) => {
        setSelectedCategory3(category);
    };
    var [products, setProducts] = useState<Product[]>([]);
    const orders = useAppSelector((state) => state.orders);
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { data, isSuccess }: { data?: { payload: OneProductVM }, isSuccess: boolean } = useGetProductByIdQuery({ Id: params.productId });
    var request: getRecomendedProducts = { limit: 20, categoryId: 0 };
    const [getRecomendedProducts, { }] = apiProductSlice.useGetProductWithLimitByCategoryIdMutation();

    useEffect(() => {
        if (products?.length <= 0) {
            getRecomendedProducts(request).then((res: any) => {
                console.log("My here 3", res.data?.payload);
                setProducts(res.data?.payload);
            })
        }
    }, [])



    useEffect(() => {
        console.log(products?.length / 4);
    }, [products])
    /////////

    const handleAddNewOrder = (productId: string) => {
        const product = productsWithDiscounts.find((product) => product.id === productId);
        console.log("product id:", productId);

        if (product) {
            const existingOrder = orders.orders.find((order) => order.product_id === productId);

            if (!existingOrder) {
                const newOrder = {
                    id: uuidv4(),
                    name: product.name,
                    product_id: productId,
                    price: product.price,
                    count: 1,
                    discount: product.discount,
                };
                dispatch(addOrder(newOrder));
            } else {
                const index = orders.orders.findIndex((order) => order.product_id === productId);
                if (index !== -1 && existingOrder.count < 5) {
                    const updatedOrder = {
                        ...existingOrder,
                        count: existingOrder.count + 1,
                    };

                    dispatch(updateOrder({ index, count: updatedOrder.count }));
                }
            }

            setTimeout(() => {
                dispatch(turnWasAddedToFalse());
              }, 2000);
        }
    };



    // const { data: products }: { data?: { payload: Product[] } } = useGetProductsQuery()
    const { data: categories }: { data?: { payload: Category[] } } = useGetCategoriesQuery()


    // console.log("Here:", products);
    console.log("Categories: ", categories?.payload);


    var currency = useAppSelector((state) => state.currency.currency);

    var [countOfSmallIconDeals, setCountOfSmallIcon] = useState(10);
    var [currentSmallIcon, setCurrentSmallIcon] = useState(0);
    var [currentSmallIcon2, setCurrentSmallIcon2] = useState(0);

    var [smallIconOffset, setSmallIconOffset] = useState(currentSmallIcon * 220 * 5);
    var [smallIconOffset2, setSmallIconOffset2] = useState(currentSmallIcon2 * 220 * 5);

    const productsWithDiscounts = products?.map((product: any) => {
        const discountPercentageString = product.price; // 14 800 грн

        const discountPercentage = discountPercentageString - (discountPercentageString * (product.discount / 100));

        // Видалення цифр після , і розділення на тисячі
        const formattedPrice = Math.floor(discountPercentage).toLocaleString('uk-UA', { style: 'currency', currency: 'UAH', minimumFractionDigits: 0 });
        const formattedPriceString = Math.floor(discountPercentageString).toLocaleString('uk-UA', { style: 'currency', currency: 'UAH', minimumFractionDigits: 0 });

        return { ...product, discountPercentage: formattedPrice, discountPercentageString: formattedPriceString };
    });

    return (
        <div >
            <div className="first-section bg-no-repeat" style={{ backgroundImage: `url(${topMainImage})`, backgroundPosition: 'right' }}>
                <div className="image-div">
                    <div className="left-elements-image">
                        <h1 className="text-[#002A42] text-[40px] font-normal leading-[37px]">Комп'ютери купуй та <br /> експерементуй</h1>
                        <span className="text-[13px]">«Від потужних ігрових систем до стильних і ультратонких ноутбуків – ми пропонуємо <br /> найсучасніші рішення для будь-яких потреб. Оберіть ідеальний комп'ютер за <br /> сьогоднішніми стандартами технологій та стилю вже сьогодні.»</span>
                        <div className="forButton">
                            <button>Дивитись більше</button>
                        </div>
                    </div>
                    <div className="right-elements-image">
                        <div className="circle-block"><span>40% Off</span></div>
                    </div>
                </div>
            </div>

            <div className="topCategory font-['Inter'] overflow-x-hidden flex relative h-[359px] w-full px-20">
                <div className='overflow-x-hidden flex relative h-[359px] w-full px-4'>
                    <div className="flex  absolute self-center transition-all duration-500" style={{ transform: `translateX(-${smallIconOffset}px)` }}>
                        <div className="flex flex-row gap-x-[30px] shrink-0 absolute justify-center self-center transition-all duration-500" style={{ transform: `translateX(-${smallIconOffset}px)` }}>
                            {categories?.payload.slice(63, 80).map((category: any) => (
                                <div className="w-[272px] h-[199px] ">
                                    <div className="w-[272px] h-[199px] flex" style={{ backgroundImage: `url(${category.images_})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                                        <div className="bg-[#FEF9F9F2] opacity-95 justify-end flex flex-row justify-between items-center p-[15px] py-[15px] w-[272px] h-[49px] border" style={{ marginTop: 'auto', marginBottom: '15px' }}>
                                            <div>
                                                <span className="text-[#000000] text-[20px]">{category.name}</span>
                                            </div>
                                            <div>
                                                <Link to={'/todaysDeals'}>
                                                    <a className="text-[#FF9A02] text-[21px] cursor-pointer">Купити</a>
                                                </Link>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>


                    </div>
                </div>


                <div onClick={() => {


                    if (currentSmallIcon > 0) {
                        setCurrentSmallIcon(currentSmallIcon - 1);
                        setSmallIconOffset(((currentSmallIcon - 1) * 75 * 2));
                    }

                    if (currentSmallIcon == 1) {
                        setSmallIconOffset(0);
                    }




                }} className='left-0 self-center ml-5 rounded-lg h-12 w-12 absolute m-auto flex justify-center hover:scale-110 active:scale-90 transition-all duration-100'>
                    <img className=' rotate-180 self-center h-6' src={arrowRightHomePage} />
                </div>
                <div onClick={() => {


                    if (currentSmallIcon <= countOfSmallIconDeals) {
                        setCurrentSmallIcon(currentSmallIcon + 1);
                        setSmallIconOffset(((currentSmallIcon + 1) * 75 * 2));
                        console.log(((currentSmallIcon) * 75 * 2));
                        console.log((currentSmallIcon));
                    }




                }} className=' right-0 self-center mr-5 rounded-lg h-12 w-12 absolute m-auto flex justify-center hover:scale-110 active:scale-90 transition-all duration-100'>
                    <img className=' self-center h-6' src={arrowRightHomePage} />
                </div>
            </div>
            <hr style={{ borderWidth: "1px", marginTop: "40px", width: "1700px", marginLeft: "110px" }} />

            <div className=" font-['Inter'] overflow-x-hidden flex relative h-[359px] w-full px-20">
                <div className='overflow-x-hidden flex relative h-[359px] w-full px-4'>
                    <div className="flex  absolute self-center transition-all duration-500" style={{ transform: `translateX(-${smallIconOffset2}px)` }}>
                        <div className="flex flex-row gap-x-[190px] shrink-0">
                            <div className="block mx-auto relative">
                                <div>
                                    <span className="text-[#000000] text-[33px] leading-[38px]">ПРОПОЗИЦІЇ</span>
                                    <br />
                                    <span className="text-[#FF9A02] text-[33px]">ДНЯ</span>
                                </div>
                                <div className="leading-[14px]">
                                    <span className=" text-[12px]">«Сьогоднішня пропозиція дня в нашому інтернет-магазині: </span>
                                    <br />
                                    <span className=" text-[12px]">найкраща можливість придбати якісний товар за неймовірно </span>
                                    <br />
                                    <span className=" text-[12px]">вигідною ціною! Поспішайте, пропозиція обмежена часом і </span>
                                    <br />
                                    <span className=" text-[12px]">кількістю товару».</span>
                                </div>
                                <div className="mt-[40px]">
                                    <button className="bg-[#FF9A02] w-[152px] h-[40px] rounded-[5px] text-[12px] text-white">ДИВИТИСЬ БІЛЬШЕ</button>
                                </div>
                            </div>
                            {productsWithDiscounts?.slice(0, 3).map((product: any) => (
                                <div className="w-[231px] h-[256px] bg-white rounded-lg shadow-md px-[15px] pt-[15px] pb-[10px] flex flex-col mx-auto my-auto last:mr-[165px]">
                                    <div className="bg-[length:196px_169px] h-full bg-no-repeat" style={{ backgroundImage: `url(${product.image})` }}></div>
                                    <div className="flex flex-col items-center ml-auto leading-[17px]">
                                        <a className="text-[15px] text-[#002A42] cursor-pointer" onClick={() => { handleAddNewOrder(product?.id) }}>Додати в кошик</a>
                                        <span className="text-[15px]">{product.discountPercentage}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-row gap-x-[190px] shrink-0">
                            <div className="block mx-auto relative">
                                <div>
                                    <span className="text-[#000000] text-[33px] leading-[38px]">СЬОГОДНІШНІ</span>
                                    <br />
                                    <span className="text-[#FF9A02] text-[33px]">ПРОПОЗИЦІЇ</span>
                                </div>
                                <div className="leading-[14px]">
                                    <span className=" text-[12px]">«Сьогоднішні пропозиції в нашому інтернет-магазині: </span>
                                    <br />
                                    <span className=" text-[12px]">найкраща можливість придбати якісний товар за неймовірно </span>
                                    <br />
                                    <span className=" text-[12px]">вигідною ціною! Поспішайте, пропозиція обмежена часом і </span>
                                    <br />
                                    <span className=" text-[12px]">кількістю товару».</span>
                                </div>
                                <div className="mt-[40px]">
                                    <button className="bg-[#FF9A02] w-[152px] h-[40px] rounded-[5px] text-[12px] text-white">ДИВИТИСЬ БІЛЬШЕ</button>
                                </div>
                            </div>
                            {/* FIX TO 3, 6 */}
                            {productsWithDiscounts?.slice(3, 6).map((product: any) => (
                                <div className="w-[231px] h-[256px] bg-white rounded-lg shadow-md px-[15px] pt-[15px] pb-[10px] flex flex-col mx-auto my-auto ">
                                    <div className="bg-[length:196px_169px] h-full bg-no-repeat" style={{ backgroundImage: `url(${product.image})` }}></div>
                                    <div className="flex flex-col items-center ml-auto leading-[17px]">
                                        <a className="text-[15px] text-[#002A42] cursor-pointer" onClick={() => { handleAddNewOrder(product?.id) }}>Додати в кошик</a>
                                        <span className="text-[15px]">{product.discountPercentage}</span>
                                    </div>
                                </div>
                            ))}
                        </div>


                    </div>
                </div>


                <div onClick={() => {


                    if (currentSmallIcon2 > 0) {
                        setCurrentSmallIcon2(currentSmallIcon2 - 7);
                        setSmallIconOffset2(((currentSmallIcon2 - 7) * 127 * 2));
                    }

                    if (currentSmallIcon2 == 1) {
                        setSmallIconOffset2(0);
                    }



                }} className='left-0 self-center ml-5 rounded-lg h-12 w-12 absolute m-auto flex justify-center hover:scale-110 active:scale-90 transition-all duration-100'>
                    <img className=' rotate-180 self-center h-[33px]' src={arrowRightHomePage} />
                </div>
                <div onClick={() => {

                    if (currentSmallIcon2 <= countOfSmallIconDeals) {
                        setCurrentSmallIcon2(currentSmallIcon2 + 7);
                        setSmallIconOffset2(((currentSmallIcon2 + 7) * 127 * 2));
                        console.log(((currentSmallIcon2) * 120 * 2));
                        console.log((currentSmallIcon2));

                    }

                }} className=' right-0 self-center mr-5 rounded-lg h-12 w-12 absolute m-auto flex justify-center hover:scale-110 active:scale-90 transition-all duration-100'>
                    <img className=' self-center h-[33px]' src={arrowRightHomePage} />
                </div>
            </div>

            <div className="arrivals">
                <div className="arrivals-header flex justify-between">
                    <h2 className="mt-0 mb-0 font-normal">Нові надходження</h2>
                    <span>Закінчується через : 08:13:48</span>
                </div>
                <div className="arrivals-main">
                    <div className="container-for-card">
                        {productsWithDiscounts?.slice(0, 8).map((product: any) => (
                            <div className="arrivals-card" key={product.id}>
                                <Link to={`/product/${product.id}`}>
                                    <span className="leading-[32px] text-[12px]">{product.category}</span>
                                    <h4 className="mt-0 mb-0 font-normal whitespace-nowrap overflow-hidden text-ellipsis block">{product.name}</h4>
                                    <img className="mt-[10px] mb-[10px]" src={product.image} />
                                    <div className="price-container flex justify-between">
                                        <span className="old-price whitespace-nowrap ">{product.discountPercentageString}</span>
                                        <span className="new-price whitespace-nowrap">{product.discountPercentage}</span>
                                    </div>

                                </Link>

                                <button onClick={() => { handleAddNewOrder(product?.id) }} className='rounded'>
                                    Додати в кошик
                                </button>
                            </div>
                        ))}

                    </div>
                </div>
            </div>

            <div className="our-products bg-[#F7F7F7]">
                <div className="our-products-header flex justify-between">
                    <h2 className="text-[#002A42] mt-0 mb-0 font-normal">Наші Товари</h2>
                    <div className="our-products-header-variants">
                        <h3
                            className={`text-[#002A42] mt-0 mb-0 font-normal ${selectedCategory === "Bin Bakar Електроніка" ? "active" : ""
                                }`}
                            onClick={() => {
                                handleCategoryClick("Bin Bakar Електроніка");
                                console.log("Select category 1::", selectedCategory);
                            }}
                        >
                            Прості щомісячні платежі
                        </h3>
                        <h3
                            className={`mt-0 mb-0 font-normal text-[black] ${selectedCategory === "Електроніка" ? "active" : ""
                                }`}
                            onClick={() => {
                                handleCategoryClick("Електроніка");
                                console.log("Select category 8::", selectedCategory);
                            }}
                        >
                            розпродаж
                        </h3>
                        <h3
                            className={`mt-0 mb-0 font-normal text-[black] ${selectedCategory === "Естамп" ? "active" : ""
                                }`}
                            onClick={() => {
                                handleCategoryClick("Відеопроектори");
                                console.log("Select category 26::", selectedCategory);
                            }}
                        >
                            Топ
                        </h3>
                    </div>
                    <div className="our-products-header-arrows">
                        <img className="mr-7" src={arrowLeft} />
                        <img src={arrowRight} />
                    </div>
                </div>
                <div className="our-products-main">
                    {productsWithDiscounts?.slice(0, 1).map((product: any) => (
                        <div className="our-products-main-special">
                            <Link to={`/product/${product.id}`}>
                                <div style={{ backgroundImage: `url(${product.image})` }} className="our-products-main-special-img">
                                    <div>
                                        <h2 className="text-[#FF9A02] mt-0 mb-0 font-normal">Спеціальна</h2>
                                        <h2 className="second-span mt-0 mb-0 font-normal text-[black]">пропозиція</h2>
                                    </div>
                                    <div className="our-products-right-circle">
                                        <div className="circle-block"><span className="text-[white]">Save 10%</span></div>
                                    </div>
                                </div>
                                <div className="our-products-main-special-labels mt-5">
                                    <span className="text-lgMain whitespace-nowrap overflow-hidden text-ellipsis block">{product.name}</span>
                                    <span className="text-xlMain pr-5">{product.discountPercentage}</span>
                                    <span className="text-lgMain line-through">{product.discountPercentageString}</span>
                                    <br />
                                    {/* <span className="text-baseMain text-[#002A42] pr-10">Продано: 6</span> */}
                                    <span className="text-baseMain text-[#002A42]">В наявності: {product.quantity}</span>
                                </div>
                            </Link>
                        </div>
                    ))}
                    <div className="container-main-cards">
                        <div className="first-container-main">
                            {productsWithDiscounts
                                ? selectedCategory
                                    ? productsWithDiscounts
                                        .filter((product) => product.category === selectedCategory)
                                        .slice(0, 4)
                                        .map((product: any) => (
                                            <div className="our-products-main-card">
                                                <Link to={`/product/${product.id}`}>
                                                    <span className="text-[12px]">{product.category}</span>
                                                    <h4 className="mt-0 mb-0 font-normal text-[black] whitespace-nowrap overflow-hidden text-ellipsis block">{product.name}</h4>
                                                    <img src={product.image} />
                                                    <div className="price-container flex justify-between">
                                                        <span className="old-price">{product.discountPercentageString}</span>
                                                        <span className="new-price">{product.discountPercentage}</span>
                                                    </div>
                                                </Link>
                                                <button className="rounded" onClick={() => { handleAddNewOrder(product?.id) }}>Додати в кошик</button>
                                            </div>

                                        ))
                                    : productsWithDiscounts.slice(0, 4).map((product: any) => (
                                        <div className="our-products-main-card">
                                            <Link to={`/product/${product.id}`}>
                                                <span className="text-[12px]">{product.category}</span>
                                                <h4 className="mt-0 mb-0 font-normal text-[black] whitespace-nowrap overflow-hidden text-ellipsis block">{product.name}</h4>
                                                <img src={product.image} />
                                                <div className="price-container flex justify-between">
                                                    <span className="old-price">{product.discountPercentageString}</span>
                                                    <span className="new-price">{product.discountPercentage}</span>
                                                </div>
                                            </Link>
                                            <button className="rounded" onClick={() => { handleAddNewOrder(product?.id) }}>Додати в кошик</button>
                                        </div>
                                    ))
                                : null}
                        </div>

                        <div className="second-container-main">
                            {productsWithDiscounts
                                ? selectedCategory
                                    ? productsWithDiscounts
                                        .filter((product) => product.category === selectedCategory)
                                        .slice(4, 8)
                                        .map((product: any) => (
                                            <div className="our-products-main-card">
                                                <Link to={`/product/${product.id}`}>
                                                    <span className="text-[12px]">{product.category}</span>
                                                    <h4 className="mt-0 mb-0 font-normal text-[black] whitespace-nowrap overflow-hidden text-ellipsis block">{product.name}</h4>
                                                    <img src={product.image} />
                                                    <div className="price-container flex justify-between">
                                                        <span className="old-price">{product.discountPercentageString}</span>
                                                        <span className="new-price">{product.discountPercentage}</span>
                                                    </div>
                                                </Link>
                                                <button className="rounded" onClick={() => { handleAddNewOrder(product?.id) }}>Додати в кошик</button>
                                            </div>
                                        ))
                                    : productsWithDiscounts.slice(4, 8).map((product: any) => (
                                        <div className="our-products-main-card">
                                            <Link to={`/product/${product.id}`}>
                                                <span className="text-[12px]">{product.category}</span>
                                                <h4 className="mt-0 mb-0 font-normal text-[black] whitespace-nowrap overflow-hidden text-ellipsis block">{product.name}</h4>
                                                <img src={product.image} />
                                                <div className="price-container flex justify-between">
                                                    <span className="old-price">{product.discountPercentageString}</span>
                                                    <span className="new-price">{product.discountPercentage}</span>
                                                </div>
                                            </Link>
                                            <button className="rounded" onClick={() => { handleAddNewOrder(product?.id) }}>Додати в кошик</button>
                                        </div>
                                    ))
                                : null}
                        </div>

                    </div>


                </div>
            </div>
            <div className="best-offers bg-[#F7F7F7]">
                <div className="best-offers-header flex justify-between mb-10">
                    <h2 className="text-[#002A42] mt-0 mb-0 font-normal">Найкращі пропозиції</h2>
                    <div className="best-offers-header-variants">
                        <h3
                            className={`text-[#002A42] mt-0 mb-0 font-normal ${selectedCategory2 === "Bin Bakar Електроніка" ? "active" : ""
                                }`}
                            onClick={() => {
                                handleCategoryClick2("Bin Bakar Електроніка");
                                console.log("Select category 1::", selectedCategory2);
                            }}
                        >
                            Кухонна техніка
                        </h3>
                        <h3
                            className={`mt-0 mb-0 font-normal text-[black] ${selectedCategory2 === "Електроніка" ? "active" : ""
                                }`}
                            onClick={() => {
                                handleCategoryClick2("Електроніка");
                                console.log("Select category 8::", selectedCategory2);
                            }}
                        >
                            Аксесуари
                        </h3>
                        <h3
                            className={`mt-0 mb-0 font-normal text-[black] ${selectedCategory2 === "Естамп" ? "active" : ""
                                }`}
                            onClick={() => {
                                handleCategoryClick2("Відеопроектори");
                                console.log("Select category 26::", selectedCategory2);
                            }}
                        >
                            ТБ та відео
                        </h3>
                        <h3
                            className={`mt-0 mb-0 font-normal text-[black] ${selectedCategory2 === "Естамп" ? "active" : ""
                                }`}
                            onClick={() => {
                                handleCategoryClick2("Відеопроектори");
                                console.log("Select category 26::", selectedCategory2);
                            }}
                        >
                            Смартфони
                        </h3>
                        <h3
                            className={`mt-0 mb-0 font-normal text-[black] ${selectedCategory2 === "Естамп" ? "active" : ""
                                }`}
                            onClick={() => {
                                handleCategoryClick2("Відеопроектори");
                                console.log("Select category 26::", selectedCategory2);
                            }}
                        >
                            Продукти
                        </h3>
                    </div>
                    <div className="best-offers-header-arrows">
                        <img className="mr-7" src={arrowLeft} />
                        <img src={arrowRight} />
                    </div>
                </div>

                <div className="best-offers-main grid-rows-2 gap-5 mb-10">
                    {productsWithDiscounts
                        ? selectedCategory2
                            ? productsWithDiscounts
                                .filter((product) => product.category === selectedCategory2)
                                .slice(0, 1)
                                .map((product: any) => (
                                    <div className="bg-white best-offers-main-element-border">

                                        <div className="best-offers-main-element flex justify-between ">
                                            <div className="flex flex-col">
                                                <h4 className="text-[20px] mt-0 mb-0 font-normal text-[black] whitespace-nowrap overflow-hidden text-ellipsis block">{product.name}</h4>
                                                <span className="text-[22px] text-[#002A42]">{product.discountPercentage}</span>
                                                <span className="text-[19px] text-[#828282] line-through">{product.discountPercentageString}</span>
                                                <div className="mt-auto flex">
                                                    <button className="cursor-default text-[white] text-[20px]">ЗНИЖКА 10%</button>
                                                </div>
                                            </div>
                                            <div className="element-2">
                                                <div className="special-offer mb-2">
                                                    <span className="text-[#FF9A02] text-[24px]">Спеціальна</span>
                                                    <span className="text-[24px]">пропозиція</span>
                                                </div>
                                                <Link to={`/product/${product.id}`}>
                                                    <div className="img-container">
                                                        <img src={product.image} />
                                                    </div>
                                                </Link>

                                            </div>
                                        </div>
                                    </div>
                                ))
                            : productsWithDiscounts.slice(0, 1).map((product: any) => (
                                <div className="bg-white best-offers-main-element-border">

                                    <div className="best-offers-main-element flex justify-between ">
                                        <div className="flex flex-col">
                                            <h4 className="text-[20px] mt-0 mb-0 font-normal text-[black] whitespace-nowrap overflow-hidden text-ellipsis block">{product.name}</h4>
                                            <span className="text-[22px] text-[#002A42]">{product.discountPercentage}</span>
                                            <span className="text-[19px] text-[#828282] line-through">{product.discountPercentageString}</span>
                                            <div className="mt-auto flex">
                                                <button className="cursor-default text-[white] text-[20px]">ЗНИЖКА 10%</button>
                                            </div>
                                        </div>
                                        <div className="element-2">
                                            <div className="special-offer mb-2">
                                                <span className="text-[#FF9A02] text-[24px]">Спеціальна</span>
                                                <span className="text-[24px]">пропозиція</span>
                                            </div>
                                            <Link to={`/product/${product.id}`}>
                                                <div className="img-container">
                                                    <img src={product.image} />
                                                </div>
                                            </Link>

                                        </div>
                                    </div>
                                </div>
                            ))
                        : null}

                    {productsWithDiscounts
                        ? selectedCategory2
                            ? productsWithDiscounts
                                .filter((product) => product.category === selectedCategory2)
                                .slice(1, 2)
                                .map((product: any) => (
                                    <div className="row-span-2 best-offers-main-element-2">
                                        <Link to={`/product/${product.id}`}>
                                            <div style={{ backgroundImage: `url(${product.image})` }} className="best-offers-main-element-img">
                                                <div>
                                                    <span className="text-[#FF9A02] text-[24px]">Спеціальна</span>
                                                    <br />
                                                    <span className="text-[24px]">пропозиція</span>

                                                </div>
                                                <div className="best-offers-right-circle">
                                                    <div className="offers-circle-block"><span className="text-[20px]">ЗНИЖКА <br /> 10%</span></div>
                                                </div>
                                            </div>
                                        </Link>
                                        <div className="receipts-product-img-labels mt-5">
                                            <span className="text-[22px] whitespace-nowrap overflow-hidden text-ellipsis block">{product.name}</span>
                                            <span className="text-[27px] text-[#002A42] pr-4">{product.discountPercentage}</span>
                                            <span className="text-[19px] line-through text-[#828282]">{product.discountPercentageString}</span>
                                            <br />
                                            {/* <span className="text-[20px] text-[#002A42]" style={{ paddingRight: "53px" }}>Продано: 6</span> */}
                                            <span className="text-[20px] text-[#002A42]">В наявності: {product.quantity}</span>
                                        </div>
                                    </div>
                                ))
                            : productsWithDiscounts.slice(1, 2).map((product: any) => (
                                <div className="row-span-2 best-offers-main-element-2">
                                    <Link to={`/product/${product.id}`}>
                                        <div style={{ backgroundImage: `url(${product.image})` }} className="best-offers-main-element-img">
                                            <div>
                                                <span className="text-[#FF9A02] text-[24px]">Спеціальна</span>
                                                <br />
                                                <span className="text-[24px]">пропозиція</span>

                                            </div>
                                            <div className="best-offers-right-circle">
                                                <div className="offers-circle-block"><span className="text-[20px]">ЗНИЖКА <br /> 10%</span></div>
                                            </div>
                                        </div>
                                    </Link>
                                    <div className="receipts-product-img-labels mt-5">
                                        <span className="text-[22px] whitespace-nowrap overflow-hidden text-ellipsis block">{product.name}</span>
                                        <span className="text-[27px] text-[#002A42] pr-4">{product.discountPercentage}</span>
                                        <span className="text-[19px] line-through text-[#828282]">{product.discountPercentageString}</span>
                                        <br />
                                        {/* <span className="text-[20px] text-[#002A42]" style={{ paddingRight: "53px" }}>Продано: 6</span> */}
                                        <span className="text-[20px] text-[#002A42]">В наявності: {product.quantity}</span>
                                    </div>
                                </div>
                            ))
                        : null}

                    {productsWithDiscounts
                        ? selectedCategory2
                            ? productsWithDiscounts
                                .filter((product) => product.category === selectedCategory2)
                                .slice(2, 3)
                                .map((product: any) => (
                                    <div className="bg-white best-offers-main-element-border">
                                        <div className="best-offers-main-element-3 flex justify-between ">
                                            <div className="flex flex-col">
                                                <h4 className="text-[20px] mt-0 mb-0 font-normal text-[black] whitespace-nowrap overflow-hidden text-ellipsis block">{product.name}</h4>
                                                <span className="text-[22px] text-[#002A42]">{product.discountPercentage}</span>
                                                <span className="text-[19px] text-[#828282] line-through">{product.discountPercentageString}</span>
                                                <div className="mt-auto flex">
                                                    <button className="cursor-default">Save <br /> 10%</button>
                                                </div>
                                            </div>
                                            <div className="element-2">
                                                <div className="special-offer mb-2">
                                                    <span className="text-[#FF9A02] text-[24px]">Спеціальна</span>
                                                    <span className="text-[24px]">пропозиція</span>
                                                </div>
                                                <Link to={`/product/${product.id}`}>
                                                    <div className="img-container">
                                                        <img src={product.image} />
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            : productsWithDiscounts.slice(2, 3).map((product: any) => (
                                <div className="bg-white best-offers-main-element-border">
                                    <div className="best-offers-main-element-3 flex justify-between ">
                                        <div className="flex flex-col">
                                            <h4 className="text-[20px] mt-0 mb-0 font-normal text-[black] whitespace-nowrap overflow-hidden text-ellipsis block">{product.name}</h4>
                                            <span className="text-[22px] text-[#002A42]">{product.discountPercentage}</span>
                                            <span className="text-[19px] text-[#828282] line-through">{product.discountPercentageString}</span>
                                            <div className="mt-auto flex">
                                                <button className="cursor-default">Save <br /> 10%</button>
                                            </div>
                                        </div>
                                        <div className="element-2">
                                            <div className="special-offer mb-2">
                                                <span className="text-[#FF9A02] text-[24px]">Спеціальна</span>
                                                <span className="text-[24px]">пропозиція</span>
                                            </div>
                                            <Link to={`/product/${product.id}`}>
                                                <div className="img-container">
                                                    <img src={product.image} />
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        : null}
                    {productsWithDiscounts
                        ? selectedCategory2
                            ? productsWithDiscounts
                                .filter((product) => product.category === selectedCategory2)
                                .slice(3, 4)
                                .map((product: any) => (
                                    <div className="bg-white best-offers-main-element-border">
                                        <div className="best-offers-main-element-4 flex justify-between ">
                                            <div className="special-offer">
                                                <span className="text-[#FF9A02] text-[26px]">Спеціальна</span>
                                                <span className="text-[26px]">пропозиція</span>
                                                <div className="best-offers-for-span">
                                                    <span className="text-[20px] whitespace-nowrap overflow-hidden text-ellipsis">{product.name}</ span>
                                                    <div>
                                                        <span className="text-[22px] text-[#002A42]">{product.discountPercentage}</span>
                                                        <span className="text-[19px] text-[#828282] line-through">{product.discountPercentageString}</span>

                                                    </div>
                                                    <div>
                                                        {/* <span className="text-[17px] text-[#002A42]">Продано: 6</span> */}
                                                        <span className="text-[17px] text-[#002A42]">В наявності: {product.quantity}</span>

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="element-2">
                                                <div className="best-offers-right-circle-4">
                                                    <div className="offers-circle-block-4"><span>ЗНИЖКА <br /> 10%</span></div>
                                                </div>
                                                <Link to={`/product/${product.id}`}>
                                                    <div className="img-container-4">
                                                        <img src={product.image} />
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>

                                    </div>
                                ))
                            : productsWithDiscounts.slice(3, 4).map((product: any) => (
                                <div className="bg-white best-offers-main-element-border">
                                    <div className="best-offers-main-element-4 flex justify-between ">
                                        <div className="special-offer">
                                            <span className="text-[#FF9A02] text-[26px]">Спеціальна</span>
                                            <span className="text-[26px]">пропозиція</span>
                                            <div className="best-offers-for-span">
                                                <span className="text-[20px] whitespace-nowrap overflow-hidden text-ellipsis">{product.name}</ span>
                                                <div>
                                                    <span className="text-[22px] text-[#002A42]">{product.discountPercentage}</span>
                                                    <span className="text-[19px] text-[#828282] line-through">{product.discountPercentageString}</span>

                                                </div>
                                                <div>
                                                    {/* <span className="text-[17px] text-[#002A42]">Продано: 6</span> */}
                                                    <span className="text-[17px] text-[#002A42]">В наявності: {product.quantity}</span>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="element-2">
                                            <div className="best-offers-right-circle-4">
                                                <div className="offers-circle-block-4"><span>ЗНИЖКА <br /> 10%</span></div>
                                            </div>
                                            <Link to={`/product/${product.id}`}>
                                                <div className="img-container-4">
                                                    <img src={product.image} />
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        : null}

                    {productsWithDiscounts
                        ? selectedCategory2
                            ? productsWithDiscounts
                                .filter((product) => product.category === selectedCategory2)
                                .slice(4, 5)
                                .map((product: any) => (
                                    <div className="bg-white best-offers-main-element-border pt-5">
                                        <Link to={`/product/${product.id}`}>
                                            <div style={{ backgroundImage: `url(${product.image})` }} className="best-offers-main-element-img-5">
                                                <div>
                                                    <span className="text-[#FF9A02] text-[20px]">Спеціальна</span>
                                                    <br />
                                                    <span className="text-[20px]">пропозиція</span>

                                                </div>
                                                <div className="best-offers-right-circle">
                                                    <div className="offers-circle-block-5 "><span>ЗНИЖКА <br /> 10%</span></div>
                                                </div>
                                            </div>
                                        </Link>
                                        <div className="receipts-product-img-labels-2">
                                            <span className="text-[22px] whitespace-nowrap overflow-hidden text-ellipsis block">{product.name}</span>
                                            <span className="text-[27px] text-[#002A42] pr-4">{product.discountPercentage}</span>
                                            <span className="text-[19px] line-through text-[#828282]">{product.discountPercentageString}</span>
                                            <br />
                                            {/* <span className="text-[20px] text-[#002A42]" style={{ paddingRight: "53px" }}>Продано: 6</span> */}
                                            <span className="text-[20px] text-[#002A42]">В наявності: {product.quantity}</span>
                                        </div>
                                    </div>
                                ))
                            : productsWithDiscounts.slice(4, 5).map((product: any) => (
                                <div className="bg-white best-offers-main-element-border pt-5">
                                    <div style={{ backgroundImage: `url(${product.image})` }} className="best-offers-main-element-img-5">
                                        <div>
                                            <span className="text-[#FF9A02] text-[20px]">Спеціальна</span>
                                            <br />
                                            <span className="text-[20px]">пропозиція</span>

                                        </div>
                                        <div className="best-offers-right-circle">
                                            <div className="offers-circle-block-5 "><span>ЗНИЖКА <br /> 10%</span></div>
                                        </div>
                                    </div>
                                    <div className="receipts-product-img-labels-2">
                                        <span className="text-[22px] whitespace-nowrap overflow-hidden text-ellipsis block">{product.name}</span>
                                        <span className="text-[27px] text-[#002A42] pr-4">{product.discountPercentage}</span>
                                        <span className="text-[19px] line-through text-[#828282]">{product.discountPercentageString}</span>
                                        <br />
                                        {/* <span className="text-[20px] text-[#002A42]" style={{ paddingRight: "53px" }}>Продано: 6</span> */}
                                        <span className="text-[20px] text-[#002A42]">В наявності: {product.quantity}</span>
                                    </div>
                                </div>
                            ))
                        : null}
                </div>
            </div>

            <div className="winMart bg-white">
                <div className="flex justify-between pt-10 pb-10">
                    <div className="winMart-first-div ml-5">
                        <div className="rotate-content">ЗНИЖКА 10%</div>
                    </div>
                    <div className="winMart-second-div">
                        <div className="winMart-second-div-first-row">
                            {productsWithDiscounts?.slice(0, 6).map((product: any) => (
                                <div>
                                    <Link to={`/product/${product.id}`}>
                                        <img src={product.image} className="w-[158px] h-[129px]" />
                                    </Link>
                                    <a className="text-[#002A42] text-[15px]" onClick={() => { handleAddNewOrder(product?.id) }}>Додати в кошик</a>
                                    <h4 className="text-[15px] mt-0 mb-0 font-normal text-[black]">{product.discountPercentageString}</h4>
                                </div>
                            ))}

                        </div>
                        <div className="winMart-second-div-second-row">
                            {productsWithDiscounts?.slice(6, 12).map((product: any) => (
                                <div>
                                    <Link to={`/product/${product.id}`}>
                                        <img src={product.image} className="w-[158px] h-[129px]" />
                                    </Link>
                                    <a className="text-[#002A42] text-[15px]" onClick={() => { handleAddNewOrder(product?.id) }}>Додати в кошик</a>
                                    <h4 className="text-[15px] mt-0 mb-0 font-normal text-[black]">{product.discountPercentageString}</h4>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="winMart-third-div">
                        <div className="text-div">
                            <span className="text-[87px] text-[white]">Win</span>
                            <span className="text-[87px] text-[#FF9A02]">Mart</span>
                            <h3 className="text-[40px] text-[white] ml-5 mt-0 mb-0 font-normal">Купуйте зараз</h3>
                        </div>
                        <div className="triangle"></div>
                    </div>
                </div>
            </div>

            <div className="new-receipts">
                <div className="new-receipts-header">
                    <h1 className="text-[#FF9A02] mt-0 mb-0 font-normal">Нові</h1>
                    <h1 className="text-[#000000] mt-0 mb-0 font-normal">Надходження</h1>
                </div>
                <div className="new-receipts-main">
                    <div className="new-receipts-product">
                        {productsWithDiscounts?.slice(0, 3).map((product: any) => (
                            <div className="new-receipts-product-card">
                                <Link to={`/product/${product.id}`}>
                                    <div style={{ backgroundImage: `url(${product.image})` }} className="new-receipts-product-img ">
                                        {/* src={`data:image/png;base64,${product.image}`} */}
                                        <div className="new-reseipts-right-circle">
                                            <div className="receipts-circle-block"><span>Save <br /> 10%</span></div>
                                        </div>
                                    </div>
                                </Link>
                                <div className="receipts-product-img-labels-3 mt-3">
                                    <span className="text-lgMain whitespace-nowrap overflow-hidden text-ellipsis block">{product.name}</span>
                                    <span className="text-baseMain text-[#002A42] pr-4">{product.discountPercentage}</span>
                                    <span className="text-xlBiggerMain line-through text-[#828282]">{product.discountPercentageString}</span>
                                    <br />
                                    {/* <span className="text-baseMain text-[#002A42]" style={{ paddingRight: "53px" }}>Продано: 6</span> */}
                                    <span className="text-baseMain text-[#002A42]">В наявності: {product.quantity}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="last-element mt-[40px]">
                <div className="last-element-header">
                    <h3
                        className={`text-[#002A42] mt-0 mb-0 font-normal ${selectedCategory3 === "Bin Bakar Електроніка" ? "active" : ""
                            }`}
                        onClick={() => {
                            handleCategoryClick3("Bin Bakar Електроніка");
                            console.log("Select category 1::", selectedCategory3);
                        }}
                    >
                        Рекомендовані товари
                    </h3>
                    <h3
                        className={`text-[#002A42] mt-0 mb-0 font-normal ${selectedCategory3 === "Електроніка" ? "active" : ""
                            }`}
                        onClick={() => {
                            handleCategoryClick3("Електроніка");
                            console.log("Select category 1::", selectedCategory3);
                        }}
                    >
                        Розпродаж
                    </h3>
                    <h3
                        className={`text-[#002A42] mt-0 mb-0 font-normal ${selectedCategory3 === "Відеопроектори" ? "active" : ""
                            }`}
                        onClick={() => {
                            handleCategoryClick3("Відеопроектори");
                            console.log("Select category 1::", selectedCategory3);
                        }}
                    >
                        Популярні товари
                    </h3>
                </div>
                <div className="last-element-main mt-10">
                    <div className="last-element-first-container">
                        {productsWithDiscounts
                            ? selectedCategory3
                                ? productsWithDiscounts
                                    .filter((product) => product.category === selectedCategory3)
                                    .slice(0, 3)
                                    .map((product: any) => (
                                        <div className="last-element-card">
                                            <div>
                                                <Link to={`/product/${product.id}`}>
                                                    <img src={`${product.image}`} />
                                                </Link>
                                            </div>
                                            <div>
                                                <span className="text-[12px]">{product.category}</span>
                                                <br />
                                                <span className="text-[15px] whitespace-nowrap overflow-hidden text-ellipsis inline-block">{product.name}</span>
                                                <br />
                                                <span className="text-[13px] text-[#697475] line-through mr-2">{product.discountPercentageString}</span>
                                                <span className="text-[15px] text[#002A42]">{product.discountPercentage}</span>
                                                <br />
                                                <button className="text-[15px] text-[white] rounded" onClick={() => { handleAddNewOrder(product?.id) }}>Додати в кошик</button>
                                            </div>
                                        </div>

                                    ))
                                : productsWithDiscounts.slice(0, 3).map((product: any) => (
                                    <div className="last-element-card">
                                        <div>
                                            <Link to={`/product/${product.id}`}>
                                                <img src={`${product.image}`} />
                                            </Link>
                                        </div>
                                        <div>
                                            <span className="text-[12px]">{product.category}</span>
                                            <br />
                                            <span className="text-[15px] whitespace-nowrap overflow-hidden text-ellipsis inline-block">{product.name}</span>
                                            <br />
                                            <span className="text-[13px] text-[#697475] line-through mr-2">{product.discountPercentageString}</span>
                                            <span className="text-[15px] text[#002A42]">{product.discountPercentage}</span>
                                            <br />
                                            <button className="text-[15px] text-[white] rounded" onClick={() => { handleAddNewOrder(product?.id) }}>Додати в кошик</button>
                                        </div>
                                    </div>
                                ))
                            : null}

                    </div>

                    <div className="last-element-second-container">
                        {productsWithDiscounts
                            ? selectedCategory3
                                ? productsWithDiscounts
                                    .filter((product) => product.category === selectedCategory3)
                                    .slice(3, 6)
                                    .map((product: any) => (
                                        <div className="last-element-card">
                                            <div>
                                                <Link to={`/product/${product.id}`}>
                                                    <img src={`${product.image}`} />
                                                </Link>
                                            </div>
                                            <div>
                                                <span className="text-[12px]">{product.category}</span>
                                                <br />
                                                <span className="text-[15px] whitespace-nowrap overflow-hidden text-ellipsis inline-block">{product.name}</span>
                                                <br />
                                                <span className="text-[13px] text-[#697475] line-through mr-2">{product.discountPercentageString}</span>
                                                <span className="text-[15px] text[#002A42]">{product.discountPercentage}</span>
                                                <br />
                                                <button className="text-[15px] text-[white] rounded" onClick={() => { handleAddNewOrder(product?.id) }}>Додати в кошик</button>
                                            </div>
                                        </div>

                                    ))
                                : productsWithDiscounts.slice(3, 6).map((product: any) => (
                                    <div className="last-element-card">
                                        <div>
                                            <Link to={`/product/${product.id}`}>
                                                <img src={`${product.image}`} />
                                            </Link>
                                        </div>
                                        <div>
                                            <span className="text-[12px]">{product.category}</span>
                                            <br />
                                            <span className="text-[15px] whitespace-nowrap overflow-hidden text-ellipsis inline-block">{product.name}</span>
                                            <br />
                                            <span className="text-[13px] text-[#697475] line-through mr-2">{product.discountPercentageString}</span>
                                            <span className="text-[15px] text[#002A42]">{product.discountPercentage}</span>
                                            <br />
                                            <button className="text-[15px] text-[white] rounded" onClick={() => { handleAddNewOrder(product?.id) }}>Додати в кошик</button>
                                        </div>
                                    </div>
                                ))
                            : null}
                    </div>


                    <div className="last-element-third-container">
                        {productsWithDiscounts
                            ? selectedCategory3
                                ? productsWithDiscounts
                                    .filter((product) => product.category === selectedCategory3)
                                    .slice(6, 9)
                                    .map((product: any) => (
                                        <div className="last-element-card">
                                            <div>
                                                <Link to={`/product/${product.id}`}>
                                                    <img src={`${product.image}`} />
                                                </Link>
                                            </div>
                                            <div>
                                                <span className="text-[12px]">{product.category}</span>
                                                <br />
                                                <span className="text-[15px] whitespace-nowrap overflow-hidden text-ellipsis inline-block">{product.name}</span>
                                                <br />
                                                <span className="text-[13px] text-[#697475] line-through mr-2">{product.discountPercentageString}</span>
                                                <span className="text-[15px] text[#002A42]">{product.discountPercentage}</span>
                                                <br />
                                                <button className="text-[15px] text-[white] rounded" onClick={() => { handleAddNewOrder(product?.id) }}>Додати в кошик</button>
                                            </div>
                                        </div>

                                    ))
                                : productsWithDiscounts.slice(6, 9).map((product: any) => (
                                    <div className="last-element-card">
                                        <div>
                                            <Link to={`/product/${product.id}`}>
                                                <img src={`${product.image}`} />
                                            </Link>
                                        </div>
                                        <div>
                                            <span className="text-[12px]">{product.category}</span>
                                            <br />
                                            <span className="text-[15px] whitespace-nowrap overflow-hidden text-ellipsis inline-block">{product.name}</span>
                                            <br />
                                            <span className="text-[13px] text-[#697475] line-through mr-2">{product.discountPercentageString}</span>
                                            <span className="text-[15px] text[#002A42]">{product.discountPercentage}</span>
                                            <br />
                                            <button className="text-[15px] text-[white] rounded" onClick={() => { handleAddNewOrder(product?.id) }}>Додати в кошик</button>
                                        </div>
                                    </div>
                                ))
                            : null}
                    </div>
                </div>
            </div>
        </div >
    )

}



export default HomePage;