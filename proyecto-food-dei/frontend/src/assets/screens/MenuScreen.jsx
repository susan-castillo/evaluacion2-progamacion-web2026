import {useEffect, useState} from 'react'
import {Container, Navbar, NavbarBrand, Spinner, UncontrolledAlert} from "reactstrap";
import HeaderInfo from "../components/HeaderInfo.jsx";
import {getReserva} from "../../api/reservaService.js";

function MenuScreen() {
    //Declaración de variables de estado para almacenar la reserva, mensaje de error y estado de carga
    const [reserva, setReserva] = useState({saldo: 0, total: 0, itemReservados: []});
    const [errorMsg, setErrorMsg] = useState('');
    const [cargando, setCargando] = useState(false);

    // Funcion cargar datos nos sirve para poder hacer la peticion al backend y obtener la reserva
    const cargarDatos = async () => {
        try {
            const [dataReserva] = await Promise.all([getReserva()]);
            setReserva(dataReserva);
        } catch (err) {
            setErrorMsg('Error de conexión con el servidor backend');
        }
    };

    // Llama la funcion cargarDatos() una sola vez al momento de renderizar la pantalla por primera vez
    useEffect(() => {
        cargarDatos();
    }, []);

    return (<>
        <Container className="my-4">
            {/*Encabezado de la pantalla*/}
            <div className={"d-flex align-items-lg-centers gap-2 mb-3"}>
                <div>
                    <img
                        alt="logo"
                        src="/menu.png"
                        style={{
                            height: 50, width: 50, marginRight: '10px'
                        }}
                    />
                </div>
                <div>
                    <h2>Food Dei</h2>
                </div>
            </div>
            <div style={{border: "1px solid #D4D2D2"}}/>

            {/*Informacion de la reserva*/}
            <HeaderInfo saldo={reserva.saldo} total={reserva.total}/>

            {/* Captura y despliegue de mensajes de error de la API */}
            {errorMsg && (<UncontrolledAlert color="danger" className="mt-3">
                {errorMsg}
            </UncontrolledAlert>)}

            {/* Si el estado de la variable cargando esta en true entonces mostrara lo siguiente */}
            {cargando && (<div className="text-center my-3">
                <Spinner color="primary" size="sm"/>
                <span className="ms-2 text-muted fw-bold">Cargando...</span>
            </div>)}
        </Container>
    </>)
}

export default MenuScreen
