// src/components/property-filters/Filters.js
import React, { useState } from 'react';
import './filters.css';

/**
 * Componente Filters que permite a los usuarios filtrar propiedades por precio, ubicación, tipo de propiedad y ordenar los resultados.
 * 
 * @param {function} onFilterChange - Función que recibe los filtros seleccionados para aplicarlos en la búsqueda de propiedades.
 */
const Filters = ({ onFilterChange }) => {
  // Estados para cada uno de los filtros de búsqueda
  const [minPrice, setMinPrice] = useState('');       // Precio mínimo
  const [maxPrice, setMaxPrice] = useState('');       // Precio máximo
  const [location, setLocation] = useState('');       // Ubicación
  const [propertyType, setPropertyType] = useState(''); // Tipo de propiedad
  const [sortBy, setSortBy] = useState('');           // Ordenar por criterio

  /**
   * Función que maneja los cambios en los filtros y los pasa al componente padre.
   * Convierte los precios en números y pasa los filtros seleccionados a través del callback `onFilterChange`.
   */
  const handleFilterChange = () => {
    onFilterChange({
      minPrice: minPrice ? parseFloat(minPrice) : null, // Si hay precio mínimo, se convierte en número
      maxPrice: maxPrice ? parseFloat(maxPrice) : null, // Si hay precio máximo, se convierte en número
      location,
      propertyType,
      sortBy,
    });
  };

  return (
    <div className="filters-container">
      {/* Filtro por precio mínimo */}
      <div>
        <label>Min Price</label>
        <input
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
      </div>

      {/* Filtro por precio máximo */}
      <div>
        <label>Max Price</label>
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>

      {/* Filtro por ubicación */}
      <div>
        <label>Location</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      {/* Filtro por tipo de propiedad */}
      <div>
        <label>Property Type</label>
        <select
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
        >
          <option value="">Any</option> {/* Permite cualquier tipo de propiedad */}
          <option value="TOWNHOUSE">TOWNHOUSE</option>
          <option value="SINGLE_FAMILY">SINGLE_FAMILY</option>
          <option value="CONDO">CONDO</option>
        </select>
      </div>

      {/* Ordenar los resultados */}
      <div>
        <label>Sort By</label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="">None</option> {/* No ordenar por defecto */}
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
          <option value="location">Location</option>
        </select>
      </div>

      {/* Botón para aplicar los filtros */}
      <button onClick={handleFilterChange}>Apply Filters</button>
    </div>
  );
};

export default Filters;
