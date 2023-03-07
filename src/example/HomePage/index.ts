import { FactoryHelpers } from '../../';
import { HomePageView } from './view';
import { homePageViewModelFactory } from './viewModel';

export const HomePageViewFactory = FactoryHelpers.create(
    HomePageView,
    homePageViewModelFactory,
);
