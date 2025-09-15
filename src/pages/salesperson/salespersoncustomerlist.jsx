"use client"

import React from "react"
import { Search, RefreshCw, User, Mail, Building2, Pencil, Eye, Plus, Import, Filter, Link as LinkIcon, MessageCircle, Package, MapPin, Map, BadgeCheck, XCircle, FileText, Globe } from "lucide-react"
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
  const [showFilters, setShowFilters] = React.useState(false);
  // Available options for dropdowns
  const productTypes = ['Conductor', 'Cable', 'AAAC', 'Aluminium', 'Copper', 'PVC', 'Wire'];
  const customerTypes = ['Business', 'Corporate', 'Individual', 'Reseller', 'Government'];
  const leadSources = ['Phone', 'Marketing', 'FB Ads', 'Google Ads', 'Referral', 'Webinar', 'Website', 'Email', 'Other'];

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
  const [customers, setCustomers] = React.useState([
    {
      id: 1,
      name: "Raj Koshta",
      phone: "9340662655",
      email: "telesalesuser@gmail.com",
      business: "Tech Team",
      location: "Jabalpur",
      gstNo: "27ABCDE1234F1Z5",
      address: "KHASRA NO. 805/5, IT PARK, BARGI HILLS",
      state: "Madhya Pradesh",
      enquiryBy: "Phone",
      productType: "Conductor",
      customerType: "Business",
      date: "2025-09-10",
      connected: { status: "Connected", remark: "Spoke with Raj, requested quote", datetime: "2025-09-10 11:15 AM" },
      finalStatus: "Hot",
      finalInfo: { status: "next_meeting", datetime: "2025-09-12 03:30 PM", remark: "Interested" },
      latestQuotationUrl: "#",
      quotationsSent: 0,
      followUpLink: "https://calendar.google.com/",
      whatsapp: "+919340662655",
    },
    {
      id: 2,
      name: "Ankit",
      phone: "7879431560",
      email: "telesalesuser@gmail.com",
      business: "Anit MBG",
      location: "Jabalpur, MP",
      gstNo: "27AABCU9603R1ZV",
      address: "Anit MBG Campus, Jabalpur",
      state: "Madhya Pradesh",
      enquiryBy: "Marketing",
      productType: "Cable",
      customerType: "Corporate",
      date: "2025-09-09",
      connected: { status: "Follow Up", remark: "Call back tomorrow", datetime: "2025-09-09 05:30 PM" },
      finalStatus: "Warm",
      finalInfo: { status: "next_meeting", datetime: "2025-09-11 11:00 AM", remark: "Interested" },
      latestQuotationUrl: "#",
      quotationsSent: 1,
      followUpLink: "https://calendar.google.com/",
      whatsapp: "+917879431560",
    },
    {
      id: 3,
      name: "Mohit Patel",
      phone: "7879431560",
      email: "telesalesuser@gmail.com",
      business: "Mbg Card",
      location: "Jabalpur, MP",
      gstNo: "27BBBCU9603R2ZA",
      address: "Mbg Card Office, Jabalpur",
      state: "Madhya Pradesh",
      enquiryBy: "FB Ads",
      productType: "AAAC",
      customerType: "Individual",
      date: "2025-09-08",
      connected: { status: "Not Connected", remark: "No answer", datetime: "2025-09-08 02:10 PM" },
      finalStatus: "Cold",
      finalInfo: { status: "next_meeting", datetime: "2025-09-13 02:00 PM", remark: "Not Interested" },
      latestQuotationUrl: "#",
      quotationsSent: 0,
      followUpLink: "https://calendar.google.com/",
      whatsapp: "+917879431560",
    },
    {
      id: 4,
      name: "Ankit",
      phone: "7879431560",
      email: "telesalesuser@gmail.com",
      business: "Anit MBG",
      location: "Jabalpur, MP",
      gstNo: "27ABCDE1234F1Z5",
      address: "Street 12, Jabalpur",
      state: "Madhya Pradesh",
      enquiryBy: "Marketing",
      productType: "Aluminium",
      connected: { status: "Connected", remark: "Negotiation in progress", datetime: "2025-09-07 03:45 PM" },
      finalStatus: "Hot",
      finalInfo: { status: "closed", datetime: "2025-09-07 04:00 PM", remark: "Interested" },
      latestQuotationUrl: "#",
      quotationsSent: 2,
      followUpLink: "https://calendar.google.com/",
      whatsapp: "+917879431560",
    },
    {
      id: 5,
      name: "Mohit Patel Test Name",
      phone: "7879431560",
      email: "test@gmail.com",
      business: "Test Business MBG Card ndia PVT LTD Jabalpur",
      location: "Jabalpur, MP",
      gstNo: "27TEST1234F1Z5",
      address: "Industrial Area, Jabalpur",
      state: "Madhya Pradesh",
      enquiryBy: "Referral",
      productType: "Copper",
      connected: { status: "Connected", remark: "Sent brochure via email", datetime: "2025-09-06 10:00 AM" },
      finalStatus: "Warm",
      finalInfo: { status: "next_meeting", datetime: "2025-09-15 10:30 AM", remark: "Interested" },
      latestQuotationUrl: "#",
      quotationsSent: 3,
      followUpLink: "https://calendar.google.com/",
      whatsapp: "+917879431560",
    },
    {
      id: 6,
      name: "Mohit Patel Test Name",
      phone: "7879431560",
      email: "test@gmail.com",
      business: "Test Business MBG Card ndia PVT LTD Jabalpur",
      location: "Jabalpur, MP",
      gstNo: "27TEST5678F1Z5",
      address: "Industrial Park, Jabalpur",
      state: "Madhya Pradesh",
      enquiryBy: "Marketing",
      productType: "PVC",
      connected: { status: "Follow Up", remark: "Awaiting requirement list", datetime: "2025-09-05 01:20 PM" },
      finalStatus: "Warm",
      finalInfo: { status: "next_meeting", datetime: "2025-09-14 05:00 PM", remark: "Interested" },
      latestQuotationUrl: "#",
      quotationsSent: 0,
      followUpLink: "https://calendar.google.com/",
      whatsapp: "+917879431560",
    },
    {
      id: 7,
      name: "Abid",
      phone: "7845416535",
      email: "N/A",
      business: "MBG SALES",
      location: "Pune",
      gstNo: "27ABIDA1234F1Z5",
      address: "MG Road, Pune",
      state: "Maharashtra",
      enquiryBy: "Google Ads",
      productType: "Cable",
      connected: { status: "Connected", remark: "Shared price list", datetime: "2025-09-04 04:00 PM" },
      finalStatus: "Hot",
      finalInfo: { status: "closed", datetime: "2025-09-04 04:30 PM", remark: "Interested" },
      latestQuotationUrl: "#",
      quotationsSent: 1,
      followUpLink: "https://calendar.google.com/",
      whatsapp: "+917845416535",
    },
    {
      id: 8,
      name: "Naman",
      phone: "9340662655",
      email: "N/A",
      business: "FINANCE",
      location: "Delhi",
      gstNo: "07NAMAN1234F1Z5",
      address: "Connaught Place, Delhi",
      state: "Delhi",
      enquiryBy: "Webinar",
      productType: "Wire",
      connected: { status: "Not Interested", remark: "Budget constraints", datetime: "2025-09-03 12:30 PM" },
      finalStatus: "Lost",
      finalInfo: { status: "closed", datetime: "2025-09-03 01:00 PM", remark: "Not Interested" },
      latestQuotationUrl: "#",
      quotationsSent: 0,
      followUpLink: "https://calendar.google.com/",
      whatsapp: "+919340662655",
    },
    {
      id: 9,
      name: "Gourav",
      phone: "9340662655",
      email: "N/A",
      business: "MBG SALES",
      location: "Pune",
      gstNo: "27GOURA1234F1Z5",
      address: "Baner, Pune",
      state: "Maharashtra",
      enquiryBy: "Facebook",
      productType: "Conductor",
      connected: { status: "Connected", remark: "Site visit scheduled", datetime: "2025-09-02 09:45 AM" },
      finalStatus: "Warm",
      finalInfo: { status: "next_meeting", datetime: "2025-09-16 09:45 AM", remark: "Interested" },
      latestQuotationUrl: "#",
      quotationsSent: 0,
      followUpLink: "https://calendar.google.com/",
      whatsapp: "+919340662655",
    },
  ])

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
    if (lastQuotationData && lastQuotationData.customer?.id === customer.id) {
      // Generate PDF directly without showing preview
      await generateQuotationPDF(lastQuotationData, customer)
    }
  }

  const generateQuotationPDF = async (quotationData, customer) => {
    // Create a temporary quotation element
    const tempDiv = document.createElement('div')
    tempDiv.style.position = 'absolute'
    tempDiv.style.left = '-9999px'
    tempDiv.innerHTML = `
      <div class="p-6 font-sans text-sm">
        <!-- Header -->
        <div class="border-2 border-black mb-4">
          <div class="p-2 flex justify-between items-center">
            <div>
              <h1 class="text-xl font-bold">ANODE ELECTRIC PVT. LTD.</h1>
              <p class="text-xs">MANUFACTURING & SUPPLY OF ELECTRICAL CABLES & WIRES</p>
            </div>
            <div class="text-right">
              <img
                src="https://res.cloudinary.com/drpbrn2ax/image/upload/v1757416761/logo2_kpbkwm-removebg-preview_jteu6d.png"
                alt="Anode Electric Logo"
                class="h-12 w-auto bg-white p-1 rounded"
              />
            </div>
          </div>
          <div class="p-3 bg-gray-50">
            <div class="grid grid-cols-2 gap-4 text-xs">
              <div>
                <p><strong>KHASRA NO. 805/5, PLOT NO. 10, IT PARK</strong></p>
                <p>BARGI HILLS, JABALPUR - 482003</p>
                <p>MADHYA PRADESH, INDIA</p>
              </div>
              <div class="text-right">
                <p>Tel: 6262002116, 6262002113</p>
                <p>Web: www.anocab.com</p>
                <p>Email: info@anocab.com</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Quotation Details -->
        <div class="border border-black mb-4">
          <div class="bg-gray-100 p-2 text-center font-bold">
            <h2>Quotation Details</h2>
          </div>
          <div class="grid grid-cols-5 gap-2 p-2 text-xs border-b">
            <div><strong>Quotation Detail</strong></div>
            <div><strong>Revised Quotation</strong></div>
            <div><strong>Quotation Date</strong></div>
            <div><strong>Customer ID</strong></div>
            <div><strong>Valid Upto</strong></div>
          </div>
          <div class="grid grid-cols-5 gap-2 p-2 text-xs">
            <div>${quotationData?.quotationDetail || 'Final Quotation'}</div>
            <div>${quotationData?.quotationNumber || 'ANO/25-26/458'}</div>
            <div>${quotationData?.quotationDate || '08/09/2025'}</div>
            <div>CUST${Date.now().toString().slice(-4)}</div>
            <div>${quotationData?.validUpto || '2 DAYS'}</div>
          </div>
        </div>

        <!-- Customer Information -->
        <div class="border border-black mb-4">
          <div class="grid grid-cols-2 gap-4 p-3 text-xs">
            <div>
              <h3 class="font-bold mb-2">BILL TO:</h3>
              <p><strong>${quotationData?.billTo?.business || customer?.business || 'Das Industrial Controls'}</strong></p>
              <p>${quotationData?.billTo?.address || customer?.address || 'Panvel, Maharashtra, India'}</p>
              <p><strong>PHONE:</strong> ${quotationData?.billTo?.phone || customer?.phone || '7039542259'}</p>
              <p><strong>GSTIN:</strong> ${quotationData?.billTo?.gstNo || customer?.gstNo || '27DVTPS2973B1Z0'}</p>
              <p><strong>State:</strong> ${quotationData?.billTo?.state || customer?.state || 'Maharashtra'}</p>
            </div>
            <div>
              <p><strong>L.R. No:</strong> -</p>
              <p><strong>Transport:</strong> STAR TRANSPORTS</p>
              <p><strong>Transport ID:</strong> 562345</p>
              <p><strong>Vehicle Number:</strong> GJ01HJ2520</p>
            </div>
          </div>
        </div>

        <!-- Product Details Table -->
        <div class="border border-black mb-4">
          <table class="w-full text-xs">
            <thead>
              <tr class="bg-gray-100">
                <th class="border border-gray-300 p-2 text-left">Sr. No.</th>
                <th class="border border-gray-300 p-2 text-left">Name of Product / Service</th>
                <th class="border border-gray-300 p-2 text-left">HSN / SAC</th>
                <th class="border border-gray-300 p-2 text-left">Qty</th>
                <th class="border border-gray-300 p-2 text-left">Unit</th>
                <th class="border border-gray-300 p-2 text-left">Taxable Value</th>
                <th class="border border-gray-300 p-2 text-left">Total GST</th>
                <th class="border border-gray-300 p-2 text-left">Total</th>
              </tr>
            </thead>
            <tbody>
              ${quotationData?.items?.length > 0 ? 
                quotationData.items.map((item, index) => `
                  <tr>
                    <td class="border border-gray-300 p-2">${index + 1}</td>
                    <td class="border border-gray-300 p-2">${item.description}</td>
                    <td class="border border-gray-300 p-2">85446090</td>
                    <td class="border border-gray-300 p-2">${item.quantity} ${item.unit}</td>
                    <td class="border border-gray-300 p-2">${item.rate.toFixed(2)}</td>
                    <td class="border border-gray-300 p-2">${item.amount.toFixed(2)}</td>
                    <td class="border border-gray-300 p-2">18% ${(item.amount * 0.18).toFixed(2)}</td>
                    <td class="border border-gray-300 p-2">${(item.amount * 1.18).toFixed(2)}</td>
                  </tr>
                `).join('') : 
                `<tr>
                  <td class="border border-gray-300 p-2">1</td>
                  <td class="border border-gray-300 p-2">ACSR Dog Conductor</td>
                  <td class="border border-gray-300 p-2">76042910</td>
                  <td class="border border-gray-300 p-2">120,000 MTR</td>
                  <td class="border border-gray-300 p-2">82.00</td>
                  <td class="border border-gray-300 p-2">9,840,000</td>
                  <td class="border border-gray-300 p-2">18% 1,772,400</td>
                  <td class="border border-gray-300 p-2">11,612,400</td>
                </tr>`
              }
              ${Array(8).fill().map(() => `
                <tr class="h-8">
                  <td class="border border-gray-300 p-2"></td>
                  <td class="border border-gray-300 p-2"></td>
                  <td class="border border-gray-300 p-2"></td>
                  <td class="border border-gray-300 p-2"></td>
                  <td class="border border-gray-300 p-2"></td>
                  <td class="border border-gray-300 p-2"></td>
                  <td class="border border-gray-300 p-2"></td>
                  <td class="border border-gray-300 p-2"></td>
                </tr>
              `).join('')}
              <tr class="bg-gray-100 font-bold">
                <td class="border border-gray-300 p-2" colspan="5">Total</td>
                <td class="border border-gray-300 p-2">${quotationData?.subtotal?.toFixed(2) || '34,440,000'}</td>
                <td class="border border-gray-300 p-2">${quotationData?.taxAmount?.toFixed(2) || '6,200,400'}</td>
                <td class="border border-gray-300 p-2">${quotationData?.total?.toFixed(2) || '40,640,400'}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Amount Summary -->
        <div class="grid grid-cols-2 gap-4 mb-4">
          <div class="border border-black p-3">
            <h3 class="font-bold text-xs mb-2">Bank Details</h3>
            <div class="text-xs space-y-1">
              <p><strong>Bank Name:</strong> ICICI Bank</p>
              <p><strong>Branch Name:</strong> WRIGHT TOWN JABALPUR</p>
              <p><strong>Bank Account Number:</strong> 657605601783</p>
              <p><strong>Bank Branch IFSC:</strong> ICIC0006576</p>
            </div>
          </div>
          <div class="border border-black p-3">
            <div class="text-xs space-y-1">
              <div class="flex justify-between">
                <span>Taxable Amount</span>
                <span>${quotationData?.subtotal?.toFixed(2) || '34,440,000'}</span>
              </div>
              <div class="flex justify-between">
                <span>Add: Total GST (18%)</span>
                <span>${quotationData?.taxAmount?.toFixed(2) || '6,200,400'}</span>
              </div>
              <div class="flex justify-between font-bold border-t pt-1">
                <span>Total Amount After Tax</span>
                <span>₹ ${quotationData?.total?.toFixed(2) || '40,640,400'}</span>
              </div>
              <div class="text-center mt-2">
                <span class="text-xs">(Rupees Four Crore Six Lakh Forty Thousand Four Hundred Only)</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Terms and Conditions -->
        <div class="border border-black mb-4">
          <div class="bg-gray-100 p-2 font-bold text-xs">
            <h3>Terms and Conditions</h3>
          </div>
          <div class="p-3 text-xs space-y-2">
            <div>
              <h4 class="font-bold">PRICING & VALIDITY</h4>
              <p>• Prices are valid for 3 days only from the date of the final quotation/PI unless otherwise specified terms.</p>
              <p>• The order will be considered confirmed only upon receipt of the advance payment.</p>
            </div>
            <div>
              <h4 class="font-bold">PAYMENT TERMS</h4>
              <p>• 30% advance payment upon order confirmation</p>
              <p>• Remaining Balance at time of final dispatch / against LC / Bank Guarantee (if applicable).</p>
              <p>• Liquidated Damages @ 0.5% to 1% per WEEK will be charged on delayed payments beyond the agreed terms.</p>
            </div>
            <div>
              <h4 class="font-bold">DELIVERY & DISPATCH</h4>
              <p>• Standard delivery period as per the telecommunication with customer.</p>
              <p>• Any delays due to unforeseen circumstances (force majeure, strikes, and transportation issues) will be communicated.</p>
            </div>
            <div>
              <h4 class="font-bold">QUALITY & WARRANTY</h4>
              <p>• Cables will be supplied as per IS and other applicable BIS standards/or as per the agreed specifications mentioned/special demand by the customer.</p>
              <p>• Any manufacturing defects should be reported immediately, within 3 working days of receipt.</p>
              <p>• Warranty: 12 months from the date of dispatch for manufacturing defects only in ISI mark products.</p>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="text-right text-xs">
          <p class="mb-4">For <strong>ANODE ELECTRIC PRIVATE LIMITED</strong></p>
          <p class="mb-8">This is computer generated invoice no signature required.</p>
          <p class="font-bold">Authorized Signatory</p>
        </div>
      </div>
    `
    
    document.body.appendChild(tempDiv)

    // Convert image to base64
    const convertImageToBase64 = (imgUrl) => {
      return new Promise((resolve) => {
        const img = new Image()
        img.crossOrigin = 'anonymous'
        img.onload = () => {
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')
          canvas.width = img.width
          canvas.height = img.height
          ctx.drawImage(img, 0, 0)
          resolve(canvas.toDataURL('image/png'))
        }
        img.onerror = () => resolve(imgUrl)
        img.src = imgUrl
      })
    }

    // Use a more reliable logo URL or fallback to a simple text logo
    const logoUrl = 'https://res.cloudinary.com/drpbrn2ax/image/upload/v1757416761/logo2_kpbkwm-removebg-preview_jteu6d.png'
    let base64Logo = await convertImageToBase64(logoUrl)
    
    // If conversion fails, use a fallback base64 logo or create a text-based logo
    if (!base64Logo || base64Logo === logoUrl) {
      // Create a simple text-based logo as fallback
      base64Logo = 'data:image/svg+xml;base64,' + btoa(`
        <svg width="120" height="48" xmlns="http://www.w3.org/2000/svg">
          <rect width="120" height="48" fill="#1e40af" rx="4"/>
          <text x="60" y="20" font-family="Arial, sans-serif" font-size="12" font-weight="bold" text-anchor="middle" fill="white">ANODE</text>
          <text x="60" y="35" font-family="Arial, sans-serif" font-size="8" text-anchor="middle" fill="white">ELECTRIC</text>
        </svg>
      `)
    }
    
    const logoImg = tempDiv.querySelector('img')
    if (logoImg) {
      logoImg.src = base64Logo
    }

    // Create print window
    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Quotation - ${quotationData?.quotationNumber || 'ANO/25-26/458'}</title>
            <style>
              * { margin: 0; padding: 0; box-sizing: border-box; }
              body { 
                margin: 0; 
                padding: 20px; 
                font-family: Arial, sans-serif; 
                font-size: 14px;
                line-height: 1.4;
                color: #000;
              }
              .border-2 { border: 2px solid #000; }
              .border { border: 1px solid #000; }
              .border-black { border-color: #000; }
              .border-gray-300 { border-color: #d1d5db; }
              .mb-4 { margin-bottom: 1rem; }
              .mb-2 { margin-bottom: 0.5rem; }
              .mb-8 { margin-bottom: 2rem; }
              .p-2 { padding: 0.5rem; }
              .p-3 { padding: 0.75rem; }
              .p-6 { padding: 1.5rem; }
              .pt-1 { padding-top: 0.25rem; }
              .text-xl { font-size: 1.25rem; }
              .text-xs { font-size: 0.75rem; }
              .text-sm { font-size: 0.875rem; }
              .font-bold { font-weight: bold; }
              .font-semibold { font-weight: 600; }
              .text-center { text-align: center; }
              .text-right { text-align: right; }
              .text-left { text-align: left; }
              .flex { display: flex; }
              .justify-between { justify-content: space-between; }
              .items-center { align-items: center; }
              .grid { display: grid; }
              .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
              .grid-cols-5 { grid-template-columns: repeat(5, minmax(0, 1fr)); }
              .gap-2 { gap: 0.5rem; }
              .gap-4 { gap: 1rem; }
              .bg-gray-50 { background-color: #f9fafb; }
              .bg-gray-100 { background-color: #f3f4f6; }
              .space-y-1 > * + * { margin-top: 0.25rem; }
              .space-y-2 > * + * { margin-top: 0.5rem; }
              .w-full { width: 100%; }
              .h-12 { height: 3rem; }
              .w-auto { width: auto; }
              .w-24 { width: 6rem; }
              .rounded { border-radius: 0.25rem; }
              .flex-col { flex-direction: column; }
              .bg-blue-600 { background-color: #2563eb; }
              .text-white { color: white; }
              table { border-collapse: collapse; width: 100%; }
              th, td { border: 1px solid #d1d5db; padding: 0.5rem; text-align: left; }
              th { background-color: #f3f4f6; font-weight: bold; }
              .border-t { border-top: 1px solid #000; }
              img { max-width: 100%; height: auto; }
              @media print {
                body { margin: 0; padding: 10px; }
                * { -webkit-print-color-adjust: exact !important; color-adjust: exact !important; }
              }
            </style>
          </head>
          <body>
            ${tempDiv.innerHTML}
          </body>
        </html>
      `)
      printWindow.document.close()
      printWindow.focus()
      printWindow.print()
      printWindow.close()
    }

    // Clean up
    document.body.removeChild(tempDiv)
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
    setIsRefreshing(true)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // In a real application, you would fetch fresh data from your API
    // For now, we'll simulate refreshing by updating timestamps and connection status
    setCustomers(prevCustomers => 
      prevCustomers.map(customer => ({
        ...customer,
        connected: {
          ...customer.connected,
          datetime: new Date().toLocaleString()
        },
        // Randomly update some connection statuses to simulate real-time changes
        ...(Math.random() > 0.7 && {
          connected: {
            ...customer.connected,
            status: ['Connected', 'Follow Up', 'Not Connected'][Math.floor(Math.random() * 3)],
            datetime: new Date().toLocaleString()
          }
        })
      }))
    )
    
    setIsRefreshing(false)
    
    // Show success feedback
    const refreshButton = document.querySelector('[data-refresh-btn]')
    if (refreshButton) {
      refreshButton.style.transform = 'scale(1.1)'
      setTimeout(() => {
        refreshButton.style.transform = 'scale(1)'
      }, 200)
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
          
          const customerValue = key === 'customer' ? customer.name || '' :
                              key === 'connectedStatus' ? customer.connected?.status || '' :
                              customer[key] || '';
                              
          return customerValue.toString().toLowerCase().includes(value);
        });
      });
    }
    
    return result;
  }, [customers, searchQuery, filters])

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  return (
    <main className="flex-1 overflow-auto p-6">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
            <User className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Your Assigned Leads</h1>
            <p className="text-sm text-gray-600">Manage and track your sales leads</p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-4">
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
            <button className="px-3 py-2 rounded-md bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 inline-flex items-center gap-2">
              <Import className="h-4 w-4" />
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
                      <User className="h-4 w-4 text-blue-500" />
                      Customer
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
                      <Building2 className="h-4 w-4 text-green-500" />
                      Business
                    </div>
                    {showFilters && (
                      <input
                        type="text"
                        value={filters.business}
                        onChange={(e) => handleFilterChange('business', e.target.value)}
                        className="mt-1 w-full text-xs p-1 border rounded"
                        placeholder="Filter business..."
                      />
                    )}
                  </th>
                  <th className="text-left py-2 px-4 font-medium text-gray-600 text-sm">
                    <div className="flex items-center gap-2">
                      <BadgeCheck className="h-4 w-4 text-amber-600" />
                      GST no.
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
                  <th className="text-left py-2 px-4 font-medium text-gray-600 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-rose-500" />
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
                      <Map className="h-4 w-4 text-indigo-500" />
                      State
                    </div>
                    {showFilters && (
                      <input
                        type="text"
                        value={filters.state}
                        onChange={(e) => handleFilterChange('state', e.target.value)}
                        className="mt-1 w-full text-xs p-1 border rounded"
                        placeholder="Filter state..."
                      />
                    )}
                  </th>
                  <th className="text-left py-2 px-4 font-medium text-gray-600 text-sm">
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
                      <Pencil className="h-4 w-4 text-gray-500" />
                      Action
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="py-12 text-center text-gray-500">
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
                  filteredCustomers.map((customer) => (
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
                    <td className="py-4 px-4">
                      <div>
                        <div className="font-medium text-gray-900 text-sm">{customer.business}</div>
                        <div className="text-xs text-gray-500">{customer.location}</div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-700">{customer.gstNo}</td>
                    <td className="py-4 px-4 text-sm text-gray-700">{customer.address}</td>
                    <td className="py-4 px-4 text-sm text-gray-700">{customer.state}</td>
                    <td className="py-4 px-4 text-sm text-gray-700">{customer.productType}</td>
                    <td className="py-4 px-4 text-sm text-gray-700">{customer.customerType || 'N/A'}</td>
                    <td className="py-4 px-4 text-sm text-gray-700">{customer.enquiryBy}</td>
                    <td className="py-4 px-4 text-sm text-gray-700">{customer.date || 'N/A'}</td>
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
                        {customer.followUpLink && (
                          <a href={customer.followUpLink} target="_blank" rel="noreferrer" className="p-1.5 rounded-md hover:bg-blue-50 text-blue-600 relative group" title="Follow Up Link">
                            <LinkIcon className="h-4 w-4" />
                            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                              Follow Up Link
                            </span>
                          </a>
                        )}
                        <button onClick={() => handleQuotation(customer)} className="p-1.5 rounded-md hover:bg-purple-50 text-purple-600 relative group" title="View Quotation">
                          <FileText className="h-4 w-4" />
                          <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                            View Quotation
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
      {viewingCustomer && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-0">
            <div className="px-6 pt-5">
              <h2 className="text-lg font-semibold text-gray-900">{viewingCustomer.name}</h2>
              <p className="text-sm text-gray-500">Quick view and actions</p>
            </div>
            <div className="mt-4 px-3">
              <div className="flex items-center gap-2 border-b border-gray-200 px-3">
                <button className={cx("px-3 py-2 text-sm", modalTab === 'details' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900')} onClick={() => setModalTab('details')}>Details</button>
                <button className={cx("px-3 py-2 text-sm", modalTab === 'quotation_status' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900')} onClick={() => setModalTab('quotation_status')}>Quotation & Payment Status</button>
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
    </main>
  )
}
