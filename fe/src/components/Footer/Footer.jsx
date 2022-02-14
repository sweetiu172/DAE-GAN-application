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
          <div className="col-4">
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
          <div className="col-8">
            <h4>Resource</h4>
            <ui className="list-unstyled">
              @inproceedings &#123;ruan2021dae,<br />
                &emsp; title=&#123;DAE-GAN: Dynamic Aspect-aware GAN for Text-to-Image Synthesis&#125;,<br />
                &emsp; author=&#123;Ruan, Shulan and Zhang, Yong and Zhang, Kun and Fan, Yanbo and Tang, Fan and Liu, Qi and Chen, Enhong&#125;,<br />
                &emsp; booktitle=&#123;Proceedings of the IEEE/CVF International Conference on Computer Vision&#125;,<br />
                &emsp; pages=&#123;13960--13969&#125;,<br />
                &emsp; year=&#123;2021&#125;<br />
                &#125;
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
