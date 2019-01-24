<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFlightsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */

    /*
    *This function creates the flights table in the database 
    */
    public function up()
    {
        Schema::create('flights', function (Blueprint $table) {
            $table->increments('id')->unique();
            $table->string('code')->unique()->secondary()->nullable();
            $table->string('status');
            $table->date('flight_date');
            $table->time('flight_time');
            $table->timestamps();
        });

        Schema::table('flights', function ($table) {
            $table->unsignedInteger('airline_id')->nullable();
            $table->unsignedInteger('airport_id')->nullable();
            $table->unsignedInteger('runaway_id')->nullable();
            $table->foreign('airline_id')->references('id')->on('airlines');
            $table->foreign('airport_id')->references('id')->on('airports');
            $table->foreign('runaway_id')->references('id')->on('runaways');
        });


    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('flights');
    }
}
