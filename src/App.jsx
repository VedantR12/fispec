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

import { createPortal } from "react-dom";

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
      {showExitToast &&
  createPortal(
    <div
      style={{
        position: "fixed",
        left: "50%",
        bottom: "24px",
        transform: "translateX(-50%)",
        zIndex: 2147483647,
        background: "rgba(20,20,20,0.92)",
        color: "#fff",
        padding: "12px",
        borderRadius: "999px",
        fontWeight: 500,
        fontSize: "12px",
        boxShadow: "0 10px 30px rgba(0,0,0,.35)",
        pointerEvents: "none",
      }}
    >
      Press back again to exit
    </div>,
    document.body
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