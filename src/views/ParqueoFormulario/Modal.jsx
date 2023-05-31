
import React, { useState, useEffect } from 'react';

import '../../styles/ParqueoFormulario/Modal.css';
import axiosClient from '../../axios-client';

const Modal = ({ isOpen, onClose, fila, columna }) => {
  const [estado, setEstado] = useState('');
  const [pestañaActual, setPestañaActual] = useState('estado');

  useEffect(() => {

      axiosClient.get(`/espacio/${fila}${columna}`)
        .then(({data})=> {
          console.log(data)
          setEstado(data.estado);
        })
        .catch(error => {
          console.log(error);
        })
  }, [fila, columna]);



  const contenido = {
    estado: (
      <>
        <h2>ESPACIO: {columna + fila}</h2>
        <h2>Estado: Espacio {estado}</h2>
      </>
    ),
    registrar: (
      <>
        <h2>Registrar nuevo espacio</h2>
        {/* Agrega aquí el formulario de registro */}
      </>
    ),
    reservar: (
      <>
        <h2>Reservar espacio</h2>
        {/* Agrega aquí el formulario de reserva */}
      </>
    ),
  };

  return isOpen ? (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          
          <div className="pestanas">
            <div
              className={pestañaActual === 'estado' ? 'pestaña activa' : 'pestaña'}
              onClick={() => setPestañaActual('estado')}
            >
              Estado
            </div>
            <div
              className={pestañaActual === 'registrar' ? 'pestaña activa' : 'pestaña'}
              onClick={() => setPestañaActual('registrar')}
            >
              Registrar
            </div>
            <div
              className={pestañaActual === 'reservar' ? 'pestaña activa' : 'pestaña'}
              onClick={() => setPestañaActual('reservar')}
            >
              Reservar
            </div>
          </div>
          
        </div>
        
        <div className="modal-body">{contenido[pestañaActual]}</div>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  ) : null;
};

export default Modal;
