import React, { useState, useEffect } from 'react'
import LoginPage from './components/Auth/LoginPage.jsx'
import DashboardLayout from './components/DashboardLayout.jsx'
import MainDashboard from './components/MainDashboard.jsx'
import SalesDepartmentHeadLayout from './components/SalesDepartmentHead/SalesDepartmentHeadLayout.jsx'
import SalesDepartmentHeadDashboard from './components/SalesDepartmentHead/SalesDepartmentHeadDashboard.jsx'
import SalespersonLayout from './components/salesperson/salespersonlayout.jsx'

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeView, setActiveView] = useState('dashboard')
  const [userType, setUserType] = useState('superadmin') // 'superadmin' | 'salesdepartmenthead' | 'salesperson'

  // Check URL parameters on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlUserType = urlParams.get('userType');
    const urlLogin = urlParams.get('login');
    
    if (urlUserType === 'salesdepartmenthead' && urlLogin === 'true') {
      setUserType('salesdepartmenthead');
      setActiveView('sales-dashboard');
      setIsLoggedIn(true);
      // Clean up URL parameters
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (urlUserType === 'salesperson' && urlLogin === 'true') {
      setUserType('salesperson');
      setActiveView('salesperson-dashboard');
      setIsLoggedIn(true);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const handleLogin = async (username, password) => {
    setIsLoading(true)
    
    // Simulate login process
    setTimeout(() => {
      console.log('Login attempt:', { username, password })
      setIsLoading(false)
      setIsLoggedIn(true) // Set logged in state
    }, 2000)
  }

  const handleSalesDepartmentHeadLogin = () => {
    setUserType('salesdepartmenthead')
    setActiveView('sales-dashboard')
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserType('superadmin')
    setActiveView('dashboard') // Reset to dashboard on logout
  }

  return (
    <div className="App">
      {isLoggedIn ? (
        userType === 'salesdepartmenthead' ? (
          <SalesDepartmentHeadLayout onLogout={handleLogout} activeView={activeView} setActiveView={setActiveView}>
            <SalesDepartmentHeadDashboard activeView={activeView} setActiveView={setActiveView} />
          </SalesDepartmentHeadLayout>
        ) : userType === 'salesperson' ? (
          <SalespersonLayout onLogout={handleLogout} />
        ) : (
          <DashboardLayout onLogout={handleLogout} activeView={activeView} setActiveView={setActiveView}>
            <MainDashboard activeView={activeView} setActiveView={setActiveView} onSalesDepartmentHeadLogin={handleSalesDepartmentHeadLogin} />
          </DashboardLayout>
        )
      ) : (
        <LoginPage onLogin={handleLogin} isLoading={isLoading} />
      )}
    </div>
  )
}

export default App
