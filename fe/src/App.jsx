import React, { useState } from 'react';
import './App.css';

import Header from './components/Header/Header.jsx';
import InputText from './components/TextInput/TextInput';
import { Container, Row, Col } from 'reactstrap';
import ImageOutput from "./components/ImageOutput/ImageOutput";

function App() {
  const [image, setImage] = useState({})
  async function callback(image) {
    setImage(image)
  }
  console.log(image.data)
    return (
      <div className='App'>
        <Header/>
        <Container className='mt-5'>
          <Row>
            <Col xs="5"><InputText parentCallback={callback}/></Col>
            {image.data !== {} &&
              <Col><ImageOutput image={image.data}/></Col>
            }
          </Row>
        </Container>
      </div>
    );
}

export default App;