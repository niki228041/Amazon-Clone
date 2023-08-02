import React from 'react';
import { Route, Router, Routes, BrowserRouter, Outlet, Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';
import OneProduct from './components/OneProduct';
import Profile from './components/Profile/profile';
import LoginScreen from './components/Auth/Login/Login';
import AdminSite from './components/Admin/AdminSite';
import CreateProduct from './components/Admin/CreateProduct';
import CreateCategory from './components/Admin/CreateCategory';
import Orders from './components/Orders';
import Payment from './components/Profile/Payment';
import Address from './components/Profile/Address';
import Order from './components/Profile/Order';
import EditProfile from './components/Profile/EditProfile';
import AdminHeader from './components/Admin_Page/admin-header';
import AdminSidebar from './components/Admin_Page/admin-sidebar';
import AdminHomePage from './components/Admin_Page/adminhomepage';
import UsersTable from './components/Admin_Page/users-table';
import ShopsTable from './components/Admin_Page/shops-table';
import ProductsTable from './components/Admin_Page/products-table';
import OrdersTable from './components/Admin_Page/orders-table';
import CustomersTable from './components/Admin_Page/customers-table';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/admin'
          element={<>
            <div className="flex flex-col" style={{ minHeight: "120vh", background: "rgb(231, 238, 240)" }}>
              <AdminHeader />
              <AdminSidebar></AdminSidebar>
              <div style={{ flex: "1" }}>
                <Outlet />
              </div>

            </div>
          </>}>
          <Route path='userstable' element={<UsersTable />} />
          <Route path='shopstable' element={<ShopsTable />} />
          <Route path='producttable' element={<ProductsTable />} />
          <Route path='orderstable' element={<OrdersTable />} />
          <Route path='customerstable' element={<CustomersTable />} />
          <Route path='products' element={<CreateProduct />} />
          <Route path='categories' element={<CreateCategory />} />
        </Route>

        <Route
          path='/'
          element={<>
            <div className="flex flex-col" style={{ minHeight: "120vh" }}>
              <Header />
              <div style={{ flex: "1" }}>
                <Outlet />
              </div>
              <Footer />
            </div>
          </>}
        >


          {/* <Route path='/admin' element={<Outlet />}>
              <Route path='' element={<><AdminSite /></>} />
              <Route path='create'>
                <Route path='products' element={<CreateProduct />} />
                <Route path='categories' element={<CreateCategory />} />
              </Route>
            </Route> */}


          {/* <Route path="/products" element={<><Main /></>} >
                <Route path="products" element={<Profile />} />
              </Route> */}

          <Route path='orders' element={<Orders />} />
          <Route path="product/:productId" element={<OneProduct />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="login" element={<LoginScreen />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/address" element={<Address />} />
          <Route path="/proforder" element={<Order />} />
          <Route path="/editprofile" element={<EditProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>


  );
}

export default App;
