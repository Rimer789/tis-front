import React, { useEffect, useState } from 'react';
import moment from 'moment';
import axiosClient from '../axios-client';

export default function Reservas() {
  const [reservas, setReservas] = useState([]);
  const [placaVehiculo, setPlacaVehiculo] = useState('');
  const [horaIngreso, setHoraIngreso] = useState('');
  const [registrosIngreso, setRegistrosIngreso] = useState([]);

  useEffect(() => {
    obtenerReservas();
  }, []);

  const obtenerReservas = () => {
    axiosClient
      .get('/getReservas')
      .then((response) => {
        const reservasOrdenadas = response.data.sort((a, b) => {
          return new Date(a.fecha) - new Date(b.fecha);
        });
        setReservas(reservasOrdenadas);
      })
      .catch((error) => {
        console.error('Error al obtener las reservas:', error);
      });
  };

  const handlePlacaVehiculoChange = (event) => {
    setPlacaVehiculo(event.target.value);
  };

  const handleHoraIngresoChange = (event) => {
    setHoraIngreso(event.target.value);
  };

  const enviarDatos = () => {
    const reservaSeleccionada = reservas.find(
      (reserva) => reserva.vehiculo === placaVehiculo
    );

    if (reservaSeleccionada) {
      const nuevoRegistro = {
        placaVehiculo,
        fecha: moment().format('YYYY-MM-DD'),
        horaIngreso: moment().format('HH:mm:ss'),
        espacio: reservaSeleccionada.espacio,
      };

      setRegistrosIngreso([...registrosIngreso, nuevoRegistro]);
    }
    const comunicado = {
      espacio:reservaSeleccionada.espacio,
    };
    axiosClient
    .post('/ingreso', comunicado)
  };

  return (
    <div>
      <h2>Ingreso Salida</h2>
      <label htmlFor="placa_vehiculo">Placa de vehículo:</label>
      <select
        id="placa_vehiculo"
        value={placaVehiculo}
        onChange={handlePlacaVehiculoChange}
      >
        <option value="">Seleccionar placa de vehículo</option>
        {reservas.map((reserva) => (
          <option key={reserva.id} value={reserva.vehiculo}>
            {reserva.vehiculo}
          </option>
        ))}
      </select>
      <br />
      <label htmlFor="hora_ingreso">Hora de ingreso:</label>
      <input
        type="text"
        id="hora_ingreso"
        value={horaIngreso}
        onChange={handleHoraIngresoChange}
      />
      <br />
      <button onClick={enviarDatos}>Enviar</button>

      <table>
        <thead>
          <tr>
            <th>Placa del vehículo</th>
            <th>Fecha</th>
            <th>Hora de ingreso</th>
            <th>Espacio</th>
          </tr>
        </thead>
        <tbody>
          {registrosIngreso.map((registro, index) => (
            <tr key={index}>
              <td>{registro.placaVehiculo}</td>
              <td>{registro.fecha}</td>
              <td>{registro.horaIngreso}</td>
              <td>{registro.espacio}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
