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
        <section className="fondo_signup">
            <div className='form_containerR'>
                <Link to={'/'} className="material-icons form_close">close</Link>
                <div class="form_imputs">
                    <form onSubmit={onSubmit}>
                        <h1 className='title'>
                            Registrarse
                        </h1>
                        {errors && <div className="alert">
                            {Object.keys(errors).map(key => (
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                            </div>}
                        <div class="input_boxR">
                            <input ref={nameRef} placeholder='Nombres' />
                            <span className="material-icons person">person</span>
                        </div>
                        <div class="input_doble">
                            <input class="input_field" ref={paternoRef} placeholder='Apellido paterno'/>
                            <span className="material-icons persona">person</span>
                            <input class="input_field" ref={maternoRef} placeholder='Apellido materno'/>
                            <span className="material-icons persona1">person</span>
                        </div>
                        <div class="input_doble">
                            <input class="input_field" ref={ciRef} placeholder='CI'/>
                            <span className="material-icons">badge</span>
                            <input class="input_field custom-date-input" ref={fechaNacimientoRef} type='date' placeholder='FechaNacimiento'/>
                        </div>
                        <div class="input_boxR">
                            <input ref={celularRef}  placeholder='celular' />
                            <span className="material-icons email">celular</span> 
                        </div>
                        <div class="input_boxR">
                            <input ref={emailRef} type='email' placeholder='Email' />
                            <span className="material-icons email">mail</span> 
                        </div>
                        <div class="input_boxR">
                            <input ref={passwordRef} type='password' placeholder='Password'/>
                            <span className="material-icons password">lock</span>
                            {/* <span className="material-icons visibility_off">visibility_off</span> */}
                        </div>
                        <div class="input_boxR">
                            <input ref={passwordConfirmationRef} type='password' placeholder='Password confirmation'/>
                            <span className="material-icons password">lock</span>
                            {/* <span className="material-icons visibility_off">visibility_off</span> */}
                        </div>                                           
                        <button className='btn btn-block'>Registrarse</button>
                        <p className='message'>
                            ¿Ya estas registrado? <Link to="/login">Inicia Sesión</Link>
                        </p>
                    </form>
                </div>
            </div>
        </section>
    </div>

  )
}
