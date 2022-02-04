import React, { useEffect, useState, useRef } from 'react';
// import './App.css';
// import Header from '../Header/Header.jsx';
import InputText from '../TextInput/TextInput';
import { Container, Row, Col, Alert, Label } from 'reactstrap';
import { Chip } from '@material-ui/core';
import Replay from '@material-ui/icons/Replay';
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
  select: {
    margin: '2px 0',
    height: "50px",
    width: "30vw",
    justifyContent: "left",
  },
  alert: {
    width: "30vw",
    justifyContent: "left",
  },
  icon: {
    color: '#f8331a',
    fontSize: '2rem',
    // margin: '0 20px',
    cursor: 'pointer',
  },
}));



function Tools() {
    const classes = useStyles();
    const [image, setImage] = useState({})
    const [recommend, setRecommend] = useState([{}])
    const childCompRef = useRef()

    async function callback(image) {
      setImage(image)
    }

    async function fetchRecommendInput() {
      fetch('/get_recommend_input').then(
        res => res.json()
      )
      .then(data => {
        setRecommend(data.data)
      })
      .catch((err) => console.log(err))
    }

    useEffect(() => {
      fetchRecommendInput()
    }, [])

    const handleClickBadge = (event) => {
      // event.stopPropagation();
      document.getElementById('text-input').value = event.target.innerText
      childCompRef.current.manualChange(event.target.innerText)
    }
    const handleClickReplayIcon = () => {
      fetchRecommendInput()
    }
    const listItems = recommend.map(item => {
      return (
        <Row
          key={item.id}>
          <Col
            xs="5">
            <Chip
              onClick={handleClickBadge}
              className={classes.chip}
              label={item.value}
              size="small"
              variant="outlined"
              value={item.value}
            />
          </Col>
        </Row>
      )
    });
      return (
        <div className='tools'>
          <Container className='mt-5'>
            <div>
              <Row>
                  <Col xs="6">
                    <Row>
                      <Col xs="10">
                        <Label style={{color:"#f8331a",fontSize:"30px"}}>Recommend Input:</Label>
                      </Col>
                      <Col>
                        <Replay
                          className={classes.icon}
                          onClick={handleClickReplayIcon} />
                      </Col>
                    </Row>
                  </Col>
              </Row>
              {listItems}
              <Alert
                className={classes.alert}
                color="danger"
              >
                Bởi vì sự thiếu sót của model các bạn cần phải nhập đúng ngữ pháp !!
              </Alert>            </div>
            <Row style={{marginTop:"10px",}}>
              <Col xs="5"><InputText parentCallback={callback} ref={childCompRef}/></Col>
              {image.data !== {} &&
                <Col><ImageOutput image={image.data}/></Col>
              }
            </Row>
          </Container>
        </div>
      );
}

export default Tools;