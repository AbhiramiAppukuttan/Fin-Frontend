// import React, { useState } from 'react';
// import { PlusCircle, Edit, Trash2, Check } from 'lucide-react';
// import { useFormik } from 'formik';
// import { transactionSchema } from '../../schema';
// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import { addTransactionAPI, deleteTransactionAPI, editTransactionAPI, viewTransactionAPI } from '../../services/transactionServices';

// const Transaction = () => {
//   const [isFormVisible, setIsFormVisible] = useState(false);
//   const [successMessage, setSuccessMessage] = useState(null);
//   const [errorMessage, setErrorMessage] = useState(null);
//   const [editingId, setEditingId] = useState(null);
//   const [editedData, setEditedData] = useState({});


//   const queryClient = useQueryClient();

//   const { data: transactions, isError, error, refetch } = useQuery({
//     queryKey: ['view-transactions'],
//     queryFn: viewTransactionAPI,
//   });

//   const { mutateAsync } = useMutation({
//     mutationFn: addTransactionAPI,
//     mutationKey: ['add-transaction'],
//   });

//   const { mutateAsync: editTransaction } = useMutation({
//     mutationFn: editTransactionAPI,
//     mutationKey: ['edit-transaction'],
//   });

//   const handleEdit = (transaction) => {
//     setEditingId(transaction._id);
//     setEditedData({ ...transaction }); // Create a copy to avoid reference issues
//   };
  

//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setEditedData((prev) => ({
//       ...prev,
//       [name]: value, 
//     }));
//   };
  
//   const handleSave = async () => {
//     try {
//       if (!editingId) return;
  
//       const updatedTransaction = {
//         ...editedData,
//         date: new Date(editedData.date).toISOString(), // Ensure correct date format
//       };
  
//       console.log("Sending update request:", updatedTransaction); // Debug log
  
//       await editTransaction({ id: editingId, ...updatedTransaction });
  
//       setEditingId(null);
//       setEditedData({});
//       setSuccessMessage('Transaction updated successfully!');
//       setErrorMessage(null);
//       refetch();
//     } catch (error) {
//       console.error('Error updating transaction:', error);
//       setErrorMessage('Failed to update transaction. Please try again.');
//     }
//   };
  
  
  
//   const { mutateAsync: deleteTransaction } = useMutation({
//     mutationFn: deleteTransactionAPI,
//     mutationKey: ['delete-transaction'],
//     onMutate: async (deletedId) => {
//       await queryClient.cancelQueries(['view-transactions']); // Ensure correct query key
  
//       // Get previous transactions before deletion
//       const previousTransactions = queryClient.getQueryData(['view-transactions']);
  
//       // Optimistically update UI
//       queryClient.setQueryData(['view-transactions'], (old) =>
//         old?.filter((transaction) => transaction._id !== deletedId) || []
//       );
  
//       return { previousTransactions };
//     },
//     onError: (error, _, context) => {
//       setErrorMessage(error?.response?.data?.message || 'Failed to delete transaction.');
  
//       // Rollback on error
//       if (context?.previousTransactions) {
//         queryClient.setQueryData(['view-transactions'], context.previousTransactions);
//       }
//     },
//     onSettled: () => {
//       queryClient.invalidateQueries(['view-transactions']);
//     },
//   });
  
  

//   const { values, handleBlur, handleChange, handleSubmit,errors } = useFormik({
//     initialValues: {
//       type: 'income',
//       amount: 0,
//       category: '',
//       date: '',
//       description: '',
//       isRecurring: false,
//       recurrenceInterval: '',
//     },
//     validationSchema: transactionSchema,
//     // onSubmit: async (values, action) => {
//     //   try {
//     //     await mutateAsync(values);
//     //     setSuccessMessage('Transaction added successfully!');
//     //     setErrorMessage(null);
//     //     action.resetForm();
//     //     refetch();
//     //   } catch (error) {
//     //     setErrorMessage(error?.response?.data?.message || 'Something went wrong!');
//     //   }
//     // },

//     onSubmit: async (values, action) => {
//       try {
//         const { date, isRecurring, recurrenceInterval } = values;
//         let nextDueDate = null;
    
