import React, { useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addSavingsAPI, deleteSavingsAPI, editSavingAPI, viewSavingsAPI } from '../../services/savingsServices';
import { useFormik } from 'formik';
import { savingsSchema } from '../../schema';
import { Link } from "react-router-dom"; // Import Link from react-router-dom


const Savings = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editedData, setEditedData] = useState({});

  const queryClient = useQueryClient();

  const { data: savings, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['view-savings'],
    queryFn: viewSavingsAPI,
  });

  const { mutateAsync } = useMutation({
    mutationFn: addSavingsAPI,
    mutationKey: ['add-savings'],
  });

  console.log(savings);


  const getSavingsStatus = (goalAmount, savedAmount) => {
    const remaining = goalAmount - savedAmount;

    if (remaining > 0) return "✅ On Track";  // Still saving
    if (remaining === 0) return "⚠️ Just Reached"; // Goal met exactly
    return "🚨 Exceeded"; // Saved more than needed
  };

  const { mutateAsync: updateSaving } = useMutation({
    mutationFn: editSavingAPI,
    mutationKey: ['edit-saving'],
    onSuccess: () => {
      queryClient.invalidateQueries(['view-savings']);
    },
  });

  const handleEdit = (saving) => {
    setEditingId(saving._id);
    setEditedData({
      ...saving,
      targetDate: saving.targetDate ? new Date(saving.targetDate).toISOString().split("T")[0] : '' // Ensure correct format
    });
  };
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSave = async () => {
    try {
      if (!editingId) return;

      const updatedSaving = {
        ...editedData,
        targetDate: new Date(editedData.targetDate).toISOString().split("T")[0], // Fix date format
      };

      console.log("Sending update request:", updatedSaving); // Debugging log

      await updateSaving({ id: editingId, ...updatedSaving });

      setEditingId(null);
      setEditedData({});
      setSuccessMessage("Saving updated successfully!");
      setErrorMessage(null);
      refetch();
    } catch (error) {
      setErrorMessage("Failed to update saving. Please try again.");
    }
  };

  const { mutateAsync: deleteSaving } = useMutation({
    mutationFn: deleteSavingsAPI,
    mutationKey: ['delete-saving'],
    onMutate: async (deletedId) => {
      await queryClient.cancelQueries(['view-savings']); // Ensure correct query key

      // Get previous transactions before deletion
      const previousTransactions = queryClient.getQueryData(['view-savings']);

      // Optimistically update UI
      queryClient.setQueryData(['view-savings'], (old) =>
        old?.filter((saving) => saving._id !== deletedId) || []
      );

      return { previousTransactions }; // ✅ Correct return object
    },
    onError: (error, _, context) => {
      setErrorMessage(error?.response?.data?.message || 'Failed to delete saving.');

      // Rollback on error
      if (context?.previousTransactions) {
        queryClient.setQueryData(['view-savings'], context.previousTransactions);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(['view-savings']);
    },
  });



  const { values, handleBlur, isSubmitting, touched, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      title: '',
      goalAmount: 0,
      targetDate: '',
      savedAmount: 0
    },
    validationSchema: savingsSchema,
    onSubmit: async (values, action) => {
      try {
        const data = await mutateAsync(values);

        setSuccessMessage(data);
        setErrorMessage(null);
        action.resetForm();
        refetch();
      } catch (error) {
        setErrorMessage(error?.response?.data?.message || "Something went wrong!");
      }
    }

  });
  // console.log(errors)
  return (
    <div className="min-h-screen bg-gray-100 p-6 pt-24">
      <div className="max-w-4xl mx-auto mt-3 p-6 rounded-lg shadow-md text-center bg-gradient-to-r from-green-400 to-indigo-600 text-white">
  <h3 className="text-2xl font-semibold">💡 Recommendations & Tips</h3>
  <p className="mt-2">
    Discover expert budgeting tips and strategies to optimize your budget.
  </p>

  <Link to="/user/recommendationsavings">
    <button
      className="mt-4 px-6 py-2 bg-white text-green-700 font-semibold rounded-full shadow-lg hover:scale-105 transition-all duration-300"
    >
      Explore Now
    </button>
  </Link>
</div>

      {/* Page Header */}
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-gray-800">Savings Goals</h2>
        <p className="text-gray-600">Set, track, and adjust your savings goals.</p>
      </div>

      {/* Create Savings Goal Button */}
      <div className="max-w-4xl mx-auto mt-6">
        <button
          onClick={() => setIsFormVisible(!isFormVisible)}
          className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition-all"
        >
          {isFormVisible ? 'Cancel' : 'Set Savings Goal'}
        </button>
      </div>

      {/* Create Savings Goal Form  */}
      {isFormVisible && (
        <div className="max-w-4xl mx-auto mt-6 bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="title">
                Goal Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={values.title}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter goal title"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="goalAmount">
                Goal Amount ($)
              </label>
              <input
                type="number"
                id="goalAmount"
                name="goalAmount"
                value={values.goalAmount}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter goal amount"
              />
              {errors.goalAmount && (
                <p className="text-red-500 text-sm mt-1">{errors.goalAmount}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="savedAmount">
                Saved Amount ($)
              </label>
              <input
                type="number"
                id="savedAmount"
                name="savedAmount"
                value={values.savedAmount}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter saved amount"
              />
              {errors.savedAmount && (
                <p className="text-red-500 text-sm mt-1">{errors.savedAmount}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="targetDate">
                Goal Target Date
              </label>
              <input
                type="date"
                id="targetDate"
                name="targetDate"
                value={values.targetDate}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              {errors.targetDate && (
                <p className="text-red-500 text-sm mt-1">{errors.targetDate}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-all"
            >
              Set Goal
            </button>
          </form>
          {successMessage && (
            <div className="mt-4 p-3 bg-green-100 text-green-800 rounded">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="mt-4 p-3 bg-red-100 text-red-800 rounded">
              {errorMessage}
            </div>
          )}
        </div>
      )}

      {/* Savings Goals List (Design Only) */}
      <div className="max-w-4xl mx-auto mt-6 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Your Savings Goals</h3>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-300">

              <th className="py-2">Title</th>
              <th className="py-2">Goal Amount</th>
              <th className="py-2">Saved Amount</th>
              <th className="py-2">Target Date</th>
              <th className="py-2">Progress</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {savings?.map((saving) => (
              <tr key={saving._id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-2">
                  {editingId === saving._id ? <input type="text" name="title" value={editedData.title} onChange={handleEditChange} className="border p-1 rounded" /> : saving.title}
                </td>
                <td className="py-2">
                  {editingId === saving._id ? <input type="number" name="goalAmount" value={editedData.goalAmount} onChange={handleEditChange} className="border p-1 rounded" /> : saving.goalAmount}
                </td>
                <td className="py-2">
                  {editingId === saving._id ? <input type="number" name="savedAmount" value={editedData.savedAmount} onChange={handleEditChange} className="border p-1 rounded" /> : saving.savedAmount}
                </td>
                <td className="py-2">
                  {editingId === saving._id ? (
                    <input
                      type="date"
                      name="targetDate"
                      value={editedData.targetDate ? new Date(editedData.targetDate).toISOString().split("T")[0] : ''}
                      onChange={handleEditChange}
                      className="border p-1 rounded"
                    />
                  ) : (
                    new Date(saving.targetDate).toLocaleDateString() // Display normal date format when not editing
                  )}
                </td>

                <td className="py-2 font-semibold">
                  {getSavingsStatus(saving.goalAmount, saving.savedAmount)}
                </td>


                <td className="py-2 flex space-x-3">
                  {editingId === saving._id ? (
                    <button
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition-all"
                      onClick={handleSave} // Make sure this function is called
                    >
                      Save
                    </button>

                  ) : (
                    <button className="text-blue-600 hover:text-blue-800" onClick={() => handleEdit(saving)}>
                      <Edit size={18} />
                    </button>
                  )}
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={async () => {
                      if (window.confirm("Are you sure you want to delete this saving?")) {
                        try {
                          await deleteSaving(saving._id);
                        } catch (error) {
                          console.error("Error deleting saving:", error);
                        }
                      }
                    }}
                  >
                    <Trash2 size={18} />
                  </button>


                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Savings;
