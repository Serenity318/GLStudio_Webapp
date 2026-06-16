import React, { useState } from 'react';
import { LayoutDashboard, Users, PlusCircle, List, Calendar, DollarSign, LogOut, Menu, BarChart3 } from 'lucide-react';
import Dashboard from './Dashboard';
import CompanionManagement from './CompanionManagement';
import CompanionStatistics from './CompanionStatistics';
import CreateOrder from './CreateOrder';
import OrderList from './OrderList';
import SettlementCenter from './SettlementCenter';
import FinanceCenter from './FinanceCenter';
import './AdminDashboard.css';

const MENU_ITEMS = [
  { id: 'dashboard', label: '仪表盘', title: '仪表盘 - 业务实时概览', icon: LayoutDashboard },
  { id: 'companions', label: '陪陪管理', title: '陪陪管理', icon: Users },
  { id: 'stats', label: '陪陪统计', title: '陪陪统计', icon: BarChart3 },
  { id: 'create_order', label: '创建订单', title: '创建订单', icon: PlusCircle },
  { id: 'orders', label: '订单列表', title: '订单列表', icon: List },
  { id: 'settlement', label: '月结中心', title: '月结中心', icon: Calendar },
  { id: 'finance', label: '财务中心', title: '财务中心', icon: DollarSign }
];

const AdminDashboard = ({ currentUser, onLogout }) => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const currentItem = MENU_ITEMS.find(item => item.id === currentView) || MENU_ITEMS[0];

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <button 
            className="toggle-btn" 
            onClick={() => setIsCollapsed(!isCollapsed)}
            title="Toggle Sidebar"
          >
            <Menu size={20} />
          </button>
          {!isCollapsed && <h2>陪陪后台</h2>}
        </div>
        <nav className="sidebar-nav">
          {MENU_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`nav-item ${currentView === item.id ? 'active' : ''}`}
                onClick={() => setCurrentView(item.id)}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon size={20} />
                {!isCollapsed && <span style={{ marginLeft: '12px' }}>{item.label}</span>}
              </button>
            );
          })}
        </nav>
        <div className="sidebar-footer">
          {!isCollapsed && <div className="user-info">当前账号: {currentUser?.username}</div>}
          <button 
            className="logout-btn"
            onClick={onLogout} 
            title={isCollapsed ? '退出登录' : undefined}
          >
            <LogOut size={20} />
            {!isCollapsed && <span style={{ marginLeft: '12px' }}>退出登录</span>}
          </button>
        </div>
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
            <OrderList currentUser={currentUser} onNavigateToCreateOrder={() => setCurrentView('create_order')} />
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
