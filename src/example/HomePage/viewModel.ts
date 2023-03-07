import { useCallback, useState } from 'react';
import { ViewModel } from '../../interfaces/mvvm';
import { InnerButtonView } from '../InnerButton/view';
import { innerButtonViewModel } from '../InnerButton/viewModel';
import { HomePageState } from './types';

export const homePageViewModel: ViewModel.Hook<HomePageState> = () => {
    const [count, setCount] = useState(0);

    const handleClickCountButton = useCallback(() => {
        setCount(count + 1);
    }, [setCount, count]);

    /**
     * In this case the `setCount` dispatcher is not returned
     * because it's not going to be used in the `View`
     */
    return {
        count,
        handleClickCountButton,
        innerButton: {
            args: { initialCount: 10 },
            ViewElement: InnerButtonView,
            useViewModel: innerButtonViewModel,
        },
    };
};
