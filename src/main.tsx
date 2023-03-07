import React from 'react';
import ReactDOM from 'react-dom/client';
import { HomePageViewFactory } from './example/HomePage';
import { HomePageView } from './example/HomePage/view';
import { homePageViewModelFactory } from './example/HomePage/viewModel';
import { FactoryHelpers } from './utils/app';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <FactoryHelpers.ViewFactory
            ViewElement={HomePageView}
            viewModelFactory={homePageViewModelFactory}
        />
    </React.StrictMode>,
);
