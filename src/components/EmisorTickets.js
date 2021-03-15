import React, {useState, useEffect} from 'react';
import { Form, Button, Col, Table } from 'react-bootstrap';
import ModalFindProducts from './ModalFindProducts';

export default function EmisorTickets({date}) {

    useEffect(() => {
        createTable();
    }, [])

    const createTable = async () =>{
        const solicitud = await fetch('http://localhost:4000/api/createtable',{
            method: 'GET',
            headers : {
            'Content-Type': 'application/json'
            }
        });
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [product, setProduct] = useState({
        name: ''
    });    

    const [findProducts, setFindProducts] = useState([]);
    const [shopList, setShopList] = useState([]);

    const [subtotal, setSubtotal] = useState();
    const [total, setTotal] = useState();

    const [payment, setPayment] = useState()

    useEffect(() => {
        let suma = 0;
        for (let i = 0; i < shopList.length; i++) {
            suma = suma + shopList[i].subtotal;            
        }
        setSubtotal(suma);
        setTotal(suma);
        // decscuento setTotal(suma * 0.75);
    }, [shopList])

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

    const lessAmount = (producto) =>{
        if(1 >= document.getElementById(producto.id).value){
            return;
        }
        document.getElementById(producto.id).value--
        setShopList([
            ...shopList.map(prod => prod.id === producto.id ? 
             {...prod,                
                 cantidad : document.getElementById(producto.id).value,
                 subtotal : document.getElementById(producto.id).value * producto.precio
             } 
             : prod
             )
        ])
    }
    const moreAmount = (producto) =>{

        document.getElementById(producto.id).value++
        setShopList([
            ...shopList.map(prod => prod.id === producto.id ? 
             {...prod,                
                 cantidad : document.getElementById(producto.id).value,
                 subtotal : document.getElementById(producto.id).value * producto.precio
             } 
             : prod
             )
        ])
    }

    const deleteProduct = (producto) =>{
        if(window.confirm('¿Esta seguro que desea descartar producto?')){
            setShopList(shopList.filter(prod => prod.id !== producto.id))
        }        
    }

    const changePayment = e =>{
        setPayment(e.target.value);
    }

    const finSale = async () => {
        
        if(total <= 0){
            alert('El monto total debe ser mayor que cero');
            return;
        }
        
        const solicitud = await fetch('http://localhost:4000/api/newsale',{
            method: 'POST',     
            body : JSON.stringify({total, date, payment}),
            headers : {
            'Content-Type': 'application/json'
            }
        });
        const respuesta = await solicitud.json();
        if(solicitud.ok){
            setShopList([]);
            setPayment('Efectivo')
            alert('Venta finalizada correctamente');
            console.log(respuesta)
        }else{
            alert(respuesta.msg);
        }

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
                <div className="scrollable text-center">
                    <Table striped bordered responsive size="sm">
                        
                        <thead>
                            <tr>
                            <th></th>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Precio</th>
                            <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            shopList.map(product =>(
                                <tr key={product.id}>
                                <td><Button variant="danger btn-sm" onClick={() => deleteProduct(product)}>X</Button></td>
                                <td>{product.nombre}</td>
                                <td className="d-flex justify-content-center">
                                    <Button variant="primary btn-sm mr-1" onClick={() => lessAmount(product)}> - </Button>
                                    <input
                                    id={product.id}
                                    className="text-center w-25"
                                    type="number"
                                    min={1}
                                    defaultValue={1}
                                    readOnly
                                    onKeyDown={e => {e.preventDefault()}}
                                    />
                                    <Button variant="primary btn-sm ml-1" onClick={() => moreAmount(product)}> + </Button>
                                </td>
                                <td>${product.precio}</td>
                                <td>${product.subtotal}</td>
                                </tr>
                            ))
                        }
                                
                        </tbody>
                    </Table>           
                </div>            

            <div className="row fixed-bottom">
                <div className="col-12 col-md-3 offset-md-6">                
                    <Form.Control as="select" value={payment} onChange={changePayment}>
                        <option>Efectivo</option>
                        <option>Tarjeta</option>
                    </Form.Control>
                </div>
                <div className="card col-12 col-md-3 ">
                    <ul className="list-group list-group-flush">                        
                        <li className="list-group-item d-flex justify-content-between">
                            <div>Subtotal: </div>
                            <div>${subtotal}</div>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                            <div>Total: </div>
                            <div>${total}</div>
                        </li>
                        
                        <li className="list-group-item">
                            <Button variant="success w-100" onClick={finSale}>FINALIZAR VENTA</Button>
                        </li>
                    </ul>
                </div>
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
