export type CustomFn<
    ReturnType,
    Props extends Record<string, any> | undefined = undefined,
> = Props extends undefined ? () => ReturnType : (props: Props) => ReturnType;
