<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;

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

// Your API Controllers
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PatientController;
use App\Http\Controllers\Api\BillingController;
use App\Http\Controllers\Api\BookingController;


// ✅ Auth API Routes
Route::post('/register', [RegisteredUserController::class, 'store']);
Route::post('/login', [AuthenticatedSessionController::class, 'store']);
Route::middleware('auth:sanctum')->post('/logout', [AuthenticatedSessionController::class, 'destroy']);


// ✅ Assign Role (No auth required)
Route::post('/assign-role', [RoleController::class, 'assign']);


// ✅ Protected API Routes (User must be Logged in)
Route::middleware('auth:sanctum')->group(function () {

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

    Route::post('/fee-invoice', [FeePaymentController::class, 'store']);
    Route::post('/fee-payment', [FeePaymentController::class, 'store']);

    Route::get('/fee-report/{student}', function ($student) {
        return FeeInvoice::where('student_id', $student)->with('items')->get();
    });

    // ✅ Your HMS + Hotel APIs (Correct Position Now)
    Route::get('/patients', [PatientController::class, 'index']);
    Route::get('/bookings', [BookingController::class, 'index']);


    Route::post('/patients', [PatientController::class, 'store']);
    Route::post('/billing/create', [BillingController::class, 'create']);
    Route::get('/rooms/available', [BookingController::class, 'availableRooms']);
    
    Route::post('/rooms/book', [BookingController::class, 'store']);
    Route::delete('/bookings/{id}', [BookingController::class, 'destroy']);
    Route::apiResource('patients', \App\Http\Controllers\Api\PatientController::class);


});


// ✅ Logout alternative endpoint
Route::middleware('auth:sanctum')->post('/logout', function (Request $request) {
    $request->user()->currentAccessToken()->delete();
    return response()->json(['message' => 'Logged out']);
});
