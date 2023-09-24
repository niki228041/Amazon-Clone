
import InputMask from 'react-input-mask';
import close from "../images/close.png"
import mastercard from "../images/mastercard_logo.png"
import visa from "../images/visa-logo.jpg"

import mastercard_logo from "../images/MasterCard_Logo.svg.png"
import visa_logo from "../images/Visa_2021.svg.png"
import { useEffect, useState } from 'react';
import { useAppSelector } from '../app/hooks';
import circle from '../images/black-circle.png';
import arrowRight from "../images/ArrowRightS.svg";
import ukraine from "../images/Ukraine.svg";
import classNames from 'classnames';
import { apiCategorySlice, useGetMainCategoriesQuery } from '../features/user/apiCategorySlice';
import { Category } from './Admin/types';
import { categorySequence } from './types';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setBurgerModalWindow } from '../features/user/modalWindowsStateSlice';


export const ModelOne = ({ handleNextMenu , styles,position,setPosition,name,categorySequence,subcategories,handleGoBackMenu}: { handleNextMenu: (prop: Category) => void ,styles:string,position:string,setPosition:(val:any)=>void,name:string,categorySequence:categorySequence[],subcategories:Category[],handleGoBackMenu:()=>void})=>{
  var [categoriesToView, setCategoriesToView] = useState<Category[]>([]);
  const { data: categories }:{data?: { payload: Category[] }} = useGetMainCategoriesQuery();




  const user = useAppSelector((state)=>state.user.user);


  useEffect(()=>{
    if (categories)
      setCategoriesToView(categories?.payload);

  },[categories])

  return <div
  // name={name}
  id={name}
  className={classNames("transition-all w-[350px] duration-300 px-7 "+styles,{
  //  "-translate-x-[350px]":nextMenu.includes("Електроніка"),
  //  "  ":!nextMenu.includes("Електроніка")
 })}
 >
   {
    categorySequence?.length <= 0 ?
    <>
    <div className='flex justify-center'>
     <span className='font-bold text-lg py-2'>ВІРТУАЛЬНІ ТОВАРИ</span>
   </div>

   <div className='my-3'>
     <div className=' flex justify-between hover:underline'>
       <Link to={"/music/home"} className='text-[17px] font-semibold py-1 cursor-pointer'>
         ALLmart musik
       </Link>
       <img src={arrowRight} />
     </div>

     <div className=' flex justify-between hover:underline'>
       <span className='text-[17px] font-semibold py-1 cursor-pointer'>
       Подарункові карти
       </span>
       <img src={arrowRight} />
     </div>

     
   </div>
   

   <hr/>

   <div className='flex justify-center'>
     <span className='font-bold text-lg py-2'>МАГАЗИН ПО ВІДДІЛАХ</span>
   </div>

   <div className='my-3'>
     {categoriesToView?.map((category)=>{
         return<>
         <div
          className={classNames("flex justify-between hover:underline transition-all")}
          onClick={()=>{
            handleNextMenu(category);
            
            }}>
           <span className='text-[17px] font-semibold py-1 cursor-pointer'>
           {category.name}
           </span>
           <img src={arrowRight} />
         </div>
         </>
     })}

     

     
   </div>

   <hr/>

   <div className='flex justify-center'>
     <span className='font-bold text-lg py-2'>ДОПОМОГА ПО ВІДДІЛАХ</span>
   </div>

   <div className='my-3'>

     <div className=' flex justify-between hover:underline'>
       <span className='text-[17px] font-semibold py-1 cursor-pointer'>
       Твій профіль
       </span>
     </div>
     <div className=' flex justify-between hover:underline'>
       <span className='text-[17px] font-semibold py-1 cursor-pointer'>
       Українська
       </span>
     </div>
     <div className=' flex hover:underline'>
       <span className='text-[17px] mr-2 font-semibold py-1 cursor-pointer'>
       Україна
       </span>
       <img src={ukraine} />
     </div>
     <div className=' flex justify-between hover:underline'>
       <span className='text-[17px] font-semibold py-1 cursor-pointer'>
       Зареєструватись
       </span>
     </div>

   </div>
    </>
    :
    <>
    <div>
      <div className='flex justify-center' onClick={()=>handleGoBackMenu()}>
       <span className='font-bold text-lg py-2'>{categorySequence[categorySequence.length-1]?.name}</span>
      </div>

      <div className='my-3'>
      {subcategories?.map((category)=>{
         return<>
         <div

          className={classNames("flex justify-between hover:underline transition-all")}
          onClick={()=>{
            handleNextMenu(category);
            }}>
           <span className='text-[17px] font-semibold py-1 cursor-pointer'>
           {category.name}
           </span>
           <img src={arrowRight} />
         </div>
         </>
      })}
      </div>

    </div>
    </>
   }

 </div>
} 


