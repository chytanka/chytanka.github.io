import { Injectable } from '@angular/core';
import { Base64 } from '../utils/base64';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProxyService {
  private readonly proxy = environment.proxy

  proxyUrl(url: string): string {
    return `${this.proxy}${Base64.toBase64(url)}`
  }
}
