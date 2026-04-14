import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { STOCK_API_URL } from "../config.js";
import "./StockDetailsPage.css";

const emptyForm = {
  stockId: "",
  itemName: "",
  category: "",
  quantity: "",
  supplierName: "",
  supplierContact: "",
  purchasePrice: "",
  dateReceived: "",
  salesPrice: "",
  time: "",
};

export default function StockDetailsPage() {
  const [form, setForm] = useState(emptyForm);
  const [rows, setRows] = useState([]);

  const fetchAll = async () => {
    try {
      const res = await fetch(STOCK_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ load: "fetch" }),
      });
      const json = await res.json();
      if (json.data) setRows(json.data);
    } catch (e) {
      console.error("Error fetching data:", e);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const setField = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const submitForm = async (e) => {
    e.preventDefault();
    const payload = {
      stock: form.stockId,
      item: form.itemName,
      category: form.category,
      quantity: form.quantity,
      name: form.supplierName,
      number: form.supplierContact,
      sp: form.purchasePrice,
      date: form.dateReceived,
      sales: form.salesPrice,
      time: form.time,
      load: "submit",
    };
    try {
      await fetch(STOCK_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      window.alert("Stock details submitted successfully!");
      setForm(emptyForm);
      fetchAll();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="page-stock-details">
      <div id="homeSymbol">
        <Link to="/" title="Go to Home">
          <i className="fas fa-home" />
        </Link>
      </div>

      <section id="HomePageSection">
        <img
          id="logoImage"
          src="/Interiors/logo.sr1-removebg-preview.png"
          alt="Logo"
        />
        <div id="slogan">Works & Sales</div>

        <div className="container">
          <div className="form-container">
            <form id="stock-charges" onSubmit={submitForm}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="stock-id">Stock Id</label>
                  <input
                    type="number"
                    id="stock-id"
                    className="input"
                    required
                    value={form.stockId}
                    onChange={setField("stockId")}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="item-name">Item Name</label>
                  <input
                    type="text"
                    id="item-name"
                    className="input"
                    required
                    value={form.itemName}
                    onChange={setField("itemName")}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <input
                    type="text"
                    id="category"
                    className="input"
                    required
                    value={form.category}
                    onChange={setField("category")}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="quantity">Quantity</label>
                  <input
                    type="number"
                    id="quantity"
                    className="input"
                    required
                    value={form.quantity}
                    onChange={setField("quantity")}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="supplier-name">Supplier Name</label>
                  <input
                    type="text"
                    id="supplier-name"
                    className="input"
                    required
                    value={form.supplierName}
                    onChange={setField("supplierName")}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="supplier-contact">Supplier Contact</label>
                  <input
                    type="number"
                    id="supplier-contact"
                    className="input"
                    required
                    value={form.supplierContact}
                    onChange={setField("supplierContact")}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="purchase-price">Purchase Price</label>
                  <input
                    type="number"
                    id="purchase-price"
                    className="input"
                    required
                    value={form.purchasePrice}
                    onChange={setField("purchasePrice")}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="date-received">Date Received</label>
                  <input
                    type="date"
                    id="date-received"
                    className="input"
                    required
                    value={form.dateReceived}
                    onChange={setField("dateReceived")}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="sales-price">Sales Price</label>
                  <input
                    type="number"
                    id="sales-price"
                    className="input"
                    required
                    value={form.salesPrice}
                    onChange={setField("salesPrice")}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="expiry-time">Time</label>
                  <input
                    type="time"
                    id="expiry-time"
                    className="input"
                    required
                    value={form.time}
                    onChange={setField("time")}
                  />
                </div>
              </div>
              <div className="buttons">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
                <button
                  type="button"
                  id="cancel"
                  onClick={() => setForm(emptyForm)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Stock ID</th>
                  <th>Item Name</th>
                  <th>Category</th>
                  <th>Quantity</th>
                  <th>Supplier Name</th>
                  <th>Supplier Contact</th>
                  <th>Purchase Price</th>
                  <th>Date Received</th>
                  <th>Sales Price</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((item) => (
                  <tr key={`${item.stockid}-${item.itemname}-${item.time}`}>
                    <td>{item.stockid}</td>
                    <td>{item.itemname}</td>
                    <td>{item.category}</td>
                    <td>{item.quantity}</td>
                    <td>{item.suppliername}</td>
                    <td>{item.suppliercontact}</td>
                    <td>{item.purchaseprice}</td>
                    <td>{item.datereceived}</td>
                    <td>{item.salesprice}</td>
                    <td>{item.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
