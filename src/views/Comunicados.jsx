import React, { useEffect, useState } from 'react';
import axiosClient from '../axios-client';
import '../styles/info/anuncio.css';

export default function Comunicados() {
  const [comunicados, setComunicados] = useState([]);

  useEffect(() => {
    obtenerComunicados();
  }, []);

  const obtenerComunicados = () => {
    axiosClient
      .get('/verAnuncios')
      .then((response) => {
        const fechaActual = new Date();
        const fechaLimite = new Date();
        fechaLimite.setDate(fechaLimite.getDate() - 2); // Restar 2 días
        const comunicadosFiltrados = response.data.filter((comunicado) => {
          const fechaComunicado = new Date(comunicado.fecha);
          return fechaComunicado >= fechaLimite && fechaComunicado <= fechaActual;
        });
        const comunicadosOrdenados = comunicadosFiltrados.sort((a, b) => {
          return new Date(b.fecha) - new Date(a.fecha);
        });
        setComunicados(comunicadosOrdenados);
      })
      .catch((error) => {
        console.error('Error al obtener los comunicados:', error);
      });
  };

  return (
    <div>
      <h2>Comunicados</h2>
      <div className="card-container">
        {comunicados.map((comunicado) => (
          <div key={comunicado.id} className="card">
            <div className="card-header">{comunicado.fecha}</div>
            <div className="card-body">{comunicado.mensaje}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
