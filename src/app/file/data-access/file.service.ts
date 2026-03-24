import { effect, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { FILE_PATH } from '../../app-routing.module';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  router = inject(Router);

  private _file: WritableSignal<File | null> = signal<File | null>(null);

  public set file(f: File) {
    this._file.set(f);
  }

  public get file(): WritableSignal<File | null> {
    return this._file;
  }

  constructor() {
    effect(() => this.navigate());
  }

  reset() {
    this._file.set(null);
  }

  private getRouteType(file: File): string | undefined {
    const fileType = file.type || file.name.split('.').pop()?.toLowerCase();

    if (!fileType) return undefined;

    if (fileType.includes('pdf')) return 'pdf';
    if (fileType.includes('mobi')) return 'mobi';
    if (/zip|cbz/.test(fileType)) return 'zip';

    return undefined;
  }

  private navigate() {
    const file = this.file();
    if (file === null) return;

    const t = this.getRouteType(file)

    if (t) {
      const url = `/${FILE_PATH}/${t}`;
      this.router.navigateByUrl(url)
    }
  }

}
