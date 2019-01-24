<?php

namespace App\Http\Controllers;

use App\Airport;
use App\Flight;
use App\Runaway;
use App\Airline;

use App\Http\Resources\AirportResource;
use App\Http\Resources\AirlineResource;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AirportController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return AirportResource::collection(Airport::paginate(15));
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
            'country' => 'required', 
            'state' => 'required', 
            'city' => 'required',
            'zip_code' => 'required',
        ]);


        if ($validate->fails())
        {
            return response()->json( "Requisição mal formada!", 400); 
        }

        $numberOfAirports = Airport::where('code', '=', $data['code'])->count();

        if($numberOfAirports == 0)
        {
            $airport = Airport::create($data);
            return new AirportResource($airport);
        }
        return response()->json( "Código de aeroporto já cadastrado!", 409);
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $airport=Airport::find($id);

        if(!is_null($airport))
        {
            return new AirportResource($airport);
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
        $airport = Airport::find($id);    
        
        if(!is_null($airport)){

            if(isset($data['code']))
            {
                if($airport->code != $data['code'])
                {
                    $numberOfAirports = Airport::where('code', '=', $data['code'])->count();
                    if( $numberOfAirports > 0)
                    {
                        return response()->json( "Código de aeroporto já cadastrado!", 404); 
                    }
                }
            }


            $airport->update($data);
            return (new AirportResource($airport))
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
 
        $airport = Airport::find($id);

        if(!is_null($airport))
        {

            $flights = $airport->flights;          
            foreach($flights as $flight){       
                $flight->destroy($flight->id);
            }

            $runaways = $airport->runaways;          
            foreach($runaways as $runaway){       
                $runaway->destroy($runaway->id);
            }
         
            $airlines = $airport->airlines;
            foreach($airlines as $airline){
                $airline->destroy($airline->id);
            }

            $airport->delete();
            return response()->json(null, 204);
        }

        return response()->json("Nada encontrado!", 404);         
    }


    /**
     * Display a listing of the resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function showAirportAirlines($id)
    {
        $airport=Airport::find($id);
        if(!is_null($airport)){
            $airlines=$airport->airlines;
            return $airlines;
        }

        return response()->json("Nada encontrado!", 404);
    }


    /**
     * Display a listing of the resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function showAirportRunaways($id)
    {
        $airport=Airport::find($id);

        if(!is_null($airport)){
            $runaways = $airport->runaways;
            return $runaways;
        }

        return response()->json("Nada encontrado!", 404);
    }


    /**
     * Display a listing of the resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function showAirportFlights($id)
    {
        $airport=Airport::find($id);

        if(!is_null($airport)){
            $flights = $airport->flights;
            return  $flights;
        }

        return response()->json("Nada encontrado!", 404);
    }

}
