import { useState } from "react";
import emailjs from "@emailjs/browser";
import {
  EMAILJS_PUBLIC_KEY,
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID,
  isEmailJsConfigured,
} from "../config.js";
import { isValidEmail } from "../utils/validateEmail.js";
import { isValidIndianPhone } from "../utils/validatePhone.js";
import "./ContactForm.css";

/**
 * @param {object} props
 * @param {boolean} [props.compact] - hide title + lead (e.g. inside a modal that has its own heading)
 * @param {string} [props.idPrefix] - prefix input ids to avoid duplicates (e.g. "hero-")
 */
export default function ContactForm({ compact = false, idPrefix = "" }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const pid = (suffix) => `${idPrefix}${suffix}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    setEmailError("");
    setPhoneError("");

    const n = name.trim();
    const em = email.trim();
    const p = phone.trim();
    const a = address.trim();
    const m = message.trim();

    if (!n || !em || !p || !a) {
      setStatus({
        type: "error",
        text: "Please fill in your name, email, phone, and address.",
      });
      return;
    }

    if (!isValidEmail(em)) {
      setEmailError("Enter a valid email address.");
      return;
    }

    if (!isValidIndianPhone(p)) {
      setPhoneError(
        "Enter a valid Indian mobile (10 digits, e.g. 9876543210 or +91 9876543210)."
      );
      return;
    }

    if (!isEmailJsConfigured()) {
      setStatus({
        type: "error",
        text: import.meta.env.DEV
          ? "Add VITE_EMAILJS_PUBLIC_KEY, VITE_EMAILJS_SERVICE_ID, and VITE_EMAILJS_TEMPLATE_ID to `.env`."
          : "Unable to send right now. Please reach us on WhatsApp.",
      });
      return;
    }

    setSubmitting(true);
    try {
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: n,
          email: em,
          phone: p,
          address: a,
          message: m || "—",
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      );
      if (result.status !== 200) {
        throw new Error(result.text || "Send failed");
      }

      setStatus({
        type: "ok",
        text: "Thank you — we will get back to you soon.",
      });
      setName("");
      setEmail("");
      setPhone("");
      setAddress("");
      setMessage("");
    } catch (err) {
      const msg =
        typeof err?.text === "string"
          ? err.text
          : err instanceof Error
            ? err.message
            : "";
      setStatus({
        type: "error",
        text:
          msg ||
          "Could not send. Try again or reach us on WhatsApp.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {!compact && (
        <>
          <h2 className="contact-form__title" id="shop-contact-title">
            Contact us
          </h2>
          <p className="contact-form__lead">
            Send your details and we will reply by phone or email.
          </p>
        </>
      )}
      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <div className="contact-form__field">
          <label htmlFor={pid("contact-name")}>Name</label>
          <input
            id={pid("contact-name")}
            name="name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            maxLength={120}
          />
        </div>
        <div
          className={`contact-form__field${emailError ? " contact-form__field--error" : ""}`}
        >
          <label htmlFor={pid("contact-email")}>Email</label>
          <input
            id={pid("contact-email")}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError("");
            }}
            required
            maxLength={254}
          />
          {emailError ? (
            <p className="contact-form__hint" role="alert">
              {emailError}
            </p>
          ) : null}
        </div>
        <div
          className={`contact-form__field${phoneError ? " contact-form__field--error" : ""}`}
        >
          <label htmlFor={pid("contact-phone")}>Phone</label>
          <input
            id={pid("contact-phone")}
            name="phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            placeholder="e.g. 9876543210 or +91 9876543210"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              setPhoneError("");
            }}
            required
          />
          {phoneError ? (
            <p className="contact-form__hint" role="alert">
              {phoneError}
            </p>
          ) : null}
        </div>
        <div className="contact-form__field">
          <label htmlFor={pid("contact-address")}>Address</label>
          <input
            id={pid("contact-address")}
            name="address"
            type="text"
            autoComplete="street-address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            maxLength={500}
          />
        </div>
        <div className="contact-form__field">
          <label htmlFor={pid("contact-message")}>
            Message <span className="contact-form__optional">(optional)</span>
          </label>
          <textarea
            id={pid("contact-message")}
            name="message"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={2000}
          />
        </div>
        <button
          type="submit"
          className="contact-form__submit"
          disabled={submitting}
        >
          {submitting ? "Sending…" : "Send"}
        </button>
        {status ? (
          <p
            className={`contact-form__status contact-form__status--${status.type === "ok" ? "ok" : "err"}`}
            role="status"
          >
            {status.text}
          </p>
        ) : null}
      </form>
    </>
  );
}
