import React from 'react';
import { Navbar, NavDropdown, Nav } from 'react-bootstrap'

export default function Header({date}) {
    
    return (       
        <header className="d-flex justify-content-between border-bottom p-1">
            <h5>Sistema de Ventas</h5>
            <h5>{date}</h5>
        </header>
    )
}
