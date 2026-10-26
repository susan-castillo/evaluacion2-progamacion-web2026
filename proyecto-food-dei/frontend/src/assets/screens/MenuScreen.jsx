import {useEffect, useState} from 'react'
import {Alert, Container, Navbar, NavbarBrand, Spinner} from "reactstrap";
import ReservaInfo from "../components/ReservaInfo.jsx";
import MenuCatalog from "../components/MenuCatalog.jsx";
import {agregarAReserva, getMenu, getReserva} from "../../api/inventoryService.js";

function MenuScreen() {
    //Declaración de variables de estado para almacenar el menú, la reserva, mensaje de error y estado de carga
    const [menu, setMenu] = useState([]);
    const [reserva, setReserva] = useState({saldo: 0, total: 0, itemsReservados: []});
    const [errorMsg, setErrorMsg] = useState('');
    const [cargando, setCargando] = useState(false);

    // Funcion cargar datos nos sirve para poder hacer la peticion al backend y obtener el menú y la reserva
    const cargarDatos = async () => {
        setCargando(true);
        try {
            const [dataMenu, dataReserva] = await Promise.all([getMenu(), getReserva()]);
            setMenu(dataMenu);
            setReserva(dataReserva);
        } catch (err) {
            setErrorMsg('Error de conexión con el servidor backend');
        } finally {
            setCargando(false);
        }
    };

    // Agrega un plato a la reserva y actualiza el estado con la respuesta del backend
    const handleAgregar = async (alimentoId, cantidad) => {
        try {
            setErrorMsg('');
            const reservaActualizada = await agregarAReserva(alimentoId, cantidad);
            setReserva(reservaActualizada);
        } catch (err) {
            setErrorMsg(err.message);
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
            <ReservaInfo saldo={reserva.saldo} total={reserva.total}/>

            {/* Captura y despliegue de mensajes de error de la API */}
            <Alert color="danger" className="mt-3" isOpen={!!errorMsg} toggle={() => setErrorMsg('')}>
                {errorMsg}
            </Alert>

            {/* Si el estado de la variable cargando esta en true entonces mostrara lo siguiente */}
            {cargando && (<div className="text-center my-3">
                <Spinner color="primary" size="sm"/>
                <span className="ms-2 text-muted fw-bold">Cargando...</span>
            </div>)}

            {/*Catálogo de platos disponibles*/}
            <MenuCatalog menu={menu} onAgregar={handleAgregar}/>
        </Container>
    </>)
}

export default MenuScreen