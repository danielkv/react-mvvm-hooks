import { View } from '../../../';
import { InnerButtonArgs, InnerButtonState } from '../InnerButton/types';

export interface HomePageState extends View.State {
    count: number;
    handleClickCountButton(): void;

    innerButton: View.Reference<InnerButtonState, InnerButtonArgs>;
}
