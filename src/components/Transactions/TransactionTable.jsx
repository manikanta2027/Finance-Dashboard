import React,{useState} from "react";
import { FiFilter, FiPlus, FiDownload, FiX, FiEdit2, FiTrash2 } from "react-icons/fi";
import { calculateFinancialSummary, getSpendingPercentage } from "../../utils/calculations";

const TransactionTable = ({ transactions, allTransactions, userRole, onAddTransaction, onUpdateTransaction, onDeleteTransaction, selectedCategory, onCategorySelect, selectedMonth, selectedYear }) =>{

    const [filterType, setFilterType] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [warningMessage, setWarningMessage] = useState("");
    
    // Get default date for the selected month/year
    const getDefaultDate = () => {
      const date = new Date(selectedYear, selectedMonth, 1);
      return date.toISOString().split('T')[0];
    };
    
    const [formData, setFormData] = useState({
      date: getDefaultDate(),
      amount: "",
      category: "",
      type: "expense"
    });

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      if (name === "type") {
        // Reset category when type changes
        setFormData({
          ...formData,
          [name]: value,
          category: ""
        });
      } else {
        setFormData({
          ...formData,
          [name]: value
        });
      }
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      
      if (editingId) {
        // Update existing transaction
        const transactionToUpdate = transactions.find(t => t.id === editingId);
        const updatedTransaction = {
          ...transactionToUpdate,
          ...formData,
          amount: parseInt(formData.amount)
        };
        onUpdateTransaction(updatedTransaction);
        setEditingId(null);
        setWarningMessage("");
      } else {
        // Add new transaction - validate balance for expenses
        const expenseAmount = parseInt(formData.amount) || 0;
        
        if (formData.type === "expense" && expenseAmount > 0) {
          // Filter transactions by selected month and year (matching dashboard)
          const monthlyTxns = (allTransactions || transactions).filter(t => {
            const txnDate = new Date(t.date);
            return txnDate.getMonth() === selectedMonth && txnDate.getFullYear() === selectedYear;
          });
          
          // Calculate balance for the selected month only
          const monthlyIncome = monthlyTxns.reduce((sum, t) => t.type === "income" ? sum + parseInt(t.amount) : sum, 0);
          const monthlyExpense = monthlyTxns.reduce((sum, t) => t.type === "expense" ? sum + parseInt(t.amount) : sum, 0);
          const currentBalance = monthlyIncome - monthlyExpense;
          
          // Check if expense exceeds available balance
          if (expenseAmount > currentBalance) {
            setWarningMessage(`Current Balance: ₹${currentBalance.toLocaleString()} | Expense Amount: ₹${expenseAmount.toLocaleString()}`);
            return;
          }
        }
        
        // Add new transaction
        const newTransaction = {
          id: Math.max(...transactions.map(t => t.id), 0) + 1,
          ...formData,
          amount: parseInt(formData.amount),
          status: "Completed",
          paymentMode: "Bank Transfer",
          description: "New Transaction",
          senderAccount: "User",
          receiverAccount: "Recipient"
        };
        
        onAddTransaction(newTransaction);
      }
      
      setFormData({ date: getDefaultDate(), amount: "", category: "", type: "expense" });
      setWarningMessage("");
    };

    const handleEdit = (transaction) => {
      setEditingId(transaction.id);
      setFormData({
        date: transaction.date,
        amount: transaction.amount,
        category: transaction.category,
        type: transaction.type
      });
      setWarningMessage("");
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = (id) => {
      if (window.confirm('Are you sure you want to delete this transaction?')) {
        onDeleteTransaction(id);
      }
    };

    const handleCancel = () => {
      setEditingId(null);
      setFormData({ date: getDefaultDate(), amount: "", category: "", type: "expense" });
      setWarningMessage("");
    };

    const filteredTransactions = transactions.filter(transaction => {
        // Filter by selected month and year
        const transactionDate = new Date(transaction.date);
        if(transactionDate.getMonth() !== selectedMonth || transactionDate.getFullYear() !== selectedYear) {
            return false;
        }
        
        // Filter by selected category
        if(selectedCategory && transaction.category !== selectedCategory) {
            return false;
        }

        // Filter by type
        if(filterType !== "all" && transaction.type !== filterType){
            return false;
        }
        
        // Filter by search term (category or description)
        if(searchTerm){
            const searchLower = searchTerm.toLowerCase();
            const matchesCategory = transaction.category.toLowerCase().includes(searchLower);
            const matchesDescription = transaction.description.toLowerCase().includes(searchLower);
            return matchesCategory || matchesDescription;
        }
        
        return true;
    });

    const spendingPercentage = getSpendingPercentage(transactions);

    // Export to CSV
    const exportToCSV = () => {
        const headers = ['Date', 'Amount', 'Category', 'Type', 'Status'];
        const rows = filteredTransactions.map(t => [
            t.date,
            t.amount,
            t.category,
            t.type,
            t.status
        ]);
        
        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.join(','))
        ].join('\n');
        
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `transactions-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    // Export to JSON
    const exportToJSON = () => {
        const dataStr = JSON.stringify(filteredTransactions, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `transactions-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        window.URL.revokeObjectURL(url);
    };
    
    return (
        <div>
        {/* Spending Analysis */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-700 dark:to-slate-600 p-4 rounded-lg mb-6 border border-blue-200 dark:border-slate-500">
          <p className="text-sm text-gray-700 dark:text-gray-200">
            <span className="font-semibold">Spending Analysis:</span> You're spending <span className="text-lg font-bold text-blue-600 dark:text-blue-300">{spendingPercentage}%</span> of your income on expenses
            <span className={`ml-4 font-semibold ${spendingPercentage > 80 ? 'text-orange-600 dark:text-orange-400' : 'text-green-600 dark:text-green-400'}`}>
              {spendingPercentage > 80 ? '⚠️ High spending rate' : '✓ Good spending rate'}
            </span>
          </p>
        </div>

        {userRole === "admin" && (
          <form onSubmit={handleSubmit} className={`bg-white dark:bg-slate-800 p-3 md:p-4 rounded-lg mb-6 border-2 ${editingId ? 'border-orange-500 dark:border-orange-400' : 'border-gray-200 dark:border-slate-700'}`}>
            {editingId && (
              <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700 text-orange-800 dark:text-orange-200 px-3 py-2 rounded mb-4 flex items-center justify-between">
                <span className="font-semibold">✏️ Editing Transaction</span>
              </div>
            )}
            {warningMessage && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-700 text-red-800 dark:text-red-200 px-4 py-3 rounded-lg mb-4 flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">⚠️</span>
                  <div>
                    <p className="font-bold text-base mb-1">Insufficient Balance!</p>
                    <p className="text-sm">{warningMessage}</p>
                    <p className="text-sm mt-2">You cannot add an expense greater than your available balance.</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setWarningMessage("")}
                  className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200 flex-shrink-0 text-xl"
                >
                  ×
                </button>
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 md:gap-3">
              <input 
                type="date" 
                name="date" 
                value={formData.date} 
                onChange={handleInputChange} 
                className="px-3 py-2 text-xs md:text-sm border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                required 
              />
              <input 
                type="number" 
                name="amount" 
                value={formData.amount} 
                onChange={handleInputChange} 
                placeholder="Amount"
                className="px-3 py-2 text-xs md:text-sm border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                required 
              />
              <select 
                name="type" 
                value={formData.type} 
                onChange={handleInputChange}
                className="px-3 py-2 text-xs md:text-sm border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
              <select 
                name="category" 
                value={formData.category} 
                onChange={handleInputChange}
                className="px-3 py-2 text-xs md:text-sm border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                required 
              >
                <option value="">Select Category</option>
                {formData.type === "income" ? (
                  <>
                    <option value="Salary">Salary</option>
                    <option value="Bonus">Bonus</option>
                    <option value="Investment Returns">Investment Returns</option>
                    <option value="Freelance">Freelance</option>
                    <option value="Other Income">Other Income</option>
                  </>
                ) : (
                  <>
                    <option value="Groceries">Groceries</option>
                    <option value="Food and Dining">Food and Dining</option>
                    <option value="Loan Repayment">Loan Repayment</option>
                    <option value="Other expenses">Other expenses</option>
                    <option value="Bills">Bills</option>
                  </>
                )}
              </select>
              <div className="flex gap-2">
                <button type="submit" className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 text-xs md:text-sm">
                  <FiPlus /> {editingId ? 'Update' : 'Add'}
                </button>
                {editingId && (
                  <button 
                    type="button" 
                    onClick={handleCancel}
                    className="flex-1 px-3 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-lg font-semibold transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 text-xs md:text-sm"
                  >
                    <FiX /> Cancel
                  </button>
                )}
              </div>
            </div>
          </form>
        )}
        
        {/* Selected Category Badge */}
        {selectedCategory && (
          <div className="mb-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-lg">
            <span className="font-semibold">Filtered by: {selectedCategory}</span>
            <button 
              onClick={() => onCategorySelect(null)}
              className="ml-2 hover:bg-blue-200 dark:hover:bg-blue-800 rounded p-1 transition-colors"
              title="Clear filter"
            >
              <FiX className="text-lg" />
            </button>
          </div>
        )}
        
        <div className="flex flex-col gap-4 mb-6">
          {/* Search Box */}
          <input 
            type="text" 
            placeholder="Search by category or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white text-sm md:text-base"
          />
          
          {/* Filter and Export Controls */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            {/* Filter Dropdown */}
            <div className="flex items-center gap-2 flex-1 sm:flex-none">
              <FiFilter className="text-gray-600 dark:text-gray-400 flex-shrink-0" />
              <label className="hidden sm:block font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">Filter:</label>
              <select 
                value={filterType} 
                onChange={(e) => setFilterType(e.target.value)}
                className="flex-1 sm:flex-none px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-800 dark:text-white text-sm"
              >
                <option value="all">All Transactions</option>
                <option value="income">Income only</option>
                <option value="expense">Expense Only</option>
              </select>
            </div>

            {/* Export Buttons */}
            <div className="flex gap-2 flex-1 sm:flex-none w-full sm:w-auto">
            <button 
              onClick={exportToCSV}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-2 sm:px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-all duration-300 text-xs sm:text-sm"
              title="Export as CSV"
            >
              <FiDownload className="text-lg" />
              <span>CSV</span>
            </button>
            <button 
              onClick={exportToJSON}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-2 sm:px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-all duration-300 text-xs sm:text-sm"
              title="Export as JSON"
            >
              <FiDownload className="text-lg" />
              <span>JSON</span>
            </button>
            </div>
          </div>
        </div>

        <div className="w-full overflow-x-auto bg-white dark:bg-slate-800 rounded-lg shadow-md">
          <table className="w-full min-w-max md:min-w-0">
              <thead className="bg-gradient-to-r from-blue-600 to-purple-700 text-white sticky top-0">
                  <tr>
                      <th className="px-2 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold">Date</th> 
                      <th className="px-2 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold">Amount</th>
                      <th className="px-2 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold">Category</th>
                      <th className="hidden sm:table-cell px-4 py-3 text-left text-sm font-semibold">Type</th>
                      <th className="hidden md:table-cell px-4 py-3 text-left text-sm font-semibold">Status</th>
                      {userRole === "admin" && <th className="px-2 sm:px-4 py-3 text-center text-xs sm:text-sm font-semibold">Actions</th>}
                  </tr>
              </thead>
              <tbody>
                  {filteredTransactions.map(transaction => (
                      <tr key={transaction.id} className="border-b dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                          <td className="px-2 sm:px-4 py-3 text-xs sm:text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">{transaction.date}</td>
                          <td className="px-2 sm:px-4 py-3 text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200 whitespace-nowrap">₹{transaction.amount.toLocaleString()}</td>
                          <td className="px-2 sm:px-4 py-3 text-xs sm:text-sm text-gray-700 dark:text-gray-300">{transaction.category}</td>
                          <td className="hidden sm:table-cell px-4 py-3 text-sm">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${transaction.type === 'income' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100' : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100'}`}>
                              {transaction.type}
                            </span>
                          </td>
                          <td className="hidden md:table-cell px-4 py-3 text-sm">
                            <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100">
                              {transaction.status}
                            </span>
                          </td>
                          {userRole === "admin" && (
                            <td className="px-2 sm:px-4 py-3 text-center">
                              <div className="flex gap-2 justify-center items-center">
                                <button
                                  onClick={() => handleEdit(transaction)}
                                  className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded transition-colors"
                                  title="Edit transaction"
                                >
                                  <FiEdit2 className="text-sm sm:text-base" />
                                </button>
                                <button
                                  onClick={() => handleDelete(transaction.id)}
                                  className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition-colors"
                                  title="Delete transaction"
                                >
                                  <FiTrash2 className="text-sm sm:text-base" />
                                </button>
                              </div>
                            </td>
                          )}
                      </tr>
                  ))}
              </tbody>
          </table>
        </div>
        </div>
    );

};

export default TransactionTable;