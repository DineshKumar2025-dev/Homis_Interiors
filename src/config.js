/** Backend endpoint used by stock + bill flows (PHP). Override in .env with VITE_STOCK_API_URL */
export const STOCK_API_URL =
  import.meta.env.VITE_STOCK_API_URL || "/Interiors/stockdetails.php";

/** EmailJS — contact form only; set all three in `.env` (Vite exposes `VITE_*` to the client) */
export const EMAILJS_PUBLIC_KEY =
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "";
export const EMAILJS_SERVICE_ID =
  import.meta.env.VITE_EMAILJS_SERVICE_ID || "";
export const EMAILJS_TEMPLATE_ID =
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "";

export function isEmailJsConfigured() {
  return Boolean(
    EMAILJS_PUBLIC_KEY && EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID
  );
}
