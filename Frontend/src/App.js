import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from "../src/pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/Home/Home"
import Logout from "./pages/Logout/Logout"
import Sailer from "./pages/Seller/Seller"
import RegisterSeller from "./pages/RegisterSeller/RegisterSeller";
import { useSelector } from "react-redux";
import Addproduct from "./pages/AddProduct/Addproduct";
import ProdbyCate from "./pages/ProductByCategory/ProdbyCate";
import Product from "./pages/Product/Product";
import Cart from "./pages/Cart/Cart";
import Demo from "./pages/AddProduct/demo"
import YourOrder from "./pages/YourOrders/YourOrder";
function App() {
  const {currentUser}=useSelector((state)=>state.user);
  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route index="/" element={<Home/>}></Route>
          <Route path="/login" element={currentUser?currentUser.isSailer?<Sailer/>:<Home/>:<Login/>} ></Route>
          <Route path="/register" element={<Register/>} ></Route>
          <Route path="/cart" element={<Cart/>} ></Route>
          <Route path="/products/:cate" element={<ProdbyCate/>} ></Route>
          <Route path="/product/:id" element={<Product/>} ></Route>
          <Route path="/registerSeller" element={currentUser?currentUser.isSailer?<Sailer/>:<Home/>:<RegisterSeller/>} ></Route>
          <Route path="/seller" element={currentUser?currentUser.isSailer?<Sailer/>:<Home/>:<Home/>}></Route>
          <Route path="/addproduct" element={<Addproduct/>}></Route>
          <Route path="/logout" element={<Logout/>} ></Route>
          <Route path="/yourorders" element={currentUser?<YourOrder/>:<Home/>} ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
