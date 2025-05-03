// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from 'react-redux';
// import { CheckCircle, Shield, Star, ArrowRight } from "lucide-react";
// import { useQuery } from "@tanstack/react-query";
// import { planAPI } from "../../services/userServices";

// const SubscriptionPage = () => {
  
//   const [selectedPlan, setSelectedPlan] = useState("basic");
//   const navigate = useNavigate();
//   const user = useSelector((state) => state.auth.user);
//   const splan = user?.plan ?? null;
//   console.log(splan);
    
//   const plans = {
//     free: { title: "Free", price: 0, icon: <Shield />, features: ["Basic Features", "Email Support"] },
//     basic: { title: "Basic", price: 9.99, icon: <Star />, features: ["Everything in Basic", "Advanced Features", "Priority Support"] },
//     premium: { title: "Premium", price: 29.99, icon: <Shield />, features: ["Everything in Standard", "Dedicated Manager", "Custom Integrations"] },
//   };

//   const handleSubscribe = (planKey) => {
//   const plan = plans[planKey];

//     // Navigate to payment page with correct parameters
//     navigate(`/user/payment?plan=${planKey}&price=${plan.price}`);
//   };

//   const { data:userplan } = useQuery({
//     queryFn: planAPI,
//     queryKey: ["Plan-view"],
//   });

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex flex-col items-center p-6 pt-24">
//       <header className="text-center">
//         <h1 className="text-5xl font-extrabold text-blue-900 drop-shadow-lg">🌟 Choose Your Plan</h1>
//         <p className="text-lg text-gray-700 mt-2">Select a subscription that suits your needs</p>
//       </header>

//       <div className="flex flex-wrap justify-center gap-10 mt-10">
//       {Object.keys(plans).map((planKey) => {
//       const plan = plans[planKey];
//       const isSubscribed = splan === planKey;

//   return (
//     <div
//       key={planKey}
//       className={`w-80 bg-white shadow-xl rounded-2xl p-8 transition transform hover:-translate-y-2 cursor-pointer border-4 
//       ${selectedPlan === planKey ? "border-blue-600" : "border-transparent"}`}
//       onClick={() => setSelectedPlan(planKey)}
//     >
//       <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">{plan.icon} {plan.title}</h2>
//       <h3 className="text-4xl font-extrabold text-blue-600 mt-4">${plan.price}/mo</h3>
//       <ul className="mt-4 space-y-2 text-gray-700">
//         {plan.features.map((feature, index) => (
//           <li key={index} className="flex items-center gap-2">
//             <CheckCircle size={20} className="text-green-500" /> {feature}
//           </li>
//         ))}
//       </ul>

//       {isSubscribed ? (
//         <button
//           disabled
//           className="mt-6 w-full bg-gray-400 text-white py-3 rounded-lg text-lg font-semibold shadow-inner cursor-not-allowed"
//         >
//           ✅ Subscribed
//         </button>
//       ) : (
//         <button
//           onClick={() => handleSubscribe(planKey)}
//           className="mt-6 w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 text-lg font-semibold shadow-md hover:scale-105 transition"
//         >
//           Subscribe <ArrowRight size={20} />
//         </button>
//       )}
//     </div>
//   );
// })}

//       </div>
//     </div>
//   );
// };

// export default SubscriptionPage;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CheckCircle, Shield, Star, ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { planAPI } from "../../services/userServices";

const SubscriptionPage = () => {
  const [selectedPlan, setSelectedPlan] = useState("basic");
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const { data: userPlan, isLoading, isError } = useQuery({
    queryFn: planAPI,
    queryKey: ["Plan-view"],
  });

  const plans = {
    free: {
      title: "Free",
      price: 0,
      icon: <Shield />,
      features: [
        "Unlimited Transactions",
        "Add One Budget and One Savings Goal",
        "Access to Income vs Expense Report Only",
      ],
    },
    basic: {
      title: "Basic",
      price: 9.99,
      icon: <Star />,
      features: [
        "Unlimited Transactions",
        "Create Multiple Budgets and Savings Goals",
        "Access to Budget and Expense Reports",
        
      ],
    },
    premium: {
      title: "Premium",
      price: 29.99,
      icon: <Shield />,
      features: [
        "All Basic Plan Features",
        "Set Preferred Currency",
        "Enable Recurring Transactions",
        
      ],
    },
  };
  

  const handleSubscribe = (planKey) => {
    const plan = plans[planKey];
    navigate(`/user/payment?plan=${planKey}&price=${plan.price}`);
  };

  if (isLoading) return <div className="text-center pt-40 text-lg">Loading plans...</div>;
  if (isError) return <div className="text-center pt-40 text-red-600">Failed to fetch plan.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex flex-col items-center p-6 pt-24">
      <header className="text-center">
        <h1 className="text-5xl font-extrabold text-blue-900 drop-shadow-lg">
          🌟 Choose Your Plan
        </h1>
        <p className="text-lg text-gray-700 mt-2">
          Select a subscription that suits your needs
        </p>
      </header>

      <div className="flex flex-wrap justify-center gap-10 mt-10">
        {Object.keys(plans).map((planKey) => {
          const plan = plans[planKey];
          const isSubscribed = userPlan === planKey;

          return (
            <div
              key={planKey}
              className={`w-80 bg-white shadow-xl rounded-2xl p-8 transition transform hover:-translate-y-2 cursor-pointer border-4 
              ${
                selectedPlan === planKey
                  ? "border-blue-600"
                  : "border-transparent"
              }`}
              onClick={() => setSelectedPlan(planKey)}
            >
              <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                {plan.icon} {plan.title}
              </h2>
              <h3 className="text-4xl font-extrabold text-blue-600 mt-4">
                ${plan.price}/mo
              </h3>
              <ul className="mt-4 space-y-2 text-gray-700">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle size={20} className="text-green-500" />{" "}
                    {feature}
                  </li>
                ))}
              </ul>

              {isSubscribed ? (
                <button
                  disabled
                  className="mt-6 w-full bg-gray-400 text-white py-3 rounded-lg text-lg font-semibold shadow-inner cursor-not-allowed"
                >
                  ✅ Subscribed
                </button>
              ) : (
                <button
                  onClick={() => handleSubscribe(planKey)}
                  className="mt-6 w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 text-lg font-semibold shadow-md hover:scale-105 transition"
                >
                  Subscribe <ArrowRight size={20} />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SubscriptionPage;
