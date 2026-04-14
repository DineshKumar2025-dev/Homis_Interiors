import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(root, "Interiors/ceiling.html"), "utf8");
const m = html.match(/<style>([\s\S]*?)<\/style>/);
if (!m) throw new Error("No style block");
let c = m[1].trim();
c = c.replace(/url\('([^/'][^']*)'\)/g, "url('/Interiors/$1')");
const out = path.join(root, "src/pages/CeilingPage.css");
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, c);
console.log("Wrote", out);
