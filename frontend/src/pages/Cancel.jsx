import React from "react";

const CancelPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-red-50">
            <h1 className="text-4xl font-bold text-red-600 mb-4">Payment Canceled ❌</h1>
            <p className="text-lg text-gray-700 mb-6">
                Your payment was not completed. If this was a mistake, please try again.
            </p>
            <a
                href="/donate-page"
                className="px-6 py-3 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition"
            >
                Try Again
            </a>
        </div>
    );
};

export default CancelPage;
