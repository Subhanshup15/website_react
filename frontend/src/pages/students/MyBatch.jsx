import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function MyBatch() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/student/batch").then(res => setData(res.data));
  }, []);

  if (!data) return null;

  return (
    <div className="container p-4">
      <h3>My Batch: {data.batch.name}</h3>
      <p><b>Year:</b> {data.batch.year}</p>

      <h5 className="mt-3">Classmates</h5>
      <ul>
        {data.batch.students.map(s => <li key={s.id}>{s.name}</li>)}
      </ul>
    </div>
  );
}
