// src/components/PropertyDetailsPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropertyDetails from './propery-details/PropertyDetails';
import Reviews from './property-reviews/Reviews';
import properties from './../data/properties.json';

/**
 * Componente PropertyDetailsPage que muestra los detalles de una propiedad específica y las reseñas asociadas.
 * Utiliza el parámetro 'id' de la URL para obtener los detalles de la propiedad.
 */
const PropertyDetailsPage = () => {
  // Obtiene el parámetro 'id' de la URL utilizando useParams.
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  /**
   * useEffect se ejecuta cuando el componente se monta o cuando el valor de 'id' cambia.
   * Busca los detalles de la propiedad en el archivo local 'properties.json' y actualiza el estado 'property'.
   */
  useEffect(() => {
    // Aquí llamas a la API para obtener los detalles de la propiedad usando el zpid
    // const fetchPropertyDetails = async () => {
    //   try {
    //     const response = await searchPropertiesForId(id);
    //     setProperty(response);
    //   } catch (error) {
    //     console.error('Error fetching property details:', error);
    //   }
    // };

    // fetchPropertyDetails();

    // Buscamos la propiedad en el archivo local (properties.json)
    const foundProperty = properties.find(propertie => propertie.zpid.toString() === id);
    setProperty(foundProperty);
  }, [id]);

  return (
    <div>
      {property ? (
        <>
          {/* Renderiza los detalles de la propiedad */}
          <PropertyDetails property={property} />

          {/* Renderiza las reseñas asociadas a la propiedad */}
          <Reviews zpid={property.zpid} />
        </>
      ) : (
        <p>Loading property details...</p>
      )}
    </div>
  );
};

export default PropertyDetailsPage;


