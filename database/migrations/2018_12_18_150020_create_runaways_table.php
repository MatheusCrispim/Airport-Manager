<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRunawaysTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */

    /*
    *This function creates the runaways table in the database 
    */
    public function up()
    {
        Schema::create('runaways', function (Blueprint $table) {
            $table->increments('id')->unique();
            $table->string('code')->unique()->secondary()->nullable();
            $table->timestamps();
        });

        Schema::table('runaways', function ($table){
            $table->unsignedInteger('airport_id')->nullable();
            $table->foreign('airport_id')->references('id')->on('airports');
     });        
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('runaways');
    }
}
