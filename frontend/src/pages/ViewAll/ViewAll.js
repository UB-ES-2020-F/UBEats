import React from 'react';
import {Link} from 'react-router-dom';
import RestPreviewMin from'../../commons/components/RestPreviewMin.js'
import CategoriasHome from'../../commons/components/CategoriasHome.js'

import '../../commons/components/Main.css'

const listaprops = [{
    Image:"https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1301&q=80",
    name: "Hey que tal",
    time: "Lo que cueste",
    price: "Guapo",
  },
  {
    Image:"https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1301&q=80",
    name: "2",
    price: "Lo que cueste",
  },
  {
    Image:"https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1301&q=80",
    name: "3",
    price: "Lo que cueste",
  },
  {
    Image:"https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1301&q=80",
    name: "4",
    price: "Lo que cueste",
  },
  ]

  function ViewAll() {

  return (
    <body2>
        <section className="login">
            <div className="listings">
                <div className="container3">
                    <div className="listings-grid">
                        <div className="listings-col"> {listaprops.map( (restaurante) =><RestPreviewMin Image={restaurante.Image} name={restaurante.name} price={restaurante.price} />)} </div>
                    </div>
                </div>
            </div>
        </section>
    </body2>
    );
  }

  export default ViewAll;