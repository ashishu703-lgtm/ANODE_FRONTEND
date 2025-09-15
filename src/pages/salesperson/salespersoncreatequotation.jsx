"use client"

import { useState } from "react"
import { X, FileText, Calendar, User, Package, DollarSign, Plus, Minus } from "lucide-react"

function Card({ className, children }) {
  return <div className={`rounded-lg border bg-white shadow-sm ${className || ''}`}>{children}</div>
}

function CardContent({ className, children }) {
  return <div className={`p-0 ${className || ''}`}>{children}</div>
}

function CardHeader({ className, children }) {
  return <div className={`p-6 ${className || ''}`}>{children}</div>
}

function CardTitle({ className, children }) {
  return <h3 className={`text-lg font-semibold ${className || ''}`}>{children}</h3>
}

function Button({ children, onClick, type = "button", variant = "default", size = "default", className = "" }) {
  const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
  
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500",
    ghost: "text-gray-700 hover:bg-gray-100 focus:ring-blue-500"
  }
  
  const sizes = {
    default: "h-10 py-2 px-4",
    sm: "h-8 py-1 px-3 text-xs",
    icon: "h-10 w-10"
  }
  
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  )
}

export default function CreateQuotationForm({ customer, onClose, onSave }) {
  const [quotationData, setQuotationData] = useState({
    quotationDetail: "",
    quotationNumber: `ANQ${Date.now().toString().slice(-6)}`,
    quotationDate: new Date().toISOString().split('T')[0],
    validUpto: "",
    items: [
      {
        id: 1,
        description: "",
        quantity: 1,
        unit: "Nos",
        rate: 0,
        amount: 0
      }
    ],
    subtotal: 0,
    taxRate: 18,
    taxAmount: 0,
    total: 0,
    terms: "1. Payment terms: 30 days from invoice date\n2. Delivery: 15-20 working days\n3. Prices are subject to change without notice\n4. All disputes subject to Jabalpur jurisdiction",
    // Editable bill-to information
    billTo: {
      business: customer?.business || "",
      address: customer?.address || "",
      phone: customer?.phone || "",
      gstNo: customer?.gstNo || "",
      state: customer?.state || ""
    }
  })

  const handleInputChange = (field, value) => {
    setQuotationData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...quotationData.items]
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value
    }
    
    // Calculate amount for this item
    if (field === 'quantity' || field === 'rate') {
      updatedItems[index].amount = updatedItems[index].quantity * updatedItems[index].rate
    }
    
    // Calculate totals
    const subtotal = updatedItems.reduce((sum, item) => sum + item.amount, 0)
    const taxAmount = (subtotal * quotationData.taxRate) / 100
    const total = subtotal + taxAmount
    
    setQuotationData(prev => ({
      ...prev,
      items: updatedItems,
      subtotal,
      taxAmount,
      total
    }))
  }

  const addItem = () => {
    setQuotationData(prev => ({
      ...prev,
      items: [...prev.items, {
        id: prev.items.length + 1,
        description: "",
        quantity: 1,
        unit: "Nos",
        rate: 0,
        amount: 0
      }]
    }))
  }

  const removeItem = (index) => {
    if (quotationData.items.length > 1) {
      const updatedItems = quotationData.items.filter((_, i) => i !== index)
      const subtotal = updatedItems.reduce((sum, item) => sum + item.amount, 0)
      const taxAmount = (subtotal * quotationData.taxRate) / 100
      const total = subtotal + taxAmount
      
      setQuotationData(prev => ({
        ...prev,
        items: updatedItems,
        subtotal,
        taxAmount,
        total
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({
      ...quotationData,
      customer: customer,
      createdAt: new Date().toISOString()
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl font-semibold">Create Quotation</CardTitle>
              <p className="text-sm text-gray-600">For {customer?.name}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Quotation Header */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-green-500" />
                  Quotation Detail *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Final Quotation, Revised Quotation"
                  value={quotationData.quotationDetail}
                  onChange={(e) => handleInputChange("quotationDetail", e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-purple-500" />
                  Quotation Number
                </label>
                <input
                  type="text"
                  value={quotationData.quotationNumber}
                  disabled
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg bg-gray-100 text-sm text-gray-600 cursor-not-allowed"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-blue-500" />
                  Quotation Date (Today)
                </label>
                <input
                  type="date"
                  value={quotationData.quotationDate}
                  disabled
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg bg-gray-100 text-sm text-gray-600 cursor-not-allowed"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-green-500" />
                  Valid Upto *
                </label>
                <input
                  type="date"
                  required
                  value={quotationData.validUpto}
                  onChange={(e) => handleInputChange("validUpto", e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Bill To Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                <User className="h-5 w-5 text-blue-500" />
                Bill To Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Business Name *</label>
                  <input
                    type="text"
                    required
                    value={quotationData.billTo.business}
                    onChange={(e) => setQuotationData(prev => ({
                      ...prev,
                      billTo: { ...prev.billTo, business: e.target.value }
                    }))}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Phone *</label>
                  <input
                    type="text"
                    required
                    value={quotationData.billTo.phone}
                    onChange={(e) => setQuotationData(prev => ({
                      ...prev,
                      billTo: { ...prev.billTo, phone: e.target.value }
                    }))}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Address *</label>
                  <input
                    type="text"
                    required
                    value={quotationData.billTo.address}
                    onChange={(e) => setQuotationData(prev => ({
                      ...prev,
                      billTo: { ...prev.billTo, address: e.target.value }
                    }))}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">GST Number *</label>
                  <input
                    type="text"
                    required
                    value={quotationData.billTo.gstNo}
                    onChange={(e) => setQuotationData(prev => ({
                      ...prev,
                      billTo: { ...prev.billTo, gstNo: e.target.value }
                    }))}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">State *</label>
                  <input
                    type="text"
                    required
                    value={quotationData.billTo.state}
                    onChange={(e) => setQuotationData(prev => ({
                      ...prev,
                      billTo: { ...prev.billTo, state: e.target.value }
                    }))}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Items Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                  <Package className="h-5 w-5 text-orange-500" />
                  Items
                </h3>
                <Button type="button" onClick={addItem} size="sm" className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Item
                </Button>
              </div>

              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Qty</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unit</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rate</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {quotationData.items.map((item, index) => (
                      <tr key={item.id}>
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            placeholder="Item description"
                            value={item.description}
                            onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => handleItemChange(index, 'quantity', parseFloat(e.target.value) || 0)}
                            className="w-20 px-2 py-1 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <select
                            value={item.unit}
                            onChange={(e) => handleItemChange(index, 'unit', e.target.value)}
                            className="w-20 px-2 py-1 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                          >
                            <option value="Nos">Nos</option>
                            <option value="Mtr">Mtr</option>
                            <option value="Kg">Kg</option>
                            <option value="Set">Set</option>
                          </select>
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={item.rate}
                            onChange={(e) => handleItemChange(index, 'rate', parseFloat(e.target.value) || 0)}
                            className="w-24 px-2 py-1 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                          />
                        </td>
                        <td className="px-4 py-3 text-sm font-medium">
                          ₹{item.amount.toFixed(2)}
                        </td>
                        <td className="px-4 py-3">
                          {quotationData.items.length > 1 && (
                            <Button
                              type="button"
                              onClick={() => removeItem(index)}
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals */}
              <div className="flex justify-end">
                <div className="w-80 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>₹{quotationData.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>GST ({quotationData.taxRate}%):</span>
                    <span>₹{quotationData.taxAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold border-t pt-2">
                    <span>Total:</span>
                    <span>₹{quotationData.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Terms & Conditions
              </label>
              <textarea
                value={quotationData.terms}
                onChange={(e) => handleInputChange("terms", e.target.value)}
                rows={4}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                placeholder="Enter terms and conditions"
              />
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-3 pt-6 border-t">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">
                Create Quotation
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
