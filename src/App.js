import React, {useState, useEffect} from 'react'
import './App.css';
import { Container } from 'react-bootstrap';
import EmisorTickets from './components/EmisorTickets';
import Header from './layout/Header';
import Menu from './layout/Menu';


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
      <Container className="border border-white" fluid>
        <Header date={date} />
        <Menu />
      </Container>
      
    </>
  );
}

export default App;
