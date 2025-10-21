<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\UpdateProfileRequest;
use App\Models\CustUser;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use App\Models\PasswordReset;
class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $user = CustUser::create([
            'first_name' => $request->firstName,
            'last_name'  => $request->lastName,
            'email'      => $request->email,
            'mobile'     => $request->mobile,
            'password'   => Hash::make($request->password),
        ]);

        return response()->json([
            'message' => 'Registration successful! Redirecting to login...',
            'user'    => $user,
        ], 201);
    }

    public function login(LoginRequest $request)
{
    $user = CustUser::where('email', $request->email)->first();

    if (! $user || ! Hash::check($request->password, $user->password)) {
        return response()->json([
            'message' => 'Invalid email or password.'
        ], 401);
    }

    // Issue Sanctum token
    $token = $user->createToken('auth_token')->plainTextToken;
       
    // Prepare clean user data
    $userData = [
        'id'         => $user->id,
        'first_name' => $user->first_name,
        'last_name'  => $user->last_name,
        'email'      => $user->email,
    ];

    return response()->json([
        'message' => 'Login successful',
        'user'    => $userData,
        'token'   => $token,
    ]);
}

 // Get logged in user data
    public function getProfile()
    {
        $user = Auth::user();
        return response()->json([
            'user' => $user
        ]);
    }

  
  // Update profile
public function updateProfile(UpdateProfileRequest $request)
{
    $user = Auth::user();

    $user->update([
        'first_name' => $request->firstName,
        'last_name'  => $request->lastName,
        'email'      => $request->email,
        'mobile'     => $request->mobile,
    ]); 

    return response()->json([
        'message' => 'Profile updated successfully',
        'user' => $user  // return updated user
    ],201);

   
}

     
    public function forgotPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email'
        ]);
       
        $email = $request->email;
       
        // Check if email exists in cust_users
       $user = CustUser::where('email',$email)->first();
       
       if(!$user)
       {
         return response()->json(['message' => 'No user found with this email'],404);
       }

       // Generate a random token
        $token = Str::random(60);

        PasswordReset::updateOrCreate(
            ['email' => $email], // unique identifier
            [
                'token' => $token,
                'created_at' => Carbon::now()
            ]
        );

        // Create reset URL 
        $resetUrl = env('FRONTEND_URL') . "/reset-password?token={$token}&email={$email}";

        try{
            Mail::send(
            'email.email_templates.reset-password',   // // Blade template path
            ['url' => $resetUrl, 'name' => $user->first_name],   // variables for template
            function($message) use ($email){
                $message->to($email)
                        ->subject('Reset Your Password');
            }
        );
        }
        catch(\Exception $e){
            return response()->json([
               'message' => 'Failed to send email.'
            ], 500);
        }
        

        return response()->json([
            'message' => 'Password reset link sent sucessfully to your email.'
        ], 200);

    }

   public function resetPassword(Request $request)
  {
    $request->validate([
        'email' => 'required|email|exists:cust_users,email',
        'token' => 'required|string',
        'password' => 'required|string|min:6|confirmed',
    ]);

    $passwordReset = PasswordReset::where('email', $request->email)
                                   ->where('token', $request->token)
                                   ->first();

    if (!$passwordReset) {
        return response()->json([
            'message' => 'Invalid or expired reset link.'
        ], 400);
    }

    $user = CustUser::where('email', $request->email)->first();

    $user->password = Hash::make($request->password);
   
    $user->save();

    $passwordReset->delete(); // Delete token after use

    return response()->json([
        'message' => 'Password has been reset successfully.'
    ], 200);
}


}
