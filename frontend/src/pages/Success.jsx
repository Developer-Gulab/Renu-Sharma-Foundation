import React from "react";

const SuccessPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-green-50">
            <h1 className="lg:text-4xl text-2xl font-bold text-green-600 mb-4 text-center">Payment Successful! 🎉</h1>
            <p className="text-[16px] lg:text-lg text-gray-700 mb-6 text-center">
                Thank you for your payment. Your transaction has been successfully completed.
            </p>
            <a
                href="/donate-page"
                className="px-4 py-2 lg:px-6 lg:py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition outline-none"
            >
                Go to Home
            </a>
        </div>
    );
};

export default SuccessPage;
