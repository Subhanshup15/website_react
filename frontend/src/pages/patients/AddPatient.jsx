import * as React from "react";
import { useNavigate } from "react-router-dom";
import PatientForm from "./PatientForm";
import api from "../../api/axios";

export default function AddPatient() {
  const [submitting, setSubmitting] = React.useState(false);
  const navigate = useNavigate();

  const save = async (payload) => {
    setSubmitting(true);
    try {
      await api.post("/patients", payload);
      navigate("/patients");
    } catch (e) {
      alert("Failed to create patient");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-semibold">Add Patient</h2>
      <PatientForm onSubmit={save} submitting={submitting} />
    </div>
  );
}
