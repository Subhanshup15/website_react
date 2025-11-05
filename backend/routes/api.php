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
use App\Models\FeeInvoice;

// ✅ Auth API Routes
Route::post('/register', [RegisteredUserController::class, 'store']);
Route::post('/login', [AuthenticatedSessionController::class, 'store']);
Route::middleware('auth:sanctum')->post('/logout', [AuthenticatedSessionController::class, 'destroy']);

// ✅ Assign Role API (no login required because registration calls it)
Route::post('/assign-role', [RoleController::class, 'assign']);

// ✅ Protected API Routes
Route::middleware('auth:sanctum')->group(function () {

    Route::apiResource('students', StudentController::class);
    Route::apiResource('teachers', TeacherController::class);
    Route::apiResource('courses', CourseController::class);
    Route::apiResource('batches', BatchController::class);

    // Assign Course to Teacher
    Route::get('/teachers/{id}/courses', [TeacherCourseController::class, 'show']);
    Route::post('/teachers/{id}/courses', [TeacherCourseController::class, 'update']);

    Route::post('/attendance', [AttendanceController::class, 'store']);
    Route::get('/attendance/{batch}/{course}', [AttendanceController::class, 'report']);

    Route::apiResource('exams', ExamController::class);
    Route::post('/marks', [MarkController::class, 'store']);
    Route::get('/marks/{exam}', [MarkController::class, 'get']);

    Route::post('/fee-invoice', [FeePaymentController::class, 'store']);
    Route::post('/fee-payment', [FeePaymentController::class, 'store']);

    Route::get('/fee-report/{student}', function ($student) {
        return FeeInvoice::where('student_id', $student)->with('items')->get();
    });
});
