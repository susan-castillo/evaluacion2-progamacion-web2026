import React from 'react';
import { Badge, Button, Card, CardBody, CardText, CardTitle, Col, Row } from 'reactstrap';

export default function MenuCatalog({ menu, onAgregar }) {
    return (
        <Row className="mt-4">
            {menu.map((plato) => (
                <Col key={plato.id} md="6" lg="4" className="mb-4">
                    <Card className="h-100 shadow-sm">
                        <CardBody className="d-flex flex-column">
                            <div className="d-flex justify-content-between align-items-start mb-2">
                                <Badge color="info" pill>{plato.categoria}</Badge>
                                {plato.stock > 0
                                    ? <Badge color="success" pill>Stock: {plato.stock}</Badge>
                                    : <Badge color="danger" pill>Agotado</Badge>}
                            </div>
                            <CardTitle tag="h5">{plato.nombre}</CardTitle>
                            <CardText className="fw-bold fs-5">${plato.precio.toFixed(2)}</CardText>
                            <Button
                                color="primary"
                                className="mt-auto"
                                disabled={plato.stock === 0}
                                onClick={() => onAgregar(plato.id, 1)}
                            >
                                Agregar
                            </Button>
                        </CardBody>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}