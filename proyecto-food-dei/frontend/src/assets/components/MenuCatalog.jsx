import React from 'react';
import { Badge, Button, Card, CardBody, CardText, CardTitle, Col, Row } from 'reactstrap';

export default function MenuCatalog({ inventario, itemsReservados = [], onAgregar }) {
    return (
        <Row className="mt-4">
            {inventario.map((plato) => {
                // Stock disponible = stock del backend menos lo que ya está en la reserva actual
                const item = itemsReservados.find(i => i.id === plato.id);
                const disponible = plato.stock - (item ? item.cantidad : 0);

                return (
                    <Col key={plato.id} xs="12" md="4">
                        <Card className="mb-3 shadow-sm">
                            <CardBody>
                                <CardTitle tag="h5">{plato.nombre}</CardTitle>
                                <div className="mb-2">
                                    <Badge color="info" pill>{plato.categoria}</Badge>
                                </div>
                                <div className="mb-2">
                                    <Badge color="success" className="fs-6">${plato.precio.toFixed(2)}</Badge>
                                </div>
                                <CardText>Stock disponible: {disponible}</CardText>
                                <Button
                                    color={disponible === 0 ? "secondary" : "primary"}
                                    className="w-100"
                                    disabled={disponible === 0}
                                    onClick={() => onAgregar(plato.id, 1)}
                                >
                                    {disponible === 0 ? "Agotado" : "Añadir a la Reserva"}
                                </Button>
                            </CardBody>
                        </Card>
                    </Col>
                );
            })}
        </Row>
    );
}