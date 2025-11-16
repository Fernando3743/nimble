import { useState, useRef, useEffect, useCallback } from "react";

interface ImageCropperProps {
  imageSrc: string;
  scale: number;
  onScaleChange: (scale: number) => void;
  position: { x: number; y: number };
  onPositionChange: (position: { x: number; y: number }) => void;
  onCropComplete: (croppedImageData: string) => void;
  saving?: boolean;
}

export default function ImageCropper({
  imageSrc,
  scale,
  onScaleChange,
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

  const cropSize = 160;

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

      // Set initial scale if it's the first load (scale is 1)
      if (scale === 1) {
        onScaleChange(initialScale);
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

  // Generate cropped image data
  useEffect(() => {
    const generateCroppedImage = () => {
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
      const croppedData = cropCanvas.toDataURL("image/jpeg", 0.95);
      onCropComplete(croppedData);
    };

    // Generate cropped image whenever position or scale changes
    if (imageReady) {
      generateCroppedImage();
    }
  }, [scale, position, onCropComplete, imageReady]);

  return (
    <div className="relative h-40 w-40 flex-shrink-0 overflow-hidden rounded-full bg-white">
      {saving && (
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-full bg-black/60 backdrop-blur-sm">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/20 border-t-white"></div>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className={`h-40 w-40 rounded-full ${saving ? 'pointer-events-none' : 'cursor-move'}`}
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
}