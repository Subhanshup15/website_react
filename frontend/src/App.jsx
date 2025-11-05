import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";

import AppLayout from "./layouts/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import AdminDashboard from "./pages/AdminDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";

import StudentList from "./pages/students/StudentList";
import AddStudent from "./pages/students/AddStudent";
import EditStudent from "./pages/students/EditStudent";

import TeacherList from "./pages/teachers/TeacherList";
import AddTeacher from "./pages/teachers/AddTeacher";
import EditTeacher from "./pages/teachers/EditTeacher";

import CourseList from "./pages/courses/CourseList";
import AddCourse from "./pages/courses/AddCourse";
import EditCourse from "./pages/courses/EditCourse";

import BatchList from "./pages/batches/BatchList";
import AddBatch from "./pages/batches/AddBatch";
import EditBatch from "./pages/batches/EditBatch";       // ✅ ADDED
import AssignCourses from "./pages/batches/AssignCourses"; // ✅ ADDED

import MarkAttendance from "./pages/attendance/MarkAttendance";
import CreateExam from "./pages/exams/CreateExam";
import EnterMarks from "./pages/exams/EnterMarks";
import AssignTeacherCourses from "./pages/teachers/AssignTeacherCourses";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
        <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />

        <Route path="/" element={<Home />} />

        <Route
          element={
            <ProtectedRoute allowedRoles={["admin", "teacher", "student"]}>
              <AppLayout />
            </ProtectedRoute>
          }
        >

          <Route path="/admin" element={<ProtectedRoute allowedRoles={["admin"]}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/teacher" element={<ProtectedRoute allowedRoles={["teacher"]}><TeacherDashboard /></ProtectedRoute>} />
          <Route path="/student" element={<ProtectedRoute allowedRoles={["student"]}><StudentDashboard /></ProtectedRoute>} />

          <Route element={<ProtectedRoute allowedRoles={["admin", "teacher"]} />}>
            <Route path="/students" element={<StudentList />} />
            <Route path="/students/create" element={<AddStudent />} />
            <Route path="/students/:id/edit" element={<EditStudent />} />

            <Route path="/teachers" element={<TeacherList />} />
            <Route path="/teachers/create" element={<AddTeacher />} />
            <Route path="/teachers/:id/edit" element={<EditTeacher />} />

            <Route path="/courses" element={<CourseList />} />
            <Route path="/courses/create" element={<AddCourse />} />
            <Route path="/courses/:id/edit" element={<EditCourse />} />

            <Route path="/batches" element={<BatchList />} />
            <Route path="/batches/create" element={<AddBatch />} />
            <Route path="/batches/:id/edit" element={<EditBatch />} />          {/* ✅ */}
            <Route path="/batches/:id/assign-courses" element={<AssignCourses />} /> {/* ✅ */}

            <Route path="/attendance/mark" element={<MarkAttendance />} />
            <Route path="/exams/create" element={<CreateExam />} />
            <Route path="/exams/:exam_id/marks" element={<EnterMarks />} />

            <Route path="/teachers/:id/assign-courses" element={<AssignTeacherCourses />} />

          </Route>

        </Route>

      </Routes>
    </BrowserRouter>
  );
}
