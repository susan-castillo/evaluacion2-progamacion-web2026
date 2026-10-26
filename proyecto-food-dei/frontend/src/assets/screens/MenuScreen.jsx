import {useEffect, useState} from 'react'
import {Container, Navbar, NavbarBrand, Spinner, UncontrolledAlert} from "reactstrap";
import HeaderInfo from "../components/HeaderInfo.jsx";
import {getReserva} from "../../api/reservaService.js";

function MenuScreen() {
    const [reserva, setReserva] = useState({saldo: 0, total: 0, itemReservados: []});
    const [errorMsg, setErrorMsg] = useState('');
    const [cargando, setCargando] = useState(false);

    const cargarDatos = async () => {
        try {
            const [dataReserva] = await Promise.all([getReserva()]);
            setReserva(dataReserva);
        } catch (err) {
            setErrorMsg('Error de conexión con el servidor backend');
        }
    };

    useEffect(() => {
        cargarDatos();
    }, []);

    return (<>
        <Navbar style={{background: "#F5C827"}} expand="md" className="px-4">
            <NavbarBrand>
                <img
                    alt="Logo Food Dei"
                    src="/logo.png"
                    style={{
                        height: 40, width: 40, marginRight: '10px'
                    }}
                />
                Food Dei
            </NavbarBrand>
        </Navbar>

        <Container className="my-4">
            {/* Información fija superior[cite: 3] */}
            <HeaderInfo saldo={reserva.saldo} total={reserva.total}/>

            {/* Captura y despliegue de mensajes de error de la API[cite: 4] */}
            {errorMsg && (<UncontrolledAlert color="warning" className="mt-3">
                {errorMsg}
            </UncontrolledAlert>)}

            {cargando && (<div className="text-center my-3">
                <Spinner color="primary" size="sm"/>
                <span className="ms-2 text-muted fw-bold">Actualizando reserva...</span>
            </div>)}
        </Container>
    </>)
}

export default MenuScreen
