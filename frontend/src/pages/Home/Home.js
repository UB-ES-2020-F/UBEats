import React from 'react';
import '../../commons/components/App.css'
import photo from '../../images/under_construction.png'
import restService from '../../api/restaurant.js';

import {Link} from 'react-router-dom';

function Helloworld() {


  return (
    <div>
        <h3 className='justi'>Page under construction!</h3>
        <h4>Sorry for the inconvinience!</h4>
        <Link to='/profilerestaurant' onClick={() => restService.getMenu('rrr@gmail.com')}> Aqui restaurant</Link>
        <img src={photo} />
    </div>
  );
}

export default Helloworld;