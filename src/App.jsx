import { BrowserRouter, Routes, Route } from "react-router-dom"
import DefaultLayout from "./layouts/DefaultLayout"
import Home from "./pages/Home"
import Products from "./pages/Products"
import WishList from "./pages/WishList"
import Comparator from "./pages/Comparator"
import GlobalContextProvider from "./context/GlobalContext"
import ProductDetail from "./pages/ProductDetail"
import ToastContextProvider from "./context/ToastContext"
function App() {


  return (
    <>

      <BrowserRouter>
        <GlobalContextProvider>
          <ToastContextProvider>
            <Routes>
              <Route path="/" element={<DefaultLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/wishlist" element={<WishList />} />
                <Route path="/comparator" element={<Comparator />} />
                <Route path="/products/:id" element={<ProductDetail />} />
              </Route>
            </Routes>
          </ToastContextProvider>

        </GlobalContextProvider>
      </BrowserRouter>


    </>
  )
}

export default App
