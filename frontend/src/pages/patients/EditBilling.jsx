import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BillingForm from "./BillingForm";
import api from "../../api/axios";

export default function EditBilling() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bill, setBill] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    api.get(`/billing/${id}`).then(res => setBill(res.data.data));
  }, [id]);

  const update = async (data) => {
    setSubmitting(true);
    await api.put(`/billing/${id}`, data);
    navigate("/billinglist");
  };

  if (!bill) return <div>Loading...</div>;

  return <BillingForm initial={bill} onSubmit={update} submitting={submitting} />;
}
