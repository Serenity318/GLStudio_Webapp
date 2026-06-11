import { useState } from 'react';
import './Roster.css';

const mockCompanions = [
  { 
    id: 1, 
    name: "GL.小炸弹", 
    gender: "女生", 
    role: "娱乐陪",
    age: 21, 
    location: "KL", 
    zodiac: "魔蝎座", 
    tags: ["反差甜妹", "随机应变"], 
    games: ["和平精英"],  
    gamePlaystyle: "超体 (幻影/奶妈/次元)", 
    services: ["哄睡", "虚拟恋人", "头像", "语音"], 
    quote: "只是一枚不会炸的缩水炸弹 平时不会炸的除非忍不住", 
    avatarUrl: "https://via.placeholder.com/150", 
    audioUrl: "https://www.w3schools.com/html/horse.mp3" 
  },
  { 
    id: 2, 
    name: "GL.念念", 
    gender: "女生", 
    role: "娱乐陪",
    age: 18, 
    location: "KL", 
    zodiac: "金牛座", 
    tags: ["可甜可咸"], 
    games: ["王者荣耀", "Valorant （PC）"], 
    services: ["娱乐陪", "陪聊", "语音", "唱歌", "虚拟恋人"], 
    quote: "声音可甜可咸，有没有兴趣解锁一下呢？", 
    avatarUrl: "https://via.placeholder.com/150", 
    audioUrl: "https://www.w3schools.com/html/horse.mp3"  
  },
  { 
    id: 3, 
    name: "GL.小初", 
    gender: "男生", 
    role: "技术陪",
    age: 22, 
    location: "霹雳", 
    zodiac: "巨蟹座", 
    tags: ["温柔"], 
    games: ["和平精英", "Valorant （无畏契约）", "CSGO"], 
    services: ["和平技术陪", "无畏契约技术陪", "头像", "陪聊"], 
    quote: "从始至终，你的身边还有我呢，我在GL等你哦。", 
    avatarUrl: "./xiaochu-avatar.jpg", 
    audioUrl: "./xiaochu-recording.mpeg" 
  },
  { 
    id: 4, 
    name: "GL.熙", 
    gender: "男生", 
    role: "技娱陪",
    age: 19, 
    location: "KL", 
    zodiac: "金牛座", 
    tags: ["开朗", "话痨"], 
    games: ["Honor of Kings", "PUBG", "Valorant （无畏契约）", "MLBB"], 
    services: ["陪聊", "语音", "虚拟恋人", "头像", "叫醒"], 
    quote: "从始至终，你的身边还有我呢，我在GL等你哦。", 
    avatarUrl: "./xi-avatar.jpg", 
    audioUrl: "./xi-recording.mpeg" 
  }
];

