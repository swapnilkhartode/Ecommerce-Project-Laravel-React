<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateProfileRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Route middleware ensures user is authenticated
    }

   public function rules(): array
{
    $userId = Auth::id() ?? 'NULL'; // prevent invalid SQL

    return [
        'firstName' => 'required|regex:/^[a-zA-Z\s]+$/|max:255',
        'lastName'  => 'required|regex:/^[a-zA-Z\s]+$/|max:255',
        'email'     => "required|string|email|max:255|unique:cust_users,email,{$userId}",
        'mobile'    => "required|digits:10|unique:cust_users,mobile,{$userId}",
    ];
}


    public function messages(): array
    {
        return [
            'firstName.required' => 'First name is required.',
            'firstName.regex'    => 'First name should only contain letters and spaces.',
            'lastName.required'  => 'Last name is required.',
            'lastName.regex'     => 'Last name should only contain letters and spaces.',
            'email.required'     => 'Email is required.',
            'email.email'        => 'Please enter a valid email address.',
            'email.unique'       => 'This email is already registered.',
            'mobile.required'    => 'Mobile number is required.',
            'mobile.digits'      => 'Mobile number must be exactly 10 digits.',
            'mobile.unique'      => 'This mobile number is already registered.',
           
        ];
    }
}
