// import { format } from 'date-fns';

export const formatCurrency = (value) => {
  return (!value ? 0 : value).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
};

export const formatPercentage = (value) => {
  return value ? parseFloat(value * 100).toFixed(1) + "%" : "N/A";
};

export const formatDate = (dateValue, includeTime = false) => {
  // let d = new Date(dateValue);
  // let s = format(d, includeTime ? 'd MMM yyyy HH:mm' : 'd MMM yyyy');
  return dateValue;
}

export const projects = [
  {
    _id: 122,
    title: "Fertilizers for season 2022",
    amountMin: 80,
    amountMax: 800,
    durationMin: 9,
    durationMax: 12,
    interestRate: 0.2,
    merchant: "AgriTech Co.",
    status: "eligible",
    eligibility: {
      amount: 250,
      duration: 9,
      interestRate: 0.2,
    },
    loans: []
  },
  {
    _id: 123,
    title: "Fertilizers for season 2023",
    amountMin: 100,
    amountMax: 1000,
    durationMin: 9,
    durationMax: 12,
    interestRate: 0.2,
    merchant: "AgriTech Co.",
    status: "disbursed",
    loans: [
      {
        _id: 987,
        amount: 200,
        interestRate: 0.2,
        totalDue: 240,
        repaid: 180,
        startDate: "2022-04-01",
        endDate: "2023-01-01",
        payments: [
          {
            date: "2022-10-12",
            amount: 90
          },
          {
            date: "2022-11-15",
            amount: 90
          }
        ]
      }
    ]
  },
]