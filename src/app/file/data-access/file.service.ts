import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private _file: WritableSignal<File | null> = signal<File | null>(null);

  public set file(f: File) {
    this._file.set(f);
  }

  public get file(): WritableSignal<File | null> {
    return this._file;
  }

  reset() {
    this._file.set(null);
  }

}
