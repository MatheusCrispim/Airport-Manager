<?php

namespace App\Http\Controllers;

use App\Runaway;
use App\Airport;
use App\Http\Resources\RunawayResource;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RunawayController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return RunawayResource::collection(Runaway::paginate(15));
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data=$request->all();

        $validate = Validator::make($data, 
        [   'code' => 'required', 
            'airport_code' => 'required',
        ]);
        

        $numberOfRunaways = Runaway::where('code', '=', $data['code'])->count();
        if( $numberOfRunaways == 0)
        {
            $airport = Airport::where('code', '=', $data['airport_code'])->get()->first();
            if(is_null($airport))
            {
                return response()->json( "Código de aeroporto inválido!", 404); 
            }
            $data['airport_id'] = $airport->id;
            
            $runaway = Runaway::create($data);
            return new RunawayResource($runaway);
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
        $runaway =  Runaway::find($id);

        if(!is_null($runaway))
        {
            return new RunawayResource($runaway);
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
        $runaway =  Runaway::find($id);

        if(!is_null($runaway))
        {
            if(isset($data['code']))
            {
                if($runaway->code != $data['code'])
                {
                    $numberOfRunaways = Runaway::where('code', '=', $data['code'])->count();
                    if( $numberOfRunaways > 0)
                    {
                        return response()->json( "Código de pista já cadastrado!", 404); 
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

            $runaway->update($data);
            return (new RunawayResource($runaway))
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
        $runaway =  Runaway::find($id);

        if(!is_null($runaway))
        {
            $flights = $runaway->flights;          
            foreach($flights as $flight){       
                $flight->destroy($flight->id);
            }

            $runaway->delete();
            return response()->json("Pista removida com sucesso!", 204);
        }

        return response()->json("Nada encontrado!", 404);


    }
}
