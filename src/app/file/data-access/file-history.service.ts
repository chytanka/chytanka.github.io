import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import Dexie from 'dexie';

const HISTORY_DB_NAME: string = `ChytankaHistoryDB`;
const HISTORY_TABLE_NAME: string = `filehistory`;

@Injectable({
  providedIn: 'root'
})
export class FileHistoryService {
  private db!: Dexie;

  platformId = inject(PLATFORM_ID)

  constructor() {
    this.createDatabase();
  }

  private createDatabase() {
    this.db = new Dexie(HISTORY_DB_NAME);
    this.db.version(1).stores({
      filehistory: '++id,sha256,pages,size,title,format,page,cover,arrayBuffer,created,updated'
    });
  }

  async addHistory(fileHistory: any) {
    if (!isPlatformBrowser(this.platformId)) return;

    const { sha256, arrayBuffer, pages, page, cover, size, title, format } = fileHistory

    // await this.db.table(HISTORY_TABLE_NAME).add({ site, post_id, title, cover });
    const existingEntry = await this.db.table(HISTORY_TABLE_NAME).where({ sha256 }).first();

    if (existingEntry) {
      // Entry already exists, update the 'updated' field
      const now = new Date().toISOString();
      await this.db.table(HISTORY_TABLE_NAME).update(existingEntry.id, { arrayBuffer, updated: now });
    } else {
      // Entry doesn't exist, add a new one
      const now = new Date().toISOString();
      await this.db.table(HISTORY_TABLE_NAME).add({
        created: now,
        updated: now,
        sha256,
        arrayBuffer,
        pages, page, cover, size, title, format
      });
    }
  }

  async getAllHistory() {
    return await this.db.table(HISTORY_TABLE_NAME).orderBy('updated').reverse().toArray();
  }

  async getItemBySha256(sha256: string) {
    return await this.db.table(HISTORY_TABLE_NAME).where('sha256').equals(sha256).first();
}


  async getAllHistoryWithoutBufferArray() {
    const records = await this.db.table(HISTORY_TABLE_NAME).orderBy('updated').reverse().toArray();
  
    return records.map(({ arrayBuffer, ...rest }) => rest);
  }

  async getTotalSizeAndCount(): Promise<{ size: number; count: number }> {
    let size = 0;
    let count = 0;

    await this.db.table(HISTORY_TABLE_NAME).each(item => {
      size += item.size;
      count++;
    });

    return { size, count };
  }

  async clearHistory() {
    await this.db.table(HISTORY_TABLE_NAME).clear();
  }

  async deleteHistoryItem(itemId: number) {
    await this.db.table(HISTORY_TABLE_NAME).delete(itemId);
  }

}
