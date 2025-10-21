<?php

namespace App\Http\Controllers;

use App\Models\PaymentMethod;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PaymentMethodController extends Controller
{
    
    public function index()
    {
        return response()->json(PaymentMethod::where('user_id', Auth::id())->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|string',
            'cardholder' => 'nullable|string|max:255',
            'details' => 'required|string|max:255',
            'expiry' => 'nullable|string|max:255',
            'cvv' => 'nullable|string|max:4'
        ]);

        $validated['user_id'] =  Auth::user();

        $payment = PaymentMethod::create([
            'user_id' => Auth::user()->id,
            'type' => $request->type,
            'cardholder' => $request->cardholder,
            'details' => $request->details,
            'expiry' => $request->expiry,
            'cvv' => $request->cvv,
        ]);


        return response()->json($payment, 201);
    }

    public function show(PaymentMethod $paymentMethod)
    {
        return response()->json($paymentMethod);
    }

    public function update(Request $request, PaymentMethod $paymentMethod)
    {
        $validated = $request->validate([
              'type' => 'required|string',
              'cardholder' => 'nullable|string|max:255',
              'details' => 'required|string|max:255',
              'expiry' => 'nullable|string|max:10',
              'cvv' => 'nullable|string|max:255'
        ]);

        $paymentMethod->update($validated);

        return response()->json($paymentMethod);
    }

    public function destroy(PaymentMethod $paymentMethod)
    {
        $paymentMethod->delete();

        return response()->json(['message' => 'Payment Method Deleted Successfully.']);
    }
}
