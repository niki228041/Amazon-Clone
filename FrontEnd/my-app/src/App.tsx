import React from 'react';
import { Route,Router,Routes,BrowserRouter,Outlet, Link} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';
import OneProduct from './components/OneProduct';
import Profile from './components/Profile';
import LoginScreen from './components/Auth/Login/Login';
import AdminSite from './components/AdminSite';

function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='*' element={
          <>
          <div className='flex flex-col' style={{minHeight:"120vh"}}>
            <Header/>
            {/* <div style={{height:"100vh"}}> */}
              <Outlet/>
            {/* </div> */}
            <div className='mt-auto'>
              <Footer/>
            </div>
          </div>
          
          </>
        }>
          <Route path='admin' element={<AdminSite/>} />

          <Route path='products' element={<Main/>}>
          </Route>
          <Route path="product/:productId" element={<OneProduct/>} />
          <Route path="profile" element={<Profile/>} />
          <Route path="login" element={<LoginScreen/>} />

        </Route>

    </Routes>
    </BrowserRouter>

  );
}

export default App;
