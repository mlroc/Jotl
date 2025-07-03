import * as React from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export interface TagProps {
  children: React.ReactNode;
  className?: string;
}

const Tag = ({ children, className }: TagProps) => {
  if (typeof children !== 'string') return null;
  const tag = children;

  return (
    <Link
      href={`/tags/${encodeURIComponent(tag.toLowerCase())}`}
      className={cn(
        'inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary transition-colors hover:bg-primary/20',
        className
      )}
    >
      {tag}
    </Link>
  );
};

Tag.displayName = 'Tag';

export { Tag }; 