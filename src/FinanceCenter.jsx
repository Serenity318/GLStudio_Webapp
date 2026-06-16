import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import './FinanceCenter.css';

// SVG Icons
const TrendUpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
    <polyline points="17 6 23 6 23 12"></polyline>
  </svg>
);

const CoinsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8" cy="8" r="6"></circle>
    <path d="M18.09 10.37A6 6 0 1 1 10.34 18.9"></path>
    <path d="M7 6h1v4"></path>
    <path d="M16.7 14.4l2.8 1.6"></path>
  </svg>
);

const WalletIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path>
    <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path>
    <path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path>
  </svg>
);

const FinanceCenter = () => {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [platformProfit, setPlatformProfit] = useState(0);
  const [pendingSalary, setPendingSalary] = useState(0);

  useEffect(() => {
    const fetchFinancialData = async () => {
      try {
        const { data, error } = await supabase.from('orders').select('*');
        if (error) {
          console.error("Error fetching financial data:", error);
          return;
        }

        if (data) {
          const validOrders = data.filter(order => order.status !== '已取消');

          let revenue = 0;
          let profit = 0;
          let salary = 0;

          const currentMonth = new Date().getMonth();
          const currentYear = new Date().getFullYear();

          validOrders.forEach(order => {
            const amount = Number(order.amount) || 0;
            revenue += amount;

            const clubShare = Number(order.club_share) || 0;
            profit += amount * (clubShare / 100);

            const orderDate = new Date(order.created_at);
            if (orderDate.getMonth() === currentMonth && orderDate.getFullYear() === currentYear) {
              const compShare = Number(order.companion_share) || 0;
              salary += amount * (compShare / 100);
            }
          });

          setTotalRevenue(revenue);
          setPlatformProfit(profit);
          setPendingSalary(salary);
        }
      } catch (err) {
        console.error("Unexpected error fetching financial data:", err);
      }
    };

    fetchFinancialData();
  }, []);

  return (
    <div className="fc-container">
      {/* Header Area */}
      <header className="fc-header-area">
        <h1>财务中心</h1>
        <p>平台财务总览</p>
      </header>

      {/* Top Row (Financial Cards) */}
      <div className="fc-stats-grid">
        <div className="fc-stat-card">
          <div className="fc-stat-content">
            <h3 className="fc-stat-title">总营业额</h3>
            <div className="fc-stat-value">¥{totalRevenue.toFixed(2)}</div>
          </div>
          <div className="fc-stat-icon-wrapper bg-light-blue text-blue">
            <TrendUpIcon />
          </div>
        </div>

        <div className="fc-stat-card">
          <div className="fc-stat-content">
            <h3 className="fc-stat-title">平台利润</h3>
            <div className="fc-stat-value">¥{platformProfit.toFixed(2)}</div>
          </div>
          <div className="fc-stat-icon-wrapper bg-light-green text-green">
            <CoinsIcon />
          </div>
        </div>

        <div className="fc-stat-card">
          <div className="fc-stat-content">
            <h3 className="fc-stat-title">本月待发工资</h3>
            <div className="fc-stat-value">¥{pendingSalary.toFixed(2)}</div>
          </div>
          <div className="fc-stat-icon-wrapper bg-light-orange text-orange">
            <WalletIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceCenter;
