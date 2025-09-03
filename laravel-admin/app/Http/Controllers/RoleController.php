<?php

namespace App\Http\Controllers;

use App\Http\Resources\RoleResource;
use App\Models\Role;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleController extends Controller
{
    function index()
    {
        return RoleResource::collection(Role::all());
    }

    function store(Request $request)
    {
        $role = Role::create($request->only('name'));

        $role->permissions()->attach($request->input('permissions'));

        return response(new RoleResource($role->load('permissions')), Response::HTTP_CREATED);
    }

    function show($id)
    {
        return new RoleResource(Role::with('permissions')->find($id));
    }

    function update(Request $request, $id)
    {
        $role = Role::find($id);

        $role->update($request->only('name'));

        $role->permissions()->sync($request->input('permissions'));

        return response(new RoleResource($role->load('permissions')), Response::HTTP_ACCEPTED);
    }

    function destroy($id)
    {
        Role::destroy($id);

        return \response(null, Response::HTTP_NO_CONTENT);
    }
}
