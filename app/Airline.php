<?php

namespace App;

use App\Airport;

use Illuminate\Database\Eloquent\Model;

class Airline extends Model
{
    protected $fillable = [
        'code', 'name', 'airport_id'
    ];


    /**
     * Get airport
     */
    public function airport()
    {
       return $this->belongsTo(Airport::class, 'airport_id');   
    }

    
    /**
     * Get flights
     */
    public function flights()
    {
        return $this->hasMany(Flight::class, 'airline_id');   
    }
    
}
