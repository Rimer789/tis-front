import React, { useState } from 'react';
import '../styles/info/User.css';
import '../styles/info/precio.css'; // Archivo CSS personalizado

export default function Precio() {
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const toggleQuestion = (index) => {
    if (selectedQuestion === index) {
      setSelectedQuestion(null);
    } else {
      setSelectedQuestion(index);
    }
  };

  const tarifaAuto = 6; // Tarifa inicial para autos

  const generarTablaPrecios = () => {
    const tablaPrecios = [];

    for (let horas = 1; horas <= 24; horas++) {
      let precioAuto = tarifaAuto * horas;
      // Agrega lógica para calcular el precio de la moto si es necesario
      
      tablaPrecios.push(
        <tr key={horas}>
          <td>{horas} hora(s)</td>
          <td>{precioAuto.toFixed(2)} bs</td>
          {/* <td>{precioMoto.toFixed(2)} bs</td> */}
        </tr>
      );
    }

    return tablaPrecios;
  };

  const questions = [
    {
      question: '¿Cuál es el costo por hora/día?',
      answer: (
        <div>
          <p>El costo por hora es de $X y el costo por día es de $Y.</p>
          {selectedQuestion === 0 && (
            <table>
              <thead>
                <tr>
                  <th>Hora</th>
                  <th>Auto</th>
                  {/* <th>Moto</th> */}
                </tr>
              </thead>
              <tbody>
                {generarTablaPrecios()}
              </tbody>
            </table>
          )}
        </div>
      ),
    },
    {
      question: '¿Cuáles son los métodos de pago aceptados?',
      answer: 'Por el momento solo aceptamos pagos mediante codigo QR',
    },
    // Agrega más preguntas y respuestas aquí
  ];

  return (
    <div>
      <h2>Preguntas frecuentes</h2>
      <div className="accordion">
        {questions.map((q, index) => (
          <div className="accordion-item" key={index}>
            <div
              className={`accordion-title ${
                selectedQuestion === index ? 'active' : ''
              }`}
              onClick={() => toggleQuestion(index)}
            >
              {q.question}
            </div>
            {selectedQuestion === index && (
              <div className="accordion-content">{q.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
