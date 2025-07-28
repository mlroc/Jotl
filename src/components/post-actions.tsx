"use client";

import * as React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Clipboard, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PostActionsProps {
  content: string;
  filePath: string;
}

export const PostActions = ({ content, filePath }: PostActionsProps) => {
  const [copiedContent, setCopiedContent] = useState(false);
  const [copiedPath, setCopiedPath] = useState(false);

  const handleCopy = async (text: string, type: 'content' | 'path') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'content') {
        setCopiedContent(true);
        setTimeout(() => setCopiedContent(false), 2000);
      } else {
        setCopiedPath(true);
        setTimeout(() => setCopiedPath(false), 2000);
      }
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      // Fallback for older browsers or when clipboard API is not available
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        if (type === 'content') {
          setCopiedContent(true);
          setTimeout(() => setCopiedContent(false), 2000);
        } else {
          setCopiedPath(true);
          setTimeout(() => setCopiedPath(false), 2000);
        }
      } catch (fallbackError) {
        console.error('Fallback copy failed:', fallbackError);
      } finally {
        document.body.removeChild(textArea);
      }
    }
  };

  return (
    <div className="flex items-center space-x-2 my-4">
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleCopy(content, 'content')}
        className={cn('transition-all', { 'bg-green-100 dark:bg-green-900': copiedContent })}
      >
        {copiedContent ? (
          <>
            <Check className="mr-2 h-4 w-4 text-green-600 dark:text-green-400" />
            <span className="text-green-600 dark:text-green-400">Copied</span>
          </>
        ) : (
          <>
            <Clipboard className="mr-2 h-4 w-4" />
            Copy Post Content
          </>
        )}
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleCopy(filePath, 'path')}
        className={cn('transition-all', { 'bg-green-100 dark:bg-green-900': copiedPath })}
      >
        {copiedPath ? (
          <>
            <Check className="mr-2 h-4 w-4 text-green-600 dark:text-green-400" />
            <span className="text-green-600 dark:text-green-400">Copied</span>
          </>
        ) : (
          <>
            <Clipboard className="mr-2 h-4 w-4" />
            Copy File Path
          </>
        )}
      </Button>
    </div>
  );
}; 