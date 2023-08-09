import React, { useEffect } from 'react';
// import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Profile from './components/Profile/profile';
import Main from './components/InteractionWithProducts/Main';
import OneProduct from './components/InteractionWithProducts/OneProduct';

import AdminSite from './components/Admin/AdminSite';
import CreateProduct from './components/Admin/CreateProduct';
import CreateCategory from './components/Admin/CreateCategory';
import Orders from './components/BuyProduct/Orders';


import Payment from './components/Profile/Payment';
import Address from './components/Profile/Address';
import Order from './components/Profile/Order';
import EditProfile from './components/Profile/EditProfile';
import Player from './components/Player/Player';
import LoginScreen from './components/Auth/Login';
import { useDispatch, useSelector } from 'react-redux';
import { GetAccessToken } from './api/jwtDecodeToken';
import { AuthUser } from './features/user/user-slice';

import CreateOptions from './components/Options/CreateOptions';
import GetOptionsByCategory from './components/Options/GetOptionsByCategory';
import PageWithOptions from './components/Options/FindProductsPage';
import ForgotPasswordScreen from './components/Auth/Forgot-Password';
import ResetPasswordScreen from './components/Auth/Reset-Password';
import OtpPage from './components/Auth/Otp-page';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import CreateGenre from './components/Player/CreateGenre';
import CreateTrack from './components/Player/CreateTrack';
import Registration from './components/Auth/Registration';
import MusicHeader from './components/Player/MusicHeader';
import BuyProduct from './components/BuyProduct/BuyProduct';
import OrdersList from './components/BuyProduct/OrdersList';
import SuccessfulPurchase from './components/BuyProduct/SuccessfulPurchase';


import AdminHeader from './components/Admin_Page/admin-header';
import AdminSidebar from './components/Admin_Page/admin-sidebar';
import AdminHomePage from './components/Admin_Page/adminhomepage';
import UsersTable from './components/Admin_Page/users-table';
import ShopsTable from './components/Admin_Page/shops-table';
import ProductsTable from './components/Admin_Page/products-table';
import OrdersTable from './components/Admin_Page/orders-table';
import CustomersTable from './components/Admin_Page/customers-table';
import { ProductList } from './components/Admin/ProductList';
import { CategoryList } from './components/Admin/CategoryList';
import { CompanyList } from './components/Admin/CompanyList';
import TempProfile from './components/Temp/TempProfile';
import BecomeASeller from './components/Temp/BecomeASeller';
import ViewMyOrders from './components/Temp/ViewMyOrders';
import CardsSite from './components/Temp/CardsSite';
import AddressSite from './components/Temp/AddressSite';
import MyCompany from './components/Temp/MyCompany';
import OrdersForSeller from './components/Temp/OrdersForSeller';
import MusicFooter from './components/Player/MusicFooter';
import Home from './components/Player/Home';
import History from './components/Player/History';
import Likes from './components/Player/Likes';
import MyTracks from './components/Player/MyTracks';


const App: React.FC = () => {
  var dispatch = useDispatch();
  const token = GetAccessToken();

  var isAuth = useSelector((state: any) => state.user.isAuth);


  useEffect(() => {
    if (token) {
      dispatch(AuthUser(token));
    }
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/music' element={<><MusicHeader /><div className="flex flex-col bg-almostBlackColor" style={{ minHeight: "100vh" }}><Player/></div><MusicFooter/></>} >
          <Route path='home' element={<Home />} />
          <Route path='history' element={<History />} />
          <Route path='likes' element={<Likes />} />
          <Route path='mytracks' element={<MyTracks />} />
          <Route path='createGenre' element={<CreateGenre />} />
          <Route path='createTrack' element={<CreateTrack />} />
        </Route>

          {/* <Route path='/admin'
          element={
            <>
              <div className="flex flex-col" style={{ minHeight: "100vh", background: "rgb(231, 238, 240)" }}>
                <AdminHeader />
                <AdminSidebar></AdminSidebar>
                <Outlet />
              </div>
            </>}>
          <Route path='userstable' element={<UsersTable />} />
          <Route path='shopstable' element={<ShopsTable />} />
          <Route path='producttable' element={<ProductsTable />} />
          <Route path='orderstable' element={<OrdersTable />} />
          <Route path='customerstable' element={<CustomersTable />} />
          <Route path='products' element={<CreateProduct />} />
          <Route path='categories' element={<CreateCategory />} />
          </Route> */}

        <Route path='/'
          element={
            <>
              <div className="flex flex-col" style={{ minHeight: "100vh", background: "rgb(231, 238, 240)" }}>

                <Outlet />
              </div>
            </>}>

          <Route path="login" element={<LoginScreen />} />
          <Route path="forgotpassword" element={<ForgotPasswordScreen />} />
          <Route path="otppage" element={<OtpPage />} />
          
          <Route path="resetpassword/" element={<ResetPasswordScreen />} />
          <Route path="registration" element={<Registration />} />

        </Route>



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
                <Route path='' element={<><AdminSite/></>}>
                  <Route path='products' element={<ProductList/>} />
                  <Route path='categories' element={<CategoryList/>} />
                  <Route path='companies' element={<CompanyList/>} />
                </Route>
              <Route path='create'>
                <Route path='products' element={<CreateProduct/>} />
                <Route path='categories' element={<CreateCategory/>} />
              </Route>
            </Route> 





          <Route path='orders' element={<Orders />} />
          <Route path='successful-purchase' element={<SuccessfulPurchase />} />

          <Route path="product/:productId" element={<OneProduct />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="/payment" element={<Payment />} />
          <Route path="/address" element={<Address />} />
          <Route path="/proforder" element={<Order />} />
          <Route path="/editprofile" element={<EditProfile />} />

          <Route path='/tempProfile' element={<TempProfile/>} >
            <Route path='becomeASeller' element={<BecomeASeller/>} />
            <Route path='viewMyOrders' element={<ViewMyOrders/>} />
            <Route path='cardsSite' element={<CardsSite/>} />
            <Route path='addressSite' element={<AddressSite/>} />
            <Route path='myCompany' element={<MyCompany/>} />
            <Route path='ordersForSeller' element={<OrdersForSeller/>} />
          </Route>

          <Route path="/findProducts" element={<PageWithOptions />}>

          </Route>

          <Route path='/get-options-by-category/:categoryId' element={<GetOptionsByCategory />}>

          </Route>




          <Route path="/products" element={<><Main /></>} >
            <Route path="products" element={<Profile />} />
          </Route>

          <Route path='createOptions' element={<CreateOptions />} />

          <Route path='/orders' element={<Orders />} />


          <Route path="product/:productId" element={<OneProduct />} />
          <Route path="profile" element={<Profile />} />



        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;