import {useEffect, useState} from 'react'
import {UncontrolledAlert, Col, Container, Navbar, NavbarBrand, Row, Spinner, Badge, Alert, Button} from "reactstrap";
import ReservaInfo from "../components/ReservaInfo.jsx";
import MenuCatalog from "../components/MenuCatalog.jsx";
import ReservCart from "../components/ReservCart.jsx";
import {
    actualizarPorciones,
    agregarAReserva,
    eliminarDeReserva,
    getInventario,
    getReserva
} from "../../api/inventoryService.js";

function MenuScreen() {
    //Declaración de variables de estado para almacenar el inventario, la reserva, mensaje de error y estado de carga
    const [inventario, setInventario] = useState([]);
    const [reserva, setReserva] = useState({saldo: 0, total: 0, itemsReservados: []});
    const [errorMsg, setErrorMsg] = useState('');
    const [cargando, setCargando] = useState(false);

    // Control del temporizador de la reserva (3 minutos = 180 segundos)
    const [tiempoRestante, setTiempoRestante] = useState(180);
    const [tiempoExpirado, setTiempoExpirado] = useState(false);
    const [reservaConfirmada, setReservaConfirmada] = useState(false);

    // Formato MM:SS para la visualización del reloj
    const minutos = Math.floor(tiempoRestante / 60);
    //Calcula los segundos sobrantes con el módulo
    const segundos = tiempoRestante % 60;
    const relojFormateado = `${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;

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

    // Agrega un plato a la reserva y actualiza reserva e inventario con lo que responde el backend
    const handleAgregar = async (alimentoId, cantidad) => {
        if (tiempoExpirado || reservaConfirmada) return;
        try {
            setErrorMsg('');
            const reservaActualizada = await agregarAReserva(alimentoId, cantidad);
            setReserva(reservaActualizada);
            // El backend descuenta el stock al agregar, por lo que se vuelve a pedir el inventario
            setInventario(await getInventario());
        } catch (err) {
            setErrorMsg(err.message);
        }
    };

    // Cambia la cantidad de porciones de un plato (botones - y + del carrito)
    const handleActualizar = async (id, nuevaCantidad) => {
        if (tiempoExpirado || reservaConfirmada) return;
        try {
            setErrorMsg('');
            const reservaActualizada = await actualizarPorciones(id, nuevaCantidad);
            setReserva(reservaActualizada);
            setInventario(await getInventario());
        } catch (err) {
            setErrorMsg(err.message);
        }
    };

    // Quita un plato completo de la reserva (botón Quitar del carrito)
    const handleEliminar = async (id) => {
        if (tiempoExpirado || reservaConfirmada) return;
        try {
            setErrorMsg('');
            const reservaActualizada = await eliminarDeReserva(id);
            setReserva(reservaActualizada);
            setInventario(await getInventario());
        } catch (err) {
            setErrorMsg(err.message);
        }
    };

    // Confirmación y bloqueo de Reserva
    const handleConfirmar = () => {
        if (reserva.itemsReservados.length === 0) return;
        setReservaConfirmada(true);
    };

    // Reiniciar la sesión para una nueva reserva
    const handleReiniciarSesion = async () => {
        setCargando(true);
        try {
            // Solo devolvemos los ítems al stock si el tiempo expiró sin haber confirmado
            if (tiempoExpirado && !reservaConfirmada) {
                for (const item of reserva.itemsReservados) {
                    await eliminarDeReserva(item.id);
                }
            } else if (reservaConfirmada) {
                // Si la reserva fue confirmada, el pedido ya se procesó.
                // Limpiamos los ítems de la reserva para empezar un nuevo pedido sin alterar el stock consumido.
                for (const item of reserva.itemsReservados) {
                    // Eliminamos directamente del carrito local/estado sin reintegrar el stock
                    await eliminarDeReserva(item.id);
                }
            }
        } catch (err) {
            setErrorMsg('Error al restablecer la sesión');
        } finally {
            // Restablecemos contadores, banderas y recargamos la vista
            setTiempoRestante(180);
            setTiempoExpirado(false);
            setReservaConfirmada(false);
            await cargarDatos(); // Obtiene la reserva limpia y el inventario actualizado
            setCargando(false);
        }
    };

    // Llama la funcion cargarDatos() una sola vez al momento de renderizar la pantalla por primera vez
    useEffect(() => {
        // Cargar datos iniciales solo una vez
        cargarDatos();
    }, []);

    // Temporizador en tiempo real
    useEffect(() => {
        // Si la reserva se confirmó o el tiempo ya expiró, el reloj no debe correr
        if (tiempoExpirado || reservaConfirmada) return;
        //Repite la funcion contenida dentro de setInverval cada 1000 miliseg
        const timer = setInterval(() => {
            setTiempoRestante((prev) => {
                if (prev <= 1) {
                    //Cancela y destruye inmediatamente la ejecución periódica del setInterval
                    clearInterval(timer);
                    setTiempoExpirado(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        // Limpiar el intervalo cuando el componente se desmonte o cambien los estados de control
        return () => clearInterval(timer);
    }, [tiempoExpirado, reservaConfirmada]);

    return (<>
        <Container className="my-4">
            {/*Encabezado de la pantalla*/}
            <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="d-flex align-items-center gap-2">
                    <img alt="logo" src="/menu.png" style={{height: 50, width: 50, marginRight: '10px'}}/>
                    <h3 className="fw-bold mb-0">Food Dei</h3>
                </div>

                {/* Contador con Límite de Tiempo */}
                <div>
                    <span className="fw-bold me-2">Tiempo límite de reserva:</span>
                    <Badge color={tiempoRestante < 30 ? "danger" : "warning"} className="fs-6 p-2">
                        ⏱️ {relojFormateado}
                    </Badge>
                </div>
            </div>
            <p className={"fw-light text-start"}>Módulo de gestión de reservas para Food DEI S.A., diseñado para
                consultar el menú disponible, seleccionar platillos y hacer tu reserva.</p>
            <div style={{border: "1px solid #D4D2D2"}}/>

            {/* Alerta cuando el tiempo expira */}
            {tiempoExpirado && (
                <Alert color="danger" className="mt-3 text-center">
                    <h5>El tiempo de tu reserva ha terminado</h5>
                    <p className="mb-2">No completaste la reserva a tiempo. Por favor, reinicia la sesión para empezar
                        de nuevo.</p>
                    <Button color="danger" onClick={handleReiniciarSesion}>
                        Iniciar nueva reserva
                    </Button>
                </Alert>
            )}

            {/* Alerta de confirmación exitosa con botón para reiniciar */}
            {reservaConfirmada && (
                <Alert color="success" className="mt-3 text-center">
                    <h5 className="fw-bold">¡Reserva confirmada con éxito!</h5>
                    <p className="mb-3">
                        El stock seleccionado ha sido bloqueado y registrado para tu almuerzo.
                    </p>
                    <Button color="success" onClick={handleReiniciarSesion}>
                        Realizar una nueva reserva
                    </Button>
                </Alert>
            )}
            {/*Informacion de la reserva*/}
            <ReservaInfo saldo={saldoActual} total={reserva.total}/>

            {/* Captura y despliegue de mensajes de error de la API */}
            <UncontrolledAlert color="danger" className="mt-3" isOpen={!!errorMsg} toggle={() => setErrorMsg('')}>
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
                        onAgregar={handleAgregar}
                    />
                </Col>
                <Col lg="4">
                    <ReservCart
                        itemsReservados={reserva.itemsReservados}
                        inventario={inventario}
                        total={reserva.total}
                        onActualizar={handleActualizar}
                        onEliminar={handleEliminar}
                    />
                    {/* Botón para Confirmar Reserva */}
                    <Button
                        color="success"
                        block
                        className="mt-3 fw-bold"
                        disabled={reserva.itemsReservados.length === 0 || tiempoExpirado || reservaConfirmada}
                        onClick={handleConfirmar}
                    >
                        Confirmar Reserva
                    </Button>
                </Col>
            </Row>
        </Container>
    </>)
}

export default MenuScreen