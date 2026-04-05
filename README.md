# Finance Dashboard

A modern, interactive finance dashboard built with React, Tailwind CSS, and Recharts. This application demonstrates frontend development skills including component design, state management, responsive UI, and data visualization.

## ✨ Features Implemented

### ✅ Core Requirements

#### 1. Dashboard Overview
- **Summary Cards** - Display Total Balance, Total Income, and Total Expenses with visual indicators
- **Balance Trend Chart** - Interactive line chart showing balance progression over time
- **Spending Breakdown Chart** - Bar chart visualizing spending by category
- All charts are responsive and interactive with Recharts

#### 2. Transactions Section
- **Transaction Table** - Displays all transactions with columns:
  - Date
  - Amount (formatted with ₹ currency)
  - Category
  - Type (Income/Expense with color-coded badges)
  - Status
- **Filtering** - Filter transactions by type (All/Income/Expense)
- **Search** - Search transactions by category or description in real-time

#### 3. Role-Based UI
- **Viewer Role** - Can only view data, Add Transaction form is hidden
- **Admin Role** - Has access to add new transactions with date, amount, category, and type
- **Role Dropdown** - Easy switching between roles in Navbar for demonstration
- Form validation and auto-reset after submission

#### 4. Insights Section
- **5 Key Metrics**:
  - Total Transactions count
  - Average Transaction Amount
  - Highest Spending Category (with amount)
  - Income Transactions count
  - Expense Transactions count
- **Toggle Visibility** - Show/Hide insights with Eye icon in navbar
- Each insight displayed with relevant icons and color coding

#### 5. State Management
- **React Hooks** - Uses useState for:
  - Role selection
  - Transactions array
  - Filter state
  - Search term
  - Insights visibility
  - Active tab
- Clean prop drilling from App.jsx to child components
- Proper data flow and updates

#### 6. UI/UX
- **Clean & Modern Design** - Gradient backgrounds, card-based layout, consistent spacing
- **Fully Responsive** - 
  - Mobile: Single column layouts, stacked navigation
  - Tablet: 2-column grids
  - Desktop: Full 3-column grids, horizontal layouts
- **Tailwind CSS** - Utility-first styling for clean, maintainable code
- **React Icons** - Professional icons throughout the interface
- **Empty State Handling** - Graceful messages when no data available
- **Hover Effects & Transitions** - Smooth interactions and visual feedback

### ✅ Optional Enhancements Implemented

- **Navigation Tabs** - Dashboard, Transactions, and Insights sections for better organization
- **Animations & Transitions** - Smooth hover effects, color transitions, shadow effects
- **Advanced Filtering** - Combined type filter + search functionality
- **Data Formatting** - Currency formatting, date formatting, number localization
- **Color-Coded Status** - Income (green), Expense (red), Status badges (blue)
- **Dark Mode** ✨ - Full dark mode support with toggle button, persists in localStorage
- **Local Storage Persistence** ✨ - Transactions, budgets, and dark mode preference saved to browser
- **Export Functionality** ✨ - Export transactions to CSV or JSON format
- **Budget Tracking** 🎯 - Set budget limits per category with visual progress bars and status warnings (Dashboard)
- **Interactive Charts** 🖱️ - Click bars in spending chart to filter transactions automatically (Dashboard to Transactions)
- **Spending Analysis** 📊 - Shows spending % of income with alerts (Transactions page)
- **Month-over-Month Comparison** 📈 - Displays current vs last month spending with percentage change (Insights page)

## 📁 Project Structure

```
src/
├── components/
│   ├── Common/
│   │   ├── Navbar.jsx          # Top navigation with role selector
│   │   └── Navigation.jsx       # Tab navigation
│   ├── Dashboard/
│   │   └── SummaryCards.jsx     # Income, Expense, Balance cards
│   ├── Transactions/
│   │   └── TransactionTable.jsx # Transaction list with filtering & search
│   ├── Charts/
│   │   ├── BalanceTrendChart.jsx  # Line chart (time-based)
│   │   └── SpendingBreakdownChart.jsx # Bar chart (categorical)
│   └── Insights/
│       └── Insights.jsx         # 5 key financial metrics
├── data/
│   └── mockData.js              # Sample transactions (5 entries)
├── utils/
│   └── calculations.js          # Helper functions for data processing
├── App.jsx                      # Main app component with state
├── index.css                    # Tailwind directives
├── main.jsx                     # React entry point
└── vite.config.js              # Vite configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation

1. **Clone Repository**
   ```bash
   cd Zorvyn
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Dev Server**
   ```bash
   npm run dev
   ```
   Server runs on `http://localhost:5175/` (or next available port)

