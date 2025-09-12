"use client"

import React, { useState } from "react"
import { Search, Package, Filter, Download, Plus } from "lucide-react"

export default function StockManagement() {
  // Sample stock data
  const [stockItems, setStockItems] = useState([
    {
      id: 1,
      itemCode: "CBL-001",
      name: "Copper Cable 1.5mm",
      category: "Cable",
      quantity: 1250,
      unit: "Meter",
      rate: 125.50,
      location: "Warehouse A",
      lastUpdated: "2025-09-10"
    },
    {
      id: 2,
      itemCode: "CND-002",
      name: "Aluminum Conductor 4mm",
      category: "Conductor",
      quantity: 850,
      unit: "Meter",
      rate: 95.75,
      location: "Warehouse B",
      lastUpdated: "2025-09-11"
    },
    {
      id: 3,
      itemCode: "WIR-003",
      name: "Copper Wire 2.5mm",
      category: "Wire",
      quantity: 2000,
      unit: "Meter",
      rate: 85.25,
      location: "Warehouse A",
      lastUpdated: "2025-09-12"
    },
    {
      id: 4,
      itemCode: "ACC-004",
      name: "Cable Glands",
      category: "Accessories",
      quantity: 500,
      unit: "Pieces",
      rate: 25.00,
      location: "Warehouse C",
      lastUpdated: "2025-09-10"
    },
    {
      id: 5,
      itemCode: "CBL-005",
      name: "Armored Cable 4mm",
      category: "Cable",
      quantity: 750,
      unit: "Meter",
      rate: 210.00,
      location: "Warehouse B",
      lastUpdated: "2025-09-11"
    }
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    category: "",
    location: ""
  })

  // Filter stock items based on search and filters
  const filteredItems = stockItems.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.itemCode.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = filters.category ? item.category === filters.category : true
    const matchesLocation = filters.location ? item.location === filters.location : true
    
    return matchesSearch && matchesCategory && matchesLocation
  })

  // Get unique categories and locations for filter dropdowns
  const categories = [...new Set(stockItems.map(item => item.category))]
  const locations = [...new Set(stockItems.map(item => item.location))]

  return (
    <main className="flex-1 overflow-auto p-6">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
            <Package className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Available Stock</h1>
            <p className="text-sm text-gray-600">View and manage inventory items</p>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search items by name or code..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 w-full md:w-auto">
            <select
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              value={filters.category}
              onChange={(e) => setFilters({...filters, category: e.target.value})}
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <select
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              value={filters.location}
              onChange={(e) => setFilters({...filters, location: e.target.value})}
            >
              <option value="">All Locations</option>
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Stock Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Code</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate (₹)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredItems.length > 0 ? (
                  filteredItems.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.itemCode}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantity.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.unit}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{item.rate.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.location}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.lastUpdated}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="px-6 py-4 text-center text-sm text-gray-500">
                      No items found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Table Footer */}
          <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-t border-gray-200">
            <div className="text-sm text-gray-500">
              Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredItems.length}</span> of <span className="font-medium">{filteredItems.length}</span> results
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700">
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end space-x-3">
          <button 
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 flex items-center gap-2"
            onClick={() => {
              // Export functionality would go here
              alert('Export functionality will be implemented here');
            }}
          >
            <Download className="h-4 w-4" />
            Export
          </button>
          <button 
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 flex items-center gap-2"
            onClick={() => {
              // Add new item functionality would go here
              alert('Add new item functionality will be implemented here');
            }}
          >
            <Plus className="h-4 w-4" />
            Add New Item
          </button>
        </div>
      </div>
    </main>
  )
}
