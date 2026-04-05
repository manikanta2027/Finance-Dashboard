import React from "react";
import { FiTrendingUp, FiTrendingDown, FiBriefcase } from "react-icons/fi";
import { calculateFinancialSummary } from "../../utils/calculations";

const SummaryCards = ({ transactions }) =>{
    
    const {TotalIncome,TotalExpense,TotalBalance} = calculateFinancialSummary(transactions);

    return (
        <>
        <div className="bg-gradient-to-br from-green-400 to-emerald-500 dark:from-green-600 dark:to-emerald-700 p-4 md:p-6 rounded-lg text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between gap-3">
                <div>
                    <h3 className="text-xs md:text-sm font-semibold opacity-90">Total Income</h3>
                    <p className="text-xl md:text-3xl font-bold mt-2">₹{TotalIncome.toLocaleString()}</p>
                </div>
                <FiTrendingUp className="text-3xl md:text-4xl opacity-70 flex-shrink-0" />
            </div>
        </div>
        <div className="bg-gradient-to-br from-red-400 to-orange-500 dark:from-red-600 dark:to-orange-700 p-4 md:p-6 rounded-lg text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between gap-3">
                <div>
                    <h3 className="text-xs md:text-sm font-semibold opacity-90">Total Expense</h3>
                    <p className="text-xl md:text-3xl font-bold mt-2">₹{TotalExpense.toLocaleString()}</p>
                </div>
                <FiTrendingDown className="text-3xl md:text-4xl opacity-70 flex-shrink-0" />
            </div>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-700 dark:to-purple-800 p-4 md:p-6 rounded-lg text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between gap-3">
                <div>
                    <h3 className="text-xs md:text-sm font-semibold opacity-90">Total Balance</h3>
                    <p className="text-xl md:text-3xl font-bold mt-2">₹{TotalBalance.toLocaleString()}</p>
                </div>
                <FiBriefcase className="text-3xl md:text-4xl opacity-70 flex-shrink-0" />
            </div>
        </div>
        </>
    )
}

export default SummaryCards;



