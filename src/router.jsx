import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Users from "./views/Users";
import NotFound from "./views/NotFound";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Dashboard from "./views/Dashboard";
import UserForm from "./views/UserForm";
import VehiculoForm from "./views/VehiculoForm";

import ReservaSimple from "./views/ReservaSimple";
import ReservaDetallada from "./views/ReservaDetallada";
import Accesos from "./views/Accesos";
import Reservas from "./views/Reservas";
import Cobros from "./views/Cobros";
import Reportes from "./views/Reportes";
import Guardias from "./views/Guardias";
import Historial from "./views/Historial";
import Deudas from "./views/Deudas";
import Precios from "./views/Precios";
import Cuenta from "./views/Cuenta";
import OpcionesAdministrador from "./views/OpcionesAdministrador";
import OpcionesGuardia from "./views/OpcionesGuardia";
import OpcionesCliente from "./views/OpcionesCliente";
import Comunicados from "./views/Comunicados";
import ParqueoFormulario from "./views/ParqueoFormulario";

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {path: '/users', element: <Users />}, 
            {path: '/dashboard', element: <Dashboard />},
            {path: '/', element: <Navigate to = "/parqueo" />},
            {path: '/users/new', element: <UserForm key="userCreate"/>},
            {path: '/users/:id', element: <UserForm key="userUpdate"/>},
            {path: '/vehiculos/new', element: <VehiculoForm key="vehiculoCreate"/>},
            {path: '/vehiculos/:id', element: <VehiculoForm key="vehiculoUpdate"/>},


            {path: '/parqueo', element: <ParqueoFormulario/>},
            {path: '/reservaSimple', element: <ReservaSimple/>},
            {path: '/reservaDetallada', element: <ReservaDetallada/>},
            {path: '/accesos', element: <Accesos/>},
            {path: '/reservas', element: <Reservas/>},
            {path: '/cobros', element: <Cobros/>},
            {path: '/reportes', element: <Reportes/>},
            {path: '/guardias', element: <Guardias/>},
            {path: '/historial', element: <Historial/>},
            {path: '/deudas', element: <Deudas/>},
            {path: '/comunicados', element: <Comunicados/>},
            {path: '/precios', element: <Precios/>},
            {path: '/cuenta', element: <Cuenta/>},
            {path: '/opcionesAdministrador', element: <OpcionesAdministrador/>},
            {path: '/opcionesGuardia', element: <OpcionesGuardia/>},
            {path: '/opcionesCliente', element: <OpcionesCliente/>},

        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />
            },
        ]
    },
    {
        path: '*',
        element: <NotFound />
    }, 
])

export default router;