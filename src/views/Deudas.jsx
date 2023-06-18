import React, { useEffect, useState } from 'react';
import axiosClient from '../axios-client';
import { Bar } from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/info/grafico.css'

export default function Reservas() {
  const [reservas, setReservas] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    obtenerReservas();
  }, []);

  const obtenerReservas = () => {
    axiosClient
      .get('/getReservas')
      .then((response) => {
        setReservas(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener las reservas:', error);
      });
  };

  const filtrarReservasPorFecha = () => {
    const reservasFiltradas = reservas.filter((reserva) => {
      const fecha = new Date(reserva.desde_fecha);
      return fecha >= startDate && fecha <= endDate;
    });

    const reservasPorDia = {};
    reservasFiltradas.forEach((reserva) => {
      const fecha = reserva.desde_fecha.split('T')[0];
      if (reservasPorDia[fecha]) {
        reservasPorDia[fecha]++;
      } else {
        reservasPorDia[fecha] = 1;
      }
    });

    return reservasPorDia;
  };

  const reservasPorDia = filtrarReservasPorFecha();
  const labels = Object.keys(reservasPorDia);
  const data = Object.values(reservasPorDia);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Reservas por día',
        data: data,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: 'rgba(0, 0, 0, 0.7)',
          font: {
            size: 12,
            weight: 'bold',
          },
        },
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: 'rgba(0, 0, 0, 0.7)',
          font: {
            size: 12,
            weight: 'bold',
          },
          beginAtZero: true,
        },
      },
    },
  };

  return (
    <div>
      <h2>Reservas</h2>
      <div className="date-picker-container">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          placeholderText="Fecha de inicio"
          className="date-picker"
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          placeholderText="Fecha de fin"
          className="date-picker"
        />
        <button onClick={filtrarReservasPorFecha} className="filter-button">
          Filtrar
        </button>
      </div>
      <div className="chart-container">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}
