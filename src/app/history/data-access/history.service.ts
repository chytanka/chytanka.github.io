import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import Dexie from 'dexie';

const HISTORY_DB_NAME: string = `ChytankaHistoryDB`;
const HISTORY_TABLE_NAME: string = `history`;

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private db!: Dexie;

  platformId = inject(PLATFORM_ID)

  constructor() {
    this.createDatabase();
  }

  private createDatabase() {

    this.db = new Dexie(HISTORY_DB_NAME);
    this.db.version(1).stores({
      history: '++id,site,post_id,title,cover,episode,created,updated'
    });
  }

  async addHistory(site: string, post_id: string, title: string, cover: string, episode: any) {
    if(!isPlatformBrowser(this.platformId)) return;
    // await this.db.table(HISTORY_TABLE_NAME).add({ site, post_id, title, cover });
    const existingEntry = await this.db.table(HISTORY_TABLE_NAME).where({ site, post_id: post_id }).first();

    if (existingEntry) {
      // Entry already exists, update the 'updated' field
      const now = new Date().toISOString();
      await this.db.table(HISTORY_TABLE_NAME).update(existingEntry.id, { updated: now });
    } else {
      // Entry doesn't exist, add a new one
      const now = new Date().toISOString();
      await this.db.table(HISTORY_TABLE_NAME).add({ site, title, cover, episode, post_id: post_id, created: now, updated: now });
    }
  }

  async getAllHistory() {
    return await this.db.table(HISTORY_TABLE_NAME).orderBy('updated').reverse().toArray();
  }

  async clearHistory() {
    await this.db.table(HISTORY_TABLE_NAME).clear();
  }

  async deleteHistoryItem(itemId: number) {
    await this.db.table(HISTORY_TABLE_NAME).delete(itemId);
  }
}
