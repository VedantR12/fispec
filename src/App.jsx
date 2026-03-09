import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import History from "./pages/History";
import Account from "./pages/Account";
import Login from "./pages/Login";
import Product from "./pages/Product";

function Layout() {

  const location = useLocation();

  const hideNavbar = location.pathname === "/login";

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