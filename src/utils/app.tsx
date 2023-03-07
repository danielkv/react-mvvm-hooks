import { createElement } from 'react';
import { View } from '../interfaces/mvvm';

export namespace FactoryHelpers {
    export function create<
        State extends View.State,
        Args extends View.Args | undefined = undefined,
    >(): View.Factory<State, Args> {
        return ({ ViewElement, useViewModel: viewModelFactory, args }) => {
            return (
                // @ts-expect-error
                <ViewFactory
                    useViewModel={viewModelFactory}
                    ViewElement={ViewElement}
                    args={args}
                />
            );
        };
    }

    export function ViewFactory<
        ViewState extends View.State,
        ViewArgs extends View.Args | undefined = undefined,
    >({
        useViewModel,
        ViewElement,
        args,
    }: View.Reference<ViewState, ViewArgs>): React.ReactElement {
        const state = useViewModel(args || {});

        return createElement(ViewElement, state);
    }
}
