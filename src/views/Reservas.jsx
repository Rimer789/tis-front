import React, { useEffect, useState } from 'react';
import axiosClient from '../axios-client';

export default function Reservas() {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    obtenerReservas();
  }, []);

  const obtenerReservas = () => {
    axiosClient
      .get('/getReservas')
      .then((response) => {
        const reservasOrdenados = response.data.sort((a, b) => {
          return new Date(a.fecha) - new Date(b.fecha);
        });
        setReservas(reservasOrdenados);
      })
      .catch((error) => {
        console.error('Error al obtener los reservas:', error);
      });
      console.log(reservas)
  };

  return (
    <div>
      <h2>Reservas</h2>
      <table>
        <thead>
          <tr>
            <th>nombre</th>
            <th>apellidos</th>
            <th>fehca inicio</th>
            <th>hora inicio</th>
            <th>fecha fin</th>
            <th>hora fin</th>
            <th>Placa Vehículo</th>
            <th>espacio</th>
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
