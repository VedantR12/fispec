import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { App as CapacitorApp } from "@capacitor/app";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import History from "./pages/History";
import Account from "./pages/Account";
import Login from "./pages/Login";
import Product from "./pages/Product";

function Layout() {

  const location = useLocation();

  const navigate = useNavigate();

  const lastBackPress = useRef(0);
const [showExitToast, setShowExitToast] = useState(false);

  const hideNavbar = location.pathname === "/login";

  useEffect(() => {
  const listener = CapacitorApp.addListener("backButton", () => {

    if (window.location.pathname !== "/") {
      window.history.back();
      return;
    }

    const now = Date.now();

    if (now - lastBackPress.current < 2000) {
      CapacitorApp.exitApp();
      return;
    }

    lastBackPress.current = now;

    setShowExitToast(true);

    setTimeout(() => {
      setShowExitToast(false);
    }, 2000);

  });

  return () => {
    listener.then((l) => l.remove());
  };
}, []);

  return (

    <>
      {!hideNavbar && <Navbar />}

      <Routes>

        {/* PUBLIC PAGE */}
        <Route path="/" element={<Home />} />

        {/* LOGIN PAGE */}
        <Route path="/login" element={<Login />} />

        {/* PRODUCT FEATURES */}
        <Route path="/search/:query" element={<SearchResults />} />
        <Route path="/product/:barcode" element={<Product />} />
        <Route path="/history" element={<History />} />
        <Route path="/account" element={<Account />} />

      </Routes>
      {showExitToast && (
  <div className="exit-toast">
    Press back again to exit
  </div>
)}
    </>

  );

}

function App() {

  return (

    <BrowserRouter>
      <Layout />
    </BrowserRouter>

  );

}

export default App;