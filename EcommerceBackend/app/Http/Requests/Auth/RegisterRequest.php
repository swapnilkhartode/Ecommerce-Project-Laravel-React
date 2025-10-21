<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    // Who can use this request
    public function authorize(): bool
    {
        return true; // allow for everyone
    }

    // Validation rules
    public function rules(): array
    {
        return [
            'firstName' => 'required|regex:/^[a-zA-Z\s]+$/|max:255',
            'lastName'  => 'required|regex:/^[a-zA-Z\s]+$/|max:255',
            'email'     => 'required|string|email|max:255|unique:cust_users,email',
            'mobile'    => 'required|digits:10|unique:cust_users,mobile',
            'password'  => 'required|string|min:6|confirmed',
        ];
    }

    // Custom messages
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
            'password.required'  => 'Password is required.',
            'password.min'       => 'Password must be at least 6 characters long.',
            'password.confirmed' => 'Passwords do not match.',
        ];
    }
}
