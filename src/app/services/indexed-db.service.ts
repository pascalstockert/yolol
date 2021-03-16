import { Injectable } from '@angular/core';
import { openDB } from 'idb';

@Injectable({
  providedIn: 'root'
})
export class IndexedDbService {

  indexedDb;
  storeName = 'yolol-info';

  constructor() {
  }

  init(): void {
    if ( !( 'indexedDB' in window ) ) {
      throw new Error( 'indexedDB is not supported in your browser!\n' +
        'Consider switching to a Chromium-based browser for a better user experience.' );
    }

    this.indexedDb = openDB( 'yolol-store', 1, {
      upgrade( db ): void {
        db.createObjectStore( 'keyval' );
      }
    } );
  }

  async get(key): Promise<any> {
    return (await this.indexedDb).get('keyval', key);
  }

  async set(key, val): Promise<any> {
    return (await this.indexedDb).put('keyval', val, key);
  }

  async delete(key): Promise<any> {
    return (await this.indexedDb).delete('keyval', key);
  }

  async clear(): Promise<any> {
    return (await this.indexedDb).clear('keyval');
  }

  async keys(): Promise<any> {
    return (await this.indexedDb).getAllKeys('keyval');
  }

}
