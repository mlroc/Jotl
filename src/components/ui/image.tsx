'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  caption?: string;
  rounded?: boolean;
  shadow?: boolean;
}

export function OptimizedImage({
  src,
  alt,
  width = 800,
  height = 600,
  className,
  priority = false,
  caption,
  rounded = false,
  shadow = false,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className={cn(
        'flex items-center justify-center bg-muted text-muted-foreground',
        rounded && 'rounded-lg',
        shadow && 'shadow-md',
        className
      )}>
        <div className="text-center p-4">
          <p className="text-sm">Failed to load image</p>
          <p className="text-xs">{alt}</p>
        </div>
      </div>
    );
  }

  return (
    <figure className="my-6">
      <div className={cn(
        'relative overflow-hidden',
        rounded && 'rounded-lg',
        shadow && 'shadow-md',
        className
      )}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          className={cn(
            'transition-opacity duration-300',
            isLoading ? 'opacity-0' : 'opacity-100'
          )}
          onLoad={() => setIsLoading(false)}
          onError={() => setHasError(true)}
        />
        {isLoading && (
          <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
            <div className="text-muted-foreground text-sm">Loading...</div>
          </div>
        )}
      </div>
      {caption && (
        <figcaption className="text-center text-sm text-muted-foreground mt-2">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

// Component for responsive images with different sizes
export function ResponsiveImage({
  src,
  alt,
  caption,
  className,
  priority = false,
}: {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={1200}
      height={800}
      className={cn('w-full h-auto', className)}
      priority={priority}
      caption={caption}
      rounded
      shadow
    />
  );
}

// Component for thumbnail images
export function ThumbnailImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={300}
      height={200}
      className={cn('w-full h-48 object-cover', className)}
      rounded
    />
  );
} 