// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { Lightbulb, BookOpen, ThumbsUp, Search } from "lucide-react";
// import { spendingsAPI } from "../../services/notificationServices";
// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';


// const recommendationsData = {

//   const { data: spendingData, isLoading: isSpendingLoading, isError: isSpendingError, error: spendingError } = useQuery({
//     queryKey: ["spending-tips"],
//     queryFn: spendingsAPI,
//   });

//   savings: [
//     "Save at least 20% of your income.",
//     "Use high-yield savings accounts.",
//     "Automate your savings for consistency.",
//     "Cut down on unnecessary subscriptions.",
//     "Buy in bulk to save money.",
//     "Set short-term and long-term savings goals.",
//     "Review your budget every month.",
//     "Track daily expenses to identify spending patterns.",
//     "Avoid impulse purchases by waiting 24 hours before buying.",
//   ],
//   investment: [
//     "Diversify your investments to reduce risk.",
//     "Invest in index funds for long-term stability.",
//     "Consider real estate for passive income.",
//     "Understand risk before investing.",
//     "Avoid emotional investing decisions.",
//     "Reinvest dividends to maximize returns.",
//     "Use a robo-advisor for automated investing.",
//     "Educate yourself on different asset classes before investing.",
//     "Start investing early to benefit from compound interest.",
//   ],
//   budgeting: [
//     "Track expenses to identify spending patterns.",
//     "Use the 50/30/20 rule for budgeting.",
//     "Set clear financial goals and stick to them.",
//     "Reduce dining out to save more money.",
//     "Use budgeting apps to automate tracking.",
//     "Eliminate unnecessary expenses like unused subscriptions.",
//     "Review your financial plan quarterly.",
//     "Use cash for small purchases to control spending.",
//     "Plan your monthly budget before payday.",
//   ],
//   debt: [
//     "Pay more than the minimum balance on debts.",
//     "Avoid using credit cards for unnecessary expenses.",
//     "Create a debt repayment plan like the snowball method.",
//     "Consolidate loans if it lowers interest rates.",
//     "Negotiate better interest rates with lenders.",
//     "Track and prioritize high-interest debt.",
//     "Limit taking new loans unless necessary.",
//     "Avoid payday loans as they have extremely high interest rates.",
//     "Use windfalls (bonuses, tax refunds) to pay off debt faster.",
//   ],
// };

// const { data: spendings, isLoading, isError, error, refetch } = useQuery({
//     queryKey: ['view-spending-tips'],
//     queryFn: spendingsAPI,
//   });


// const getRandomTips = (category, count = 5) => {
//   const tips = recommendationsData[category] || [];
//   return tips.length ? tips.sort(() => Math.random() - 0.5).slice(0, count) : [];
// };

// const RecommendationsTips = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredTips, setFilteredTips] = useState([]);

//   const handleSearch = () => {
//     const keyword = searchTerm.toLowerCase();
//     const tips = getRandomTips(keyword, 5);
//     setFilteredTips(
//       tips.length ? tips : ["❌ No recommendations available for this keyword."]
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col items-center p-6 pt-24">
//       {/* Header */}
//       <header className="w-full max-w-5xl bg-white shadow-lg p-6 rounded-lg flex justify-between items-center mb-10">
//         <h1 className="text-3xl font-bold text-gray-800">💡 Recommendations & Tips</h1>
//         {/* <Link
//           to="/admin"
//           className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
//         >
//           Back to Dashboard
//         </Link> */}
//       </header>

//       {/* Search Section */}
//       <div className="w-full max-w-4xl bg-white shadow-md p-6 rounded-lg flex flex-col items-center mb-6">
//         <h2 className="text-xl font-semibold text-gray-700 mb-4">🔍 Search for Recommendations</h2>
//         <div className="flex w-full max-w-lg">
//           <input
//             type="text"
//             placeholder="Search keyword (e.g., savings, investment, budgeting, debt)"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <button
//             onClick={handleSearch}
//             className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 flex items-center transition"
//           >
//             <Search size={20} className="mr-2" />
//             Search
//           </button>
//         </div>
//       </div>

