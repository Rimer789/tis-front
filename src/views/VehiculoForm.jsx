import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider';

export default function VehiculoForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const { setNotification } = useStateContext();

  const [vehiculo, setVehiculo] = useState({
    id: null,
    placa: '',
    modelo: '',
    marca: '',
  });

  useEffect(() => {
    if (id) {
      setLoading(true);
      axiosClient
        .get(`/vehiculos/${id}`)
        .then(({ data }) => {
          setLoading(false);
          setVehiculo(data);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [id]);

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (vehiculo.id) {
      axiosClient
        .put(`/vehiculos/${vehiculo.id}`, vehiculo)
        .then(() => {
          setNotification('Se ha modificado tu vehiculo');
          navigate('/vehiculos');
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            console.log(response.data.errors);
            setErrors(response.data.errors);
          }
        });
    } else {
      axiosClient
        .post(`/vehiculos`, vehiculo)
        .then(() => {
          setNotification('Se ha anadio nuevo vehiculo');
          navigate('/vehiculos');
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            console.log(response.data.errors);
            setErrors(response.data.errors);
          }
        });
    }
  };

  return (
    <>
      {vehiculo.id && <h1>Editar  vehiculo: {vehiculo.placa}</h1>}
      {!vehiculo.id && <h1>Anadir nuevo vehiculo</h1>}
      <div className="card animated fadeInDown">
        {loading && <div className="text-centered">Cargando...</div>}
        {errors && (
          <div className="alert">
            {Object.keys(errors).map((key) => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        )}

        {!loading && (
          <form onSubmit={onSubmit}>
            <input
              value={vehiculo.placa}
              onChange={(ev) => setVehiculo({ ...vehiculo, placa: ev.target.value })}
              placeholder="placa"
            />
            <input
              value={vehiculo.modelo}
              onChange={(ev) => setVehiculo({ ...vehiculo, modelo: ev.target.value })}
              placeholder="modelo"
            />
            <input
              onChange={(ev) => setVehiculo({ ...vehiculo, marca: ev.target.value })}
              placeholder="marca"
            />
            <button className="btn">Save</button>
          </form>
        )}
      </div>
    </>
  );
}
