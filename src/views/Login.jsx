import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider';
import axiosClient from '../axios-client';

import 'material-icons/iconfont/material-icons.css';

export default function Login() {

    const emailRef = useRef();
    const passwordRef = useRef();
    const { setUser, setToken } = useStateContext()
    const [errors, setErrors] = useState(null);

    const onSubmit = (e) => {
        e.preventDefault()
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        setErrors(null)
        axiosClient.post('/login', payload)
            .then(({ data }) => {
                setUser(data.user)
                setToken(data.token)
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    if(response.data.errors){
                        setErrors(response.data.errors);
                    }else{
                        setErrors({
                            email: [response.data.message]
                        })
                    }                    
                }
            })
    }
    return (
        <div className='login-signup-form animated fadeInDown'>
            <nav class="nav">
                <a href='#' class="nav_logo">Code Genius</a>
                <button class="button">Iniciar Sesión</button>
            </nav>
            <section className="fondo">
                <div className='form_container'>
                    <span className="material-icons form_close">close</span>
                    <div class="form_imputs">
                        <form action="#" onSubmit={onSubmit}>
                            <h1 className='title'>
                                Iniciar Sesión
                            </h1>
                            {errors && <div className="alert">
                        {Object.keys(errors).map(key => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                        </div>}
                            <div class="input_box">
                                <input ref={emailRef} type='email' placeholder='Email' />
                                <span className="material-icons email">mail</span>
                            </div>
                            <div class="input_box">
                                <input ref={passwordRef} type='password' placeholder='Password' />
                                <span className="material-icons password">lock</span>
                                <span className="material-icons visibility_off">visibility_off</span>
                            </div>
                            <button className='btn btn-block'>Iniciar Sesión</button>
                            <p className='message'>
                                ¿No estas registrado? <Link to="/signup">Registrate</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}