//         // Calculate next due date if transaction is recurring
//         if (isRecurring && recurrenceInterval) {
//           const startDate = new Date(date);
    
//           switch (recurrenceInterval) {
//             case "daily":
//               nextDueDate = new Date(startDate.setDate(startDate.getDate() + 1));
//               break;
//             case "weekly":
//               nextDueDate = new Date(startDate.setDate(startDate.getDate() + 7));
//               break;
//             case "monthly":
//               nextDueDate = new Date(startDate.setMonth(startDate.getMonth() + 1));
//               break;
//             case "yearly":
//               nextDueDate = new Date(startDate.setFullYear(startDate.getFullYear() + 1));
//               break;
//             default:
//               throw new Error("Invalid recurrence interval");
//           }
//         }
    
//         const payload = {
//           ...values,
//           nextDueDate: nextDueDate ? nextDueDate.toISOString() : null,
//         };
    
//         // Call the mutation
//         await mutateAsync(payload);
//         setSuccessMessage('Transaction added successfully!');
//         setErrorMessage(null);
//         action.resetForm();
//         refetch();
//       } catch (error) {
//         setErrorMessage(error?.response?.data?.message || 'Something went wrong!');
//       }
//     }
    
//   });

//   return (
//     <div className="min-h-screen bg-gray-100 p-6 pt-24">
//       {/* Page Header */}
//       <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
//         <h2 className="text-3xl font-bold text-gray-800">Transactions</h2>
//         <p className="text-gray-600">Track your income and expenses efficiently.</p>
//       </div>

//       {/* Add Transaction Button */}
//       <div className="max-w-4xl mx-auto mt-6">
//         <button onClick={() => setIsFormVisible(!isFormVisible)} className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-all">
//           <PlusCircle className="mr-2" /> {isFormVisible ? 'Cancel' : 'Add Transaction'}
//         </button>
//       </div>

//       {isFormVisible && (
//         <div className="max-w-4xl mx-auto mt-6 bg-white p-6 rounded-lg shadow-md">
//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//             <label className="block text-gray-700 font-semibold mb-2" htmlFor="frequency">
//                 Transaction Type
//               </label>
//               <select
//                 id="type"
//                 name="type"
//                 value={values.type}
//                 onChange={handleChange}
//                 className="w-full p-3 border border-gray-300 rounded-lg"
//               >
//                 <option value="income">Income</option>
//                 <option value="expense">Expense</option>
//               </select>

//               {errors.frequency && touched.frequency && (
//                 <p className="text-red-500 text-sm mt-1">{errors.frequency}</p>
//               )}
//             </div>

//             <div className="mb-4">
//                 <label className="block text-gray-700 font-semibold mb-2" htmlFor="category">
//                   Category
//                 </label>
//                 <input
//                 type="text"
//                 id="category"
//                 name="category"
//                 value={values.category}
//                 onChange={handleChange}
//                 className="w-full p-3 border border-gray-300 rounded-lg"
//                 placeholder="Enter category"
//               />
//               {errors.category && (
//                 <p className="text-red-500 text-sm mt-1">{errors.category}</p>
//               )}
//               </div>

//             <div className="mb-4">
//               <label className="block text-gray-700 font-semibold mb-2" htmlFor="amount">
//                 Amount
//               </label>
//               <input
//                 type="number"
//                 id="amount"
//                 name="amount"
//                 value={values.amount}
//                 onChange={handleChange}
//                 className="w-full p-3 border border-gray-300 rounded-lg"
//                 placeholder="Enter transaction amount"
//               />
//               {errors.limit && (
//                 <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
//               )}
//             </div>

            

//             <div className="mb-4">
//             <label className="block text-gray-700 font-semibold mb-2" htmlFor="startDate">
//               Date
//             </label>
//             <input
//               type="date"
//               id="date"
//               name="date"
//               value={values.date}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-lg"
//             />
//             {errors.date && (
//               <p className="text-red-500 text-sm mt-1">{errors.date}</p>
//             )}
//           </div>
//           {/* Recurring Checkbox */}
// <div className="mb-4">
//   <label className="flex items-center space-x-2 text-gray-700 font-semibold">
//     <input
//       type="checkbox"
//       id="isRecurring"
//       name="isRecurring"
//       checked={values.isRecurring}
//       onChange={handleChange}
//       className="w-4 h-4"
//     />
//     <span>Is this a recurring transaction?</span>
//   </label>
// </div>

