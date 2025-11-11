import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import SidebarLayout from "./layouts/SidebarLayout";

import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";

// Auth
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Dashboards
import AdminDashboard from "./pages/AdminDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";

// Students
import StudentList from "./pages/students/StudentList";
import AddStudent from "./pages/students/AddStudent";
import EditStudent from "./pages/students/EditStudent";

// Teachers
import TeacherList from "./pages/teachers/TeacherList";
import AddTeacher from "./pages/teachers/AddTeacher";
import EditTeacher from "./pages/teachers/EditTeacher";
import AssignTeacherCourses from "./pages/teachers/AssignTeacherCourses";

// Courses
import CourseList from "./pages/courses/CourseList";
import AddCourse from "./pages/courses/AddCourse";
import EditCourse from "./pages/courses/EditCourse";

// Batches
import BatchList from "./pages/batches/BatchList";
import AddBatch from "./pages/batches/AddBatch";
import EditBatch from "./pages/batches/EditBatch";
import AssignCourses from "./pages/batches/AssignCourses";

// Attendance
import AttendanceList from "./pages/attendance/AttendanceList";
import MarkAttendance from "./pages/attendance/MarkAttendance";

// Exams & Marks
import CreateExam from "./pages/exams/CreateExam";
import EnterMarks from "./pages/exams/EnterMarks";
import ExamList from "./pages/exams/ExamList";

// Student Self Dashboard Pages
import MyCourses from "./pages/students/MyCourses";
import MyBatch from "./pages/students/MyBatch";
import MyAttendance from "./pages/students/MyAttendance";
import MyMarks from "./pages/students/MyMarks";

// HMS + Hotel Booking
import PatientList from "./pages/patients/PatientList";
import AddPatient from "./pages/patients/AddPatient";
import Billing from "./pages/patients/Billing";
import Booking from "./pages/patients/Booking";
import BookingList from "./pages/patients/BookingList";

import EditPatient from "./pages/patients/EditPatient";



export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
        <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />

        {/* Authenticated Pages */}
        <Route
          element={
            <ProtectedRoute allowedRoles={["admin", "teacher", "student"]}>
              <SidebarLayout />
            </ProtectedRoute>
          }
        >

          {/* Dashboards */}
          <Route path="/admin" element={<ProtectedRoute allowedRoles={["admin"]}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/teacher" element={<ProtectedRoute allowedRoles={["teacher"]}><TeacherDashboard /></ProtectedRoute>} />
          <Route path="/student" element={<ProtectedRoute allowedRoles={["student"]}><StudentDashboard /></ProtectedRoute>} />

          {/* Admin + Teacher Shared Routes */}
          <Route element={<ProtectedRoute allowedRoles={["admin", "teacher"]} />}>
            {/* Students */}
            <Route path="/students" element={<StudentList />} />
            <Route path="/students/create" element={<AddStudent />} />
            <Route path="/students/:id/edit" element={<EditStudent />} />

            {/* Teachers */}
            <Route path="/teachers" element={<TeacherList />} />
            <Route path="/teachers/create" element={<AddTeacher />} />
            <Route path="/teachers/:id/edit" element={<EditTeacher />} />

            {/* Teacher Course Assign */}
            <Route path="/teachers/:id/assign-courses" element={<AssignTeacherCourses />} />

            {/* Courses */}
            <Route path="/courses" element={<CourseList />} />
            <Route path="/courses/create" element={<AddCourse />} />
            <Route path="/courses/:id/edit" element={<EditCourse />} />

            {/* Batches */}
            <Route path="/batches" element={<BatchList />} />
            <Route path="/batches/create" element={<AddBatch />} />
            <Route path="/batches/:id/edit" element={<EditBatch />} />
            <Route path="/batches/:id/assign-courses" element={<AssignCourses />} />

            {/* Attendance */}
            <Route path="/attendance/list" element={<AttendanceList />} />
            <Route path="/attendance/mark" element={<MarkAttendance />} />

            {/* Exams */}
            <Route path="/exams" element={<ExamList />} />
            <Route path="/exams/create" element={<CreateExam />} />
            <Route path="/exams/:exam_id/marks" element={<EnterMarks />} />

            {/* HMS + Hotel */}
            <Route path="/patients" element={<PatientList />} />
            <Route path="/patients/add" element={<AddPatient />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/booking/list" element={<BookingList />} />
            <Route path="/patients" element={<PatientList />} />
            <Route path="/patients/create" element={<AddPatient />} />
            <Route path="/patients/:id/edit" element={<EditPatient />} />

          </Route>

          {/* Student Self Pages */}
          <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
            <Route path="/my-courses" element={<MyCourses />} />
            <Route path="/my-batch" element={<MyBatch />} />
            <Route path="/my-attendance" element={<MyAttendance />} />
            <Route path="/my-marks" element={<MyMarks />} />
          </Route>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}
