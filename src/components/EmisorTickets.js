import React, {useState} from 'react';
import { Form, Button, Col, Table } from 'react-bootstrap';
import ModalFindProducts from './ModalFindProducts';

export default function EmisorTickets() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [product, setProduct] = useState({
        name: ''
    });    

    const [findProducts, setFindProducts] = useState([]);
    const [shopList, setShopList] = useState([])

    const handleChange = e => {
        setProduct({
            ...product,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = async e => {
        e.preventDefault();
        if(product === ''){
            alert('Debe ingresar nombre del producto');
            return;
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
            setFindProducts(respuesta);  
        }else {
            alert('Hubo un error');
        }
        handleShow();
    }

    return (
        <>
            <Form className="my-3 mx-1" onSubmit={handleSubmit}>
                <Form.Row>
                    <Col xs={9} sm={10}>
                    <Form.Control
                    name="name"
                    value={product.nombre}
                    onChange={handleChange}
                    placeholder="Nombre del producto"
                    required
                    />
                    </Col>
                    <Col xs={3} sm={2}>
                    <Button variant="secondary w-100" type="submit">Buscar</Button>
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
                    {
                        shopList.map(producto =>(
                            <tr>
                            <td>{producto.id}</td>
                            <td>{producto.nombre}</td>
                            <td>{producto.precio}</td>
                            <td>{producto.precio}</td>
                            <td>{producto.stock}</td>
                            </tr>
                        ))
                    }
                        
                    </tbody>
                </Table>
            </div>
            
            <ModalFindProducts 
                show={show}
                handleShow={handleShow}
                handleClose={handleClose}
                findProducts={findProducts}
                shopList={shopList} setShopList={setShopList}
            />
        </>
    )
}
