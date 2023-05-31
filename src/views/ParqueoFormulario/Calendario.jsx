import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
// import "../style/Calendario.css";

const Calendario = ({ id_espacio, onDayClick }) => {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/reserva/${id_espacio}`)
      .then((response) => response.json())
      .then((data) => setReservas(data))
      .catch((error) => console.log(error));
  }, [id_espacio]);

  const colorsByStartDate = {};

  const coloresPredeterminados = ["green", "orange", "gray"];
  let currentColorIndex = 0;

  reservas.forEach((reserva) => {
    const startDate = new Date(reserva.fecha_inicio).toDateString();
    if (!colorsByStartDate[startDate]) {
      colorsByStartDate[startDate] = coloresPredeterminados[currentColorIndex];
      currentColorIndex = (currentColorIndex + 1) % coloresPredeterminados.length;
    }
  });

  const handleDayClick = (date) => {
    const fechaReservada = reservas.find((reserva) => {
      const fechaInicio = new Date(reserva.fecha_inicio);
      const fechaFin = new Date(reserva.fecha_fin);
      return date >= fechaInicio && date <= fechaFin;
    });

    if (fechaReservada) {
      onDayClick(fechaReservada.id_reserva);
    }
  };

  const getTileContent = ({ date, view }) => {
    if (view === "month") {
      const fechaInicioReserva = new Date(
        reservas.find((reserva) => {
          const fechaInicio = new Date(reserva.fecha_inicio);
          const fechaFin = new Date(reserva.fecha_fin);
          return date >= fechaInicio && date <= fechaFin;
        })?.fecha_inicio || ""
      ).toDateString();

      const color = colorsByStartDate[fechaInicioReserva];

      if (color) {
        return (
          <div
            style={{
              backgroundColor: color,
              borderRadius: "50%",
              width: "80%",
              height: "80%",
              margin: "10%",
            }}
          />
        );
      }
    }

    return null;
  };

  return (
    <div>
      <h2>Calendario de reservas para el espacio {id_espacio}</h2>
      <Calendar tileContent={getTileContent} onClickDay={handleDayClick} />
    </div>
  );
};

export default Calendario;
