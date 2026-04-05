import { transactions } from "../data/mockData";

export const calculateFinancialSummary = (transactions) => {

    const TotalIncome = transactions.filter(transaction => transaction.type === "income")
    .reduce((runningTotal, transaction) => runningTotal + transaction.amount, 0);
    const TotalExpense = transactions.filter(transaction => transaction.type === "expense")
    .reduce((runningTotal, transaction) => runningTotal + transaction.amount, 0);
    const TotalBalance = TotalIncome - TotalExpense

    return {
        TotalIncome,
        TotalExpense,
        TotalBalance
    }
}

export const getCategorySpending = (transactions) => {
    // Normalize category names (case-insensitive matching)
    const budgetCategories = ["Groceries", "Food and Dining", "Loan Repayment", "Other expenses", "Bills"];
    
    const normalizeCategory = (category) => {
      const categoryLower = category.toLowerCase().trim();
      const matched = budgetCategories.find(key => key.toLowerCase() === categoryLower);
      return matched || category;
    };
    
    const expenses = transactions.filter(transaction => transaction.type === "expense");
    
    const categoryMap = {};

    expenses.forEach(expense => {
        const normalizedCategory = normalizeCategory(expense.category);
        if(!categoryMap[normalizedCategory]){
            categoryMap[normalizedCategory] = 0;
        }
        categoryMap[normalizedCategory] += expense.amount;
    });

    const categoryData = Object.keys(categoryMap).map(category => ({
        category,
        amount: categoryMap[category]
    }));

    return categoryData;
}

export const getInsights = (transactions) => {
    // Get total transactions count
    const totalTransactions = transactions.length;
    
    // Get average transaction amount
    const averageAmount = transactions.length > 0 
        ? Math.round(transactions.reduce((sum, t) => sum + t.amount, 0) / transactions.length)
        : 0;
    
    // Get highest spending category
    const categorySpending = getCategorySpending(transactions);
    const highestCategory = categorySpending.length > 0 
        ? categorySpending.reduce((max, current) => current.amount > max.amount ? current : max)
        : null;
    
    // Count expenses only
    const expenseCount = transactions.filter(t => t.type === "expense").length;
    
    // Count income only
    const incomeCount = transactions.filter(t => t.type === "income").length;
    
    return {
        totalTransactions,
        averageAmount,
        highestCategory,
        expenseCount,
        incomeCount
    };
}

export const getBalanceTrend = (transactions) => {
    // Sort transactions by date
    const sortedTransactions = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // Group transactions by month
    const monthlyData = {};
    
    sortedTransactions.forEach(transaction => {
        const date = new Date(transaction.date);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        const monthLabel = date.toLocaleString('default', { month: 'short' });
        
        if (!monthlyData[monthKey]) {
            monthlyData[monthKey] = {
                month: monthLabel,
                income: 0,
                expense: 0,
                balance: 0
            };
        }
        
        if (transaction.type === "income") {
            monthlyData[monthKey].income += transaction.amount;
        } else {
            monthlyData[monthKey].expense += transaction.amount;
        }
        
        // Calculate balance for this month only
        monthlyData[monthKey].balance = monthlyData[monthKey].income - monthlyData[monthKey].expense;
    });
    
    // Convert to array
    const trendData = Object.values(monthlyData);
    return trendData;
}

// Get spending percentage of income
export const getSpendingPercentage = (transactions) => {
    const { TotalIncome, TotalExpense } = calculateFinancialSummary(transactions);
    
    if (TotalIncome === 0) return 0;
    return Math.round((TotalExpense / TotalIncome) * 100);
}

// Get month-over-month comparison
export const getMonthComparison = (transactions, selectedMonth, selectedYear) => {
    // Use selected month/year or fall back to current date
    const currentMonth = selectedMonth !== undefined ? selectedMonth : new Date().getMonth();
    const currentYear = selectedYear !== undefined ? selectedYear : new Date().getFullYear();
    
    // Calculate previous month and year
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    
    // Current month spending
    const currentMonthExpenses = transactions.filter(t => {
        const date = new Date(t.date);
        return t.type === "expense" && date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    }).reduce((sum, t) => sum + t.amount, 0);
    
    // Last month spending
    const lastMonthExpenses = transactions.filter(t => {
        const date = new Date(t.date);
        return t.type === "expense" && date.getMonth() === lastMonth && date.getFullYear() === lastMonthYear;
    }).reduce((sum, t) => sum + t.amount, 0);
    
    const difference = currentMonthExpenses - lastMonthExpenses;
    const percentChange = lastMonthExpenses === 0 ? 0 : Math.round((difference / lastMonthExpenses) * 100);
    
    return {
        currentMonth: currentMonthExpenses,
        lastMonth: lastMonthExpenses,
        difference,
        percentChange,
        isHigher: difference > 0
    };
}

// Get budget status per category
export const getBudgetStatus = (transactions, budgets) => {
    const categorySpending = getCategorySpending(transactions);
    
    // Create a spending map for easy lookup
    const spendingMap = {};
    categorySpending.forEach(item => {
        spendingMap[item.category] = item.amount;
    });
    
    // Return all budget categories, including those with no spending
    return Object.keys(budgets).map(category => {
        const budget = budgets[category] || 0;
        const spending = spendingMap[category] || 0;
        const remaining = budget - spending;
        const percentage = budget > 0 ? Math.round((spending / budget) * 100) : 0;
        
        return {
            category,
            budget,
            spending,
            remaining,
            percentage,
            status: percentage > 100 ? 'exceeded' : percentage > 80 ? 'warning' : 'ok'
        };
    });
}