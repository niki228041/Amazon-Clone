import React, { useEffect } from 'react';
import { Route,Router,Routes,BrowserRouter,Outlet, Link} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/InteractionWithProducts/Main';
import OneProduct from './components/InteractionWithProducts/OneProduct';
import Profile from './components/Profile';
import AdminSite from './components/Admin/AdminSite';
import CreateProduct from './components/Admin/CreateProduct';
import CreateCategory from './components/Admin/CreateCategory';
import Orders from './components/Orders';
import Player from './components/Player/Player';
import LoginScreen from './components/Auth/Login';
import { useDispatch, useSelector } from 'react-redux';
import { GetAccessToken } from './api/jwtDecodeToken';
import { AuthUser } from './features/user/user-slice';
import CreateOptions from './components/Options/CreateOptions';
import GetOptionsByCategory from './components/Options/GetOptionsByCategory';
import PageWithOptions from './components/Options/FindProductsPage';
import CreateGenre from './components/Player/CreateGenre';
import CreateTrack from './components/Player/CreateTrack';


const App:React.FC =()=> {
  var dispatch = useDispatch();
  const token = GetAccessToken();

  var isAuth = useSelector((state:any)=>state.user.isAuth);


  useEffect(()=>{
      if(token){
          dispatch(AuthUser(token));
      }
  },[])
  
  return (
    <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <>
                <div className="flex flex-col" style={{ minHeight: "180vh" }}>
                  <Header />
                    <Outlet />
                <div className='mt-auto'>

                  <Footer />
                </div>

                </div>
              </>
            }
          >


            <Route path='admin' element={<Outlet/>}>
                <Route path='' element={<><AdminSite/></>}/>
              <Route path='create'>
                <Route path='products' element={<CreateProduct/>} />
                <Route path='categories' element={<CreateCategory/>} />
              </Route>
            </Route>

          
            <Route path="/products" element={<><Main /></>} >
              <Route path="products" element={<Profile />} />
            </Route>

            <Route path="/findProducts" element={<PageWithOptions/>}>
              
            </Route>

            <Route path='/get-options-by-category/:categoryId' element={<GetOptionsByCategory/>}>

            </Route>

            <Route path='/player' >
              <Route path='' element={<Player/>} />
              <Route path='createGenre' element={<CreateGenre/>} />
              <Route path='createTrack' element={<CreateTrack/>} />
            </Route>

            <Route path='createOptions' element={<CreateOptions/>}>

            </Route>

            


            <Route path='orders' element={<Orders/>}/>
            <Route path="product/:productId" element={<OneProduct />} />
            <Route path="profile" element={<Profile />} />
            <Route path="login" element={<LoginScreen />} />
          </Route>
        </Routes>
    </BrowserRouter>

  );
}

export default App;
