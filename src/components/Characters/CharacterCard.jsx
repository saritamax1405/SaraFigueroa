import { useNavigate } from 'react-router-dom';

function CharacterCard({ character }) {
  const { name, images, species, id } = character;
  const fullName = `${name.first} ${name.middle || ''} ${name.last}`.trim();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/characters/${id}`);
  };

  return (
    <div className="character-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <div className="character-image">
        <img 
          src={images.main} 
          alt={fullName}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/150?text=No+Image';
          }}
        />
      </div>
      <div className="character-info">
        <h2>{fullName}</h2>
        <p>Especie: {species}</p>
      </div>
    </div>
  );
}

export default CharacterCard;
