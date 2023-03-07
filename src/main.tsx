import React from 'react';
import ReactDOM from 'react-dom/client';
import { HomePageViewFactory } from './example/HomePage';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <HomePageViewFactory />
    </React.StrictMode>,
);
