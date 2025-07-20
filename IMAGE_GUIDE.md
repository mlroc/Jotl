# 🖼️ Image System Guide

This guide explains how to use the comprehensive image system in your blog.

## Components Available

### 1. `OptimizedImage`
The base component with full optimization features.

```jsx
<OptimizedImage 
  src="https://example.com/image.jpg" 
  alt="Description of image"
  width={800}
  height={600}
  caption="Optional caption"
  rounded
  shadow
  priority
/>
```

**Props:**
- `src`: Image URL (required)
- `alt`: Alt text for accessibility (required)
- `width`: Image width in pixels (default: 800)
- `height`: Image height in pixels (default: 600)
- `caption`: Optional caption text
- `rounded`: Add rounded corners
- `shadow`: Add drop shadow
- `priority`: Load image with high priority (for above-the-fold images)

### 2. `ResponsiveImage`
Automatically responsive image that adapts to screen size.

```jsx
<ResponsiveImage 
  src="https://example.com/image.jpg" 
  alt="Description"
  caption="Optional caption"
  priority
/>
```

### 3. `ThumbnailImage`
Small, focused image perfect for thumbnails.

```jsx
<ThumbnailImage 
  src="https://example.com/image.jpg" 
  alt="Description"
/>
```

### 4. `ImageGallery`
Display multiple images in a grid with lightbox functionality.

```jsx
<ImageGallery 
  images={[
    {
      src: "https://example.com/image1.jpg",
      alt: "Description 1",
      caption: "Caption 1"
    },
    {
      src: "https://example.com/image2.jpg",
      alt: "Description 2",
      caption: "Caption 2"
    }
  ]}
  columns={2}
/>
```

## Usage in MDX Posts

All components are automatically available in your MDX posts:

```mdx
---
title: "My Post"
date: "2025-01-15"
tags: ["demo"]
slug: "my-post"
---

# My Post

Here's an image:

<OptimizedImage 
  src="https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop" 
  alt="Beautiful landscape"
  caption="A stunning landscape"
  rounded
  shadow
/>

And a gallery:

<ImageGallery 
  images={[
    {
      src: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop",
      alt: "Landscape 1"
    },
    {
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      alt: "Landscape 2"
    }
  ]}
  columns={2}
/>
```

## Image Sources

### External Images
- **Unsplash**: `https://images.unsplash.com/...`
- **Placeholder**: `https://via.placeholder.com/...`
- **Any HTTPS image URL**

### Local Images
Store images in `public/images/` and reference them as:
- `/images/my-image.jpg`
- `/images/folder/image.png`

## Performance Features

### ✅ Automatic Optimization
- WebP/AVIF format conversion
- Responsive sizing
- Lazy loading
- Priority loading for above-the-fold images

### ✅ User Experience
- Loading states with skeleton animations
- Error handling with fallback displays
- Smooth transitions
- Lightbox gallery with navigation

### ✅ Accessibility
- Proper alt text support
- Keyboard navigation
- Screen reader friendly
- Focus management

## Best Practices

1. **Always provide alt text** for accessibility
2. **Use appropriate image sizes** (don't use 2000px images for thumbnails)
3. **Add captions** when they add value
4. **Use priority loading** for above-the-fold images
5. **Optimize external images** with proper sizing parameters

## Example: Complete Post

```mdx
---
title: "My Photo Journey"
date: "2025-01-15"
tags: ["photography", "travel"]
slug: "photo-journey"
---

# My Photo Journey

Here's a beautiful landscape I captured:

<ResponsiveImage 
  src="https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=800&fit=crop" 
  alt="Mountain landscape with lake"
  caption="Peaceful mountain scene at sunset"
  priority
/>

And here's a collection of my favorite shots:

<ImageGallery 
  images={[
    {
      src: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop",
      alt: "Mountain landscape",
      caption: "Sunset over mountains"
    },
    {
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      alt: "City skyline",
      caption: "Urban architecture"
    }
  ]}
  columns={2}
/>
```

This image system demonstrates professional-grade features that will impress recruiters with your attention to performance, accessibility, and user experience! 