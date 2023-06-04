import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link} from 'react-router-dom';
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider';

export default function GuardiaForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const { setNotification } = useStateContext();

  const [guardia, setGuardia] = useState({
    id: null,
    name: '',
    email: '',
    rol:'guardia',
    password: '',
    password_confirmation: ''
  });

  useEffect(() => {
    if (id) {
      setLoading(true);
      axiosClient
        .get(`/guardias/${id}`)
        .then(({ data }) => {
          setLoading(false);
          setGuardia(data);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [id]);

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (guardia.id) {
      axiosClient
        .put(`/guardias/${guardia.id}`, guardia)
        .then(() => {
          //todo show notification
          setNotification('Se ha modificado el usuario');
          navigate('/guardias');
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
        .post(`/guardias`, guardia)
        .then(() => {
          setNotification('Se ha creado el usuario');
          navigate('/guardias');
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
      {guardia.id && <h1>Update guardia: {guardia.name}</h1>}
      {!guardia.id && <h1>New guardia</h1>}
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
              value={guardia.name}
              onChange={(ev) => setGuardia({ ...guardia, name: ev.target.value })}
              placeholder="Name"
            />
            <input
              type="email"
              value={guardia.email}
              onChange={(ev) => setGuardia({ ...guardia, email: ev.target.value })}
              placeholder="Email"
            />
            <input
              type="password"
              onChange={(ev) => setGuardia({ ...guardia, password: ev.target.value })}
              placeholder="Password"
            />
            <input
              type="password"
              onChange={(ev) =>
                setGuardia({ ...guardia, password_confirmation: ev.target.value })
              }
              placeholder="Password Confirmation"
            />
            <button className="btn-add">Save</button>
            <Link to={'/guardias'} className="btn-add">Atras</Link>
          </form>
        )}
      </div>
    </>
  );
}
