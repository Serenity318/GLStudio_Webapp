import { useState } from 'react';
import './Roster.css';

const mockCompanions = [
  { id: 1, name: 'Alice', gender: 'Female', style: 'Tech', games: ['Valorant', 'League of Legends'] },
  { id: 2, name: 'Bob', gender: 'Male', style: 'Entertain', games: ['Genshin Impact', 'Valorant'] },
  { id: 3, name: 'Charlie', gender: 'Male', style: 'Both', games: ['League of Legends'] },
  { id: 4, name: 'Diana', gender: 'Female', style: 'Entertain', games: ['Genshin Impact'] },
  { id: 5, name: 'Eve', gender: 'Female', style: 'Both', games: ['Valorant', 'League of Legends', 'Genshin Impact'] },
  { id: 6, name: 'Frank', gender: 'Male', style: 'Tech', games: ['Valorant'] },
];

export default function Roster() {
  const [genderFilter, setGenderFilter] = useState('All');
  const [gameFilter, setGameFilter] = useState('All');
  const [styleFilter, setStyleFilter] = useState('All');

  const filteredCompanions = mockCompanions.filter(companion => {
    const matchesGender = genderFilter === 'All' || companion.gender === genderFilter;
    const matchesStyle = styleFilter === 'All' || companion.style === styleFilter;
    const matchesGame = gameFilter === 'All' || companion.games.includes(gameFilter);
    return matchesGender && matchesStyle && matchesGame;
  });

  return (
    <div className="roster-container">
      <h2>Gaming Companions Directory</h2>
      
      <div className="filters">
        <label>
          Gender:
          <select value={genderFilter} onChange={e => setGenderFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </label>

        <label>
          Game:
          <select value={gameFilter} onChange={e => setGameFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="Valorant">Valorant</option>
            <option value="League of Legends">League of Legends</option>
            <option value="Genshin Impact">Genshin Impact</option>
          </select>
        </label>

        <label>
          Style:
          <select value={styleFilter} onChange={e => setStyleFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="Tech">Tech</option>
            <option value="Entertain">Entertain</option>
            <option value="Both">Both</option>
          </select>
        </label>
      </div>

      <div className="companion-list">
        {filteredCompanions.length > 0 ? (
          filteredCompanions.map(companion => (
            <div key={companion.id} className="companion-card">
              <h3>{companion.name}</h3>
              <p><strong>Gender:</strong> {companion.gender}</p>
              <p><strong>Style:</strong> {companion.style}</p>
              <p><strong>Games:</strong> {companion.games.join(', ')}</p>
            </div>
          ))
        ) : (
          <p>No companions found</p>
        )}
      </div>
    </div>
  );
}
