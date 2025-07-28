import React, { useState } from 'react';

function calculateEMI(P, r, n) {
  const monthlyRate = r / 12 / 100;
  const totalMonths = n * 12;
  const emi = P * monthlyRate * Math.pow(1 + monthlyRate, totalMonths) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
  const totalPayment = emi * totalMonths;
  const totalInterest = totalPayment - P;
  return {
    emi: Math.round(emi),
    totalInterest: Math.round(totalInterest),
    totalPayment: Math.round(totalPayment),
  };
}

function EMICalculator() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);
  const [result, setResult] = useState(null);

  const handleCalculate = (e) => {
    e.preventDefault();
    setResult(calculateEMI(principal, rate, tenure));
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 w-full">
      {/* Form */}
      <form
        className="bg-gray-50 border border-gray-200 rounded-2xl shadow p-8 flex-1 max-w-md"
        onSubmit={handleCalculate}
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-900">EMI Calculator</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Loan Amount (₹)</label>
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(Number(e.target.value))}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-200 outline-none"
            min={1}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Annual Interest Rate (%)</label>
          <input
            type="number"
            step="0.1"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-200 outline-none"
            min={0.1}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-1">Loan Tenure (Years)</label>
          <input
            type="number"
            value={tenure}
            onChange={(e) => setTenure(Number(e.target.value))}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-200 outline-none"
            min={1}
            required
          />
        </div>
       
<button
  type="submit"
  className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold text-lg hover:bg-gray-700 transition"
>
  Calculate
</button>

      </form>

      {/* Result */}
      <div className="flex-1 flex items-start justify-center">
        {result && (
          <div className="bg-blue-50 border border-blue-200 rounded-2xl shadow p-8 min-w-[260px] max-w-sm w-full">
            <h3 className="text-xl font-bold mb-4 text-blue-700">Result</h3>
            <div className="space-y-3 text-gray-900">
              <div>
                <span className="font-semibold">Monthly EMI:</span>
                <span className="ml-2 text-lg text-blue-700 font-bold">₹{result.emi.toLocaleString()}</span>
              </div>
              <div>
                <span className="font-semibold">Total Interest Payable:</span>
                <span className="ml-2">₹{result.totalInterest.toLocaleString()}</span>
              </div>
              <div>
                <span className="font-semibold">Total Payment:</span>
                <span className="ml-2">₹{result.totalPayment.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EMICalculator;