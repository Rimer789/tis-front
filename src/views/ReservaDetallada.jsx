import React, { useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import axiosClient from '../axios-client';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datetime/css/react-datetime.css';
import { useStateContext } from '../contexts/ContextProvider';
import { format, differenceInMinutes } from 'date-fns';

export default function ReservaDetallada() {
  const nameRef = useRef();
  const celular = useRef();
  const ciRef = useRef();
  const paternoRef = useRef();
  const maternoRef = useRef();
  const espacioLetraRef = useRef();
  const espacioNumeroRef = useRef();
  const placa = useRef();

  const { setUser, setToken } = useStateContext();
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
    const timeDifferenceInMinutes = differenceInMinutes(endDate, startDate)*0.2;
    setTimeDifference(timeDifferenceInMinutes);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formattedStartDate = format(startDate, 'dd/MM/yyyy HH:mm');
    const formattedEndDate = format(endDate, 'dd/MM/yyyy HH:mm');
    calculateTimeDifference();

    const payloadData = {
      name: nameRef.current.value,
      celular: celular.current.value,
      ci: ciRef.current.value,
      apellido_paterno: paternoRef.current.value,
      apellido_materno: maternoRef.current.value,
      espacio: `${espacioLetraRef.current.value}${espacioNumeroRef.current.value}`,
      tiempoIni: formattedStartDate,
      tiempoFin: formattedEndDate,
      estado:'ocupado',
      placa: placa.value,
    };

    setPayload(payloadData);
    console.log(payloadData);
    console.log(`Diferencia de tiempo en minutos: ${timeDifference}`);

    setIsConfirmed(true);
  };

  const handleConfirm = () => {
    axiosClient.post('/detallada', payload);
    setIsConfirmed(false);
  };

  return (
    <div className='login-signup-form animated fadeInDown'>
      <div className='form'>
        {!isConfirmed ? (
          <form onSubmit={onSubmit}>
            <h1 className='title'>Registrar</h1>

            <input ref={nameRef} placeholder='Nombre Completo' />
            <input ref={paternoRef} placeholder='Apellido paterno' />
            <input ref={maternoRef} placeholder='Apellido materno' />
            <input ref={celular} placeholder='Numero de Celular' />
            <input ref={ciRef} placeholder='CI' />
            <input ref={placa} placeholder='Nro Placa' />
            <label>espacio</label>
            <select ref={espacioLetraRef}>
              <option value='A'>A</option>
              <option value='B'>B</option>
              <option value='C'>C</option>
              <option value='D'>D</option>
              <option value='E'>E</option>
              <option value='F'>F</option>
              <option value='G'>G</option>
              <option value='H'>H</option>
              <option value='I'>I</option>
              <option value='J'>J</option>
              <option value='K'>K</option>
              <option value='L'>L</option>
            </select>
            <select ref={espacioNumeroRef}>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
              <option value='6'>6</option>
              <option value='7'>7</option>
              <option value='8'>8</option>
              <option value='9'>9</option>
              <option value='10'>10</option>
            </select>
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
            <h1>Costo total: {timeDifference} bs</h1>
            <button className='btn btn-block' onClick={handleConfirm}>
              Confirmar
            </button>
            <br />
          </div>
        )}
      </div>
    </div>
  );
}
