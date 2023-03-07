import { FactoryHelpers } from '../..';
import { InnerButtonView } from './view';
import { innerButtonViewModelFactory } from './viewModel';

export const InnerButtonFactory = FactoryHelpers.create(
    InnerButtonView,
    innerButtonViewModelFactory,
    { initialCount: 0 },
);
