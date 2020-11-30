import React, {useEffect, useState} from 'react';
import RestPreviewGeneral from'../../commons/components/RestPreviewGeneral.js'
import CategoriasHome from'../../commons/components/CategoriasHome.js'
import Categorias from '../../commons/components/Categorias.js'
import TypePreview from '../../commons/components/TypePreview.js'
import RegisterPubli from '../../commons/components/RegisterPubli.js'
import RestService from "../../api/restaurant.service";

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

const listatipos = [{
  Image:"https://duyt4h9nfnj50.cloudfront.net/sku/21b6882726bf71ba17b29ab47ef16d22",
  title: "Alcohol",
},
{
  Image:"https://duyt4h9nfnj50.cloudfront.net/sku/21b6882726bf71ba17b29ab47ef16d22",
  title: "Alcohol",
},
{
  Image:"https://duyt4h9nfnj50.cloudfront.net/sku/21b6882726bf71ba17b29ab47ef16d22",
  title: "Alcohol",
},
]

const listapubli = [{
  Image:"https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/cef389b486cb4827e6ba007f26ebddab.svg",
  title: "Proporciona comida a tus empleados",
  desc: "Crea una cuenta de empresa",
},
{
  Image:"https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/7f56b34e6c253cb54a35bacf5150dde9.svg",
  title: "Tu restaurante, a domicilio",
  desc: "Añade tu restaurante",
},
{
  Image:"https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/84d6770ca439c4b1ba2d6f53adc1d039.svg",
  title: "Entrega tu comida a domicilio",
  desc: "Registrate para hacer entregas",
},
]


function Home({setRestaurantId, setPicture, isLogged, user}) {
  const [restList, setRestList] = useState([{name: '', url:''}]);
  const [favList, setFavList] = useState([{name: '', url:''}]);
  const [typeList, setTypeList] = useState([]);

  //Deprecated.
  const onClickRestaurantPage = (rest_id, photo) => {
    setRestaurantId(rest_id);
    setPicture(photo);
  };

  const fetchMenu = async () => {
    const items = await RestService.getAll();
    setRestList(items);
    console.log(items);
  };
  
  const fetchFavs = async () => {
    const items = await RestService.getAllLogged(user.user.email)
    setRestList(items)
    setFavList(items.filter(rest => rest.favourite==1));//We filter those that are faved.
    console.log({'fav':items.filter(rest => rest.favourite==1)});
  };

  useEffect(() => {
    if (isLogged){
      fetchFavs();
    } else {
      fetchMenu();
    };
  }, []);

  return (
    <section>
    <body2>
    <div className="listings">
      <div className="container2">
        <div className="listings-grid">
          <div className="listings-col">
            <div className="listings-grid-element">
              <h2>¿Tienes un antojo? Pídelo.</h2>
              <h1>Busca tu restaurante, cocina o plato favorito.</h1>
            </div>
            <div className="listings-grid-element">
              <div className="image">
                <img src="https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1301&q=80" alt="Listing pic"></img>
              </div>
            </div>
            <div className="listings-grid-element">
              <div className="image">
                <img src="https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1301&q=80" alt="Listing pic"></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="listings">
      <div className="container4">
        <div className="listings-grid">        
            <TypePreview  type_id='1' type_name='sushi' photo='https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/sushi.png'/>
            <TypePreview  type_id='2' type_name='pizzas' photo='https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/pizza.png'/>
            <TypePreview  type_id='3' type_name='barbacoa' photo='https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/bbq.png'/>
            <TypePreview  type_id='4' type_name='rapida' photo='https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/fastfood.png'/>
            <TypePreview  type_id='5' type_name='china' photo='https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/japanese.png'/>
            <TypePreview  type_id='7' type_name='hamburgesa' photo='https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/vegan.png'/>
            <TypePreview  type_id='6' type_name='japonesa' photo='https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/burger.png'/>
            <TypePreview  type_id='9' type_name='estadounidense' photo='https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/asian.png'/>
            <TypePreview  type_id='10' type_name='callejera' photo='https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/wings.png'/>
            <TypePreview  type_id='12' type_name='mejicana' photo='https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/streetfood.png'/>
            <TypePreview  type_id='11' type_name='cafeyte' photo='https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/coffeeandtea.png'/>
            <TypePreview  type_id='13' type_name='postres' photo='https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/fastfood.png'/>
          </div>
        </div>
    </div>
    
    <div className="listings"><CategoriasHome titulo="Populares cerca de ti" listaprops={restList}/></div>
    {isLogged? (<div className="listings"><CategoriasHome titulo="Favoritos" listaprops={favList}/></div>) : (<div/>)}

    <div className="listings">
      <div className="container3">
        <div className="header">
          <div className="header-title">
            <h2>¿Buscas algo diferente?</h2>
          </div>
        </div>

        <div className="listings-grid">
          <div className="listings-col"> {listatipos.map( (tipo) =><Categorias Image={tipo.Image} title={tipo.title} />)} </div>
        </div>
      </div>
    </div>

    <div className="listings">
      <div className="container3">
        <div className="listings-grid">
          <div className="listings-col">{listapubli.map( (publi) =><RegisterPubli Image={publi.Image} title={publi.title} desc={publi.desc} />)} </div>
        </div>
      </div>
    </div>

    <div className="listings"><CategoriasHome titulo="¿Tienes Prisa?" listaprops={restList}/></div>
    <div className="listings"><CategoriasHome titulo="Ofertas de hoy" listaprops={restList}/></div>

    <div className="listings">
      <div className="container3">
        <div className="header">
          <div className="header-title">
            <h2>Todos los establecimientos</h2>
          </div>
        </div>
        <div className="listings-grid">
          <div className="listings-col"> {restList.map( (restaurante) =><RestPreviewGeneral rest={restaurante}/>)} </div>
        </div>
      </div>
    </div>
  </body2>
</section>

    

  );
}

export default Home;