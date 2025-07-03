'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
}

export function PaginationControls({ currentPage, totalPages }: PaginationControlsProps) {
  const searchParams = useSearchParams();
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `?${params.toString()}`;
  };

  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      <Button asChild variant="outline" disabled={!hasPreviousPage}>
        <Link href={createPageURL(currentPage - 1)}>
          <ChevronLeft className="mr-2 size-4" />
          Previous
        </Link>
      </Button>
      <span className="text-sm font-medium text-muted-foreground">
        Page {currentPage} of {totalPages}
      </span>
      <Button asChild variant="outline" disabled={!hasNextPage}>
        <Link href={createPageURL(currentPage + 1)}>
          Next
          <ChevronRight className="ml-2 size-4" />
        </Link>
      </Button>
    </div>
  );
} 