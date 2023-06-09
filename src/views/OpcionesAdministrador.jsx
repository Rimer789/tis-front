import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider';
import '../styles/info/comunicado.css'

export default function EnviarComunicado() {
  const comunicadoRef = useRef();
  const navigate = useNavigate();
  const { setNotification } = useStateContext();
  const [errors, setErrors] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const comunicado = {
      mensaje: comunicadoRef.current.value,
      para: 0
    };
    console.log(comunicado);
    axiosClient
      .post('/enviarAnuncio', comunicado)
      .then(() => {
        setNotification('Comunicado enviado correctamente');
        navigate('/opcionesAdministrador');
      })
      .catch((error) => {
        const response = error.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  };

  return (
    <div className="container">
      <div className="form">
        <form onSubmit={handleSubmit}>
          <h1 className="title">Enviar Comunicado</h1>
          {errors && (
            <div className="alert">
              {Object.keys(errors).map((key) => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
          )}
          <textarea
            ref={comunicadoRef}
            className="textarea"
            placeholder="Comunicado"
            rows={4}
            cols={50}
          />
          <br />
          <button className="btn">Enviar</button>
        </form>
      </div>
    </div>
  );
}
