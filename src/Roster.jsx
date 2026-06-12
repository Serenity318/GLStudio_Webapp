import { useState, useEffect } from 'react';
import './Roster.css';

const mockCompanions = [
  { 
    id: 1, 
    name: "GL.小炸弹", 
    gender: "女生", 
    role: ["娱乐陪"],
    basePrice: "15币/时",
    age: 21, 
    location: "KL", 
    zodiac: "魔蝎座", 
    tags: ["反差甜妹", "随机应变"], 
    games: ["和平精英"],  
    services: ["哄睡", "虚拟恋人", "头像", "语音"], 
    quote: "只是一枚不会炸的缩水炸弹 平时不会炸的除非忍不住", 
    avatarUrl: "https://via.placeholder.com/150", 
    audioUrl: "https://www.w3schools.com/html/horse.mp3" 
  },
  { 
    id: 2, 
    name: "GL.小k", 
    gender: "男生", 
    role: ["娱乐陪"],
    basePrice: "15币/时",
    age: 18, 
    location: "Johor", 
    zodiac: "魔蝎座", 
    tags: ["开朗"], 
    games: ["和平精英", "和平精英", "Valorant （手瓦）"],  
    services: ["娱乐陪", "陪聊", "语音", "虚拟恋人", "打字"], 
    quote: "开心或不开心，想聊天都可以来找我哦，我在 GL 等你。", 
    avatarUrl: "https://via.placeholder.com/150", 
    audioUrl: "https://www.w3schools.com/html/horse.mp3" 
  },
  { 
    id: 3, 
    name: "GL.阿泽", 
    gender: "男生", 
    role: ["娱乐陪"],
    basePrice: "15币/时",
    age: 23, 
    location: "SLG", 
    zodiac: "天秤座", 
    tags: ["幽默", "阳光"], 
    games: ["王者荣耀", "Honor of Kings", "和平精英", "Valorant （端瓦）", "MLBB"],  
    services: ["娱乐陪", "陪聊", "语音", "虚拟恋人", "打字"], 
    quote: "话不多，打不冷场；脾气好，但很护短；重在过程，只要你在；不负此刻，陪你到晚。",
    avatarUrl: "https://via.placeholder.com/150", 
    audioUrl: "https://www.w3schools.com/html/horse.mp3" 
  },
  { 
    id: 4, 
    name: "GL.念念", 
    gender: "女生", 
    role: ["娱乐陪"],
    basePrice: "15币/时",
    age: 18, 
    location: "KL", 
    zodiac: "金牛座", 
    tags: ["可甜可咸"], 
    games: ["王者荣耀", "Valorant （端瓦）"], 
    services: ["娱乐陪", "陪聊", "语音", "唱歌", "虚拟恋人"], 
    quote: "声音可甜可咸，有没有兴趣解锁一下呢？", 
    avatarUrl: "https://via.placeholder.com/150", 
    audioUrl: "https://www.w3schools.com/html/horse.mp3"  
  },
  { 
    id: 5, 
    name: "GL.幻", 
    gender: "女生", 
    role: ["娱乐陪"],
    basePrice: "15币/时",
    age: 20, 
    location: "KL", 
    zodiac: "处女座", 
    tags: ["御姐"], 
    games: ["王者荣耀", "Honor of Kings", "和平精英", "Valorant （手瓦）", "三角洲（手游）", "MLBB"], 
    services: ["娱乐陪", "陪聊", "语音", "虚拟恋人", "头像", "打字"], 
    quote: "陪你打游戏，也陪你躲进一会儿喧嚣的世界。", 
    avatarUrl: "https://via.placeholder.com/150", 
    audioUrl: "https://www.w3schools.com/html/horse.mp3"  
  },
  { 
    id: 6, 
    name: "GL.小松", 
    gender: "女生", 
    role: ["娱乐陪"],
    basePrice: "15币/时",
    location: "KL", 
    zodiac: "天秤座", 
    tags: ["温柔", "腼腆"], 
    games: ["Honor of Kings"], 
    services: ["娱乐陪", "陪聊", "头像"], 
    quote: "不管晴天还是下雨，我都在 GL 等你。", 
    avatarUrl: "https://via.placeholder.com/150", 
    audioUrl: "https://www.w3schools.com/html/horse.mp3"  
  },
  { 
    id: 7, 
    name: "GL.蜡笔", 
    gender: "女生", 
    role: ["娱乐陪"],
    basePrice: "15币/时",
    age: 20, 
    location: "KL", 
    zodiac: "白羊座", 
    tags: ["活泼"], 
    games: ["王者荣耀", "Honor of Kings", "PUBG"], 
    services: ["娱乐陪", "头像"], 
    quote: "生活或许偶尔疲惫，但希望我的出现能成为你的糖。", 
    avatarUrl: "https://via.placeholder.com/150", 
    audioUrl: "https://www.w3schools.com/html/horse.mp3"  
  },
  { 
    id: 8, 
    name: "GL.无惧", 
    gender: "男生", 
    role: ["技术陪", "包赢陪"],
    basePrice: "详询客服",
    age: 20, 
    location: "Selangor", 
    zodiac: "天秤座", 
    tags: ["开朗"], 
    games: ["王者荣耀", "Honor of Kings"], 
    services: ["技术陪", "包赢陪"], 
    quote: "温柔善良高冷，我在GL等你。", 
    avatarUrl: "./wuju-avatar.jpg", 
    audioUrl: "./wuju-recording.mpeg"  
  },
  { 
    id: 9, 
    name: "GL.小初", 
    gender: "男生", 
    role: ["技术陪"],
    basePrice: "18币/时",
    age: 22, 
    location: "霹雳", 
    zodiac: "巨蟹座", 
    tags: ["温柔"], 
    games: ["和平精英", "Valorant （手瓦）", "CSGO"], 
    services: ["和平技术陪", "无畏契约技术陪", "头像", "陪聊"], 
    quote: "从始至终，你的身边还有我呢，我在GL等你哦。", 
    avatarUrl: "./xiaochu-avatar.jpg", 
    audioUrl: "./xiaochu-recording.mpeg" 
  },
  { 
    id: 10, 
    name: "GL.熙", 
    gender: "男生", 
    role: ["技娱陪"],
    basePrice: "20币/时",
    age: 19, 
    location: "KL", 
    zodiac: "金牛座", 
    tags: ["开朗", "话痨"], 
    games: ["Honor of Kings", "PUBG", "Valorant （手瓦）", "MLBB"], 
    services: ["陪聊", "语音", "虚拟恋人", "头像", "叫醒"], 
    quote: "从始至终，你的身边还有我呢，我在GL等你哦。", 
    avatarUrl: "./xi-avatar.jpg", 
    audioUrl: "./xi-recording.mpeg" 
  }
];

