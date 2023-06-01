import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider';

export default function ReservaSimple() {
  const nameRef = useRef();
  const celular = useRef();
  const ciRef = useRef();
  const paternoRef = useRef();
  const maternoRef = useRef();
  const espacio = useRef();
  const tiempoIni = useRef()
  const tiempoFin = useRef();

  const{setUser, setToken} = useStateContext()
  const [errors, setErrors] =useState(null);

  

  const onSubmit = (e) => {
      e.preventDefault();
      const payload = {
          name: nameRef.current.value, 
          celular: celular.current.value,
          ci: ciRef.current.value,
          apellido_paterno: paternoRef.current.value,
          apellido_materno: maternoRef.current.value,
          espacio: espacio.current.value,
          tiempoIni: tiempoIni.current.value,
          tiempoFin: tiempoFin.current.value,
      }
      console.log(payload)
      axiosClient.post('/signup', payload)
      .then(({data}) => {
          setUser(data.user)
          setToken(data.token)
      })
      .catch(err => {
          const response = err.response;
          if(response && response.status === 422){
              console.log(response.data.errors);
              setErrors(response.data.errors);
          }
      })
  }

return (
  <div className='login-signup-form animated fadeInDown'>
  <div className='form'>
      <form onSubmit={onSubmit}>
          <h1 className='title'>
              Registrar
          </h1>
          {errors && <div className="alert">
              {Object.keys(errors).map(key => (
                  <p key={key}>{errors[key][0]}</p>
              ))}
              </div>}
          <input ref={nameRef} placeholder='Nombre Completo' />
          <input ref={paternoRef} placeholder='Apellido paterno'/>
          <input ref={maternoRef} placeholder='Apellido materno'/>
          <input ref={celular}  placeholder='Numero de Celular' />
          <input ref={ciRef} placeholder='CI'/>
          <input ref={espacio} placeholder='espacio de sitio'/>
          <input ref={tiempoIni} placeholder='hora inicio'/>
          <input ref={tiempoFin} placeholder='hora fin'/>
          <button className='btn btn-block'>Registrar</button>
      </form>
  </div>
</div>
)
}
