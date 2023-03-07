import { View } from '../../index';
import { InnerButtonState } from './types';

export const InnerButtonView: View.Component<InnerButtonState> = ({
    useViewModel,
}) => {
    const { count, handleClickCountButton } = useViewModel();

    return (
        <button onClick={handleClickCountButton}>Inner Count: {count}</button>
    );
};
