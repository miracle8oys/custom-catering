import { UserInfo } from "firebase/auth";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import { useState } from "react";
import { defaultUserCredential, UserContext } from "./utility/userCredential";
import { onAuthStateChanged, auth } from "./utility/auth";
import CategoryProduct from "./page/CategoryProduct";
import Register from "./page/Register";
import UserCredential from "./page/UserCredential";
import DetailProduct from "./page/DetailProduct";
import UserCart from "./page/UserCart";
import FormItem from "./page/FormItem";
import AdminProduct from "./page/AdminProduct";
import AdminOrders from "./page/AdminOrders";
import AdminTransfer from "./page/AdminTransfer";
import UserTransfer from "./page/UserTransfer";
import DarkMode from "./components/DarkMode";
import Login from "./page/Login";

function App() {
  const [user, setUser] = useState<UserInfo>(defaultUserCredential);

  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      setUser(currentUser);
    }
  });

  return (
    <div className="dark:bg-gray-900 text-white min-h-screen w-screen">
      <div className="App container mx-auto px-4 md:px-12">
        <BrowserRouter>
          <DarkMode />
          <UserContext.Provider value={user}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/category/:categoryItem"
                element={<CategoryProduct />}
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/register/credential" element={<UserCredential />} />
              <Route path="/detail/:itemId" element={<DetailProduct />} />
              <Route path="/cart" element={<UserCart />} />
              <Route path="/transfer" element={<UserTransfer />} />

              {/* admin */}
              <Route path="/admin/create-item" element={<FormItem />} />
              <Route path="/admin/product-list" element={<AdminProduct />} />
              <Route path="/admin/order-list" element={<AdminOrders />} />
              <Route path="/admin/transfer-list" element={<AdminTransfer />} />
            </Routes>
          </UserContext.Provider>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
