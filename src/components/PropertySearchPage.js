// src/components/PropertySearchPage.js
import React, { useState } from 'react';
import PropertySearch from '../components/PropertySearch';
import PropertyList from '../components/PropertyList';
import Filters from '../components/Filters';
import properties from './../data/properties.json'; // Importamos las propiedades desde un archivo JSON

const PropertySearchPage = () => {
  const [filteredProperties, setFilteredProperties] = useState(properties); // Estado para almacenar las propiedades filtradas
  const [filters, setFilters] = useState({}); // Estado para almacenar los filtros seleccionados

  // Función que recibe los resultados de la búsqueda
  const handleSearchResults = (results) => {
    setFilteredProperties(results); // Actualiza el estado con los resultados de búsqueda
  };

  // Función que recibe los filtros seleccionados desde el componente Filters
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters); // Actualiza el estado con los filtros
  };

  return (
    <div>
      <h2>Search Properties</h2>
      <PropertySearch onSearchResults={handleSearchResults} />
      <Filters onFilterChange={handleFilterChange} />
      <PropertyList properties={filteredProperties} filters={filters} />
    </div>
  );
};

export default PropertySearchPage;
