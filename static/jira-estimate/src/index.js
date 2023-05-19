import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./index.css";
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import '@atlaskit/css-reset';

ReactDOM.render(
    <React.StrictMode>
        <DndProvider backend={Backend}>
            <App />
        </DndProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
