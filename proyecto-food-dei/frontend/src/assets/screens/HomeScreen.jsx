import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, CardImg, CardBody, Button } from 'reactstrap';

function HomeScreen() {
    const navigate = useNavigate();

    return (
        <>
            {/* 1. Encabezado */}
            <div className="bg-primary-subtle text-primary-emphasis p-3 text-center">
                <div className="d-flex justify-content-center align-items-center gap-3">
                    <img
                        src="/sitio-web.png"
                        alt="Logo de la evaluación"
                        style={{ width: "50px", height: "50px" }}
                    />
                    <h3 className="mb-0 fw-bold">Evaluación II - Programación Web</h3>
                </div>

                <p className="text-muted mb-1 mt-2">
                    Selecciona el ejercicio que deseas revisar:
                </p>
            </div>

            {/* 2. Tarjetas de los Ejercicios */}
            <Container className="text-center">
                <Row className="justify-content-center mt-5 gx-5">
                    {/* Ejercicio 1 */}
                    <Col xs={8} md={4} className="mb-3">
                        <Card className="h-100 shadow bg-body-tertiary rounded">
                            <CardImg
                                alt="Ejercicio 1"
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUeJfR4WRzpSHZKoHoobOdiV725s9z0Q4GqE-qv_JCxABbrrbWdNuK5bg&s=10"
                                top
                                width="100%"
                            />
                            <CardBody className="d-flex flex-column justify-content-between py-4">
                                <div>
                                    <h4 className="fw-bold mb-3">Ejercicio 1</h4>
                                    <p className="text-muted">
                                        Juego "Adivina el número". Haz click en el botón para acceder al ejercicio.
                                    </p>
                                </div>
                                <Button
                                    color="danger"
                                    size="md"
                                    className="w-100 mt-2"
                                    onClick={() => navigate('/ejercicio1')}
                                >
                                    Ir al ejercicio 1
                                </Button>
                            </CardBody>
                        </Card>
                    </Col>

                    {/* Ejercicio 2 */}
                    <Col xs={8} md={4} className="mb-3">
                        <Card className="h-100 shadow bg-body-tertiary rounded">
                            <CardImg
                                alt="Ejercicio 2"
                                src="https://cdn.blog.paulinacocina.net/wp-content/uploads/2020/01/untitled-copy.jpg"
                                top
                                width="100%"
                            />
                            <CardBody className="d-flex flex-column justify-content-between py-4">
                                <div>
                                    <h4 className="fw-bold mb-3">Ejercicio 2</h4>
                                    <p className="text-muted">
                                        Caso de negocio: Sistema de Reserva Food DEI SA. Haz click en el botón para ir al ejercicio.
                                    </p>
                                </div>
                                <Button
                                    color="danger"
                                    size="md"
                                    className="w-100 mt-2"
                                    onClick={() => navigate('/ejercicio2')}
                                >
                                    Ir al ejercicio 2
                                </Button>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default HomeScreen;