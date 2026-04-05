import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import { getCategorySpending } from "../../utils/calculations";

const SpendingBreakdownChart = ({ transactions, budgets, onCategorySelect }) => {
  const categoryData = getCategorySpending(transactions);
  
  // Create a spending map for easy lookup
  const spendingMap = {};
  categoryData.forEach(item => {
    spendingMap[item.category] = item.amount;
  });
  
  // Show all budget categories, even if they have zero spending
  const allCategoryData = Object.keys(budgets).map(category => ({
    category,
    amount: spendingMap[category] || 0
  }));
  
  const COLORS = ['#3b82f6', '#ef4444', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];
  
  const handleBarClick = (data) => {
    onCategorySelect(data.category);
  };

  return (
    <div className="w-full h-96 bg-white dark:bg-slate-800 rounded-lg p-4">
      {allCategoryData.length > 0 ? (
        <>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={allCategoryData} barCategoryGap="25%">
              <XAxis 
                dataKey="category" 
                stroke="#cbd5e1"
                tick={{ fill: '#cbd5e1', fontSize: 13, fontWeight: 'bold' }}
              />
              <YAxis 
                stroke="#cbd5e1"
                tick={{ fill: '#cbd5e1', fontSize: 13, fontWeight: 'bold' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "#1e293b", 
                  border: "2px solid #3b82f6", 
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)"
                }}
                formatter={(value) => `₹${value.toLocaleString()}`}
                labelStyle={{ color: '#e2e8f0', fontWeight: 'bold' }}
              />
              <Legend wrapperStyle={{ color: '#cbd5e1', fontWeight: 'bold', paddingTop: '20px' }} />
              <Bar 
                dataKey="amount" 
                radius={[8, 8, 0, 0]} 
                onClick={(data) => handleBarClick(data)} 
                maxBarSize={50}
              >
                {allCategoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-2">
            Click on a bar to filter transactions
          </p>
        </>
      ) : (
        <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
          <p>No expense data available</p>
        </div>
      )}
    </div>
  );
};

export default SpendingBreakdownChart;