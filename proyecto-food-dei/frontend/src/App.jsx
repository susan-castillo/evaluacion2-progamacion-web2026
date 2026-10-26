import React, {useState} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import {Button, Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from 'reactstrap';
import AppRouter from './assets/routes/AppRouter';

function App() {
    // Llamamos la función useNavigate para poder navegar entre las vistas (En esta pantalla nos sirve para evaluar si estamos en la raiz o no)
    const location = useLocation();

    // Estados para manejar el menu toggle
    const [collapsed, setCollapsed] = useState(true);
    const toggleNavbar = () => setCollapsed(!collapsed);

    return (
        <div>
            {location.pathname !== '/' && (
                <Navbar className={"p-3 mb-5"} color="primary-subtle" light>
                    <div className={"d-flex align-items-center"}>
                        <img src="/sitio-web.png" width={30} height={30} alt="Logo" className="me-2"/>
                        <NavbarBrand href="/" className="me-auto text-primary-emphasis fw-bold">
                            Evaluación II - Programación Web
                        </NavbarBrand>
                    </div>
                    <NavbarToggler onClick={toggleNavbar} className="me-2"/>
                    <Collapse isOpen={!collapsed} navbar>
                        <Nav navbar className={"align-items-start"}>
                            <NavItem>
                                <NavLink className="text-primary-emphasis" href="/ejercicio1/">Ejercicio 1</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="text-primary-emphasis" href="/ejercicio2/">Ejercicio 2</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>

            )}
            {/* Render de las vistas según la URL */}
            <AppRouter/>
        </div>);
}

export default App;