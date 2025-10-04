import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Camera, Image, Upload, X } from 'lucide-react';
import { toast } from 'sonner';

interface PhotoUploaderProps {
  isOpen: boolean;
  onClose: () => void;
  onPhotoSelect: (file: File) => void;
}

export function PhotoUploader({ isOpen, onClose, onPhotoSelect }: PhotoUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Il file è troppo grande. Massimo 5MB.');
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        toast.error('Seleziona un file immagine valido.');
        return;
      }
      
      onPhotoSelect(file);
      onClose();
    }
  };

  const handleCameraClick = () => {
    // Su mobile: usa capture per fotocamera
    // Su desktop: usa getUserMedia per webcam
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // Desktop: usa webcam
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          // Crea subito il modal e gli elementi UI
          const modal = document.createElement('div');
          modal.style.position = 'fixed';
          modal.style.top = '0';
          modal.style.left = '0';
          modal.style.width = '100%';
          modal.style.height = '100%';
          modal.style.backgroundColor = 'rgba(0,0,0,0.8)';
          modal.style.display = 'flex';
          modal.style.alignItems = 'center';
          modal.style.justifyContent = 'center';
          modal.style.zIndex = '9999';
          
          const videoContainer = document.createElement('div');
          videoContainer.style.position = 'relative';
          videoContainer.style.display = 'flex';
          videoContainer.style.flexDirection = 'column';
          videoContainer.style.alignItems = 'center';
          videoContainer.style.gap = '20px';
          
          // Crea video element
          const video = document.createElement('video');
          video.style.width = '400px';
          video.style.height = '300px';
          video.style.borderRadius = '8px';
          video.style.backgroundColor = 'black';
          video.srcObject = stream;
          video.autoplay = true;
          video.muted = true;
          
          // Crea canvas per catturare frame
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          // Crea bottoni subito
          const buttonContainer = document.createElement('div');
          buttonContainer.style.display = 'flex';
          buttonContainer.style.gap = '10px';
          
          const captureBtn = document.createElement('button');
          captureBtn.textContent = 'Cattura';
          captureBtn.style.padding = '12px 24px';
          captureBtn.style.backgroundColor = '#EEBA2B';
          captureBtn.style.color = 'black';
          captureBtn.style.border = 'none';
          captureBtn.style.borderRadius = '6px';
          captureBtn.style.cursor = 'pointer';
          captureBtn.style.fontSize = '16px';
          captureBtn.style.fontWeight = 'bold';
          captureBtn.style.transition = 'background-color 0.2s';
          
          const closeBtn = document.createElement('button');
          closeBtn.textContent = 'Chiudi';
          closeBtn.style.padding = '12px 24px';
          closeBtn.style.backgroundColor = '#dc2626';
          closeBtn.style.color = 'white';
          closeBtn.style.border = 'none';
          closeBtn.style.borderRadius = '6px';
          closeBtn.style.cursor = 'pointer';
          closeBtn.style.fontSize = '16px';
          closeBtn.style.fontWeight = 'bold';
          closeBtn.style.transition = 'background-color 0.2s';
          
          // Event listeners immediati
          captureBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            if (ctx && video.videoWidth > 0) {
              canvas.width = video.videoWidth;
              canvas.height = video.videoHeight;
              ctx.drawImage(video, 0, 0);
              
              canvas.toBlob((blob) => {
                if (blob) {
                  const file = new File([blob], 'webcam-photo.jpg', { type: 'image/jpeg' });
                  handleFileSelect({ target: { files: [file] } } as any);
                }
              }, 'image/jpeg', 0.9);
            }
            
            // Cleanup immediato
            stream.getTracks().forEach(track => track.stop());
            document.body.removeChild(modal);
          });
          
          closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Cleanup immediato
            stream.getTracks().forEach(track => track.stop());
            document.body.removeChild(modal);
          });
          
          // Hover effects
          captureBtn.addEventListener('mouseenter', () => {
            captureBtn.style.backgroundColor = '#d4a526';
          });
          captureBtn.addEventListener('mouseleave', () => {
            captureBtn.style.backgroundColor = '#EEBA2B';
          });
          
          closeBtn.addEventListener('mouseenter', () => {
            closeBtn.style.backgroundColor = '#b91c1c';
          });
          closeBtn.addEventListener('mouseleave', () => {
            closeBtn.style.backgroundColor = '#dc2626';
          });
          
          // Assemble UI
          buttonContainer.appendChild(captureBtn);
          buttonContainer.appendChild(closeBtn);
          videoContainer.appendChild(video);
          videoContainer.appendChild(buttonContainer);
          modal.appendChild(videoContainer);
          
          // Mostra subito
          document.body.appendChild(modal);
          
          // Avvia video
          video.play().catch(err => {
            console.error('Errore avvio video:', err);
          });
        })
        .catch(err => {
          console.error('Errore accesso webcam:', err);
          toast.error('Impossibile accedere alla webcam');
          // Fallback al file input
          cameraInputRef.current?.click();
        });
    } else {
      // Fallback: usa file input
      cameraInputRef.current?.click();
    }
  };

  const handleLibraryClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Cambia foto profilo</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <Button
              onClick={handleCameraClick}
              className="w-full bg-gold text-black hover:bg-gold/90"
              size="lg"
            >
              <Camera className="w-5 h-5 mr-2" />
              Scatta una foto
            </Button>
            
            <Button
              onClick={handleLibraryClick}
              variant="outline"
              className="w-full border-gold text-black hover:bg-gold hover:text-black"
              size="lg"
            >
              <Image className="w-5 h-5 mr-2" />
              Scegli dalla libreria
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Hidden file inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileSelect}
        className="hidden"
      />
    </>
  );
}
