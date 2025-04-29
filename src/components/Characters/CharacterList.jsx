import { useState, useEffect } from 'react';
import CharacterCard from './CharacterCard';
import './CharacterList.css';

function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState(() => localStorage.getItem('searchTerm') || '');
  const [speciesList, setSpeciesList] = useState([]);
  const [selectedSpecies, setSelectedSpecies] = useState(() => localStorage.getItem('selectedSpecies') || 'Todas');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch('https://api.sampleapis.com/futurama/characters');
        
        if (!response.ok) {
          throw new Error('Error al obtener los personajes');
        }
        
        const data = await response.json();
        setCharacters(data);
        setFilteredCharacters(data);
        
        // Obtener especies únicas
        const uniqueSpecies = Array.from(new Set(data.map(c => c.species))).sort();
        setSpeciesList(uniqueSpecies);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  useEffect(() => {
    let results = characters;

    // Filtro por nombre
    if (searchTerm.trim() !== '') {
      results = results.filter(character =>
        character.name.first.toLowerCase().includes(searchTerm.toLowerCase()) ||
        character.name.last.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtro por especie (si no es "Todas")
    if (selectedSpecies !== 'Todas') {
      results = results.filter(character => character.species === selectedSpecies);
    }

    setFilteredCharacters(results);
  }, [searchTerm, selectedSpecies, characters]);

  useEffect(() => {
    // Guardar el searchTerm y la especie seleccionada en localStorage
    localStorage.setItem('searchTerm', searchTerm);
    localStorage.setItem('selectedSpecies', selectedSpecies);
  }, [searchTerm, selectedSpecies]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSpeciesChange = (e) => {
    setSelectedSpecies(e.target.value);
  };

  if (loading) {
    return <div className="loading">Cargando personajes...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="character-container">
      <h1>Personajes de Futurama</h1>
      
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar personaje por nombre"
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
        
        <select 
          value={selectedSpecies} 
          onChange={handleSpeciesChange} 
          className="species-select"
        >
          <option value="Todas">Todas las especies</option>
          {speciesList.map((species, index) => (
            <option key={index} value={species}>
              {species}
            </option>
          ))}
        </select>
      </div>

      {filteredCharacters.length === 0 ? (
        <div className="no-results">No se encontraron personajes</div>
      ) : (
        <div className="character-grid">
          {filteredCharacters.map(character => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CharacterList;
