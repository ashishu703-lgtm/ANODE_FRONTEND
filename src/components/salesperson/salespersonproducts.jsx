"use client"

import React, { useState } from 'react';
import { Package, Edit, Trash2, Eye } from 'lucide-react';
import Toolbar from './Toolbar';

const sampleProducts = [
  {
    id: 1,
    code: 'CBL-001',
    name: 'Copper Cable 1.5mm',
    category: 'Cable',
    stock: 1250,
    unit: 'Meter',
    price: 125.50,
    status: 'in-stock',
    lastUpdated: '2025-09-10',
  },
  {
    id: 2,
    code: 'CND-002',
    name: 'Aluminum Conductor 4mm',
    category: 'Conductor',
    stock: 850,
    unit: 'Meter',
    price: 95.75,
    status: 'in-stock',
    lastUpdated: '2025-09-11',
  },
  {
    id: 3,
    code: 'WIR-003',
    name: 'Copper Wire 2.5mm',
    category: 'Wire',
    stock: 2000,
    unit: 'Meter',
    price: 85.25,
    status: 'in-stock',
    lastUpdated: '2025-09-12',
  },
  {
    id: 4,
    code: 'ACC-004',
    name: 'Cable Glands',
    category: 'Accessories',
    stock: 500,
    unit: 'Pieces',
    price: 25.00,
    status: 'low-stock',
    lastUpdated: '2025-09-10',
  },
  {
    id: 5,
    code: 'CBL-005',
    name: 'Armored Cable 4mm',
    category: 'Cable',
    stock: 0,
    unit: 'Meter',
    price: 210.00,
    status: 'out-of-stock',
    lastUpdated: '2025-09-11',
  },
];

export default function ProductsPage() {
  const [products, setProducts] = useState(sampleProducts);
  const [filteredProducts, setFilteredProducts] = useState(sampleProducts);

  const handleSearch = (query) => {
    if (!query.trim()) {
      setFilteredProducts(products);
      return;
    }
    
    const lowercasedQuery = query.toLowerCase();
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(lowercasedQuery) ||
        product.code.toLowerCase().includes(lowercasedQuery) ||
        product.category.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredProducts(filtered);
  };

  const handleFilterChange = (filters) => {
    let filtered = [...products];
    
    if (filters.category) {
      filtered = filtered.filter(product => product.category.toLowerCase() === filters.category);
    }
    
    if (filters.status) {
      filtered = filtered.filter(product => product.status === filters.status);
    }
    
    setFilteredProducts(filtered);
  };

  const handleAddProduct = () => {
    alert('Add new product functionality will be implemented here');
  };

  const handleExport = () => {
    alert('Export functionality will be implemented here');
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      'in-stock': 'bg-green-100 text-green-800',
      'low-stock': 'bg-yellow-100 text-yellow-800',
      'out-of-stock': 'bg-red-100 text-red-800',
    };

    const statusText = {
      'in-stock': 'In Stock',
      'low-stock': 'Low Stock',
      'out-of-stock': 'Out of Stock',
    };

    return (
      <span
        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClasses[status]}`}
      >
        {statusText[status]}
      </span>
    );
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
          <Package className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Products</h1>
          <p className="text-sm text-gray-600">Manage your product catalog</p>
        </div>
      </div>

      <Toolbar
        onSearch={handleSearch}
        onAddProduct={handleAddProduct}
        onExport={handleExport}
        onFilterChange={handleFilterChange}
      />

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product Code
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {product.code}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.stock.toLocaleString()} {product.unit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ₹{product.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {getStatusBadge(product.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-indigo-600 hover:text-indigo-900">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                    No products found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