export const BurgerModal = () => {

  const [nextMenu, setNextMenu] = useState("");
  const [cardYear, setCardYear] = useState("");
  const [subCategories, setSubcategories] = useState<Category[]>([]);
  var [categoriesToView, setCategoriesToView] = useState<Category[]>([]);
  const { data: categories }:{data?: { payload: Category[] }} = useGetMainCategoriesQuery();
  const [getSubcategories, { }] = apiCategorySlice.useGetAllSubcategoriesByCategoryIdMutation();


  const [stylesOne, setStylesOne] = useState("absolute ");
  const [stylesTwo, setStylesTwo] = useState("translate-x-[350px] absolute");
  const [stylesThree, setStylesThree] = useState("translate-x-[700px]");
  var [categoriesSequence, setCategoriesSequence] = useState<categorySequence[]>([]);

  //left mid right
  const [positionOne, setPositionOne] = useState<any>("mid");
  const [positionTwo, setPositionTwo] = useState("right");
  const [positionThree, setPositionThree] = useState("right-right");


  const navigate = useNavigate();
  const handleToCategory=(categoryId:number)=>{

    navigate(`/findProducts` + `?categoryId=${encodeURIComponent(categoryId)}`);
  }


  const user = useAppSelector((state)=>state.user.user);
  const isBurgerModalOpen = useAppSelector((state)=>state.modalWindows.isBurgerModalOpen);

  
  useEffect(()=>{
    if (categories)
      setCategoriesToView(categories?.payload);
  },[])


  
  const handleNextMenu=async (category:Category)=>{
    setNextMenu(category.name);

    let response: any = await getSubcategories({ id: category.id });
    
    if (response?.data?.payload?.subcategories?.length != 0) {
      setSubcategories(response?.data?.payload?.subcategories);
      setCategoriesSequence([...categoriesSequence, category]);
      // const newCategoriesSequence = [...categoriesSequence];

      // const index = newCategoriesSequence.findIndex((category) => category.id === id);
      // if (index !== -1) {
      //   newCategoriesSequence.splice(index + 1);
      //   setCategoriesSequence(newCategoriesSequence);
      // }
      // else {
      //   newCategoriesSequence.push({ id: id, name: name });
      //   setCategoriesSequence(newCategoriesSequence);
      // }

      // // console.log(newCategoriesSequence);
    


      if(positionOne == "mid")
      {
        setPositionOne("left");
        setPositionTwo("mid");
        setPositionThree("right");
      
      
        setStylesOne("-translate-x-[350px] transition-all absolute");
        setStylesTwo("transition-all absolute");
        setStylesThree("translate-x-[350px] transition-none");
      }
    
      if(positionOne == "left")
      {
        setPositionOne("right");
        setPositionTwo("left");
        setPositionThree("mid");

        setStylesOne("translate-x-[350px] transition-none absolute");
        setStylesTwo("-translate-x-[350px] transition-all absolute");
        setStylesThree("transition-all");
      }

      if(positionOne == "right")
      {
        setPositionOne("mid");
        setPositionTwo("right");
        setPositionThree("left");

        setStylesOne("transition-all absolute");
        setStylesTwo("translate-x-[350px] transition-none absolute");
        setStylesThree("-translate-x-[350px] transition-all");
      }
    }
    else{
      handleToCategory(category.id);
      dispatch(setBurgerModalWindow(false));
    }

  }

  const dispatch = useDispatch();

  const handleGoBackMenu=async ()=>{
    console.log(categoriesSequence.length);
    console.log(categoriesSequence);
    if(categoriesSequence.length >= 2)
    {
      
    var categoriesSequence_ = categoriesSequence[categoriesSequence.length-2];
    // setNextMenu(categoriesSequence_);
    console.log(categoriesSequence_);
    console.log(categoriesSequence);

    let response: any = await getSubcategories({ id: categoriesSequence_.id });
    
    setSubcategories(response?.data?.payload?.subcategories);

    const newSequence = categoriesSequence.slice(0, -1); // Create a new array without the last element
    setCategoriesSequence(newSequence);


    if(positionOne == "mid")
    {
      setPositionOne("right");
      setPositionTwo("left");
      setPositionThree("mid");


      setStylesOne("translate-x-[350px] transition-all absolute");
      setStylesTwo("-translate-x-[350px] transition-none absolute");
      setStylesThree("transition-all");
    }
    
    if(positionOne == "left")
    {
      setPositionOne("mid");
      setPositionTwo("right");
      setPositionThree("left");

      setStylesOne("transition-all absolute");
      setStylesTwo("translate-x-[350px] transition-all absolute");
      setStylesThree("-translate-x-[350px] transition-none");
    }

      if(positionOne == "right")
      {
        setPositionOne("left");
        setPositionTwo("mid");
        setPositionThree("right");

        setStylesOne("-translate-x-[350px] transition-none absolute ");
        setStylesTwo(" transition-all absolute");
        setStylesThree("translate-x-[350px] transition-all");
      }
    }
    else
    {
      setCategoriesSequence([]);
    }


  }


  return (
    <form >
        <div className=''>
        <div className={classNames("flex fixed inset-0 bg-black/30 transition-all duration-500 z-20 pt-11 ",{"scale-x-0":!isBurgerModalOpen,} )}/>

        <div className={classNames(" absolute  mt-[124px]  grid z-20 w-[350px] transition-all -translate-x-full",{"translate-x-0":isBurgerModalOpen,} )}>
            <div className='flex px-5 py-2 justify-between bg-mainYellowColor'>
              <div className=' text-white text-[17px] self-center font-semibold mr-5'>Привіт {user.name}</div>
              <div className='self-center'>
                <img className='h-10' src={circle} />
              </div>
            </div>

            <div className=' bg-white relative py-5 pb-10 overflow-hidden min-h-[300px] overflow-y-scroll'>

            <ModelOne handleGoBackMenu={handleGoBackMenu} subcategories={subCategories} handleNextMenu={handleNextMenu} styles={stylesOne} position={positionOne} setPosition={setPositionOne} name={"ElementOneId"} categorySequence={categoriesSequence} />
            <ModelOne handleGoBackMenu={handleGoBackMenu} subcategories={subCategories} handleNextMenu={handleNextMenu} styles={stylesTwo} position={positionTwo} setPosition={setPositionTwo} name={"ElementTwoId"} categorySequence={categoriesSequence}/>
            <ModelOne handleGoBackMenu={handleGoBackMenu} subcategories={subCategories} handleNextMenu={handleNextMenu} styles={stylesThree} position={positionThree} setPosition={setPositionThree} name={"ElementThreeId"} categorySequence={categoriesSequence}/>
            

          </div>
             {/*      та догляд Мода Здоров`я та побут Дім та кухня Сумки і багаж Товари для тварин Спорт на природі Іграшки */}
             {/*     */}


            
          </div>
        </div>
    </form>
  );
}


