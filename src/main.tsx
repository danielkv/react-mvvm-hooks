import React from 'react';
import ReactDOM from 'react-dom/client';
import { HomePageView } from './examples/injecting-views/HomePage/view';
import { useHomePageViewModel } from './examples/injecting-views/HomePage/viewModel';
import { FactoryHelpers } from './utils/app';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <FactoryHelpers.ViewFactory
            ViewElement={HomePageView}
            useViewModel={useHomePageViewModel}
        />
    </React.StrictMode>,
);
