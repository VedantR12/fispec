import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import History from "./pages/History";
import Account from "./pages/Account";
import Login from "./pages/Login";
import Product from "./pages/Product";

import { useAuth } from "./context/AuthContext";

function App() {

  const { user } = useAuth();

  if (!user) {
    return <Login />;
  }

  return (
    <BrowserRouter>

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search/:query" element={<SearchResults />} />
        <Route path="/product/:barcode" element={<Product />} />
        <Route path="/history" element={<History />} />
        <Route path="/account" element={<Account />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;