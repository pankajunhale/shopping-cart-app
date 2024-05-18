import { Injectable } from '@angular/core';
import { ILocalStorageManagerService } from '../../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageManagerService implements ILocalStorageManagerService {

  constructor() { }

  get(key: string): string | null {
    return localStorage.getItem(key);
  }

  set(key: string, value: any): void {
    localStorage.setItem(key, value);
  }

  delete(key: string): void {
    localStorage.removeItem(key);
  }

  deleteAll(): void {
    localStorage.clear();
  }

  getParsedData<T>(value: string): T {
    let result;
    if (value && typeof value === 'string') {
      result = JSON.parse(value);
    }
    return result;
  }

}
