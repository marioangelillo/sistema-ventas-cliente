import React from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Header({date}) {
    
    return (       
        <header className="d-flex justify-content-between border-bottom px-2 py-3 mb-2">
            <a className="d-flex" href="/" id="linkHome">
                <Button variant="primary btn-sm mr-1">
                    <FontAwesomeIcon icon={["fa", "home"]}/>
                </Button>
                <h5 className="pt-1">Sistema de Ventas</h5>
            </a>
            <h5>{date}</h5>
        </header>
    )
}
