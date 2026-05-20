import { BrowserRouter, Routes, Route } from "react-router-dom"
import DefaultLayout from "./layouts/DefaultLayout"
import Home from "./pages/Home"
import Products from "./pages/Products"
import WishList from "./pages/WishList"
import Comparator from "./pages/Comparator"

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DefaultLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/wishlist" element={<WishList />} />
            <Route path="/comparator" element={<Comparator />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
