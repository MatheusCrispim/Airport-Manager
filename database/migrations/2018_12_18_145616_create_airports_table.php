<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAirportsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */

     /*
     *This function creates the airport table in the database 
     */
    public function up()
    {
        Schema::create('airports', function (Blueprint $table) {
            $table->increments('id')->unique();
            $table->string('code')->unique()->secondary()->nullable();
            $table->string('name');
            $table->string('country');
            $table->string('state');
            $table->string('city');
            $table->string('zip_code');
            $table->timestamps();
        });
    }
    
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('airports');
    }
}
