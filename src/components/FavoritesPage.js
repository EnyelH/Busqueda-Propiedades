import React, { useEffect, useState } from 'react';

/**
 * Componente FavoritesPage que muestra una lista de propiedades
 * almacenadas como favoritas. Permite al usuario eliminar propiedades de la lista.
 */
const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  /**
   * useEffect se utiliza para cargar las propiedades favoritas del localStorage
   * cuando el componente se monta. Si no hay propiedades almacenadas, devuelve un array vacío.
   */
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  /**
   * Función para eliminar una propiedad de la lista de favoritos.
   * Filtra las propiedades para remover la que coincida con el zpid y actualiza el localStorage.
   * 
   * @param {string} zpid - El identificador único de la propiedad a eliminar.
   */
  const removeFavorite = (zpid) => {
    const updatedFavorites = favorites.filter((property) => property.zpid !== zpid);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  /**
   * Función para formatear el precio a la moneda local en formato USD.
   * 
   * @param {number} price - El precio de la propiedad.
   * @returns {string} El precio formateado.
   */
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
  };

  return (
    <>
      <h2 className="properties-title">Favorites</h2>

      <div className="container text-center">
        <div className="row justify-content-center">
          {favorites.length === 0 ? (
            <p>You do not have properties in favorites.</p>
          ) : (
            favorites.map((property) => (
              <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 pb-5 d-flex justify-content-center" key={property.zpid}>
                <div className="card h-100">
                  {/* Imagen de la propiedad */}
                  <img
                    src={property.imgSrc}
                    className="card-img-top"
                    alt={`Imagen de ${property.streetAddress}`}
                  />

                  <div className="card-body">
                    {/* Dirección de la propiedad */}
                    <h5 className="card-title">{"Dirección: " + property.streetAddress}</h5>

                    {/* Precio formateado */}
                    <p>Precio: {formatPrice(property.price)}</p>

                    {/* Botón para eliminar de favoritos */}
                    <button
                      className="btn btn-danger"
                      onClick={() => removeFavorite(property.zpid)}
                    >
                      Remove from favorites
                    </button>
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

export default FavoritesPage;

