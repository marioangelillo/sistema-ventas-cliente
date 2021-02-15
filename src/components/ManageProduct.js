import React, {useState} from 'react';
import { Form, Button, Col, Table } from 'react-bootstrap';
import ModalUpdateProducts from './ModalUpdateProducts';

export default function ManageProduct() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [productToUpdate, setProductToUpdate] = useState({
        id: '',
        nombre: '',
        stock: '',
        precio: ''
    })

    const [product, setProduct] = useState({
        name: ''
    });

    const [productsList, setProductsList] = useState([]);

    const handleChange = e =>{
        setProduct({
            ...product,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = async e =>{
        e.preventDefault();
        if(product.name === ''){
            alert('Debe completar el campo nombre');
        }

        const solicitud = await fetch('http://localhost:4000/api/find',{   
        method: 'POST',     
        body : JSON.stringify(product),
        headers : {
        'Content-Type': 'application/json'
        }
        });
        
        console.log(solicitud);
        const respuesta = await solicitud.json();
        console.log(respuesta);

        if(solicitud.ok){
            setProductsList(respuesta);  
            setProduct({
                name: ''
            })
        }else {
            alert('Hubo un error');
        }
    }

    const deleteProduct = async (producto) =>{
        console.log(producto);
        let url = 'http://localhost:4000/api/deleteproduct/'+producto.id;
        const solicitud = await fetch(url,{   
        method: 'DELETE',
        headers : {
        'Content-Type': 'application/json'
        }
        });

        console.log(solicitud);
        const respuesta = await solicitud.json();
        console.log(respuesta);

        if(solicitud.ok){
            alert('Ok');
            setProductsList(
                productsList.filter(prod => prod.id !== producto.id)
            )
        }else{
            alert('Mal')
        }
        
    }

    const updateProduct = (producto) =>{
        setProductToUpdate(producto);
        handleShow();
    }
    return (
        <>
            <Form className="my-3 mx-1" onSubmit={handleSubmit}>
                <Form.Row>
                    <Col xs={9} sm={10}>
                    <Form.Control
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    placeholder="Nombre del producto"
                    required
                    />
                    </Col>
                    <Col xs={3} sm={2}>
                    <Button variant="primary w-100" type="submit">Buscar</Button>
                    </Col>                    
                </Form.Row>
            </Form>

            <div className="table-responsive">
                <Table striped bordered hover>
                    
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Producto</th>
                        <th>Stock</th>
                        <th>Precio</th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        productsList.map(producto =>(
                            <tr key={producto.id}>
                            <td>{producto.id}</td>
                            <td>{producto.nombre}</td>   
                            <td>{producto.stock}</td>                         
                            <td>${producto.precio}</td>
                            <td>
                                <Button variant="danger btn-sm mr-1" onClick={() => deleteProduct(producto)}>ELIMINAR</Button>
                                <Button variant="warning btn-sm" onClick={() => updateProduct(producto)}>MODIFICIAR</Button>
                            </td>
                            </tr>
                        ))
                    }
                        
                    </tbody>
                </Table>
            </div>

            <ModalUpdateProducts
            show={show}
            handleShow={handleShow}
            handleClose={handleClose}
            productsList={productsList} setProductsList={setProductsList}
            productToUpdate={productToUpdate} setProductToUpdate={setProductToUpdate}
            />
            
        </>
    )
}
