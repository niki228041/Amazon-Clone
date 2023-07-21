import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { apiProductSlice, useGetProductsQuery } from '../features/user/apiProductSlice';
import img from '../images/t-shirt-png.webp'
import { useParams} from 'react-router-dom'
import star from "../images/star (2).png"
import empty_star from "../images/star (3).png"
import { ImageLink, Product, categorySequence } from './types';
import { apiCategorySlice, useGetCategoriesQuery, useGetMainCategoriesQuery } from '../features/user/apiCategorySlice';
import "../css/stars.css";
import search from "../images/search.png";
import './NumberFieldWithoutArrows.css';

const Product_Component=({ data , productsImages}: { data: Product ,productsImages:ImageLink})=>{
  var stars = 0;

  const handleStarsFunctionality=()=>{
    var sumOfStars = 0;
    data.comments.map(com=>sumOfStars += com.stars);
    stars = Math.round(sumOfStars/(data.comments.length));
  }

  const getStarts=()=>{
    var jsx_stars: JSX.Element[] = [];
    handleStarsFunctionality();
    for(var i = 0;i<5;i++)
    {
      if(i<stars)
      {
        jsx_stars.push(<div key={i} className='star-small h-10 ml-0.5'/>);
      }
      else
      {
        jsx_stars.push(<div key={i} className='empty_star-small h-10 ml-0.5' />);
      }
    }

    return jsx_stars;
  }


  return<>
  <div >
  <Link to={"/product/" + data.id}>
    <div className='pb-2 mt-20 w-full border border-1 border-gray-100 h-[450px]'>
      <div>
          <div className='w-full h-[300px] m-0 py-10' style={{ backgroundImage:"url("+ productsImages.image +")",backgroundPosition:"center",backgroundSize:"contain",backgroundRepeat:"no-repeat"}}>

            </div>
            {/* <img src={data?.image ? "data:image/png;base64," + data?.image : img} className=' w-full h-[100px] ' />         */}
          </div>
          <div className='p-1 '>
            <div className=' max-h-[70px] overflow-hidden '>
              <p className='text-blue-950 text-md hover:text-red-700 cursor-pointer hover:underline text-center '>
                {data.name}
              </p>
            </div>

          <div className='flex text-center m-auto self-center mt-2 justify-center'>
            <div className='flex'>
            {getStarts()}
            <span className='ml-1 text-blue-950 hover:text-red-700 cursor-pointer hover:underline text-[12px] font-medium'>{data.comments.length}</span>
            </div>

          </div>
          <div className='flex justify-center'>
            <p className='text-[20px] text-red-700 font-medium'>$ {data.price}</p>
          </div>

        </div>
      </div>
    </Link>
  </div>
  </>
}


const PageWithOptions = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);


  const filters = {
    min_price: 50, 
    max_price: 100, 
    stars: 5, 
  };


  const { data, isSuccess, error } = useGetProductsQuery();



  const { data: categories, isSuccess: isSuccessCategory } = useGetMainCategoriesQuery();
  const [getSubcategories, { }] = apiCategorySlice.useGetAllSubcategoriesByCategoryIdMutation();

  const [getProductsByCategory, { }] = apiProductSlice.useGetProductsByCategoryIdMutation();

  var request:any=[];
  data?.payload?.forEach((data:any) => {
    request.push({id:data.id});
  });

  const { data: imagesLinks, isSuccess: isSuccessImagesLinks } = apiProductSlice.useGetLinksForProductByProductsIdsQuery(request) as {
    data: ImageLink[];
    isSuccess: boolean;
  };;  

  console.log(imagesLinks);

  const navigate = useNavigate();

  const getSearchParams = () => {
    return new URLSearchParams(window.location.search);
  };

  var [categoryId, setcategoryId] = useState(getSearchParams().get('id'));




  var [categoriesToView, setCategoriesToView] = useState([]);
  var [products, setProducts] = useState([]);

  var [categoriesSequence, setCategoriesSequence] = useState<categorySequence[]>([]);
  var url = `/products?category=${encodeURIComponent("")}`;

  // console.log("products");
  // console.log(products);


  useEffect(()=>{
    if(categories)
      setCategoriesToView(categories?.payload);

    // console.log("categoriesToView");
    // console.log(categoriesToView);



    // const category = searchParams.get('category');
    getProducts();
    // setProducts();

  }, [categories, categoryId])

  

  const getProducts = async () => {
    var id = parseInt(getSearchParams().get('id')!);

    if (!Number.isInteger(id)) {
      id = -1;
    }

    let response: any = await getProductsByCategory({ id: id });

    // console.log(categoryId);
    // console.log("RESPONSE:");
    // console.log(response.data.payload);

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

      <div className='whitespace-nowrap pl-2 pr-2 mt-2'>

        <div>
          <h1 className='text-[30px] font-bold'>
            Best Sellers
          </h1>
        </div>

        <div className='ml-3 mt-10'>
          <div className='font-medium text-sm cursor-pointer'>Filters</div>

          <div className='ml-1 text-sm '>
              <div className=' cursor-pointer ' >Price</div>
              <div className=''>
                <input id='min-price'
                className='border w-8 mr-1 outline-none rounded-md p-1 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent' type='number'></input>
                <span>-</span>
                <input id='max-price' className='border w-8 ml-1 outline-none rounded-md p-1 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent' type='number'></input>
                <button className=' self-center absolute ml-2 border p-1.5'>
                    <img className='h-4 self-center ' src={search}></img>
                </button>
              </div>
          </div>

         
        </div>
      </div>


      <div className='grid grid-cols-5 gap-2 pr-44 pl-24 w-full'>

        {/* grid */}


        {products?.map((product: Product, id: number) => {
          const b: Product = product;
          return <div key={id}>{<Product_Component  data={b} productsImages={imagesLinks?.find((img:ImageLink)=>img.productId==product.id)!} />}</div> })}

      </div>
    </div>
  )
}

export default PageWithOptions