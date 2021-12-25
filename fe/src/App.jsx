import React from 'react';
import './App.css';

import Header from './components/Header/Header.jsx';
import InputText from './components/TextInput/TextInput';
import { Container, Row, Col } from 'reactstrap';
import ImageOutput from "./components/ImageOutput/ImageOutput";

function App() {
    return (
      <div className='App'>
        <Header/>
        <Container className='mt-5'>
          <Row>
            <Col xs="5"><InputText/></Col>
            <Col><ImageOutput/></Col>
          </Row>
        </Container>
      </div>
    );
}

export default App;