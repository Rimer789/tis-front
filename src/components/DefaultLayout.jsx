import React, { useEffect, useState} from 'react';
import { Link, Navigate, Outlet } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';
import axiosClient from '../axios-client';
import { HiOutlineUserCircle } from "react-icons/hi";
import "../styles/info/User.css"

export default function DefaultLayout() {
  const [showUserInfo, setShowUserInfo] = useState(false);
  const { user, token, notification, setUser, setToken, setRol, rol } = useStateContext();
  const asideClass = `aside-${rol.rol}`;

  function handleUserIconClick() {
    setShowUserInfo(!showUserInfo);
  }

  useEffect(() => {
    axiosClient.get('/user').then(({ data }) => {
      setUser(data);
    });

    axiosClient.get('/rol').then(({ data }) => {
      setRol(data);
    });
  }, []);

  if (!token) {
    return <Navigate to="/login" />;
  }

  const onLogout = (e) => {
    e.preventDefault();
    axiosClient.post('/logout').then(() => {
      setUser({});
      setToken(null);
    });
  };

  return (
    <div id="defaultLayout">
      <aside className={asideClass}>
        <Link to="/parqueo">Parqueo</Link>
        

        {rol.rol === 'administrador' && (
          <>
            <Link to="/opcionesAdministrador">Enviar Comunicados</Link>
            <Link to="/users">Clientes</Link>
            <Link to="/reservas">Ver Reservas</Link>
            <Link to="/cobros">Cobros</Link>
            <Link to="/reportes">Reportes</Link>
            <Link to="/guardias">Guardias</Link>
          </>
        )}

        {rol.rol === 'guardia' && (
          <>
            <Link to="/opcionesGuardia">Opciones Guardia</Link>
            <Link to="/accesos">Accesos</Link>
            <Link to="/reservaDetallada">Reserva Detallada</Link>
          </>
        )}

        {rol.rol === 'cliente' && (
          <>
            <Link to="/opcionesCliente">Mis Vehiculos</Link>
            <Link to="/historial">Historial</Link>
            <Link to="/deudas">Deudas</Link>
            <Link to="/comunicados">Comunicados</Link>
          </>
        )}

       
        <Link to="/precios">Precios</Link>
        <Link to="/cuenta">Cuenta</Link>
      </aside>

      <div className="content">
        <header>
          
          <div className="user-info">
      <HiOutlineUserCircle size={40} onClick={handleUserIconClick} /> 
      {showUserInfo && (
        <div className="user-details">
          Nombre: {user.name}
          <br/>
          <br/>
          <a href="#" onClick={onLogout} className="btn-logout">
              Logout
            </a>
        </div>
      )}
    </div>
        </header>

        <main>
          <Outlet />
        </main>
      </div>

      {notification && <div className="notification">{notification}</div>}
    </div>
  );
}
