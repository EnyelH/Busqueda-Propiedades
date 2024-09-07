import axios from 'axios';

const apiKey = 'ad080670d4msh6791bc2c25a2f75p103524jsn1d4ac0fea164'; 
const apiHost = 'zillow56.p.rapidapi.com'; 

// Función para buscar propiedades
export const searchProperties = async (city, state) => {
  const options = {
    method: 'GET',
    url: 'https://zillow56.p.rapidapi.com/search',
    params: {
      location: `${city}, ${state}`, // Ciudad y estado recibidos como parámetros
      output: 'json',
      status: 'forSale',
      sortSelection: 'priorityscore',
      listing_type: 'by_agent',
      doz: 'any'
    },
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': apiHost
    }
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    return response.data; // Devuelve los datos en lugar de hacer console.log
  } catch (error) {
    console.error('Error fetching properties:', error);
    throw error; // Lanza el error para manejarlo fuera de la función
  }
};

export const searchPropertiesForId = async (zpid) => {

  const options = {
      method: 'GET',
      url: 'https://zillow56.p.rapidapi.com/propertyV2',
      params: { zpid: `${zpid}` },
      headers: {
          'x-rapidapi-key': apiKey,
          'x-rapidapi-host': apiHost
      },

      //withCredentials: true
  };

  try {
      const response = await axios.request(options);
      return response.data; 
  } catch (error) {
      console.error(error);
  }

};



/* este es un ejemplo de como manejar axios como funcion para que tenga parametros dinamicos,
 adapte lo que tiene a un tipo de funciones flechas como esta, asi vuelve dinamicas las consultas */

/* import axios from 'axios';
import { urlBase } from '../constants/defaultValues';
import { getCurrentUser } from '../helpers/Utils';

const baseUrl = urlBase;
const currentUser = getCurrentUser();
const headers = { Authorization: `Bearer ${currentUser.token}` };

export const crearMenu = (body) =>
  axios.post(`${baseUrl}/menu`, body, { headers }); */