import React from 'react';
import { Badge, Button, ButtonGroup, Card, CardBody, CardTitle, ListGroup, ListGroupItem } from 'reactstrap';

export default function ReservCart({ itemsReservados = [], inventario = [], total, onActualizar, onEliminar }) {
    return (
        <Card className="shadow-sm mt-4">
            <CardBody>
                <CardTitle tag="h5" className="fw-bold">Tu reserva actual</CardTitle>

                {itemsReservados.length === 0 ? (
                    <p className="text-muted mb-0">Aún no has agregado platos.</p>
                ) : (
                    <ListGroup flush>
                        {itemsReservados.map((item) => {
                            const plato = inventario.find(p => p.id === item.id);
                            if (!plato) return null;
                            return (
                                <ListGroupItem key={item.id}>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <div className="fw-bold">{plato.nombre}</div>
                                            <small className="text-muted">
                                                {item.cantidad} × ${plato.precio.toFixed(2)}
                                            </small>
                                        </div>
                                        <Badge color="secondary" pill>
                                            ${(plato.precio * item.cantidad).toFixed(2)}
                                        </Badge>
                                    </div>

                                    {/* Controles de porciones (PUT) y quitar plato (DELETE) */}
                                    <div className="d-flex justify-content-between align-items-center mt-2">
                                        <ButtonGroup size="sm">
                                            <Button
                                                outline
                                                color="secondary"
                                                onClick={() => onActualizar(item.id, item.cantidad - 1)}
                                            >
                                                -
                                            </Button>
                                            <Button outline color="secondary" disabled>
                                                {item.cantidad}
                                            </Button>
                                            <Button
                                                outline
                                                color="secondary"
                                                // Si ya no queda stock, no tiene sentido subir más porciones
                                                disabled={plato.stock === 0}
                                                onClick={() => onActualizar(item.id, item.cantidad + 1)}
                                            >
                                                +
                                            </Button>
                                        </ButtonGroup>
                                        <Button color="danger" outline size="sm" onClick={() => onEliminar(item.id)}>
                                            Quitar
                                        </Button>
                                    </div>
                                </ListGroupItem>
                            );
                        })}
                    </ListGroup>
                )}

                <div className="d-flex justify-content-between align-items-center border-top pt-3 mt-3">
                    <span className="fw-bold">Total</span>
                    <span className="fw-bold fs-5">${total.toFixed(2)}</span>
                </div>
            </CardBody>
        </Card>
    );
}