// {/* Conditional Recurrence Interval Dropdown */}
// {values.isRecurring && (
//   <div className="mb-4">
//     <label className="block text-gray-700 font-semibold mb-2" htmlFor="recurrenceInterval">
//       Recurrence Interval
//     </label>
//     <select
//       id="recurrenceInterval"
//       name="recurrenceInterval"
//       value={values.recurrenceInterval}
//       onChange={handleChange}
//       className="w-full p-3 border border-gray-300 rounded-lg"
//     >
//       <option value="">Select Interval</option>
//       <option value="daily">Daily</option>
//       <option value="weekly">Weekly</option>
//       <option value="monthly">Monthly</option>
//       <option value="yearly">Yearly</option>
//     </select>
//     {errors.recurrenceInterval && (
//       <p className="text-red-500 text-sm mt-1">{errors.recurrenceInterval}</p>
//     )}
//   </div>
// )}


//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all"
//             >
//               Create Transaction
//             </button>

//           </form>
//           {successMessage && (
//             <div className="mt-4 p-3 bg-green-100 text-green-800 rounded">
//               {successMessage}
//             </div>
//           )}
//           {errorMessage && (
//             <div className="mt-4 p-3 bg-red-100 text-red-800 rounded">
//               {errorMessage}
//             </div>
//           )}
//         </div>
//       )}


//       {/* Transaction History Table */}
//       <div className="max-w-4xl mx-auto mt-6 bg-white p-6 rounded-lg shadow-md">
//         <h3 className="text-xl font-semibold text-gray-700 mb-4">Transaction History</h3>
//         <table className="w-full text-left border-collapse">
//           <thead>
//             <tr className="border-b border-gray-300">
//               <th className="py-2">Date</th>
//               <th className="py-2">Category</th>
//               <th className="py-2">Amount</th>
//               <th className="py-2">Type</th>
//               <th className="py-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {Array.isArray(transactions) && transactions.map((transaction) => (
//               <tr key={transaction._id} className="border-b border-gray-200 hover:bg-gray-100">
//                 <td className="py-2">
//                   {editingId === transaction._id ? 
//                   <input type="date" name="date" value={editedData.date}
//                    onChange={handleEditChange} className="border p-1 rounded" /> : new Date(transaction.date).toLocaleDateString()}
//                 </td>
//                 <td className="py-2">
//                   {editingId === transaction._id ? <input type="text" name="category" value={editedData.category} onChange={handleEditChange} className="border p-1 rounded" /> : transaction.category}
//                 </td>
//                 <td className="py-2 text-green-600">
//                   {editingId === transaction._id ? <input type="number" name="amount" value={editedData.amount} onChange={handleEditChange} className="border p-1 rounded" /> : transaction.amount}
//                 </td>
//                 <td className="py-2">
//                   {editingId === transaction._id ? (
//                     <select name="type" value={editedData.type || ''} onChange={handleEditChange} className="border p-1 rounded">
//                       <option value="income">Income</option>
//                       <option value="expense">Expense</option>
//                     </select>
//                   ) : (
//                     transaction.type
//                   )}
//                 </td>

//                 <td className="py-2 flex space-x-3">
//                   {editingId === transaction._id ? (
//                       <button 
//                       className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition-all"
//                       onClick={() => handleSave()}
//                     >
//                       Save
//                     </button>
//                   ) : (
//                     <button className="text-blue-600 hover:text-blue-800" onClick={() => handleEdit(transaction)}>
//                       <Edit size={18} />
//                     </button>
//                   )}
// <button
//   className="text-red-600 hover:text-red-800"
//   onClick={async () => {
//     if (window.confirm("Are you sure you want to delete this transaction?")) {
//       try {
//         await deleteTransaction(transaction._id);
//       } catch (error) {
//         console.error("Error deleting transaction:", error);
//       }
//     }
//   }}
// >
//   <Trash2 size={18} />
// </button>

//                 </td>

