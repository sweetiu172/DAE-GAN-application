import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';

import './Home.css';


const useStyles = makeStyles((theme) => ({
  root: {
    // width:' 100%',
    minHeight: '100%',
    backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/framework.png'})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
  },
  media: {
    height: 440,
  },
  eachRow: {
    minHeight: '33vh',
    fontSize: '1vw',
    color: 'rgb(123, 27, 59)',
    margin: '20px 0'
  }
}));

function Home() {
   const classes = useStyles()
    return (
      <div className='home'>
        <Container>
          <Row>
            <Col className={classes.eachRow} xs={4}>
              <h1>About the DEA-GAN.</h1>
              <p>
                With Media Library, you can upload video from anywhe
                and have confidence that all your clips will work on any device.
                Kapwing supports a wide array of file formats including .mp4, .mov, .png, .gif, .jpg, .avi, .webm, and much more.
                Kapwing also supports full transcoding and conversion to optimize your files for the best possible editing experience
              </p>
            </Col>
            <Col>
              {/* <img src={require(`('../../../public/assets/framework.png'})`)} alt='Selected'/> */}
              <div className={classes.root}></div>
            </Col>
          </Row>
          <Row>
            <Col>
              {/* <img src={require(`('../../../public/assets/framework.png'})`)} alt='Selected'/> */}
              <div className={classes.root}></div>
            </Col>
            <Col className={classes.eachRow} xs={4}>
              <h1>How to use</h1>
              <p>
                With Media Library, you can upload video from anywhe
                and have confidence that all your clips will work on any device.
                Kapwing supports a wide array of file formats including .mp4, .mov, .png, .gif, .jpg, .avi, .webm, and much more.
                Kapwing also supports full transcoding and conversion to optimize your files for the best possible editing experience
              </p>
            </Col>
          </Row>
          <Row>
            <Col className={classes.eachRow} xs={4}>
              <h1>About us</h1>
              <p>
                With Media Library, you can upload video from anywhe
                and have confidence that all your clips will work on any device.
                Kapwing supports a wide array of file formats including .mp4, .mov, .png, .gif, .jpg, .avi, .webm, and much more.
                Kapwing also supports full transcoding and conversion to optimize your files for the best possible editing experience
              </p>
            </Col>
            <Col>
              {/* <img src={require(`('../../../public/assets/framework.png'})`)} alt='Selected'/> */}
              <div className={classes.root}></div>
            </Col>
          </Row>
        </Container>
      </div>
    );
}

export default Home;