

import '../css/Footer.css'
import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

class Footer extends Component {
  render() {
    return (
      <>
        <div className="footer-All">
          <div className="footer1 Wrap">
            <div className="footer-conten--top">
                <div className="foooter-contentchillren">
                  <h5 className="Title-footer">
                  <img src="../img/logo/logo.png" alt="" className="img-logo" />
                     </h5>
                  <p className="contentchillren">Giấy phép mạng xã hội: 3**/GP-BTTTT do Bộ Thông tin và Truyền thông cấp ngày 10/05/2021
                  </p>
                </div>
                <div className="foooter-about">
                    <h5 className="Title-footer">LIÊN HỆ</h5>
                    <ul className="list-unstyled">
                      <li>
                        <NavLink to="/#">Dự Án</NavLink>
                      </li>
                      <li>
                        <NavLink to="/#">Liên Hệ</NavLink>
                      </li>
                      <li>
                        <NavLink to="/#">BLOG</NavLink>
                      </li>
                      <li>
                        <NavLink to="/#">Giải Thưởng</NavLink>
                      </li>
                    </ul>
                </div>
                <div className="foooter-addres">
                <h5 className="Title-footer">Địa Chỉ</h5>
                  <p>
                      <i className="fa fa-home" /> Hồ Chí Minh,  Việt Nam
                  </p>
                  <p>
                      <i className="fa fa-envelope" /> support@music.vn
                  </p>
                  <p>
                      <i className="fa fa-phone" /> + (028) 62576373
                  </p>
                  <p>
                      <i className="fa fa-print" /> + 028 38 48 58 68
                  </p>
                </div>
                <div className="foooter-folowus">
                <h5 className="Title-footer">THEO DÕI</h5>
                <div className="foooter-folowus--icon">
                <NavLink to = "/#" className="facebook">
                <i className="fab fa-facebook-f" />
                </NavLink>
                <NavLink to = "/#" className="twitter">
                <i className="fab fa-twitter" />
                </NavLink>
                <a href = "/#" className="google">
                  <i className="fab fa-google-plus" />
                </a>
                <a href = "/#" className="dribbble">
                  <i className="fab fa-dribbble" />
                </a>
                </div>
                </div>
            </div>
            <div className="footer-conten--bottom">
                <span className="coppyright">© 2020 Copyright: </span>
                <NavLink to="#/" className="coppyright-NavLink">All rights reserved</NavLink>
            </div>
          </div>
        </div>
        
      </>
    );
  }
}

export default Footer;

