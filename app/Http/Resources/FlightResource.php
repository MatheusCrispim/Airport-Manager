<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class FlightResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return[
            'id' => $this->id,
            'code' => $this->code,
            'status' => $this->status,
            'flight_date' => $this->flight_date, 
            'flight_time' => $this->flight_time,
            'airline_code' => $this->airline->code, 
            'runaway_code' => $this->runaway->code,
            'airport_code' => $this->airport->code,
        ];
    }
}
