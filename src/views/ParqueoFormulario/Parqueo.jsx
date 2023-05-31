import React, { useState, useEffect } from 'react';

import '../../styles/ParqueoFormulario/Parqueo.css'
import Modal from './Modal';
import axiosClient from '../../axios-client';

const Parqueo = ({ onParqueoClick }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [filaSeleccionada, setFilaSeleccionada] = useState(null);
  const [columnaSeleccionada, setColumnaSeleccionada] = useState(null);
  const [espacios, setEspacios] = useState([]);

  useEffect(() => {
    axiosClient.get('/ver-espacios')
    .then(({data}) => {
      setEspacios(data)
    })
    .catch(error =>{
      console.log(error)
    })
  }, []);

  const handleClick = (fila, columna) => {
    console.log(`Celda clicada: fila ${fila}, columna ${columna}`);
    setFilaSeleccionada(fila);
    setColumnaSeleccionada(columna);
    setModalOpen(false);//colocar true para ver el modal
    onParqueoClick(fila, columna); //llama a la funcion del comp padre
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setFilaSeleccionada(null);
    setColumnaSeleccionada(null);
  };



  const getEstadoEspacio = (fila, columna) => {
    const espacio = espacios.find(
      (espacio) => espacio.id_espacio === `${fila}${columna}`
    );
    return espacio ? espacio.estado : 'desconocido';
  };

  const filas = [3, 5, 7, 9];

  return (
    <div className="parqueo">
      <h2>Parqueo</h2>
      <div className="grillaTop">
        <div className="celda fila-titulo"></div>
        {[...Array(12)].map((_, j) => {
          return (
            <div key={j} className="celda fila-titulo">
              {String.fromCharCode(65 + j)}
            </div>
          );
        })}
        {[...Array(2)].map((fila, i) => {
          return [
            <div key={`fila-titulo-${i}`} className="celda fila-titulo">
              {i + 1}
            </div>,
            [...Array(12)].map((columna, j) => {
              const estadoEspacio = getEstadoEspacio(i + 1, String.fromCharCode(65 + j));
              const celdaClassName = `celda estado-${estadoEspacio}`;
              return (
                <div
                  key={`${i}-${j}`}
                  className={celdaClassName}
                  onClick={() => handleClick(i + 1, String.fromCharCode(65 + j))}
                >
                  {String.fromCharCode(65 + j)}
                  {i + 1}
                </div>
              );
            }),
          ];
        })}
      </div>

      {filas.map((fila) => (
        <div className="grillaBot" key={`fila-${fila}`}>
          {[...Array(2)].map((_, i) => (
            <React.Fragment key={`${fila}-${i}`}>
              <div className="celda fila-titulo">{fila + i}</div>
              {[...Array(12)].map((_, j) => {
                const estadoEspacio = getEstadoEspacio(fila + i, String.fromCharCode(65 + j));
                const celdaClassName = `celda estado-${estadoEspacio}`;
                return (
                  <div
                    key={`${fila}-${i}-${j}`}
                    className={celdaClassName}
                    onClick={() => handleClick(fila + i, String.fromCharCode(65 + j))}
                    >
                    {String.fromCharCode(65 + j)}
                    {fila + i}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      ))}
      <Modal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        fila={filaSeleccionada}
        columna={columnaSeleccionada}
      />
    </div>
  );
};

export default Parqueo;