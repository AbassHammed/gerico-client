'use client';

import React from 'react';

const GericFlipFlopLoader: React.FC = () => (
  <div className="flex items-center justify-center">
    <span className="text-2xl font-bold text-brand-500">GERIC</span>
    <div className="inline-block">
      <div className="inset-0 flex items-center justify-center animate-flip">
        <span className="text-2xl font-bold text-brand-500">O</span>
      </div>
    </div>
    <div className="flex">
      <span className="text-2xl font-bold text-brand-500 animate-bounce-dot1">.</span>
      <span className="text-2xl font-bold text-brand-500 animate-bounce-dot2">.</span>
      <span className="text-2xl font-bold text-brand-500 animate-bounce-dot3">.</span>
    </div>
  </div>
);

export default GericFlipFlopLoader;
