import React, {useState,  createContext } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter } from 'react-router-dom';
import Basket from './components/basket';


const myContext = createContext();
export const CtxConsumer = myContext.Consumer;
const CtxProvider = myContext.Provider;

function Routing() {

    const [ basket, setBasket ] = useState(0);

    const refresh = (data) => {
        setBasket(data);
    }

    return (
        <BrowserRouter>
            <CtxProvider value={{basket: basket, refresh: refresh}}>
                <header className="App-header">
                    <h1>Order pizza</h1>
                </header>
                <Route exact path="/" component={App} />
                <Route exact path="/basket" component={Basket} />
                <a href="https://www.freepik.com/free-photos-vectors/food">Food vector created by macrovector - www.freepik.com</a>
                <br/>
                <a href="https://www.freepik.com/free-photos-vectors/background">Background photo created by freepik - www.freepik.com</a>
                <footer>
                    <span>2019 Mike Stasiak & MvdB Software Solutions</span>
                </footer>
            </CtxProvider>
        </BrowserRouter>
    )
}

ReactDOM.render(<Routing />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
