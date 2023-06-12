import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider';

export default function Signup() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();

    const ciRef = useRef();
    const celularRef = useRef();
    const paternoRef = useRef();
    const maternoRef = useRef();
    const fechaNacimientoRef = useRef();

    const{setUser, setToken} = useStateContext()
    const [errors, setErrors] =useState(null);

    const onSubmit = (e) => {
        e.preventDefault();
        const payload = {
            celular: celularRef.current.value,
            name: nameRef.current.value, 
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
          //  rol:"cliente",
            ci: ciRef.current.value,
            apellido_paterno: paternoRef.current.value,
            apellido_materno: maternoRef.current.value,
            fecha_nacimiento: fechaNacimientoRef.current.value,
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
                Registrarse
            </h1>
            {errors && <div className="alert">
                {Object.keys(errors).map(key => (
                    <p key={key}>{errors[key][0]}</p>
                ))}
                </div>}
            <input ref={nameRef} placeholder='Nombre Completo' />
            <input ref={emailRef} type='email' placeholder='Email' />

            <input ref={ciRef} placeholder='CI'/>
            <input ref={celularRef} placeholder='Celular'/>
            <input ref={paternoRef} placeholder='Apellido paterno'/>
            <input ref={maternoRef} placeholder='Apellido materno'/>
            <input ref={fechaNacimientoRef} type='date' placeholder='FechaNacimiento'/>                    

            <input ref={passwordRef} type='password' placeholder='Password'/>
            <input ref={passwordConfirmationRef} type='password' placeholder='Password confirmation'/>
            <button className='btn btn-block'>Registrarse</button>
            <p className='message'>
                ¿Ya estas registrado? <Link to="/login">Inicia Sesión</Link>
            </p>
        </form>
    </div>
</div>
  )
}
