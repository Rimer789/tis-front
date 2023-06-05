import React from 'react';
import '../styles/info/User.css'

export default function Precios() {
  const tarifaAuto = 4; // Tarifa inicial para autos
  const tarifaMoto = 2; // Tarifa inicial para motos
  const descuentoPorHora = 0.18; // Descuento por hora adicional a partir de la segunda hora

  const generarTablaPrecios = () => {
    const tablaPrecios = [];

    for (let horas = 1; horas <= 24; horas++) {
      let precioAuto = tarifaAuto * horas;
      let precioMoto = tarifaMoto * horas;

      if (horas > 1) {
        const descuento = (horas - 1) * descuentoPorHora;
        precioAuto -= tarifaAuto * descuento;
        precioMoto -= tarifaMoto * descuento;
      }

      tablaPrecios.push(
        <tr key={horas}>
          <td>{horas} hora(s)</td>
          <td>{precioAuto.toFixed(2)} bs</td>
          <td>{precioMoto.toFixed(2)} bs</td>
        </tr>
      );
    }

    return tablaPrecios;
  };

  return (
    <div>
      <h2>Precios por hora</h2>
      <table>
        <thead>
          <tr>
            <th>Hora</th>
            <th>Auto</th>
            <th>Moto</th>
          </tr>
        </thead>
        <tbody>
          {generarTablaPrecios()}
        </tbody>
      </table>
      <h2>precios mensuales</h2>
      <table>
<thead>
  <tr>
    <th>plan mensual</th>
    <th>horario</th>
    <th>auto</th>
    <th>moto</th>
  </tr>
</thead>
<tr>
   <td>mes dia</td>
   <td>8:00 am - 8:00 pm</td>
   <td>500</td>
   <td>200</td>
</tr>
<tbody>
   <td>mes noche</td>
   <td>8:00 pm - 8:00 am</td>
   <td>350</td>
   <td>100</td>
</tbody>
<tbody>
   <td>mes mixto</td>
   <td>24 horas</td>
   <td>600</td>
   <td>300</td>
</tbody>

      </table>
    </div>
  );
}
