import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import GlassCard from '../components/GlassCard';
import PrimaryButton from '../components/PrimaryButton';
import PageTransition from '../components/PageTransition';
import { ArrowLeft, Pencil, Save, X } from 'lucide-react';
import { getFromLocalStorage, saveToLocalStorage } from '../utils/localStorage';

const DEFAULT_LETTER = `My Dearest Love,

Every moment with you feels like a beautiful dream I never want to wake up from. You've brought so much joy, laughter, and love into my life that I can't imagine a single day without you.

Your smile lights up my darkest days, and your laugh is my favorite sound in the world. The way you understand me, support me, and love me unconditionally makes me feel like the luckiest person alive.

I promise to cherish every moment we share, to be there for you through thick and thin, and to love you more with each passing day.

You are my today and all of my tomorrows.

Forever yours,
With all my love 💙`;

export default function LoveLetterPage() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [letterText, setLetterText] = useState('');
  const [editedText, setEditedText] = useState('');

  useEffect(() => {
    const saved = getFromLocalStorage('loveLetter', DEFAULT_LETTER);
    setLetterText(saved);
    setEditedText(saved);
  }, []);

  const handleSave = () => {
    saveToLocalStorage('loveLetter', editedText);
    setLetterText(editedText);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedText(letterText);
    setIsEditing(false);
  };

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
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-blue-100 transition-colors hover:bg-white/20 hover:text-white"
            >
              <Pencil className="h-4 w-4" />
              Edit
            </button>
          )}
        </div>

        <GlassCard>
          <div className="mb-6 text-center">
            <div className="mb-2 text-4xl">💌</div>
            <h2 className="text-3xl font-bold text-white">Love Letter</h2>
            <p className="text-blue-100">Words from my heart</p>
          </div>

          {isEditing ? (
            <div className="space-y-4">
              <textarea
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                className="min-h-[400px] w-full rounded-2xl border-2 border-white/20 bg-white/5 p-4 text-white placeholder-blue-200/50 focus:border-blue-glow focus:outline-none"
                placeholder="Write your love letter here..."
              />
              <div className="flex gap-3">
                <PrimaryButton onClick={handleSave} className="flex-1">
                  <Save className="mr-2 h-5 w-5" />
                  Save
                </PrimaryButton>
                <PrimaryButton
                  variant="secondary"
                  onClick={handleCancel}
                  className="flex-1"
                >
                  <X className="mr-2 h-5 w-5" />
                  Cancel
                </PrimaryButton>
              </div>
            </div>
          ) : (
            <div className="prose prose-invert max-w-none">
              <div className="whitespace-pre-wrap text-lg leading-relaxed text-blue-50">
                {letterText}
              </div>
            </div>
          )}
        </GlassCard>
      </div>
    </PageTransition>
  );
}
