import React from 'react';
import {Modal, Button, Table} from 'react-bootstrap';


export default function ModalFindProducts({show, handleClose, handleShow, findProducts, shopList,setShopList}) {

    const AddShop = (prod) =>{
        setShopList([
            ...shopList, prod
        ]);
        handleClose();
    }
    return (
        <>
            
            <Modal size="xl" show={show} onHide={handleClose}>
                <Modal.Header closeButton>                
                <Modal.Title>Lista de productos encontrados</Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                                findProducts.map(producto =>(
                                    <tr>
                                    <td>{producto.id}</td>
                                    <td>{producto.nombre}</td>
                                    <td>{producto.stock}</td>
                                    <td>{producto.precio}</td>
                                    <td><Button className="primary btn-sm" onClick={() => AddShop(producto)}>AGREGAR</Button></td>
                                    </tr>
                                ))
                            }                                
                            </tbody>
                        </Table>
                    </div>
                </Modal.Body>
                
            </Modal>
        </>
    )
}
