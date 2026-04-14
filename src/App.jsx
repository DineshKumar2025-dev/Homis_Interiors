import { Routes, Route } from "react-router-dom";
import CeilingPage from "./pages/CeilingPage.jsx";
import ShopPage from "./pages/ShopPage.jsx";
import StockDetailsPage from "./pages/StockDetailsPage.jsx";
import BillPage from "./pages/BillPage.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<CeilingPage />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/stock" element={<StockDetailsPage />} />
      <Route path="/bill" element={<BillPage />} />
    </Routes>
  );
}
