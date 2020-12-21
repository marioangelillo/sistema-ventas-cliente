import React from 'react';
import { Form, Button, Col } from 'react-bootstrap';

export default function AddProduct() {
    return (
        <>
            <h3 className="text-center mt-2">AGREGAR PRODUCTO</h3>
            <Form className="my-3 mx-1"> 
                <Form.Row className="my-1">     
                    <Col xs={6}> 
                       <Form.Control type="text" placeholder="Nombre del producto" />
                    </Col>            
                    <Col xs={2}>
                    <Form.Control type="number" placeholder="Precio" />
                    </Col>
                    <Col xs={2}>
                    <Form.Control type="number" placeholder="Stock" />
                    </Col>
                    <Col xs={2}>
                    <Button variant="secondary w-100">AGREGAR</Button>
                    </Col>                     
                </Form.Row>
            </Form>
        </>
    )
}