export default function Roster() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProfile, setSelectedProfile] = useState(null);
  
  const [sharedIds, setSharedIds] = useState(null);
  const [selectedCompanions, setSelectedCompanions] = useState([]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const shareParam = urlParams.get('share');
    if (shareParam) {
      setSharedIds(shareParam.split(',').map(Number));
    }
  }, []);

  const isCustomerView = sharedIds !== null;

  const toggleSelection = (e, id) => {
    e.stopPropagation();
    setSelectedCompanions(prev => 
      prev.includes(id) ? prev.filter(compId => compId !== id) : [...prev, id]
    );
  };

  const generateShareLink = () => {
    if (selectedCompanions.length === 0) {
      alert("请先选择至少一位陪玩！");
      return;
    }
    const shareUrl = `${window.location.origin}${window.location.pathname}?share=${selectedCompanions.join(',')}`;
    navigator.clipboard.writeText(shareUrl);
    alert("链接已复制！请发给老板/顾客。");
  };

  const filteredCompanions = mockCompanions.filter(companion => {
    if (isCustomerView) {
      return sharedIds.includes(companion.id);
    }
    const query = searchQuery.toLowerCase();
    const nameMatch = companion.name.toLowerCase().includes(query);
    const gameMatch = companion.games && companion.games.some(game => game.toLowerCase().includes(query));
    return nameMatch || gameMatch;
  });

  return (
    <div className="roster-container">
      <h2>{isCustomerView ? "为您推荐的陪玩" : "游戏陪玩名录 (客服视图)"}</h2>
      
      {!isCustomerView && (
        <div className="search-container">
          <input 
            type="text" 
            className="search-bar"
            placeholder="输入陪陪名字或游戏搜索 (e.g. 熙, Valorant)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      )}

      <div className="companion-list">
        {filteredCompanions.length > 0 ? (
          filteredCompanions.map(companion => (
            <div 
              key={companion.id} 
              className={`companion-card ${selectedCompanions.includes(companion.id) ? 'selected' : ''}`}
              onClick={() => setSelectedProfile(companion)}
            >
              {!isCustomerView && (
                <input 
                  type="checkbox" 
                  className="card-checkbox"
                  checked={selectedCompanions.includes(companion.id)}
                  onChange={(e) => toggleSelection(e, companion.id)}
                  onClick={(e) => e.stopPropagation()}
                />
              )}
              <img src={companion.avatarUrl} alt={companion.name} className="avatar" loading="lazy" />
              <h3>{companion.name}</h3>
              {companion.basePrice && <div className="base-price">{companion.basePrice}</div>}
              <div className="tags">
                {companion.role && companion.role.map(r => (
                  <span key={r} className="tag-pill role-pill">{r}</span>
                ))}
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
            <img src={selectedProfile.avatarUrl} alt={selectedProfile.name} className="modal-avatar" loading="lazy" />
            <h2>{selectedProfile.name}</h2>
            
            <div className="modal-details">
              <p><strong>性别:</strong> {selectedProfile.gender}</p>
              <p><strong>岗位:</strong> {selectedProfile.role && selectedProfile.role.join(" | ")}</p>
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

            <button 
              className="cta-btn"
              onClick={() => window.open('https://www.instagram.com/gl.gamingstudio/', '_blank')}
            >
              Instagram 下单
            </button>
          </div>
        </div>
      )}

      {!isCustomerView && (
        <div className="fixed-action-bar">
          <button className="share-btn" onClick={generateShareLink}>
            复制专属链接
          </button>
        </div>
      )}
    </div>
  );
}