//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Transaction;



import React, { useState } from 'react';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { useFormik } from 'formik';
import { transactionSchema } from '../../schema';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addTransactionAPI, deleteTransactionAPI, editTransactionAPI, viewTransactionAPI } from '../../services/transactionServices';

const Transaction = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [filterType, setFilterType] = useState('all');

  const queryClient = useQueryClient();

  const { data: transactions, isError, error, refetch } = useQuery({
    queryKey: ['view-transactions'],
    queryFn: viewTransactionAPI,
  });

  const { mutateAsync } = useMutation({
    mutationFn: addTransactionAPI,
    mutationKey: ['add-transaction'],
  });

  const { mutateAsync: editTransaction } = useMutation({
    mutationFn: editTransactionAPI,
    mutationKey: ['edit-transaction'],
  });

  const { mutateAsync: deleteTransaction } = useMutation({
    mutationFn: deleteTransactionAPI,
    mutationKey: ['delete-transaction'],
    onMutate: async (deletedId) => {
      await queryClient.cancelQueries(['view-transactions']);
      const previousTransactions = queryClient.getQueryData(['view-transactions']);
      queryClient.setQueryData(['view-transactions'], (old) =>
        old?.filter((transaction) => transaction._id !== deletedId) || []
      );
      return { previousTransactions };
    },
    onError: (error, _, context) => {
      setErrorMessage(error?.response?.data?.message || 'Failed to delete transaction.');
      if (context?.previousTransactions) {
        queryClient.setQueryData(['view-transactions'], context.previousTransactions);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(['view-transactions']);
    },
  });

  const handleEdit = (transaction) => {
    setEditingId(transaction._id);
    setEditedData({ ...transaction });
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
      const updatedTransaction = {
        ...editedData,
        date: new Date(editedData.date).toISOString(),
      };
      await editTransaction({ id: editingId, ...updatedTransaction });
      setEditingId(null);
      setEditedData({});
      setSuccessMessage('Transaction updated successfully!');
      setErrorMessage(null);
      refetch();
    } catch (error) {
      setErrorMessage('Failed to update transaction. Please try again.');
    }
  };

  const getFilteredTransactions = () => {
    if (!Array.isArray(transactions)) return [];
    const now = new Date();
    return transactions.filter((txn) => {
      const txnDate = new Date(txn.date);
      switch (filterType) {
        case 'weekly':
          const weekAgo = new Date();
          weekAgo.setDate(now.getDate() - 7);
          return txnDate >= weekAgo && txnDate <= now;
        case 'monthly':
          return txnDate.getMonth() === now.getMonth() && txnDate.getFullYear() === now.getFullYear();
        case 'yearly':
          return txnDate.getFullYear() === now.getFullYear();
        default:
          return true;
      }
    });
  };

  const filteredTransactions = getFilteredTransactions();

  const { values, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      type: 'income',
      amount: 0,
      category: '',
      date: '',
      description: '',
      isRecurring: false,
      recurrenceInterval: '',
    },
    validationSchema: transactionSchema,
    onSubmit: async (values, action) => {
      try {
        const { date, isRecurring, recurrenceInterval } = values;
        let nextDueDate = null;
        if (isRecurring && recurrenceInterval) {
          const startDate = new Date(date);
          switch (recurrenceInterval) {
            case "daily":
              nextDueDate = new Date(startDate.setDate(startDate.getDate() + 1));
              break;
            case "weekly":
              nextDueDate = new Date(startDate.setDate(startDate.getDate() + 7));
              break;
            case "monthly":
              nextDueDate = new Date(startDate.setMonth(startDate.getMonth() + 1));
              break;
            case "yearly":
              nextDueDate = new Date(startDate.setFullYear(startDate.getFullYear() + 1));
              break;
            default:
              throw new Error("Invalid recurrence interval");
          }
        }
        const payload = {
          ...values,
          nextDueDate: nextDueDate ? nextDueDate.toISOString() : null,
        };
        await mutateAsync(payload);
        setSuccessMessage('Transaction added successfully!');
        setErrorMessage(null);
        action.resetForm();
        refetch();
      } catch (error) {
        setErrorMessage('Something went wrong!');
      }
    }
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6 pt-24">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-gray-800">Transactions</h2>
        <p className="text-gray-600">Track your income and expenses efficiently.</p>
      </div>

      <div className="max-w-4xl mx-auto mt-6 flex items-center justify-between">
        <button onClick={() => setIsFormVisible(!isFormVisible)} className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-all">
          <PlusCircle className="mr-2" /> {isFormVisible ? 'Cancel' : 'Add Transaction'}
        </button>

        {/* Filter Dropdown */}
        <div className="ml-4">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="all">All</option>
            <option value="weekly">This Week</option>
            <option value="monthly">This Month</option>
            <option value="yearly">This Year</option>
          </select>
        </div>
      </div>

      {isFormVisible && (
        <div className="max-w-4xl mx-auto mt-6 bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Transaction Type</label>
              <select id="type" name="type" value={values.type} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg">
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Category</label>
              <input type="text" id="category" name="category" value={values.category} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg" placeholder="Enter category" />
              {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Amount</label>
              <input type="number" id="amount" name="amount" value={values.amount} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg" placeholder="Enter transaction amount" />
              {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Date</label>
              <input type="date" id="date" name="date" value={values.date} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg" />
              {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
            </div>
            <div className="mb-4">
              <label className="flex items-center space-x-2 text-gray-700 font-semibold">
                <input type="checkbox" id="isRecurring" name="isRecurring" checked={values.isRecurring} onChange={handleChange} className="w-4 h-4" />
                <span>Is this a recurring transaction?</span>
              </label>
            </div>
            {values.isRecurring && (
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Recurrence Interval</label>
                <select id="recurrenceInterval" name="recurrenceInterval" value={values.recurrenceInterval} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg">
                  <option value="">Select Interval</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
                {errors.recurrenceInterval && <p className="text-red-500 text-sm mt-1">{errors.recurrenceInterval}</p>}
              </div>
            )}
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all">Create Transaction</button>
          </form>
          {successMessage && <div className="mt-4 p-3 bg-green-100 text-green-800 rounded">{successMessage}</div>}
          {errorMessage && <div className="mt-4 p-3 bg-red-100 text-red-800 rounded">{errorMessage}</div>}
        </div>
      )}

      {/* Transaction History Table */}
      <div className="max-w-4xl mx-auto mt-6 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Transaction History</h3>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="py-2">Date</th>
              <th className="py-2">Category</th>
              <th className="py-2">Amount</th>
              <th className="py-2">Type</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction) => (
              <tr key={transaction._id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-2">
                  {editingId === transaction._id ? (
                    <input type="date" name="date" value={editedData.date} onChange={handleEditChange} className="border p-1 rounded" />
                  ) : (
                    new Date(transaction.date).toLocaleDateString()
                  )}
                </td>
                <td className="py-2">
                  {editingId === transaction._id ? (
                    <input type="text" name="category" value={editedData.category} onChange={handleEditChange} className="border p-1 rounded" />
                  ) : (
                    transaction.category
                  )}
                </td>
                <td className="py-2 text-green-600">
                  {editingId === transaction._id ? (
                    <input type="number" name="amount" value={editedData.amount} onChange={handleEditChange} className="border p-1 rounded" />
                  ) : (
                    transaction.amount
                  )}
                </td>
                <td className="py-2">
                  {editingId === transaction._id ? (
                    <select name="type" value={editedData.type || ''} onChange={handleEditChange} className="border p-1 rounded">
                      <option value="income">Income</option>
                      <option value="expense">Expense</option>
                    </select>
                  ) : (
                    transaction.type
                  )}
                </td>
                <td className="py-2 flex space-x-3">
                  {editingId === transaction._id ? (
                    <button onClick={handleSave} className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition-all">Save</button>
                  ) : (
                    <button onClick={() => handleEdit(transaction)} className="text-blue-600 hover:text-blue-800">
                      <Edit size={18} />
                    </button>
                  )}
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={async () => {
                      if (window.confirm("Are you sure you want to delete this transaction?")) {
                        try {
                          await deleteTransaction(transaction._id);
                        } catch (error) {
                          console.error("Error deleting transaction:", error);
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

export default Transaction;
