import React, {useEffect, useState} from "react";
import {Container, Spinner, UncontrolledAlert} from "reactstrap";
import ReservaInfo from "../components/ReservaInfo.jsx";
import {getReserva} from "../../api/reservaService.js";

function LuckyNumberScreen(){
    //Declaración de variables de estado para el mensaje de error y estado de carga
    const [errorMsg, setErrorMsg] = useState('');
    const [cargando, setCargando] = useState(false);

    const cargarDatos = async () => {
        try {

        } catch (err) {
            setErrorMsg('Error de conexión con el servidor backend');
        }
    };

    useEffect(() => {
        cargarDatos();
    }, []);
    return (
        <>
            <Container className="my-4">
                <div className={"d-flex align-items-lg-centers gap-2 mb-3"}>
                    <div>
                        <img
                            alt="Logo Food Dei"
                            src="/guess.png"
                            style={{
                                height: 50, width: 50, marginRight: '10px'
                            }}
                        />
                    </div>
                    <div>
                        <h2>¡Adivina el Número!</h2>
                    </div>
                </div>
                <div style={{border: "1px solid #D4D2D2"}}/>

                {/* Captura y despliegue de mensajes de error de la API */}
                {errorMsg && (<UncontrolledAlert color="warning" className="mt-3">
                    {errorMsg}
                </UncontrolledAlert>)}

                {/* Si el estado de la variable cargando esta en true entonces mostrara lo siguiente */}
                {cargando && (<div className="text-center my-3">
                    <Spinner color="primary" size="sm"/>
                    <span className="ms-2 text-muted fw-bold">Actualizando reserva...</span>
                </div>)}
            </Container>
        </>
    )
}

export default LuckyNumberScreen;