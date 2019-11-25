import React, { useState } from 'react';
import './App.css';
import Order from './components/order';
import Checkout from './components/checkout';

function App() {

const [ pizza, setPizza ] = useState(null);

const recievePizza = (pizza) => {
  setPizza(pizza);
}

  return (
    <div className="App">
      <div className="content">
        <Order recievePizza={recievePizza}/>
        <Checkout newPizza={pizza} />
      </div>
    </div>
  );
}

export default App;
