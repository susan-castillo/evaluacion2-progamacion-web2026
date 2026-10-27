import React from 'react';
import { Badge, Button, Card, CardBody, CardImg, CardText, CardTitle, Col, Row } from 'reactstrap';

// Imagen de cada plato según su id (los archivos están en frontend/public/platos/)
const IMAGENES = {
    101: '/platos/pollo.jpg',
    102: '/platos/lasana.jpg',
    103: '/platos/ensalada-cesar.jpg',
    104: '/platos/sopa.jpg',
    105: '/platos/jugo.jpg'
};

export default function MenuCatalog({ inventario, onAgregar }) {
    return (
        <Row className="mt-4">
            {inventario.map((plato) => {
                // El backend ya descuenta el stock al agregar a la reserva, por lo que plato.stock es lo disponible
                const disponible = plato.stock;

                return (
                    <Col key={plato.id} xs="12" md="4">
                        <Card className="mb-3 shadow-sm">
                            {IMAGENES[plato.id] && (
                                <CardImg
                                    top
                                    src={IMAGENES[plato.id]}
                                    alt={plato.nombre}
                                    style={{ height: 160, objectFit: 'cover' }}
                                    // Si la imagen no existe, se oculta para no mostrar el ícono roto
                                    onError={(e) => { e.target.style.display = 'none'; }}
                                />
                            )}
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