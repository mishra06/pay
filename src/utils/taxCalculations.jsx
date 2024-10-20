export const calculateTaxRate = (annualIncome, country) => {
    if (country === 'Australia') {
      if (annualIncome <= 18200) return 0;
      if (annualIncome <= 45000) return 0.19;
      if (annualIncome <= 120000) return 0.325;
      if (annualIncome <= 180000) return 0.37;
      return 0.45;
    } else if (country === 'UK') {
      if (annualIncome <= 12570) return 0;
      if (annualIncome <= 50270) return 0.2;
      if (annualIncome <= 150000) return 0.4;
      return 0.45;
    }
  };
  
  export const calculateCapitalGains = (salePrice, purchasePrice, expenses) => {
    return salePrice - purchasePrice - expenses;
  };
  
  export const calculateNetCapitalGains = (capitalGains, isLongTerm, country) => {
    if (country === 'Australia' && isLongTerm && capitalGains > 0) {
      return capitalGains * 0.5;
    }
    return capitalGains;
  };
  
  export const calculateTaxToPay = (netCapitalGains, taxRate) => {
    return netCapitalGains * taxRate;
  };