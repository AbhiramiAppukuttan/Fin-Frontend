
import React, { useState, useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { useQueryClient } from '@tanstack/react-query';

import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { Download } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { viewTransactionAPI } from '../../services/transactionServices';
import { viewBudgetAPI } from '../../services/budgetServices';
import { viewSavingsAPI } from '../../services/savingsServices';
import { planAPI } from '../../services/userServices';

const COLORS = ['#4CAF50', '#F44336', '#FF9800', '#2196F3', '#9C27B0', '#FFEB3B'];

const Report = () => {
  const user = useSelector((state) => state.auth.user);
  // console.log(splan);
  const queryClient = useQueryClient();

  const [selectedReport, setSelectedReport] = useState('income-expense');
  const reportRef = useRef();

  // queryClient.invalidateQueries({ queryKey: ['view-transactions'] });
  // queryClient.invalidateQueries({ queryKey: ['view-budgets'] });
  // queryClient.invalidateQueries({ queryKey: ['view-savings'] });
  


  // useEffect(() => {
//   console.log("User Plan:", splan);
//   queryClient.invalidateQueries({ queryKey: ['view-transactions'] });
//   queryClient.invalidateQueries({ queryKey: ['view-budgets'] });
//   queryClient.invalidateQueries({ queryKey: ['view-savings'] });
// }, [queryClient]);



  const { data: userPlan, isLoading: isPlanLoading } = useQuery({
  queryFn: planAPI,
  queryKey: ["Plan-view"],
});
  
  const splan = userPlan ?? null; // fallback to null if undefined
  
  useEffect(() => {
    if (!isPlanLoading) {
      console.log("User Plan Data:", userPlan);
      console.log("User Plan:", splan);
    }
  }, [isPlanLoading, userPlan]);
  

  
  console.log("User Plan Data:", userPlan);  // This will show the correct value after the API returns
  console.log("User Plan:", splan);  // This will now correctly display the plan value
  
const { data: transactions, isLoading, isError, error } = useQuery({
    queryKey: ['view-transactions'],
    queryFn: viewTransactionAPI,
  });

  const { data: budgets, isLoading: isBudgetLoading, isError: isBudgetError, error: budgetError } = useQuery({
    queryKey: ['view-budgets'],
    queryFn: viewBudgetAPI,
  });

  const { data: savings, isLoading: isSavingLoading, isError: isSavingError, error: savingError } = useQuery({
    queryKey: ['view-savings'],
    queryFn: viewSavingsAPI,
  });

  if (isLoading || isBudgetLoading || isSavingLoading) return <p>Loading...</p>;
  if (isError || isBudgetError || isSavingError) {
    console.error(error || budgetError || savingError);
    return <p className="text-red-500">Failed to load data. Please try again.</p>;
  }



  const downloadPDF = async () => {
    if (splan !== 'premium') return; // Only premium can download
    const input = reportRef.current;
    if (!input) return;
    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${selectedReport}-report.pdf`);
};

  const transactionsArray = Array.isArray(transactions) ? transactions : [];
  const budgetArray = Array.isArray(budgets) ? budgets : [];
  const savingsArray = Array.isArray(savings) ? savings : [];

  const totalIncome = transactionsArray.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
  const totalExpenses = transactionsArray.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
  const pieData = [
    { name: 'Income', value: totalIncome },
    { name: 'Expenses', value: totalExpenses }
  ];

  const monthlyData = transactionsArray.reduce((acc, t) => {
    const date = new Date(t.date);
    const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    if (!acc[month]) acc[month] = { month, income: 0, expense: 0 };
    if (t.type === 'income') acc[month].income += t.amount;
    if (t.type === 'expense') acc[month].expense += t.amount;
    return acc;
  }, {});
  const lineChartData = Object.values(monthlyData);

  const budgetLimitVsSpentArray = budgetArray.map(b => ({
    category: b.category,
    limit: b.limit,
    spent: b.spent || 0,
    remaining: b.limit - (b.spent || 0),
  }));
  const totalLimit = budgetLimitVsSpentArray.reduce((acc, b) => acc + b.limit, 0);
  const totalSpent = budgetLimitVsSpentArray.reduce((acc, b) => acc + b.spent, 0);
  const budgetPieLimitSpentData = [
    { name: 'Spent', value: totalSpent },
    { name: 'Remaining', value: totalLimit - totalSpent }
  ];

  const savingsProgressArray = savingsArray.map(s => ({
    title: s.title || 'Unnamed Goal',
    goalAmount: s.goalAmount || 0,
    savedAmount: s.savedAmount || 0,
    remaining: (s.goalAmount || 0) - (s.savedAmount || 0)
  }));
  const totalGoalAmount = savingsProgressArray.reduce((acc, s) => acc + s.goalAmount, 0);
  const totalSavedAmount = savingsProgressArray.reduce((acc, s) => acc + s.savedAmount, 0);
  const savingsPieData = [
    { name: 'Saved', value: totalSavedAmount },
    { name: 'Remaining', value: totalGoalAmount - totalSavedAmount }
  ];

  // Access control
  const canViewReport = (report) => {
    if (splan === 'free') return report === 'income-expense';
    return true;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 pt-24">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-gray-800">Financial Reports</h2>
        <p className="text-gray-600 mb-4">View and analyze your financial data.</p>

        <div className="flex justify-between items-center mb-4">
          <select
            className="p-2 border border-gray-300 rounded"
            value={selectedReport}
            onChange={(e) => {
              const selected = e.target.value;
              if (canViewReport(selected)) {
                setSelectedReport(selected);
              } else {
                alert('Upgrade your plan to access this report.');
              }
            }}
          >
            <option value="income-expense">Income vs Expenses</option>
            {splan !== 'free' && <option value="budget">Budget</option>}
            {splan !== 'free' && <option value="savings">Savings</option>}
          </select>

          <button
            onClick={downloadPDF}
            disabled={splan !== 'premium'}
            className={`flex items-center gap-2 px-4 py-2 rounded transition ${
              splan === 'premium'
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-600 cursor-not-allowed'
            }`}
          >
            <Download size={18} />
            Download PDF
          </button>

        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6" ref={reportRef}>
        {selectedReport === 'income-expense' && (
          <>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Income vs Expenses</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Monthly Trends</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={lineChartData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="income" stroke="#4CAF50" name="Income" />
                  <Line type="monotone" dataKey="expense" stroke="#F44336" name="Expense" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </>
        )}

        {selectedReport === 'budget' && splan !== 'free' && (
          <>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Spent vs Remaining Budget</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={budgetPieLimitSpentData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
                    {budgetPieLimitSpentData.map((entry, index) => (
                      <Cell key={`budget-pie-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Budget Limit vs Spent</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={budgetLimitVsSpentArray}>
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="limit" stroke="#8884d8" name="Limit" />
                  <Line type="monotone" dataKey="spent" stroke="#82ca9d" name="Spent" />
                  <Line type="monotone" dataKey="remaining" stroke="#FF9800" name="Remaining" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </>
        )}

        {selectedReport === 'savings' && splan !== 'free' && (
          <>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Saved vs Remaining Goals</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={savingsPieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
                    {savingsPieData.map((entry, index) => (
                      <Cell key={`savings-pie-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Savings Progress (by Goal)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={savingsProgressArray}>
                  <XAxis dataKey="title" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="goalAmount" stroke="#8884d8" name="Goal" />
                  <Line type="monotone" dataKey="savedAmount" stroke="#4CAF50" name="Saved" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </div>

      {selectedReport === 'budget' && splan !== 'free' && (
        <div className="max-w-4xl mx-auto mt-6 bg-white p-6 rounded-lg shadow-md">
          <h4 className="text-lg font-semibold text-red-600 mb-2">Over-Budget Categories</h4>
          <ul className="list-disc list-inside text-sm text-gray-700">
            {budgetLimitVsSpentArray.filter(b => b.spent > b.limit).length > 0 ? (
              budgetLimitVsSpentArray
                .filter(b => b.spent > b.limit)
                .map((b, idx) => (
                  <li key={idx}>
                    {b.category}: Spent ₹{b.spent} / Limit ₹{b.limit}
                  </li>
                ))
            ) : (
              <li className="text-green-600">No over-budget categories. Great job!</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Report;