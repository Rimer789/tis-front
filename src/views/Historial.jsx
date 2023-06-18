import React, { useState } from 'react';

function Historial() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedTimes, setSelectedTimes] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes hacer algo con las fechas y los horarios seleccionados
    console.log('Fecha de inicio:', startDate);
    console.log('Fecha de fin:', endDate);
    console.log('Horarios seleccionados:', selectedTimes);
  };

  const handleTimeChange = (index, field, value) => {
    const updatedTimes = [...selectedTimes];
    updatedTimes[index] = { ...updatedTimes[index], [field]: value };
    setSelectedTimes(updatedTimes);
  };

  const handleAddTimeSlot = () => {
    setSelectedTimes([...selectedTimes, { startTime: '', endTime: '' }]);
  };

  const isEndTimeValid = (index) => {
    if (index === 0) return true; // No hay horarios previos para comparar en el primer día

    const selectedTime = selectedTimes[index];
    const previousTime = selectedTimes[index - 1];

    const previousEndTime = new Date(`${startDate}T${previousTime.endTime}`);
    const selectedStartTime = new Date(`${startDate}T${selectedTime.startTime}`);

    return selectedStartTime >= previousEndTime;
  };

  return (
    <div>
      <h1>Formulario de fechas y horarios</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="start-date">Fecha de inicio:</label>
        <input
          type="date"
          id="start-date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <label htmlFor="end-date">Fecha de fin:</label>
        <input
          type="date"
          id="end-date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        <h2>Horarios:</h2>
        {selectedTimes.map((timeSlot, index) => (
          <div key={index}>
            <label htmlFor={`start-time-${index}`}>Hora de inicio:</label>
            <input
              type="time"
              id={`start-time-${index}`}
              value={timeSlot.startTime}
              onChange={(e) => handleTimeChange(index, 'startTime', e.target.value)}
            />

            <label htmlFor={`end-time-${index}`}>Hora de fin:</label>
            <input
              type="time"
              id={`end-time-${index}`}
              value={timeSlot.endTime}
              min={timeSlot.startTime} // Establece el mínimo para la hora de fin basado en la hora de inicio seleccionada
              onChange={(e) => handleTimeChange(index, 'endTime', e.target.value)}
              disabled={!isEndTimeValid(index)} // Deshabilita el campo si la hora de fin es anterior a la hora de inicio en el mismo día
            />
          </div>
        ))}

        <button type="button" onClick={handleAddTimeSlot}>Agregar horario</button>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default Historial;
