import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import './OrderList.css';

const OrderList = ({ currentUser, onNavigateToCreateOrder }) => {
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState('全部状态');
  const [sourceFilter, setSourceFilter] = useState('全部来源');

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error(error);
    } else {
      setOrders(data || []);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    const { error } = await supabase.from('orders').update({ status: newStatus }).eq('id', orderId);
    if (error) {
      alert(error.message);
    } else {
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(order => {
    const matchStatus = statusFilter === '全部状态' || order.status === statusFilter;
    const matchSource = sourceFilter === '全部来源' || order.source === sourceFilter;
    return matchStatus && matchSource;
  });

  return (
    <div className="ol-container">
      {/* Header Area */}
      <header className="ol-header-area">
        <div className="ol-header-left">
          <h1>订单列表</h1>
          <p>共 {filteredOrders.length} 条订单</p>
        </div>
        <div className="ol-header-right">
          <select 
            className="ol-filter-select" 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="全部状态">全部状态</option>
            <option value="待付款">待付款</option>
            <option value="已付款">已付款</option>
            <option value="进行中">进行中</option>
            <option value="已完成">已完成</option>
            <option value="已取消">已取消</option>
          </select>
          <select 
            className="ol-filter-select" 
            value={sourceFilter} 
            onChange={(e) => setSourceFilter(e.target.value)}
          >
            <option value="全部来源">全部来源</option>
            <option value="Facebook">Facebook</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="Telegram">Telegram</option>
            <option value="Discord">Discord</option>
            <option value="小红书">小红书</option>
            <option value="回头客">回头客</option>
            <option value="其他">其他</option>
          </select>
          <button className="ol-create-btn" onClick={onNavigateToCreateOrder}>
            新建订单
          </button>
        </div>
      </header>

      {/* Data Table */}
      <div className="ol-table-container">
        <table className="ol-table">
          <thead>
            <tr>
              <th>订单编号</th>
              <th>顾客</th>
              <th>类型/项目</th>
              <th>来源</th>
              <th>金额</th>
              <th>状态</th>
              <th>创建人</th>
              <th>创建时间</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan="8" className="ol-empty-state">
                  暂无订单
                </td>
              </tr>
            ) : (
              filteredOrders.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customer_name}</td>
                  <td>{order.service_type} / {order.project_name}</td>
                  <td>{order.source}</td>
                  <td>¥{order.amount}</td>
                  <td>
                    {currentUser?.role === 'admin' ? (
                      <select
                        value={order.status || '待付款'}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className="ol-status-badge"
                        style={{
                          backgroundColor: '#e6f2ff',
                          color: '#007bff',
                          padding: '4px 8px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: '500',
                          border: 'none',
                          outline: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        <option value="待付款">待付款</option>
                        <option value="已付款">已付款</option>
                        <option value="进行中">进行中</option>
                        <option value="已完成">已完成</option>
                        <option value="已取消">已取消</option>
                      </select>
                    ) : (
                      <span 
                        className="ol-status-badge"
                        style={{
                          backgroundColor: '#e6f2ff',
                          color: '#007bff',
                          padding: '4px 8px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: '500'
                        }}
                      >
                        {order.status || '待付款'}
                      </span>
                    )}
                  </td>
                  <td>{order.creator || 'admin'}</td>
                  <td>{new Date(order.created_at).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;
