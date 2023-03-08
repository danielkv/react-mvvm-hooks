import { View } from '../../../src/';
import { InnerButtonState } from './types';

export const InnerButtonView: View.Component<InnerButtonState> = ({
    count,
    handleClickCountButton,
}) => {
    return (
        <button onClick={handleClickCountButton}>Inner Count: {count}</button>
    );
};
