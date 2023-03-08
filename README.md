# Getting Started

This package is a **toolset** that will help you to use `MVVM` with
`React hooks`

# The pattern

In this project we are using a pattern based on `MVVM` + `Factory`.

## The base

The structure is divided in 4 layers: `Factory > View > ViewModel > Model`

### Model

This is where the data begins, where the data comes from. In this case we are
using `UseCases` to reach the data. It can be through **API requests**,
**cache**, **localstorage**, etc

### ViewModel

This is our business logic and state is, it owns the `Model`. All the handlers
and states have to be here. So if you need to access some data using a
`UseCase`, it must be here.

### View

The View is our layout, it's the visual layer of the application. It owns the
`ViewModel` and it CAN'T have any logic. This is important. All the the logic
must be in the `ViewModel`, the `View` will watch the `ViewModel` and react
accordingly.

### Factory

The Factory is used to create a instance of the `View` and connects it to the
`ViewModel`. To do that you need to inject the `ViewElement`, `viewModelFactory`
and `args` into the `ViewFactoryComponent` as props.

# Folder Structure

To keep things organized you must follow some kinda pattern for you **view**
folder. The suggestion is this:

```
src
|--components // shared components, not views
|--view
|   |--Subscription
|   |   |--components // components that will be used only for this View
|   |   |   |--Input
|   |   |   |   |--index.tsx
|   |   |   |   |--[...]
|   |   |--view.tsx
|   |   |--viewModel.ts
|   |   |--types.ts
|   |   |--index.ts // this one is only necessary if you want to create the FactoryComponent
|   |   |--[...]
```

# How to use it

You can follow this example in the `examples/injecting-views` in this
repository.

The first step is Create a `View` inside the **view** folder. Let's call it
`HomePage` (Folder: view > HomePage).

Attention to the typing, this is very important.

## 1. types.ts file

This file is used only to separate the **types/interfaces** from the actual
View, so create the `types.ts` inside the `HomePage` folder:

```ts
import { View } from 'react-mvvm-hooks';

export interface HomePageState extends View.State {
    count: number;
    handleClickCountButton(): void;
}
```

## 2. viewModel.ts

The `ViewModel` is where the business logic is, and it's very important to keep
all the heavy code inside.

```ts
import { useCallback, useState } from 'react';
import { ViewModel } from 'react-mvvm-hooks';
import { InnerButtonView } from '../InnerButton/view';
import { useInnerButtonViewModel } from '../InnerButton/viewModel';
import { HomePageState } from './types';

export const useHomePageViewModel: ViewModel.Hook<HomePageState> = () => {
    const [count, setCount] = useState(0);

    const handleClickCountButton = useCallback(() => {
        setCount(count + 1);
    }, [setCount, count]);

    return {
        count,
        handleClickCountButton,
    };
};
```

The `ViewModel` is a hook, so remember always to prefix it with `use`. You can
set all the states here. Try to avoid this file to be too big, if necessary
create another hook insider of the `HomePage` folder to help abstracting some
logic.

## view.tsx

This is where our layout goes. Simple as that, only layout stuff, no logic. Get
the _state_ and _handlers_ from `props` and use it.

```tsx
import { View } from 'react-mvvm-hooks';
import { HomePageState } from './types';

export const HomePageView: View.Component<HomePageState> = ({
    count,
    handleClickCountButton,
}) => {
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
        </div>
    );
};
```

## Connecting with ViewFactory (src/main.tsx)

Then we have it! Our `View` is ready, now let's connect it to the `ViewModel`.

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HomePageView } from './view/HomePage/view';
import { useHomePageViewModel } from './view/HomePage/viewModel';
import { FactoryHelpers } from 'react-mvvm-hooks';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <FactoryHelpers.ViewFactory
            ViewElement={HomePageView}
            useViewModel={useHomePageViewModel}
        />
    </React.StrictMode>,
);
```

We use the `FactoryHelpers.ViewFactory` that is a generic component to connect
them.

## Custom ViewFactory (/HomePage/index.tsx)

If you want to create your Custom ViewFactory, it's also possible.

```tsx
import { FactoryHelpers } from 'react-mvvm-hooks';
import { HomePageState } from './types';
import { useHomePageViewModel } from './viewModel';
import { HomePageView } from './view';

