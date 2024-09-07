//Mostrar los resultados de la búsqueda en modo lista
// src/components/PropertyList.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

/**
 * Componente PropertyList que muestra una lista de propiedades.
 * Aplica filtros y opciones de ordenamiento a las propiedades antes de mostrarlas.
 * 
 * @param {Object[]} properties - Lista de propiedades disponibles para mostrar.
 * @param {Object} filters - Filtros aplicados a la lista de propiedades.
 * @param {number} filters.minPrice - Precio mínimo para filtrar propiedades.
 * @param {number} filters.maxPrice - Precio máximo para filtrar propiedades.
 * @param {string} filters.location - Ubicación de las propiedades para filtrar.
 * @param {string} filters.propertyType - Tipo de propiedad (e.g., TOWNHOUSE, SINGLE_FAMILY, CONDO).
 * @param {string} filters.sortBy - Criterio para ordenar las propiedades (e.g., priceAsc, priceDesc, location).
 */
const PropertyList = ({ properties, filters }) => {
  const [filteredProperties, setFilteredProperties] = useState([]);

  /**
   * useEffect que se ejecuta cuando cambian las propiedades o los filtros.
   * Filtra y ordena las propiedades según los criterios especificados.
   */
  useEffect(() => {
    let filtered = properties;

    // Filtrar por precio mínimo
    if (filters.minPrice) {
      filtered = filtered.filter(property => property.price >= filters.minPrice);
    }
    // Filtrar por precio máximo
    if (filters.maxPrice) {
      filtered = filtered.filter(property => property.price <= filters.maxPrice);
    }

    // Filtrar por ubicación
    if (filters.location) {
      filtered = filtered.filter(property =>
        property.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Filtrar por tipo de propiedad
    if (filters.propertyType) {
      filtered = filtered.filter(property => property.homeType === filters.propertyType);
    }

    // Ordenar propiedades
    if (filters.sortBy === 'priceAsc') {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'priceDesc') {
      filtered = filtered.sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === 'location') {
      filtered = filtered.sort((a, b) =>
        a.location.localeCompare(b.location)
      );
    }

    // Actualizar propiedades filtradas
    setFilteredProperties(filtered);
  }, [properties, filters]);

  return (
    <>
      <h2 className="properties-title">Properties</h2>
      <div className="container text-center">
        <div className="row justify-content-center">
          {filteredProperties.length === 0 ? (
            <p>No properties found.</p>
          ) : (
            filteredProperties.map((property) => (
              <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 pb-5 d-flex justify-content-center" key={property.zpid}>
                <div className="card h-100">
                  <img src={property.imgSrc} className="card-img-top" alt={property.address} />
                  <div className="card-body">
                    <h5 className="card-title">{"Address: " + property.streetAddress}</h5>
                    <p>Price: {property.price}</p>
                    <Link to={`/property/${property.zpid}`} className="btn btn-primary">Details</Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default PropertyList;