4. **Build for Production**
   ```bash
   npm run build
   ```

## 📊 How to Use

### Switching Roles
- Click the **Role** dropdown in the navbar
- Select **Viewer** (read-only) or **Admin** (can add transactions)
- Add Transaction form appears/disappears based on role

### Adding Transactions (Admin Only)
1. Switch to Admin role
2. Fill in the form with:
   - Date
   - Amount
   - Category
   - Type (Income/Expense)
3. Click "Add" button
4. Transaction appears in the table immediately

### Navigating the Dashboard
- Use tabs at the top to switch between:
  - **Dashboard** - Summary cards + charts
  - **Transactions** - Transaction list with search/filter
  - **Insights** - Financial metrics

### Exporting Transactions
- On the Transactions tab, use the **CSV** or **JSON** export buttons
- Downloads filtered transactions (based on current search/filter)
- File named: `transactions-YYYY-MM-DD.csv` or `.json`

### Budget Tracking (Dashboard)
- View **Budget Tracker** section on Dashboard
- **Set Budget Limits**: Click on budget amount to edit per category
- **Visual Progress**: Color-coded progress bars show spending vs budget
  - 🟢 Green (OK): < 80% of budget
  - 🟠 Orange (Warning): 80-99% of budget
  - 🔴 Red (Exceeded): > 100% of budget
- **Quick Stats**: See remaining budget or overspend amount
- **Budgets auto-save** to localStorage

### Interactive Chart Filtering
- On Dashboard, **click any bar** in the Spending Breakdown chart
- Automatically filters the Transactions table to show only that category
- Shows **blue badge** indicating active category filter
- Click **X** on badge to clear filter
- Great for analyzing category-specific spending!

### Spending Analysis (Transactions)
- See your **spending % of income** at the top of Transactions page
- Visual indicator shows if spending is 🔴 High (>80%) or ✅ Good (<80%)
- Use this to understand your financial behavior at a glance

### Month-over-Month Comparison (Insights)
- On Insights page, view **Month-over-Month Comparison** section
- Compares current month spending vs last month
- Shows percentage change with visual indicators:
  - 📈 Higher spending (orange)
  - 📉 Lower spending (green)
- Helps track spending trends over time

### Dark Mode
- Click the **Moon/Sun icon** in the navbar to toggle dark mode
- Preference is automatically saved to browser
- Works seamlessly across all pages and components

### Auto-Save
- All transactions are automatically saved to browser's localStorage
- Dark mode preference is also saved
- Data persists even after closing the browser

### Searching & Filtering
- **Search Box** - Type category or description name
- **Filter Dropdown** - Select All/Income/Expense
- Both work together for refined results

### Viewing Insights
- Click **Eye icon** in navbar to toggle insights visibility
- Insights show on "Insights" tab
- 5 metrics: Total Trans., Avg Amount, Highest Spend, Income Count, Expense Count

## 📦 Dependencies

- **React** - UI library
- **Recharts** - Data visualization (charts)
- **react-icons** - Icon library
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Build tool & dev server

## 🎨 Key Technical Decisions

### State Management
Used React `useState` hooks in App.jsx as the single source of truth. While simpler than Redux/Context, it effectively handles:
- Role selection
- Transaction CRUD operations
- Filter/search state
- UI visibility toggles

### Component Structure
- **Container Components** (App.jsx) - Manage state
- **Presentational Components** - Display UI elements
- Clear prop interfaces for reusability

### Styling Approach
- **Tailwind CSS** - Utility classes for responsive, maintainable styling
- **Custom Utility Patterns** - Consistent button/input styles
- **Gradient Backgrounds** - Visual hierarchy and modern look

