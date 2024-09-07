// Escribir y almacenar reseñas en el almacenamiento local
import React, { useState, useEffect } from 'react';
import './Reviews.css';

/**
 * Componente Reviews que permite a los usuarios ver, agregar y eliminar reseñas de una propiedad específica.
 * Las reseñas se almacenan en el localStorage y están asociadas al `zpid` de la propiedad.
 *
 * @param {string} zpid - ID de la propiedad que se utiliza como clave para almacenar las reseñas en el localStorage.
 */
const Reviews = ({ zpid }) => {
  // Estado para almacenar las reseñas de la propiedad actual
  const [reviews, setReviews] = useState([]);
  // Estado para almacenar el texto de una nueva reseña
  const [newReview, setNewReview] = useState('');
  // Estado para almacenar la calificación en estrellas (1 a 5)
  const [rating, setRating] = useState(0);

  /**
   * Efecto que se ejecuta al cargar el componente o cuando cambia el zpid.
   * Recupera las reseñas almacenadas en el localStorage para la propiedad actual.
   */
  useEffect(() => {
    const storedReviews = JSON.parse(localStorage.getItem(`reviews-${zpid}`)) || [];
    setReviews(storedReviews);
  }, [zpid]);

  /**
   * Función para agregar una nueva reseña con calificación a la lista.
   * Si el texto de la reseña está vacío, no se agrega nada.
   * Después de agregar la reseña, se guarda la lista actualizada en el localStorage.
   */
  const handleAddReview = () => {
    if (!newReview.trim()) return; // No agregar reseñas vacías
    const updatedReviews = [...reviews, { text: newReview, rating }];
    setReviews(updatedReviews);
    localStorage.setItem(`reviews-${zpid}`, JSON.stringify(updatedReviews));
    setNewReview('');  // Resetear el campo de entrada de reseña
    setRating(0);      // Resetear la calificación después de agregar
  };

  /**
   * Función para eliminar una reseña de la lista.
   * Se actualiza el estado y el localStorage después de la eliminación.
   *
   * @param {number} index - Índice de la reseña a eliminar.
   */
  const handleDeleteReview = (index) => {
    const updatedReviews = reviews.filter((_, i) => i !== index);
    setReviews(updatedReviews);
    localStorage.setItem(`reviews-${zpid}`, JSON.stringify(updatedReviews));
  };

  /**
   * Función para manejar la selección de la calificación en estrellas.
   * Establece el valor de calificación en el estado.
   *
   * @param {number} value - Calificación seleccionada (1 a 5).
   */
  const handleStarClick = (value) => {
    setRating(value);
  };

  return (
    <div className="reviews-container">
      <h3 className="reviews-title">Reviews</h3>

      {/* Listado de reseñas con calificación */}
      <ul className="reviews-list">
        {reviews.map((review, index) => (
          <li key={index}>
            <div>
              {review.text}
              <div className="rating-stars">
                {/* Mostrar estrellas llenas según la calificación de la reseña */}
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`star ${i < review.rating ? 'filled' : ''}`}>
                    ★
                  </span>
                ))}
              </div>
              <button onClick={() => handleDeleteReview(index)}>Eliminate</button>
            </div>
          </li>
        ))}
      </ul>

      {/* Entrada para agregar una nueva reseña */}
      <input
        type="text"
        value={newReview}
        onChange={(e) => setNewReview(e.target.value)}
        placeholder="Write a review"
        className="review-input"
      />

      {/* Calificación por estrellas */}
      <div className="rating-container">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={`star ${i < rating ? 'filled' : ''}`}
            onClick={() => handleStarClick(i + 1)}
          >
            ★
          </span>
        ))}
      </div>

      {/* Botón para agregar reseña */}
      <button onClick={handleAddReview} className="add-review-button">Add to Favorites</button>
    </div>
  );
};

export default Reviews;




