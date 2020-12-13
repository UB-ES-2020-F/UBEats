import '../../commons/components/ShoppingCart.css';
import React, {useEffect, useState} from 'react';

class ShoppingCart extends React.Component {
    render() {  
      return (
        <body>
            <div className='container'>
                <h5>Soy el titulo</h5>
                <h7>Soy el el precio €</h7><p></p>
                <h5><b>Cantidad</b></h5>
                <input className="number" type="number" id="quantity" name="quantity" min="1" max="30"></input>
                <button className="eliminar">Eliminar</button>
                
            </div>
        </body>
      );
    }
  }
  
  export default ShoppingCart;