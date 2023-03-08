import { View } from '../../../src/';

import { CounterPageState } from './types';

export const CounterPageView: View.Component<CounterPageState> = ({
    count,
    handleClickCountButton,
}) => {
    return (
        <div
            style={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <div>
                <button onClick={handleClickCountButton}>Count: {count}</button>
            </div>
        </div>
    );
};
