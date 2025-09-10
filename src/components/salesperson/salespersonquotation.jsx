const Quotation = () => {
    return (
      <div className="max-w-4xl mx-auto bg-white p-6 font-sans text-sm">
        {/* Header */}
        <div className="border-2 border-black mb-4">
          {/* Removed header background color and updated company name and tagline */}
          <div className="p-2 flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold">ANODE ELECTRIC PVT. LTD.</h1>
              <p className="text-xs">MANUFACTURING & SUPPLY OF ELECTRICAL CABLES & WIRES</p>
            </div>
            <div className="text-right">
              <img
                src="https://res.cloudinary.com/drpbrn2ax/image/upload/v1757416761/logo2_kpbkwm-removebg-preview_jteu6d.png"
                alt="Anode Electric Logo"
                className="h-12 w-auto bg-white p-1 rounded"
              />
            </div>
          </div>
  
          <div className="p-3 bg-gray-50">
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <p>
                  <strong>KHASRA NO. 805/5, PLOT NO. 10, IT PARK</strong>
                </p>
                <p>BARGI HILLS, JABALPUR - 482003</p>
                <p>MADHYA PRADESH, INDIA</p>
              </div>
              <div className="text-right">
                <p>Tel: 6262002116, 6262002113</p>
                <p>Web: www.anocab.com</p>
                <p>Email: info@anocab.com</p>
              </div>
            </div>
          </div>
        </div>
  
        {/* Quotation Details */}
        <div className="border border-black mb-4">
          <div className="bg-gray-100 p-2 text-center font-bold">
            <h2>Quotation Details</h2>
          </div>
          {/* Removed Reverse Charge column and changed Quotation No. to Revised Quotation */}
          <div className="grid grid-cols-5 gap-2 p-2 text-xs border-b">
            <div>
              <strong>Quotation Detail</strong>
            </div>
            <div>
              <strong>Revised Quotation</strong>
            </div>
            <div>
              <strong>Quotation Date</strong>
            </div>
            <div>
              <strong>Customer ID</strong>
            </div>
            <div>
              <strong>Valid Upto</strong>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-2 p-2 text-xs">
            <div>Final Quotation</div>
            <div>ANO/25-26/458</div>
            <div>08/09/2025</div>
            <div>145</div>
            <div>2 DAYS</div>
          </div>
        </div>
  
        {/* Customer Information */}
        <div className="border border-black mb-4">
          <div className="grid grid-cols-2 gap-4 p-3 text-xs">
            <div>
              <h3 className="font-bold mb-2">BILL TO:</h3>
              <p>
                <strong>Das Industrial Controls</strong>
              </p>
              <p>Panvel, Maharashtra, India</p>
              <p>
                <strong>PHONE:</strong> 7039542259
              </p>
              <p>
                <strong>GSTIN:</strong> 27DVTPS2973B1Z0
              </p>
              <p>
                <strong>State:</strong> Maharashtra (27)
              </p>
            </div>
            <div>
              <p>
                <strong>L.R. No:</strong> -
              </p>
              <p>
                <strong>Transport:</strong> STAR TRANSPORTS
              </p>
              <p>
                <strong>Transport ID:</strong> 562345
              </p>
              <p>
                <strong>Vehicle Number:</strong> GJ01HJ2520
              </p>
            </div>
          </div>
        </div>
  
        {/* Product Details Table */}
        <div className="border border-black mb-4">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2 text-left">Sr. No.</th>
                <th className="border border-gray-300 p-2 text-left">Name of Product / Service</th>
                <th className="border border-gray-300 p-2 text-left">HSN / SAC</th>
                <th className="border border-gray-300 p-2 text-left">Qty</th>
                {/* Changed Rate to Unit */}
                <th className="border border-gray-300 p-2 text-left">Unit</th>
                <th className="border border-gray-300 p-2 text-left">Taxable Value</th>
                <th className="border border-gray-300 p-2 text-left">CGST</th>
                <th className="border border-gray-300 p-2 text-left">SGST</th>
                <th className="border border-gray-300 p-2 text-left">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">1</td>
                <td className="border border-gray-300 p-2">ACSR Dog Conductor</td>
                <td className="border border-gray-300 p-2">76042910</td>
                <td className="border border-gray-300 p-2">120,000 MTR</td>
                <td className="border border-gray-300 p-2">82.00</td>
                <td className="border border-gray-300 p-2">9,840,000</td>
                <td className="border border-gray-300 p-2">9% 886,200</td>
                <td className="border border-gray-300 p-2">9% 886,200</td>
                <td className="border border-gray-300 p-2">11,612,400</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">2</td>
                <td className="border border-gray-300 p-2">AAAC Panther 232 SQMM</td>
                <td className="border border-gray-300 p-2">85446090</td>
                <td className="border border-gray-300 p-2">120,000 MTR</td>
                <td className="border border-gray-300 p-2">205.00</td>
                <td className="border border-gray-300 p-2">24,600,000</td>
                <td className="border border-gray-300 p-2">9% 2,214,000</td>
                <td className="border border-gray-300 p-2">9% 2,214,000</td>
                <td className="border border-gray-300 p-2">29,028,000</td>
              </tr>
              {/* Empty rows for spacing */}
              {[...Array(8)].map((_, i) => (
                <tr key={i} className="h-8">
                  <td className="border border-gray-300 p-2"></td>
                  <td className="border border-gray-300 p-2"></td>
                  <td className="border border-gray-300 p-2"></td>
                  <td className="border border-gray-300 p-2"></td>
                  <td className="border border-gray-300 p-2"></td>
                  <td className="border border-gray-300 p-2"></td>
                  <td className="border border-gray-300 p-2"></td>
                  <td className="border border-gray-300 p-2"></td>
                  <td className="border border-gray-300 p-2"></td>
                </tr>
              ))}
              <tr className="bg-gray-100 font-bold">
                <td className="border border-gray-300 p-2" colSpan="5">
                  Total
                </td>
                <td className="border border-gray-300 p-2">34,440,000</td>
                <td className="border border-gray-300 p-2">3,100,200</td>
                <td className="border border-gray-300 p-2">3,100,200</td>
                <td className="border border-gray-300 p-2">40,640,400</td>
              </tr>
            </tbody>
          </table>
        </div>
  
        {/* Amount Summary */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="border border-black p-3">
            <h3 className="font-bold text-xs mb-2">Bank Details</h3>
            <div className="text-xs space-y-1">
              <p>
                <strong>Bank Name:</strong> ICICI Bank
              </p>
              <p>
                <strong>Branch Name:</strong> WRIGHT TOWN JABALPUR
              </p>
              <p>
                <strong>Bank Account Number:</strong> 657605601783
              </p>
              <p>
                <strong>Bank Branch IFSC:</strong> ICIC0006576
              </p>
            </div>
          </div>
          <div className="border border-black p-3">
            <div className="text-xs space-y-1">
              <div className="flex justify-between">
                <span>Taxable Amount</span>
                <span>34,440,000</span>
              </div>
              <div className="flex justify-between">
                <span>Add: CGST</span>
                <span>3,100,200</span>
              </div>
              <div className="flex justify-between">
                <span>Add: SGST</span>
                <span>3,100,200</span>
              </div>
              <div className="flex justify-between font-bold border-t pt-1">
                <span>Total Amount After Tax</span>
                <span>₹ 40,640,400</span>
              </div>
              <div className="text-center mt-2">
                <span className="text-xs">(Rupees Four Crore Six Lakh Forty Thousand Four Hundred Only)</span>
              </div>
            </div>
          </div>
        </div>
  
        {/* Terms and Conditions */}
        <div className="border border-black mb-4">
          <div className="bg-gray-100 p-2 font-bold text-xs">
            <h3>Terms and Conditions</h3>
          </div>
          <div className="p-3 text-xs space-y-2">
            <div>
              <h4 className="font-bold">PRICING & VALIDITY</h4>
              <p>
                • Prices are valid for 3 days only from the date of the final quotation/PI unless otherwise specified
                terms.
              </p>
              <p>• The order will be considered confirmed only upon receipt of the advance payment.</p>
            </div>
            <div>
              <h4 className="font-bold">PAYMENT TERMS</h4>
              <p>• 30% advance payment upon order confirmation</p>
              <p>• Remaining Balance at time of final dispatch / against LC / Bank Guarantee (if applicable).</p>
              <p>
                • Liquidated Damages @ 0.5% to 1% per WEEK will be charged on delayed payments beyond the agreed terms.
              </p>
            </div>
            <div>
              <h4 className="font-bold">DELIVERY & DISPATCH</h4>
              <p>• Standard delivery period as per the telecommunication with customer.</p>
              <p>
                • Any delays due to unforeseen circumstances (force majeure, strikes, and transportation issues) will be
                communicated.
              </p>
            </div>
            <div>
              <h4 className="font-bold">QUALITY & WARRANTY</h4>
              <p>
                • Cables will be supplied as per IS and other applicable BIS standards/or as per the agreed specifications
                mentioned/special demand by the customer.
              </p>
              <p>• Any manufacturing defects should be reported immediately, within 3 working days of receipt.</p>
              <p>• Warranty: 12 months from the date of dispatch for manufacturing defects only in ISI mark products.</p>
            </div>
          </div>
        </div>
  
        {/* Footer */}
        <div className="text-right text-xs">
          <p className="mb-4">
            For <strong>ANODE ELECTRIC PRIVATE LIMITED</strong>
          </p>
          <p className="mb-8">This is computer generated invoice no signature required.</p>
          <p className="font-bold">Authorized Signatory</p>
        </div>
      </div>
    )
  }
  
  export default Quotation
  