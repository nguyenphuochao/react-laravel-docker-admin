<?php

namespace App\Http\Controllers;

use App\Http\Requests\ImageUploadRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Env;
use Illuminate\Support\Str;

class ImageController extends Controller
{
    function upload(ImageUploadRequest $request)
    {
        $file = $request->file('images');
        $name = Str::random(10);
        $url = \Storage::putFileAs('images', $file, $name . '.' . $file->extension()); // $file->extension() -> .png .jpg

        return [
            'url' => env('APP_URL') . '/' . $url
        ];
    }
}
