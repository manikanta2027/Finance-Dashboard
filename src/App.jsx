import React, { useState, useEffect, useLayoutEffect } from "react";
import Navbar from "./components/Common/Navbar";
import Navigation from "./components/Common/Navigation";
import SummaryCards from "./components/Dashboard/SummaryCards";
import TransactionTable from "./components/Transactions/TransactionTable";
import SpendingBreakdownChart from "./components/Charts/SpendingBreakdownChart";
import BalanceTrendChart from "./components/Charts/BalanceTrendChart";
import Insights from "./components/Insights/Insights";
import BudgetTracker from "./components/Dashboard/BudgetTracker";
import { transactions as mockTransactions } from "./data/mockData";

function App() {
  const [userRole, setUserRole] = useState("viewer");
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : mockTransactions;
  });
  const [showInsights, setShowInsights] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [darkMode, setDarkMode] = useState(() => {
    // Start with false (light mode) - you can change this to true if you prefer dark mode by default
    const saved = localStorage.getItem("darkMode");
    return saved !== null ? JSON.parse(saved) : false;
  });
  const [budgets, setBudgets] = useState(() => {
    const saved = localStorage.getItem("budgets");
    const defaultBudgets = {
      Groceries: 5000,
      "Food and Dining": 3000,
      "Loan Repayment": 20000,
      "Other expenses": 2000,
      Bills: 3000
    };
    
    if (saved) {
      const parsedBudgets = JSON.parse(saved);
      // Remove old duplicate categories and keep only the valid ones
      const cleanedBudgets = {};
      Object.keys(defaultBudgets).forEach(category => {
        cleanedBudgets[category] = parsedBudgets[category] !== undefined ? parsedBudgets[category] : defaultBudgets[category];
      });
      return cleanedBudgets;
    }
    return defaultBudgets;
  });
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  // Get current month and year
  const currentDate = new Date();
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());

  // Apply initial dark mode on mount (before render)
  React.useLayoutEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Save transactions to localStorage whenever they change
  React.useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  // Save dark mode preference to localStorage
  React.useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  // Save budgets to localStorage
  React.useEffect(() => {
    localStorage.setItem("budgets", JSON.stringify(budgets));
  }, [budgets]);

  // Clean up old budget categories on app load
  React.useEffect(() => {
    const defaultBudgets = {
      Groceries: 5000,
      "Food and Dining": 3000,
      "Loan Repayment": 20000,
      "Other expenses": 2000,
      Bills: 3000
    };
    
    const saved = localStorage.getItem("budgets");
    if (saved) {
      const parsedBudgets = JSON.parse(saved);
      // Check if old categories exist
      if (parsedBudgets.Food || parsedBudgets.Loan || parsedBudgets.Other) {
        // Remove old categories and reset to valid ones
        localStorage.setItem("budgets", JSON.stringify(defaultBudgets));
        setBudgets(defaultBudgets);
      }
    }
  }, []);

  const handleAddTransaction = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);
  };

  const handleUpdateTransaction = (updatedTransaction) => {
    setTransactions(transactions.map(t => t.id === updatedTransaction.id ? updatedTransaction : t));
  };

  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  // Filter transactions by selected month and year
  const getFilteredTransactionsByMonth = () => {
    return transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      return transactionDate.getMonth() === selectedMonth && transactionDate.getFullYear() === selectedYear;
    });
  };

  const monthlyTransactions = getFilteredTransactionsByMonth();

  return (
    <div className="bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 min-h-screen">
      <Navbar userRole={userRole} setUserRole={setUserRole} showInsights={showInsights} setShowInsights={setShowInsights} darkMode={darkMode} setDarkMode={setDarkMode} />
        <div className="max-w-7xl mx-auto p-4 lg:p-6">
        
        {/* Navigation Tabs */}
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <>
            {/* Month/Year Selector */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-4 mb-6">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                <label className="text-gray-700 dark:text-gray-300 font-semibold">Select Month & Year:</label>
                <div className="flex gap-3 items-center flex-wrap justify-center">
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {Array.from({ length: 12 }, (_, i) => {
                      const monthDate = new Date(selectedYear, i, 1);
                      return (
                        <option key={i} value={i}>
                          {monthDate.toLocaleString('default', { month: 'long' })}
                        </option>
                      );
                    })}
                  </select>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {Array.from({ length: 5 }, (_, i) => {
                      const year = new Date().getFullYear() - 2 + i;
                      return (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="text-center mt-3 text-lg font-semibold text-blue-600 dark:text-blue-400">
                {new Date(selectedYear, selectedMonth, 1).toLocaleString('default', { month: 'long', year: 'numeric' })}
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <SummaryCards transactions={monthlyTransactions} />
            </div>

            {/* Budget Tracker */}
            <BudgetTracker transactions={monthlyTransactions} budgets={budgets} setBudgets={setBudgets} userRole={userRole} />
            
            {/* Balance Trend Chart */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Balance Trend Over Time</h3>
              <BalanceTrendChart transactions={transactions} />
            </div>
            
            {/* Chart Section */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Spending Breakdown by Category</h3>
              <SpendingBreakdownChart transactions={monthlyTransactions} budgets={budgets} onCategorySelect={setSelectedCategory} />
            </div>
          </>
        )}
        
        {/* Transactions Tab */}
        {activeTab === "transactions" && (
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 mb-8">
            <TransactionTable 
              transactions={transactions}
              allTransactions={transactions}
              userRole={userRole}
              onAddTransaction={handleAddTransaction}
              onUpdateTransaction={handleUpdateTransaction}
              onDeleteTransaction={handleDeleteTransaction}
              selectedCategory={selectedCategory}
              onCategorySelect={setSelectedCategory}
              selectedMonth={selectedMonth}
              selectedYear={selectedYear}
            />
          </div>
        )}
        
        {/* Insights Tab */}
        {activeTab === "insights" && (
          showInsights && <Insights 
            transactions={transactions} 
            monthlyTransactions={monthlyTransactions}
            selectedCategory={selectedCategory} 
            selectedMonth={selectedMonth} 
            selectedYear={selectedYear} 
          />
        )}
      </div>
    </div>
  );
}

export default App;