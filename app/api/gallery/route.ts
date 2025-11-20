import { NextResponse } from 'next/server';
import { readdir } from 'fs/promises';
import { join } from 'path';

interface GalleryImage {
  src: string;
  alt: string;
}

// Cache the gallery images list for 1 hour
let cachedImages: GalleryImage[] | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif'] as const;

export async function GET(): Promise<NextResponse<{ images: GalleryImage[] }>> {
  try {
    const now = Date.now();
    
    // Return cached data if still valid
    if (cachedImages && (now - cacheTimestamp) < CACHE_DURATION) {
      return NextResponse.json(
        { images: cachedImages },
        {
          headers: {
            'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
          },
        }
      );
    }
    
    // Path to the public/gallery folder
    const galleryPath = join(process.cwd(), 'public', 'gallery');
    
    // Read all files from the gallery directory
    const files = await readdir(galleryPath);
    
    // Filter for image files (jpg, jpeg, png, webp, gif)
    const imageFiles: GalleryImage[] = files
      .filter((file): boolean => {
        const ext = file.toLowerCase().substring(file.lastIndexOf('.'));
        return IMAGE_EXTENSIONS.includes(ext as typeof IMAGE_EXTENSIONS[number]);
      })
      .filter((file): boolean => !file.includes('.backup')) // Exclude backup files
      .sort() // Sort alphabetically for consistent ordering
      .map((file): GalleryImage => ({
        src: `/gallery/${file}`,
        alt: `Gallery image ${file.replace(/\.[^/.]+$/, '')}` // Remove extension for alt text
      }));
    
    // Update cache
    cachedImages = imageFiles;
    cacheTimestamp = now;
    
    return NextResponse.json(
      { images: imageFiles },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      }
    );
  } catch (error) {
    console.error('Error reading gallery directory:', error);
    // Return empty array if directory doesn't exist or can't be read
    return NextResponse.json(
      { images: [] },
      {
        status: 200, // Still return 200 to avoid breaking the frontend
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        },
      }
    );
  }
}

