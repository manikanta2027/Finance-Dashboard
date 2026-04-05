import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts";
import { getBalanceTrend } from "../../utils/calculations";

const BalanceTrendChart = ({ transactions }) => {
  const trendData = getBalanceTrend(transactions);
  
  return (
    <div className="w-full bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6">Balance Trend</h3>
      {trendData.length > 0 ? (
        <div className="h-96 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={trendData}
              margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis 
                dataKey="month" 
                stroke="#cbd5e1"
                tick={{ fill: '#cbd5e1', fontSize: 13, fontWeight: 'bold' }}
              />
              <YAxis 
                stroke="#cbd5e1"
                tick={{ fill: '#cbd5e1', fontSize: 13, fontWeight: 'bold' }}
                tickFormatter={(value) => `₹${(value / 1000).toFixed(1)}k`}
                type="number"
                domain={[0, 'dataMax']}
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
              <Legend 
                wrapperStyle={{ paddingTop: '20px', color: '#e2e8f0' }}
                iconType="line"
              />
              <Line 
                type="monotone" 
                dataKey="balance" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', r: 5 }}
                activeDot={{ r: 7 }}
                name="Balance"
              />
              <Line 
                type="monotone" 
                dataKey="income" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ fill: '#10b981', r: 5 }}
                activeDot={{ r: 7 }}
                name="Income"
              />
              <Line 
                type="monotone" 
                dataKey="expense" 
                stroke="#ef4444" 
                strokeWidth={3}
                dot={{ fill: '#ef4444', r: 5 }}
                activeDot={{ r: 7 }}
                name="Expenses"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="flex items-center justify-center h-96 text-gray-500 dark:text-gray-400">
          <p>No transaction data available</p>
        </div>
      )}
    </div>
  );
};

export default BalanceTrendChart;
