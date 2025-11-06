import { Link } from "react-router-dom";
import api from "../../api/axios";
import useCachedFetch from "../../hooks/useCachedFetch";

export default function CourseList() {
  const { data: courses = [], setData } = useCachedFetch("/courses", "courses_cache");

  const deleteCourse = async (id) => {
    if (!window.confirm("Delete this course?")) return;

    await api.delete(`/courses/${id}`);

    const updatedList = courses.filter(c => c.id !== id);
    setData(updatedList);
    localStorage.setItem("courses_cache", JSON.stringify(updatedList));
  };

  return (
    <div className="page-content">

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="fw-semibold text-primary">Courses</h3>
        <Link className="btn btn-primary" to="/courses/create">
          + Add Course
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-striped table-hover text-center shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Code</th>
              <th>Name</th>
              <th>Credit</th>
              <th style={{ width: "130px" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {courses.length > 0 ? (
              courses.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.code}</td>
                  <td>{c.name}</td>
                  <td>{c.credit || "-"}</td>

                  <td className="text-center">
                    <div className="btn-group" role="group">

                      <Link
                        to={`/courses/${c.id}/edit`}
                        className="btn btn-sm btn-outline-warning"
                        title="Edit Course"
                      >
                        <i className="bi bi-pencil-square"></i>
                      </Link>

                      <button
                        onClick={() => deleteCourse(c.id)}
                        className="btn btn-sm btn-outline-danger"
                        title="Delete Course"
                      >
                        <i className="bi bi-trash3"></i>
                      </button>

                    </div>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-muted py-3">No courses found.</td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

    </div>
  );
}
