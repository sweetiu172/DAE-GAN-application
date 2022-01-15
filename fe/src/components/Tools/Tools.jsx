import React, { useState } from 'react';
// import './App.css';
// import Header from '../Header/Header.jsx';
import InputText from '../TextInput/TextInput';
import { Container, Row, Col, Alert } from 'reactstrap';
import { Chip } from '@material-ui/core';

import ImageOutput from "../ImageOutput/ImageOutput";
// import Home from './components/Home/Home.jsx';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  chip: {
    margin: '2px 0',
    height: "20px",
    width: "30vw",
    justifyContent: "left",
  },
  alert: {
    width: "30vw",
    justifyContent: "left",
  }
}));



function Tools() {
    const classes = useStyles();
    const [image, setImage] = useState({})
    async function callback(image) {
      setImage(image)
    }
    const recommend = [
      {
        id: 5,
        value: "this bird has wings that are grey and has a yellow bill",
      },
      {
        id: 2,
        value: "a plump bird with yellow belly black coverts and with wingbars the bill is short and black",
      },
      {
        id: 3,
        value: "this all grey bird has a very small head compared to the rest of it s body which has thick plumage",
      },
      {
        id: 4,
        value: "a small bird that has a black head and throat yellow face breast and belly and yellow wings with black tips",
      },
      {
        id: 1,
        value: "small bird with a white body two orange stripes above it and a black body from the head and the tail with white spots throughout the back",
      },
    ];
    const handleClickBadge = (event) => {
      event.stopPropagation();
      document.getElementById('text-input').value = event.target.innerHTML
    }
    const listItems = recommend.map(item => {
      return (
        <Row key={item.id}>
          <Col xs="5">
            <Chip
              className={classes.chip}
              label={item.value}
              size="small"
              variant="outlined"
              value={item.value}
              onClick={handleClickBadge}
            />
          </Col>
        </Row>
      )
    });
      return (
        <div className='tools'>
          <Container className='mt-5'>
            <div>
              Recommend input:
              {listItems}
              <Alert
                className={classes.alert}
                color="danger"
              >
                Bởi vì sự thiếu sót của model các bạn cần phải nhập đúng ngữ pháp !!
              </Alert>            </div>
            <Row style={{marginTop:"10px",}}>
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