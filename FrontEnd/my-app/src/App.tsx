import React, { useEffect } from 'react';
// import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';
import OneProduct from './components/OneProduct';
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
import ForgotPasswordScreen from './components/Auth/Forgot-Password';
import ResetPasswordScreen from './components/Auth/Reset-Password';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';

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


          <Route path='admin' element={<Outlet />}>
            <Route path='' element={<><AdminSite /></>} />
            <Route path='create'>
              <Route path='products' element={<CreateProduct />} />
              <Route path='categories' element={<CreateCategory />} />
            </Route>
          </Route>


          <Route path="/products" element={<><Main /></>} >
            <Route path="products" element={<Profile />} />
          </Route>

          <Route path='/player' element={<Player />}>

          </Route>

          <Route path='orders' element={<Orders />} />
          <Route path="product/:productId" element={<OneProduct />} />
          <Route path="profile" element={<Profile />} />
          <Route path="login" element={<LoginScreen />} />
          <Route path="forgotpassword" element={<ForgotPasswordScreen />} />
          {/* <Route path="resetpassword/:userId" element={<ResetPasswordScreen />} /> */}
          <Route path="resetpassword/" element={<ResetPasswordScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
