import {useEffect, useState} from 'react'
import './App.css'
import MenuScreen from "./assets/screens/MenuScreen.jsx";
import LuckyNumberScreen from "./assets/screens/LuckyNumberScreen.jsx"
import {Card, CardBody, Col, Container, Row, Button, CardImg} from "reactstrap";


function App() {
    //Declaración de variables de estado
    const [vistaActual, setVistaActual] = useState("home");

    return (
        <>
            <div>
                {vistaActual !== 'home' && (
                    <div
                        className="p-3 bg-light border-bottom d-flex justify-content-between align-items-center bg-primary-subtle">
                        <Button color="primary" size="sm" onClick={() => setVistaActual('home')}>
                            Home
                        </Button>
                        <span className="fw-bold text-primary-emphasis">Evaluación II - Programación web</span>
                    </div>
                )}

                {/* Pantalla principal */}
                {vistaActual === 'home' && (
                    <>
                        {/* 1. Encabezado */}
                        <div className={"bg-primary-subtle text-primary-emphasis p-3 text-center"}>
                            <div className="d-flex justify-content-center align-items-center gap-3">
                                <img
                                    src="/sitio-web.png"
                                    alt="Logo de la evaluación"
                                    style={{width: "50px", height: "50px"}}
                                />
                                <h3 className="mb-0 fw-bold">Evaluación II - Programación Web</h3>
                            </div>

                            <p className={"text-muted mb-1 mt-2"}>
                                Selecciona el ejercicio que deseas revisar:
                            </p>
                        </div>

                        {/* 2. Tarjetas */}
                        <Container className={"text-center"}>
                            <Row className={"justify-content-center mt-5 gx-5"}>
                                {/* Ejercicio 1 */}
                                <Col xs={8} md={4} className={"mb-3"}>
                                    <Card className={"h-100 shadow bg-body-tertiary rounded"}>
                                        <CardImg
                                            alt="Card image cap"
                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUeJfR4WRzpSHZKoHoobOdiV725s9z0Q4GqE-qv_JCxABbrrbWdNuK5bg&s=10"
                                            top
                                            width="100%"
                                        />
                                        <CardBody className={"d-flex flex-column justify-content-between py-4"}>
                                            <div>
                                                <h4 className={"fw-bold mb-3"}>Ejercicio 1</h4>
                                                <p className={"text-muted"}>
                                                    Juego "Adivina el número". Haz click en el botón para acceder al
                                                    ejercicio.
                                                </p>
                                            </div>
                                            <Button
                                                color={"danger"}
                                                size={"md"}
                                                className={"w-100 mt-2"}
                                                onClick={() => setVistaActual('luckyNumberScreen')}
                                            >
                                                Ir al ejercicio 1
                                            </Button>
                                        </CardBody>
                                    </Card>
                                </Col>

                                {/* Ejercicio 2 */}
                                <Col xs={8} md={4} className={"mb-3"}>
                                    <Card className={"h-100 shadow bg-body-tertiary rounded"}>
                                        <CardImg
                                            alt="Card image cap"
                                            src="https://cdn.blog.paulinacocina.net/wp-content/uploads/2020/01/untitled-copy.jpg"
                                            top
                                            width="100%"
                                        />
                                        <CardBody className={"d-flex flex-column justify-content-between py-4"}>
                                            <div>
                                                <h4 className={"fw-bold mb-3"}>Ejercicio 2</h4>
                                                <p className={"text-muted"}>
                                                    Caso de negocio: Sistema de Reserva Food DEI SA. Haz click en el
                                                    botón para ir al ejercicio.
                                                </p>
                                            </div>
                                            <Button
                                                color={"danger"}
                                                size={"md"}
                                                className={"w-100 mt-2"}
                                                onClick={() => setVistaActual('menuScreen')}
                                            >
                                                Ir al ejercicio 2
                                            </Button>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                    </>
                )}

                {vistaActual === 'luckyNumberScreen' && <LuckyNumberScreen/>}
                {vistaActual === 'menuScreen' && <MenuScreen/>}
            </div>
        </>
    );
}

export default App
