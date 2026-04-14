import { useState } from "react";
import { Link } from "react-router-dom";
import { STOCK_API_URL } from "../config.js";
import "./BillPage.css";

const initial = {
  customerName: "",
  contact: "",
  billNumber: "",
  dateTime: "",
  itemDescription: "",
  quantity: "",
  unitPrice: "",
  totalPrice: "",
};

export default function BillPage() {
  const [form, setForm] = useState(initial);
  const [receiptVisible, setReceiptVisible] = useState(false);

  const setField = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const postBill = async () => {
    const payload = {
      bill: form.billNumber,
      date: form.dateTime,
      description: form.itemDescription,
      quantity: form.quantity,
      name: form.customerName,
      number: form.contact,
      unit: form.unitPrice,
      totalprice: form.totalPrice,
      load: "bill",
    };
    try {
      await fetch(STOCK_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (e) {
      console.error(e);
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    setReceiptVisible(true);
    requestAnimationFrame(() => {
      window.print();
      postBill();
    });
  };

  const cancelForm = () => {
    setForm(initial);
    setReceiptVisible(false);
  };

  return (
    <div className="page-bill">
      <div id="homeSymbol">
        <Link to="/" title="Go to Home">
          <i className="fas fa-home" />
        </Link>
      </div>

      <section id="HomePageSection">
        <img
          id="logoImage"
          src="Interiors/logo.sr1-removebg-preview.png"
          alt="Logo"
        />
        <div id="slogan">Works & Sales</div>

        <div className="main-container">
          <div className="form-container">
            <h2>Generate Receipt</h2>
            <form onSubmit={submitForm}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="customer-name">
                    Customer Name<span className="required"> *</span>
                  </label>
                  <input
                    type="text"
                    id="customer-name"
                    className="form-control"
                    placeholder="Enter Customer Name"
                    required
                    value={form.customerName}
                    onChange={setField("customerName")}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contact">
                    Contact<span className="required"> *</span>
                  </label>
                  <input
                    maxLength={10}
                    type="number"
                    id="contact"
                    className="form-control"
                    placeholder="Enter Contact Number"
                    required
                    value={form.contact}
                    onChange={setField("contact")}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="bill-number">
                    Bill Number<span className="required"> *</span>
                  </label>
                  <input
                    maxLength={10}
                    type="number"
                    id="bill-number"
                    className="form-control"
                    placeholder="Enter Bill Number"
                    required
                    value={form.billNumber}
                    onChange={setField("billNumber")}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="date-time">
                    Date and Time<span className="required"> *</span>
                  </label>
                  <input
                    type="datetime-local"
                    id="date-time"
                    className="form-control"
                    required
                    value={form.dateTime}
                    onChange={setField("dateTime")}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="item-description">
                    Item Description<span className="required"> *</span>
                  </label>
                  <input
                    type="text"
                    id="item-description"
                    className="form-control"
                    placeholder="Enter Item Description"
                    required
                    value={form.itemDescription}
                    onChange={setField("itemDescription")}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="quantity">
                    Quantity<span className="required"> *</span>
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    className="form-control"
                    placeholder="Enter Quantity"
                    required
                    value={form.quantity}
                    onChange={setField("quantity")}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="unit-price">
                    Unit Price<span className="required"> *</span>
                  </label>
                  <input
                    type="number"
                    id="unit-price"
                    className="form-control"
                    placeholder="Enter Unit Price"
                    required
                    value={form.unitPrice}
                    onChange={setField("unitPrice")}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="total-price">
                    Total Price<span className="required"> *</span>
                  </label>
                  <input
                    type="number"
                    id="total-price"
                    className="form-control"
                    placeholder="Enter Total Price"
                    required
                    value={form.totalPrice}
                    onChange={setField("totalPrice")}
                  />
                </div>
              </div>

              <div className="btn-group">
                <button type="submit" className="btn btn-primary">
                  Generate
                </button>
                <button
                  type="button"
                  className="btn btn-cancel"
                  onClick={cancelForm}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>

          <div className="image-container">
            <img src="/Interiors/path-to-your-image.jpg" alt="" />
          </div>
        </div>

        <div
          id="receipt"
          style={{ display: receiptVisible ? "block" : "none" }}
        >
          <h3>Receipt</h3>
          <div className="receipt-details">
            Customer Name: <span>{form.customerName}</span>
          </div>
          <div className="receipt-details">
            Contact: <span>{form.contact}</span>
          </div>
          <div className="receipt-details">
            Bill Number: <span>{form.billNumber}</span>
          </div>
          <div className="receipt-details">
            Date and Time: <span>{form.dateTime}</span>
          </div>
          <div className="receipt-details">
            Item Description: <span>{form.itemDescription}</span>
          </div>
          <div className="receipt-details">
            Quantity: <span>{form.quantity}</span>
          </div>
          <div className="receipt-details">
            Unit Price: <span>{form.unitPrice}</span>
          </div>
          <div className="receipt-details">
            Total Price: <span>{form.totalPrice}</span>
          </div>
        </div>
      </section>
    </div>
  );
}
