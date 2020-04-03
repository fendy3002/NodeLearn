let React = require('react');
let ReactDOM = require('react-dom');
let sa = require('superagent');
let lo = require('lodash');
let MobxReact = require('mobx-react');

import App from "./App";
import store from './store';

(window as any).app = (elem, context) => {
    let storeInstance = new store(context);
    ReactDOM.render(
        <MobxReact.Provider store={storeInstance}>
            <MobxReact.Provider currentStore={storeInstance.currentStore}>
                <App />
            </MobxReact.Provider>,
        </MobxReact.Provider>,
        elem
    );
    return {
    };
};