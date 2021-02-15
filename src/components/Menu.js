import React from 'react';
import {Row, Dropdown, Col} from 'react-bootstrap';

export default function Menu() {
        
        return (
            <Row className="p-1">
                <Col sm={12} lg={2}>
                    <Dropdown className="m-1">
                        <Dropdown.Toggle variant="primary w-100" id="dropdown-basic">
                            VENTAS
                        </Dropdown.Toggle>                    

                        <Dropdown.Menu>
                            <Dropdown.Item href="/emisionticket">EMISIÓN DE TICKET</Dropdown.Item> 
                            <Dropdown.Divider />
                            <Dropdown.Item href="#/action-1">SUBTOTAL</Dropdown.Item>                         
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                
                <Col sm={12} lg={2}>
                    <Dropdown className="m-1">
                        <Dropdown.Toggle variant="primary w-100" id="dropdown-basic">
                            PRODUCTOS
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="/addproduct">AGREGAR PRODUCTO</Dropdown.Item>                         
                            <Dropdown.Divider />
                            <Dropdown.Item href="/manageproduct">ELIMINAR / MODIFICAR PRODUCTO</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                

                <Col sm={12} lg={2}>
                    <Dropdown className="m-1">
                        <Dropdown.Toggle variant="primary w-100" id="dropdown-basic">
                            VARIOS
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">AGREGAR PRODUCTO</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item href="#/action-2">MODIFICAR PRODUCTO</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item href="#/action-3">ELIMINAR PRODUCTO</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>

            </Row>
        );          
}
