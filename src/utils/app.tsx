/* eslint-disable @typescript-eslint/no-explicit-any */
import { createElement, useMemo } from 'react';
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
        Args extends View.Args | undefined = undefined,
    >(): View.Factory<State, Args> {
        return ({ ViewElement, viewModelFactory, args }) => {
            return (
                // @ts-expect-error
                <ViewFactory
                    viewModelFactory={viewModelFactory}
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
        viewModelFactory,
        ViewElement,
        args,
    }: View.Reference<ViewState, ViewArgs>): React.ReactElement {
        const useViewModel = FactoryHelpers.useViewModel(
            viewModelFactory,
            args as ViewArgs,
        );

        const state = useViewModel();

        return createElement(ViewElement, state);
    }
}
