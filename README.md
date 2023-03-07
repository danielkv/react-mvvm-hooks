# Getting Started

This package is a **toolset** that will help you to use `MVVM` with
`React hooks`

# Structure

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
