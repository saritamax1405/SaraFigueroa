import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Character_detail.css'; 

function CharacterDetail() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await fetch(`https://api.sampleapis.com/futurama/characters`);
        
        if (!response.ok) {
          throw new Error('Error al obtener el personaje');
        }
        
        const data = await response.json();
        const foundCharacter = data.find((char) => String(char.id) === id);

        if (!foundCharacter) {
          throw new Error('Personaje no encontrado');
        }

        setCharacter(foundCharacter);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCharacter();
  }, [id]);

  if (loading) {
    return <div className="loading">Cargando detalles...</div>;
  }

  if (error) {
    return (
      <div className="error">
        Error: {error}
        <button onClick={() => navigate(-1)}>Volver</button>
      </div>
    );
  }

  const { name, images, species, age, gender, occupation } = character;
  const fullName = `${name.first} ${name.middle || ''} ${name.last}`.trim();

  return (
    <div className="character-detail-container">
      <button className="back-button" onClick={() => navigate(-1)}>← Volver</button>
      
      <div className="character-detail-card">
        <div className="character-detail-image">
          <img 
            src={images.main} 
            alt={fullName}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/300?text=No+Image';
            }}
          />
        </div>

        <div className="character-detail-info">
          <h1>{fullName}</h1>
          <p><strong>Especie:</strong> {species}</p>
          {age && <p><strong>Edad:</strong> {age}</p>}
          {gender && <p><strong>Género:</strong> {gender}</p>}
          {occupation && <p><strong>Ocupación:</strong> {occupation}</p>}
        </div>
      </div>
    </div>
  );
}

export default CharacterDetail;
