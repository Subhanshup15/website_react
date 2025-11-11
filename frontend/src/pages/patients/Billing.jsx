import React, { useState, useEffect } from "react";
import api from "../../api/axios";

export default function Billing() {
  const [patients, setPatients] = useState([]);
  const [data, setData] = useState({ patient_id: "", amount: "", discount: "" });

  useEffect(() => {
    api.get("/patients").then((res) => {
      setPatients(res.data.data); // ✅ Corrected
    });
  }, []);

  const change = (e) => setData({ ...data, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/billing/create", data);
      alert(res.data.message || "Bill Created Successfully");
      setData({ patient_id: "", amount: "", discount: "" }); // ✅ Clear form
    } catch (err) {
      alert("Error creating bill");
      console.log(err);
    }
  };

  return (
    <div className="container mt-4 col-md-6">
      <h3 className="mb-3">Generate Bill</h3>
      <form onSubmit={submit}>
        <select
          name="patient_id"
          className="form-control mb-3"
          value={data.patient_id}
          onChange={change}
          required
        >
          <option value="">Select Patient</option>
          {patients.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        <input
          name="amount"
          type="number"
          className="form-control mb-3"
          placeholder="Amount"
          value={data.amount}
          onChange={change}
          required
        />

        <input
          name="discount"
          type="number"
          className="form-control mb-3"
          placeholder="Discount"
          value={data.discount}
          onChange={change}
        />

        <button className="btn btn-primary w-100">Generate Bill</button>
      </form>
    </div>
  );
}
