import { isPlatformServer } from '@angular/common';
import { computed, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  private platformId = inject(PLATFORM_ID)

  private _online = signal<boolean>(navigator.onLine);
  private _verified = signal<boolean | null>(null);

  readonly online = computed(() => this._online());
  readonly verified = computed(() => this._verified());
  readonly isReallyOnline = computed(() => {
    const verified = this._verified();
    return verified === null ? this._online() : verified;
  });

  constructor() {
    if (isPlatformServer(this.platformId)) return;

    window.addEventListener('online', () => {
      this._online.set(true);
      this.verify();
    });

    window.addEventListener('offline', () => {
      this._online.set(false);
      this._verified.set(false);
    });

    this.verify();

    setInterval(() => this.verify(), 30000);
  }

  async verify(timeout = 3000): Promise<boolean> {
    if (!navigator.onLine) {
      this._verified.set(false);
      return false;
    }

    try {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), timeout);

      await fetch('/favicon.ico', {
        method: 'HEAD',
        cache: 'no-store',
        signal: controller.signal,
      });

      clearTimeout(id);
      this._verified.set(true);
      return true;
    } catch {
      this._verified.set(false);
      return false;
    }
  }
}
