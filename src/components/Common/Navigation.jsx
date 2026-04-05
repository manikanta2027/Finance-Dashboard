import React from "react";
import { FiBarChart2, FiList, FiTrendingUp } from "react-icons/fi";

const Navigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: FiBarChart2 },
    { id: "transactions", label: "Transactions", icon: FiList },
    { id: "insights", label: "Insights", icon: FiTrendingUp }
  ];

  return (
    <div className="bg-white dark:bg-slate-800 shadow-md rounded-lg p-2 md:p-4 mb-8 border-b-4 border-gradient-to-r from-blue-600 to-purple-700">
      <div className="flex gap-2 md:gap-4 overflow-x-auto">
        {tabs.map(tab => {
          const TabIcon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1 md:gap-2 px-3 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap text-xs md:text-base ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-blue-600 to-purple-700 text-white shadow-lg"
                  : "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600"
              }`}
            >
              <TabIcon className="text-base md:text-lg" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Navigation;
