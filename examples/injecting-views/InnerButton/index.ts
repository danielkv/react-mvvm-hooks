import { FactoryHelpers } from '../../../src';
import { InnerButtonArgs, InnerButtonState } from './types';

export const InnerButtonFactory = FactoryHelpers.create<
    InnerButtonState,
    InnerButtonArgs
>();
