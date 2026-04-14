/** Backend endpoint used by stock + bill flows (PHP). Override in .env with VITE_STOCK_API_URL */
export const STOCK_API_URL =
  import.meta.env.VITE_STOCK_API_URL || "/Interiors/stockdetails.php";
