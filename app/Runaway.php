<?php

namespace App;

use App\Airport;
use App\Flight;

use Illuminate\Database\Eloquent\Model;

class Runaway extends Model
{
    protected $fillable = [
        'code', 'airport_id'
    ];

    /**
     * Get airport
     */
    public function airport()
    {
       return $this->belongsTo(Airport::class, 'airport_id');   
    }

    public function flights()
    {
       return $this->hasMany(Flight::class, 'runaway_id');   
    }
    
}
