import React from "react";
import { FiBarChart2, FiActivity, FiTrendingUp, FiArrowUp, FiArrowDown, FiPercent } from "react-icons/fi";
import { getInsights, getSpendingPercentage, getMonthComparison } from "../../utils/calculations";

const Insights = ({ transactions, monthlyTransactions, selectedCategory, selectedMonth, selectedYear }) => {
  const insights = getInsights(monthlyTransactions);
  const spendingPercentage = getSpendingPercentage(monthlyTransactions);
  const monthComparison = getMonthComparison(transactions, selectedMonth, selectedYear);

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-lg p-6 md:p-8 shadow-md mt-8">
      <div className="flex items-center gap-3 mb-6">
        <FiBarChart2 className="text-2xl text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Insights</h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
        
        <div className="bg-white dark:bg-slate-700 p-3 md:p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col items-start">
            <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">Total Trans.</h4>
            <div className="flex items-center gap-2 w-full">
              <p className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-200">{insights.totalTransactions}</p>
              <FiActivity className="text-2xl md:text-3xl text-blue-400 opacity-60 ml-auto" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-700 p-3 md:p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col items-start">
            <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">Avg Amount</h4>
            <div className="flex items-center gap-2 w-full">
              <p className="text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400">₹{insights.averageAmount.toLocaleString()}</p>
              <FiTrendingUp className="text-2xl md:text-3xl text-blue-400 opacity-60 ml-auto" />
            </div>
          </div>
        </div>

        {/* Spending % of Income */}
        <div className="bg-white dark:bg-slate-700 p-3 md:p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col items-start">
            <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">Spending %</h4>
            <div className="flex items-center gap-2 w-full">
              <div>
                <p className={`text-xl md:text-2xl font-bold ${spendingPercentage > 80 ? 'text-orange-600 dark:text-orange-400' : 'text-green-600 dark:text-green-400'}`}>{spendingPercentage}%</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">of income</p>
              </div>
              <FiPercent className="text-2xl md:text-3xl text-purple-400 opacity-60 ml-auto" />
            </div>
          </div>
        </div>

        {/* Income Count */}
        <div className="bg-white dark:bg-slate-700 p-3 md:p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col items-start">
            <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">Income Trans.</h4>
            <div className="flex items-center gap-2 w-full">
              <p className="text-xl md:text-2xl font-bold text-green-600 dark:text-green-400">{insights.incomeCount}</p>
              <FiArrowUp className="text-2xl md:text-3xl text-green-400 opacity-60 ml-auto" />
            </div>
          </div>
        </div>

        {/* Expense Count */}
        <div className="bg-white dark:bg-slate-700 p-3 md:p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col items-start">
            <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">Expense Trans.</h4>
            <div className="flex items-center gap-2 w-full">
              <p className="text-xl md:text-2xl font-bold text-red-600 dark:text-red-400">{insights.expenseCount}</p>
              <FiArrowDown className="text-2xl md:text-3xl text-red-400 opacity-60 ml-auto" />
            </div>
          </div>
        </div>
      </div>

      {/* Month-over-Month Comparison */}
      <div className="mt-6 md:mt-8 bg-white dark:bg-slate-700 p-4 md:p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">Spending Comparison</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Compare your spending between months to track your progress</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
          <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg border border-gray-200 dark:border-slate-600">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">Current Month Expenses</p>
            <p className="text-lg md:text-2xl font-bold text-gray-800 dark:text-gray-200 mb-1">₹{monthComparison.currentMonth.toLocaleString()}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Total spent this month</p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg border border-gray-200 dark:border-slate-600">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">Previous Month Expenses</p>
            <p className="text-lg md:text-2xl font-bold text-gray-800 dark:text-gray-200 mb-1">₹{monthComparison.lastMonth.toLocaleString()}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Total spent last month</p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg border border-gray-200 dark:border-slate-600">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">Change vs Last Month</p>
            <div className="flex items-center gap-2">
              <p className={`text-lg md:text-2xl font-bold ${monthComparison.isHigher ? 'text-orange-600 dark:text-orange-400' : 'text-green-600 dark:text-green-400'}`}>
                {monthComparison.isHigher ? '+' : ''}{monthComparison.percentChange}%
              </p>
              <span className={monthComparison.isHigher ? 'text-2xl' : 'text-2xl'}>
                {monthComparison.isHigher ? '📈' : '📉'}
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {monthComparison.isHigher ? 'Spending increased' : 'Spending decreased'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;
