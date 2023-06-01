import React from 'react';

export default function Precios() {
  const tarifaAuto = 10; // Tarifa inicial para autos
  const tarifaMoto = 5; // Tarifa inicial para motos
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
<tbody>
   <th>mes dia</th>
   <th>8:00 am - 8:00 pm</th>
   <th>500</th>
   <th>200</th>
</tbody>
<tbody>
   <th>mes noche</th>
   <th>8:00 pm - 8:00 am</th>
   <th>350</th>
   <th>100</th>
</tbody>
<tbody>
   <th>mes mixto</th>
   <th>24 horas</th>
   <th>600</th>
   <th>300</th>
</tbody>

      </table>
    </div>
  );
}
