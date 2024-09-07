//Implementar la búsqueda de propiedades, Esta permite a los usuarios buscar propiedades por ubicación:

import React, { useState } from 'react';
// import { searchProperties } from '../services/zillowApi';
import properties from './../data/properties.json';

/**
 * Componente PropertySearch para buscar propiedades por ciudad y estado.
 * Llama a una función de búsqueda local o API y devuelve los resultados filtrados.
 * 
 * @param {Function} onSearchResults - Función que maneja los resultados de la búsqueda.
 */
const PropertySearch = ({ onSearchResults }) => {
  const [city, setCity] = useState('');   // Estado para almacenar el valor de la ciudad ingresada
  const [state, setState] = useState(''); // Estado para almacenar el valor del estado ingresado

  /**
   * Función para manejar la búsqueda de propiedades.
   * Valida la entrada y filtra los datos locales o llama a una API de búsqueda.
   */
  const handleSearch = async () => {
    // Validar si los campos no están vacíos
    if (!city || !state) {
      alert('Please enter both city and state.');
      return;
    }

    // Código comentado que haría la llamada a la API de búsqueda
    // try {
    //   const data = await searchProperties(city, state); // Llama a la función de búsqueda
    //   onSearchResults(data.results); // Pasa los resultados de la búsqueda a App.js
    // } catch (error) {
    //   console.error('Error fetching properties:', error);
    // }

    // Filtro simple usando los datos locales de properties.json
    const filteredProperties = properties.filter(property =>
      property.city.toLowerCase() === city.toLowerCase() &&
      property.state.toLowerCase() === state.toLowerCase()
    );

    // Enviar los resultados filtrados al componente padre
    onSearchResults(filteredProperties);
  };

  return (
    <div className="search-container">
      {/* Campo de entrada para la ciudad */}
      <input
        type="text"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="styled-input"
      />

      {/* Campo de entrada para el estado */}
      <input
        type="text"
        placeholder="State"
        value={state}
        onChange={(e) => setState(e.target.value)}
        className="styled-input"
      />

      {/* Botón para ejecutar la búsqueda */}
      <button onClick={handleSearch} className="search-button">Search</button>
    </div>
  );
};

export default PropertySearch;


