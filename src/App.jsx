import React, { useState, useEffect } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import LoginPage from './pages/Auth/LoginPage.jsx'
import DashboardLayout from './pages/DashboardLayout.jsx'
import MainDashboard from './pages/MainDashboard.jsx'
import SalesDepartmentHeadLayout from './pages/SalesDepartmentHead/SalesDepartmentHeadLayout.jsx'
import SalesDepartmentHeadDashboard from './pages/SalesDepartmentHead/SalesDepartmentHeadDashboard.jsx'
import SalespersonLayout from './pages/salesperson/salespersonlayout.jsx'
import MarketingSalespersonLayout from './components/MarketingSalesperson/MarketingSalespersonLayout.jsx'
import TeleSalesLayout from './components/TeleSales/TeleSalesLayout.jsx'
import OfficeSalesPersonLayout from './components/OfficeSalesPerson/OfficeSalesPersonLayout.jsx'
import { getUserTypeForRole } from './constants/auth'

function AppContent() {
  const { isAuthenticated, user, logout } = useAuth()
  const [activeView, setActiveView] = useState('dashboard')
  const userType = user ? getUserTypeForRole(user.role) : 'superadmin'

  const handleLogout = async () => {
    await logout()
    setActiveView('dashboard')
  }

  return (
    <div className="App">
      {isAuthenticated ? (
        userType === 'salesdepartmenthead' ? (
          <SalesDepartmentHeadLayout onLogout={handleLogout} activeView={activeView} setActiveView={setActiveView}>
            <SalesDepartmentHeadDashboard activeView={activeView} setActiveView={setActiveView} />
          </SalesDepartmentHeadLayout>
        ) : userType === 'salesperson' ? (
          <SalespersonLayout onLogout={handleLogout} />
        ) : userType === 'marketing-salesperson' ? (
          <MarketingSalespersonLayout />
        ) : userType === 'tele-sales' ? (
          <TeleSalesLayout />
        ) : userType === 'office-sales-person' ? (
          <OfficeSalesPersonLayout />
        ) : (
          <DashboardLayout onLogout={handleLogout} activeView={activeView} setActiveView={setActiveView}>
            <MainDashboard activeView={activeView} setActiveView={setActiveView} />
          </DashboardLayout>
        )
      ) : (
        <LoginPage />
      )}
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