//       {/* Search Results */}
//       {searchTerm && filteredTips.length > 0 && (
//         <div className="w-full max-w-5xl bg-white shadow-md p-6 rounded-lg mb-6">
//           <h2 className="text-xl font-semibold text-yellow-700 flex items-center gap-2 mb-4">
//             <Lightbulb size={24} className="text-yellow-500" /> Search Results for "{searchTerm}"
//           </h2>
//           <ul className="list-disc list-inside space-y-2 text-gray-800">
//             {filteredTips.map((tip, index) => (
//               <li key={index}>{tip}</li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* Default Recommendations & Tips */}
//       <div className="w-full max-w-5xl flex flex-wrap justify-between gap-6 mt-6">
//         {/* Financial Tips */}
//         <div className="w-full max-w-5xl bg-yellow-100 shadow-md p-6 rounded-lg mb-6">
//         <h2 className="text-xl font-semibold text-yellow-700 flex items-center gap-2 mb-4">
//           <Lightbulb size={24} className="text-yellow-500" /> Spending Analysis
//         </h2>

//         {isSpendingLoading ? (
//           <p className="text-gray-600">Loading spending analysis...</p>
//         ) : isSpendingError ? (
//           <p className="text-red-500">Error fetching spending data: {spendingError.message}</p>
//         ) : (
//           <div>
//             <p className="text-gray-800">
//               <strong>Total Expenses:</strong> ${spendingData?.totalExpenses ? spendingData.totalExpenses.toFixed(2) : "N/A"}
//             </p>
//             <h3 className="text-lg font-semibold mt-4">💰 Top Spending Categories:</h3>
//             <ul className="list-disc list-inside space-y-2 text-gray-800">
//               {spendingData?.topSpendingCategories?.map(([category, amount], index) => (
//                 <li key={index}>
//                   {category}: ${amount ? amount.toFixed(2) : "N/A"}
//                 </li>
//               ))}
//             </ul>

//             <h3 className="text-lg font-semibold mt-4">📌 Recommendations:</h3>
//             <ul className="list-disc list-inside space-y-2 text-gray-800">
//               {spendingData?.recommendations?.map((tip, index) => (
//                 <li key={index}>{tip}</li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>

//         {/* Budgeting Tips */}
//         <div className="flex-1 bg-purple-100 shadow-md p-6 rounded-lg">
//           <h2 className="text-xl font-semibold text-purple-700 flex items-center gap-2 mb-4">
//             <BookOpen size={24} className="text-purple-500" /> Budgeting Tips
//           </h2>
//           <ul className="list-disc list-inside space-y-2 text-gray-800">
//             {getRandomTips("budgeting", 3).map((tip, index) => (
//               <li key={index}>{tip}</li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       {/* Expert Advice Section */}
//       <div className="w-full max-w-5xl bg-blue-100 shadow-md p-6 rounded-lg mt-6">
//         <h2 className="text-xl font-semibold text-blue-700 flex items-center gap-2 mb-4">
//           <ThumbsUp size={24} className="text-blue-500" /> Expert Advice
//         </h2>
//         <p className="text-gray-800 text-lg italic">
//           "Your financial future is built today. Budget wisely, save consistently, and invest smartly!"
//         </p>
//       </div>
//     </div>
//   );
// };

// export default RecommendationsTips;


import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Lightbulb, ThumbsUp, Search } from "lucide-react";
import { savingsAPI, spendingsAPI } from "../../services/notificationServices"; // Import API functions

const RecommendationsTips = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTips, setFilteredTips] = useState([]);

  // Fetch Spending Analysis Data
  const { data: spendingData, isLoading: isSpendingLoading, isError: isSpendingError, error: spendingError } = useQuery({
    queryKey: ["spending-tips"],
    queryFn: spendingsAPI,
  });

  // Fetch Savings Analysis Data
 

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
      {searchTerm && filteredTips.length > 0 && (
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
      )}

      {/* Spending Analysis Section */}
      <div className="w-full max-w-5xl bg-yellow-100 shadow-md p-6 rounded-lg mb-6">
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
      </div>

      {/* Savings Tips Section */}
      

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

export default RecommendationsTips;
