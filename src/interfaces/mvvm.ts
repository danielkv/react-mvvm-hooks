/* eslint-disable @typescript-eslint/no-explicit-any */

import { CustomFn } from './app';

export namespace ViewModel {
    export type Hook<
        ViewState extends View.State,
        ViewArgs extends View.Args | undefined = undefined,
    > = CustomFn<ViewState, ViewArgs>;
}

export namespace View {
    export interface State extends Record<string, any> {}

    export interface Args extends Record<string, any> {}

    export type ComponentProps<ViewState extends State> = ViewState;

    export type Component<ViewState extends State> = React.FC<
        ComponentProps<ViewState>
    >;

    export type Element<ViewState extends State> = React.ElementType<
        ComponentProps<ViewState>
    >;

    export type Factory<
        ViewState extends State,
        ViewArgs extends Args | undefined = undefined,
    > = React.FC<Reference<ViewState, ViewArgs>>;

    export interface ReferenceFactory<
        ViewState extends State,
        ViewArgs extends Args | undefined = undefined,
    > {
        ViewElement: View.Element<ViewState>;
        useViewModel: ViewModel.Hook<ViewState, ViewArgs>;
    }

    export type Reference<
        ViewState extends State,
        ViewArgs extends Args | undefined = undefined,
    > = (ViewArgs extends undefined
        ? {
              args?: never;
          }
        : {
              args: ViewArgs;
          }) &
        ReferenceFactory<ViewState, ViewArgs>;
}
