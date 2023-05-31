import React, { useState, useEffect } from "react";

import '../styles/ParqueoFormulario/ParqueoFormulario.css';



import Parqueo from "./ParqueoFormulario/Parqueo";
import DescripcionEspacios from "./ParqueoFormulario/DescripcionEspacios";
import EspacioOcupado from "./ParqueoFormulario/EspacioOcupado";
import EspacioLibre from "./ParqueoFormulario/EspacioLibre";
import EspacioReservado from "./ParqueoFormulario/EspacioReservado";
import EspacioDeshabilitado from "./ParqueoFormulario/EspacioDeshabilitado";
import axiosClient from "../axios-client";

const ParqueoFormulario = () => {

  const [filaSeleccionada, setFilaSeleccionada] = useState(null);
  const [columnaSeleccionada, setColumnaSeleccionada] = useState(null);
  const [estadoEspacio, setEstadoEspacio] = useState("");


  useEffect(() => {
    if (filaSeleccionada && columnaSeleccionada) {
      axiosClient.get(`/espacio/${filaSeleccionada}${columnaSeleccionada}`)
        .then(({ data }) => {
          console.log(data)
          console.log(data.estado)
          setEstadoEspacio(data.estado);
          
        })
        .catch(error => {
          console.log(error);
        })
    }
  }, [filaSeleccionada, columnaSeleccionada]);


  // useEffect(() => {
  //     if (filaSeleccionada && columnaSeleccionada) {
  //       fetch(`http://127.0.0.1:8000/api/espacio/${columnaSeleccionada}${filaSeleccionada}`)
  //         .then(response => response.json())
  //         .then(data => {
  //           console.log(data)
  //           setEstadoEspacio(data[0]);
  //         })
  //         .catch(error => {
  //           console.log(error);
  //         });
  //     }
  //   }, [filaSeleccionada, columnaSeleccionada]);



  const handleParqueoClick = (fila, columna) => {
    setFilaSeleccionada(fila);
    setColumnaSeleccionada(columna);
  }


  return (
    <div className="split-screen">
      <div className="split-screen-left">
        <Parqueo onParqueoClick={handleParqueoClick} />
      </div>
      <div className="split-screen-right">
        <div className="split-screen-top">
          <div className="centered-top">
            <DescripcionEspacios />
          </div>
        </div>
        <div className="split-screen-bottom">
          <div className="centered-bot">
            {/* <div className="split-screen-bottom"> */}
              {/* <p>Fila: {filaSeleccionada}</p>
                <p>Columna: {columnaSeleccionada}</p>

                {estadoEspacio ? (
                  <div>
                    <p>Estado: {estadoEspacio.estado}</p>
                  </div>
                ) : null} */}

              <div>
                {estadoEspacio && (
                  <>
                    {estadoEspacio === 'libre' && (
                      <EspacioLibre id_espacio={filaSeleccionada + columnaSeleccionada} />
                    )}
                    {estadoEspacio === 'ocupado' && (
                      <EspacioOcupado id_espacio={filaSeleccionada + columnaSeleccionada} />
                    )}
                    {estadoEspacio === 'reservado' && (
                      <EspacioReservado id_espacio={filaSeleccionada + columnaSeleccionada} />
                    )}
                    {estadoEspacio === 'deshabilitado' && (
                      <EspacioDeshabilitado id_espacio={filaSeleccionada + columnaSeleccionada} />
                    )}
                  </>
                )}
              </div>



            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParqueoFormulario;
