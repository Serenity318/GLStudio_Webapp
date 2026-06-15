import React from 'react';
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
            <div className="fc-stat-value">¥0.00</div>
          </div>
          <div className="fc-stat-icon-wrapper bg-light-blue text-blue">
            <TrendUpIcon />
          </div>
        </div>

        <div className="fc-stat-card">
          <div className="fc-stat-content">
            <h3 className="fc-stat-title">平台利润</h3>
            <div className="fc-stat-value">¥0.00</div>
          </div>
          <div className="fc-stat-icon-wrapper bg-light-green text-green">
            <CoinsIcon />
          </div>
        </div>

        <div className="fc-stat-card">
          <div className="fc-stat-content">
            <h3 className="fc-stat-title">本月待发工资</h3>
            <div className="fc-stat-value">¥0.00</div>
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
