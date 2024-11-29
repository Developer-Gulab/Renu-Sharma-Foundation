import React from "react";

const SuccessPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-green-50">
            <h1 className="text-4xl font-bold text-green-600 mb-4">Payment Successful! 🎉</h1>
            <p className="text-lg text-gray-700 mb-6">
                Thank you for your payment. Your transaction has been successfully completed.
            </p>
            <a
                href="/donate-page"
                className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition"
            >
                Go to Home
            </a>
        </div>
    );
};

export default SuccessPage;
