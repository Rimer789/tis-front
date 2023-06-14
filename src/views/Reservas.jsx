import React, { useEffect, useState } from 'react';
import axiosClient from '../axios-client';
import '../styles/info/tabla.css'

export default function Reservas() {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    obtenerReservas();
  }, []);

  const obtenerReservas = () => {
    axiosClient
      .get('/getReservas')
      .then((response) => {
        const reservasOrdenadas = response.data.sort((a, b) => {
          return new Date(b.fecha) - new Date(a.fecha); // Invertir el orden de la comparación
        });
        setReservas(reservasOrdenadas);
      })
      .catch((error) => {
        console.error('Error al obtener los reservas:', error);
      });
  };

  return (
    <div>
      <h2>Reservas</h2>
      <table className="reservas-table"> {/* Agregar la clase CSS para la tabla */}
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Fecha inicio</th>
            <th>Hora inicio</th>
            <th>Fecha fin</th>
            <th>Hora fin</th>
            <th>Placa Vehículo</th>
            <th>Espacio</th>
          </tr>
        </thead>
        <tbody>
          {reservas.map((r) => (
            <tr key={r.id}>
              <td>{r.nombres}</td>
              <td>{r.apellidos}</td>
              <td>{r.desde_fecha}</td>
              <td>{r.desde_hora}</td>
              <td>{r.hasta_fecha}</td>
              <td>{r.hasta_hora}</td>
              <td>{r.vehiculo}</td>
              <td>{r.espacio}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}