// src/components/search-form.tsx
'use client'; // This directive makes this file a Client Component

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function SearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams(); // Hook to access current search parameters
  const currentQuery = searchParams.get('query') || '';

  // Use state to manage the input field's value
  const [inputValue, setInputValue] = useState(currentQuery);

  // Update inputValue when the URL's query changes (e.g., direct navigation, back/forward)
  useEffect(() => {
    setInputValue(currentQuery);
  }, [currentQuery]);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission for client-side handling
    const newQuery = inputValue.trim(); // Get current value from state

    if (newQuery) {
      router.push(`/?query=${encodeURIComponent(newQuery)}`);
    } else {
      router.push('/'); // Clear query if input is empty
    }
  };

  const handleClearSearch = () => {
    setInputValue(''); // Clear the input field immediately
    router.push('/'); // Navigate to clear the URL query parameter
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2">
      <Input
        type="text"
        name="searchInput" // Still useful for browser auto-fill, but state controls value
        placeholder="Search by title, tag, date..."
        value={inputValue} // Input is now controlled by state
        onChange={(e) => setInputValue(e.target.value)} // Update state on change
        className="w-80"
      />
      <Button type="submit">Search</Button>
      {currentQuery && ( // Show clear button if a query is active in the URL
        <Button type="button" variant="outline" onClick={handleClearSearch}>
          Clear Search
        </Button>
      )}
    </form>
  );
}