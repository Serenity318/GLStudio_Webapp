import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import './CompanionStatistics.css';

const CompanionStatistics = () => {
  const [statsData, setStatsData] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data: companions } = await supabase.from('companions').select('*');
        const { data: orders } = await supabase.from('orders').select('*').neq('status', '已取消');

        if (companions && orders) {
          const aggregated = companions.map(companion => {
            const companionOrders = orders.filter(o => o.companion_name === companion.name);

            let totalOrders = companionOrders.length;
            let chatOrders = 0;
            let playOrders = 0;
            let otherOrders = 0;
            let totalRevenue = 0;
            let companionPay = 0;
            let clubProfit = 0;

            companionOrders.forEach(o => {
              const serviceType = o.service_type || '';
              if (serviceType.includes('聊')) {
                chatOrders++;
              } else if (serviceType.includes('玩') || serviceType.includes('游戏')) {
                playOrders++;
              } else {
                otherOrders++;
              }

              const amount = Number(o.amount) || 0;
              totalRevenue += amount;
              companionPay += amount * ((Number(o.companion_share) || 0) / 100);
              clubProfit += amount * ((Number(o.club_share) || 0) / 100);
            });

            return {
              companionName: companion.name,
              totalOrders,
              chatOrders,
              playOrders,
              otherOrders,
              totalRevenue: totalRevenue.toFixed(2),
              commissionRate: companion.commission_rate || 70,
              companionPay: companionPay.toFixed(2),
              clubProfit: clubProfit.toFixed(2),
              avgRating: '5.0'
            };
          });

          setStatsData(aggregated);
        }
      } catch (error) {
        console.error('Error fetching companion stats:', error);
      }
    };

    fetchStats();
  }, []);

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
