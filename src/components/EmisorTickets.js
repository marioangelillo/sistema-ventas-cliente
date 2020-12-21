import React from 'react';
import { Form, Button, Col, Table } from 'react-bootstrap';

export default function EmisorTickets() {
    return (
        <>
            <Form className="my-3 mx-1">
                <Form.Row>
                    <Col xs={9} sm={10}>
                    <Form.Control placeholder="Nombre del producto" />
                    </Col>
                    <Col xs={3} sm={2}>
                    <Button variant="secondary w-100">Buscar</Button>
                    </Col>                    
                </Form.Row>
            </Form>

            <div className="table-responsive">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>1</td>
                        <td>Mark probamos el nombre del producto largo</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>@mdo2</td>
                        </tr>
                        <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                        </tr>
                        <tr>
                        <td>3</td>
                        <td colSpan="2">Larry the Bird</td>
                        <td>@twitter</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
            
        </>
    )
}
