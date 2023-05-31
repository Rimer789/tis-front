import React from "react";

import '../../styles/ParqueoFormulario/DescripcionEspacios.css'
const DescripcionEspacios = () => {
    return (
        <div className="grillita">
          <div className="filita">
            <div className="celdita-contenedor">
              <div className="celdita-libre"></div>
              <div className="textito">Espacio libre</div>
            </div>
          </div>
          <div className="filita">
            <div className="celdita-contenedor">
              <div className="celdita-ocupada"></div>
              <div className="textito">Espacio ocupado</div>
            </div>
          </div>
          <div className="filita">
            <div className="celdita-contenedor">
              <div className="celdita-reservada"></div>
              <div className="textito">Espacio reservado</div>
            </div>
          </div>
          <div className="filita">
            <div className="celdita-contenedor">
              <div className="celdita-deshabilitada"></div>
              <div className="textito">Espacio deshabilitado</div>
            </div>
          </div>
        </div>
      );

};

export default DescripcionEspacios;
