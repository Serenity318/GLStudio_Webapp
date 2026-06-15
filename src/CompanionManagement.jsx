import React, { useState } from 'react';
import './CompanionManagement.css';

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const CompanionManagement = () => {
  const [companions, setCompanions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    service: '',
    price: '',
    commission: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Add to state if basic validation passes
    if (formData.name && formData.service && formData.price && formData.commission) {
      setCompanions(prev => [...prev, { 
        id: Date.now(), 
        ...formData, 
        status: '在线' 
      }]);
      setFormData({ name: '', service: '', price: '', commission: '' });
      setIsModalOpen(false);
    } else {
      // In a real app we might show an error, but for the MVP we will just close or wait
      setIsModalOpen(false);
    }
  };

  return (
    <div className="cm-container">
      {/* Header Area */}
      <header className="cm-header-area">
        <div className="cm-header-left">
          <h1>陪陪管理</h1>
          <p>共 {companions.length} 位陪陪</p>
        </div>
        <button className="cm-add-btn" onClick={() => setIsModalOpen(true)}>
          + 新增陪陪
        </button>
      </header>

      {/* Data Table Container */}
      <div className="cm-table-container">
        <table className="cm-table">
          <thead>
            <tr>
              <th>姓名</th>
              <th>游戏 / 服务</th>
              <th>价格</th>
              <th>分成</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {companions.length === 0 ? (
              <tr>
                <td colSpan="6" className="cm-empty-state">
                  暂无陪陪，请添加
                </td>
              </tr>
            ) : (
              companions.map(comp => (
                <tr key={comp.id}>
                  <td>{comp.name}</td>
                  <td>{comp.service}</td>
                  <td>¥{comp.price}</td>
                  <td>{comp.commission}%</td>
                  <td><span className="cm-status-badge">{comp.status}</span></td>
                  <td>
                    <button className="cm-action-btn">编辑</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="cm-modal-overlay">
          <div className="cm-modal-box">
            <div className="cm-modal-header">
              <h2>新增陪陪</h2>
              <button className="cm-close-icon" onClick={() => setIsModalOpen(false)}>
                <CloseIcon />
              </button>
            </div>
            
            <div className="cm-modal-body">
              <div className="cm-form-group">
                <label>姓名</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="请输入姓名" 
                />
              </div>
              <div className="cm-form-group">
                <label>主玩游戏 / 服务</label>
                <input 
                  type="text" 
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  placeholder="王者荣耀 / 语音通话" 
                />
              </div>
              <div className="cm-form-grid">
                <div className="cm-form-group">
                  <label>价格（元/单）</label>
                  <input 
                    type="number" 
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="50" 
                  />
                </div>
                <div className="cm-form-group">
                  <label>默认分成（%）</label>
                  <input 
                    type="number" 
                    name="commission"
                    value={formData.commission}
                    onChange={handleInputChange}
                    placeholder="70" 
                  />
                </div>
              </div>
            </div>

            <div className="cm-modal-footer">
              <button className="cm-save-btn" onClick={handleSave}>保存</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanionManagement;
