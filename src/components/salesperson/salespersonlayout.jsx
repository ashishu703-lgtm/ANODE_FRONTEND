import React, { useState } from 'react'
import Sidebar from './salespersonsidebar.jsx'
import DashboardContent from './salespersondashboard.jsx'
import CustomerListContent from './salespersoncustomerlist.jsx'
import Quotation from './salespersonquotation.jsx'

export default function SalespersonLayout({ onLogout }) {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} onLogout={onLogout} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className={sidebarOpen ? "flex-1 ml-64 transition-all duration-300" : "flex-1 ml-16 transition-all duration-300"}>
        {currentPage === 'dashboard' && <DashboardContent />}
        {currentPage === 'customers' && <CustomerListContent />}
      </div>
    </div>
  )
}


