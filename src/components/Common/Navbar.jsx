import React from "react"; 
import { FiBarChart2, FiEye, FiEyeOff, FiMoon, FiSun } from "react-icons/fi";

const Navbar = ({ userRole, setUserRole, showInsights, setShowInsights, darkMode, setDarkMode }) => {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-700 p-4 lg:p-6 text-white shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <FiBarChart2 className="text-2xl" />
          <h1 className="text-2xl lg:text-3xl font-bold">Finance Dashboard</h1>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 w-full md:w-auto justify-center md:justify-end ">
          {/* Dark Mode Toggle */}
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-all duration-300 flex-shrink-0"
            title="Toggle Dark Mode"
          >
            {darkMode ? (
              <FiSun className="text-lg" />
            ) : (
              <FiMoon className="text-lg" />
            )}
          </button>

          {/* Insights Toggle Button */}
          <button 
            onClick={() => setShowInsights(!showInsights)}
            className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-all duration-300 text-xs sm:text-sm flex-shrink-0"
            title="Toggle Insights"
          >
            {showInsights ? (
              <>
                <FiEyeOff className="text-lg" />
                <span className="hidden sm:inline">Hide</span>
              </>
            ) : (
              <>
                <FiEye className="text-lg" />
                <span className="hidden sm:inline">Show</span>
              </>
            )}
          </button>

          {/* Role Dropdown */}
          <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg flex-shrink-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <label className="hidden sm:block font-bold text-xs sm:text-sm whitespace-nowrap text-white">Role:</label>
            <select 
              value={userRole} 
              onChange={(e) => setUserRole(e.target.value)}
              className="px-3 py-1 text-white bg-white bg-opacity-20 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 font-bold text-xs sm:text-sm cursor-pointer border border-white border-opacity-30 hover:bg-opacity-30 transition-all duration-300"
            >
              <option value="viewer" className="bg-slate-800 text-white">👁️ Viewer</option>
              <option value="admin" className="bg-slate-800 text-white">⚙️ Admin</option>
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;