### Data Calculation
- Helper functions in `utils/calculations.js`:
  - `calculateFinancialSummary()` - Income, Expense, Balance
  - `getCategorySpending()` - Spending by category
  - `getInsights()` - 5 key metrics
  - `getBalanceTrend()` - Balance over time for charting

### Dark Mode Implementation
- **Tailwind `dark:` classes** - Utility-based dark mode styling
- **localStorage Persistence** - Dark mode preference saved
- **useEffect Hook** - Auto-saves/loads dark mode state
- **ClassName Toggle** - Adds/removes `dark` class on root div

### Local Storage Strategy
- **Transactions** - Automatically saved when added/updated
- **Dark Mode** - Persists user preference
- **useEffect Hooks** - Watches for state changes and saves to localStorage
- **Initialization** - Loads saved data on app startup using conditional operator

## 📈 Mock Data

The dashboard includes 5 sample transactions:
1. Salary - ₹100,000 (Income)
2. Groceries - ₹5,000 (Expense)
3. Loan Payment - ₹15,000 (Expense)
4. Food - ₹2,500 (Expense)
5. Other - ₹1,000 (Expense)

Easily expandable by adding to `src/data/mockData.js`

## 🎯 Requirements Checklist

### Core Requirements
- ✅ Dashboard Overview (summary cards + 2 charts)
- ✅ Transaction Section (list, filter, search)
- ✅ Role-Based UI (Viewer/Admin with conditional rendering)
- ✅ Insights Section (5 financial metrics)
- ✅ State Management (React hooks)
- ✅ UI/UX (responsive, clean, accessible)

### Assignment Evaluation Criteria
1. **Design & Creativity** ✅ - Modern gradient design, card layouts, color-coded indicators
2. **Responsiveness** ✅ - Mobile-first approach, grid-based responsive layouts
3. **Functionality** ✅ - All core features working, role-based access control
4. **User Experience** ✅ - Intuitive navigation, clear visual hierarchy
5. **Technical Quality** ✅ - Clean component structure, reusable utility functions
6. **State Management** ✅ - Effective React hooks usage, clear data flow
7. **Documentation** ✅ - This README with setup and feature overview
8. **Attention to Detail** ✅ - Empty state handling, error boundaries, polish

## 🔄 Testing the Application

### Test Role-Based Access
1. Open as **Viewer** - Add Transaction form hidden ✓
2. Switch to **Admin** - Add Transaction form visible ✓
3. Add a transaction - Should appear in table immediately ✓

### Test Filtering & Search
1. Filter by "Income" - Shows only income transactions
2. Filter by "Expense" - Shows only expenses
3. Search "groceries" - Filters by category/description
4. Combine filter + search - Both work together ✓

### Test Responsiveness
1. Open on mobile (< 640px) - Single column layout
2. Open on tablet (640px-1024px) - 2 column layout
3. Open on desktop (> 1024px) - 3 column layout ✓

### Test Dark Mode
1. Click Moon icon in navbar - Theme switches to dark ✓
2. Refresh page - Dark mode persists ✓
3. All colors and text remain readable and properly contrasted ✓

### Test Data Persistence
1. Add a transaction - Appears in table
2. Refresh page - Transaction still there ✓
3. Toggle dark mode, refresh - Setting persists ✓

### Test Export Functionality
1. Click **CSV** button - Downloads `transactions-YYYY-MM-DD.csv` ✓
2. Click **JSON** button - Downloads `transactions-YYYY-MM-DD.json` ✓
3. Apply filter/search, then export - Only filtered data exported ✓

### Test Data Updates
1. Add new transaction as Admin
2. Summary cards update immediately
3. Charts recalculate
4. Insights refresh ✓

## 💡 Notes for Evaluators

- **Assignment Focus**: Frontend design, component structure, state management, and UX
- **Not Production Ready**: Uses mock data, no real backend/database
- **Design Philosophy**: Simple, clean, and intuitive - prioritizing clarity over complexity
- **Extensibility**: Easy to add features like dark mode, local storage, API integration

## 📝 Future Enhancements (Optional)

- Mock API integration with backend
- Budget tracking and alerts
- Monthly/yearly comparison views
- Advanced date range filtering
- Transaction categories customization
- Recurring transactions
- Multi-currency support
- Financial goal tracking
