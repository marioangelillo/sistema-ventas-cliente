import React from 'react';
import { Form, Row, Col, Table, InputGroup, FormControl } from 'react-bootstrap'

export default function EmisorTickets() {
    return (
        <>
            <Form className="mt-2">
                <Row>
                <InputGroup className="my-2 mx-4">
                    <InputGroup.Prepend>
                    <InputGroup.Text>Buscar</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl id="inlineFormInputGroup" placeholder="Nombre producto" />
                </InputGroup>
                </Row>
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
