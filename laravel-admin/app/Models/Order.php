<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $guarded = [];

    function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

    function getNameAttribute()
    {
        return $this->first_name . ' ' . $this->last_name;
    }

    function getTotalAttribute()
    {
        return $this->orderItems->sum(function (OrderItem $orderItem) {
            return $orderItem->quantity * $orderItem->price;
        });
    }
}
