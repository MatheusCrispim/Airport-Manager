<?php

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
    return view('welcome');
});

Route::get('/airports', function () {
    return view('welcome');
});

Route::get('/airlines', function () {
    return view('welcome');
});

Route::get('/runaways', function () {
    return view('welcome');
});

Route::get('/flights', function () {
    return vie('welcome');
});
