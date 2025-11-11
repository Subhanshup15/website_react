<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Auth
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;

// LMS Controllers
use App\Http\Controllers\RoleController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\BatchController;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\ExamController;
use App\Http\Controllers\MarkController;
use App\Http\Controllers\FeePaymentController;
use App\Http\Controllers\TeacherCourseController;
use App\Http\Controllers\BatchCourseController;
use App\Http\Controllers\StudentPanelController;
use App\Models\FeeInvoice;

// HMS Controllers
use App\Http\Controllers\Api\PatientController;
use App\Http\Controllers\Api\BillingController;
use App\Http\Controllers\Api\BookingController;


// -------------------- AUTH ROUTES -------------------- //

Route::post('/register', [RegisteredUserController::class, 'store']);
Route::post('/login', [AuthenticatedSessionController::class, 'store']);
Route::middleware('auth:sanctum')->post('/logout', [AuthenticatedSessionController::class, 'destroy']);


// -------------------- PROTECTED ROUTES -------------------- //

Route::middleware('auth:sanctum')->group(function () {

    // LMS MODULE
    Route::apiResource('students', StudentController::class);
    Route::apiResource('teachers', TeacherController::class);
    Route::apiResource('courses', CourseController::class);
    Route::apiResource('batches', BatchController::class);

    Route::get('/student/courses', [StudentPanelController::class, 'myCourses']);
    Route::get('/student/batch', [StudentPanelController::class, 'myBatch']);
    Route::get('/student/attendance', [StudentPanelController::class, 'myAttendance']);
    Route::get('/student/marks', [StudentPanelController::class, 'myMarks']);

    Route::get('/batches/{id}/courses', [BatchCourseController::class, 'show']);
    Route::post('/batches/{id}/courses', [BatchCourseController::class, 'assign']);

    Route::post('/attendance', [AttendanceController::class, 'store']);
    Route::get('/attendance/{batch_id}/{course_id}', [AttendanceController::class, 'report']);
    Route::get('/attendance/list', [AttendanceController::class, 'list']);

    Route::apiResource('exams', ExamController::class);

    Route::get('/marks/{exam_id}', [MarkController::class, 'get']);
    Route::post('/marks', [MarkController::class, 'store']);

    Route::post('/fee-payment', [FeePaymentController::class, 'store']);
    Route::get('/fee-report/{student}', function ($student) {
        return FeeInvoice::where('student_id', $student)->with('items')->get();
    });


    // -------------------- HOSPITAL / HOTEL MODULE -------------------- //

    // PATIENTS
    Route::get('/patients', [PatientController::class, 'index']);
    Route::post('/patients', [PatientController::class, 'store']);
    Route::get('/patients/{id}', [PatientController::class, 'show']);
    Route::put('/patients/{id}', [PatientController::class, 'update']);
    Route::delete('/patients/{id}', [PatientController::class, 'destroy']);

    // BILLING
    Route::get('/billing', [BillingController::class, 'index']);
    Route::post('/billing/create', [BillingController::class, 'create']);
    Route::get('/billing/{id}', [BillingController::class, 'show']);
    Route::put('/billing/{id}', [BillingController::class, 'update']);
    Route::delete('/billing/{id}', [BillingController::class, 'destroy']);

    // ROOM BOOKINGS
    Route::get('/rooms/available', [BookingController::class, 'availableRooms']);
    Route::post('/rooms/book', [BookingController::class, 'store']);
    Route::get('/bookings', [BookingController::class, 'index']);
    Route::delete('/bookings/{id}', [BookingController::class, 'destroy']);
});

