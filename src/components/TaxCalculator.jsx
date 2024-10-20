import React, { useState, useEffect } from 'react';
import InputField from './InputField';
import DropdownField from './DropdownField';
import { calculateTaxRate, calculateCapitalGains, calculateNetCapitalGains, calculateTaxToPay } from '../utils/taxCalculations';
import imgss from "../assets/cryptooo.jpeg";

const TaxCalculator = () => {
  const [formData, setFormData] = useState({
    country: 'Australia',
    purchasePrice: 0,
    salePrice: 0,
    expenses: 0,
    investmentType: 'short',
    annualIncome: '0-18200',
  });

  const [results, setResults] = useState({
    taxRate: 0,
    capitalGains: 0,
    netCapitalGains: 0,
    taxToPay: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const incomeRanges = formData.country === 'Australia' 
      ? [18200, 45000, 120000, 180000] 
      : [12570, 50270, 150000];
    
    const taxRate = calculateTaxRate(
      parseInt(formData.annualIncome.split('-')[1] || formData.annualIncome.split('+')[0]),
      formData.country
    );
    const capitalGains = calculateCapitalGains(
      parseFloat(formData.salePrice),
      parseFloat(formData.purchasePrice),
      parseFloat(formData.expenses)
    );
    const netCapitalGains = calculateNetCapitalGains(capitalGains, formData.investmentType === 'long', formData.country);
    const taxToPay = calculateTaxToPay(netCapitalGains, taxRate);

    setResults({
      taxRate,
      capitalGains,
      netCapitalGains,
      taxToPay,
    });
  }, [formData]);

  const getIncomeOptions = () => {
    if (formData.country === 'Australia') {
      return [
        { value: '0-18200', label: '$0 - $18,200' },
        { value: '18201-45000', label: '$18,201 - $45,000' },
        { value: '45001-120000', label: '$45,001 - $120,000' },
        { value: '120001-180000', label: '$120,001 - $180,000' },
        { value: '180001+', label: '$180,001+' },
      ];
    } else {
      return [
        { value: '0-12570', label: '£0 - £12,570' },
        { value: '12571-50270', label: '£12,571 - £50,270' },
        { value: '50271-150000', label: '£50,271 - £150,000' },
        { value: '150001+', label: '£150,001+' },
      ];
    }
  };

  return (
    <div className='container'>
      <img className='imgsss' src={imgss} alt="" />
    <div className="tax-calculator" >
      
      <h1>Free Crypto Tax Calculator for {formData.country}</h1>
      <form>
        <DropdownField
          label="Country"
          name="country"
          value={formData.country}
          onChange={handleInputChange}
          options={[
            { value: 'Australia', label: 'Australia' },
            { value: 'UK', label: 'UK' },
          ]}
        />
        <InputField
          label="Purchase Price"
          name="purchasePrice"
          value={formData.purchasePrice}
          onChange={handleInputChange}
        />
        <InputField
          label="Sale Price"
          name="salePrice"
          value={formData.salePrice}
          onChange={handleInputChange}
        />
        <InputField
          label="Expenses"
          name="expenses"
          value={formData.expenses}
          onChange={handleInputChange}
        />
        <DropdownField
          label="Investment Type"
          name="investmentType"
          value={formData.investmentType}
          onChange={handleInputChange}
          options={[
            { value: 'short', label: 'Short Term' },
            { value: 'long', label: 'Long Term' },
          ]}
        />
        <DropdownField
          label="Annual Income"
          name="annualIncome"
          value={formData.annualIncome}
          onChange={handleInputChange}
          options={getIncomeOptions()}
        />
      </form>
      <div className="results">
        <p>Tax Rate: {(results.taxRate * 100).toFixed(2)}%</p>
        <p>Capital Gains: {formData.country === 'Australia' ? '$' : '£'}{results.capitalGains.toFixed(2)}</p>
        <p>Net Capital Gains: {formData.country === 'Australia' ? '$' : '£'}{results.netCapitalGains.toFixed(2)}</p>
        <p>Tax to Pay: {formData.country === 'Australia' ? '$' : '£'}{results.taxToPay.toFixed(2)}</p>
      </div>
    </div>
    </div>
  );
};

export default TaxCalculator;