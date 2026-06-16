import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
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
  const [editingCompanionId, setEditingCompanionId] = useState(null);

  // Form states
  const [newCompanionName, setNewCompanionName] = useState('');
  const [newCompanionGames, setNewCompanionGames] = useState('');
  const [newCompanionPrice, setNewCompanionPrice] = useState('');
  const [newCompanionCommission, setNewCompanionCommission] = useState('70');

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCompanionId(null);
    setNewCompanionName('');
    setNewCompanionGames('');
    setNewCompanionPrice('');
    setNewCompanionCommission('70');
  };

  const handleEditClick = (companion) => {
    setNewCompanionName(companion.name);
    setNewCompanionGames(companion.games);
    setNewCompanionPrice(companion.price);
    setNewCompanionCommission(companion.commission_rate);
    setEditingCompanionId(companion.id);
    setIsModalOpen(true);
  };

  const fetchCompanions = async () => {
    try {
      const { data, error } = await supabase
        .from('companions')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      if (data) setCompanions(data);
    } catch (error) {
      console.error('Error fetching companions:', error);
    }
  };

  useEffect(() => {
    fetchCompanions();
  }, []);

  const handleAddCompanion = async () => {
    if (!newCompanionName.trim()) {
      alert('请输入姓名');
      return;
    }

    let error;

    if (editingCompanionId) {
      const { error: updateError } = await supabase.from('companions').update({
        name: newCompanionName,
        games: newCompanionGames,
        price: Number(newCompanionPrice) || 0,
        commission_rate: Number(newCompanionCommission) || 70
      }).eq('id', editingCompanionId);
      error = updateError;
    } else {
      const { error: insertError } = await supabase.from('companions').insert([{
        name: newCompanionName,
        games: newCompanionGames,
        price: Number(newCompanionPrice) || 0,
        commission_rate: Number(newCompanionCommission) || 70
      }]);
      error = insertError;
    }

    if (error) {
      console.error("Supabase Data Save Error:", error);
      alert(`保存失败: ${error.message}`);
      return;
    }

    closeModal();
    fetchCompanions();
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
                  <td>{comp.games}</td>
                  <td>¥{comp.price}</td>
                  <td>{comp.commission_rate}%</td>
                  <td><span className="cm-status-badge">在线</span></td>
                  <td>
                    <button 
                      className="cm-action-btn"
                      onClick={() => handleEditClick(comp)}
                      style={{ cursor: 'pointer' }}
                    >
                      编辑
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="cm-modal-overlay" onClick={closeModal}>
          <div className="cm-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="cm-modal-header">
              <h2>{editingCompanionId ? '编辑陪陪' : '新增陪陪'}</h2>
              <button className="cm-close-icon" onClick={closeModal}>
                <CloseIcon />
              </button>
            </div>
            
            <div className="cm-modal-body">
              <div className="cm-form-group">
                <label>姓名</label>
                <input 
                  type="text" 
                  value={newCompanionName}
                  onChange={(e) => setNewCompanionName(e.target.value)}
                  placeholder="请输入姓名" 
                />
              </div>
              <div className="cm-form-group">
                <label>主玩游戏 / 服务</label>
                <input 
                  type="text" 
                  value={newCompanionGames}
                  onChange={(e) => setNewCompanionGames(e.target.value)}
                  placeholder="王者荣耀 / 语音通话" 
                />
              </div>
              <div className="cm-form-grid">
                <div className="cm-form-group">
                  <label>价格（元/单）</label>
                  <input 
                    type="number" 
                    value={newCompanionPrice}
                    onChange={(e) => setNewCompanionPrice(e.target.value)}
                    placeholder="50" 
                  />
                </div>
                <div className="cm-form-group">
                  <label>默认分成（%）</label>
                  <input 
                    type="number" 
                    value={newCompanionCommission}
                    onChange={(e) => setNewCompanionCommission(e.target.value)}
                    placeholder="70" 
                  />
                </div>
              </div>
            </div>

            <div className="cm-modal-footer">
              <button className="cm-save-btn" onClick={handleAddCompanion}>保存</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanionManagement;
