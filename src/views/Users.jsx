import React, { useEffect, useState } from 'react';
import axiosClient from '../axios-client';
import { Link } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';
import { sendSMS } from './smsService';


export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const { setNotification } = useStateContext();

  useEffect(() => {
    getUsers();
  }, []);

  const onDelete = (u) => {
    if (!window.confirm('Estás seguro que quieres eliminar este usuario')) {
      return;
    }

    axiosClient
      .delete(`/usuarios/${u.id}`)
      .then(() => {
        setNotification('El usuario fue eliminado correctamente');
        getUsers();
      });
  };

  const getUsers = () => {
    setLoading(true);
    axiosClient
      .get('/usuarios')
      .then((response) => {
        setLoading(false);
        console.log(response.data); // Verifica que los datos se estén recibiendo correctamente
        setUsers(response.data);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const sendWhatsAppMessage = (phoneNumber) => {
    const url = `https://wa.me/${phoneNumber}`;
    window.open(url, '_blank');
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Users</h1>
        <Link to="/users/new" className="btn-add">
          Add new
        </Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Create Date</th>
              <th>Apellido Materno</th>
              <th>Numero</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="text-center">
                  Loading...
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.created_at}</td>
                  <td>{u.apellido_materno}</td>
                  <td>{u.celular}</td>
                  <td>
                    <Link className="btn-edit" to={`/usuarios/${u.id}`}>
                      Edit
                    </Link>
                    &nbsp;
                    <button onClick={(ev) => onDelete(u)} className="btn-delete">
                      Delete
                    </button>
                    &nbsp;
                    {u.celular && (
                      <button onClick={() => sendWhatsAppMessage("+591"+u.celular)} className="btn-whatsapp">
                        Send WhatsApp
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
