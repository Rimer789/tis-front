import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider';

export default function UserForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const { setNotification } = useStateContext();

  const [user, setUser] = useState({
    id: null,
    name: '',
    celular:'',
    email: '',
    password: '',
    password_confirmation: ''
  });

  useEffect(() => {
    if (id) {
      setLoading(true);
      axiosClient
        .get(`/usuarios/${id}`)
        .then(({ data }) => {
          setLoading(false);
          setUser(data);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [id]);

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (user.id) {
      axiosClient
        .put(`/usuarios/${user.id}`, user)
        .then(() => {
          //todo show notification
          setNotification('Se ha modificado el usuario');
          navigate('/users');
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
        .post(`/usuarios`, user)
        .then(() => {
          setNotification('Se ha creado el usuario');
          navigate('/users');
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
      {user.id && <h1>Update User: {user.name}</h1>}
      {!user.id && <h1>Nuevo usuario</h1>}
      <div>
        {loading && <div className="text-centered">Cargando...</div>}
        {errors && (
          <div className="alert">
            {Object.keys(errors).map((key) => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        )}

        <div class="formUser">
          <div class="formInputU">
            {!loading && (
              <form onSubmit={onSubmit}>
                <div class="inputUser">
                  <input
                    value={user.name}
                    onChange={(ev) => setUser({ ...user, name: ev.target.value })}
                    placeholder="Nombre"
                  />
                </div>
                <div class="inputUser">
                  <input
                    type="email"
                    value={user.email}
                    onChange={(ev) => setUser({ ...user, email: ev.target.value })}
                    placeholder="Email"
                  />
                </div>
                <div class="inputUser">
                  <input
                    type="text"
                    value={user.celular}
                    onChange={(ev) => setUser({ ...user, celular: ev.target.value })}
                    placeholder="Celular"
                  />
                </div>
                <div class="inputUser">
                  <input
                    type="password"
                    onChange={(ev) => setUser({ ...user, password: ev.target.value })}
                    placeholder="Contraseña"
                  />
                </div>
                <div class="inputUser">
                  <input
                    type="password"
                    onChange={(ev) =>
                      setUser({ ...user, password_confirmation: ev.target.value })
                    }
                    placeholder="Confirmar contraseña"
                  />
                </div>
                <button className="btn_User">Guardar</button>
                
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
