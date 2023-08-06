
import logo from "../images/amazon.png"

const Footer = () => <>
    <a href="#" className="footerBackToTop" aria-label="Back To Top">
        <span className="text-white">ВГОРУ</span>
    </a>



    <footer className="navFooterStyle ">
        <div className="mx-auto w-full max-w-screen-xl">
            <div className="divove grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-4">
                <div>
                    <h2 className="mb-6 text-sm font-semibold  uppercase dark:text-white">ПРО НАС</h2>
                    <ul className=" font-medium">
                        <li className="mb-4 liitem">
                            <a href="#" >РОБОТА В ALLmart</a>
                        </li>
                        <li className="mb-4">
                            <a href="#" className="hover:underline">ПРАВИЛА БЕЗПЕКИ</a>
                        </li>
                        <li className="mb-4">
                            <a href="#" className="hover:underline">ЧАСТО ЗАДАНІ ПИТАННЯ</a>
                        </li>
                        <li className="mb-4">
                            <a href="#" className="hover:underline">ДОСТАВКА І ОПЛАТА</a>
                        </li>
                        <li className="mb-4">
                            <a href="#" className="hover:underline">ПОВЕРНЕННЯ</a>
                        </li>
                        <li className="mb-4">
                            <a href="#" className="hover:underline">ПОДАРУВАТИ УСМІШКУ</a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h2 className="mb-6 text-sm font-semibold uppercase dark:text-white">МИ У СОЦІАЛЬНИХ МЕРЕЖАХ</h2>
                    <ul className=" font-medium">

                        <li className="mb-4">
                            <a href="#" className="hover:underline">FACEBOOK</a>
                        </li>
                        <li className="mb-4">
                            <a href="#" className="hover:underline">INSTAGRAM</a>
                        </li>
                        <li className="mb-4">
                            <a href="#" className="hover:underline">TWITTER</a>
                        </li>

                    </ul>
                </div>
                <div>
                    <h2 className="mb-6 text-sm font-semibold  uppercase dark:text-white">ДОПОМОГА ТА ЗВОРОТНІЙ ЗВЯЗОК</h2>
                    <ul className=" font-medium">

                        <li className="mb-4">
                            <a href="#" className="hover:underline">ПРОДАЖ СВОЇХ ТОВАРІВ В ALLmart</a>
                        </li>
                        <li className="mb-4">
                            <a href="#" className="hover:underline">РЕКЛАМА НА САЙТІ</a>
                        </li>
                        <li className="mb-4">
                            <a href="#" className="hover:underline">УМОВИ КОРИСТУВАННЯ</a>
                        </li>
                        <li className="mb-4">
                            <a href="#" className="hover:underline">ПОЛІТИКА КОНФІДЕНЦІЙНОСТІ</a>
                        </li>
                        <li className="mb-4">
                            <a href="#" className="hover:underline">СТАТИ ІНВЕСТОРОМ</a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h2 className="mb-6 text-sm font-semibold  uppercase dark:text-white">МІЙ АКАУНТ</h2>
                    <ul className="t  font-medium">

                        <li className="mb-4">
                            <a href="#" className="hover:underline">МАЇ ЗАМОВЛЕННЯ</a>
                        </li>
                        <li className="mb-4">
                            <a href="#" className="hover:underline">ВСТАНОВИТИ ДОДАТОК<br />ALLmart</a>
                        </li>
                        <li className="mb-4">
                            <a href="#" className="hover:underline">ДОПОМОГА</a>
                        </li>

                    </ul>
                </div>

            </div>

        </div>





        <div className="navFooterLine">






            <div className="navFooterCopyright text-gray-900 font-medium text-sm sm:text-center items-center mt-10">
                <ul>
                    <span>© 2023 ALLmart ALL right reversed</span>
                </ul>
            </div>

        </div>
    </footer>


</>

export default Footer;
