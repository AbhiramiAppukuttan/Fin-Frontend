import React from "react";
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 text-center">
      <div className="max-w-md p-8 bg-white shadow-lg rounded-lg">
        <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-5xl font-bold mb-2 text-gray-900">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Oops! Page Not Found</h2>
        <p className="text-gray-500 mb-6">
          The page you're looking for doesn't exist. It may have been moved or deleted.
        </p>
        <Link
          to="/"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg font-medium transition"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
