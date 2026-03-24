import {
  lazy,
  Suspense,
  type ComponentType,
  type ReactNode,
} from "react";

type DynamicOptions = {
  loading?: () => ReactNode;
  ssr?: boolean;
};

export default function dynamic<Props extends object>(
  loader: () => Promise<{ default: ComponentType<Props> }>,
  options: DynamicOptions = {}
) {
  const LazyComponent = lazy(loader);

  return function DynamicComponent(props: Props) {
    return (
      <Suspense fallback={options.loading ? options.loading() : null}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}
