import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Check, RotateCcw, ZoomIn, ZoomOut, X } from 'lucide-react';

interface PhotoCropperProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  onCrop: (croppedImageUrl: string) => void;
}

export function PhotoCropper({ isOpen, onClose, imageUrl, onCrop }: PhotoCropperProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const CROP_SIZE = 112; // Dimensione del cerchio del profilo

  useEffect(() => {
    if (isOpen && imageUrl) {
      const img = new Image();
      img.onload = () => {
        imageRef.current = img;
        // Reset transformations
        setScale(1);
        setRotation(0);
        setPosition({ x: 0, y: 0 });
        drawCanvas();
      };
      img.src = imageUrl;
    }
  }, [isOpen, imageUrl]);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = CROP_SIZE * 3;
    canvas.height = CROP_SIZE * 3;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Save context
    ctx.save();

    // Move to center of canvas
    ctx.translate(canvas.width / 2, canvas.height / 2);

    // Apply transformations
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(scale, scale);

    // Draw image centered
    const imgSize = Math.min(img.width, img.height);
    const drawSize = CROP_SIZE * 2;
    const x = -drawSize / 2 + position.x;
    const y = -drawSize / 2 + position.y;

    ctx.drawImage(img, x, y, drawSize, drawSize);

    // Restore context
    ctx.restore();

    // Draw crop circle overlay
    ctx.save();
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Clear the crop area
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, CROP_SIZE / 2, 0, 2 * Math.PI);
    ctx.fill();
    
    // Draw crop circle border (white instead of gold)
    ctx.globalCompositeOperation = 'source-over';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, CROP_SIZE / 2, 0, 2 * Math.PI);
    ctx.stroke();
    
    ctx.restore();
  };

  useEffect(() => {
    drawCanvas();
  }, [scale, rotation, position]);

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.1, 3));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.1, 0.5));
  };

  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const startX = e.clientX;
    const startY = e.clientY;
    const startPosition = { ...position };

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = (e.clientX - startX) / scale;
      const deltaY = (e.clientY - startY) / scale;
      setPosition({
        x: startPosition.x + deltaX,
        y: startPosition.y + deltaY
      });
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleCrop = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Create a new canvas for the cropped image
    const cropCanvas = document.createElement('canvas');
    const cropCtx = cropCanvas.getContext('2d');
    if (!cropCtx) return;

    cropCanvas.width = CROP_SIZE;
    cropCanvas.height = CROP_SIZE;

    // Draw the cropped circle
    cropCtx.beginPath();
    cropCtx.arc(CROP_SIZE / 2, CROP_SIZE / 2, CROP_SIZE / 2, 0, 2 * Math.PI);
    cropCtx.clip();

    // Draw the image from the main canvas
    cropCtx.drawImage(
      canvas,
      canvas.width / 2 - CROP_SIZE / 2,
      canvas.height / 2 - CROP_SIZE / 2,
      CROP_SIZE,
      CROP_SIZE,
      0,
      0,
      CROP_SIZE,
      CROP_SIZE
    );

    // Convert to data URL
    const croppedImageUrl = cropCanvas.toDataURL('image/png');
    onCrop(croppedImageUrl);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-center">Ritaglia la foto</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {/* Canvas Container */}
          <div className="flex justify-center">
            <div className="relative">
              <canvas
                ref={canvasRef}
                className="border-2 border-gray-300 rounded-lg cursor-move"
                onMouseDown={handleMouseDown}
              />
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center space-x-2">
            <Button
              onClick={handleZoomOut}
              variant="outline"
              size="sm"
              disabled={scale <= 0.5}
            >
              <ZoomOut className="w-4 h-4" />
            </Button>
            
            <Button
              onClick={handleZoomIn}
              variant="outline"
              size="sm"
              disabled={scale >= 3}
            >
              <ZoomIn className="w-4 h-4" />
            </Button>
            
            <Button
              onClick={handleRotate}
              variant="outline"
              size="sm"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>

          {/* Actions */}
          <div className="flex space-x-2">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1"
            >
              <X className="w-4 h-4 mr-2" />
              Annulla
            </Button>
            
            <Button
              onClick={handleCrop}
              className="flex-1 bg-gold text-black hover:bg-gold/90"
            >
              <Check className="w-4 h-4 mr-2" />
              Conferma
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
