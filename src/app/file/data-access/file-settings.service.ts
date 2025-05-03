import { isPlatformServer } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, signal, WritableSignal } from '@angular/core';

const SAVE_FILE_HISTORY_NAME = "saveFileToHistory"
const COPY_FILE_HISTORY_NAME = "copyFileToHistory"
const RETENTION_TIME_NAME = "retentionTime"
const STORAGE_LIMIT_NAME = "storageLimit"

const DEFAULT_RETENTION_TIME = 30; // days
const DEFAULT_STORAGE_LIMIT = 1024; //Mb

@Injectable({
  providedIn: 'root'
})
export class FileSettingsService {
  platformId = inject(PLATFORM_ID)

  readonly saveFileToHistory: WritableSignal<boolean> = signal(false);
  readonly copyFileToHistory: WritableSignal<boolean> = signal(false);
  readonly retentionTime: WritableSignal<number> = signal(DEFAULT_RETENTION_TIME)
  readonly storageLimit: WritableSignal<number> = signal(DEFAULT_STORAGE_LIMIT)

  constructor() {
    this.init()
  }

  init() {
    if (isPlatformServer(this.platformId)) return;

    const n = Boolean(localStorage.getItem(SAVE_FILE_HISTORY_NAME) == 'true');
    this.setSaveFileToHistory(n);

    const sf = Boolean(localStorage.getItem(COPY_FILE_HISTORY_NAME) == 'true');
    this.setCopyFileToHistory(sf);

    const rt = Number(localStorage.getItem(RETENTION_TIME_NAME) ?? DEFAULT_RETENTION_TIME);
    this.setRetentionTime(rt)

    const sl = Number(localStorage.getItem(STORAGE_LIMIT_NAME) ?? DEFAULT_STORAGE_LIMIT);
    this.setStorageLimit(sl)
  }

  setSaveFileToHistory(n: boolean) {
    if (isPlatformServer(this.platformId)) return;

    this.saveFileToHistory.set(n);
    localStorage.setItem(SAVE_FILE_HISTORY_NAME, n.toString())
  }

  setCopyFileToHistory(n: boolean) {
    if (isPlatformServer(this.platformId)) return;

    this.copyFileToHistory.set(n);
    localStorage.setItem(COPY_FILE_HISTORY_NAME, n.toString())
  }

  setRetentionTime(days: number) {
    if (isPlatformServer(this.platformId)) return;

    this.retentionTime.set(days);
    localStorage.setItem(RETENTION_TIME_NAME, days.toString())
  }

  setStorageLimit(megabytes: number) {
    if (isPlatformServer(this.platformId)) return;

    this.storageLimit.set(megabytes);
    localStorage.setItem(STORAGE_LIMIT_NAME, megabytes.toString())
  }
}
