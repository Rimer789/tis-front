import React, { useEffect, useState } from 'react';
import axiosClient from '../axios-client';

export default function Comunicados() {
  const [comunicados, setComunicados] = useState([]);

  useEffect(() => {
    obtenerComunicados();
  }, []);

  const obtenerComunicados = () => {
    axiosClient
      .get('/verAnuncios')
      .then((response) => {
        const comunicadosOrdenados = response.data.sort((a, b) => {
          return new Date(a.fecha) - new Date(b.fecha);
        });
        setComunicados(comunicadosOrdenados);
      })
      .catch((error) => {
        console.error('Error al obtener los comunicados:', error);
      });
  };

  return (
    <div>
      <h2 class="TComunicados">Comunicados</h2>
      {comunicados.map((comunicado) => (
        <div key={comunicado.id}>
          <p class="comunicado">Fecha: {comunicado.fecha}</p>
          <p class="comunicado">Contenido: {comunicado.mensaje}</p>
        </div>
      ))}
    </div>
  );
}
