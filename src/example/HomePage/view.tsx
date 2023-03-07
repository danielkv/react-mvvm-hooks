import { View } from '../../index';
import { InnerButtonFactory } from '../InnerButton';
import { HomePageState } from './types';

export const HomePageView: View.Component<HomePageState> = ({
    useViewModel,
}) => {
    const { count, handleClickCountButton, innerButton } = useViewModel();

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
            <div>
                <InnerButtonFactory args={innerButton.args} />
            </div>
        </div>
    );
};
