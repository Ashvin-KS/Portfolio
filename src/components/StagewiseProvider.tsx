'use client';

import { useEffect } from 'react';
import { initToolbar } from '@stagewise/toolbar';

export default function StagewiseProvider() {
  useEffect(() => {
    // Only run on client side and in development
    if (typeof window === 'undefined' || process.env.NODE_ENV !== 'development') {
      return;
    }

    // Define toolbar configuration
    const stagewiseConfig = {
      plugins: [
        // Add your custom plugins here if needed
        // Example:
        // {
        //   name: 'example-plugin',
        //   description: 'Adds additional context for your components',
        //   shortInfoForPrompt: () => {
        //     return "Context information about the selected element";
        //   },
        //   mcp: null,
        //   actions: [],
        // }
      ],
    };

    // Initialize the toolbar
    initToolbar(stagewiseConfig);
  }, []);

  return null;
}