/** Basic format check for contact forms (not full RFC 5322). */
export function isValidEmail(email) {
  if (typeof email !== "string") return false;
  const e = email.trim();
  if (e.length < 3 || e.length > 254) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}
