import React, { useState, useEffect } from 'react';
import './CreateOrder.css';

const generateOrderId = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const randomStr = Math.floor(1000 + Math.random() * 9000);
  return `PP${year}${month}${day}${randomStr}`;
};

const CreateOrder = () => {
  const [formData, setFormData] = useState({
    orderId: '',
    customerName: '',
    serviceType: '陪玩',
    projectName: '王者荣耀',
    orderSource: 'Facebook',
    amount: '',
    companionShare: 70,
    clubShare: 30,
    remarks: ''
  });

  useEffect(() => {
    setFormData(prev => ({ ...prev, orderId: generateOrderId() }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAutoGenerate = () => {
    setFormData(prev => ({ ...prev, orderId: generateOrderId() }));
  };

  const displayAmount = formData.amount ? Number(formData.amount).toFixed(2) : '0.00';

  return (
    <div className="co-container">
      {/* Header */}
      <header className="co-header">
        <h1>创建订单</h1>
        <p>填写订单信息</p>
      </header>

      {/* Main Content Area */}
      <div className="co-content">
        {/* Card 1: Basic Information */}
        <section className="co-card">
          <div className="co-card-header">
            <h2>基本信息</h2>
          </div>
          <div className="co-card-body">
            <div className="co-form-grid">
              {/* Row 1 */}
              <div className="co-form-group">
                <label>订单编号</label>
                <div className="co-input-with-button">
                  <input 
                    type="text" 
                    name="orderId" 
                    value={formData.orderId} 
                    onChange={handleChange} 
                  />
                  <button type="button" className="co-auto-btn" onClick={handleAutoGenerate}>
                    自动
                  </button>
                </div>
              </div>
              <div className="co-form-group">
                <label>顾客昵称</label>
                <input 
                  type="text" 
                  name="customerName" 
                  placeholder="例如：小明"
                  value={formData.customerName}
                  onChange={handleChange}
                />
              </div>

              {/* Row 2 */}
              <div className="co-form-group">
                <label>服务类型</label>
                <select name="serviceType" value={formData.serviceType} onChange={handleChange}>
                  <option value="陪玩">陪玩</option>
                  <option value="陪聊">陪聊</option>
                  <option value="小栈">小栈</option>
                </select>
              </div>
              <div className="co-form-group">
                <label>项目名称</label>
                <select name="projectName" value={formData.projectName} onChange={handleChange}>
                  <option value="王者荣耀">王者荣耀</option>
                  <option value="和平精英">和平精英</option>
                  <option value="金铲铲">金铲铲</option>
                  <option value="LOL">LOL</option>
                  <option value="其他">其他</option>
                </select>
              </div>

              {/* Row 3 */}
              <div className="co-form-group">
                <label>订单来源</label>
                <select name="orderSource" value={formData.orderSource} onChange={handleChange}>
                  <option value="Facebook">Facebook</option>
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="Telegram">Telegram</option>
                  <option value="Discord">Discord</option>
                  <option value="小红书">小红书</option>
                  <option value="回头客">回头客</option>
                  <option value="其他">其他</option>
                </select>
              </div>
              <div className="co-form-group">
                <label>订单金额（元）</label>
                <input 
                  type="number" 
                  name="amount" 
                  placeholder="手动输入金额"
                  value={formData.amount}
                  onChange={handleChange}
                />
              </div>

              {/* Row 4 */}
              <div className="co-form-group">
                <label>陪陪分成（%）</label>
                <input 
                  type="number" 
                  name="companionShare" 
                  value={formData.companionShare}
                  onChange={handleChange}
                />
              </div>
              <div className="co-form-group">
                <label>俱乐部分成（%）</label>
                <input 
                  type="number" 
                  name="clubShare" 
                  value={formData.clubShare}
                  onChange={handleChange}
                />
              </div>

              {/* Row 5 */}
              <div className="co-form-group co-full-width">
                <label>备注（可选）</label>
                <textarea 
                  name="remarks" 
                  rows="3" 
                  placeholder="输入备注信息..."
                  value={formData.remarks}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Card 2: Select Companions */}
        <section className="co-card">
          <div className="co-card-header">
            <h2>选择陪陪（可多选，可不选）</h2>
          </div>
          <div className="co-card-body">
            <div className="co-empty-state">
              暂无陪陪
            </div>
          </div>
        </section>
      </div>

      {/* Bottom Sticky Bar */}
      <div className="co-sticky-bar">
        <div className="co-bar-left">
          <span className="co-amount-label">订单金额</span>
          <span className="co-amount-value">¥{displayAmount}</span>
        </div>
        <button className="co-submit-btn">
          创建订单
        </button>
      </div>
    </div>
  );
};

export default CreateOrder;
