import React, { useState } from 'react';
// import './App.css';
// import Header from '../Header/Header.jsx';
import InputText from '../TextInput/TextInput';
import { Container, Row, Col } from 'reactstrap';
import ImageOutput from "../ImageOutput/ImageOutput";
// import Home from './components/Home/Home.jsx';

function Tools() {
    const [image, setImage] = useState({})
    async function callback(image) {
      setImage(image)
    }
    console.log(image.data)
      return (
        <div className='tools'>
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

export default Tools;