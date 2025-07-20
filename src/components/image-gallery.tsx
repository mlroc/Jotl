'use client';

import { useState } from 'react';
import { OptimizedImage } from '@/components/ui/image';
import { cn } from '@/lib/utils';

interface ImageGalleryProps {
  images: Array<{
    src: string;
    alt: string;
    caption?: string;
  }>;
  columns?: 1 | 2 | 3 | 4;
  className?: string;
}

export function ImageGallery({ images, columns = 2, className }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <>
      <div className={cn('grid gap-4', gridCols[columns], className)}>
        {images.map((image, index) => (
          <div
            key={index}
            className="cursor-pointer group"
            onClick={() => setSelectedImage(index)}
          >
            <OptimizedImage
              src={image.src}
              alt={image.alt}
              caption={image.caption}
              className="group-hover:scale-105 transition-transform duration-200"
              rounded
              shadow
            />
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <button
              className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 z-10"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
            
            <OptimizedImage
              src={images[selectedImage].src}
              alt={images[selectedImage].alt}
              caption={images[selectedImage].caption}
              className="max-w-full max-h-full object-contain"
              priority
            />

            {/* Navigation arrows */}
            {images.length > 1 && (
              <>
                <button
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-2xl hover:text-gray-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(selectedImage === 0 ? images.length - 1 : selectedImage - 1);
                  }}
                >
                  ‹
                </button>
                <button
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-2xl hover:text-gray-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(selectedImage === images.length - 1 ? 0 : selectedImage + 1);
                  }}
                >
                  ›
                </button>
              </>
            )}

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
              {selectedImage + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
} 