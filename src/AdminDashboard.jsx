import React, { useState } from 'react';
import Dashboard from './Dashboard';
import CompanionManagement from './CompanionManagement';
import CompanionStatistics from './CompanionStatistics';
import CreateOrder from './CreateOrder';
import OrderList from './OrderList';
import SettlementCenter from './SettlementCenter';
import FinanceCenter from './FinanceCenter';
import './AdminDashboard.css';

const MENU_ITEMS = [
  { id: 'dashboard', label: '仪表盘', title: '仪表盘 - 业务实时概览' },
  { id: 'companions', label: '陪陪管理', title: '陪陪管理' },
  { id: 'stats', label: '陪陪统计', title: '陪陪统计' },
  { id: 'create_order', label: '创建订单', title: '创建订单' },
  { id: 'orders', label: '订单列表', title: '订单列表' },
  { id: 'settlement', label: '月结中心', title: '月结中心' },
  { id: 'finance', label: '财务中心', title: '财务中心' }
];

const AdminDashboard = () => {
  const [currentView, setCurrentView] = useState('dashboard');

  const currentItem = MENU_ITEMS.find(item => item.id === currentView) || MENU_ITEMS[0];

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h2>陪陪后台</h2>
        </div>
        <nav className="sidebar-nav">
          {MENU_ITEMS.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${currentView === item.id ? 'active' : ''}`}
              onClick={() => setCurrentView(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="admin-main">
        {currentView !== 'dashboard' && 
         currentView !== 'companions' && 
         currentView !== 'stats' && 
         currentView !== 'create_order' && 
         currentView !== 'orders' && 
         currentView !== 'settlement' && 
         currentView !== 'finance' && (
          <header className="main-header">
            <h1>{currentItem.title}</h1>
          </header>
        )}
        <div className="main-content">
          {currentView === 'dashboard' ? (
            <Dashboard />
          ) : currentView === 'companions' ? (
            <CompanionManagement />
          ) : currentView === 'stats' ? (
            <CompanionStatistics />
          ) : currentView === 'create_order' ? (
            <CreateOrder />
          ) : currentView === 'orders' ? (
            <OrderList onNavigateToCreateOrder={() => setCurrentView('create_order')} />
          ) : currentView === 'settlement' ? (
            <SettlementCenter />
          ) : currentView === 'finance' ? (
            <FinanceCenter />
          ) : (
            <div className="view-placeholder">
              暂无数据 (Placeholder for {currentItem.label})
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
