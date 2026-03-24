import {
  forwardRef,
  type CSSProperties,
  type ImgHTMLAttributes,
} from "react";

export type ImageProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "src" | "alt" | "width" | "height"
> & {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
};

const Image = forwardRef<HTMLImageElement, ImageProps>(function Image(
  {
    src,
    alt,
    width,
    height,
    fill = false,
    priority = false,
    style,
    loading,
    ...props
  },
  ref
) {
  const mergedStyle: CSSProperties | undefined = fill
    ? {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        ...style,
      }
    : style;

  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      style={mergedStyle}
      loading={priority ? "eager" : loading}
      decoding="async"
      {...props}
    />
  );
});

export default Image;
