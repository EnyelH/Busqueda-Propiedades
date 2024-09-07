// Ver detalles de la propiedad

import React, { useEffect, useState } from 'react';
import "../propery-details/PropertyDetails.css";

/**
 * Componente PropertyDetails que muestra los detalles de una propiedad específica
 * y permite agregarla a la lista de favoritos.
 *
 * @param {object} property - Objeto que contiene la información de la propiedad seleccionada.
 */
const PropertyDetails = ({ property }) => {
  const [favorites, setFavorites] = useState([]); // Estado que almacena las propiedades marcadas como favoritas

  // Cargar favoritos almacenados en localStorage cuando el componente se monta
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  /**
   * Función que maneja la acción de agregar la propiedad a favoritos.
   * Verifica si la propiedad ya está en favoritos antes de agregarla.
   */
  const handleAddFavorite = () => {
    const currentFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isAlreadyFavorite = currentFavorites.some(favorite => favorite.zpid === property.zpid); // Verificar si la propiedad ya es favorita

    // Si no es favorita, la agrega a localStorage y actualiza el estado
    if (!isAlreadyFavorite) {
      const updatedFavorites = [...currentFavorites, property];
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
      alert("Added to favorites!");
    } else {
      alert("Property is already in favorites!"); // Mostrar mensaje si ya está en favoritos
    }
  };

  // Si no se ha seleccionado ninguna propiedad, se muestra un mensaje
  if (!property) {
    return <div>Selecciona una propiedad para ver los detalles</div>;
  }

  // Verificar si la propiedad ya está marcada como favorita
  const isFavorite = favorites.some(favorite => favorite.zpid === property.zpid);

  /**
   * Función para formatear el precio de la propiedad.
   * 
   * @param {number} price - El precio de la propiedad a formatear.
   * @returns {string} - El precio formateado en formato de moneda.
   */
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
  };

  return (
    <div className="property-details">
      {/* Imagen de la propiedad */}
      <img src={property.imgSrc} className="property-img" alt={`Imagen de ${property.streetAddress}`} />

      {/* Dirección de la propiedad */}
      <h2 className="property-title">{property.streetAddress}</h2>

      {/* Detalles de la propiedad */}
      <p className="property-price">Precio: {formatPrice(property.price)}</p>
      <p>Baños: {property.bathrooms}</p>
      <p>Habitaciones: {property.bedrooms}</p>
      <p>Status: {property.homeStatus}</p>
      <p>Tipo: {property.homeType}</p>

      {/* Botón para agregar a favoritos si aún no es favorita */}
      {!isFavorite && (
        <button onClick={handleAddFavorite} className="btn btn-primary">Add to Favorites</button>
      )}
    </div>
  );
};

export default PropertyDetails;

