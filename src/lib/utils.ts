export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const downloadTxt = (filename: string, text: string) => {
  const element = document.createElement("a");
  const file = new Blob([text], {type: 'text/plain'});
  element.href = URL.createObjectURL(file);
  element.download = filename;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

export const trackMetric = (key: string, value: any = 1) => {
  try {
    const stats = JSON.parse(localStorage.getItem('tyt_metrics') || '{}');
    if (typeof value === 'number') {
      stats[key] = (stats[key] || 0) + value;
    } else {
      stats[key] = value;
    }
    localStorage.setItem('tyt_metrics', JSON.stringify(stats));
  } catch (e) {
    // ignore
  }
};

export const calculateMonthlyInstallment = (principal: number, months: number) => {
  // Using the rate from the footer: 28.17% EA = 2.09% MV
  const monthlyRate = 0.0209;
  if (months === 0) return principal;
  
  // Formula for fixed installment: P * (r * (1 + r)^n) / ((1 + r)^n - 1)
  const installment = principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
  return installment;
};
