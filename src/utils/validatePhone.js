/** Indian mobile: 10 digits (6–9…), or +91 / 91 / 0 prefix. Matches server-side rules. */
export function isValidIndianPhone(phone) {
  if (typeof phone !== "string") return false;
  const d = phone.replace(/\D/g, "");
  if (d.length === 10 && /^[6-9]\d{9}$/.test(d)) return true;
  if (d.length === 12 && /^91[6-9]\d{9}$/.test(d)) return true;
  if (d.length === 11 && /^0[6-9]\d{9}$/.test(d)) return true;
  return false;
}
