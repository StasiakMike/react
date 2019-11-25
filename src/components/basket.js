import React from 'react';
import { withRouter } from 'react-router-dom';
import { CtxConsumer } from '../index';


function Basket(props) {

    const back = () => {
        props.history.push('/');
    }


  return (
    <CtxConsumer>
        {context => (
            <div>
                <h1>Basket</h1>
                <h2>£ {(context.basket /100).toFixed(2)}</h2>
                <button onClick={()=> back()}>Go back</button>  
            </div>
        )}
        
    </CtxConsumer>
  )
}

export default withRouter(Basket);
