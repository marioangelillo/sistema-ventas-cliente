import React, {useState, useEffect} from 'react'
import './App.css';
import { Container } from 'react-bootstrap';
import {BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'; 
import EmisorTickets from './components/EmisorTickets';
import Menu from './components/Menu';
import AddProduct from './components/AddProduct';
import Header from './layout/Header'
import DeleteProduct from './components/DeleteProduct';

import { library } from "@fortawesome/fontawesome-svg-core";
import {	
  faHome  
} from "@fortawesome/free-solid-svg-icons";

library.add(faHome)


function App() {

  const [date, setDate] = useState();

  useEffect(() => {
    let date = new Date()
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()

    if(month < 10){
      setDate(`${day}/0${month}/${year}`);
    }else{
      setDate(`${day}/${month}/${year}`);
    }    
  }, [])

  return (
    <>

      <Header date={date} />
      <BrowserRouter>
        <Switch>

        <Route
            path="/"
            exact
            component = { () => 
              <Menu />
            }
          />

          <Route
            path="/emisionticket"
            exact
            component = { () => 
              <EmisorTickets />
            }
          />

          <Route
            path="/addproduct"
            exact
            component = { () => 
              <AddProduct />
            }
          />

          <Route
            path="/deleteproduct"
            exact
            component = { () => 
              <DeleteProduct />
            }
          />

        </Switch>
      </BrowserRouter>
      
    </>
  );
}

export default App;
