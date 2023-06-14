import React from "react";

const EspacioOcupado = ({ id_espacio }) => {
  return (
    <div>
      <h2>El espacio {id_espacio} está ocupado</h2>
      <p>No puedes utilizar este espacio para aparcar tu vehículo.</p>
     
    </div>
  );
};

export default EspacioOcupado;