export const HomePageViewFactory: React.FC = () => {
    const props = useHomePageViewModel();

    return <HomePageView {...props} />;
};
```

The `FactoryHelpers` also has a ViewFactory creator:
`FactoryHelpers.create<>()`. The only thing you need to do is type it:

```ts
import { FactoryHelpers } from 'react-mvvm-hooks';
import { HomePageState } from './types';

export const HomePageViewFactory = FactoryHelpers.create<HomePageState>();
```

## Injecting a View inside another View

Sometimes you need to add more functionalities and may want to split in
different views. For instance toolbar that is going to be displayed in some
pages with different logic inside it.

For this example we're going to keep things simple: Add a seconde **Counter**
inside the first `View`

### Create your new `View` in our case `InnerButton`

Inside the `view/InnerButton` it has the same structure as the other one, so it
goes:

> /InnerButton/types.ts

```ts
import { View } from 'react-mvvm-hooks';

export interface InnerButtonState extends View.State {
    count: number;
    handleClickCountButton(): void;
}

export interface InnerButtonArgs extends View.Args {
    initialCount: number;
}
```

Now we added the `Args`. It's needed when you want to inject something in the
`ViewModel` hook.

> /InnerButton/viewModel.ts

```tsx
import { useCallback, useState } from 'react';
import { ViewModel } from 'react-mvvm-hooks';
import { InnerButtonArgs, InnerButtonState } from './types';

export const useInnerButtonViewModel: ViewModel.Hook<
    InnerButtonState,
    InnerButtonArgs
> = ({ initialCount }) => {
    const [count, setCount] = useState(initialCount);

    const handleClickCountButton = useCallback(() => {
        setCount(count + 1);
    }, [setCount, count]);

    return {
        count,
        handleClickCountButton,
    };
};
```

Pay attention to the _type generics_, now we have the type `ViewModel.Hook` with
2 generics: `State` and `Hooks`

> /InnerButton/view.tsx

```tsx
import { View } from 'react-mvvm-hooks';
import { InnerButtonState } from './types';

export const InnerButtonView: View.Component<InnerButtonState> = ({
    count,
    handleClickCountButton,
}) => {
    return (
        <button onClick={handleClickCountButton}>Inner Count: {count}</button>
    );
};
```

### Connecing one View to another

To do that we need to go back to the `HomePage` view and modify somethings:

> /HomePage/type.ts

```ts
import { View } from 'react-mvvm-hooks';
import { InnerButtonArgs, InnerButtonState } from '../InnerButton/types';

export interface HomePageState extends View.State {
    count: number;
    handleClickCountButton(): void;

    innerButton: View.Reference<InnerButtonState, InnerButtonArgs>;
}
```

We used the interface `View.Reference` so the state returned from
`homePageViewModel` knows what to return to the view.

> /HomePage/viewModel.ts

```ts
import { useCallback, useState } from 'react';
import { ViewModel } from 'react-mvvm-hooks';
import { InnerButtonView } from '../InnerButton/view';
import { useInnerButtonViewModel } from '../InnerButton/viewModel';
import { HomePageState } from './types';

export const useHomePageViewModel: ViewModel.Hook<HomePageState> = () => {
    const [count, setCount] = useState(0);

    const handleClickCountButton = useCallback(() => {
        setCount(count + 1);
    }, [setCount, count]);

    return {
        count,
        handleClickCountButton,
        innerButton: {
            args: { initialCount: 10 },
            ViewElement: InnerButtonView,
            useViewModel: useInnerButtonViewModel,
        },
    };
};
```

We added to the return the `innerButton` which was typed in the **type.ts**
file.

> /HomePage/view.ts

```tsx
import { FactoryHelpers, View } from 'react-mvvm-hooks';
import { InnerButtonFactory } from '../InnerButton';
import { HomePageState } from './types';

export const HomePageView: View.Component<HomePageState> = ({
    count,
    handleClickCountButton,
    innerButton,
}) => {
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
                <FactoryHelpers.ViewFactory {...innerButton} />
            </div>
        </div>
    );
};
```

**DO NOT** import directly the `InnerButtonView`, always use
`FactoryHelpers.ViewFactory` in this case, it's going to avoid circular
dependency.
