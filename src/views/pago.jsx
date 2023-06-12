import React, { useState } from 'react';
import '../styles/info/User.css';

export default function Pago() {
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleConfirmClick = () => {
    setIsConfirmed(true);
  };

  return (
    <div>
      <h1 className="titulo">Confirmar Pago</h1>
      <button
        onClick={handleConfirmClick}
        className={isConfirmed ? 'boton-confirmado' : 'boton'}
      >
        Confirmar
      </button>
    </div>
  );
}