{/* <div
             className={classNames("transition-all duration-500 w-[350px] px-7",{
              "translate-x-[350px]":!nextMenu.includes("Електроніка"),
              "  ":nextMenu.includes("Електроніка")
            })}
            >
              <div className='flex justify-center'>
                <span className='font-bold text-lg py-2'>ВІРТУАЛЬНІ ТОВАРИ</span>
              </div>

              <div className='my-3'>
                <div className=' flex justify-between hover:underline'>
                  <span className='text-[17px] font-semibold py-1 cursor-pointer'>
                    ALLmart musik
                  </span>
                  <img src={arrowRight} />
                </div>

                <div className=' flex justify-between hover:underline'>
                  <span className='text-[17px] font-semibold py-1 cursor-pointer'>
                  Подарункові карти
                  </span>
                  <img src={arrowRight} />
                </div>

                
              </div>
              

              <hr/>

              <div className='flex justify-center'>
                <span className='font-bold text-lg py-2'>МАГАЗИН ПО ВІДДІЛАХ</span>
              </div>

              <div className='my-3'>

                <div
                 className={classNames("flex justify-between hover:underline transition-all")}
                 onClick={()=>{setNextMenu("Електроніка")}}>
                  <span className='text-[17px] font-semibold py-1 cursor-pointer'>
                  Електроніка
                  </span>
                  <img src={arrowRight} />
                </div>
        
                <div className=' flex justify-between hover:underline'>
                  <span className='text-[17px] font-semibold py-1 cursor-pointer hover:underline' onClick={()=>{setNextMenu("Комп`ютери")}}>
                  Комп`ютери
                  </span>
                  <img src={arrowRight} />
                </div>

                <div className=' flex justify-between hover:underline'>
                  <span className='text-[17px] font-semibold py-1 cursor-pointer hover:underline'>
                  Мистецтво
                  </span>
                  <img src={arrowRight} />
                </div>

                <div className=' flex justify-between hover:underline'>
                  <span className='text-[17px] font-semibold py-1 cursor-pointer hover:underline'>
                  Автомобіль
                  </span>
                  <img src={arrowRight} />
                </div>
                
                <div className=' flex justify-between hover:underline'>
                  <span className='text-[17px] font-semibold py-1 cursor-pointer hover:underline'>
                  Діти
                  </span>
                  <img src={arrowRight} />
                </div>
                                
                <div className=' flex justify-between hover:underline'>
                  <span className='text-[17px] font-semibold py-1 cursor-pointer hover:underline'>
                  Краса
                  </span>
                  <img src={arrowRight} />
                </div>
              </div>

              <hr/>

              <div className='flex justify-center'>
                <span className='font-bold text-lg py-2'>ДОПОМОГА ПО ВІДДІЛАХ</span>
              </div>

              <div className='my-3'>

                <div className=' flex justify-between hover:underline'>
                  <span className='text-[17px] font-semibold py-1 cursor-pointer'>
                  Твій профіль
                  </span>
                </div>
                <div className=' flex justify-between hover:underline'>
                  <span className='text-[17px] font-semibold py-1 cursor-pointer'>
                  Українська
                  </span>
                </div>
                <div className=' flex hover:underline'>
                  <span className='text-[17px] mr-2 font-semibold py-1 cursor-pointer'>
                  Україна
                  </span>
                  <img src={ukraine} />
                </div>
                <div className=' flex justify-between hover:underline'>
                  <span className='text-[17px] font-semibold py-1 cursor-pointer'>
                  Зареєструватись
                  </span>
                </div>

              </div>

            </div> */}