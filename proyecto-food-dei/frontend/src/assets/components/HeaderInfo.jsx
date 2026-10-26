import React from 'react';
import { Alert, Badge } from 'reactstrap';

export default function HeaderInfo({ saldo, total }) {
    return (
        <Alert color="warning" className="d-flex justify-content-between align-items-center shadow-sm mt-5">
            <h5 className="m-0 fw-bold">Tu saldo actual: ${saldo.toFixed(2)}</h5>
            <div>
                <span className="me-2 fw-bold">Total de tu Reserva:</span>
                <Badge color="secondary" pill className="fs-6 px-3 py-2">
                    ${total.toFixed(2)}
                </Badge>
            </div>
        </Alert>
    );
}