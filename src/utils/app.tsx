/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from 'react';
import { View, ViewModel } from '../interfaces/mvvm';

export namespace FactoryHelpers {
    export function useViewModel<
        State extends Record<string, any>,
        Args extends undefined = undefined,
    >(
        factory: ViewModel.Factory<State>,
        args?: undefined,
    ): ViewModel.Hook<State>;
    export function useViewModel<
        State extends Record<string, any>,
        Args extends Record<string, any> | undefined,
    >(
        factory: ViewModel.Factory<State, Args>,
        args: Args,
    ): ViewModel.Hook<State>;
    export function useViewModel<
        State extends Record<string, any>,
        Args extends Record<string, any> | undefined = undefined,
    >(
        factory: ViewModel.Factory<State, Args>,
        args: Args | undefined,
    ): ViewModel.Hook<State> {
        return useMemo(() => factory(args as Record<string, any>), [factory]);
    }

    export function create<
        State extends View.State,
        Args extends undefined = undefined,
    >(
        DefaultViewElement: View.Element<State>,
        defaultViewModelFactory: ViewModel.Factory<State, Args>,
        defaultArgs?: undefined,
    ): View.Factory<State, Args>;
    export function create<State extends View.State, Args extends View.Args>(
        DefaultViewElement: View.Element<State>,
        defaultViewModelFactory: ViewModel.Factory<State, Args>,
        defaultArgs: Args,
    ): View.Factory<State, Args>;
    export function create<State extends View.State, Args extends View.Args>(
        DefaultViewElement: View.Element<State>,
        defaultViewModelFactory: ViewModel.Factory<State, Args>,
        defaultArgs: Args,
    ): View.Factory<State, Args> {
        return ({
            ViewElement: _ViewElement,
            viewModelFactory: _viewModelFactory,
            args: _args,
        }) => {
            const ViewElement = _ViewElement || DefaultViewElement;
            const viewModelFactory =
                _viewModelFactory || defaultViewModelFactory;
            const args = _args || defaultArgs;

            return (
                <ViewFactory<State, Args>
                    viewModelFactory={viewModelFactory}
                    args={args as Args}
                    ViewElement={ViewElement}
                />
            );
        };
    }

    export function ViewFactory<
        ViewState extends View.State,
        ViewArgs extends View.Args | undefined = undefined,
    >({
        ViewElement,
        args,
        viewModelFactory,
    }: View.Reference<ViewState, ViewArgs>): React.ReactElement<
        View.ComponentProps<ViewState>,
        any
    > {
        const useViewModel = FactoryHelpers.useViewModel(
            viewModelFactory,
            args as ViewArgs,
        );

        return <ViewElement useViewModel={useViewModel} />;
    }
}
