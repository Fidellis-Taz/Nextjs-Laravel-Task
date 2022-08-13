<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmployeesController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

 
Route::get('/', function () {
    return 'Hello World';
});
Route::get('/employees', [EmployeesController::class, 'index']);
Route::post('/employees/create', [EmployeesController::class, 'store']);
Route::get('/employees/{id}', [EmployeesController::class, 'show']);
Route::put('/employees/{id}', [EmployeesController::class, 'update']);
Route::delete('/employees/{id}', [EmployeesController::class, 'destroy']);
 

require __DIR__.'/auth.php';
