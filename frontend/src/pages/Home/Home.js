import React from 'react';
import {Link} from 'react-router-dom';
import RestPreviewGeneral from'../../commons/components/RestPreviewGeneral.js'
import CategoriasHome from'../../commons/components/CategoriasHome.js'

import '../../commons/components/Main.css'


const listaprops = [{
  Image:"https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1301&q=80",
  name: "Hey que tal",
  time: "Lo que tarde",
  desc: "Guapo",
},
{
  Image:"https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1301&q=80",
  name: "2",
  time: "Lo que tarde",
  desc: "Guapo",
},
{
  Image:"https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1301&q=80",
  name: "3",
  time: "Lo que tarde",
  desc: "Guapo",
},
{
  Image:"https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1301&q=80",
  name: "4",
  time: "Lo que tarde",
  desc: "Guapo",
},
]


function Home({setRestaurantId, setPicture}) {
  const onClickRestaurantPage = (rest_id, photo) => {
    setRestaurantId(rest_id);
    setPicture(photo);
  };

  return (
    <section className="login">


    <body2>

    <div class="listings">
      <div class="container2">
        <div class="listings-grid">
          <div class="listings-col">
            <div class="listings-grid-element">
              <h2>¿Tienes un antojo? Pídelo.</h2>
              <h1>Busca tu restaurante, cocina o plato favorito.</h1>
            </div>
            <div class="listings-grid-element">
              <div class="image">
                <img src="https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1301&q=80" alt="Listing pic"></img>
              </div>
            </div>
            <div class="listings-grid-element">
              <div class="image">
                <img src="https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1301&q=80" alt="Listing pic"></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="listings">

      <div class="container4">

        <div class="listings-grid">
          
            <div class="listings-grid-element2">
              <div class="image">
                <img src="https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/sushi.png" alt="Listing pic"></img>
              </div>
            </div>
            <div class="listings-grid-element2">
              <div class="image">
                <img src="https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/pizza.png" alt="Listing pic"></img>
              </div>
            </div>
            <div class="listings-grid-element2">
              <div class="image">
                <img src="https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/bbq.png" alt="Listing pic"></img>
              </div>
            </div>
            <div class="listings-grid-element2">
              <div class="image">
                <img src="https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/fastfood.png" alt="Listing pic"></img>
              </div>
            </div>
            <div class="listings-grid-element2">
              <div class="image">
                <img src="https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/japanese.png" alt="Listing pic"></img>
              </div>
            </div>
            <div class="listings-grid-element2">
              <div class="image">
                <img src="https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/burger.png" alt="Listing pic"></img>
              </div>
            </div>
            <div class="listings-grid-element2">
              <div class="image">
                <img src="https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/vegan.png" alt="Listing pic"></img>
              </div>
            </div>
            <div class="listings-grid-element2">
              <div class="image">
                <img src="https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/asian.png" alt="Listing pic"></img>
              </div>
            </div>
            <div class="listings-grid-element2">
              <div class="image">
                <img src="https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/wings.png" alt="Listing pic"></img>
              </div>
            </div>
            <div class="listings-grid-element2">
              <div class="image">
                <img src="https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/streetfood.png" alt="Listing pic"></img>
              </div>
            </div>
            <div class="listings-grid-element2">
              <div class="image">
                <img src="https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/coffeeandtea.png" alt="Listing pic"></img>
              </div>
            </div>
            <div class="listings-grid-element2">
              <div class="image">
                <img src="https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/italian.png" alt="Listing pic"></img>
              </div>
            </div>
            <div class="listings-grid-element2">
              <div class="image">
                <img src="https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/dessert.png" alt="Listing pic"></img>
              </div>
            </div>
            
            
            
          </div>
        </div>
      </div>


      <div className="listings"><CategoriasHome titulo="Populares cerca de ti" listaprops={listaprops.slice(0,3)}/></div>
      <div className="listings"><CategoriasHome titulo="Favoritos" listaprops={listaprops.slice(0,3)}/></div>
 
    <div class="listings">

      <div class="container3">

        <div class="header">
          <div class="header-title">
            <h2>¿Buscas algo diferente?</h2>
          </div>
          <div class="header-viewOptions">
            <div class="viewAll">
              <span>Ver todo</span>
            </div>
            <div class="viewMore">
              <span class="arrow circle left"><i data-feather="arrow-left"></i>
              </span>
              <span class="arrow circle right darker">
                <i data-feather="arrow-right"></i>
              </span>
            </div>
          </div>
        </div>

        <div class="listings-grid">
          <div class="listings-col">
            <div class="listings-grid-element">
              <div class="image">
                <img src="https://duyt4h9nfnj50.cloudfront.net/search_home/essentials.jpg" alt="Listing pic"></img>
              </div>
              <div class="text">
                <div class="text-title">
                  <h3>Productos básicos</h3>
                </div>
              </div>
            </div>
            <div class="listings-grid-element">
              <div class="image">
                <img src="https://duyt4h9nfnj50.cloudfront.net/sku/21b6882726bf71ba17b29ab47ef16d22" alt="Listing pic"></img>
              </div>
              <div class="text">
                <div class="text-title">
                  <h3 onClick={() => onClickRestaurantPage('r2@gmail.com','https://duyt4h9nfnj50.cloudfront.net/sku/21b6882726bf71ba17b29ab47ef16d22')}><Link className='linkto' to='/profilerestaurant'>Sushi</Link></h3>
                </div>
              </div>
            </div>
            <div class="listings-grid-element">
              <div class="image">
                <img src="https://duyt4h9nfnj50.cloudfront.net/sku/971d80f9ccce0c8eab98014650ee97eb" alt="Listing pic"></img>
              </div>
              <div class="text">
                <div class="text-title">
                  <h3 onClick={() => onClickRestaurantPage('rrr@gmail.com',"https://duyt4h9nfnj50.cloudfront.net/sku/971d80f9ccce0c8eab98014650ee97eb")}><Link className='linkto' to='/profilerestaurant'>Pizza</Link></h3>                  
                </div>                
              </div> 
              </div>             
            </div>
            <div class="listings-col">
            <div class="listings-grid-element">
              <div class="image">
                <img src="https://duyt4h9nfnj50.cloudfront.net/sku/ef607d9b260dcc5b3d1c0bdca1bfbe7d" alt="Listing pic"></img>
              </div>
              <div class="text">
                <div class="text-title">
                  <h3>Alcohol</h3>                 
                </div>                
              </div>
            </div>
            <div class="listings-grid-element">
              <div class="image">
                <img src="https://duyt4h9nfnj50.cloudfront.net/search_refinements/photos/Pasta.png" alt="Listing pic"></img>
              </div>
              <div class="text">
                <div class="text-title">
                  <h3>Pasta</h3>                 
                </div>                
              </div>            
            </div>
            <div class="listings-grid-element">
              <div class="image">
                <img src="https://duyt4h9nfnj50.cloudfront.net/search_home/Gourmet.jpg" alt="Listing pic"></img>
              </div>
              <div class="text">
                <div class="text-title">
                  <h3>Gourmet</h3>                  
                </div>
              </div></div></div>
              <div class="listings-col">
              <div class="listings-grid-element">
                <div class="image">
                  <img src="https://duyt4h9nfnj50.cloudfront.net/sku/eeb45491416e3becc1961d921e667e5d" alt="Listing pic"></img>
                </div>
                <div class="text">
                  <div class="text-title">
                   <h3>Barbacoa</h3>                  
                 </div>
                </div></div>
                <div class="listings-grid-element">
              <div class="image">
                <img src="https://duyt4h9nfnj50.cloudfront.net/search_home/FastFood.jpg" alt="Listing pic"></img>
              </div>
              <div class="text">
                <div class="text-title">
                  <h3>Comida rápida</h3>                  
                </div>
                </div></div>
                <div class="listings-grid-element">
                  <div class="image">
                    <img src="https://duyt4h9nfnj50.cloudfront.net/sku/4f8afc1b602a71736e43c17e25219e3c" alt="Listing pic"></img>
                  </div>
                  <div class="text">
                    <div class="text-title">
                      <h3>Española</h3>                  
                    </div>
                    </div>
                  </div>
            </div>
          </div>
        </div>
      </div>

    <div class="listings">

      <div class="container3">

        <div class="listings-grid">
          <div class="listings-col">
            <div class="listings-grid-element">
              <div class="image_publi">
                <img src="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/cef389b486cb4827e6ba007f26ebddab.svg" alt="Listing pic"></img>
              </div>
              <div class="text">
                <div class="text-title_publi">
                  <h3>Proporciona comida a tus empleados</h3>
                  <div class="info_publi">
                    <span>Crea una cuenta de empresa</span>
                  </div>
                </div>
              </div>
              

            </div>
            <div class="listings-grid-element">
              <div class="image_publi">
                <img src="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/7f56b34e6c253cb54a35bacf5150dde9.svg" alt="Listing pic"></img>
              </div>
              <div class="text">
                <div class="text-title_publi">
                  <h3>Tu restaurante, a domicilio</h3>
                  <div class="info_publi">
                    <span>Añade tu restaurante</span>
                  </div>
                </div>
              </div>
              

            </div>
            <div class="listings-grid-element">
              <div class="image_publi">
                <img src="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/84d6770ca439c4b1ba2d6f53adc1d039.svg" alt="Listing pic"></img>
              </div>
              <div class="text">
                <div class="text-title_publi">
                  <h3>Entrega tu comida a domicilio</h3>
                  <div class="info_publi">
                    <span>Registrate para hacer entregas</span>
                  </div>
                </div>
              </div>
              

            </div>
          </div>
        </div>
      </div>
    </div>


    <div className="listings"><CategoriasHome titulo="¿Tienes Prisa?" listaprops={listaprops.slice(0,3)}/></div>
    <div className="listings"><CategoriasHome titulo="Ofertas de hoy" listaprops={listaprops.slice(0,3)}/></div>
    <div class="listings">

      <div class="container3">

        <div class="header">
          <div class="header-title">
            <h2>Todos los establecimientos</h2>
          </div>
          
          
        </div>
        <div class="listings-grid">
          <div class="listings-col"> {listaprops.map( (restaurante) =><RestPreviewGeneral Image={restaurante.Image} name={restaurante.name} desc={restaurante.desc} time={restaurante.time} />)} </div>
        </div>
      </div>
    </div>
  </body2>


    </section>

    

  );
}

export default Home;