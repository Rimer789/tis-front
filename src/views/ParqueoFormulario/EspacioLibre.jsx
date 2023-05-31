import React, { useState, useEffect } from "react";
import axiosClient from "../../axios-client";

const EspacioLibre = ({ id_espacio }) => {
  const [placaVehiculo, setPlacaVehiculo] = useState("");

  useEffect(() => {
    axiosClient.get(`/espacio/${id_espacio}`)
      .then(({data})=> {
        console.log(data)
        setPlacaVehiculo(data.placa_vehiculo);
      })
      .catch(error => {
        console.log(error);
      })
}, [id_espacio]);


  return (
    <div>
      <h2>El espacio {id_espacio} está disponible</h2>
      {placaVehiculo ? (
        <div>
          <p>Placa del vehículo: {placaVehiculo}</p>
          <button>Reservar espacio</button>
        </div>
      ) : (
        <p>Puedes utilizar este espacio para aparcar tu vehículo.</p>
      )}
    </div>
  );
};

export default EspacioLibre;
