import { FaRupeeSign, FaRegMoneyBillAlt } from "react-icons/fa";
import { BiPaste } from "react-icons/bi";
import { APIURL } from "../../../url";

const apiUrl = APIURL;

const fetchDataFromBackend = async (date) => {
  try {
    const response = await fetch(`http://${apiUrl}/total_amounts_from_billing?date=${date}`);
    if (!response.ok) {
      return { totalAmount: 0, totalPaid: 0, totalPending: 0 };
    }
    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      const timer = setTimeout(fetchDataFromBackend, 2000);
      return () => clearTimeout(timer);
    }
  } catch {
    return { totalAmount: 0, totalPaid: 0, totalPending: 0 };
  }
};

const fetchMonthlyDataFromBackend = async (startDate, endDate) => {
  try {
    const response = await fetch(`http://${apiUrl}/monthly_data?startDate=${startDate}&endDate=${endDate}`);
    if (!response.ok) {
      return [];
    }
    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      const timer = setTimeout(fetchMonthlyDataFromBackend, 2000);
      return () => clearTimeout(timer);
    }
  } catch {
    return [];
  }
};

const calculatePercentageChange = (previousValue, currentValue) => {
  if (previousValue === 0) {
    return currentValue > 0 ? 100 : 0;
  }
  const percentageChange = ((currentValue - previousValue) / Math.abs(previousValue)) * 100;
  return percentageChange.toFixed(1);
};

const currentDate = new Date().toISOString();
const backendDataCurrent = await fetchDataFromBackend(currentDate);

const lastMonth = new Date();
lastMonth.setMonth(lastMonth.getMonth() - 1);
const lastMonthStart = new Date(lastMonth.getFullYear(), lastMonth.getMonth(), 1);
const lastMonthEnd = new Date(lastMonth.getFullYear(), lastMonth.getMonth() + 1, 0);
const lastMonthStartStr = lastMonthStart.toISOString().slice(0, 10);
const lastMonthEndStr = lastMonthEnd.toISOString().slice(0, 10);
const backendDataLastMonth = await fetchDataFromBackend(`${lastMonthStartStr}/${lastMonthEndStr}`);
const backendMonthlyData = await fetchMonthlyDataFromBackend(lastMonthStartStr, currentDate);

const lastMonthTotalAmount = backendDataLastMonth?.lastMonth?.totalAmount || 0;
const lastMonthTotalPaid = backendDataLastMonth?.lastMonth?.totalPaid || 0;
const lastMonthTotalPending = backendDataLastMonth?.lastMonth?.totalPending || 0;

const currentTotalAmount = backendDataCurrent?.current?.totalAmount || 0;
const currentTotalPaid = backendDataCurrent?.current?.totalPaid || 0;
const currentTotalPending = backendDataCurrent?.current?.totalPending || 0;

const totalAmountPercentageChange = calculatePercentageChange(
  lastMonthTotalAmount,
  currentTotalAmount
);
const totalPaidPercentageChange = calculatePercentageChange(
  lastMonthTotalPaid,
  currentTotalPaid
);
const totalPendingPercentageChange = calculatePercentageChange(
  lastMonthTotalPending,
  currentTotalPending
);

const salesData = backendMonthlyData.map(item => ({
  date: item.Billingdate,
  value: parseFloat(item.Totalamount) || 0,
}));

const revenueData = backendMonthlyData.map(item => ({
  date: item.Billingdate,
  value: parseFloat(item.paidamount) || 0,
}));

const pendingData = backendMonthlyData.map(item => ({
  date: item.Billingdate,
  value: parseFloat(item.pendingamount) || 0,
}));

export const cardsData = async () => {
  const cardData = [
    {
      title: "Sales",
      color: {
        backGround: "linear-gradient(rgb(33, 152, 171) 35%, rgb(143, 228, 241) 92%)",
        boxShadow: "0px 0px 0px 0px #e0c6f5",
      },
      barValue: totalAmountPercentageChange,
      value: currentTotalAmount.toLocaleString(),
      png: FaRupeeSign,
      series: [{ name: "Sales", data: salesData.map(data => data.value), categories: salesData.map(data => data.date) }],
    },
    {
      title: "Revenue",
      color: {
        backGround: "linear-gradient(rgb(226, 165, 90) 35%, rgb(236, 194, 142) 92%)",
        boxShadow: "0px 0px 0px 0px #FDC0C7",
      },
      barValue: totalPaidPercentageChange,
      value: currentTotalPaid.toLocaleString(),
      png: FaRegMoneyBillAlt,
      series: [{ name: "Revenue", data: revenueData.map(data => data.value), categories: revenueData.map(data => data.date) }],
    },
    {
      title: "Pending",
      color: {
        backGround: "linear-gradient(rgb(55, 55, 81) 35%, rgb(123 123 147) 92%)",
        boxShadow: "0px 0px 0px 0px #F9D59B",
      },
      barValue: totalPendingPercentageChange,
      value: currentTotalPending.toLocaleString(),
      png: BiPaste,
      series: [{ name: "Pending", data: pendingData.map(data => data.value), categories: pendingData.map(data => data.date) }],
    },
  ];
  return cardData;
};
