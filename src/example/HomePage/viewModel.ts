import { useCallback, useState } from 'react';
import { ViewModel } from '../../interfaces/mvvm';
import { HomePageState } from './types';

export const homePageViewModelFactory: ViewModel.Factory<HomePageState> =
    () => () => {
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
            innerButton: { args: { initialCount: 10 } },
        };
    };
