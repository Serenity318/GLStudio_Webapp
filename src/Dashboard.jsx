import React from 'react';
import './Dashboard.css';

// SVG Icons
const TrendUpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
    <polyline points="17 6 23 6 23 12"></polyline>
  </svg>
);

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const BagIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <path d="M16 10a4 4 0 0 1-8 0"></path>
  </svg>
);

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const CoffeeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
    <line x1="6" y1="1" x2="6" y2="4"></line>
    <line x1="10" y1="1" x2="10" y2="4"></line>
    <line x1="14" y1="1" x2="14" y2="4"></line>
  </svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
);

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Header Section */}
      <header className="dashboard-header">
        <h1>仪表盘</h1>
        <p>业务实时概览</p>
      </header>

      {/* Top Row (Financial Overview) */}
      <div className="stats-grid grid-4">
        <div className="stat-card">
          <div className="stat-content">
            <h3 className="stat-title">今日营业额</h3>
            <div className="stat-value">¥0.00</div>
            <div className="stat-subtext">0 单</div>
          </div>
          <div className="stat-icon-wrapper bg-light-green text-green">
            <TrendUpIcon />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-content">
            <h3 className="stat-title">本周营业额</h3>
            <div className="stat-value">¥0.00</div>
            <div className="stat-subtext">0 单</div>
          </div>
          <div className="stat-icon-wrapper bg-light-blue text-blue">
            <CalendarIcon />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-content">
            <h3 className="stat-title">本月营业额</h3>
            <div className="stat-value">¥0.00</div>
            <div className="stat-subtext">0 单</div>
          </div>
          <div className="stat-icon-wrapper bg-light-blue text-blue">
            <CalendarIcon />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-content">
            <h3 className="stat-title">今日订单数</h3>
            <div className="stat-value">0</div>
            <div className="stat-subtext">-</div>
          </div>
          <div className="stat-icon-wrapper bg-light-purple text-purple">
            <BagIcon />
          </div>
        </div>
      </div>

      {/* Middle Section Header */}
      <h2 className="section-header">陪陪在线状态</h2>

      {/* Bottom Row (Companion Status) */}
      <div className="stats-grid grid-3">
        <div className="stat-card">
          <div className="stat-content">
            <h3 className="stat-title">在线陪陪</h3>
            <div className="stat-value">0</div>
          </div>
          <div className="stat-icon-wrapper bg-light-green text-green">
            <UsersIcon />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-content">
            <h3 className="stat-title">请假陪陪</h3>
            <div className="stat-value">0</div>
          </div>
          <div className="stat-icon-wrapper bg-light-orange text-orange">
            <CoffeeIcon />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-content">
            <h3 className="stat-title">离线陪陪</h3>
            <div className="stat-value">0</div>
          </div>
          <div className="stat-icon-wrapper bg-light-gray text-gray">
            <MoonIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
