import React from 'react';
import { Route,Router,Routes,BrowserRouter,Outlet, Link} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';

function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='*' element={
          <>
          <div className='flex flex-col' style={{minHeight:"100vh"}}>
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

          <Route path='products' element={<Main/>}>

          </Route>

        </Route>

    </Routes>
    </BrowserRouter>

  );
}

export default App;
