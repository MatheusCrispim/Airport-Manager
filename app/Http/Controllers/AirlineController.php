<?php

namespace App\Http\Controllers;

use App\Airline;
use App\Airport;
use App\Flight;
use App\Http\Resources\AirlineResource;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AirlineController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return AirlineResource::collection(Airline::paginate(15));
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
            'name' => 'required', 
            'airport_code' => 'required', 
        ]);

        if ($validate->fails())
        {
            return response()->json( "Requisição mal formada!", 400); 
        }

        $numberOfAirlines = Airline::where('code', '=', $data['code'])->count();
        if($numberOfAirlines == 0)
        {
           
            $airport = Airport::where('code', '=', $data['airport_code'])->get()->first();

            if(is_null($airport))
            {
                return response()->json( "Código de aeroporto inválido!", 404); 
            }
            $data['airport_id'] = $airport->id;

            $airline = Airline::create($data);
            return new AirlineResource($airline);
        }

        return response()->json( "Código de companhia aérea já cadastrado!", 409);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        
        $airline=Airline::find($id);

        if(!is_null($airline))
        {
            return new AirlineResource($airline);
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
        $airline=Airline::find($id);

        if(!is_null($airline))
        {
            if(isset($data['code']))
            {
                if($airline->code != $data['code'])
                {
                    $numberOfFlights = Airline::where('code', '=', $data['code'])->count();
                    if( $numberOfFlights > 0)
                    {
                        return response()->json( "Código de companhia aérea já cadastrado!", 404); 
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


            $airline->update($data);
            return (new AirlineResource($airline))
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
        $airline=Airline::find($id);

        if(!is_null($airline))
        {
            $flights = $airline->flights;          
            foreach($flights as $flight){       
                $flight->destroy($flight->id);
            }

            $airline->delete();
            return response()->json(null, 204);
        }

        return response()->json("Nada encontrado!", 404);		
    }
    
}
