import React, { useRef, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider';

export default function EnviarComunicado() {
  const comunicadoRef = useRef();
  const navigate = useNavigate();
  const { setNotification } = useStateContext();
  const [errors, setErrors] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const comunicado = {
      contenido: comunicadoRef.current.value,
      fecha: new Date().toISOString().split('T')[0],
    };
    console.log(comunicado)
    axiosClient
      .post('/enviarComunicado', comunicado)
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
    <div >
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
          <textarea ref={comunicadoRef} placeholder="Comunicado" rows={4} cols={50} />
          <br/>
          <button className="btn">Enviar</button>
        </form>
      </div>
    </div>
  );
}
