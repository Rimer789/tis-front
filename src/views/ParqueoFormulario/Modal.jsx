
import React, { useState, useEffect, useRef} from 'react';
import { useStateContext } from '../../contexts/ContextProvider';
import '../../styles/ParqueoFormulario/Modal.css';
import DatePicker from 'react-datepicker';
import axiosClient from '../../axios-client';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datetime/css/react-datetime.css';
import { format, differenceInMinutes } from 'date-fns';

const Modal = ({ isOpen, onClose, fila, columna }) => {
  const { user, token, notification, setUser, setToken, setRol, rol } = useStateContext();

  const nameRef = useRef();
  const celular = useRef();
  const ciRef = useRef();
  const paternoRef = useRef();
  const maternoRef = useRef();
  const espacioLetraRef = useRef();
  const espacioNumeroRef = useRef();
  const placa = useRef();

  const [errors, setErrors] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [timeDifference, setTimeDifference] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [payload, setPayload] = useState(null);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const calculateTimeDifference = () => {
    const timeDifferenceInMinutes = differenceInMinutes(endDate, startDate);
    setTimeDifference(timeDifferenceInMinutes);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formattedStartDate = format(startDate, 'dd/MM/yyyy HH:mm');
    const formattedEndDate = format(endDate, 'dd/MM/yyyy HH:mm');
    calculateTimeDifference();

    const payloadData = {
      name: user.name,
      celular: user.celular,
      ci: user.ci,
      apellido_paterno: user.apellido_paterno,
      apellido_materno: user.apellido_materno,
      espacio: `${columna + fila}`,
      tiempoIni: formattedStartDate,
      tiempoFin: formattedEndDate,
      estado:'reservado',
      placa: placa.value,
    };

    setPayload(payloadData);
    console.log(payloadData);
    console.log(`Diferencia de tiempo en minutos: ${timeDifference}`);

    setIsConfirmed(true);
  };

  const handleConfirm = () => {
    axiosClient.post('/reservar', payload);//reservar espacio de lado cliente
    setIsConfirmed(false);
  };


  const [estado, setEstado] = useState('');
  const [pestañaActual, setPestañaActual] = useState('estado');

  useEffect(() => {

      axiosClient.get(`/espacio/${fila}${columna}`)
        .then(({data})=> {
          console.log(data)
          setEstado(data.estado);
        })
        .catch(error => {
          console.log(error);
        })
  }, [fila, columna]);



  const contenido = {
    estado: (
      <>
        <h2>ESPACIO: {columna + fila}</h2>
        <h2>Estado: Espacio {estado}</h2>
      </>
    ),
    
    reservar: (
      
        <div className='form'>
        {!isConfirmed ? (
          <form onSubmit={onSubmit}>
            <h1 className='title'>Registrar</h1>

           
            <input ref={placa} placeholder='Nro Placa' />
            
            <br/>
            <label>hora inicio:</label>
            <DatePicker
              selected={startDate}
              onChange={handleStartDateChange}
              minDate={new Date()}
              minTime={new Date().getHours() + ':' + new Date().getMinutes()}
              maxTime='23:59'
              showTimeSelect
              timeFormat='HH:mm'
              timeIntervals={15}
              dateFormat='MMMM d, yyyy h:mm aa'
            />
            <br />
            <label>hora fin:</label>
            <DatePicker
              selected={endDate}
              onChange={handleEndDateChange}
              minDate={startDate}
              minTime={new Date().getHours() + ':' + new Date().getMinutes()}
              maxTime='23:59'
              showTimeSelect
              timeFormat='HH:mm'
              timeIntervals={15}
              dateFormat='MMMM d, yyyy h:mm aa'
            />
            <button className='btn btn-block' type='submit'>
              Reservar
            </button>
          </form>
        ) : (
          <div>
            <h1>Costo Total: {timeDifference} bs</h1>
            <h1>aqui va QR</h1>
            <button className='btn btn-block' onClick={handleConfirm}>
              Confirmar
            </button>
            <br />
          </div>
        )}
      </div>
      
    ),
  };

  return isOpen ? (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          
          <div className="pestanas">
            <div
              className={pestañaActual === 'estado' ? 'pestaña activa' : 'pestaña'}
              onClick={() => setPestañaActual('estado')}
            >
              Estado
            </div>
            <div
              className={pestañaActual === 'registrar' ? 'pestaña activa' : 'pestaña'}
              onClick={() => setPestañaActual('registrar')}
            >
              Registrar
            </div>
            <div
              className={pestañaActual === 'reservar' ? 'pestaña activa' : 'pestaña'}
              onClick={() => setPestañaActual('reservar')}
            >
              Reservar
            </div>
          </div>
          
        </div>
        
        <div className="modal-body">{contenido[pestañaActual]}</div>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  ) : null;
};

export default Modal;
