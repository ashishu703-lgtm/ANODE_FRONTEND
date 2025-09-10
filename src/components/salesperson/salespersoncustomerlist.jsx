"use client"

import React from "react"
import { Search, RefreshCw, User, Mail, Building2, Pencil, Eye, Plus, Import, Filter, Link as LinkIcon, MessageCircle, Package, MapPin, Map, BadgeCheck, XCircle, FileText } from "lucide-react"
import Quotation from './salespersonquotation.jsx'

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
  const customers = [
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
  ]

  const handleEdit = (customer) => {
    console.log("Edit customer", customer)
  }

  const handleView = (customer) => {
    setViewingCustomer(customer)
    setModalTab('details')
  }

  const handleQuotation = (customer) => {
    console.log("Open quotation for", customer)
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

        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or business..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="px-3 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 inline-flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Customer
            </button>
            <button className="px-3 py-2 rounded-md bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 inline-flex items-center gap-2">
              <Import className="h-4 w-4" />
              Import
            </button>
            <button className="h-9 w-9 inline-flex items-center justify-center rounded-md bg-white border border-gray-200 text-gray-700 hover:bg-gray-50">
              <Filter className="h-4 w-4" />
            </button>
            <button className="h-9 w-9 inline-flex items-center justify-center rounded-md bg-white border border-gray-200 text-gray-700 hover:bg-gray-50">
              <RefreshCw className="h-4 w-4" />
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
                  <th className="text-left py-4 px-4 font-medium text-gray-600 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-blue-500" />
                      Customer
                    </div>
                  </th>
                  <th className="text-left py-4 px-4 font-medium text-gray-600 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-cyan-500" />
                      Email
                    </div>
                  </th>
                  <th className="text-left py-4 px-4 font-medium text-gray-600 text-sm">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-green-500" />
                      Business
                    </div>
                  </th>
                  <th className="text-left py-4 px-4 font-medium text-gray-600 text-sm">
                    <div className="flex items-center gap-2">
                      <BadgeCheck className="h-4 w-4 text-amber-600" />
                      GST no.
                    </div>
                  </th>
                  <th className="text-left py-4 px-4 font-medium text-gray-600 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-rose-500" />
                      Address
                    </div>
                  </th>
                  <th className="text-left py-4 px-4 font-medium text-gray-600 text-sm">
                    <div className="flex items-center gap-2">
                      <Map className="h-4 w-4 text-indigo-500" />
                      State
                    </div>
                  </th>
                  <th className="text-left py-4 px-4 font-medium text-gray-600 text-sm">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-violet-500" />
                      Product Type
                    </div>
                  </th>
                  <th className="text-left py-4 px-4 font-medium text-gray-600 text-sm">
                    <div className="flex items-center gap-2">
                      <BadgeCheck className="h-4 w-4 text-emerald-600" />
                      Connected Status
                    </div>
                  </th>
                  <th className="text-left py-4 px-4 font-medium text-gray-600 text-sm">
                    <div className="flex items-center gap-2">
                      <BadgeCheck className="h-4 w-4 text-blue-600" />
                      Final Status
                    </div>
                  </th>
                  <th className="text-left py-4 px-4 font-medium text-gray-600 text-sm">
                    <div className="flex items-center gap-2">
                      <LinkIcon className="h-4 w-4 text-blue-600" />
                      Follow Up Link
                    </div>
                  </th>
                  <th className="text-left py-4 px-4 font-medium text-gray-600 text-sm">
                    <div className="flex items-center gap-2">
                      <MessageCircle className="h-4 w-4 text-green-600" />
                      WhatsApp
                    </div>
                  </th>
                  <th className="text-left py-4 px-4 font-medium text-gray-600 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-cyan-600" />
                      Email
                    </div>
                  </th>
                  <th className="text-left py-4 px-4 font-medium text-gray-600 text-sm">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-purple-600" />
                      Quotation
                    </div>
                  </th>
                  <th className="text-left py-4 px-4 font-medium text-gray-600 text-sm">
                    <div className="flex items-center gap-2">
                      <Pencil className="h-4 w-4 text-gray-500" />
                      Action
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id} className="border-b border-gray-50 odd:bg-white even:bg-gray-50/40 hover:bg-white transition-colors">
                    <td className="py-4 px-4 text-sm font-medium text-gray-900">{customer.id}</td>
                    <td className="py-4 px-4">
                      <div>
                        <div className="font-medium text-gray-900 text-sm">{customer.name}</div>
                        <div className="text-xs text-gray-500">{customer.phone}</div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-700">{customer.email}</td>
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
                    <td className="py-4 px-4 text-sm text-blue-600 underline">
                      {customer.followUpLink ? (
                        <a href={customer.followUpLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1">
                          <LinkIcon className="h-3.5 w-3.5" /> Open
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="py-4 px-4 text-sm">
                      {customer.whatsapp ? (
                        <a href={`https://wa.me/${customer.whatsapp.replace(/[^\d]/g, "")}`} target="_blank" rel="noreferrer" className="text-green-600 underline inline-flex items-center gap-1">
                          <MessageCircle className="h-3.5 w-3.5" /> Chat
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="py-4 px-4 text-sm">
                      {customer.email && customer.email !== "N/A" ? (
                        <a href={`mailto:${customer.email}`} className="text-cyan-600 underline inline-flex items-center gap-1">
                          <Mail className="h-3.5 w-3.5" /> Send
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <button onClick={() => handleQuotation(customer)} className="px-2 py-1 rounded-md bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 text-xs inline-flex items-center gap-1">
                        <FileText className="h-3.5 w-3.5" />
                        View
                      </button>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <button onClick={() => handleEdit(customer)} className="p-1.5 rounded-md hover:bg-gray-100" aria-label="Edit">
                          <Pencil className="h-4 w-4 text-gray-600" />
                        </button>
                        <button onClick={() => handleView(customer)} className="p-1.5 rounded-md hover:bg-gray-100" aria-label="View">
                          <Eye className="h-4 w-4 text-gray-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
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
                        <span className="text-xs">{viewingCustomer.latestQuotationUrl ? (
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
                        <button className="px-3 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700 inline-flex items-center gap-2">Create Quotation</button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">Quotation Preview</h3>
                    <div className="rounded-md border border-gray-200 max-h-[320px] overflow-auto bg-white">
                      <Quotation />
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
    </main>
  )
}
