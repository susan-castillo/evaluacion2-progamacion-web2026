import {useEffect, useState} from 'react'
import {UncontrolledAlert, Col, Container, Navbar, NavbarBrand, Row, Spinner} from "reactstrap";
import ReservaInfo from "../components/ReservaInfo.jsx";
import MenuCatalog from "../components/MenuCatalog.jsx";
import ReservCart from "../components/ReservCart.jsx";
import {agregarAReserva, getInventario, getReserva} from "../../api/inventoryService.js";

function MenuScreen() {
    //Declaración de variables de estado para almacenar el inventario, la reserva, mensaje de error y estado de carga
    const [inventario, setInventario] = useState([]);
    const [reserva, setReserva] = useState({saldo: 0, total: 0, itemsReservados: []});
    const [errorMsg, setErrorMsg] = useState('');
    const [cargando, setCargando] = useState(false);

    // El saldo actual disminuye conforme se agregan platos a la reserva
    const saldoActual = Number((reserva.saldo - reserva.total).toFixed(2));

    // Funcion cargar datos nos sirve para poder hacer la peticion al backend y obtener el inventario y la reserva
    const cargarDatos = async () => {
        setCargando(true);
        try {
            const [dataInventario, dataReserva] = await Promise.all([getInventario(), getReserva()]);
            setInventario(dataInventario);
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
            <ReservaInfo saldo={saldoActual} total={reserva.total}/>

            {/* Captura y despliegue de mensajes de error de la API */}
            <UncontrolledAlert color="warning" className="mt-3" isOpen={!!errorMsg} toggle={() => setErrorMsg('')}>
                {errorMsg}
            </UncontrolledAlert>

            {/* Si el estado de la variable cargando esta en true entonces mostrara lo siguiente */}
            {cargando && (<div className="text-center my-3">
                <Spinner color="primary" size="sm"/>
                <span className="ms-2 text-muted fw-bold">Cargando...</span>
            </div>)}

            {/*Catálogo de platos a la izquierda y carrito de la reserva a la derecha*/}
            <Row>
                <Col lg="8">
                    <MenuCatalog
                        inventario={inventario}
                        itemsReservados={reserva.itemsReservados}
                        onAgregar={handleAgregar}
                    />
                </Col>
                <Col lg="4">
                    <ReservCart
                        itemsReservados={reserva.itemsReservados}
                        inventario={inventario}
                        total={reserva.total}
                    />
                </Col>
            </Row>
        </Container>
    </>)
}

export default MenuScreen