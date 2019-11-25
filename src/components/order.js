import React, { useState, useEffect } from 'react';
import '../App.css';
import Components from '../data.json';


function Order(props) {

  const [ components, setComponents ] = useState([]);
  const [ price, setPrice] = useState(0);
  const [ base, setBase ] = useState(500);

  useEffect( () => {
    Components.map(component => {
      component.checked = component.price === 0 ? true : false;
      return component;
    })
    setComponents(Components);
  }, [])
  useEffect(() => {
    setPrice(components.reduce( (total, component) => {
      return component.checked ? total + component.price : total;
    }, base))
  }, [base, components])

  const componentChange = (component) => {
    setComponents(
      components.map( el => {
        if(el.name === component.name) el.checked = !el.checked;
        return el;
      })
    );
    }
    
  const changeSize = (size) => {
    setBase(size);
  }

  const addPizza = () => {
    let size = "Medium";
    if(base === 500) {
      size = "Small";
    }
    else if(base === 900){
      size = "Large";
    }
    let pizza = {size: size, price: price, components: []};
    components.forEach(component => {
      if(component.checked) pizza.components.push(component);
    })
    props.recievePizza(pizza);
    resetPizza();
  }
    
  const resetPizza = () => {
    components.forEach(component => {
      component.price === 0 ? component.checked = true : component.checked = false; 
    })
    setBase(700);
  }

  return (
    <div className="compose">
      <h1>Create own pizza:</h1>
  <h4>Price: £ {(price / 100).toFixed(2)}</h4>

      <div>
        <img className={"size small " + (base === 500 ? "choice" : "")} onClick={ () => changeSize(500)}
        src={process.env.PUBLIC_URL + "/assets/size.png"} alt="size_small" />

        <img className={"size medium " + (base === 700 ? "choice" : "")} onClick={ () => changeSize(700)}
        src={process.env.PUBLIC_URL + "/assets/size.png"} alt="size_medium" />

        <img className={"size large " + (base === 900 ? "choice" : "")} onClick={ () => changeSize(900)}
        src={process.env.PUBLIC_URL + "/assets/size.png"} alt="size_large" />
      </div>

      <div>
        <button onClick={() => addPizza()}>Add to order</button>
      </div>

      <div className="components">
        {components.map( (component, index) => {
          return(
            <div key={index} className="componentRow">
              <input type="checkbox" checked={component.checked} onChange={() => componentChange(component)}/>
              <img className="component_icon" src={process.env.PUBLIC_URL + "/assets/" + component.name + ".png"} alt={component.name}/>
              <p>{component.name}</p>
              {component.price === 0 ? <p>FREE</p> : <p>£{(component.price / 100).toFixed(2)}</p>}
              
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default Order;
