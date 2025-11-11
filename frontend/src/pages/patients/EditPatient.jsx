import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import PatientForm from "./PatientForm";
import api from "../../api/axios";

export default function EditPatient() {
  const { id } = useParams();
  const [loading, setLoading] = React.useState(true);
  const [submitting, setSubmitting] = React.useState(false);
  const [patient, setPatient] = React.useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    (async () => {
      try {
        const res = await api.get(`/patients/${id}`);
        setPatient(res.data?.data || res.data);
      } catch (error) {
        alert("Patient not found");
        navigate("/patients");
      } finally {
        setLoading(false);
      }
    })();
  }, [id, navigate]);

  const update = async (payload) => {
    setSubmitting(true);
    try {
      await api.put(`/patients/${id}`, payload);
      navigate("/patients");
    } catch (e) {
      alert("Failed to update patient. Check required fields.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-4">Loading patient...</div>;
  if (!patient) return <div className="p-4 text-red-500">Patient not found</div>;

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-semibold">Edit Patient</h2>
      <PatientForm initial={patient} onSubmit={update} submitting={submitting} />
    </div>
  );
}
