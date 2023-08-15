import mainImg from "../images/main-img.svg"
import prev from "../images/prev.svg"
import "../css/HomePage.css"

const HomePage = () => {

    return (
        <div>
            <div className="first-section">
                <div className="image-div">
                    <div className="left-elements-image">
                        <h1 className="text-[#002A42] text-[40px]">Комп'ютери купуй та <br /> експерементуй</h1>
                        <span className="text-[13px]">"Від потужних ігрових систем до стильних і ультратонких ноутбуків – ми пропонуємо <br /> найсучасніші рішення для будь-яких потреб. Оберіть ідеальний комп'ютер за <br /> сьогоднішніми стандартами технологій та стилю вже сьогодні."</span>
                        <div className="forButton">
                            <button>View More</button>
                        </div>
                    </div>
                    <div className="right-elements-image">
                        <div className="circle-block"><span>40% Off</span></div>
                    </div>
                </div>
            </div>
            <div className="second-section">
                <div className="slider-btns">
                    <div className="swiper-button-prev"></div>
                    <div className="swiper-button-next"></div>
                </div>
                <div className="container-for-carousel">
                    <div className="prev-item">
                        <img src={prev} alt="prev" />
                    </div>
                    <div className="card-main">
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
                    </div>
                    <div className="card-main">
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
                    </div>
                </div>
            </div>
        </div>
    )

}



export default HomePage;