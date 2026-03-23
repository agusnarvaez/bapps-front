"use client";

import { useEffect, useState } from "react";
import Image, { type ImageProps } from "next/image";
import { PROJECT_FALLBACK_IMAGE } from "@/lib/sanity/projectImage";

type ProjectImageProps = Omit<ImageProps, "src" | "alt"> & {
  src?: string | null;
  alt: string;
  fallbackSrc?: string;
};

export default function ProjectImage({
  src,
  alt,
  fallbackSrc = PROJECT_FALLBACK_IMAGE,
  onError,
  ...props
}: ProjectImageProps) {
  const resolvedSrc = src || fallbackSrc;
  const [currentSrc, setCurrentSrc] = useState(resolvedSrc);

  useEffect(() => {
    setCurrentSrc(resolvedSrc);
  }, [resolvedSrc]);

  return (
    <Image
      {...props}
      src={currentSrc}
      alt={alt}
      onError={(event) => {
        if (currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        }

        onError?.(event);
      }}
    />
  );
}
