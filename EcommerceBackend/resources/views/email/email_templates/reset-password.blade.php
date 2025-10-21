<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Request</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background-color: #f2f4f6;
            font-family: 'Arial', sans-serif;
        }
        .email-container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 10px;
            padding: 30px;
            box-shadow: 0px 0px 15px rgba(0,0,0,0.1);
        }
        h1 {
            font-size: 24px;
            color: #333333;
            margin-bottom: 20px;
        }
        p {
            font-size: 16px;
            line-height: 1.6;
            color: #51545E;
        }
        a.reset-button {
            display: inline-block;
            margin-top: 20px;
            padding: 12px 25px;
            background: linear-gradient(90deg, #4A5568, #2D3748);
            color: #ffffff !important;
            text-decoration: none;
            font-weight: bold;
            border-radius: 5px;
        }
        a.reset-button:hover {
            background: linear-gradient(90deg, #2D3748, #1A202C);
        }
        .footer {
            margin-top: 30px;
            font-size: 12px;
            color: #888888;
            text-align: center;
        }

        /* Responsive */
        @media only screen and (max-width: 620px) {
            .email-container {
                width: 90% !important;
                padding: 20px !important;
            }
            h1 {
                font-size: 20px !important;
            }
            p {
                font-size: 14px !important;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <h1>Hello {{ $name }},</h1>
        <p>You requested to reset your password. Click the button below to create a new password:</p>
        <a href="{{ $url }}" class="reset-button">Reset Password</a>
        <p>If you did not request this password reset, you can safely ignore this email.</p>
        <div class="footer">
            &copy; {{ date('Y') }} Your App. All rights reserved.
        </div>
    </div>
</body>
</html>
