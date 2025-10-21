<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PaymentMethod extends Model
{
    protected $guarded = [];

    protected $hidden = ['cvv'];

    public function user()
    {
        return $this->belongsTo(CustUser::class);
    }
}
