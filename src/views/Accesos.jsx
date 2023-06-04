import React, { useEffect, useState } from 'react';
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider';

const RegistroVehiculos = () => {
  const [vehiculos, setVehiculos] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
    getIngresoSalida();
  }, []);

  const getUsers = () => {
    axiosClient.get('/users')
      .then(({ data }) => {
        setUsers(data.data);
      });
  };

  const getIngresoSalida = () => {
    axiosClient.get('/IngresoSalida')
      .then(({ data }) => {
        setVehiculos(data.data);
      });
  };

  const agregarVehiculo = () => {
    const fechaActual = new Date().toLocaleDateString();
    const horaActual = new Date().toLocaleTimeString();
    const usuarioSeleccionado = users.find(user => user.ci === selectedUser);
    const vehiculoYaRegistrado = vehiculos.some(vehiculo => vehiculo.placa === usuarioSeleccionado.ci && vehiculo.horaSalida === 'Ocupado');
    if (!vehiculoYaRegistrado) {
      if (usuarioSeleccionado) {
        const nuevoVehiculo = {
          placa: usuarioSeleccionado.ci,
          horaIngreso: `${fechaActual} ${horaActual}`,
          horaSalida: 'Ocupado',
        };
        axiosClient.post('/IngresoSalida', nuevoVehiculo)
          .then(() => {
            setVehiculos([...vehiculos, nuevoVehiculo]);
          });
      }
    } else {
      alert('Ya se ha registrado el ingreso de este vehículo.');
    }
    setSelectedUser('');
  };

  const registrarSalida = (index) => {
    const fechaActual = new Date().toLocaleDateString();
    const horaSalidaActual = new Date().toLocaleTimeString();
    const vehiculosActualizados = [...vehiculos];
    if (vehiculosActualizados[index].horaSalida !== 'Ocupado') {
      vehiculosActualizados[index].horaSalida = `${fechaActual} ${horaSalidaActual}`;
      axiosClient.post('/IngresoSalida', vehiculosActualizados[index])
        .then(() => {
          setVehiculos(vehiculosActualizados);
        });
    }
  };

  return (
    <div>
      <h1>Registro de Ingreso y Salida de Vehículos</h1>
      <div>
        <label>Usuario:</label>
        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          <option value="">Seleccione un usuario</option>
          {users.map(user => (
            <option key={user.ci} value={user.ci}>{user.ci}</option>
          ))}
        </select>
      </div>
      <button onClick={agregarVehiculo} disabled={selectedUser === ''}>
        Registrar ingreso
      </button>

      <h2>Vehículos registrados:</h2>
      <table>
        <thead>
          <tr>
            <th>Placa</th>
            <th>Hora de ingreso</th>
            <th>Hora de salida</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {vehiculos.map((vehiculo, index) => (
            <tr key={index}>
              <td>{vehiculo.placa}</td>
              <td>{vehiculo.horaIngreso}</td>
              <td>{vehiculo.horaSalida}</td>
              <td>
                {vehiculo.horaSalida === 'Ocupado' ? (
                  <button onClick={() => registrarSalida(index)}>
                    Registrar salida
                  </button>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RegistroVehiculos;
