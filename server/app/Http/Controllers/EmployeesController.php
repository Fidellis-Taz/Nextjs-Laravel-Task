<?php

namespace App\Http\Controllers;

use App\Models\Employees;
use Illuminate\Http\Request;

class EmployeesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        //return Employees::select('id','Name','Address','Job')->get();
        return Employees::all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
         $request->validate([
            'Name'=>'required',
            'Address'=>'required',
            'Job'=>'required'
        ]);

        Employees::create($request->all());
           
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        
         
        $storeData = Employees::create([
            'Name' => $request->Name,
            'Address' => $request->Address,
            'Job' => $request->Job
        ]);
        if($storeData){
            return response()->json(["status" => 200,"message" => "Employee Created Successfully"]);
        }
      }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Employees  $employees
     * @return \Illuminate\Http\Response
     */
    public function show( $id)
    {
        //
        $employees = Employees::find($id);
        return response()->json(['status' => 200, 'employees' => $employees]);
       /*  return response()->json([
            'employees'=>$employees
        ]); */
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Employees  $employees
     * @return \Illuminate\Http\Response
     */
    public function edit(Employees $employees)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Employees  $employees
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        
        $employees = Employees::find($id);
        $employees->Name = $request->Name;
        $employees->Address = $request->Address;
        $employees->Job = $request->Job;
        if($employees -> save()){
            return response()->json(["status" => 200, "message" => "Employee Updated Successfully"]);
        } 
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Employees  $employees
     * @return \Illuminate\Http\Response
     */
    public function destroy($id,Employees $employees)
    {
        //
        $employees = Employees::findOrFail($id);
        $employees->delete();

     }
}
