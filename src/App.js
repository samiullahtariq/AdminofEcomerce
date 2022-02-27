import "./App.css";
import Home from "./pages/Home/Home";
import { Routes, Route } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";

function App() {

  const admin = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.isAdmin


  return (
      <>
{/* //only admin can see the other pages */}
        <Routes>
          {/* home route full route is http://localhost:3000/ */}
          {admin  && <Route path="/" element={<Home/>}/>}
          {/* full route is http://localhost:3000/users */}
          {admin  &&<Route path="/users" element={<UserList/>}/>}
          {/* full route is http://localhost:3000/user/:userId */}
          {admin  &&<Route path="/user/:userId" element={<User />}/>}
          {/* full route is http://localhost:3000/newUser */}
          {admin  &&<Route path="/newUser" element={<NewUser />}/>}
          {/* full route is http://localhost:3000/products */}
          {admin  &&<Route path="/products" element={<ProductList />}/>}
          {/* full route is http://localhost:3000/product/:productId */}
          {admin  &&<Route path="/product/:productId" element={<Product />}/>}
          {/* full route is http://localhost:3000/newproduct */}
          {admin  &&<Route path="/newproduct" element={<NewProduct  />}/>}
          {/* full route is http://localhost:3000/login */}
          <Route path="/login" element={<Login/>} />

        </Routes>
      
      </>
  );
}

export default App;
