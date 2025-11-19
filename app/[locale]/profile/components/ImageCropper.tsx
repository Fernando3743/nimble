import { useState, useRef, useEffect, useCallback, useMemo, memo } from "react";
import { throttle } from "@/utils/throttle";
import { IMAGE_CROPPER } from "@/lib/constants";
import { MOBILE_CROP_SIZE, DESKTOP_CROP_SIZE, DESKTOP_BREAKPOINT } from "../constants";

interface ImageCropperProps {
  imageSrc: string;
  scale: number;
  onScaleChange: (scale: number) => void;
  onMinScaleChange?: (minScale: number) => void;
  position: { x: number; y: number };
  onPositionChange: (position: { x: number; y: number }) => void;
  onCropComplete: (croppedImageData: string) => void;
  saving?: boolean;
}

const ImageCropper = memo(function ImageCropper({
  imageSrc,
  scale,
  onScaleChange,
  onMinScaleChange,
  position,
  onPositionChange,
  onCropComplete,
  saving = false,
}: ImageCropperProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imageReady, setImageReady] = useState(false);

  // Responsive crop size with resize listener
  const [cropSize, setCropSize] = useState(() => {
    if (typeof window === 'undefined') return DESKTOP_CROP_SIZE;
    return window.innerWidth < DESKTOP_BREAKPOINT ? MOBILE_CROP_SIZE : DESKTOP_CROP_SIZE;
  });

  // Update crop size on window resize
  useEffect(() => {
    const handleResize = throttle(() => {
      const newSize = window.innerWidth < DESKTOP_BREAKPOINT ? MOBILE_CROP_SIZE : DESKTOP_CROP_SIZE;
      if (newSize !== cropSize) {
        setCropSize(newSize);
        // Recalculate initial scale for new crop size
        const img = imageRef.current;
        if (img) {
          const initialScale = Math.max(
            newSize / img.width,
            newSize / img.height
          );
          onMinScaleChange?.(initialScale);
          // If current scale is below new minimum, adjust it
          if (scale < initialScale) {
            onScaleChange(initialScale);
          }
        }
      }
    }, 100); // Throttle resize events to improve performance

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [cropSize, scale, onScaleChange, onMinScaleChange]);

  // Load image and set initial scale
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      imageRef.current = img;

      // Calculate initial scale to fit the image in the crop circle
      // Make sure the smallest dimension fills the circle completely
      const initialScale = Math.max(
        cropSize / img.width,
        cropSize / img.height
      );

      // Set the minimum zoom to the initial scale (can't zoom out beyond fitting the image)
      onMinScaleChange?.(initialScale);

      // Set initial scale if it's the first load (scale is 1)
      // Cap to MAX_ZOOM to respect zoom limits
      if (scale === 1) {
        onScaleChange(Math.min(initialScale, IMAGE_CROPPER.MAX_ZOOM));
        // Reset position to center
        onPositionChange({ x: 0, y: 0 });
      }

      setImageReady(true);
      drawCanvas();
    };
    img.src = imageSrc;
  }, [imageSrc]);

  // Draw canvas
  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size to match the crop size
    canvas.width = cropSize;
    canvas.height = cropSize;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Save context state
    ctx.save();

    // Create circular clipping mask
    ctx.beginPath();
    ctx.arc(cropSize / 2, cropSize / 2, cropSize / 2, 0, 2 * Math.PI);
    ctx.clip();

    // Calculate image dimensions
    const imgWidth = img.width * scale;
    const imgHeight = img.height * scale;

    // Center image and apply position
    const x = (canvas.width - imgWidth) / 2 + position.x;
    const y = (canvas.height - imgHeight) / 2 + position.y;

    // Draw image
    ctx.drawImage(img, x, y, imgWidth, imgHeight);

    // Restore context
    ctx.restore();

    // Draw circle border
    ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cropSize / 2, cropSize / 2, cropSize / 2, 0, 2 * Math.PI);
    ctx.stroke();
  }, [scale, position]);

  // Redraw when dependencies change
  useEffect(() => {
    if (imageReady) {
      drawCanvas();
    }
  }, [drawCanvas, imageReady]);

  // Validate position when scale changes
  useEffect(() => {
    const img = imageRef.current;
    if (!img || !imageReady) return;

    // Calculate image dimensions
    const imgWidth = img.width * scale;
    const imgHeight = img.height * scale;

    // Calculate boundaries
    const maxX = Math.max(0, (imgWidth - cropSize) / 2);
    const minX = -maxX;
    const maxY = Math.max(0, (imgHeight - cropSize) / 2);
    const minY = -maxY;

    // Check if current position is valid
    let needsUpdate = false;
    let newX = position.x;
    let newY = position.y;

    if (position.x > maxX) {
      newX = maxX;
      needsUpdate = true;
    } else if (position.x < minX) {
      newX = minX;
      needsUpdate = true;
    }

    if (position.y > maxY) {
      newY = maxY;
      needsUpdate = true;
    } else if (position.y < minY) {
      newY = minY;
      needsUpdate = true;
    }

    if (needsUpdate) {
      onPositionChange({ x: newX, y: newY });
    }
  }, [scale, imageReady]);

  // Handle mouse events
  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    if (saving) return;
    e.preventDefault();

    setIsDragging(true);
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    setDragStart({
      x: clientX - position.x,
      y: clientY - position.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || saving) return;
    e.preventDefault();

    const img = imageRef.current;
    if (!img) return;

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    // Calculate new position
    let newX = clientX - dragStart.x;
    let newY = clientY - dragStart.y;

    // Calculate image dimensions
    const imgWidth = img.width * scale;
    const imgHeight = img.height * scale;

    // Calculate boundaries to prevent white space
    // The image should never move so far that it doesn't cover the crop area
    const maxX = (imgWidth - cropSize) / 2;
    const minX = -maxX;
    const maxY = (imgHeight - cropSize) / 2;
    const minY = -maxY;

    // Apply boundaries
    newX = Math.max(minX, Math.min(maxX, newX));
    newY = Math.max(minY, Math.min(maxY, newY));

    onPositionChange({
      x: newX,
      y: newY,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Generate cropped image data function
  const generateCroppedImage = useCallback(() => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img || !imageReady) return;

    // Create a temporary canvas for the final cropped image
    const cropCanvas = document.createElement("canvas");
    cropCanvas.width = cropSize;
    cropCanvas.height = cropSize;
    const cropCtx = cropCanvas.getContext("2d");

    if (!cropCtx) return;

    // Create circular mask
    cropCtx.beginPath();
    cropCtx.arc(cropSize / 2, cropSize / 2, cropSize / 2, 0, 2 * Math.PI);
    cropCtx.clip();

    // Calculate image position
    const imgWidth = img.width * scale;
    const imgHeight = img.height * scale;
    const x = (cropSize - imgWidth) / 2 + position.x;
    const y = (cropSize - imgHeight) / 2 + position.y;

    // Draw the image
    cropCtx.drawImage(img, x, y, imgWidth, imgHeight);

    // Convert to data URL
    const croppedData = cropCanvas.toDataURL("image/jpeg", IMAGE_CROPPER.JPEG_QUALITY);
    onCropComplete(croppedData);
  }, [scale, position, onCropComplete, imageReady]);

  // Create throttled version of the crop generation function
  // This limits updates to ~60fps for smooth performance
  const throttledGenerateCrop = useMemo(
    () => throttle(generateCroppedImage, IMAGE_CROPPER.THROTTLE_MS),
    [generateCroppedImage]
  );

  // Generate cropped image when position or scale changes (throttled)
  useEffect(() => {
    if (imageReady) {
      throttledGenerateCrop();
    }
  }, [throttledGenerateCrop, imageReady]);

  // Dynamic size classes based on current crop size
  const sizeClass = cropSize === MOBILE_CROP_SIZE ? 'h-32 w-32' : 'h-40 w-40';

  return (
    <div className={`relative ${sizeClass} flex-shrink-0 overflow-hidden rounded-full bg-white`}>
      {/* Loading skeleton while image loads */}
      {!imageReady && (
        <div className="absolute inset-0 z-20 flex items-center justify-center rounded-full bg-light-gray animate-pulse">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-300 border-t-primary"></div>
        </div>
      )}

      {/* Saving overlay */}
      {saving && (
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-full bg-black/60 backdrop-blur-sm">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/20 border-t-white"></div>
        </div>
      )}

      <canvas
        ref={canvasRef}
        className={`${sizeClass} rounded-full ${saving ? 'pointer-events-none' : 'cursor-move'} ${!imageReady ? 'opacity-0' : 'opacity-100'} transition-opacity duration-200`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
        style={{ touchAction: 'none' }}
      />
    </div>
  );
});

export default ImageCropper;