<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductCreateRequest;
use App\Http\Requests\ProductUpdateRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ProductController extends Controller
{
    public function index()
    {
        return ProductResource::collection(Product::paginate()); // default per_page = 15
    }

    public function store(ProductCreateRequest $request)
    {
        $product = Product::create(
            $request->only('title', 'description', 'image', 'price')
        );

        return response(new ProductResource($product), Response::HTTP_CREATED);
    }

    public function show($id)
    {
        $product = Product::find($id);
        return new ProductResource($product);
    }

    public function update(ProductUpdateRequest $request, $id)
    {
        $product = Product::find($id);

        $product->update($request->only('title', 'description', 'image', 'price'));

        // 202 Accepted → Dùng khi server chỉ nhận request nhưng chưa xử lý xong
        return \response(new ProductResource($product), Response::HTTP_ACCEPTED);
    }

    public function destroy($id)
    {
        Product::destroy($id);

        return \response(null, Response::HTTP_NO_CONTENT);
    }
}
