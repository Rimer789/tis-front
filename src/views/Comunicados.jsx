import React, { useEffect, useState } from 'react';
import axiosClient from '../axios-client';
import '../styles/info/anuncio.css'

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

  const formatearFecha = (fecha) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(fecha).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <h2>Comunicados</h2>
      <div className="card-container">
        {comunicados.map((comunicado) => (
          <div key={comunicado.id} className="card">
            <div className="card-header">{formatearFecha(comunicado.fecha)}</div>
            <div className="card-body">{comunicado.mensaje}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
