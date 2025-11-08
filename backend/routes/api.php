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


    Route::get('/student/courses', [StudentPanelController::class, 'myCourses']);
    Route::get('/student/batch', [StudentPanelController::class, 'myBatch']);
    Route::get('/student/attendance', [StudentPanelController::class, 'myAttendance']);
    Route::get('/student/marks', [StudentPanelController::class, 'myMarks']);

    Route::get('/batches/{id}/courses', [BatchCourseController::class, 'show']);
    Route::post('/batches/{id}/courses', [BatchCourseController::class, 'assign']);

    Route::get('/attendance/{batch_id}/{course_id}', [AttendanceController::class, 'fetch']);
    Route::get('/attendance/list', [AttendanceController::class, 'list']);


    // Assign Course to Teacher
    Route::get('/teachers/{id}/courses', [TeacherCourseController::class, 'show']);
    Route::post('/teachers/{id}/courses', [TeacherCourseController::class, 'update']);

    Route::post('/attendance', [AttendanceController::class, 'store']);
    Route::get('/attendance/{batch_id}/{course_id}', [AttendanceController::class, 'report']);
    Route::get('/attendance/list', [\App\Http\Controllers\AttendanceController::class, 'list']);

    Route::apiResource('exams', ExamController::class);

    Route::get('/marks/{exam_id}', [MarkController::class, 'get']);
    Route::post('/marks', [MarkController::class, 'store']);


    Route::post('/fee-invoice', [FeePaymentController::class, 'store']);
    Route::post('/fee-payment', [FeePaymentController::class, 'store']);

    Route::get('/fee-report/{student}', function ($student) {
        return FeeInvoice::where('student_id', $student)->with('items')->get();
    });
});
Route::middleware('auth:sanctum')->post('/logout', function (Request $request) {
    $request->user()->currentAccessToken()->delete();
    return response()->json(['message' => 'Logged out']);
});
