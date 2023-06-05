import React, { useEffect, useState } from 'react';
import axiosClient from '../axios-client';
import { Link } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';

export default function Vehiculos() {
  const [vehiculos, setVehiculos] = useState([]);
  const [loading, setLoading] = useState(false);

  const { setNotification } = useStateContext();

  useEffect(() => {
    getVehiculos();
  }, []);

  const onDelete = (vehiculo) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este vehículo?')) {
      return;
    }

    axiosClient
      .delete(`/vehiculos/${vehiculo.id}`)
      .then(() => {
        setNotification('El vehículo fue eliminado correctamente');
        getVehiculos();
      });
  };

  const getVehiculos = () => {
    setLoading(true);
    axiosClient
      .get('/list-vehiculo')
      .then(({ data }) => {
        setLoading(false);
        console.log(data);
        if (Array.isArray(data)) {
          setVehiculos(data);
        }
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Mis Vehiculos</h1>
        <Link to={'/vehiculos/new'} className="btn-add">Anadir Vehiculo</Link>
      </div>
      <div className='card animated fadeInDown'>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Placa</th>
              <th>Modelo</th>
              <th>Marca</th>
              <th>Color</th>
              <th>Actions</th>
            </tr>
          </thead>
          {loading && 
            <tbody>
              <tr>
                <td colSpan={"5"} className='text-center'>
                  Loading...
                </td>
              </tr>
            </tbody>
          }
          {!loading && vehiculos && vehiculos.length > 0 ? (
  <tbody>
    {vehiculos.map((vehiculo) => (
      <tr key={vehiculo.id_vehiculo}>
        <td>{vehiculo.id_vehiculo}</td>
        <td>{vehiculo.placa}</td>
        <td>{vehiculo.modelo}</td>
        <td>{vehiculo.marca}</td>
        <td>{vehiculo.color}</td>
        <td>
          <Link className="btn-edit" to={"/vehiculos/" + vehiculo.id_vehiculo}>
            Edit
          </Link>
          &nbsp;
          <button onClick={(ev) => onDelete(vehiculo)} className="btn-delete">
            Delete
          </button>
        </td>
      </tr>
    ))}
  </tbody>
) : (
  <tbody>
    <tr>
      <td colSpan={"6"} className="text-center">
        {loading ? "Loading..." : "No hay vehículos"}
      </td>
    </tr>
  </tbody>
)}
        </table>
      </div>
    </div>
  );
}
