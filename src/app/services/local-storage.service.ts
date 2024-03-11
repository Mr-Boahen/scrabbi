import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}
  // Set a value in local storage
  setItem(key: string, value: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  // Get a value from local storage
  getItem(key: string): string | null {
    if (typeof window !== 'undefined') {
      const storedItem = localStorage.getItem(key);
      return storedItem ? JSON.parse(storedItem) : null;
    }
    return null;
  }

  // Remove a value from local storage
  removeItem(key: string): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  }

  // Clear all items from local storage
  clear(): void {
    if (typeof window !== 'undefined') {
      localStorage.clear();
    }
  }
}
