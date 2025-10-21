<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PasswordReset extends Model
{
    protected $table = 'password_reset_tokens';
    public $timestamps = false;
    protected $fillable = ['email', 'token', 'created_at'];
    
    protected $primaryKey = 'email';  // 👈 primary key is email
    public $incrementing = false;     // no auto-increment
    protected $keyType = 'string'; 
}
