import React, { useState } from 'react';
import { useBikeStore } from '../../store/useBikeStore';
import Image from 'next/image';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useLogoImageActions } from '../../hooks/useLogoImageActions';

const logoImagesList = [
  // SWM logos
  'SWM - Pozytyw - Right-Top.png',
  'SWM - Pozytyw - Right-Bottom.png',
  'SWM - Pozytyw - Left-Top.png',
  'SWM - Pozytyw - Left-Bottom.png',
  'SWM - Negatyw - Right-Top.png',
  'SWM - Negatyw - Right-Bottom.png',
  'SWM - Negatyw - Left-Top.png',
  'SWM - Negatyw - Left-Bottom.png',
  'SWM - Kontur - Right-Top.png',
  'SWM - Kontur - Right-Bottom.png',
  'SWM - Kontur - Left-Top.png',
  'SWM - Kontur - Left-Bottom.png',
  
  // Software Mansion - Pozytyw (XS)
  'Software Mansion - Pozytyw - XS - Right-Top.png',
  'Software Mansion - Pozytyw - XS - Right-Bottom.png',
  'Software Mansion - Pozytyw - XS - Left-Top.png',
  'Software Mansion - Pozytyw - XS - Left-Bottom.png',
  
  // Software Mansion - Pozytyw (S)
  'Software Mansion - Pozytyw - S - Right-Top.png',
  'Software Mansion - Pozytyw - S - Right-Bottom.png',
  'Software Mansion - Pozytyw - S - Left-Top.png',
  'Software Mansion - Pozytyw - S - Left-Bottom.png',
  
  // Software Mansion - Pozytyw (M)
  'Software Mansion - Pozytyw - M - Right-Top.png',
  'Software Mansion - Pozytyw - M - Right-Bottom.png',
  'Software Mansion - Pozytyw - M - Left-Top.png',
  'Software Mansion - Pozytyw - M - Left-Bottom.png',
  
  // Software Mansion - Pozytyw (L)
  'Software Mansion - Pozytyw - L - Right-Top.png',
  'Software Mansion - Pozytyw - L - Right-Bottom.png',
  'Software Mansion - Pozytyw - L - Left-Top.png',
  'Software Mansion - Pozytyw - L - Left-Bottom.png',
  
  // Software Mansion - Pozytyw (XL)
  'Software Mansion - Pozytyw - XL - Right-Top.png',
  'Software Mansion - Pozytyw - XL - Right-Bottom.png',
  'Software Mansion - Pozytyw - XL - Left-Top.png',
  'Software Mansion - Pozytyw - XL - Left-Bottom.png',
  
  // Software Mansion - Negatyw (XS)
  'Software Mansion - Negatyw - XS - Right-Top.png',
  'Software Mansion - Negatyw - XS - Right-Bottom.png',
  'Software Mansion - Negatyw - XS - Left-Top.png',
  'Software Mansion - Negatyw - XS - Left-Bottom.png',
  
  // Software Mansion - Negatyw (S)
  'Software Mansion - Negatyw - S - Right-Top.png',
  'Software Mansion - Negatyw - S - Right-Bottom.png',
  'Software Mansion - Negatyw - S - Left-Top.png',
  'Software Mansion - Negatyw - S - Left-Bottom.png',
  
  // Software Mansion - Negatyw (M)
  'Software Mansion - Negatyw - M - Right-Top.png',
  'Software Mansion - Negatyw - M - Right-Bottom.png',
  'Software Mansion - Negatyw - M - Left-Top.png',
  'Software Mansion - Negatyw - M - Left-Bottom.png',
  
  // Software Mansion - Negatyw (L)
  'Software Mansion - Negatyw - L - Right-Top.png',
  'Software Mansion - Negatyw - L - Right-Bottom.png',
  'Software Mansion - Negatyw - L - Left-Top.png',
  'Software Mansion - Negatyw - L - Left-Bottom.png',
  
  // Software Mansion - Negatyw (XL)
  'Software Mansion - Negatyw - XL - Right-Top.png',
  'Software Mansion - Negatyw - XL - Right-Bottom.png',
  'Software Mansion - Negatyw - XL - Left-Top.png',
  'Software Mansion - Negatyw - XL - Left-Bottom.png',
  
  // Software Mansion - Kontur (XS)
  'Software Mansion - Kontur - XS - Right-Top.png',
  'Software Mansion - Kontur - XS - Right-Bottom.png',
  'Software Mansion - Kontur - XS - Left-Top.png',
  'Software Mansion - Kontur - XS - Left-Bottom.png',
  
  // Software Mansion - Kontur (S)
  'Software Mansion - Kontur - S - Right-Top.png',
  'Software Mansion - Kontur - S - Right-Bottom.png',
  'Software Mansion - Kontur - S - Left-Top.png',
  'Software Mansion - Kontur - S - Left-Bottom.png',
  
  // Software Mansion - Kontur (M)
  'Software Mansion - Kontur - M - Right-Top.png',
  'Software Mansion - Kontur - M - Right-Bottom.png',
  'Software Mansion - Kontur - M - Left-Top.png',
  'Software Mansion - Kontur - M - Left-Bottom.png',
  
  // Software Mansion - Kontur (L)
  'Software Mansion - Kontur - L - Right-Top.png',
  'Software Mansion - Kontur - L - Right-Bottom.png',
  'Software Mansion - Kontur - L - Left-Top.png',
  'Software Mansion - Kontur - L - Left-Bottom.png',
  
  // Software Mansion - Kontur (XL)
  'Software Mansion - Kontur - XL - Right-Top.png',
  'Software Mansion - Kontur - XL - Right-Bottom.png',
  'Software Mansion - Kontur - XL - Left-Top.png',
  'Software Mansion - Kontur - XL - Left-Bottom.png',
];

