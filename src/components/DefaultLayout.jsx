import React, { useEffect } from 'react';
import { Link, Navigate, Outlet } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';
import axiosClient from '../axios-client';

export default function DefaultLayout() {
  const { user, token, notification, setUser, setToken, setRol, rol } = useStateContext();
  const asideClass = `aside-${rol.rol}`;

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
        <Link to="/reservaSimple">Reserva Simple</Link>
        <Link to="/reservaDetallada">Reserva Detallada</Link>

        {rol.rol === 'administrador' && (
          <>
            <Link to="/opcionesAdministrador">Opciones Administrador</Link>
            <Link to="/accesos">Accesos</Link>
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
          </>
        )}

        {rol.rol === 'cliente' && (
          <>
            <Link to="/opcionesCliente">Opciones Cliente</Link>
            <Link to="/historial">Historial</Link>
            <Link to="/deudas">Deudas</Link>
          </>
        )}

        <Link to="/comunicados">Comunicados</Link>
        <Link to="/precios">Precios</Link>
        <Link to="/cuenta">Cuenta</Link>
      </aside>

      <div className="content">
        <header>
          <div>Header</div>
          <div>
            {user.name}
            <a href="#" onClick={onLogout} className="btn-logout">
              Logout
            </a>
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
