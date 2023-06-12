import React from 'react';
import { Route,Router,Routes,BrowserRouter,Outlet, Link} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';
import OneProduct from './components/OneProduct';
import Profile from './components/Profile';
import LoginScreen from './components/Auth/Login/Login';
import AdminSite from './components/Admin/AdminSite';
import CreateProduct from './components/Admin/CreateProduct';
import CreateCategory from './components/Admin/CreateCategory';

const App:React.FC =()=> {
  return (
    <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <>
                <div className="flex flex-col" style={{ minHeight: "120vh" }}>
                  <Header />
                  <div style={{ flex: "1" }}>
                    <Outlet />
                  </div>
                  <Footer />
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
            <Route path="product/:productId" element={<OneProduct />} />
            <Route path="profile" element={<Profile />} />
            <Route path="login" element={<LoginScreen />} />
          </Route>
        </Routes>
    </BrowserRouter>

  );
}

export default App;