export default function ImagePickerPanel() {
  const {
    selectedLogoImageId,
    selectionPanelType,
    showBottomPanel,
    bottomPanelHeight,
    selectedLogoType,
  } = useBikeStore();
  const [logoImages] = useState<string[]>(logoImagesList);

  const {
    isReplaceMode,
    addBuiltInImage,
    replaceBuiltInImage,
    addUploadedImage,
    replaceUploadedImage,
  } = useLogoImageActions();

  if (selectionPanelType !== 'image') return null;

  const handleImagePick = (img: string) => {
    if (isReplaceMode) {
      replaceBuiltInImage(img);
    } else {
      addBuiltInImage(img);
    }
  };

  const handleAddImage = () => {
    if (!selectedLogoType && !selectedLogoImageId) return;
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/png,image/jpg,image/jpeg';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      if (isReplaceMode) {
        replaceUploadedImage(file);
      } else {
        addUploadedImage(file);
      }
    };
    input.click();
  };

  return (
    <div 
      className="fixed left-[300px] top-0 bg-white shadow-lg border-l border-gray-200 z-30 flex flex-col"
      style={{
        width: 'auto',
        minWidth: 300,
        maxWidth: '100vw',
        bottom: showBottomPanel ? `${bottomPanelHeight}px` : '0px',
        height: showBottomPanel ? `calc(100vh - ${bottomPanelHeight}px)` : '100vh'
      }}
    >
      <div className="p-4 border-b border-gray-200 font-medium text-gray-800 flex items-center justify-between">
        <span>{isReplaceMode ? 'Replace Logo Image' : 'Add Logo Image'}</span>
        <button
          onClick={handleAddImage}
          className="p-1 rounded hover:bg-gray-100 transition-colors"
          title="Upload new image"
        >
          <PlusIcon className="h-5 w-5 text-brand-brown-700" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-3 gap-3">
          {logoImages.map(img => (
            <button
              key={img}
              className="w-20 h-20 border border-gray-300 rounded-lg overflow-hidden flex items-center justify-center bg-white hover:border-brand-brown-100 focus:border-brand-brown-500 transition-all"
              onClick={() => handleImagePick(img)}
            >
              <Image src={`/textures/logos/${img}`} alt={img} width={80} height={80} className="object-contain w-full h-full" unoptimized />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 