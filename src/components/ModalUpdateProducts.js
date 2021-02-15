import React from 'react';
import {Modal, Button, Form, Col} from 'react-bootstrap';

export default function ModalUpdateProducts({show, handleClose, handleShow, productToUpdate,
     setProductToUpdate, productsList ,setProductsList}) {

    const handleChange = e =>{
        setProductToUpdate({
            ...productToUpdate,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = async e =>{
        e.preventDefault();
        console.log(productToUpdate);

        if(productToUpdate.nombre === '' || productToUpdate.stock === '' || productToUpdate.precio === ''){
            alert('Deben completarse todos los campos');
            return;
        }
        let url = 'http://localhost:4000/api/updateproduct/'+productToUpdate.id;
        const solicitud = await fetch(url,{
            method : 'PUT', 
            body: JSON.stringify(productToUpdate),          
            headers : {
            'Content-Type' : 'application/json',
            }
        })

        const respuesta = await solicitud.json();

        if(solicitud.ok) { 
            alert('Producto modificado correctamente');
            setProductsList([
                ...productsList.filter(prod => prod.id !== productToUpdate.id),
                productToUpdate
            ])
            handleClose();            
        }else{
            alert(respuesta.msg);
        }
    }

    return (
            <>                
                <Modal size="xl" show={show} onHide={handleClose}>
                    <Modal.Header closeButton>                
                    <Modal.Title>Actualizar producto</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formGridAddress1">
                                <Form.Label>Nombre del producto</Form.Label>
                                <Form.Control
                                 name="nombre"
                                 type="text"
                                 value={productToUpdate.nombre}
                                 onChange={handleChange}
                                 required
                                />
                            </Form.Group>

                            <Form.Row>
                                <Form.Group as={Col}>
                                <Form.Label>Stock</Form.Label>
                                <Form.Control
                                 name="stock"
                                 type="number"
                                 value={productToUpdate.stock}
                                 onChange={handleChange}
                                 required
                                />
                                </Form.Group>

                                <Form.Group as={Col}>
                                <Form.Label>Precio</Form.Label>
                                <Form.Control
                                 name="precio"
                                 type="number"
                                 value={productToUpdate.precio}
                                 onChange={handleChange}
                                 required
                                />
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    Actualizar
                                </Button>
                            </Form.Row>
                        </Form>
                                
                    </Modal.Body>
                    
                </Modal>
            </>
    )
}
