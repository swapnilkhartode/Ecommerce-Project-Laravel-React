<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class CustUser extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $table = 'cust_users'; // explicitly define table if different
    
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'mobile',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];
}
