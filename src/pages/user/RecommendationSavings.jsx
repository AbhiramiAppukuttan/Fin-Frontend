import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Lightbulb, ThumbsUp, Search } from "lucide-react";
import { savingsAPI, spendingsAPI } from "../../services/notificationServices"; // Import API functions

const RecommendationSavings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTips, setFilteredTips] = useState([]);

  // Fetch Spending Analysis Data
  
  // Fetch Savings Analysis Data
  const { data: savingData, isLoading: isSavingLoading, isError: isSavingError, error: savingError } = useQuery({
    queryKey: ["saving-tips"],
    queryFn: savingsAPI,
  });

  // Handle Search Input
  const handleSearch = () => {
    const keyword = searchTerm.toLowerCase();
    const tips = [
      ...(spendingData?.recommendations || []),
      ...(savingData?.recommendations || []),
    ].filter((tip) => tip.toLowerCase().includes(keyword));

    setFilteredTips(tips.length > 0 ? tips : ["❌ No recommendations found."]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col items-center p-6 pt-24">
      {/* Header */}
      <header className="w-full max-w-5xl bg-white shadow-lg p-6 rounded-lg flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800">💡 Recommendations & Tips</h1>
      </header>

      {/* Search Section */}
      {/* <div className="w-full max-w-4xl bg-white shadow-md p-6 rounded-lg flex flex-col items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">🔍 Search for Recommendations</h2>
        <div className="flex w-full max-w-lg">
          <input
            type="text"
            placeholder="Search recommendations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 flex items-center transition"
          >
            <Search size={20} className="mr-2" />
            Search
          </button>
        </div>
      </div> */}

      {/* Search Results */}
      {/* {searchTerm && filteredTips.length > 0 && (
        <div className="w-full max-w-5xl bg-white shadow-md p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold text-yellow-700 flex items-center gap-2 mb-4">
            <Lightbulb size={24} className="text-yellow-500" /> Search Results for "{searchTerm}"
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-800">
            {filteredTips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      )} */}

      {/* Spending Analysis Section */}
      {/* <div className="w-full max-w-5xl bg-yellow-100 shadow-md p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-yellow-700 flex items-center gap-2 mb-4">
          <Lightbulb size={24} className="text-yellow-500" /> Spending Analysis
        </h2>

        {isSpendingLoading ? (
          <p className="text-gray-600">Loading spending analysis...</p>
        ) : isSpendingError ? (
          <p className="text-red-500">Error fetching spending data: {spendingError.message}</p>
        ) : (
          <div>
            <p className="text-gray-800">
              <strong>Total Expenses:</strong> ${spendingData?.totalExpenses ? spendingData.totalExpenses.toFixed(2) : "N/A"}
            </p>
            <h3 className="text-lg font-semibold mt-4">💰 Top Spending Categories:</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-800">
              {spendingData?.topSpendingCategories?.map(([category, amount], index) => (
                <li key={index}>
                  {category}: ${amount ? amount.toFixed(2) : "N/A"}
                </li>
              ))}
            </ul>

            <h3 className="text-lg font-semibold mt-4">📌 Recommendations:</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-800">
              {spendingData?.recommendations?.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>
        )}
      </div> */}

      {/* Savings Tips Section */}
      <div className="w-full max-w-5xl bg-green-100 shadow-md p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-green-700 flex items-center gap-2 mb-4">
          <Lightbulb size={24} className="text-green-500" /> Savings Analysis
        </h2>

        {isSavingLoading ? (
          <p className="text-gray-600">Loading savings analysis...</p>
        ) : isSavingError ? (
          <p className="text-red-500">Error fetching savings data: {savingError.message}</p>
        ) : (
          <div>
            <h3 className="text-lg font-semibold mt-4">💰 Savings Tips:</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-800">
              {savingData?.recommendations?.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Expert Advice Section */}
      <div className="w-full max-w-5xl bg-blue-100 shadow-md p-6 rounded-lg mt-6">
        <h2 className="text-xl font-semibold text-blue-700 flex items-center gap-2 mb-4">
          <ThumbsUp size={24} className="text-blue-500" /> Expert Advice
        </h2>
        <p className="text-gray-800 text-lg italic">
          "Your financial future is built today. Budget wisely, save consistently, and invest smartly!"
        </p>
      </div>
    </div>
  );
};

export default RecommendationSavings;
