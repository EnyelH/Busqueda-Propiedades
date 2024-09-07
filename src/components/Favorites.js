//Agregar a favoritos y almacenar en el almacenamiento local

import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Componente Favorites que muestra un botón para ver las propiedades
 * marcadas como favoritas y redirige a la página de favoritos.
 */
const Favorites = () => {
  return (
    <div className="property-details">
      {/* Título de la sección de favoritos */}
      <h2 className="property-title">Favorites</h2>

      {/* Enlace que redirige a la página de favoritos */}
      <Link to="/favorites" className="btn btn-primary">See Favorites</Link>
    </div>
  );
};

export default Favorites;
