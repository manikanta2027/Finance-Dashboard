import React, { useState } from "react";
import { FiAlertTriangle, FiCheck, FiX, FiEdit2, FiSave } from "react-icons/fi";
import { getBudgetStatus } from "../../utils/calculations";

const BudgetTracker = ({ transactions, budgets, setBudgets, userRole }) => {
  const [editingCategory, setEditingCategory] = useState(null);
  const [newBudget, setNewBudget] = useState("");

  const budgetStatus = getBudgetStatus(transactions, budgets);

  const handleBudgetChange = (category, value) => {
    const amount = parseInt(value) || 0;
    setBudgets({
      ...budgets,
      [category]: amount
    });
    setEditingCategory(null);
    setNewBudget("");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "exceeded":
        return "text-red-500 bg-red-50 dark:bg-red-900/20";
      case "warning":
        return "text-orange-500 bg-orange-50 dark:bg-orange-900/20";
      default:
        return "text-green-500 bg-green-50 dark:bg-green-900/20";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "exceeded":
        return <FiX className="text-lg" />;
      case "warning":
        return <FiAlertTriangle className="text-lg" />;
      default:
        return <FiCheck className="text-lg" />;
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 mb-8">
      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6">
        Budget Tracker
      </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {budgetStatus.map((item) => (
          <div
            key={item.category}
            className={`p-3 md:p-4 rounded-lg border-2 ${getStatusColor(item.status)}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 capitalize">
                  {item.category}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Spent: ₹{item.spending.toLocaleString()}
                </p>
              </div>
              <div className="flex items-center">{getStatusIcon(item.status)}</div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm gap-2">
                <span className="text-gray-600 dark:text-gray-400">Budget:</span>
                {userRole === "admin" && editingCategory === item.category ? (
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={newBudget}
                      onChange={(e) => setNewBudget(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          handleBudgetChange(item.category, newBudget);
                        }
                      }}
                      className="px-2 py-1 text-sm border rounded dark:bg-slate-700 dark:border-slate-600 w-20"
                      autoFocus
                    />
                    <button
                      onClick={() => handleBudgetChange(item.category, newBudget)}
                      className="p-1 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30 rounded transition-colors"
                      title="Save budget"
                    >
                      <FiSave className="text-base" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">₹{item.budget.toLocaleString()}</span>
                    {userRole === "admin" && (
                      <button
                        onClick={() => {
                          setEditingCategory(item.category);
                          setNewBudget(item.budget);
                        }}
                        className="p-1 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded transition-colors"
                        title="Edit budget"
                      >
                        <FiEdit2 className="text-sm" />
                      </button>
                    )}
                  </div>
                )}
              </div>

              {item.budget > 0 && (
                <>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        item.status === "exceeded"
                          ? "bg-red-500"
                          : item.status === "warning"
                          ? "bg-orange-500"
                          : "bg-green-500"
                      }`}
                      style={{ width: `${Math.min(item.percentage, 100)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                    <span>{item.percentage}% used</span>
                    <span>
                      {item.remaining > 0
                        ? `₹${item.remaining.toLocaleString()} left`
                        : `₹${Math.abs(item.remaining).toLocaleString()} over`}
                    </span>
                  </div>
                </>
              )}
              {item.budget === 0 && userRole === "admin" && (
                <button
                  onClick={() => {
                    setEditingCategory(item.category);
                    setNewBudget("");
                  }}
                  className="w-full text-xs text-blue-500 dark:text-blue-400 italic hover:font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 px-2 py-2 rounded transition-all"
                >
                  📝 Click to set budget
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BudgetTracker;
