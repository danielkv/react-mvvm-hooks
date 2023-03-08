import { View } from '../../..';

export interface CounterPageState extends View.State {
    count: number;
    handleClickCountButton(): void;
}
