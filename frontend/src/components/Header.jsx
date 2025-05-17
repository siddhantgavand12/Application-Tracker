import React from "react";
import { useAuth } from "../context/AuthContext";
const Header = ({
  darkMode,
  toggleDarkMode,
  showLogin,
  setShowLogin,
  adminCredentials,
  setAdminCredentials,
}) => {

  const { isAdmin, login, logout } = useAuth();
  

  return (
    <header className="bg-indigo-600 text-white p-4 shadow-md flex items-center justify-between relative">
      <div className="flex items-center space-x-4">
        <img src="/tm_logo.png" alt="Logo" className="h-10 rounded-md" />
        <h1 className="text-1xl sm:text-1xl md:text-2xl lg:text-3xl font-bold">
          Application Tracker for Tapasvi Mhatre
        </h1>
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={toggleDarkMode}
          className={`font-bold flex items-center px-4 py-2 rounded-md transition-colors duration-300 ${
            darkMode ? "bg-gray-200 text-gray-900" : "bg-gray-800 text-white"
          }`}
        >
          {darkMode ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2m0 14v2m9-9h-2M5 12H3m16.364-7.364l-1.414 1.414M5.05 5.05l1.414 1.414M18.364 18.364l-1.414-1.414M5.05 18.364l1.414-1.414M12 8a4 4 0 110 8 4 4 0 010-8z" />
              </svg>
              Light Mode
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
              </svg>
              Dark Mode
            </>
          )}
        </button>

{!isAdmin ? (
  <button
    className="bg-white text-indigo-600 px-4 py-2 rounded shadow"
    onClick={() => setShowLogin(!showLogin)}
  >
    {showLogin ? "Close" : "Admin Login"}
  </button>
) : (
  <button
    className="bg-red-600 text-white px-4 py-2 rounded shadow"
    onClick={() => {
      logout();
      setShowLogin(false);
    }}
  >
    Logout
  </button>
)}

{showLogin && !isAdmin && (
  <div className="absolute top-16 right-4 bg-white text-black shadow p-4 rounded z-50 w-64">
    <input
      type="text"
      placeholder="Username"
      className="w-full border mb-2 px-2 py-1 rounded"
      value={adminCredentials.username}
      onChange={(e) =>
        setAdminCredentials({ ...adminCredentials, username: e.target.value })
      }
    />
    <input
      type="password"
      placeholder="Password"
      className="w-full border mb-2 px-2 py-1 rounded"
      value={adminCredentials.password}
      onChange={(e) =>
        setAdminCredentials({ ...adminCredentials, password: e.target.value })
      }
    />
    <button
      className="bg-indigo-600 text-white w-full py-2 rounded"
      onClick={() => {
        const success = login(adminCredentials.username, adminCredentials.password);
        if (success) {
          setShowLogin(false);
        } else {
          alert("Invalid credentials");
        }
      }}
    >
      Login
    </button>
  </div>
)}
      </div>
    </header>
  );
};

export default Header;
