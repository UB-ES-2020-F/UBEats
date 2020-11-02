import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ProfileRestaurant() {
  return (
    <section className="restauranthomepage">
      <div className="restauranthomepageContainer">

        <img src="frontend/src/images/restaurantbanner.jpg" 
        alt="Restaurant's banner (image not loading)"
        height="180">
        </img>

        <h1 className="text">El raconet de la tieta Quica</h1>

        <p className="text">Rambla de Catalunya 57, Barcelona, 08001</p>

        <p className="text">Rated <strong>4.5/5</strong> (9 users)</p>

        <p className="text">Hidden in plain sight in the touristic center of Barcelona,
          "El raconet de la tieta Quica" specialises in tempting both
          locals and tourists with their classic Mediterranean cuisine
          at affordable prices.
        </p>

        <p className="text"><strong>Picked for you:</strong></p>

        <p className="text">Rata al horno - 7$</p>
        <p className="text">Rata al ajillo - 6$</p>
        <p className="text">Rata a las finas hierbas - 4$</p>
        <p className="text">Perro - 17$</p>
         
      </div>
    </section>

  );
}

export default ProfileRestaurant;