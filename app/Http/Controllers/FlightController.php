<?php

namespace App\Http\Controllers;


use App\Flight;
use App\Airport;
use App\Airline;
use App\Runaway;

use App\Http\Resources\FlightResource;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class FlightController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return FlightResource::collection(Flight::paginate(15));
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->all();

        $validate = Validator::make($data, 
        [   'code' => 'required', 
            'status' => 'required',
            'flight_date' => 'required', 
            'flight_time' => 'required', 
            'airline_code' => 'required',
            'runaway_code' => 'required',
            'airport_code' => 'required',
        ]);


        if ($validate->fails())
        {
            return response()->json( "Requisição mal formada!", 400); 
        }


        $numberOfFlights = Flight::where('code', '=', $data['code'])->count();

        if( $numberOfFlights == 0)
        {

            $airport = Airport::where('code', '=', $data['airport_code'])->get()->first();
            if(is_null($airport))
            {
                return response()->json( "Código de aeroporto inválido!", 404); 
            }
        

            $airline = Airline::where('code', '=', $data['airline_code'])->get()->first();
            if(is_null($airline))
            {
                return response()->json( "Código de companhia aérea inválido!", 404); 
            }
          
    
            $runaway = Runaway::where('code', '=', $data['runaway_code'])->get()->first();
            if(is_null($runaway))
            {
                return response()->json( "Código de pista inválido!", 404); 
            }

            $data['airport_id'] = $airport->id;
            $data['airline_id'] = $airline->id;
            $data['runaway_id'] = $runaway->id;


            $time = array(
                'FLIGHT_TIME' => $data['flight_time'], 
                'FLIGHT_DATE' => $data['flight_date'], 
            );
          
            

            $flightsInTime = DB::select(
                 DB::raw("SELECT *, TIMEDIFF(flight_time, :FLIGHT_TIME) AS timediff FROM `flights` WHERE flight_date=:FLIGHT_DATE HAVING abs(timediff) <= 3000"),
                 $time 
            );

            if(!empty($flightsInTime)){
                return response()->json( "Horário de vôo já ocupado para a pista, selecione um horário com pelo menos 30 minutos de diferença!", 409);
            }

            $flight =  Flight::create($data);
            return new FlightResource($flight);
        }

        return response()->json( "Código de vôo já cadastrado!", 409);

    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $flight = Flight::find($id);

        if(!is_null($flight))
        {
            return new FlightResource($flight);
        }

        return response()->json("Nada encontrado!", 404);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $data = $request->all();
        $flight = Flight::find($id);


        if(!is_null($flight))
        {

            if(isset($data['code']))
            {
                if($flight->code != $data['code'])
                {
                    $numberOfFlights = Flight::where('code', '=', $data['code'])->count();
                    if( $numberOfFlights > 0)
                    {
                        return response()->json( "Código de vôo já cadastrado!", 404); 
                    }
                }
            }


            if(isset($data['airport_code']))
            {
                $airport = Airport::where('code', '=', $data['airport_code'])->get()->first();
                if(is_null($airport))
                {
                    return response()->json( "Código de aeroporto inválido!", 404); 
                }
                $data['airport_id'] = $airport->id;
            }


            if(isset($data['flight_time']) or isset($data['flight_date'])){

                $time = array(
                    'FLIGHT_TIME' => $data['flight_time'], 
                    'FLIGHT_DATE' => $data['flight_date'],
                    'ID' => $id
                );
            

                $flightsInTime = DB::select(
                    DB::raw("SELECT *, TIMEDIFF(flight_time, :FLIGHT_TIME) AS timediff FROM `flights` WHERE flight_date=:FLIGHT_DATE and id!=:ID  HAVING abs(timediff) <= 3000"),
                    $time 
               );
   
               if(!empty($flightsInTime)){
                   return response()->json( "Horário de vôo já ocupado para a pista, selecione um horário com pelo menos 30 minutos de diferença!", 409);
               }
   
            }
            
            if(isset($data['airline_code']))
            {
                $airline = Airline::where('code', '=', $data['airline_code'])->get()->first();
                if(is_null($airline))
                {
                    return response()->json( "Código de companhia aérea inválido!", 404); 
                }
                $data['airline_id'] = $airline->id;
            }


            if(isset($data['runaway_code']))
            {
                $runaway = Runaway::where('code', '=', $data['runaway_code'])->get()->first();
                if(is_null($runaway))
                {
                    return response()->json( "Código de pista inválido!", 404); 
                }
                $data['runaway_id'] = $runaway->id;
            }

    
            $flight->update($data);
            return (new FlightResource($flight))
                                        ->response()
                                        ->setStatusCode(202);
        }

        return response()->json("Nada encontrado!", 404);
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $flight = Flight::find($id);

        if(!is_null($flight))
        {
            $flight->delete();
            return response()->json(null, 204);
        }

        return response()->json("Nada encontrado!", 404);
    }
}
