import { useCallback, useState } from 'react';
import { ViewModel } from '../../interfaces/mvvm';
import { InnerButtonArgs, InnerButtonState } from './types';

export const innerButtonViewModel: ViewModel.Hook<
    InnerButtonState,
    InnerButtonArgs
> = ({ initialCount }) => {
    const [count, setCount] = useState(initialCount);

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
