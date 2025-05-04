import React, { useState } from 'react';
import { User, CheckCircle, Star, Edit, Save, ChevronDown, ChevronUp} from 'lucide-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { addProfileAPI, changeAPI, profileAPI } from '../../services/userServices';
import { useFormik } from 'formik';
import { Link } from "react-router-dom";


const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false); // toggle password section
  const [passwordError, setPasswordError] = useState('');


  const { data, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: addProfileAPI,
  });

  const { mutateAsync } = useMutation({
    mutationFn: profileAPI,
    mutationKey: ['edit-profile'],
  });

  const passwordMutation= useMutation({
    mutationFn: changeAPI,
    mutationKey: ['change-password'],
  });

  const user = data?.user || {}; 
  console.log("User Data:", user);

  const currencyNames = [
    "USD", "AED", "AFN", "ALL", "AMD", "ANG", "AOA", "ARS", "AUD", "AWG", "AZN", "BAM", "BBD", "BDT", "BGN", "BHD", "BIF",
    "BMD", "BND", "BOB", "BRL", "BSD", "BTN", "BWP", "BYN", "BZD", "CAD", "CDF", "CHF", "CLP", "CNY", "COP", "CRC", "CUP",
    "CVE", "CZK", "DJF", "DKK", "DOP", "DZD", "EGP", "ERN", "ETB", "EUR", "FJD", "FKP", "FOK", "GBP", "GEL", "GGP", "GHS",
    "GIP", "GMD", "GNF", "GTQ", "GYD", "HKD", "HNL", "HRK", "HTG", "HUF", "IDR", "ILS", "IMP", "INR", "IQD", "IRR", "ISK",
    "JEP", "JMD", "JOD", "JPY", "KES", "KGS", "KHR", "KID", "KMF", "KRW", "KWD", "KYD", "KZT", "LAK", "LBP", "LKR", "LRD",
    "LSL", "LYD", "MAD", "MDL", "MGA", "MKD", "MMK", "MNT", "MOP", "MRU", "MUR", "MVR", "MWK", "MXN", "MYR", "MZN", "NAD",
    "NGN", "NIO", "NOK", "NPR", "NZD", "OMR", "PAB", "PEN", "PGK", "PHP", "PKR", "PLN", "PYG", "QAR", "RON", "RSD", "RUB",
    "RWF", "SAR", "SBD", "SCR", "SDG", "SEK", "SGD", "SHP", "SLE", "SLL", "SOS", "SRD", "SSP", "STN", "SYP", "SZL", "THB",
    "TJS", "TMT", "TND", "TOP", "TRY", "TTD", "TVD", "TWD", "TZS", "UAH", "UGX", "UYU", "UZS", "VES", "VND", "VUV", "WST",
    "XAF", "XCD", "XCG", "XDR", "XOF", "XPF", "YER", "ZAR", "ZMW", "ZWL"
  ];

  
  const formik = useFormik({
    initialValues: {
      username: user?.username || '', 
      dob: user?.dob || '',
      phone: user?.phone || '', 
      currencyPreference: user?.currencyPreference || 'Not Set', // default is INR
      currentPassword: '',
      newPassword: '',
    },
    
    enableReinitialize: true,
//     onSubmit: async (values) => {
//       try {
//         const payload = {
//           username: values.username,
//           dob: values.dob,
//           phone: values.phone,
//           currencyPreference: values.currencyPreference,
//         };
//   // Always include currencyPreference in the payload for premium users
// if (user.plan === "premium") {
//   payload.currencyPreference = values.currencyPreference || 'Not Set';
// }
//         if (values.currentPassword && values.newPassword) {
//           payload.oldPassword = values.currentPassword;
//           payload.password = values.newPassword;
//         }
  
//         await mutateAsync(payload);
//         refetch();
//         setIsEditing(false);
//         setShowPasswordFields(false);
//       } catch (error) {
//         console.error("Error updating profile", error);
//       }
//     },



onSubmit: async (values) => {
  try {
    const payload = {
      username: values.username,
      dob: values.dob,
      phone: values.phone,
      currencyPreference: values.currencyPreference,
    };

    if (user.plan === "premium") {
      payload.currencyPreference = values.currencyPreference || 'Not Set';
    }

    if (values.currentPassword && values.newPassword) {
      payload.oldPassword = values.currentPassword;
      payload.password = values.newPassword;
    }

    await mutateAsync(payload);
    refetch();
    setIsEditing(false);
    setShowPasswordFields(false);
    setPasswordError(''); // Clear error if successful
  } catch (error) {
    console.error("Error updating profile", error);
    if (error.response.data.message === "Incorrect current password") {
      setPasswordError("Incorrect current password. Please try again.");
    } else {
      setPasswordError("Failed to update profile. Please try again.");
    }
  }
},

  });

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setShowPasswordFields(false);
      formik.setFieldValue('currentPassword', '');
      formik.setFieldValue('newPassword', '');
    }
  };
  

  const handleChange = (e) => setUserInfo({ ...userInfo, [e.target.name]: e.target.value });

  const handleSave = () => {
    setIsEditing(false); // Disable edit mode after saving
    setShowPasswordFields(false); // Hide password fields
    alert("Profile updated successfully!");
  };

  const maskPassword = (password) => "•".repeat(password.length);


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 space-y-10 mt-15">
      <div className="max-w-3xl w-full bg-gradient-to-r from-yellow-500 to-orange-500 p-5 rounded-xl shadow-lg border border-yellow-600 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-white">🚀 Unlock Premium Features!</h3>
          <p className="text-white text-sm opacity-90">
            Get access to advanced budgeting tools and insights.
          </p>
        </div>
        <Link to="/user/subscription">
          <button 
            className="bg-gray-900 text-yellow-400 px-5 py-2 rounded-lg font-semibold hover:bg-yellow-600 hover:text-white transition duration-300 ease-in-out transform hover:scale-105 shadow-md">
            Subscribe Now
          </button>
        </Link>
      </div>
      {/* <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800">User Profile</h2>
      </div> */}
      <div className="max-w-3xl w-full bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center shadow-sm">
            <User size={50} className="text-gray-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mt-4">{user?.username || 'User Name'}</h2>
          <div className="flex items-center gap-3">
                {user?.verified && <CheckCircle size={20} className="text-green-500" title="Verified User" />} 
                {user?.subscribed && <Star size={20} className="text-yellow-500" title="Subscribed User" />} 
              </div>
        </div>

      <div className="max-w-4xl mx-auto mt-6 bg-white p-8 rounded-xl shadow-lg">
        <div className="flex items-center justify-between mb-6">
          
             {/* <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
              <User size={48} className="text-gray-600" />
            </div> */}
            <div className="ml-0">
            <h3 className="text-xl font-semibold text-gray-700">Profile Information</h3>
              
            </div> 
          
          <button 
            onClick={() => setIsEditing(!isEditing)} 
            className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-600">
            {isEditing ? <Save size={16} /> : <Edit size={16} />} 
            {isEditing ? "Save" : "Edit"}
          </button>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
        
        <div className="flex justify-between items-center">
            <p className="text-gray-700 font-semibold">Name</p>
            {isEditing ? (
              <input 
                type="text" 
                name="username" 
                value={formik.values.username} 
                onChange={formik.handleChange} 
                className="border border-gray-300 rounded-md p-2"
              />
            ) : (
            <p>{user?.username }</p>
            )}
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-700 font-semibold">Email</p>
            <p>{user?.email}</p>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-gray-700 font-semibold">Date of Birth</p>
            {isEditing ? (
              <input 
                type="date" 
                name="dob" 
                value={formik.values.dob} 
                onChange={formik.handleChange} 
                className="border border-gray-300 rounded-md p-2"
              />
            ) : (
              <p>{user?.dob ? new Date(user.dob).toLocaleDateString() : 'Not set'}</p>
            )}
          </div>

          <div className="flex justify-between items-center">
            <p className="text-gray-700 font-semibold">Phone</p>
            {isEditing ? (
              <input 
                type="text" 
                name="phone" 
                value={formik.values.phone} 
                onChange={formik.handleChange} 
                className="border border-gray-300 rounded-md p-2"
              />
            ) : (
              <p>{user?.phone}</p>
            )}
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-700 font-semibold">Currency Preference</p>
            {/* {isEditing ? (
              <input 
                type="text" 
                name="currencyPreference" 
                value={formik.values.currencyPreference} 
                onChange={formik.handleChange} 
                className="border border-gray-300 rounded-md p-2"
              />
            ) : (
              <p>{user?.currencyPreference || 'INR'}</p>
            )} */}
            {isEditing ? (
  user?.plan === "premium" ? (
    // <input 
    //   type="text" 
    //   name="currencyPreference" 
    //   value={formik.values.currencyPreference} 
    //   onChange={formik.handleChange} 
    //   className="border border-gray-300 rounded-md p-2"
    // />
    <select
        name="currencyPreference"
        value={formik.values.currencyPreference}
        onChange={formik.handleChange}
        className="border border-gray-300 rounded-md p-2"
      >
        {currencyNames.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
  ) : (
    <div>
      <p className="text-gray-700">{user?.currencyPreference || 'Not Set'}</p>
      <p className="text-red-500 text-sm mt-1">Currency preference editing is only available for Premium users.</p>
    </div>
  )
) : (
  <p>{user?.currencyPreference || 'Not Set'}</p>
)}

          </div>
{/* {isEditing && (
  <div>
    <div className="flex justify-between items-center">
      <p className="text-gray-700 font-semibold">Password</p>
      <div
        className="flex items-center gap-2 cursor-pointer text-blue-600 font-semibold"
        onClick={() => setShowPasswordFields(!showPasswordFields)}
      >
        <span>Change Password</span>
        {showPasswordFields ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </div>
    </div>

    {showPasswordFields && (
      <div className="mt-4 space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Current Password</label>
          <input
            type="password"
            name="currentPassword"
            value={formik.values.currentPassword}
            onChange={formik.handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        {passwordError && (
      <p className="text-red-500 text-sm mt-1">{passwordError}</p>
    )}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">New Password</label>
          <input
            type="password"
            name="newPassword"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
      </div>
    )}
  </div>
)} */}

{isEditing && (
  <>
    <div
      className="flex justify-between items-center cursor-pointer"
      onClick={() => setShowPasswordFields(!showPasswordFields)}
    >
      <p className="text-blue-600 font-semibold">Change Password</p>
      {showPasswordFields ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
    </div>

    {showPasswordFields && (
      <>
        <div className="flex justify-between items-center">
          <p className="text-gray-700 font-semibold">Current Password</p>
          <input
            type="password"
            name="currentPassword"
            value={formik.values.currentPassword}
            onChange={formik.handleChange}
            className="border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="flex justify-between items-center">
          <p className="text-gray-700 font-semibold">New Password</p>
          <input
            type="password"
            name="newPassword"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            className="border border-gray-300 rounded-md p-2"
          />
        </div>
        {passwordError && (
          <p className="text-red-500 text-sm mt-2">{passwordError}</p>
        )}
      </>
    )}
  </>
)}


          
          {isEditing && (
            <button 
              type="submit" 
              className="w-full bg-green-500 text-white py-2 rounded-md mt-4 hover:bg-green-600">
              Save Changes
            </button>
          )}
        </form>
      </div>
      </div>
    </div>
  );
};

export default UserProfile;