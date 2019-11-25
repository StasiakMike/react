import React, {useState, useEffect} from 'react';
import { withRouter } from 'react-router-dom';
import '../App.css';
import { CtxConsumer } from '../index';


function Checkout(props) {

  const [ price, setPrice ] = useState(0);
  const [ order, setOrder ] = useState([]);

  useEffect(() => {
    if(props.newPizza){
      setOrder(ord =>[...ord, props.newPizza]);
    }
    }, [props.newPizza])
  useEffect(() => {
    let priceTotal = order.reduce((sum, pizza) => sum + pizza.price, 0 );
    setPrice(priceTotal);
  }, [order]);

  const removePizza = (indx) => {
    let ord = order.filter((pizza, index) => index !== indx);
    setOrder(ord);
  }

  const pay = (ctx) => {
    ctx.refresh(price);
    props.history.push('/basket');
  }

  return (
    <CtxConsumer>
    { context => (
      <div style={{"flexGrow" : 1}}>
      <h1>Your checkout:</h1>

      {order.map((pizza, index) => {
        return (
          <div key={index} className="orderRow">
            <h3>
              {index+1}# {pizza.size} pizza
              ( toppings: {pizza.components.length})
              &nbsp; | &nbsp;
              £{(pizza.price / 100).toFixed(2)}
            </h3>
            <h3 onClick={() => removePizza(index)}>X</h3>
          </div>
        )
      })}
      <p>-------------------</p>
    <p>Total to pay: £{(price / 100).toFixed(2)}</p>
    <button onClick={() => pay(context)} disabled={price === 0}>Pay</button>
    </div>
    )}
    </CtxConsumer>
  );
}

export default withRouter(Checkout);
