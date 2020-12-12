import '../../commons/components/ShoppingCart.css';

function CategoriasHome(props){
    return (
        <body>
            <div className='container'>
                <h5>{props.titulo}</h5>
                <h7>{props.precio} €</h7><p></p>
                <input className="number" type="number" id="quantity" name="quantity" min="1" max="30"></input>
                <button className="eliminar">Eliminar</button>
                
            </div>
        </body>
      );
    }



export default CategoriasHome