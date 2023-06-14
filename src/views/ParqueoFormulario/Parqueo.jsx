import React, { useState, useEffect } from 'react';
import { useStateContext } from '../../contexts/ContextProvider';
import '../../styles/ParqueoFormulario/Parqueo.css';
import Modal from './Modal';
import axiosClient from '../../axios-client';

const Parqueo = ({ onParqueoClick }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [filaSeleccionada, setFilaSeleccionada] = useState(null);
  const [columnaSeleccionada, setColumnaSeleccionada] = useState(null);
  const [estadoEspacioSeleccionado, setEstadoEspacioSeleccionado] = useState(null);
  const [espacios, setEspacios] = useState([]);
  const [numeroSeleccionado, setNumeroSeleccionado] = useState(1);
  const [letraSeleccionada, setLetraSeleccionada] = useState('A');
  const { user, token, notification, setUser, setToken, setRol, rol } = useStateContext();
  const isAdmin1 = rol.rol === 'administrador';

  const handleNumeroChange = (event) => {
    setNumeroSeleccionado(Number(event.target.value));
  };

  const handleLetraChange = (event) => {
    setLetraSeleccionada(event.target.value);
  };

  useEffect(() => {
    axiosClient.get('/ver-espacios')
      .then(({ data }) => {
        setEspacios(data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const habilitar = () => {
    const espacioSeleccionado = `${numeroSeleccionado}${letraSeleccionada}`;
    axiosClient.post(`habilitarEspacio/${espacioSeleccionado}`);
  };

  const eliminar = () => {
    const espacioSeleccionado = `${numeroSeleccionado}${letraSeleccionada}`;
    axiosClient.post(`eliminarEspacio/${espacioSeleccionado}`);
  };

  const handleClick = (fila, columna) => {
    console.log(`Celda clicada: fila ${fila}, columna ${columna}`);
    setFilaSeleccionada(fila);
    setColumnaSeleccionada(columna);
    const estadoEspacio = getEstadoEspacio(fila, columna);
    if (estadoEspacio === 'libre') {
      setModalOpen(true);
    }
    setEstadoEspacioSeleccionado(estadoEspacio);
    onParqueoClick(fila, columna);
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
        isOpen={modalOpen && estadoEspacioSeleccionado === 'libre'}
        onClose={handleCloseModal}
        fila={filaSeleccionada}
        columna={columnaSeleccionada}
      >
        {estadoEspacioSeleccionado !== 'libre' && (
          <div>Espacio reservado</div>
        )}
      </Modal>

      {isAdmin1 && (
        <div>
          <div>
            <button className="button" onClick={habilitar}>Agregar Espacio</button> <br />
            <br/>
            <button className="button" onClick={eliminar}>Eliminar Espacio</button>
          </div>
      
          <div className="selectores">
            <select value={numeroSeleccionado} onChange={handleNumeroChange}>
              {[...Array(10)].map((_, i) => (
                <option key={i} value={i + 1}>{i + 1}</option>
              ))}
            </select>
            <select value={letraSeleccionada} onChange={handleLetraChange}>
              {[...Array(12)].map((_, i) => (
                <option key={i} value={String.fromCharCode(65 + i)}>
                  {String.fromCharCode(65 + i)}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default Parqueo;

