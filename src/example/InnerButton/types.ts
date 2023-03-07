import { View } from '../..';

export interface InnerButtonState extends View.State {
    count: number;
    handleClickCountButton(): void;
}

export interface InnerButtonArgs extends View.Args {
    initialCount: number;
}
