import React, { useState } from "react";
import Calendario from "./Calendario";

const EspacioReservado = ({ id_espacio }) => {
  const [mostrarCalendario, setMostrarCalendario] = useState(false);
  const [ocultarCalendario, setOcultarCalendario] = useState(false);

  const [idReserva, setIdReservaSeleccionada] = useState(null);
  const handleDateClick = (idReserva) => {
    setIdReservaSeleccionada(idReserva);
  };


  const handleMostrarCalendario = () => {
    setMostrarCalendario(!mostrarCalendario);
    setOcultarCalendario(!ocultarCalendario);
  };


  

  return (
    <div>
      <h2>El espacio {id_espacio} está reservado</h2>
      <p>No puedes utilizar este espacio para aparcar tu vehículo.</p>
      {idReserva && (
        <p>La reserva seleccionada tiene el id: {idReserva}</p>
      )}
      <button onClick={handleMostrarCalendario}>
        {ocultarCalendario ? "Ocultar calendario" : "Mostrar calendario"}
      </button>
      {mostrarCalendario && <Calendario id_espacio={id_espacio} onDayClick={handleDateClick}/>}

    </div>
  );
};

export default EspacioReservado;

