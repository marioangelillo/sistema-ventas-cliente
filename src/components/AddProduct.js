import React, {useState} from 'react';
import { Form, Button, Col } from 'react-bootstrap';

export default function AddProduct() {

    const [product, setProduct] = useState({
        name: '',
        price: '',
        stock: ''
    });

    const handleChange = e =>{
        setProduct({
            ...product,            
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = async e => {
        e.preventDefault();
        //console.log(product);
        if(product.name === '' || product.price === '' || product.stock === ''){
            alert('Debe completar todos los campos');
            return;
        }
        const solicitud = await fetch('http://localhost:4000/api/insert',{   
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
            //setFindProducts(respuesta);
            alert(respuesta.msg);
            setProduct({
                name: '',
                price: '',
                stock: ''
            })
        }else {
            alert('Hubo un error');
        }
    }

    return (
        <>
            <h3 className="text-center mt-2">AGREGAR PRODUCTO</h3>
            <Form className="my-3 mx-1" onSubmit={handleSubmit}> 
                <Form.Row>     
                    <Col xs={12} lg={6}> 
                       <Form.Control
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleChange}                        
                        placeholder="Nombre del producto"
                        className="my-1"
                        required
                        />
                    </Col>            
                    <Col xs={12} lg={2}>
                        <Form.Control
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        placeholder="Precio"
                        className="my-1"
                        required
                        />
                    </Col>
                    <Col xs={12} lg={2}>
                        <Form.Control
                        type="number"
                        name="stock"
                        value={product.stock}
                        onChange={handleChange}
                        placeholder="Stock"
                        className="my-1"
                        required
                        />
                    </Col>
                    <Col xs={12} lg={2}>
                    <Button variant="secondary w-100 my-1" type="submit">AGREGAR</Button>
                    </Col>                     
                </Form.Row>
            </Form>
        </>
    )
}
