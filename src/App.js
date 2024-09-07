// src/App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PropertySearch from './components/PropertySearch';
import PropertyList from './components/PropertyList';
import PropertyDetailsPage from './components/PropertyDetailsPage';
import Favorites from './components/Favorites';
import FavoritesPage from './components/FavoritesPage';
import Filters from './components/property-filters/Filters';

/**
 * Componente principal de la aplicación.
 * Maneja las rutas y gestiona el estado global de propiedades y filtros.
 */
function App() {
  const [properties, setProperties] = useState([]); // Estado para almacenar las propiedades filtradas
  const [filters, setFilters] = useState({});       // Estado para almacenar los filtros seleccionados

  /**
   * Función para manejar los cambios en los filtros y actualizar el estado de filtros.
   * 
   * @param {Object} newFilters - Nuevos filtros seleccionados por el usuario.
   */
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters); // Actualiza el estado con los nuevos filtros seleccionados
  };

  return (
    <Router>
      <Routes>
        {/* Ruta principal que muestra la búsqueda, filtros, lista de propiedades y favoritos */}
        <Route 
          path="/" 
          element={
            <div>
              {/* Componente de búsqueda de propiedades */}
              <PropertySearch onSearchResults={setProperties} />

              {/* Componente de filtros para aplicar filtros sobre las propiedades */}
              <Filters onFilterChange={handleFilterChange} /> {/* Agregar el componente de filtros */}

              {/* Componente de lista de propiedades filtradas */}
              <PropertyList properties={properties} filters={filters} /> {/* Pasar los filtros */}

              {/* Componente de acceso a la página de favoritos */}
              <Favorites />
            </div>
          } 
        />

        {/* Ruta para mostrar los detalles de una propiedad en específico */}
        <Route path="/property/:id" element={<PropertyDetailsPage />} />

        {/* Ruta para la página de favoritos */}
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </Router>
  );
}

export default App;




