import React from 'react';
import { Link } from 'react-router-dom';

const PaymentSuccessPage = () => (
    <div className="text-center min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-green-500">Payment Successful!</h1>
        <p className="mt-4 text-lg">Thank you for upgrading to SoleVault Pro.</p>
        <Link to="/dashboard" className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg">
            Go to Dashboard
        </Link>
    </div>
);

export default PaymentSuccessPage;