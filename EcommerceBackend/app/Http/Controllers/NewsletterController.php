<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Newsletter;
use Illuminate\Support\Facades\Validator;

class NewsletterController extends Controller
{
    public function subscribe(Request $request)
    {
         $validator = Validator::make($request->all(), [
              'email' => 'required|email|unique:newsletters,email',
         ]);

         if($validator->fails()){
            return response()->json([
                 'status' => 'error',
                 'errors' => $validator->errors()
            ], 422);
         }

         $newsletter = Newsletter::create([
             'email' => $request->email
         ]);

         return response()->json([
            'status' => 'success',
             'message' => 'Subscribed successfully!',
             'data' => $newsletter
         ]);
    }
}
