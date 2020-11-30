import React, {useEffect, useState} from 'react';
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
                  <div className="listings-col"> {this.props.location.containerdata.map( (restaurante) =><RestPreviewMin Image={restaurante.url} name={restaurante.name} />)} </div>
                </div>
              </div>
            </div>
            </section>
        </body2>
        );
      }
  }

export default ViewAll;