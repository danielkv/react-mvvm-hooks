import { useCallback, useState } from 'react';
import { ViewModel } from '../../../src/';

import { CounterPageState } from './types';

export const useCounterPageViewModel: ViewModel.Hook<CounterPageState> = () => {
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
    };
};
