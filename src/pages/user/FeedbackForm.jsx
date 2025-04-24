import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { Send, MessageCircle } from "lucide-react";
import { feedbackAPI } from "../../services/complaintServices";

const FeedbackForm = () => {
  const [isFormVisible, setIsFormVisible] = useState(true);

  const { mutateAsync, isLoading, isSuccess, error } = useMutation({
    mutationFn: feedbackAPI,
    mutationKey: ["SubmitFeedback"],
    onSuccess: () => {
      setIsFormVisible(false);
    },
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      type: "feedback",
      description: "",
    },
    validationSchema: Yup.object({
      description: Yup.string().required("Message cannot be empty"),
    }),
    onSubmit: async (values) => {
      console.log("Submitting values:", values); // Debugging
      await mutateAsync(values);
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 to-purple-300 p-6">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <MessageCircle size={28} className="text-blue-600" /> Submit Your Feedback
        </h1>
        <p className="text-gray-600 mt-1">We value your feedback and complaints!</p>

        {isFormVisible ? (
          <form onSubmit={formik.handleSubmit} className="mt-6 space-y-4">
            {/* Type Selection */}
            <div>
              <label className="block text-gray-700">Type</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 bg-white text-black"
                {...formik.getFieldProps("type")}
              >
                <option value="feedback">Feedback</option>
                <option value="complaint">Complaint</option>
              </select>
            </div>

            {/* Message Input */}
            <div>
              <label className="block text-gray-700">Message</label>
              <textarea
                rows="4"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 bg-white text-black placeholder-gray-500"
                {...formik.getFieldProps("description")}
                placeholder="Write your feedback or complaint here..."
              />
              {formik.touched.description && formik.errors.description && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.description}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-600 transition"
              disabled={isLoading || formik.isSubmitting}
            >
              {isLoading ? "Submitting..." : <><Send size={20} /> Submit</>}
            </button>
          </form>
        ) : (
          <div className="mt-6 p-4 bg-green-100 text-green-700 rounded-md text-center">
            ✅ Thank you for your submission! We appreciate your feedback.
            <br />
            <button
              onClick={() => setIsFormVisible(true)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              Submit Another Feedback
            </button>
          </div>
        )}

        {/* Error Handling */}
        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
            ❌ {error.description || "Something went wrong!"}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackForm;



// import React, { useState } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { useMutation } from "@tanstack/react-query";
// import { Send, MessageCircle, Star } from "lucide-react";
// import { feedbackAPI } from "../../services/complaintServices";
// import { motion } from "framer-motion";

// const FeedbackSupport = () => {
//   const [tab, setTab] = useState("feedback");
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [rating, setRating] = useState(0);

//   const { mutateAsync, isLoading, error } = useMutation({
//     mutationFn: feedbackAPI,
//     mutationKey: ["SubmitFeedback"],
//     onSuccess: () => setIsSubmitted(true),
//   });

//   const formik = useFormik({
//     initialValues: {
//       type: tab,
//       description: "",
//       rating: 0,
//     },
//     validationSchema: Yup.object({
//       description: Yup.string().required("Message cannot be empty"),
//     }),
//     onSubmit: async (values) => {
//       await mutateAsync({ ...values, rating });
//     },
//   });

//   return (
//     <div className="p-6 bg-gray-100 rounded-lg shadow-md max-w-3xl mx-auto">
//       <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
//         <MessageCircle size={28} className="text-blue-600" /> Feedback & Support
//       </h1>
//       <p className="text-gray-600 mt-1">Your voice matters! Share your thoughts below.</p>

//       {/* Tab Switcher */}
//       <div className="flex space-x-4 mt-4">
//         {["feedback", "complaint", "rating"].map((item) => (
//           <button
//             key={item}
//             className={`px-4 py-2 rounded-md transition ${
//               tab === item ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
//             }`}
//             onClick={() => {
//               setTab(item);
//               formik.setFieldValue("type", item);
//             }}
//           >
//             {item.charAt(0).toUpperCase() + item.slice(1)}
//           </button>
//         ))}
//       </div>

//       {isSubmitted ? (
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="mt-6 p-4 bg-green-100 text-green-700 rounded-md text-center"
//         >
//           ✅ Thank you for your submission!
//           <br />
//           <button
//             onClick={() => setIsSubmitted(false)}
//             className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
//           >
//             Submit Another
//           </button>
//         </motion.div>
//       ) : (
//         <motion.form
//           onSubmit={formik.handleSubmit}
//           className="mt-6 space-y-4"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//         >
//           {tab === "rating" && (
//             <div>
//               <label className="block text-gray-700">Rate Us</label>
//               <div className="flex space-x-2 text-yellow-500 text-2xl">
//                 {[1, 2, 3, 4, 5].map((num) => (
//                   <Star
//                     key={num}
//                     className={num <= rating ? "fill-yellow-500" : "stroke-yellow-500"}
//                     onClick={() => setRating(num)}
//                   />
//                 ))}
//               </div>
//             </div>
//           )}

//           <div>
//             <label className="block text-gray-700">Message</label>
//             <textarea
//               rows="4"
//               className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
//               {...formik.getFieldProps("description")}
//               placeholder="Write your {tab} here..."
//             />
//             {formik.touched.description && formik.errors.description && (
//               <p className="text-red-500 text-sm mt-1">{formik.errors.description}</p>
//             )}
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-600 transition"
//             disabled={isLoading || formik.isSubmitting}
//           >
//             {isLoading ? "Submitting..." : <><Send size={20} /> Submit</>}
//           </button>
//         </motion.form>
//       )}

//       {error && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="mt-4 p-3 bg-red-100 text-red-700 rounded-md"
//         >
//           ❌ {error.description || "Something went wrong!"}
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export default FeedbackSupport;
