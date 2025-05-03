import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class FileHashService {
  // getSHA256(arrayBuffer: ArrayBuffer): string {
  //   const wordArray = CryptoJS.lib.WordArray.create(new Uint8Array(arrayBuffer) as any);
  //   return CryptoJS.SHA256(wordArray).toString(CryptoJS.enc.Hex);
  // }

  async sha256(file: File): Promise<string> {
    const sha256 = CryptoJS.algo.SHA256.create();
    const sliceSize = 50_000_000; // 50 MiB
    let start = 0;
  
    while (start < file.size) {
      const slice: Uint8Array = await this.readSlice(file, start, sliceSize);
      const wordArray = CryptoJS.lib.WordArray.create(slice);
      sha256.update(wordArray);
      start += sliceSize;
    }
  
    return sha256.finalize().toString();
  }
  
  private async readSlice(file: File, start: number, size: number): Promise<Uint8Array> {
    return new Promise<Uint8Array>((resolve, reject) => {
      const fileReader = new FileReader();
      const slice = file.slice(start, start + size);
  
      fileReader.onload = () => {
        if (fileReader.result) {
          resolve(new Uint8Array(fileReader.result as ArrayBuffer));
        } else {
          reject(new Error("FileReader returned no result."));
        }
      };
      fileReader.onerror = () => reject(fileReader.error || new Error("FileReader failed."));
      fileReader.readAsArrayBuffer(slice);
    });
  }
  
}
