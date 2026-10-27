import React, {useState} from "react";
import {
    Container, UncontrolledAlert, Form, FormGroup,
    Label, Input, Button, Alert, ListGroup, ListGroupItem, Badge, Card, CardBody
} from "reactstrap";
import {enviarIntento, reiniciarJuego} from "../../api/gameService.js";

function LuckyNumberScreen() {
    // Declaración de variables de estado (sin estado 'cargando')
    const [numero, setNumero] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [tipoAlerta, setTipoAlerta] = useState('info');
    const [gano, setGano] = useState(false);
    const [historial, setHistorial] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    const [enviando, setEnviando] = useState(false);

    // Función para procesar la prueba del número ingresado
    const handleGuess = async (e) => {
        e.preventDefault();
        if (!numero || enviando) return;

        setEnviando(true);
        setErrorMsg('');
        try {
            const data = await enviarIntento(numero);

            if (data.resultado === 'correcto') {
                setMensaje('¡Felicidades! Adivinaste el número oculto.');
                setTipoAlerta('success');
                setGano(true);
            } else if (data.resultado === 'mayor') {
                setMensaje('El número oculto es MAYOR.');
                setTipoAlerta('warning');
            } else if (data.resultado === 'menor') {
                setMensaje('El número oculto es MENOR.');
                setTipoAlerta('warning');
            } else {
                setMensaje(data.mensaje || 'Respuesta inesperada del servidor.');
                setTipoAlerta('danger');
            }

            if (data.historial) {
                setHistorial(data.historial);
            }
            setNumero('');
        } catch (err) {
            setErrorMsg('Error de conexión con el servidor backend');
        } finally {
            setEnviando(false);
        }
    };

    // Función para reiniciar el juego
    const handleReset = async () => {
        setEnviando(true);
        setErrorMsg('');
        try {
            await reiniciarJuego();
            setMensaje('Juego reiniciado. ¡Intenta adivinar el nuevo número!');
            setTipoAlerta('info');
            setGano(false);
            setHistorial([]);
            setNumero('');
        } catch (err) {
            setErrorMsg('Error de conexión con el servidor backend al reiniciar');
        } finally {
            setEnviando(false);
        }
    };

    return (
        <div>
            <Container>
                {/* Encabezado con imagen y título */}
                <div className="d-flex align-items-center gap-2 mb-3">
                    <div>
                        <img
                            alt="Logo Adivina el Número"
                            src="/guess.png"
                            style={{height: 50, width: 50, marginRight: '10px'}}
                        />
                    </div>
                    <div>
                        <h3 className="mb-0 fw-bold">¡Adivina el Número!</h3>
                    </div>
                </div>
                <p className={"fw-light text-start"}>Juego interactivo de lógica y prueba de suerte en el que el usuario
                    intenta adivinar un número secreto entre 1 y 100, recibiendo pistas dinámicas en tiempo real y un
                    historial detallado de intentos.</p>
                <div style={{border: "1px solid #D4D2D2"}}/>
            </Container>
            <Container className="my-5" style={{maxWidth: '555px'}}>

                {/* Captura y despliegue de mensajes de error de la API */}
                {errorMsg && (
                    <UncontrolledAlert color="danger" className="mt-3">
                        {errorMsg}
                    </UncontrolledAlert>
                )}

                {/* Tarjeta principal del juego */}
                <Card className="shadow rounded-5 border-0 mt-4">
                    <CardBody className="p-4">
                        {/* Alerta de resultado (Mayor, Menor o Correcto) */}
                        {mensaje && (
                            <Alert color={tipoAlerta} className="text-center fw-semibold">
                                {mensaje}
                            </Alert>
                        )}

                        {/* Formulario para ingresar el número */}
                        <Form onSubmit={handleGuess}>
                            <FormGroup>
                                <Label for="numInput" className="fw-semibold">
                                    Ingresa un número (1 - 100):
                                </Label>
                                <Input
                                    id="numInput"
                                    type="number"
                                    min="1"
                                    max="100"
                                    value={numero}
                                    onChange={(e) => setNumero(e.target.value)}
                                    disabled={gano || enviando}
                                    placeholder="Ej. 42"
                                    required
                                />
                            </FormGroup>

                            <div className="d-flex gap-2 mt-3">
                                <Button
                                    color="danger"
                                    type="submit"
                                    className="w-100"
                                    disabled={gano || enviando}
                                >
                                    Enviar Intento
                                </Button>

                                <Button
                                    color="secondary"
                                    type="button"
                                    onClick={handleReset}
                                    disabled={enviando}
                                >
                                    Reiniciar
                                </Button>
                            </div>
                        </Form>

                        {/* Lista Dinámica de Historial de Intentos */}
                        <hr className="my-4"/>
                        <h5 className="fw-bold mb-3">Historial de Intentos:</h5>

                        {historial.length === 0 ? (
                            <p className="text-muted text-center my-3">Aún no has realizado ningún intento.</p>
                        ) : (
                            <ListGroup flush className="rounded border">
                                {historial.map((item, index) => (
                                    <ListGroupItem
                                        key={index}
                                        className="d-flex justify-content-between align-items-center"
                                    >
                                    <span>
                                        Intento #{index + 1}: <strong>{item.numero}</strong>
                                    </span>
                                        <Badge
                                            color={
                                                item.resultado === 'correcto'
                                                    ? 'success'
                                                    : item.resultado === 'mayor'
                                                        ? 'info'
                                                        : 'warning'
                                            }
                                            pill
                                        >
                                            {item.resultado === 'correcto' ? '¡Adivinado!' : `El número es ${item.resultado}`}
                                        </Badge>
                                    </ListGroupItem>
                                ))}
                            </ListGroup>
                        )}
                    </CardBody>
                </Card>
            </Container>
        </div>
    );
}

export default LuckyNumberScreen;