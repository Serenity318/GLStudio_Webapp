import React, { useState } from 'react';
import './CompanionStatistics.css';

const CompanionStatistics = () => {
  const [statsData, setStatsData] = useState([]);

  return (
    <div className="cs-container">
      {/* Header Area */}
      <header className="cs-header-area">
        <h1>陪陪统计</h1>
        <p>按陪陪聚合的接单与分成数据</p>
      </header>

      {/* Data Table Container */}
      <div className="cs-table-container">
        <table className="cs-table">
          <thead>
            <tr>
              <th>陪陪</th>
              <th>总单量</th>
              <th>陪聊</th>
              <th>陪玩</th>
              <th>其他</th>
              <th>总营业额</th>
              <th>默认分成</th>
              <th>陪陪应发</th>
              <th>俱乐部利润</th>
              <th>平均评分</th>
            </tr>
          </thead>
          <tbody>
            {statsData.length === 0 ? (
              <tr>
                <td colSpan="10" className="cs-empty-state">
                  暂无数据
                </td>
              </tr>
            ) : (
              statsData.map((row, index) => (
                <tr key={index}>
                  <td>{row.companionName}</td>
                  <td>{row.totalOrders}</td>
                  <td>{row.chatOrders}</td>
                  <td>{row.playOrders}</td>
                  <td>{row.otherOrders}</td>
                  <td>¥{row.totalRevenue}</td>
                  <td>{row.commissionRate}%</td>
                  <td>¥{row.companionPay}</td>
                  <td>¥{row.clubProfit}</td>
                  <td>{row.avgRating}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompanionStatistics;
