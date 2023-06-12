import React, { useEffect, useState } from 'react'
import axiosClient from '../axios-client'
import { Link } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'

export default function Guardias() {
  const [guardias, setGuardias] = useState([])
  const [loading, setLoading] = useState(false)

  const{setNotification} = useStateContext()

  useEffect(() => {
    getGuardias();
  }, [])

  const onDelete = (g) => {
    if(!window.confirm("Estas seguro que quieres eliminar este guardia")){
      return
    }

    axiosClient.delete(`/guardias/${g.id}`)
      .then(() => {
        setNotification('El guardia fue eliminado correctamente')
        getGuardias()
      })
  }

  const getGuardias = () => {
    setLoading(true)
    axiosClient.get('/guardias')
      .then(({data}) => {
        setLoading(false)
        console.log(data);
        setGuardias(data.data)
      })
      .catch(() => {
        setLoading(false)
      })
  }



  return (
    <div>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h1>Guardias</h1>
        <Link to={'/guardias/new'} className="btn-add">Agregar nuevo</Link>
      </div>
      <div className='card animated fadeInDown'>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Create Date</th>
              <th>numero</th>
              <th>ci</th>
            </tr>
          </thead>
          {loading && 
            <tbody>
              <tr>
                <td colSpan={"5"} className='text-center'>
                  Loading...
                </td>
              </tr>
            </tbody>
          }
          {!loading && 
            <tbody>
              {guardias.map(g => (
                <tr>
                  <td>{g.id}</td>
                  <td>{g.name}</td>
                  <td>{g.email}</td>
                  <td>{g.created_at}</td>
                  <td>{g.ci}</td>
                  <td>
                    <Link className='btn-edit' to={'/guardias/'+g.id}>Edit</Link>
                    &nbsp;
                    <button onClick={ev => onDelete(g)} className='btn-delete'>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          }

        </table>
      </div>
    </div>
  )
}
