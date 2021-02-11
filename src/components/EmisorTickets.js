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
    const [shopList, setShopList] = useState([]);

    /*const [subtotal, setSubtotal] = useState();
    const [total, setTotal] = useState()

    useEffect(() => {
        let suma = 0;
        for (let i = 0; i < listaCarrito.length; i++) {
            suma = suma + listaCarrito[i].subtotal;            
        }
        setSubtotal(suma);
        setTotal(suma);
        // decscuento setTotal(suma * 0.75);
    }, [listaCarrito])*/

    const handleChange = e => {
        setProduct({
            ...product,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = async e => {
        e.preventDefault();
        if(product.name === ''){
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
            setProduct({
                name: ''
            })
        }else {
            alert('Hubo un error');
        }
        handleShow();
    }

    const handleChangeCantidad = (producto) =>{        
        setShopList([
            ...shopList.map(prod => prod.id === producto.id ? 
             {...prod,                
                 cantidad : document.getElementById(producto.id).value,
                 subtotal : document.getElementById(producto.id).value * producto.precio
             } 
             : prod
             )
        ])
        console.log(producto);
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
                            <td><input
                             id={producto.id}
                             type="number"
                             min={1}
                             defaultValue={1}
                             onChange={() => handleChangeCantidad(producto)}/></td>
                            <td>${producto.precio}</td>
                            <td>${producto.subtotal}</td>
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
