<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrderResource;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    function index()
    {
        $orders = Order::with('orderItems')->paginate();
        return OrderResource::collection($orders);
    }

    function show($id)
    {
        $order = Order::with('orderItems')->find($id);
        return new OrderResource($order);
    }
}
