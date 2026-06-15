import React, { useState } from 'react';
import './OrderList.css';

const OrderList = ({ onNavigateToCreateOrder }) => {
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState('全部状态');
  const [sourceFilter, setSourceFilter] = useState('全部来源');

  return (
    <div className="ol-container">
      {/* Header Area */}
      <header className="ol-header-area">
        <div className="ol-header-left">
          <h1>订单列表</h1>
          <p>共 {orders.length} 条订单</p>
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
            {orders.length === 0 ? (
              <tr>
                <td colSpan="8" className="ol-empty-state">
                  暂无订单
                </td>
              </tr>
            ) : (
              orders.map(order => (
                <tr key={order.id}>
                  <td>{order.orderId}</td>
                  <td>{order.customerName}</td>
                  <td>{order.type} / {order.project}</td>
                  <td>{order.source}</td>
                  <td>¥{order.amount}</td>
                  <td><span className="ol-status-badge">{order.status}</span></td>
                  <td>{order.creator}</td>
                  <td>{order.createdAt}</td>
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
