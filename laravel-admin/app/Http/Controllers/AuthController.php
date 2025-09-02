<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Http\Requests\UpdateInfoRequest;
use App\Http\Requests\UpdatePasswordRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
    function register(RegisterRequest $request)
    {
        $user = User::create([
            "first_name" => $request->input("first_name"),
            "last_name" => $request->input("last_name"),
            "email" => $request->input("email"),
            "password" => Hash::make($request->input("password")),
        ]);

        return response($user, Response::HTTP_CREATED);
    }

    function login(Request $request)
    {
        if (!Auth::attempt($request->only("email", "password"))) {
            return \response([
                "error" => "Invalid credentials"
            ], Response::HTTP_UNAUTHORIZED);
        }

        $user = Auth::user();

        $jwt = $user->createToken("token")->plainTextToken;

        // FE không giữ token, trình duyệt giữ hộ trong cookie và tự gửi kèm khi gọi API.
        // Nếu lưu token trong localStorage hoặc sessionStorage:
        // Dễ bị XSS (nếu hacker inject script thì đọc được token).
        $cookie = cookie("jwt", $jwt, 60 * 24); // 1 day

        return response([
            "jwt" => $jwt
        ])->withCookie($cookie);
    }

    function user(Request $request)
    {
        return $request->user();
    }

    function logout()
    {
        $cookie = \Cookie::forget("jwt");

        return \response([
            "message" => "success"
        ])->withCookie($cookie);
    }

    function updateInfo(UpdateInfoRequest $request)
    {
        $user = $request->user();

        $user->update($request->only("first_name", "last_name", "email"));

        return \response($user, Response::HTTP_ACCEPTED);
    }

    function updatePassword(UpdatePasswordRequest $request)
    {
        $user = $request->user();

        $user->update($request->only("first_name", "last_name", "email"));

        return \response($user, Response::HTTP_ACCEPTED);
    }
}
