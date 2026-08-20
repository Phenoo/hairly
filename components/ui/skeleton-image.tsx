"use client";

import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import Image, { type ImageProps } from "next/image";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SkeletonImageProps extends Omit<ImageProps, "onLoad" | "onError"> {
  containerClassName?: string;
  skeletonClassName?: string;
  showSkeleton?: boolean;
  aspectRatio?: string | number;
  fallbackIcon?: React.ReactNode;
  fallbackSrc?: string;
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  onError?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

export const SkeletonImage = forwardRef<HTMLImageElement, SkeletonImageProps>(
  (
    {
      src,
      alt,
      width,
      height,
      fill,
      sizes,
      priority,
      preload,
      quality,
      className,
      style,
      containerClassName,
      skeletonClassName,
      showSkeleton = true,
      aspectRatio,
      fallbackIcon,
      fallbackSrc = "/unavailable_product.png",
      onLoad,
      onError,
      ...rest
    },
    ref
  ) => {
    const [imgSrc, setImgSrc] = useState(src || fallbackSrc);
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const innerRef = useRef<HTMLImageElement | null>(null);

    useImperativeHandle(ref, () => innerRef.current as HTMLImageElement);

    // Reset loading state when source URL changes (e.g., variant selection)
    useEffect(() => {
      setImgSrc(src || fallbackSrc);
      setIsLoaded(false);
      setHasError(false);

      // Check if image is already cached and loaded
      if (innerRef.current?.complete && innerRef.current.naturalWidth > 0) {
        setIsLoaded(true);
      }
    }, [src, fallbackSrc]);

    const handleLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      setIsLoaded(true);
      onLoad?.(e);
    };

    const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      // If primary image failed, fall back to unavailable_product.png
      if (imgSrc !== fallbackSrc) {
        setImgSrc(fallbackSrc);
      } else {
        setHasError(true);
      }
      setIsLoaded(true);
      onError?.(e);
    };

    // Calculate aspect ratio style if provided or if width/height are numbers
    const computedAspectRatio =
      aspectRatio ||
      (width && height && typeof width === "number" && typeof height === "number" && !fill
        ? `${width} / ${height}`
        : undefined);

    const isFillMode = Boolean(fill);

    return (
      <div
        className={cn(
          "skeleton-image-container relative overflow-hidden",
          isFillMode ? "w-full h-full" : "block",
          isLoaded ? "is-loaded" : "is-loading",
          containerClassName
        )}
        style={{
          ...(computedAspectRatio ? { aspectRatio: computedAspectRatio } : {}),
        }}
      >
        {/* Shimmer skeleton layer shown while image is loading */}
        {showSkeleton && !isLoaded && !hasError && (
          <div
            className={cn(
              "skeleton-shimmer-layer absolute inset-0 z-10 pointer-events-none skeleton-shimmer",
              skeletonClassName
            )}
            aria-hidden="true"
          />
        )}

        {/* Fallback display if fallback image itself also fails to load */}
        {hasError ? (
          <div
            className="skeleton-fallback absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#f3eef5] text-[#9f70a5] p-3 text-center"
            role="img"
            aria-label={alt || "Image unavailable"}
          >
            {fallbackIcon || <ImageIcon className="size-6 opacity-60 mb-1" />}
            <span className="text-[10px] font-medium tracking-wide uppercase opacity-75 line-clamp-1">
              {alt || "Product image unavailable"}
            </span>
          </div>
        ) : (
          <Image
            ref={innerRef}
            src={imgSrc}
            alt={alt || "Product image"}
            width={width}
            height={height}
            fill={fill}
            sizes={sizes}
            priority={priority}
            preload={preload}
            quality={quality}
            onLoad={handleLoad}
            onError={handleError}
            className={cn(
              "transition-all duration-500 ease-out",
              isLoaded ? "opacity-100 blur-0" : "opacity-0 blur-xs",
              className
            )}
            style={style}
            {...rest}
          />
        )}
      </div>
    );
  }
);

SkeletonImage.displayName = "SkeletonImage";

