import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import GlassCard from '../components/GlassCard';
import PrimaryButton from '../components/PrimaryButton';
import PageTransition from '../components/PageTransition';
import { ArrowLeft, Upload, Save, RotateCcw, Pencil, X } from 'lucide-react';
import { getFromLocalStorage, saveToLocalStorage } from '../utils/localStorage';
import { imageToBase64 } from '../utils/imageToBase64';

interface Photo {
  image: string;
  caption: string;
}

const PHOTO_SLOTS = 6;

export default function PhotoGalleryPage() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [editedPhotos, setEditedPhotos] = useState<Photo[]>([]);
  const [showReset, setShowReset] = useState(false);

  useEffect(() => {
    const saved = getFromLocalStorage<Photo[]>('photoGallery', []);
    const initialized = Array.from({ length: PHOTO_SLOTS }, (_, i) => 
      saved[i] || { image: '', caption: '' }
    );
    setPhotos(initialized);
    setEditedPhotos(initialized);
    
    // Auto-enable edit mode if no photos are saved
    if (saved.length === 0 || saved.every(p => !p.image)) {
      setIsEditing(true);
    }
  }, []);

  const handleImageUpload = async (index: number, file: File | null) => {
    if (!file) return;
    
    try {
      const base64 = await imageToBase64(file);
      const newPhotos = [...editedPhotos];
      newPhotos[index] = { ...newPhotos[index], image: base64 };
      setEditedPhotos(newPhotos);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleCaptionChange = (index: number, caption: string) => {
    const newPhotos = [...editedPhotos];
    newPhotos[index] = { ...newPhotos[index], caption };
    setEditedPhotos(newPhotos);
  };

  const handleSave = () => {
    saveToLocalStorage('photoGallery', editedPhotos);
    setPhotos(editedPhotos);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedPhotos(photos);
    setIsEditing(false);
  };

  const handleReset = () => {
    const empty = Array.from({ length: PHOTO_SLOTS }, () => ({ image: '', caption: '' }));
    setEditedPhotos(empty);
    setIsEditing(true);
    setShowReset(false);
  };

  const hasPhotos = photos.some(p => p.image);

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate({ to: '/gifts' })}
            className="flex items-center gap-2 text-blue-100 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Gifts
          </button>
          <div className="flex gap-2">
            {!isEditing && hasPhotos && (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-blue-100 transition-colors hover:bg-white/20 hover:text-white"
                >
                  <Pencil className="h-4 w-4" />
                  Edit
                </button>
                <button
                  onClick={() => setShowReset(!showReset)}
                  className="rounded-full bg-white/10 p-2 text-blue-100 transition-colors hover:bg-white/20 hover:text-white"
                  title="Reset gallery"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              </>
            )}
          </div>
        </div>

        {showReset && (
          <GlassCard className="border-destructive/50 bg-destructive/10">
            <p className="mb-4 text-white">
              Are you sure you want to reset the gallery? This will delete all photos.
            </p>
            <div className="flex gap-3">
              <PrimaryButton onClick={handleReset} className="flex-1 bg-destructive hover:bg-destructive/90">
                Yes, Reset
              </PrimaryButton>
              <PrimaryButton variant="secondary" onClick={() => setShowReset(false)} className="flex-1">
                Cancel
              </PrimaryButton>
            </div>
          </GlassCard>
        )}

        <GlassCard>
          <div className="mb-6 text-center">
            <div className="mb-2 text-4xl">📸</div>
            <h2 className="text-3xl font-bold text-white">Our Gallery</h2>
            <p className="text-blue-100">Moments we treasure</p>
          </div>

          <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-3">
            {editedPhotos.map((photo, index) => (
              <div key={index} className="space-y-2">
                <div className="relative aspect-square overflow-hidden rounded-xl border-2 border-white/20 bg-white/5">
                  {photo.image ? (
                    <img
                      src={photo.image}
                      alt={photo.caption || `Photo ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-blue-200/50">
                      <Upload className="h-8 w-8" />
                    </div>
                  )}
                  {isEditing && (
                    <label className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/50 opacity-0 transition-opacity hover:opacity-100">
                      <Upload className="h-8 w-8 text-white" />
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageUpload(index, e.target.files?.[0] || null)}
                      />
                    </label>
                  )}
                </div>
                {isEditing ? (
                  <input
                    type="text"
                    value={photo.caption}
                    onChange={(e) => handleCaptionChange(index, e.target.value)}
                    placeholder="Add caption..."
                    className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm text-white placeholder-blue-200/50 focus:border-blue-glow focus:outline-none"
                  />
                ) : (
                  photo.caption && (
                    <p className="text-center text-sm text-blue-100">{photo.caption}</p>
                  )
                )}
              </div>
            ))}
          </div>

          {isEditing ? (
            <div className="flex gap-3">
              <PrimaryButton onClick={handleSave} className="flex-1">
                <Save className="mr-2 h-5 w-5" />
                Save Gallery
              </PrimaryButton>
              {hasPhotos && (
                <PrimaryButton variant="secondary" onClick={handleCancel} className="flex-1">
                  <X className="mr-2 h-5 w-5" />
                  Cancel
                </PrimaryButton>
              )}
            </div>
          ) : (
            <PrimaryButton onClick={() => navigate({ to: '/forever' })} className="w-full">
              Continue to Final Message 💙
            </PrimaryButton>
          )}
        </GlassCard>
      </div>
    </PageTransition>
  );
}
