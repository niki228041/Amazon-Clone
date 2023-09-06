import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { apiProductSlice, useGetProductsQuery } from '../../features/user/apiProductSlice';
import { ImageLink, Product, categorySequence } from '../types';
import { apiCategorySlice, useGetCategoriesQuery, useGetMainCategoriesQuery } from '../../features/user/apiCategorySlice';
import "../../css/stars.css";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Oval } from 'react-loader-spinner'

interface getProductsWithPagination{
  id: number,
  page:number,
  limit:number
}

const loader = () => {
  return (
    <div className='m-auto pt-32 pb-10 flex self-center justify-center'>
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

const Product_Component = ({ data, productsImages }: { data: Product, productsImages: string }) => {
  var stars = 0;

  const handleStarsFunctionality = () => {
    var sumOfStars = 0;
    data.comments.map(com => sumOfStars += com.stars);
    stars = Math.round(sumOfStars / (data.comments.length));
  }

  const getStarts = () => {
    var jsx_stars: JSX.Element[] = [];
    handleStarsFunctionality();
    for (var i = 0; i < 5; i++) {
      if (i < stars) {
        jsx_stars.push(<div key={i} className='star-small ml-0.5' />);
      }
      else {
        jsx_stars.push(<div key={i} className='empty_star-small h-3 ml-0.5' />);
      }
    }

    return jsx_stars;
  }


  return <>


<div >
      <Link to={"/product/description/" + data.id}>
      <div style={{ height: "290px", width: "200px", borderWidth: "1px", }}>
      <div className=' max-h-[60px] overflow-hidden '>
            <p className='text-blue-950 text-sm hover:text-red-700 cursor-pointer hover:underline '>
              {data.name}
            </p>
          </div>
          <div>
            <div className='w-full h-[150px]' style={{ marginTop:"10px  ", width:"180px",marginLeft:"auto", backgroundImage: "url(" + productsImages + ")", backgroundPosition: "center", backgroundSize: "contain", backgroundRepeat: "no-repeat" }}>

            </div>
             {/* <img src={data?.image ? "data:image/png;base64," + data?.image : img} className=' w-full h-[100px] ' />        */}
          </div>
        <div style={{ display:"flex"}}  className='p-1 '>
          

          {/* <div className='flex'>
            {getStarts()}
            <span className='ml-1 text-blue-950 hover:text-red-700 cursor-pointer hover:underline text-[12px] font-medium'>{data.comments.length}</span>
          </div> */}

          <p style={{ verticalAlign:"bottom",fontSize:"17px"}} className='text-sm  font-medium'>$ {data.price}</p>
          {/* <button style={{ borderRadius: "7px", color: "white", background: "#FF9A02", height: "50px", width: "170px", marginLeft: "10px" }} type="submit">
            Додати до кошика
          </button> */}
          <AddShoppingCartIcon style={{color:"#FF9A02",marginLeft:"30px",fontSize:"30px" }}></AddShoppingCartIcon>
          <FavoriteBorderIcon style={{color:"#FF9A02",fontSize:"30px",marginLeft:"10px"}}></FavoriteBorderIcon>
          

        </div>
      </div>

    </Link>
    </div >


    
    {/* <div >
      <Link to={"/product/description/" + data.id}>
        <div className='pb-2 px-3 mt-20 w-full'>
          <div>
            <div className='w-full h-[160px]' style={{ backgroundImage: "url(" + productsImages + ")", backgroundPosition: "center", backgroundSize: "contain", backgroundRepeat: "no-repeat" }}>

            </div>
             <img src={data?.image ? "data:image/png;base64," + data?.image : img} className=' w-full h-[100px] ' />       
          </div>
          <div className='p-1 '>
            <div className=' max-h-[60px] overflow-hidden '>
              <p className='text-blue-950 text-sm hover:text-red-700 cursor-pointer hover:underline '>
                {data.name}
              </p>
            </div>

            <div className='flex'>
              {getStarts()}
              <span className='ml-1 text-blue-950 hover:text-red-700 cursor-pointer hover:underline text-[12px] font-medium'>{data.comments.length}</span>
            </div>

            <p className='text-sm text-red-700 font-medium'>$ {data.price}</p>
          </div>
        </div>
      </Link>
    </div> */}
  </>
}


const Main = () => {
  const location = useLocation();




  const { data: categories, isSuccess: isSuccessCategory } = useGetMainCategoriesQuery();

  
  const [getSubcategories, { }] = apiCategorySlice.useGetAllSubcategoriesByCategoryIdMutation();

  const [getProductsByCategory, { isLoading }] = apiProductSlice.useGetProductsByCategoryIdMutation();

  // var request:any=[];
  // data?.payload?.forEach((data:any) => {
  //   request.push({id:data.id});
  // });

  // const { data: imagesLinks, isSuccess: isSuccessImagesLinks } = apiProductSlice.useGetLinksForProductByProductsIdsQuery(request) as {
  //   data: ImageLink[];
  //   isSuccess: boolean;
  // };;  

  // console.log(imagesLinks);
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);


  const getSearchParams = () => {
    return new URLSearchParams(window.location.search);
  };

  var [categoryId, setcategoryId] = useState(getSearchParams().get('id'));

  var [page, setPage] = useState(1);
  var [limit, setLimit] = useState(3);
  


  var url = `/products?category=${encodeURIComponent("")}`;


  var [categoriesToView, setCategoriesToView] = useState([]);
  var [products, setProducts] = useState([]);
  console.log(products);

  var [categoriesSequence, setCategoriesSequence] = useState<categorySequence[]>([]);


  // console.log("products");
  // console.log(products);


  useEffect(() => {
    if (categories)
      setCategoriesToView(categories?.payload);

    // console.log("categoriesToView");
    // console.log(categoriesToView);



    // const category = searchParams.get('category');
    getProducts();
    // setProducts();

  }, [categories, categoryId,page])



  const getProducts = async () => {
    var id = parseInt(getSearchParams().get('id')!);

    if (!Number.isInteger(id)) {
      id = -1;
    }

    var values:getProductsWithPagination = {id:id,page:page,limit:limit}

    let response: any = await getProductsByCategory(values);

    // console.log(categoryId);
    // console.log("RESPONSE:");
    // console.log(response.data.payload);
    console.log(response?.data);

    setProducts((prevProducts) => response?.data?.payload);
  }


  const changeCategory = async (id: number, name: string) => {
    let response: any = await getSubcategories({ id: id });
    // console.log(id);
    // console.log("RESPONSE:");
    // console.log(response.data.payload.subcategories);

    url = `/products?category=${encodeURIComponent(name)}&id=${encodeURIComponent(id)}`
    navigate(url);
    if (response?.data?.payload?.subcategories?.length != 0) {

      setCategoriesToView(response?.data?.payload?.subcategories);

      const newCategoriesSequence = [...categoriesSequence];

      const index = newCategoriesSequence.findIndex((category) => category.id === id);
      if (index !== -1) {
        newCategoriesSequence.splice(index + 1);
        setCategoriesSequence(newCategoriesSequence);
      }
      else {
        newCategoriesSequence.push({ id: id, name: name });
        setCategoriesSequence(newCategoriesSequence);
      }

      // console.log(newCategoriesSequence);
    }

    await getProducts();
  }

  const setMainCategories = async () => {
    url = `/products`;
    navigate(url);

    setCategoriesToView(categories?.payload);
    setCategoriesSequence([]);


    await getProducts();
  }

  return (
    <div className='flex p-2 '>

      <div style={{borderWidth:"2px"}} className='whitespace-nowrap pl-2 pr-2 mt-2'>

        <div>
          <h1 className='text-[30px] font-bold'>
            Best Sellers
          </h1>
        </div>

        <div className='ml-3 mt-10'>
          <div onClick={() => { setMainCategories() }} className='font-medium text-sm cursor-pointer'>All Categories</div>

          <div className='ml-1 font-medium text-sm'>
            {categoriesSequence ? categoriesSequence?.map((category: any, id: number) => (
              <div className=' cursor-pointer hover:underline' style={{ marginLeft: id * 6 }} onClick={() => { changeCategory(category.id, category.name) }} key={category.id}>{category.name}</div>
            )) : ""}
          </div>

          <div className='ml-3 text-sm'>
            {categoriesToView?.map((category: any) => (
              <div className=' cursor-pointer hover:underline' onClick={() => { changeCategory(category.id, category.name) }} key={category.id}>{category.name}</div>
            ))}
          </div>
        </div>

        {/* idk */}
        {/* {isSuccessCategory ? categories.payload.map((a:any,id:number)=>{return <div key={id}>
          <div className='text-blue-950 cursor-pointer hover:underline'>{a.name}</div>
          <div className='ml-2'>
            {a.subcategories?.map((sub:any,id:number)=>{return <p key={id} onClick={()=>{toNextCategory(sub.id)}} className='text-blue-950 cursor-pointer hover:underline'>{sub.name}</p>  })}
          </div>
          { fetchedSubcategories ? fetchedSubcategories.map((sub:any,id:number)=>{return <div key={id}>{sub.name}</div>}) : "g"}
        
        
        </div> }) : ""} */}




        {/* <div className='text-blue-950 cursor-pointer hover:underline'>sdfds</div> */}
      </div>


        <div className=' w-full '>
      {!isLoading ?
        <div>
          <div className='grid grid-cols-6 gap-1 pr-44 pl-24 w-full'>
            {/* grid */}
            {products?.map((product: Product, id: number) => {
              const b: Product = product;
              return <div key={id}>{<Product_Component data={b} productsImages={product?.image!} />}</div>
            })}
          </div>
          
        </div>
        : loader()}


        <div className='w-full m-auto flex flex-col mt-10'>
          <span className='m-auto flex justify-center'>
            <span className='mx-1'>Page: {page}</span>
            <span className='mx-1'>Limit: {limit}</span>
          </span>

          <div className='flex m-auto mt-2'>
            <div onClick={()=>{if(page > 1)(setPage(page-1))}} className=' bg-mainYellowColor transition-all select-none mx-2 cursor-pointer active:scale-110 p-1 px-4 rounded-sm text-white'>
              prev
            </div>
            <div onClick={()=>{if(products?.length != 0)(setPage(page+1))}}  className=' bg-mainYellowColor transition-all select-none mx-2 cursor-pointer active:scale-110 p-1 px-4 rounded-sm text-white'>
              next
            </div>
          </div>

        </div>

        </div>

    </div>
  )
}

export default Main