<?php

namespace App;

use App\Airline;
use App\Flight;
use App\Runaway;
use Illuminate\Database\Eloquent\Model;

class Airport extends Model
{

    protected $fillable = [
        'code', 'name', 'country', 'state', 'city', 'zip_code'
    ];


    /**
     * Get airlines
     */
    public function airlines()
    {
       return $this->hasMany(Airline::class, 'airport_id'); 
    }


    /**
     * Get flights
     */
    public function flights()
    {
        return $this->hasMany(Flight::class,  'airport_id'); 
    }


    /**
     * Get runaways
     */
    public function runaways()
    {
        return $this->hasMany(Runaway::class, 'airport_id');
    }
    
}
