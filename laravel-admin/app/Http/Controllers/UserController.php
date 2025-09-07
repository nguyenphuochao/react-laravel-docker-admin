<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserCreateRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;

class UserController extends Controller
{
    public function index()
    {
        return UserResource::collection(User::with("role")->paginate()); // default per_page = 15
    }

    public function store(UserCreateRequest $request)
    {
        $user = User::create(
            $request->only("first_name", "last_name", "email", "role_id")
                + ["password" => Hash::make(1234)]
        );

        return response(new UserResource($user), Response::HTTP_CREATED);
    }

    public function show($id)
    {
        $user = User::find($id);
        return new UserResource($user->load('role'));
    }

    public function update(UserUpdateRequest $request, $id)
    {
        $user = User::find($id);

        $user->update($request->only("first_name", "last_name", "email"));

        // 202 Accepted → Dùng khi server chỉ nhận request nhưng chưa xử lý xong
        return \response(new UserResource($user), Response::HTTP_ACCEPTED);
    }

    public function destroy($id)
    {
        User::destroy($id);

        return \response(null, Response::HTTP_NO_CONTENT);
    }
}
