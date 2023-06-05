
import React, { useState, useEffect, useRef} from 'react';
import { useStateContext } from '../../contexts/ContextProvider';
import '../../styles/ParqueoFormulario/Modal.css';
import DatePicker from 'react-datepicker';
import axiosClient from '../../axios-client';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datetime/css/react-datetime.css';
import { format, differenceInMinutes } from 'date-fns';

const Modal = ({ isOpen, onClose, fila, columna }) => {
  const [vehiculos, setVehiculos] = useState([]);
  const { user, token, notification, setUser, setToken, setRol, rol } = useStateContext();

  const placa = useRef();

  const [errors, setErrors] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [timeDifference, setTimeDifference] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [payload, setPayload] = useState(null);
  const [users, setUsers] = useState([]);       //cambiar para resevir todos los autos del usuario
  const [selectedUser, setSelectedUser] = useState('');   //cambiar para resevir todos los autos del usuario

  useEffect(() => {
    getVehiculos();
  }, []);

  const getVehiculos = () => {
    
    axiosClient
      .get('/list-vehiculo')
      .then(({ data }) => {
        
        console.log(data);
        if (Array.isArray(data)) {
          setVehiculos(data);
        }
      })
      
  };

  useEffect(() => {    //cambiar para resevir todos los autos del usuario
    getUsers();
  }, []);

  const getUsers = () => {
    axiosClient.get('/users')    //cambiar para resevir todos los autos del usuario
      .then(({ data }) => {
        setUsers(data.data);
      });
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const calculateTimeDifference = () => {
    const timeDifferenceInMinutes =  Math.round (differenceInMinutes(endDate, startDate)*0.2);
    setTimeDifference(timeDifferenceInMinutes);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formattedStartDate = format(startDate, 'yyyy-MM-dd HH:mm');
    const formattedEndDate = format(endDate, 'yyyy-MM-dd HH:mm');
    calculateTimeDifference();

    const payloadData = {
      name: user.name,
      //celular: user.celular,
      ci: user.ci,
      apellido_paterno: user.apellido_paterno,
      apellido_materno: user.apellido_materno,
      espacio: `${fila + columna}`,
      tiempoIni: formattedStartDate,
      tiempoFin: formattedEndDate,
      estado:'reservado',
      placa: selectedUser,
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
  }, [columna, fila]);



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

           
            <div>
        <label>Usuario:</label>
        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          <option value="">Seleccione un usuario</option>
          {vehiculos.map(vehiculo => (
            <option key={vehiculo.placa} value={vehiculo.placa}>{vehiculo.placa}</option>
          ))}
        </select>
      </div>
            
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
          <div >
            <h1>Costo Total: {timeDifference} bs</h1>
            <img src="https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcSh-wrQu254qFaRcoYktJ5QmUhmuUedlbeMaQeaozAVD4lh4ICsGdBNubZ8UlMvWjKC" alt="Imagen QR" />
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
            {/* <div
              className={pestañaActual === 'registrar' ? 'pestaña activa' : 'pestaña'}
              onClick={() => setPestañaActual('registrar')}
            >
              Registrar
            </div> */}
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
