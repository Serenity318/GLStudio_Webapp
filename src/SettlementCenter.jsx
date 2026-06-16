import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from './supabaseClient';
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

const getDateRange = (type, start, end, month) => {
  let sDate, eDate;
  if (type === 'weekly') {
    sDate = new Date(`${start}T00:00:00`);
    eDate = new Date(sDate);
    eDate.setDate(eDate.getDate() + 7);
    eDate.setHours(23, 59, 59, 999);
  } else if (type === 'monthly') {
    const [year, m] = month.split('-');
    sDate = new Date(year, parseInt(m) - 1, 1, 0, 0, 0);
    eDate = new Date(year, parseInt(m), 0, 23, 59, 59, 999);
  } else {
    sDate = new Date(`${start}T00:00:00`);
    eDate = new Date(`${end}T23:59:59`);
  }
  return {
    startDateTimeISO: sDate.toISOString(),
    endDateTimeISO: eDate.toISOString()
  };
};

const SettlementCenter = () => {
  const [settlementType, setSettlementType] = useState('weekly');
  const [startDate, setStartDate] = useState(getTodayDateString());
  const [endDate, setEndDate] = useState(getTodayDateString());
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonthString());
  const [settlementData, setSettlementData] = useState([]);

  const calculateSettlement = useCallback(async () => {
    try {
      if (!startDate && settlementType === 'weekly') return;
      if (!selectedMonth && settlementType === 'monthly') return;
      if ((!startDate || !endDate) && settlementType === 'custom') return;

      const { startDateTimeISO, endDateTimeISO } = getDateRange(settlementType, startDate, endDate, selectedMonth);

      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .gte('created_at', startDateTimeISO)
        .lte('created_at', endDateTimeISO);

      if (error) {
        console.error("Error fetching orders for settlement:", error);
        return;
      }

      if (data) {
        const aggregated = {};
        data.forEach(order => {
          const compName = order.companion_name || '未知陪陪';
          if (!aggregated[compName]) {
            aggregated[compName] = { companion_name: compName, 接单数: 0, 营业额: 0, 应发工资: 0 };
          }
          aggregated[compName].接单数 += 1;
          aggregated[compName].营业额 += Number(order.amount) || 0;
          const share = Number(order.companion_share) || 0;
          aggregated[compName].应发工资 += (Number(order.amount) || 0) * (share / 100);
        });
        setSettlementData(Object.values(aggregated));
      }
    } catch (err) {
      console.error("Unexpected error in calculateSettlement:", err);
    }
  }, [settlementType, startDate, endDate, selectedMonth]);

  useEffect(() => {
    calculateSettlement();
  }, [calculateSettlement]);

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
                  <td>{item.companion_name}</td>
                  <td>-</td>
                  <td>{item.接单数}</td>
                  <td>¥{item.营业额.toFixed(2)}</td>
                  <td>5.0</td>
                  <td>¥{item.应发工资.toFixed(2)}</td>
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
