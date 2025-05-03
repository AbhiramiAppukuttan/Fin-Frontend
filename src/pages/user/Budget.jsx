import React, { useState } from 'react';
import { Bell, Edit, Trash2 } from 'lucide-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addBudgetAPI, deleteBudgetAPI, editBudgetAPI, viewBudgetAPI } from '../../services/budgetServices';
import { useFormik } from 'formik';
import { budgetSchema } from '../../schema';
import { Link } from "react-router-dom"; // Import Link from react-router-dom


const Budget = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  
  const [editingId, setEditingId] = useState(null);
  const [editedData, setEditedData] = useState({});
  
  const queryClient = useQueryClient();
  
  
  const { data: budgets, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['view-budget'],
    queryFn: viewBudgetAPI,
  });

  const { mutateAsync } = useMutation({
    mutationFn: addBudgetAPI,
    mutationKey: ['add-budget'],
  });

  const getBudgetStatus = (limit,spent) => {
    const remaining = limit - spent;
  
    if (remaining > 0) return "✅ On Track";  // Still saving
    if (remaining === 0) return "⚠️ Just Reached"; // Goal met exactly
    return "🚨 Exceeded"; // Saved more than needed
  };

  const { mutateAsync: editBudget } = useMutation({
    mutationFn: editBudgetAPI,
    mutationKey: ['edit-budget'],
    onSuccess: () => {
      queryClient.invalidateQueries(['view-budget']);
    },
  });

  const handleEdit = (budget) => {
    setEditingId(budget._id);
    setEditedData({ ...budget }); // Create a copy to avoid reference issues
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
  
      const updatedBudget = { ...editedData };
  
      // Optimistically update UI
      queryClient.setQueryData(['view-budget'], (oldData) => {
        if (!oldData) return [];
        return oldData.map((budget) =>
          budget._id === editingId ? { ...budget, ...updatedBudget } : budget
        );
      });
  
      // Perform API update
      await editBudget({ id: editingId, ...updatedBudget });
  
      // Ensure backend data syncs with UI
      await queryClient.invalidateQueries(['view-budget']);
  
      // Reset state after success
      setEditingId(null);
      setEditedData({});
      setSuccessMessage('Budget updated successfully!');
      setErrorMessage(null);
      // refetch();
      // Clear success message after a few seconds
      // setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      console.error('Error updating budget:', error);
      setErrorMessage('Failed to update budget. Please try again.');
    }
  };
  

  const { mutateAsync: deleteBudgets } = useMutation({
        mutationFn: deleteBudgetAPI,
        mutationKey: ['delete-budgets'],
        onMutate: async (deletedId) => {
          await queryClient.cancelQueries(['view-budget']);
      
          // Get previous data before mutation
          const previousBudgets = queryClient.getQueryData(['view-budget']);
      
          // Optimistically remove the budget from UI
          queryClient.setQueryData(['view-budget'], (old) =>
            old?.filter((budget) => budget._id !== deletedId) || []
          );
      
          return { previousBudgets };
        },
        onError: (error, _, context) => {
          setErrorMessage(error?.response?.data?.message || 'Failed to delete budget.');
          
          // Rollback UI on error
          if (context?.previousBudgets) {
            queryClient.setQueryData(['view-budget'], context.previousBudgets);
          }
        },
        onSettled: () => {
          queryClient.invalidateQueries(['view-budget']);
        },
      });
      
  // const { mutateAsync: deleteBudget } = useMutation({
  //   mutationFn: deleteBudgetAPI,
  //   mutationKey: ['delete-budget']

  // });
  
  const { values, handleBlur, isSubmitting, touched, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      frequency: "monthly",
      category: "",
      startDate: "",
      limit: 0,
      spent:0
    },
    validationSchema:budgetSchema,
    onSubmit: async (values, action) => {    
      try {
        const data = await mutateAsync(values);
        setSuccessMessage(data);
        setErrorMessage(null);
        refetch()
      } catch (error) {
        console.error("Budget submission failed:", error);
        setErrorMessage(error?.response?.data?.message || "Something went wrong!");
      }
    }
    
  });
  return (
    <div className="min-h-screen bg-gray-100 p-6 pt-24">

      {/* Recommendations & Tips Section */}
      <div className="max-w-4xl mx-auto mt-3 p-6 rounded-lg shadow-md text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <h3 className="text-2xl font-semibold">💡 Recommendations & Tips</h3>
          <p className="mt-2">
            Discover expert budgeting tips and strategies to optimize your budget.
          </p>

          <Link to="/user/recommendationstips">
          <button
            className="mt-4 px-6 py-2 bg-white text-blue-600 font-semibold rounded-full shadow-lg hover:scale-105 transition-all duration-300"
            onClick={() => navigate("/recommendationstips")}
          >
            Explore Now
          </button>
        </Link>
          
        </div>

        {/* Spacer */}
        <div className="my-8"></div>

        {/* Page Header */}
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-gray-800">Budget Management</h2>
          <p className="text-gray-600">Create and monitor your budgets efficiently.</p>
        </div>

      {/* Create Budget Button */}
      <div className="max-w-4xl mx-auto mt-6">
        <button
          onClick={() => setIsFormVisible(!isFormVisible)}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-all"
        >
          <Bell className="mr-2" /> {isFormVisible ? 'Cancel' : 'Create Budget'}
        </button>
      </div>

      {/* Create Budget Form  */}
      {isFormVisible && (
        <div className="max-w-4xl mx-auto mt-6 bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="frequency">
                Budget Type
              </label>
              <select
                id="frequency"
                name="frequency"
                value={values.frequency}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
              >
                <option value="monthly">Monthly</option>
                <option value="weekly">Weekly</option>
                <option value="yearly">Yearly</option>
              </select>
              {errors.frequency && touched.frequency && (
                <p className="text-red-500 text-sm mt-1">{errors.frequency}</p>
              )}
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2" htmlFor="category">
                  Category
                </label>
                <input
                type="text"
                id="category"
                name="category"
                value={values.category}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter category"
              />
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category}</p>
              )}
              </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="limit">
                Budget Amount
              </label>
              <input
                type="number"
                id="limit"
                name="limit"
                value={values.limit}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter budget amount"
              />
              {errors.limit && (
                <p className="text-red-500 text-sm mt-1">{errors.limit}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="spent">
                Spent
              </label>
              <input
                type="number"
                id="spent"
                name="spent"
                value={values.spent}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter budget amount"
              />
              {errors.spent && (
                <p className="text-red-500 text-sm mt-1">{errors.spent}</p>
              )}
            </div>

            <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="startDate">
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={values.startDate}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            {errors.startDate && (
              <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>
            )}
          </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all"
            >
              Create Budget
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
       <div className="max-w-4xl mx-auto mt-6 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Monitor Your Budget</h3>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-300">
              {/* <th className="py-2">Date</th> */}
              <th className="py-2">Type</th>
              <th className="py-2">Category</th>
              <th className="py-2">Budget Amount</th>
              <th className="py-2">Amount Spent</th>
              <th className="py-2">Remaining</th>
              <th className="py-2">Alerts</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
          {Array.isArray(budgets) && budgets.map((budget) => (
              <tr key={budget._id} className="border-b border-gray-200 hover:bg-gray-100">
              {/* <td className="py-2">
  {editingId === budget._id ? (
    <input 
      type="date" 
      name="startDate" 
      value={editedData?.startDate ? new Date(editedData.startDate).toISOString().split('T')[0] : ''} 
      onChange={handleEditChange} 
      className="border p-1 rounded" 
    />
  ) : (
    budget.startDate ? new Date(budget.startDate).toLocaleDateString() : 'N/A'
  )}
</td> */}
<td className="py-2">
  {editingId === budget._id ? (
    <select
      name="frequency"
      value={editedData.frequency || budget.frequency}  // Ensure fallback value
      onChange={handleEditChange}
      className="border p-1 rounded"
    >
      <option value="monthly">Monthly</option>
      <option value="weekly">Weekly</option>
      <option value="yearly">Yearly</option>
    </select>
  ) : (
    budget.frequency
  )}
</td>


                <td className="py-2">
                  {editingId === budget._id ? <input type="text" name="category" value={editedData.category} onChange={handleEditChange} className="border p-1 rounded" /> : budget.category}
                </td>
                  <td className="py-2 text-green-600">
                    {editingId === budget._id ? <input type="number" name="limit" value={editedData.limit} onChange={handleEditChange} className="border p-1 rounded" /> : budget.limit}
                  </td>
                  <td className="py-2 text-green-600">
                    {editingId === budget._id ? <input type="number" name="spent" value={editedData.spent} onChange={handleEditChange} className="border p-1 rounded" /> : budget.spent}
                  </td>
                  <td className="py-2">{budget.limit-budget.spent}</td>
                  
                <td className="py-2 font-semibold">
                    {getBudgetStatus(budget.limit,budget.spent)}
                 </td>

                    <td className="py-2 flex space-x-3">
                      {editingId === budget._id ? (
                    <button 
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition-all"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                    ) : (
                    <button 
                      className="text-blue-600 hover:text-blue-800" 
                      onClick={() => handleEdit(budget)}>
                      <Edit size={18} />
                    </button>
                    )}


                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={async () => {
                    if (window.confirm("Are you sure you want to delete this budget?")) {
                      try {
                        await deleteBudgets(budget._id);
                      } catch (error) {
                        console.error("Error deleting budget:", error);
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
export default Budget;
