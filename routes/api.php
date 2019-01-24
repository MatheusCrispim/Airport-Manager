<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
 
Route::apiResource('/airports', 'AirportController');
Route::get('/airports/{id}/airlines/', 'AirportController@showAirportAirlines');
Route::get('/airports/{id}/runaways/', 'AirportController@showAirportRunaways');
Route::get('/airports/{id}/flights/', 'AirportController@showAirportFlights');


Route::apiResource('/airlines', 'AirlineController');
Route::apiResource('/runaways', 'RunawayController');
Route::apiResource('/flights', 'FlightController');

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
