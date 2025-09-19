"use client"

import React from "react"
import apiClient from '../../utils/apiClient'
import { API_ENDPOINTS } from '../../api/admin_api/api'
import { Search, RefreshCw, User, Mail, Building2, Pencil, Eye, Plus, Download, Filter, Wallet, MessageCircle, Package, MapPin, Map, BadgeCheck, XCircle, FileText, Globe, X, Clock, Check, Clock as ClockIcon, ArrowRightLeft, Upload } from "lucide-react"
import html2pdf from 'html2pdf.js'
import Quotation from './salespersonquotation.jsx'
import AddCustomerForm from './salespersonaddcustomer.jsx'
import CreateQuotationForm from './salespersoncreatequotation.jsx'

function cx(...classes) {
  return classes.filter(Boolean).join(" ")
}

function Card({ className, children }) {
  return <div className={cx("rounded-lg border bg-white", className)}>{children}</div>
}

function CardContent({ className, children }) {
  return <div className={cx("p-0", className)}>{children}</div>
}

export default function CustomerListContent() {
  const [viewingCustomer, setViewingCustomer] = React.useState(null)
  const [modalTab, setModalTab] = React.useState('details')
  const [showAddCustomer, setShowAddCustomer] = React.useState(false)
  const [showCreateQuotation, setShowCreateQuotation] = React.useState(false)
  const [selectedCustomerForQuotation, setSelectedCustomerForQuotation] = React.useState(null)
  const [quotationData, setQuotationData] = React.useState(null)
  const [lastQuotationData, setLastQuotationData] = React.useState(null)
  const [isRefreshing, setIsRefreshing] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState('')
  const [editingCustomer, setEditingCustomer] = React.useState(null)
  const [showFilters, setShowFilters] = React.useState(false)
  // Payment related state
  const [showPaymentDetails, setShowPaymentDetails] = React.useState(false)
  const [selectedCustomer, setSelectedCustomer] = React.useState(null)
  const [paymentHistory, setPaymentHistory] = React.useState([])
  const [totalAmount, setTotalAmount] = React.useState(0)
  const [showImportModal, setShowImportModal] = React.useState(false)
  const [importFile, setImportFile] = React.useState(null)
  
  // Quotations data - empty array ready for real data
  const [quotations, setQuotations] = React.useState([])
  const [showPdfViewer, setShowPdfViewer] = React.useState(false)
  const [currentPdfUrl, setCurrentPdfUrl] = React.useState('')
  // Available options for dropdowns
  const productTypes = ['Conductor', 'Cable', 'AAAC', 'Aluminium', 'Copper', 'PVC', 'Wire'];
  const customerTypes = ['Business', 'Corporate', 'Individual', 'Reseller', 'Government'];
  const leadSources = ['Phone', 'Marketing', 'FB Ads', 'Google Ads', 'Referral', 'Webinar', 'Website', 'Email', 'Other'];
  const states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands',
    'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi',
    'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
  ];

  const [filters, setFilters] = React.useState({
    customer: '',
    business: '',
    gstNo: '',
    address: '',
    state: '',
    productType: '',
    customerType: '',
    enquiryBy: '',
    date: '',
    connectedStatus: '',
    finalStatus: ''
  });

  // Pagination state
  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(10);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      customer: '',
      business: '',
      gstNo: '',
      address: '',
      state: '',
      productType: '',
      customerType: '',
      enquiryBy: '',
      date: '',
      connectedStatus: '',
      finalStatus: ''
    });
  };
  const [customers, setCustomers] = React.useState([])

  // Load assigned leads for the logged-in salesperson/telecaller
  React.useEffect(() => {
    const fetchAssigned = async () => {
      try {
        const res = await apiClient.get(API_ENDPOINTS.SALESPERSON_ASSIGNED_LEADS_ME());
        const rows = res?.data || [];
        // Map API rows into existing UI customer shape
        const mapped = rows.map((r) => ({
          id: r.id,
          name: r.name,
          phone: r.phone,
          email: r.email || 'N/A',
          business: r.business || 'N/A',
          address: r.address || 'N/A',
          gstNo: r.gst_no || 'N/A',
          productType: r.product_type || 'N/A',
          state: r.state || 'N/A',
          enquiryBy: r.lead_source || 'N/A',
          customerType: r.customer_type || 'N/A',
          date: r.date ? new Date(r.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
          connected: { status: r.connected_status || 'Not Connected', remark: 'Imported from DH', datetime: new Date(r.updated_at || r.created_at || Date.now()).toLocaleString() },
          finalStatus: r.final_status || 'New',
          finalInfo: { status: r.final_status === 'closed' ? 'closed' : 'next_meeting', datetime: '', remark: r.final_status || 'New' },
          latestQuotationUrl: '#',
          quotationsSent: 0,
          followUpLink: 'https://calendar.google.com/',
          whatsapp: r.whatsapp ? `+91${String(r.whatsapp).replace(/\D/g, '').slice(-10)}` : null,
          transferredLeads: 0,
        }));
        setCustomers(mapped);
      } catch (err) {
        console.error('Failed to load assigned leads:', err);
      }
    };
    fetchAssigned();
  }, []);

  const handleEdit = (customer) => {
    setEditingCustomer(customer)
    setShowAddCustomer(true)
  }

  const handleView = (customer) => {
    setViewingCustomer(customer)
    setModalTab('details')
  }

  const handleQuotation = (customer) => {
    setSelectedCustomerForQuotation(customer)
    setShowCreateQuotation(true)
  }

  const handleCreateQuotation = () => {
    if (viewingCustomer) {
      setSelectedCustomerForQuotation(viewingCustomer)
      setShowCreateQuotation(true)
    }
  }

  const handleSaveQuotation = (newQuotationData) => {
    setQuotationData(newQuotationData)
    setLastQuotationData(newQuotationData) // Store the last created quotation
    
    // Update customer's quotation count and latest quotation flag
    setCustomers(prevCustomers => 
      prevCustomers.map(customer => 
        customer.id === selectedCustomerForQuotation.id 
          ? { 
              ...customer, 
              quotationsSent: (customer.quotationsSent || 0) + 1,
              latestQuotationUrl: "latest" // Mark that this customer has a latest quotation
            }
          : customer
      )
    )
    
    setShowCreateQuotation(false)
    setSelectedCustomerForQuotation(null)
  }


  const handleViewLatestQuotation = async (customer) => {
    try {
      if (lastQuotationData && lastQuotationData.customer?.id === customer.id) {
        // Generate PDF and show in modal
        const pdfBlob = await generateQuotationPDF(lastQuotationData, customer, true)
        const pdfUrl = URL.createObjectURL(pdfBlob)
        setCurrentPdfUrl(pdfUrl)
        setShowPdfViewer(true)
      }
    } catch (error) {
      console.error('Error viewing quotation:', error)
      // You might want to show an error message to the user here
      alert('Failed to generate PDF. Please try again.')
    }
  }

  const handleWalletClick = async (customer) => {
    // Empty payment history - ready for real data
    const sampleHistory = []
    
    // Default total amount
    const customerTotal = 0.00
    
    setPaymentHistory(sampleHistory)
    setTotalAmount(customerTotal)
    setSelectedCustomer({
      id: customer.id,
      name: customer.name,
      phone: customer.phone,
      email: customer.email
    })
    setShowPaymentDetails(true)
  }

  const handleDownloadReceipt = () => {
    // In a real app, this would generate a PDF receipt
    // For now, we'll create a simple download link
    const receiptText = `
      PAYMENT RECEIPT
      ----------------------------
      Receipt No: ${selectedPayment.receiptNo}
      Date: ${selectedPayment.date}
      Customer: ${selectedPayment.customerName}
      Amount: ${selectedPayment.amount}
      Payment Method: ${selectedPayment.paymentMethod}
      Status: ${selectedPayment.status}
      
      Thank you for your payment!
      ANODE ELECTRIC PVT. LTD.
    `
    
    const element = document.createElement('a')
    const file = new Blob([receiptText], {type: 'text/plain'})
    element.href = URL.createObjectURL(file)
    element.download = `payment-receipt-${selectedPayment.receiptNo}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const handleDownloadTemplate = () => {
    // Create CSV template with headers
    const headers = [
      'Name', 'Phone', 'Email', 'Business', 'Address', 'GST No', 
      'Product Type', 'State', 'Lead Source', 'Customer Type', 'Date', 
      'Connected Status', 'Final Status', 'WhatsApp'
    ]
    
    // Create sample data row with empty values
    const sampleData = [
      '', '', '', '', 
      '', '', '', '', 
      '', '', '', '', '', ''
    ]
    
    const csvContent = [headers, sampleData].map(row => 
      row.map(field => `"${field}"`).join(',')
    ).join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', 'leads_template.csv')
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleImportLeads = () => {
    setShowImportModal(true)
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file && file.type === 'text/csv') {
      setImportFile(file)
    } else {
      alert('Please select a valid CSV file')
    }
  }

  const processCSVImport = () => {
    if (!importFile) {
      alert('Please select a CSV file first')
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const csv = e.target.result
        const lines = csv.split('\n').filter(line => line.trim()) // Remove empty lines
        const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim())
        
        // Expected headers for validation
        const expectedHeaders = [
          'Name', 'Phone', 'Email', 'Business', 'Address', 'GST No', 
          'Product Type', 'State', 'Lead Source', 'Customer Type', 'Date', 
          'Connected Status', 'Final Status', 'WhatsApp'
        ]
        
        // Validate headers
        const headerValidation = validateHeaders(headers, expectedHeaders)
        if (!headerValidation.isValid) {
          alert(`CSV header validation failed:\n${headerValidation.errors.join('\n')}\n\nPlease use the correct template format.`)
          return
        }
        
        const importedCustomers = []
        const errors = []
        
        for (let i = 1; i < lines.length; i++) {
          if (lines[i].trim()) {
            const values = parseCSVLine(lines[i])
            
            if (values.length >= headers.length) {
              // Validate and clean data
              const validatedData = validateCustomerData(values, headers, i + 1)
              
              if (validatedData.isValid) {
                const newCustomer = {
                  id: customers.length + importedCustomers.length + 1,
                  name: validatedData.data.name,
                  phone: validatedData.data.phone,
                  email: validatedData.data.email,
                  business: validatedData.data.business,
                  address: validatedData.data.address,
                  gstNo: validatedData.data.gstNo,
                  productType: validatedData.data.productType,
                  state: validatedData.data.state,
                  enquiryBy: validatedData.data.enquiryBy,
                  customerType: validatedData.data.customerType,
                  date: validatedData.data.date,
                  connected: { 
                    status: validatedData.data.connectedStatus, 
                    remark: 'Imported from CSV', 
                    datetime: new Date().toLocaleString() 
                  },
                  finalStatus: validatedData.data.finalStatus,
                  finalInfo: { 
                    status: 'next_meeting', 
                    datetime: '', 
                    remark: validatedData.data.finalStatus 
                  },
                  latestQuotationUrl: "#",
                  quotationsSent: 0,
                  followUpLink: "https://calendar.google.com/",
                  whatsapp: validatedData.data.whatsapp ? `+91${validatedData.data.whatsapp}` : null,
                  transferredLeads: 0,
                }
                importedCustomers.push(newCustomer)
              } else {
                errors.push(`Row ${i + 1}: ${validatedData.errors.join(', ')}`)
              }
            } else {
              errors.push(`Row ${i + 1}: Insufficient data columns`)
            }
          }
        }
        
        if (importedCustomers.length > 0) {
          setCustomers(prev => [...prev, ...importedCustomers])
          const successMessage = errors.length > 0 
            ? `Successfully imported ${importedCustomers.length} leads. ${errors.length} rows had errors and were skipped.`
            : `Successfully imported ${importedCustomers.length} leads`
          alert(successMessage)
          setShowImportModal(false)
          setImportFile(null)
        } else {
          alert('No valid data found in CSV file. Please check the format and try again.')
        }
      } catch (error) {
        console.error('Error processing CSV:', error)
        alert('Error processing CSV file. Please check the format.')
      }
    }
    reader.readAsText(importFile)
  }

  // Helper function to parse CSV line properly (handles commas in quoted fields)
  const parseCSVLine = (line) => {
    const result = []
    let current = ''
    let inQuotes = false
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i]
      
      if (char === '"') {
        inQuotes = !inQuotes
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim())
        current = ''
      } else {
        current += char
      }
    }
    
    result.push(current.trim())
    return result.map(v => v.replace(/"/g, '').trim())
  }

  // Helper function to validate headers
  const validateHeaders = (actualHeaders, expectedHeaders) => {
    const errors = []
    
    if (actualHeaders.length !== expectedHeaders.length) {
      errors.push(`Expected ${expectedHeaders.length} columns, found ${actualHeaders.length}`)
    }
    
    expectedHeaders.forEach((expected, index) => {
      if (actualHeaders[index] !== expected) {
        errors.push(`Column ${index + 1}: Expected "${expected}", found "${actualHeaders[index] || 'empty'}"`)
      }
    })
    
    return {
      isValid: errors.length === 0,
      errors
    }
  }

  // Helper function to validate customer data
  const validateCustomerData = (values, headers, rowNumber) => {
    const errors = []
    const data = {}
    
    // Map values to field names
    headers.forEach((header, index) => {
      const value = values[index] || ''
      
      switch (header) {
        case 'Name':
          if (!value || value.length < 2) {
            errors.push('Name is required and must be at least 2 characters')
          }
          data.name = value
          break
          
        case 'Phone':
          const phoneRegex = /^[6-9]\d{9}$/
          if (!value || !phoneRegex.test(value)) {
            errors.push('Phone must be a valid 10-digit Indian mobile number')
          }
          data.phone = value
          break
          
        case 'Email':
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          if (value && !emailRegex.test(value)) {
            errors.push('Email must be a valid email address')
          }
          data.email = value || 'N/A'
          break
          
        case 'Business':
          data.business = value || 'N/A'
          break
          
        case 'Address':
          data.address = value || 'N/A'
          break
          
        case 'GST No':
          const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/
          if (value && !gstRegex.test(value)) {
            errors.push('GST No must be a valid GST number format')
          }
          data.gstNo = value || 'N/A'
          break
          
        case 'Product Type':
          if (value && !productTypes.includes(value)) {
            errors.push(`Product Type must be one of: ${productTypes.join(', ')}`)
          }
          data.productType = value || 'N/A'
          break
          
        case 'State':
          if (value && !states.includes(value)) {
            errors.push(`State must be one of: ${states.join(', ')}`)
          }
          data.state = value || 'N/A'
          break
          
        case 'Lead Source':
          if (value && !leadSources.includes(value)) {
            errors.push(`Lead Source must be one of: ${leadSources.join(', ')}`)
          }
          data.enquiryBy = value || 'N/A'
          break
          
        case 'Customer Type':
          if (value && !customerTypes.includes(value)) {
            errors.push(`Customer Type must be one of: ${customerTypes.join(', ')}`)
          }
          data.customerType = value || 'N/A'
          break
          
        case 'Date':
          const dateRegex = /^\d{4}-\d{2}-\d{2}$/
          if (value && !dateRegex.test(value)) {
            errors.push('Date must be in YYYY-MM-DD format')
          }
          data.date = value || new Date().toISOString().split('T')[0]
          break
          
        case 'Connected Status':
          const validConnectedStatuses = ['Connected', 'Not Connected', 'Follow Up', 'Not Interested']
          if (value && !validConnectedStatuses.includes(value)) {
            errors.push(`Connected Status must be one of: ${validConnectedStatuses.join(', ')}`)
          }
          data.connectedStatus = value || 'Not Connected'
          break
          
        case 'Final Status':
          const validFinalStatuses = ['Hot', 'Warm', 'Cold', 'Lost', 'Won', 'New']
          if (value && !validFinalStatuses.includes(value)) {
            errors.push(`Final Status must be one of: ${validFinalStatuses.join(', ')}`)
          }
          data.finalStatus = value || 'New'
          break
          
        case 'WhatsApp':
          const whatsappRegex = /^[6-9]\d{9}$/
          if (value && !whatsappRegex.test(value)) {
            errors.push('WhatsApp must be a valid 10-digit Indian mobile number')
          }
          data.whatsapp = value
          break
          
        default:
          data[header.toLowerCase().replace(/\s+/g, '')] = value
      }
    })
    
    return {
      isValid: errors.length === 0,
      data,
      errors
    }
  }

  const handleExportLeads = async () => {
    try {
      // Create a temporary div for PDF generation
      const tempDiv = document.createElement('div')
      tempDiv.style.padding = '20px'
      tempDiv.style.fontFamily = 'Arial, sans-serif'
      tempDiv.style.fontSize = '12px'
      tempDiv.style.color = '#000'
      tempDiv.style.backgroundColor = '#fff'
      
      // Add title
      tempDiv.innerHTML = `
        <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 15px;">
          <h1 style="margin: 0; font-size: 24px; color: #1f2937;">ANOCAB LEADS REPORT</h1>
          <p style="margin: 5px 0 0 0; color: #6b7280;">Generated on: ${new Date().toLocaleDateString()}</p>
        </div>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <thead>
            <tr style="background-color: #f3f4f6;">
              <th style="border: 1px solid #d1d5db; padding: 8px; text-align: left; font-weight: bold;">#</th>
              <th style="border: 1px solid #d1d5db; padding: 8px; text-align: left; font-weight: bold;">Name & Phone</th>
              <th style="border: 1px solid #d1d5db; padding: 8px; text-align: left; font-weight: bold;">Address</th>
              <th style="border: 1px solid #d1d5db; padding: 8px; text-align: left; font-weight: bold;">GST No.</th>
              <th style="border: 1px solid #d1d5db; padding: 8px; text-align: left; font-weight: bold;">Product Type</th>
              <th style="border: 1px solid #d1d5db; padding: 8px; text-align: left; font-weight: bold;">State</th>
              <th style="border: 1px solid #d1d5db; padding: 8px; text-align: left; font-weight: bold;">Lead Source</th>
              <th style="border: 1px solid #d1d5db; padding: 8px; text-align: left; font-weight: bold;">Customer Type</th>
              <th style="border: 1px solid #d1d5db; padding: 8px; text-align: left; font-weight: bold;">Date</th>
              <th style="border: 1px solid #d1d5db; padding: 8px; text-align: left; font-weight: bold;">Connected Status</th>
              <th style="border: 1px solid #d1d5db; padding: 8px; text-align: left; font-weight: bold;">Final Status</th>
            </tr>
          </thead>
          <tbody>
            ${filteredCustomers.map((customer, index) => `
              <tr>
                <td style="border: 1px solid #d1d5db; padding: 8px;">${customer.id}</td>
                <td style="border: 1px solid #d1d5db; padding: 8px;">
                  <div style="font-weight: bold;">${customer.name}</div>
                  <div style="color: #6b7280; font-size: 11px;">${customer.phone}</div>
                  ${customer.whatsapp ? `<div style="color: #059669; font-size: 11px;">WhatsApp: ${customer.whatsapp}</div>` : ''}
                </td>
                <td style="border: 1px solid #d1d5db; padding: 8px;">${customer.address || 'N/A'}</td>
                <td style="border: 1px solid #d1d5db; padding: 8px;">${customer.gstNo || 'N/A'}</td>
                <td style="border: 1px solid #d1d5db; padding: 8px;">${customer.productType || 'N/A'}</td>
                <td style="border: 1px solid #d1d5db; padding: 8px;">${customer.state || 'N/A'}</td>
                <td style="border: 1px solid #d1d5db; padding: 8px;">${customer.enquiryBy || 'N/A'}</td>
                <td style="border: 1px solid #d1d5db; padding: 8px;">${customer.customerType || 'N/A'}</td>
                <td style="border: 1px solid #d1d5db; padding: 8px;">${customer.date}</td>
                <td style="border: 1px solid #d1d5db; padding: 8px;">
                  <span style="
                    padding: 2px 6px; 
                    border-radius: 4px; 
                    font-size: 10px; 
                    font-weight: bold;
                    ${customer.connected?.status === 'Connected' ? 'background-color: #dcfce7; color: #166534;' : 
                      customer.connected?.status === 'Follow Up' ? 'background-color: #fef3c7; color: #92400e;' : 
                      'background-color: #fee2e2; color: #991b1b;'}
                  ">
                    ${customer.connected?.status || 'Not Connected'}
                  </span>
                </td>
                <td style="border: 1px solid #d1d5db; padding: 8px;">
                  <span style="
                    padding: 2px 6px; 
                    border-radius: 4px; 
                    font-size: 10px; 
                    font-weight: bold;
                    ${customer.finalInfo?.status === 'closed' ? 'background-color: #dcfce7; color: #166534;' : 
                      customer.finalInfo?.status === 'next_meeting' ? 'background-color: #dbeafe; color: #1e40af;' : 
                      'background-color: #f3f4f6; color: #374151;'}
                  ">
                    ${customer.finalInfo?.status === 'closed' ? 'Closed' : 
                      customer.finalInfo?.status === 'next_meeting' ? 'Next Meeting' : 
                      customer.finalStatus || 'New'}
                  </span>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        
        <div style="margin-top: 30px; text-align: center; color: #6b7280; font-size: 11px;">
          <p>Total Records: ${filteredCustomers.length}</p>
          <p>Generated by ANOCAB CRM System</p>
        </div>
      `
      
      // Temporarily add to DOM
      document.body.appendChild(tempDiv)
      
      // PDF generation options
      const opt = {
        margin: 0.5,
        filename: `anocab-leads-report-${new Date().toISOString().split('T')[0]}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 1,
          useCORS: true,
          logging: false
        },
        jsPDF: { 
          unit: 'in', 
          format: 'a4', 
          orientation: 'landscape' 
        }
      }
      
      // Generate and download the PDF
      await html2pdf().set(opt).from(tempDiv).save()
      
      // Clean up
      document.body.removeChild(tempDiv)
      
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Error generating PDF. Please try again.')
    }
  }

  const generateQuotationPDF = async (quotationData, customer, returnBlob = false) => {
    // Create a simple test content first
    const tempDiv = document.createElement('div')
    tempDiv.style.position = 'fixed'
    tempDiv.style.left = '0'
    tempDiv.style.top = '0'
    tempDiv.style.width = '800px'
    tempDiv.style.backgroundColor = 'white'
    tempDiv.style.padding = '20px'
    tempDiv.style.fontFamily = 'Arial, sans-serif'
    tempDiv.style.fontSize = '14px'
    tempDiv.style.color = 'black'
    tempDiv.style.zIndex = '9999'
    tempDiv.style.visibility = 'hidden'
    
    // Simple test content
    tempDiv.innerHTML = `
      <div style="width: 100%; background: white; padding: 20px;">
        <h1 style="color: black; font-size: 24px; margin-bottom: 20px;">ANODE ELECTRIC PVT. LTD.</h1>
        <h2 style="color: black; font-size: 18px; margin-bottom: 15px;">QUOTATION</h2>
        
        <div style="border: 2px solid black; padding: 15px; margin-bottom: 20px;">
          <h3 style="color: black; margin-bottom: 10px;">Company Details</h3>
          <p style="color: black; margin: 5px 0;">MANUFACTURING & SUPPLY OF ELECTRICAL CABLES & WIRES</p>
          <p style="color: black; margin: 5px 0;">KHASRA NO. 805/5, PLOT NO. 10, IT PARK</p>
          <p style="color: black; margin: 5px 0;">BARGI HILLS, JABALPUR - 482003</p>
          <p style="color: black; margin: 5px 0;">MADHYA PRADESH, INDIA</p>
          <p style="color: black; margin: 5px 0;">Tel: 6262002116, 6262002113</p>
          <p style="color: black; margin: 5px 0;">Email: info@anocab.com</p>
        </div>
        
        <div style="border: 1px solid black; padding: 15px; margin-bottom: 20px;">
          <h3 style="color: black; margin-bottom: 10px;">Quotation Details</h3>
          <p style="color: black; margin: 5px 0;"><strong>Date:</strong> ${quotationData?.quotationDate || new Date().toLocaleDateString()}</p>
          <p style="color: black; margin: 5px 0;"><strong>Quotation No:</strong> ${quotationData?.quotationNumber || 'ANO/25-26/001'}</p>
          <p style="color: black; margin: 5px 0;"><strong>Valid Until:</strong> ${quotationData?.validUpto || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
        </div>
        
        <div style="border: 1px solid black; padding: 15px; margin-bottom: 20px;">
          <h3 style="color: black; margin-bottom: 10px;">Bill To:</h3>
          <p style="color: black; margin: 5px 0;"><strong>${quotationData?.billTo?.business || customer?.business || 'Customer Name'}</strong></p>
          <p style="color: black; margin: 5px 0;">${quotationData?.billTo?.address || customer?.address || 'Customer Address'}</p>
          <p style="color: black; margin: 5px 0;"><strong>Phone:</strong> ${quotationData?.billTo?.phone || customer?.phone || 'Phone Number'}</p>
          <p style="color: black; margin: 5px 0;"><strong>GST:</strong> ${quotationData?.billTo?.gstNo || customer?.gstNo || 'GST Number'}</p>
        </div>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <thead>
            <tr style="background-color: #f0f0f0;">
              <th style="border: 1px solid black; padding: 8px; text-align: left;">Sr.</th>
              <th style="border: 1px solid black; padding: 8px; text-align: left;">Description</th>
              <th style="border: 1px solid black; padding: 8px; text-align: center;">Qty</th>
              <th style="border: 1px solid black; padding: 8px; text-align: right;">Rate</th>
              <th style="border: 1px solid black; padding: 8px; text-align: right;">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid black; padding: 8px;">1</td>
              <td style="border: 1px solid black; padding: 8px;">Sample Product</td>
              <td style="border: 1px solid black; padding: 8px; text-align: center;">1</td>
              <td style="border: 1px solid black; padding: 8px; text-align: right;">1000.00</td>
              <td style="border: 1px solid black; padding: 8px; text-align: right;">1000.00</td>
            </tr>
            <tr style="background-color: #f0f0f0;">
              <td style="border: 1px solid black; padding: 8px;" colspan="4"><strong>Total</strong></td>
              <td style="border: 1px solid black; padding: 8px; text-align: right;"><strong>1000.00</strong></td>
            </tr>
          </tbody>
        </table>
        
        <div style="text-align: right; margin-top: 30px;">
          <p style="color: black; margin: 5px 0;">For ANODE ELECTRIC PRIVATE LIMITED</p>
          <p style="color: black; margin: 5px 0;">Authorized Signatory</p>
        </div>
      </div>
    `
    
    // Add the temporary div to the document
    document.body.appendChild(tempDiv)
    
    // Debug: Check if element is visible
    console.log('Element created:', tempDiv)
    console.log('Element innerHTML length:', tempDiv.innerHTML.length)
    console.log('Element offsetHeight:', tempDiv.offsetHeight)

    // Wait a bit for the element to render
    await new Promise(resolve => setTimeout(resolve, 100))

    try {
      // Generate the PDF
      const element = tempDiv
      const opt = {
        margin: 0.5,
        filename: `quotation-${customer.name.replace(/\s+/g, '-').toLowerCase()}-${new Date().toISOString().split('T')[0]}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 1,
          useCORS: true,
          logging: true,
          backgroundColor: '#ffffff'
        },
        jsPDF: { 
          unit: 'in', 
          format: 'a4', 
          orientation: 'portrait'
        }
      }

      if (returnBlob) {
        // Generate and return the PDF as a blob
        const result = await html2pdf().set(opt).from(element).outputPdf('blob')
        return result
      } else {
        // Generate and download the PDF
        await html2pdf().set(opt).from(element).save()
      }
    } catch (error) {
      console.error('Error generating PDF:', error)
      throw error
    } finally {
      // Clean up
      if (document.body.contains(tempDiv)) {
        document.body.removeChild(tempDiv)
      }
    }

    // The PDF generation is now handled in the try-catch block above
    // No additional cleanup needed here as it's handled in the finally block
  }

  const handleAddCustomer = () => {
    setEditingCustomer(null) // Clear editing customer when adding new
    setShowAddCustomer(true)
  }

  const handleSaveCustomer = (newCustomerData) => {
    if (editingCustomer) {
      // Update existing customer
      const updatedCustomer = {
        ...editingCustomer,
        name: newCustomerData.customerName,
        phone: newCustomerData.mobileNumber,
        email: newCustomerData.email || "N/A",
        business: newCustomerData.businessType,
        location: newCustomerData.state, // Use state as location
        gstNo: newCustomerData.gstNumber || "N/A",
        address: newCustomerData.address,
        state: newCustomerData.state,
        productType: newCustomerData.productType,
        customerType: newCustomerData.customerType,
        enquiryBy: newCustomerData.leadSource,
        date: newCustomerData.date,
        connected: { 
          ...editingCustomer.connected,
          status: newCustomerData.connectionStatus,
          remark: "Customer information updated", 
          datetime: new Date().toLocaleString() 
        },
        finalInfo: { 
          ...editingCustomer.finalInfo,
          status: newCustomerData.finalStatus === "Closed" ? "closed" : "next_meeting", 
          remark: newCustomerData.finalStatus 
        },
        whatsapp: newCustomerData.whatsappNumber ? `+91${newCustomerData.whatsappNumber}` : editingCustomer.whatsapp,
      }
      
      setCustomers(prev => prev.map(customer => 
        customer.id === editingCustomer.id ? updatedCustomer : customer
      ))
    } else {
      // Add new customer
      const newCustomer = {
        id: customers.length + 1,
        name: newCustomerData.customerName,
        phone: newCustomerData.mobileNumber,
        email: newCustomerData.email || "N/A",
        business: newCustomerData.businessType,
        location: newCustomerData.state, // Use state as location
        gstNo: newCustomerData.gstNumber || "N/A",
        address: newCustomerData.address,
        state: newCustomerData.state,
        enquiryBy: newCustomerData.leadSource,
        productType: newCustomerData.productType,
        customerType: newCustomerData.customerType,
        date: newCustomerData.date,
        connected: { 
          status: newCustomerData.connectionStatus, 
          remark: "New customer added", 
          datetime: new Date().toLocaleString() 
        },
        finalStatus: "New",
        finalInfo: { 
          status: newCustomerData.finalStatus === "Closed" ? "closed" : "next_meeting", 
          datetime: "", 
          remark: newCustomerData.finalStatus 
        },
        latestQuotationUrl: "#",
        quotationsSent: 0,
        followUpLink: "https://calendar.google.com/",
        whatsapp: newCustomerData.whatsappNumber ? `+91${newCustomerData.whatsappNumber}` : null,
      }
      
      setCustomers(prev => [...prev, newCustomer])
    }
    
    setShowAddCustomer(false)
    setEditingCustomer(null)
  }

  const handleRefresh = async () => {
    try {
      setIsRefreshing(true)
      const res = await apiClient.get(API_ENDPOINTS.SALESPERSON_ASSIGNED_LEADS_ME());
      const rows = res?.data || [];
      const mapped = rows.map((r) => ({
        id: r.id,
        name: r.name,
        phone: r.phone,
        email: r.email || 'N/A',
        business: r.business || 'N/A',
        address: r.address || 'N/A',
        gstNo: r.gst_no || 'N/A',
        productType: r.product_type || 'N/A',
        state: r.state || 'N/A',
        enquiryBy: r.lead_source || 'N/A',
        customerType: r.customer_type || 'N/A',
        date: r.date ? new Date(r.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        connected: { status: r.connected_status || 'Not Connected', remark: 'Imported from DH', datetime: new Date(r.updated_at || r.created_at || Date.now()).toLocaleString() },
        finalStatus: r.final_status || 'New',
        finalInfo: { status: r.final_status === 'closed' ? 'closed' : 'next_meeting', datetime: '', remark: r.final_status || 'New' },
        latestQuotationUrl: '#',
        quotationsSent: 0,
        followUpLink: 'https://calendar.google.com/',
        whatsapp: r.whatsapp ? `+91${String(r.whatsapp).replace(/\D/g, '').slice(-10)}` : null,
        transferredLeads: 0,
      }));
      setCustomers(mapped)
    } catch (err) {
      console.error('Failed to refresh assigned leads:', err)
    } finally {
      setIsRefreshing(false)
      const refreshButton = document.querySelector('[data-refresh-btn]')
      if (refreshButton) {
        refreshButton.style.transform = 'scale(1.1)'
        setTimeout(() => {
          refreshButton.style.transform = 'scale(1)'
        }, 200)
      }
    }
  }

  // Filter customers based on search query and column filters
  const filteredCustomers = React.useMemo(() => {
    let result = [...customers];
    
    // Apply search query filter if exists
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(customer => {
        const searchFields = [
          customer.name?.toLowerCase() || '',
          customer.phone?.toLowerCase() || '',
          customer.email?.toLowerCase() || '',
          customer.business?.toLowerCase() || '',
          customer.state?.toLowerCase() || '',
          customer.gstNo?.toLowerCase() || '',
          customer.productType?.toLowerCase() || '',
          customer.customerType?.toLowerCase() || '',
          customer.enquiryBy?.toLowerCase() || '',
          customer.date?.toLowerCase() || '',
          customer.address?.toLowerCase() || ''
        ];
        return searchFields.some(field => field.includes(query));
      });
    }
    
    // Apply column filters if any active
    const activeFilters = Object.entries(filters).filter(([_, value]) => value.trim() !== '');
    
    if (activeFilters.length > 0) {
      result = result.filter(customer => {
        return activeFilters.every(([key, filterValue]) => {
          const value = filterValue.toString().toLowerCase().trim();
          if (!value) return true;
          
          // Special handling for connected status to match exactly
          if (key === 'connectedStatus') {
            // For connected status, do an exact match (case-insensitive)
            return customer.connected?.status?.toLowerCase() === value.toLowerCase();
          }
          
          // For other fields, do a partial match
          const customerValue = key === 'customer' ? customer.name || '' : customer[key] || '';
          return customerValue.toString().toLowerCase().includes(value);
        });
      });
    }
    
    return result;
  }, [customers, searchQuery, filters])

  // Pagination calculations
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCustomers = filteredCustomers.slice(startIndex, endIndex);

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filters]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  // Pagination functions
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const goToPreviousPage = () => setCurrentPage(prev => Math.max(1, prev - 1));
  const goToNextPage = () => setCurrentPage(prev => Math.min(totalPages, prev + 1));

  return (
    <main className="flex-1 overflow-auto p-6">
      <div className="mb-6">

        <div className="flex items-center justify-between gap-4">
          {/* Search Box */}
          <div className="flex items-center gap-3">
            <div className="flex">
              <input
                type="text"
                placeholder="Search items..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="px-4 py-2 border border-blue-300 rounded-l-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
              />
              <button className="px-3 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <Search className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button 
              onClick={toggleFilters}
              className={`p-2 rounded-md border inline-flex items-center justify-center relative ${showFilters ? 'bg-blue-100 border-blue-300 text-blue-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}
              title="Filters"
            >
              <Filter className="h-4 w-4" />
              {Object.values(filters).some(Boolean) && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-4 h-4 text-[10px] font-medium text-white bg-blue-500 rounded-full">
                  {Object.values(filters).filter(Boolean).length}
                </span>
              )}
            </button>
            <button 
              onClick={handleAddCustomer}
              className="px-3 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 inline-flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Customer
            </button>
            <button 
              onClick={handleImportLeads}
              className="px-3 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 inline-flex items-center gap-2"
            >
              <Upload className="h-4 w-4" />
              Import
            </button>
            <button 
              onClick={handleRefresh}
              disabled={isRefreshing}
              data-refresh-btn
              className="h-9 w-9 inline-flex items-center justify-center rounded-md bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              title="Refresh Data"
            >
              <RefreshCw className={`h-4 w-4 transition-transform duration-500 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="text-left py-4 px-4 font-medium text-gray-600 text-sm">#</th>
                  <th className="text-left py-2 px-4 font-medium text-gray-600 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-indigo-500" />
                      Name & Phone
                    </div>
                    {showFilters && (
                      <input
                        type="text"
                        value={filters.customer}
                        onChange={(e) => handleFilterChange('customer', e.target.value)}
                        className="mt-1 w-full text-xs p-1 border rounded"
                        placeholder="Filter customer..."
                      />
                    )}
                  </th>
                  <th className="text-left py-2 px-4 font-medium text-gray-600 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-blue-500" />
                      Address
                    </div>
                    {showFilters && (
                      <input
                        type="text"
                        value={filters.address}
                        onChange={(e) => handleFilterChange('address', e.target.value)}
                        className="mt-1 w-full text-xs p-1 border rounded"
                        placeholder="Filter address..."
                      />
                    )}
                  </th>
                  <th className="text-left py-2 px-4 font-medium text-gray-600 text-sm">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-purple-500" />
                      GST No.
                    </div>
                    {showFilters && (
                      <input
                        type="text"
                        value={filters.gstNo}
                        onChange={(e) => handleFilterChange('gstNo', e.target.value)}
                        className="mt-1 w-full text-xs p-1 border rounded"
                        placeholder="Filter GST..."
                      />
                    )}
                  </th>
                  <th className="text-left py-2 px-4 font-medium text-gray-600 text-sm w-64">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-violet-500" />
                      Product Type
                    </div>
                    {showFilters && (
                      <select
                        value={filters.productType}
                        onChange={(e) => handleFilterChange('productType', e.target.value)}
                        className="mt-1 w-full text-xs p-1 border rounded bg-white"
                      >
                        <option value="">All Types</option>
                        {productTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    )}
                  </th>
                  <th className="text-left py-2 px-4 font-medium text-gray-600 text-sm">
                    <div className="flex items-center gap-2">
                      <Map className="h-4 w-4 text-indigo-500" />
                      State
                    </div>
                    {showFilters && (
                      <select
                        value={filters.state}
                        onChange={(e) => handleFilterChange('state', e.target.value)}
                        className="mt-1 w-full text-xs p-1 border rounded bg-white"
                      >
                        <option value="">All States</option>
                        {states.map(state => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                    )}
                  </th>
                  <th className="text-left py-2 px-4 font-medium text-gray-600 text-sm">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-orange-500" />
                      Lead Source
                    </div>
                    {showFilters && (
                      <select
                        value={filters.enquiryBy}
                        onChange={(e) => handleFilterChange('enquiryBy', e.target.value)}
                        className="mt-1 w-full text-xs p-1 border rounded bg-white"
                      >
                        <option value="">All Sources</option>
                        {leadSources.map(source => (
                          <option key={source} value={source}>{source}</option>
                        ))}
                      </select>
                    )}
                  </th>
                  <th className="text-left py-2 px-4 font-medium text-gray-600 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-purple-500" />
                      Customer Type
                    </div>
                    {showFilters && (
                      <select
                        value={filters.customerType}
                        onChange={(e) => handleFilterChange('customerType', e.target.value)}
                        className="mt-1 w-full text-xs p-1 border rounded bg-white"
                      >
                        <option value="">All Types</option>
                        {customerTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    )}
                  </th>
                  <th className="text-left py-2 px-4 font-medium text-gray-600 text-sm w-32">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-indigo-500" />
                      Date
                    </div>
                    {showFilters && (
                      <input
                        type="date"
                        value={filters.date}
                        onChange={(e) => handleFilterChange('date', e.target.value)}
                        className="mt-1 w-full text-xs p-1 border rounded bg-white"
                      />
                    )}
                  </th>
                  <th className="text-left py-2 px-4 font-medium text-gray-600 text-sm">
                    <div className="flex items-center gap-2">
                      <BadgeCheck className="h-4 w-4 text-emerald-600" />
                      Connected Status
                    </div>
                    {showFilters && (
                      <select
                        value={filters.connectedStatus}
                        onChange={(e) => handleFilterChange('connectedStatus', e.target.value)}
                        className="mt-1 w-full text-xs p-1 border rounded bg-white"
                      >
                        <option value="">All Statuses</option>
                        <option value="Connected">Connected</option>
                        <option value="Not Connected">Not Connected</option>
                        <option value="Follow Up">Follow Up</option>
                        <option value="Not Interested">Not Interested</option>
                      </select>
                    )}
                  </th>
                  <th className="text-left py-2 px-4 font-medium text-gray-600 text-sm">
                    <div className="flex items-center gap-2">
                      <BadgeCheck className="h-4 w-4 text-blue-600" />
                      Final Status
                    </div>
                    {showFilters && (
                      <select
                        value={filters.finalStatus}
                        onChange={(e) => handleFilterChange('finalStatus', e.target.value)}
                        className="mt-1 w-full text-xs p-1 border rounded bg-white"
                      >
                        <option value="">All Statuses</option>
                        <option value="Hot">Hot</option>
                        <option value="Warm">Warm</option>
                        <option value="Cold">Cold</option>
                        <option value="Lost">Lost</option>
                        <option value="Won">Won</option>
                      </select>
                    )}
                  </th>
                  <th className="text-left py-2 px-4 font-medium text-gray-600 text-sm">
                    <div className="flex items-center gap-2">
                      <ArrowRightLeft className="h-4 w-4 text-indigo-500" />
                      Transferred Leads
                    </div>
                  </th>
                  <th className="text-left py-2 px-4 font-medium text-gray-600 text-sm">
                    <div className="flex items-center gap-2">
                      <Pencil className="h-4 w-4 text-gray-500" />
                      Action
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedCustomers.length === 0 ? (
                  <tr>
                    <td colSpan="12" className="py-12 text-center text-gray-500">
                      <div className="flex flex-col items-center gap-2">
                        <Search className="h-8 w-8 text-gray-300" />
                        <p className="text-sm">
                          {searchQuery ? `No customers found for "${searchQuery}"` : 'No customers available'}
                        </p>
                        {searchQuery && (
                          <button 
                            onClick={() => setSearchQuery('')}
                            className="text-blue-600 hover:text-blue-700 text-sm underline"
                          >
                            Clear search
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ) : (
                  paginatedCustomers.map((customer) => (
                  <tr key={customer.id} className="border-b border-gray-50 odd:bg-white even:bg-gray-50/40 hover:bg-white transition-colors">
                    <td className="py-4 px-4 text-sm font-medium text-gray-900">{customer.id}</td>
                    <td className="py-4 px-4">
                      <div>
                        <div className="font-medium text-gray-900 text-sm">{customer.name}</div>
                        <div className="text-xs text-gray-500">{customer.phone}</div>
                        {customer.whatsapp && (
                          <div className="text-xs text-green-600 mt-1">
                            <a href={`https://wa.me/${customer.whatsapp.replace(/[^\d]/g, "")}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1">
                              <MessageCircle className="h-3 w-3" /> WhatsApp
                            </a>
                          </div>
                        )}
                        {customer.email && customer.email !== "N/A" && (
                          <div className="text-xs text-cyan-600 mt-1">
                            <button 
                              onClick={() => window.open(`mailto:${customer.email}?subject=Follow up from ANOCAB&body=Dear ${customer.name},%0D%0A%0D%0AThank you for your interest in our products.%0D%0A%0D%0ABest regards,%0D%0AANOCAB Team`, '_blank')}
                              className="inline-flex items-center gap-1 hover:text-cyan-700 transition-colors"
                              title="Send Email"
                            >
                              <Mail className="h-3 w-3" /> {customer.email}
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-700">
                      <div className="font-medium">{customer.address}</div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-700">
                      <div className="font-medium">{customer.gstNo}</div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-700">
                      <div className="font-medium">{customer.productType}</div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-700">
                      <div className="font-medium">{customer.state}</div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-700">
                      <div className="font-medium">{customer.enquiryBy}</div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-700">
                      <div className="font-medium">{customer.customerType || 'N/A'}</div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-700 w-32">
                      <div className="font-medium whitespace-nowrap">{customer.date}</div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-700">
                      <div className="flex flex-col">
                        <span className={
                          customer.connected?.status === 'Connected'
                            ? 'inline-flex items-center w-fit px-2 py-0.5 rounded-md text-xs font-medium border bg-green-50 text-green-700 border-green-200'
                            : customer.connected?.status === 'Not Connected'
                            ? 'inline-flex items-center w-fit px-2 py-0.5 rounded-md text-xs font-medium border bg-red-50 text-red-700 border-red-200'
                            : 'inline-flex items-center w-fit px-2 py-0.5 rounded-md text-xs font-medium border bg-yellow-50 text-yellow-700 border-yellow-200'
                        }>
                          {customer.connected?.status || '-'}
                        </span>
                        <span className="text-xs text-gray-500 mt-1">{customer.connected?.remark || '-'}</span>
                        <span className="text-xs text-gray-400">{customer.connected?.datetime || ''}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-700">
                      <div className="flex flex-col">
                        <span className={
                          customer.finalInfo?.status === 'closed'
                            ? 'inline-flex items-center w-fit px-2 py-0.5 rounded-md text-xs font-medium border bg-gray-50 text-gray-700 border-gray-200'
                            : 'inline-flex items-center w-fit px-2 py-0.5 rounded-md text-xs font-medium border bg-blue-50 text-blue-700 border-blue-200'
                        }>
                          {customer.finalInfo?.status === 'closed' ? 'Closed' : 'Next Scheduled Meeting'}
                        </span>
                        {customer.finalInfo?.datetime && (
                          <span className="text-xs text-gray-500 mt-1">{customer.finalInfo.datetime}</span>
                        )}
                        {customer.finalInfo?.remark && (
                          <span className={
                            customer.finalInfo.remark.toLowerCase().includes('not')
                              ? 'text-xs text-red-600'
                              : 'text-xs text-green-600'
                          }>
                            {customer.finalInfo.remark}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          customer.transferredLeads > 0 
                            ? 'bg-indigo-100 text-indigo-800' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          <ArrowRightLeft className="h-3 w-3 mr-1" />
                          {customer.transferredLeads || 0}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-col gap-2">
                        <button onClick={() => handleEdit(customer)} className="p-1.5 rounded-md hover:bg-gray-100 relative group" title="Edit Customer">
                          <Pencil className="h-4 w-4 text-gray-600" />
                          <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                            Edit Customer
                          </span>
                        </button>
                        <button onClick={() => handleView(customer)} className="p-1.5 rounded-md hover:bg-gray-100 relative group" title="View Details">
                          <Eye className="h-4 w-4 text-gray-600" />
                          <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                            View Details
                          </span>
                        </button>
                        <button 
                          onClick={() => handleWalletClick(customer)}
                          className="p-1.5 rounded-md hover:bg-green-50 text-green-600 relative group" 
                          title="View Payment Receipt"
                        >
                          <Wallet className="h-4 w-4" />
                          <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                            Last Payment
                          </span>
                        </button>
                        <button onClick={() => handleQuotation(customer)} className="p-1.5 rounded-md hover:bg-purple-50 text-purple-600 relative group" title="Quotation">
                          <FileText className="h-4 w-4" />
                          <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                            Quotation
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination Controls */}
      {filteredCustomers.length > 0 && (
        <div className="mt-6 flex items-center justify-between bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">Show</span>
              <select
                value={itemsPerPage}
                onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              <span className="text-sm text-gray-700">entries</span>
            </div>
            <div className="text-sm text-gray-700">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredCustomers.length)} of {filteredCustomers.length} entries
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* First Page */}
            <button
              onClick={goToFirstPage}
              disabled={currentPage === 1}
              className="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              First
            </button>

            {/* Previous Page */}
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
              {(() => {
                const pages = [];
                const maxVisiblePages = 5;
                let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
                let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
                
                if (endPage - startPage + 1 < maxVisiblePages) {
                  startPage = Math.max(1, endPage - maxVisiblePages + 1);
                }

                for (let i = startPage; i <= endPage; i++) {
                  pages.push(
                    <button
                      key={i}
                      onClick={() => handlePageChange(i)}
                      className={`px-3 py-1 text-sm border rounded ${
                        i === currentPage
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {i}
                    </button>
                  );
                }
                return pages;
              })()}
            </div>

            {/* Next Page */}
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>

            {/* Last Page */}
            <button
              onClick={goToLastPage}
              disabled={currentPage === totalPages}
              className="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Last
            </button>
          </div>
        </div>
      )}
      {viewingCustomer && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-0">
            <div className="px-6 pt-5">
              <h2 className="text-lg font-semibold text-gray-900">{viewingCustomer.name}</h2>
              <p className="text-sm text-gray-500">Quick view and actions</p>
            </div>
            <div className="mt-4 px-3">
              <div className="flex items-center gap-2 border-b border-gray-200 px-3">
                <button className={cx("px-3 py-2 text-sm flex items-center gap-1", modalTab === 'details' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900')} onClick={() => setModalTab('details')}>
                  <User className="h-4 w-4" />
                  Details
                </button>
                <button className={cx("px-3 py-2 text-sm flex items-center gap-1", modalTab === 'quotation_status' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900')} onClick={() => setModalTab('quotation_status')}>
                  <FileText className="h-4 w-4" />
                  Quotation & Payment
                </button>
                <button className={cx("px-3 py-2 text-sm flex items-center gap-1", modalTab === 'payment_timeline' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900')} onClick={() => setModalTab('payment_timeline')}>
                  <Clock className="h-4 w-4" />
                  Payment Timeline
                </button>
              </div>
            </div>
            <div className="px-6 py-4 max-h-[70vh] overflow-auto">
              {modalTab === 'details' && (
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-gray-500">Customer Name</span><span className="font-medium text-gray-900">{viewingCustomer.name}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Business Name</span><span className="font-medium text-gray-900">{viewingCustomer.business}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">GST</span><span className="font-medium text-gray-900">{viewingCustomer.gstNo || '-'}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Address</span><span className="font-medium text-gray-900 text-right max-w-[60%]">{viewingCustomer.address || '-'}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Contact</span><span className="font-medium text-gray-900">{viewingCustomer.phone}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Email</span><span className="font-medium text-gray-900">{viewingCustomer.email}</span></div>
                </div>
              )}
              {modalTab === 'payment_timeline' && (
                <div className="space-y-4">
                  <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                      <h3 className="text-lg font-medium leading-6 text-gray-900">Quotation History</h3>
                      <p className="mt-1 text-sm text-gray-500">All quotations sent to {viewingCustomer?.name}</p>
                    </div>
                    <div className="divide-y divide-gray-200">
                      {quotations.map((quotation, index) => (
                        <div key={quotation.id} className="p-4 hover:bg-gray-50">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="flex items-center">
                                <h4 className="text-sm font-medium text-gray-900">
                                  Quotation #{quotation.id}
                                  {quotation.revisionOf && (
                                    <span className="ml-2 text-xs text-gray-500">
                                      (Revision of {quotation.revisionOf})
                                    </span>
                                  )}
                                </h4>
                                <span className={`ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  quotation.status === 'sent' ? 'bg-blue-100 text-blue-800' :
                                  quotation.status === 'accepted' ? 'bg-green-100 text-green-800' :
                                  quotation.status === 'revised' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                  {quotation.status.charAt(0).toUpperCase() + quotation.status.slice(1)}
                                </span>
                              </div>
                              <div className="mt-1 text-sm text-gray-500">
                                <p>{quotation.remarks}</p>
                                <p className="mt-1">
                                  <span className="font-medium">Amount:</span> ₹{quotation.amount.toLocaleString()}
                                  <span className="mx-2">•</span>
                                  <span>Valid until: {new Date(quotation.validity).toLocaleDateString()}</span>
                                </p>
                                {quotation.customerNotes && (
                                  <div className="mt-1 p-2 bg-yellow-50 border-l-4 border-yellow-400">
                                    <p className="text-xs text-yellow-700">
                                      <span className="font-medium">Customer Note:</span> {quotation.customerNotes}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="ml-4 flex-shrink-0">
                              <div className="text-right">
                                <time dateTime={quotation.date} className="text-sm text-gray-500">
                                  {new Date(quotation.date).toLocaleString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </time>
                                <div className="mt-1">
                                  <button
                                    onClick={() => {
                                      setCurrentPdfUrl(quotation.documentUrl);
                                      setShowPdfViewer(true);
                                    }}
                                    className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                  >
                                    <FileText className="h-3 w-3 mr-1" />
                                    View PDF
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Quotation Details - Collapsible */}
                          <div className="mt-3 border-t border-gray-200 pt-3">
                            <div className="text-sm text-gray-700">
                              <div className="grid grid-cols-3 gap-2 text-xs font-medium text-gray-500 mb-1">
                                <div>Description</div>
                                <div className="text-right">Qty</div>
                                <div className="text-right">Amount</div>
                              </div>
                              {quotation.items.map((item, itemIndex) => (
                                <div key={itemIndex} className="grid grid-cols-3 gap-2 py-1 border-b border-gray-100">
                                  <div className="text-sm">{item.description}</div>
                                  <div className="text-right">{item.quantity} x ₹{item.rate.toLocaleString()}</div>
                                  <div className="text-right font-medium">₹{item.amount.toLocaleString()}</div>
                                </div>
                              ))}
                              <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-200">
                                <div className="text-sm font-medium">Total</div>
                                <div className="text-right">
                                  <div className="text-base font-bold">₹{quotation.total.toLocaleString()}</div>
                                  <div className="text-xs text-gray-500">{quotation.terms}</div>
                                </div>
                              </div>
                              <div className="mt-2 text-xs text-gray-500">
                                <p>Prepared by: {quotation.preparedBy}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {modalTab === 'quotation_status' && (
                <div className="space-y-4 text-sm">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">Quotation Status</h3>
                    <div className="rounded-md border border-gray-200 divide-y">
                      <div className="p-3 flex items-center justify-between">
                        <span className="text-gray-700">Latest Quotation</span>
                        <span className="text-xs">{viewingCustomer.latestQuotationUrl === "latest" ? (
                          <button 
                            onClick={() => handleViewLatestQuotation(viewingCustomer)}
                            className="text-blue-600 underline inline-flex items-center gap-1 hover:text-blue-700"
                          >
                            <Eye className="h-3.5 w-3.5" /> View
                          </button>
                        ) : viewingCustomer.latestQuotationUrl ? (
                          <a href={viewingCustomer.latestQuotationUrl} className="text-blue-600 underline inline-flex items-center gap-1">
                            <Eye className="h-3.5 w-3.5" /> View
                          </a>
                        ) : (
                          <span className="text-gray-500">None</span>
                        )}</span>
                      </div>
                      <div className="p-3 flex items-center justify-between">
                        <span className="text-gray-700">Quotations Sent</span>
                        <span className="text-xs text-gray-500">{viewingCustomer.quotationsSent ?? 0}</span>
                      </div>
                      <div className="p-3">
                        <button 
                          onClick={handleCreateQuotation}
                          className="px-3 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700 inline-flex items-center gap-2"
                        >
                          Create Quotation
                        </button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">Quotation Preview</h3>
                    <div className="rounded-md border border-gray-200 max-h-[320px] overflow-auto bg-white">
                      <Quotation quotationData={quotationData} customer={viewingCustomer} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">Payment Status</h3>
                    <div className="rounded-md border border-gray-200 divide-y">
                      <div className="p-3 flex items-center justify-between">
                        <span className="text-gray-700">Advance</span>
                        <span className="text-xs text-gray-500">Not received</span>
                      </div>
                      <div className="p-3 flex items-center justify-between">
                        <span className="text-gray-700">Balance</span>
                        <span className="text-xs text-gray-500">N/A</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="px-6 pb-4 flex justify-end gap-3">
              <button className="px-3 py-2 rounded-md bg-white border border-gray-200 text-gray-700 hover:bg-gray-50" onClick={() => setViewingCustomer(null)}>Close</button>
              <button className="px-3 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700" onClick={() => setViewingCustomer(null)}>Done</button>
            </div>
          </div>
        </div>
      )}
      
      {showAddCustomer && (
        <AddCustomerForm 
          onClose={() => {
            setShowAddCustomer(false)
            setEditingCustomer(null)
          }}
          onSave={handleSaveCustomer}
          editingCustomer={editingCustomer}
        />
      )}
      
      {showCreateQuotation && selectedCustomerForQuotation && (
        <CreateQuotationForm 
          customer={selectedCustomerForQuotation}
          onClose={() => {
            setShowCreateQuotation(false)
            setSelectedCustomerForQuotation(null)
          }}
          onSave={handleSaveQuotation}
        />
      )}

      {/* Payment Details Modal */}
      {showPaymentDetails && selectedCustomer && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
            <div className="p-6 flex-1 overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Payment Details</h3>
                <button 
                  onClick={() => setShowPaymentDetails(false)}
                  className="text-gray-500 hover:text-gray-700"
                  aria-label="Close payment details"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              {/* Customer Info */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-1">{selectedCustomer.name}</h4>
                <p className="text-sm text-gray-600">{selectedCustomer.phone} • {selectedCustomer.email}</p>
              </div>
              
              {/* Payment Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Total Amount</p>
                  <p className="text-lg font-semibold text-gray-900">₹{totalAmount.toLocaleString('en-IN')}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Paid Amount</p>
                  <p className="text-lg font-semibold text-green-600">
                    ₹{paymentHistory.reduce((sum, p) => sum + p.amount, 0).toLocaleString('en-IN')}
                  </p>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Remaining</p>
                  <p className="text-lg font-semibold text-amber-600">
                    ₹{(totalAmount - paymentHistory.reduce((sum, p) => sum + p.amount, 0)).toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
              
              {/* Payment History */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Payment History</h4>
                {paymentHistory.length > 0 ? (
                  <div className="space-y-4">
                    {paymentHistory.map((payment) => (
                      <div key={payment.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-gray-900">₹{payment.amount.toLocaleString('en-IN')}</p>
                            <p className="text-sm text-gray-500">{payment.description}</p>
                            <p className="text-xs text-gray-400 mt-1">{payment.date} • {payment.paymentMethod}</p>
                          </div>
                          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                            {payment.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-500 py-4">No payment history found</p>
                )}
              </div>
            </div>
            
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowPaymentDetails(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Close
              </button>
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => {
                  // In a real app, this would open a form to add a new payment
                  alert('Add new payment functionality would open here');
                }}
              >
                Add Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Import Leads</h3>
                <button 
                  onClick={() => {
                    setShowImportModal(false)
                    setImportFile(null)
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm text-gray-600">
                    Upload a CSV file with lead data. Make sure the format matches the template.
                  </p>
                  <button
                    onClick={handleDownloadTemplate}
                    className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 inline-flex items-center gap-1"
                  >
                    <Download className="h-3 w-3" />
                    Download Template
                  </button>
                </div>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-2">
                    <label htmlFor="csv-upload" className="cursor-pointer">
                      <span className="mt-2 block text-sm font-medium text-gray-900">
                        {importFile ? importFile.name : 'Click to upload CSV file'}
                      </span>
                      <span className="mt-1 block text-sm text-gray-500">
                        or drag and drop
                      </span>
                    </label>
                    <input
                      id="csv-upload"
                      type="file"
                      accept=".csv"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowImportModal(false)
                    setImportFile(null)
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  onClick={processCSVImport}
                  disabled={!importFile}
                  className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Import Leads
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