export default function Roster() {
  const [genderFilter, setGenderFilter] = useState('全部');
  const [roleFilter, setRoleFilter] = useState('全部');
  const [gameFilter, setGameFilter] = useState('全部');
  const [serviceFilter, setServiceFilter] = useState('全部');
  const [selectedProfile, setSelectedProfile] = useState(null);

  const filteredCompanions = mockCompanions.filter(companion => {
    const matchesGender = genderFilter === '全部' || companion.gender === genderFilter;
    const matchesRole = roleFilter === '全部' || companion.role === roleFilter;
    const matchesGame = gameFilter === '全部' || (companion.games && companion.games.includes(gameFilter));
    const matchesService = serviceFilter === '全部' || (companion.services && companion.services.includes(serviceFilter));
    
    return matchesGender && matchesRole && matchesGame && matchesService;
  });

  return (
    <div className="roster-container">
      <h2>游戏陪玩名录</h2>
      
      <div className="filters">
        <label>
          性别:
          <select value={genderFilter} onChange={e => setGenderFilter(e.target.value)}>
            <option value="全部">全部</option>
            <option value="男生">男生</option>
            <option value="女生">女生</option>
          </select>
        </label>

        <label>
          岗位:
          <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)}>
            <option value="全部">全部</option>
            <option value="娱乐陪">娱乐陪</option>
            <option value="技术陪">技术陪</option>
            <option value="技娱陪">技娱陪</option>
          </select>
        </label>

        <label>
            游戏:
            <select value={gameFilter} onChange={e => setGameFilter(e.target.value)}>
              <option value="全部">全部</option>
              <option value="王者荣耀">王者荣耀</option>
              <option value="Honor of Kings">Honor of Kings</option>
              <option value="和平精英">和平精英</option>
              <option value="PUBG">PUBG</option>
              <option value="Valorant（无畏契约）">Valorant（无畏契约）</option>
              <option value="三角洲行动">三角洲行动</option>
              <option value="MLBB">MLBB</option>
              <option value="COD">COD</option>
              <option value="Valorant (PC)">Valorant (PC)</option>
              <option value="永劫无间">永劫无间</option>
              <option value="三角洲（PC）">三角洲（PC）</option>
              <option value="CSGO">CSGO</option>
            </select>
          </label>

        <label>
          服务:
            <select value={serviceFilter} onChange={e => setServiceFilter(e.target.value)}>
              <option value="全部">全部</option>
              <option value="陪聊">文字聊天 (陪聊)</option>
              <option value="语音">语音 / 语音条聊天</option>
              <option value="虚拟恋人">虚拟恋人</option>
              <option value="叫醒">早安提醒 / 叫醒服务</option>
              <option value="哄睡">睡前陪伴 / 哄睡服务</option>
              <option value="挂睡">挂睡陪伴 / 挂睡服务</option>
              <option value="陪看戏">观影陪伴 / 陪看戏服务</option>
              <option value="树洞">倾诉陪伴 / 树洞服务</option>
              <option value="头像">顾客指定换头像服务</option>
            </select>
          </label>
      </div>

      <div className="companion-list">
        {filteredCompanions.length > 0 ? (
          filteredCompanions.map(companion => (
            <div 
              key={companion.id} 
              className="companion-card"
              onClick={() => setSelectedProfile(companion)}
            >
              <img src={companion.avatarUrl} alt={companion.name} className="avatar" />
              <h3>{companion.name}</h3>
              <div className="tags">
                <span className="tag-pill role-pill">{companion.role}</span>
                {companion.tags.map(tag => (
                  <span key={tag} className="tag-pill">{tag}</span>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">未找到符合条件的陪玩</p>
        )}
      </div>

      {selectedProfile && (
        <div className="modal-overlay" onClick={() => setSelectedProfile(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedProfile(null)}>关闭</button>
            <img src={selectedProfile.avatarUrl} alt={selectedProfile.name} className="modal-avatar" />
            <h2>{selectedProfile.name}</h2>
            
            <div className="modal-details">
              <p><strong>性别:</strong> {selectedProfile.gender}</p>
              <p><strong>岗位:</strong> {selectedProfile.role}</p>
              <p><strong>年龄:</strong> {selectedProfile.age}</p>
              <p><strong>坐标:</strong> {selectedProfile.location}</p>
              <p><strong>星座:</strong> {selectedProfile.zodiac}</p>
              {selectedProfile.gamePlaystyle !== "无" && <p><strong>游戏风格:</strong> {selectedProfile.gamePlaystyle}</p>}
              <p><strong>个人签名:</strong> "{selectedProfile.quote}"</p>
            </div>

            {selectedProfile.games && selectedProfile.games.length > 0 && (
              <div className="modal-services">
                <strong>擅长游戏:</strong>
                <div className="services-list">
                  {selectedProfile.games.map(game => (
                    <span key={game} className="service-pill game-pill">{game}</span>
                  ))}
                </div>
              </div>
            )}

            {selectedProfile.services && selectedProfile.services.length > 0 && (
              <div className="modal-services">
                <strong>提供服务:</strong>
                <div className="services-list">
                  {selectedProfile.services.map(service => (
                    <span key={service} className="service-pill">{service}</span>
                  ))}
                </div>
              </div>
            )}

            <div className="modal-audio">
              <strong>语音介绍:</strong>
              <audio controls src={selectedProfile.audioUrl} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
