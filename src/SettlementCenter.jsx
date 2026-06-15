import React, { useState } from 'react';
import './SettlementCenter.css';

const getTodayDateString = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getCurrentMonthString = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
};

const SettlementCenter = () => {
  const [settlementType, setSettlementType] = useState('weekly');
  const [startDate, setStartDate] = useState(getTodayDateString());
  const [endDate, setEndDate] = useState(getTodayDateString());
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonthString());
  const [settlementData, setSettlementData] = useState([]);

  const setThisWeek = () => {
    setStartDate(getTodayDateString());
  };

  const renderInputs = () => {
    if (settlementType === 'weekly') {
      return (
        <div className="sc-input-group">
          <label>本周起始日</label>
          <div className="sc-input-with-btn">
            <input 
              type="date" 
              value={startDate} 
              onChange={(e) => setStartDate(e.target.value)} 
            />
            <button className="sc-shortcut-btn" onClick={setThisWeek}>本周</button>
          </div>
        </div>
      );
    }
    if (settlementType === 'monthly') {
      return (
        <div className="sc-input-group">
          <label>月份</label>
          <input 
            type="month" 
            value={selectedMonth} 
            onChange={(e) => setSelectedMonth(e.target.value)} 
          />
        </div>
      );
    }
    if (settlementType === 'custom') {
      return (
        <div className="sc-custom-inputs">
          <div className="sc-input-group">
            <label>开始</label>
            <input 
              type="date" 
              value={startDate} 
              onChange={(e) => setStartDate(e.target.value)} 
            />
          </div>
          <div className="sc-input-group">
            <label>结束</label>
            <input 
              type="date" 
              value={endDate} 
              onChange={(e) => setEndDate(e.target.value)} 
            />
          </div>
        </div>
      );
    }
  };

  const renderHelperText = () => {
    if (settlementType === 'weekly') {
      return `区间：${startDate || 'YYYY-MM-DD'} 起 7 天`;
    }
    if (settlementType === 'monthly') {
      return `区间：${selectedMonth || 'YYYY-MM'}`;
    }
    if (settlementType === 'custom') {
      return `区间：${startDate || 'YYYY-MM-DD'} -> ${endDate || 'YYYY-MM-DD'}`;
    }
  };

  return (
    <div className="sc-container">
      {/* Header Area */}
      <header className="sc-header-area">
        <h1>月结中心</h1>
        <p>支持周结、月结与自定义区间</p>
      </header>

      {/* Controls Section */}
      <div className="sc-controls-section">
        {/* Segmented Control */}
        <div className="sc-segmented-control">
          <button 
            className={`sc-segment-btn ${settlementType === 'weekly' ? 'active' : ''}`}
            onClick={() => setSettlementType('weekly')}
          >
            周结
          </button>
          <button 
            className={`sc-segment-btn ${settlementType === 'monthly' ? 'active' : ''}`}
            onClick={() => setSettlementType('monthly')}
          >
            月结
          </button>
          <button 
            className={`sc-segment-btn ${settlementType === 'custom' ? 'active' : ''}`}
            onClick={() => setSettlementType('custom')}
          >
            自定义
          </button>
        </div>

        {/* Dynamic Inputs */}
        <div className="sc-dynamic-inputs">
          {renderInputs()}
        </div>

        {/* Helper Text */}
        <div className="sc-helper-text">
          {renderHelperText()}
        </div>
      </div>

      {/* Data Table */}
      <div className="sc-table-container">
        <table className="sc-table" width="100%">
          <thead>
            <tr>
              <th>陪陪</th>
              <th>游戏</th>
              <th>接单数</th>
              <th>营业额</th>
              <th>平均评分</th>
              <th>应发工资</th>
            </tr>
          </thead>
          <tbody>
            {settlementData.length === 0 ? (
              <tr>
                <td colSpan="6" className="sc-empty-state">
                  暂无数据
                </td>
              </tr>
            ) : (
              settlementData.map((item, index) => (
                <tr key={index}>
                  <td>{item.companion}</td>
                  <td>{item.game}</td>
                  <td>{item.orderCount}</td>
                  <td>¥{item.revenue}</td>
                  <td>{item.avgRating}</td>
                  <td>¥{item.payableSalary}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SettlementCenter;
