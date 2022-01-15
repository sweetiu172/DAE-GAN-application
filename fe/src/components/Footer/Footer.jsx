import React from "react";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";


function Footer() {
  return (
    <div className="main-footer">
      <div className="container">
        <div className="row">
          {/* Column1 */}
          <div className="col">
            <h4>Project repository</h4>
            <ui className="list-unstyled">
              <li>
                <a style={{color:'#fafafa'}} href="https://github.com/sweetiu172/DEA-GAN-application">
                    <FontAwesomeIcon icon={faGithub} size = '4x'></FontAwesomeIcon>
                </a>
              </li>
            </ui>
          </div>
          {/* Column2 */}
          <div className="col">
            <h4>Resource</h4>
            <ui className="list-unstyled">
              <li>Tilte: DAE-GAN: Dynamic Aspect-aware GAN for Text-to-Image Synthesis</li>
              <li>Author: Ruan, Shulan and Zhang, Yong and Zhang, Kun and Fan, Yanbo and Tang, Fan and Liu, Qi and Chen, Enhong</li>
              <li>Booktitle: Proceedings of the IEEE/CVF International Conference on Computer Vision</li>
              <li>Pages: 13960--13969</li>
              <li>Year: 2021</li>
              <li>Github repository:   
                <a style={{color:'#fafafa'}} href="https://github.com/hiarsal/DAE-GAN" >
                   hiarsal/DAE-GAN
                </a>
              </li>
            </ui>
          </div>
         
         
        </div>
        <hr />
        <div className="row">
          <p className="col-sm">
            &copy;{new Date().getFullYear()} Ton Duc Thang University| All rights reserved |
            Terms Of Service | Privacy
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
