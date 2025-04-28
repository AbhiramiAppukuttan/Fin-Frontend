import React from "react";
import { useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { CreditCard, ShieldCheck, CheckCircle } from "lucide-react";
import { paymentAPI } from "../../services/paymentServices";

const PaymentPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const plans = {
    free: 0,
    basic: 9.99,
    premium: 29.99,
  };


// Extract plan key from URL
const planName = queryParams.get("plan") || "basic";

// Securely fetch the correct price from `plans`
const planPrice = plans[planName] || 19.99;  // Defaults to basic plan if invalid

  // React Query mutation for handling payments
  const { mutateAsync, isLoading, isSuccess, error } = useMutation({
    mutationFn: paymentAPI,
    mutationKey: ["Payment"],
  });


  

  // Formik setup for form validation & handling
  const formik = useFormik({
    initialValues: {
      cardholderName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
    validationSchema: Yup.object({
      cardholderName: Yup.string().required("Cardholder name is required"),
      cardNumber: Yup.string()
        .matches(/^\d{16}$/, "Card number must be 16 digits")
        .required("Card number is required"),
      expiryDate: Yup.string()
        .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry must be MM/YY format")
        .required("Expiry date is required"),
      cvv: Yup.string()
        .matches(/^\d{3}$/, "CVV must be 3 digits")
        .required("CVV is required"),
    }),
    onSubmit: async (values) => {
      await mutateAsync({
        ...values,
        amount: planPrice,  // Ensure it's a number
        plan:planName
      });
      navigate("/profile");
    },
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 p-6 pt-24">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center flex items-center gap-2">
          <CreditCard size={30} className="text-blue-600" /> Secure Payment
        </h2>
        <p className="text-gray-500 text-center mt-2">
          Complete your payment to activate your subscription.
        </p>

        {/* Plan Details (Read-only) */}
        <div className="mt-6 bg-gray-100 p-4 rounded-md text-center">
          <h3 className="text-xl font-semibold text-gray-700 capitalize">{planName} Plan</h3>
          <p className="text-3xl font-bold text-blue-600">${planPrice}/mo</p>
        </div>

        {isSuccess ? (
          <div className="mt-6 p-4 bg-green-100 text-green-700 rounded-md text-center">
            ✅ Payment successful! Your subscription is now active.
          </div>
        ) : (
          <form onSubmit={formik.handleSubmit} className="mt-6 space-y-4">
            {/* Cardholder Name */}
            <div>
              <label className="block text-gray-700">Cardholder Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your name"
                {...formik.getFieldProps("cardholderName")}
              />
              {formik.touched.cardholderName && formik.errors.cardholderName && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.cardholderName}</p>
              )}
            </div>

            {/* Card Number */}
            <div>
              <label className="block text-gray-700">Card Number</label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                placeholder="1234 5678 9012 3456"
                {...formik.getFieldProps("cardNumber")}
              />
              {formik.touched.cardNumber && formik.errors.cardNumber && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.cardNumber}</p>
              )}
            </div>

            {/* Expiry Date & CVV */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-gray-700">Expiry Date</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                  placeholder="MM/YY"
                  {...formik.getFieldProps("expiryDate")}
                />
                {formik.touched.expiryDate && formik.errors.expiryDate && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.expiryDate}</p>
                )}
              </div>
              <div className="flex-1">
                <label className="block text-gray-700">CVV</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                  placeholder="***"
                  {...formik.getFieldProps("cvv")}
                />
                {formik.touched.cvv && formik.errors.cvv && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.cvv}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-4 w-full bg-blue-500 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-600 transition"
              disabled={isLoading || formik.isSubmitting}
            >
              {isLoading ? "Processing..." : <><ShieldCheck size={20} /> Pay ${planPrice} Securely</>}
            </button>
          </form>
        )}

        {/* Error Handling */}
        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
            ❌ {error.message || "Something went wrong!"}
          </div>
        )}

        <p className="text-center text-gray-500 text-sm mt-4 flex items-center justify-center gap-2">
          <CheckCircle size={16} className="text-green-500" /> 100% Secure Payment
        </p>
      </div>
    </div>
  );
};

export default PaymentPage;
