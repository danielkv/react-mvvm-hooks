import { View } from '../../../src/';

export interface CounterPageState extends View.State {
    count: number;
    handleClickCountButton(): void;
}
