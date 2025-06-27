import * as THREE from 'three';
import { LogoImage } from '../types/bike';

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}

export async function processImageWithTransformations(image: LogoImage): Promise<HTMLImageElement> {
  // Load the source image and return it without any color transformations
  const sourceImage = await loadImage(image.url || image.blobUrl || '');
  return sourceImage;
}

export async function generateLogoTexture({
  width,
  height,
  images,
}: {
  width: number;
  height: number;
  images: LogoImage[];
}): Promise<THREE.Texture> {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  // Clear canvas with transparent background
  ctx.clearRect(0, 0, width, height);

  for (const img of images) {
    if (!img.url && !img.blobUrl) continue;
    
    // Use processed image if available, otherwise process it
    const processedImage = img.processedImage || await processImageWithTransformations(img);
    
    ctx.save();
    ctx.translate(img.x, img.y);
    ctx.rotate((img.rotation || 0) * Math.PI / 180);
    ctx.scale(img.scaleX || 1, img.scaleY || 1);
    ctx.drawImage(
      processedImage,
      -processedImage.width / 2,
      -processedImage.height / 2
    );
    ctx.restore();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.flipY = false;
  texture.needsUpdate = true;
  texture.colorSpace = THREE.SRGBColorSpace;

  return texture;
} 