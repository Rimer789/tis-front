
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

  const isAdmin = rol.rol === 'cliente';
  const isAdmin1 = rol.rol === 'guardia';

const placa = useRef();

const [plac, setPlac] = useState('');
const [modelo, setModelo] = useState('');
const [marca, setMarca] = useState('');
const [color, setColor] = useState('');
const [nombre, setNombre] = useState('');
const [ci, setCi] = useState('');
const [ap, setAp] = useState('');
const [am, setAm] = useState('');
const [celular, setCelular] = useState('');



  const [errors, setErrors] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [timeDifference, setTimeDifference] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isConfirmedg, setIsConfirmedg] = useState(false);
  const [payload, setPayload] = useState(null);
  const [payloadg, setPayloadg] = useState(null);
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

  const onSubmitg = (e) => {
    e.preventDefault();
    const formattedStartDate = format(startDate, 'yyyy-MM-dd HH:mm');
    const formattedEndDate = format(endDate, 'yyyy-MM-dd HH:mm');
    calculateTimeDifference();

    const payloadgData = {
      placa: plac,
      modelo: modelo,
      marca: marca,
      color: color,
      apellido_materno: am,
      apellido_paterno:ap,
      name:nombre,
      ci:ci,
      celular:celular,
      espacio: `${fila + columna}`,
      tiempoIni: formattedStartDate,
      tiempoFin: formattedEndDate,
      estado:'ocupado',
      
    };

    setPayloadg(payloadgData);
    console.log(payloadgData);
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
    reservarg: (
      
      <div className='form'>
      {!isConfirmed ? (
        <form onSubmit={onSubmitg}>
          <h1 className='title'>Registrar</h1>

          <div>
          <label>nombre:</label>
          <input
            type='text'
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <div>
          <label>ci:</label>
          <input
            type='text'
            value={ci}
            onChange={(e) => setCi(e.target.value)}
          />
          <div>
          <label>Apellido paterno:</label>
          <input
            type='text'
            value={ap}
            onChange={(e) => setAp(e.target.value)}
          />
        </div>
        <div>
          <label>apellido materno:</label>
          <input
            type='text'
            value={am}
            onChange={(e) => setAm(e.target.value)}
          />
        </div>
        <div>
          <label>celular:</label>
          <input
            type='text'
            value={celular}
            onChange={(e) => setCelular(e.target.value)}
          />
        </div>
        </div>
        </div>
          <div>
          <label>Placa:</label>
          <input
            type='text'
            value={plac}
            onChange={(e) => setPlac(e.target.value)}
          />
        </div>
        
        <div>
          <label>Modelo:</label>
          <input
            type='text'
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
          />
        </div>
        
        <div>
          <label>Marca:</label>
          <input
            type='text'
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
          />
        </div>
        
        <div>
          <label>Color:</label>
          <input
            type='text'
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
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
            {isAdmin && ( // Verificar si el usuario es administrador
              <div
                className={pestañaActual === 'reservar' ? 'pestaña activa' : 'pestaña'}
                onClick={() => setPestañaActual('reservar')}
              >
                Reservar
              </div>
            )}
             {isAdmin1 && ( // Verificar si el usuario es guardia
              <div
                className={pestañaActual === 'reservar' ? 'pestaña activa' : 'pestaña'}
                onClick={() => setPestañaActual('reservarg')}
              >
                Reservar guardia 
              </div>
            )}
          </div>
          
        </div>
        
        <div className="modal-body">{contenido[pestañaActual]}</div>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  ) : null;
};

export default Modal;
