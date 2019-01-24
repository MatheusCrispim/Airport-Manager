<?php

namespace App;

use App\Airport;
use App\Airline;
use App\Runaway;

use Illuminate\Database\Eloquent\Model;

class Flight extends Model
{

    protected $fillable = [
            'code', 'status', 'flight_date', 'flight_time', 'airline_id', 'runaway_id', 'airport_id'
    ];
    

    /**
     * Get airline
     */
    public function airline()
    {
       return $this->belongsTO(Airline::class, 'airline_id');   
   }
    

    /**
     * Get airport
     */
    public function airport()
    {
       return $this->belongsTo(Airport::class, 'airport_id');   
    }


    /**
     * Get runaway
     */
    public function runaway()
    {
        return $this->belongsTo(Runaway::class, 'runaway_id');   
    }


}
