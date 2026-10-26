import React from 'react';
import { Badge, Card, CardBody, CardTitle, ListGroup, ListGroupItem } from 'reactstrap';

export default function ReservCart({ itemsReservados = [], inventario = [], total }) {
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
                                <ListGroupItem key={item.id} className="d-flex justify-content-between align-items-center px-0">
                                    <div>
                                        <div className="fw-bold">{plato.nombre}</div>
                                        <small className="text-muted">
                                            {item.cantidad} × ${plato.precio.toFixed(2)}
                                        </small>
                                    </div>
                                    <Badge color="secondary" pill>
                                        ${(plato.precio * item.cantidad).toFixed(2)}
                                    </Badge>
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