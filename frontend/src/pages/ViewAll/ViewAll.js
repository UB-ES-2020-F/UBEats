import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import RestPreviewMin from'../../commons/components/RestPreviewMin.js';
import CategoriasHome from'../../commons/components/CategoriasHome.js';

import '../../commons/components/Main.css';

class ViewAll extends React.Component {
  render() {  
    return (
      <body2>
          <div className='container3'>
            <div className="header-title">
              <h2 className='category_title'>{this.props.location.title}</h2>
            </div>
          </div>
          <section className="login">
          <div className="listings">
            <div className="container3">
              <div className="listings-grid">
                <div className="listings-col">{this.props.location.containerdata.map((restaurante) =><RestPreviewMin rest={restaurante}/>)}</div>
              </div>
            </div>
          </div>
          </section>
      </body2>
    );
  }
}

export default ViewAll;