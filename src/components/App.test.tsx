import App from "./App";
import ReactDOM from "react-dom";
import * as React from 'react';

it('App renders', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
})