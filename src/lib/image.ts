/**
 * Compresses an image Base64 string by resizing it and reducing quality using Canvas.
 */
export async function compressImage(
  base64: string,
  maxWidth = 800,
  maxHeight = 800,
  quality = 0.8
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = base64;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      // Force square crop for avatars
      const size = Math.min(img.width, img.height);
      const targetSize = Math.min(size, maxWidth); // Usually 800
      
      const sx = (img.width - size) / 2;
      const sy = (img.height - size) / 2;

      canvas.width = targetSize;
      canvas.height = targetSize;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(base64);
        return;
      }

      // Draw and compress
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, targetSize, targetSize);
      ctx.drawImage(img, sx, sy, size, size, 0, 0, targetSize, targetSize);
      
      // Convert to JPEG with specified quality
      const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
      resolve(compressedBase64);
    };
    img.onerror = (err) => {
      console.error('Error loading image for compression', err);
      reject(err);
    };
  });
}
