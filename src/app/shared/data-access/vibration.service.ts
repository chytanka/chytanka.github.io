import { isPlatformServer } from '@angular/common';
import { computed, inject, Injectable, PLATFORM_ID, Signal, signal, WritableSignal } from '@angular/core';

const DOT = 24;
const DASH = DOT * 3;
const INTRA_LETTER_PAUSE = DOT;
const LETTER_PAUSE = DOT * 3;
const WORD_PAUSE = DOT * 7;
const Q = 1;

const morseCode = new Map([
  ['A', ['.', '-']],                // .-
  ['B', ['-', '.', '.', '.']],      // -...
  ['C', ['-', '.', '-', '.']],      // -.-.
  ['D', ['-', '.', '.']],           // -..
  ['E', ['.']],                     // .
  ['F', ['.', '.', '-', '.']],      // ..-.
  ['G', ['-', '-', '.']],           // --.
  ['H', ['.', '.', '.', '.']],      // ....
  ['I', ['.', '.']],                // ..
  ['J', ['.', '-', '-', '-']],      // .---
  ['K', ['-', '.', '-']],           // -.-
  ['L', ['.', '-', '.', '.']],      // .-..
  ['M', ['-', '-']],                // --
  ['N', ['-', '.']],                // -.
  ['O', ['-', '-', '-']],           // ---
  ['P', ['.', '-', '-', '.']],      // .--.
  ['Q', ['-', '-', '.', '-']],      // --.-
  ['R', ['.', '-', '.']],           // .-.
  ['S', ['.', '.', '.']],           // ...
  ['T', ['-']],                     // -
  ['U', ['.', '.', '-']],           // ..-
  ['V', ['.', '.', '.', '-']],      // ...-
  ['W', ['.', '-', '-']],           // .--
  ['X', ['-', '.', '.', '-']],      // -..-
  ['Y', ['-', '.', '-', '-']],      // -.--
  ['Z', ['-', '-', '.', '.']],      // --..
  ['1', ['.', '-', '-', '-', '-']], // .----
  ['2', ['.', '.', '-', '-', '-']], // ..---
  ['3', ['.', '.', '.', '-', '-']], // ...--
  ['4', ['.', '.', '.', '.', '-']], // ....-
  ['5', ['.', '.', '.', '.', '.']], // .....
  ['6', ['-', '.', '.', '.', '.']], // -....
  ['7', ['-', '-', '.', '.', '.']], // --...
  ['8', ['-', '-', '-', '.', '.']], // ---..
  ['9', ['-', '-', '-', '-', '.']], // ----.
  ['0', ['-', '-', '-', '-', '-']], // -----
  [' ', []]
]);

@Injectable({
  providedIn: 'root'
})
export class VibrationService {
  vibrationOn: WritableSignal<boolean> = signal(false);

  enabled = computed(() => {
    return (!isPlatformServer(this._platformId) && ("vibrate" in navigator))
  })

  private _platformId = inject(PLATFORM_ID)

  constructor() {
    this.initVibrationOn()
  }

  initVibrationOn() {
    if (isPlatformServer(this._platformId)) return;

    const n = Boolean(localStorage.getItem('vibrationOn') == 'true');
    this.vibrationOn.set(n);
  }

  setVibrationOn(n: boolean) {
    if (isPlatformServer(this._platformId)) return;

    this.vibrationOn.set(n);
    localStorage.setItem('vibrationOn', n.toString())
  }

  vibrateIOS(style: string = "light") {
    const handler = (window as any).webkit?.messageHandlers?.hapticFeedback;
    if (handler) {
      try {
        handler.postMessage({
          type: 'impact',
          style: style // light / medium / heavy
        });
      } catch { }
    }
  }

  vibrate(pattern: VibratePattern = DOT * Q) {

    if (isPlatformServer(this._platformId) || !this.vibrationOn()) return

    if (this.supportsVibration()) {
      navigator.vibrate(0);
      navigator.vibrate(pattern)
    } else {
      this.vibrateIOS();
    }
  }

  vibrateForSettings = (isEnabled: boolean) => this.vibrate(this.getVibrationPattern(isEnabled ? "ON" : "OFF"));

  vibrateLangToggle = (lang: string) => this.vibrate(this.getVibrationPattern(lang.toUpperCase()))

  getVibrationPattern(text: string) {

    let pattern: VibratePattern = [];

    text.toUpperCase().split('').forEach((char, index, array) => {
      const morse = morseCode.get(char);
      if (morse) {
        morse.forEach((signal, signalIndex) => {
          pattern.push(signal === '.' ? DOT * Q : DASH * Q); // Вібрація для точки або тире
          if (signalIndex < morse.length - 1) {
            pattern.push(INTRA_LETTER_PAUSE * Q); // Пауза між елементами букви
          }
        });

        // Пауза між літерами
        if (index < array.length - 1) {
          pattern.push(LETTER_PAUSE * Q);
        }
      }

      // Пауза між словами
      if (index < array.length - 1 && array[index + 1] === ' ') {
        pattern.push(WORD_PAUSE * Q);
      }
    });

    return pattern;
  }

  supportsVibration(): boolean {
    if (!('vibrate' in navigator)) return false;
    if (typeof navigator.vibrate !== 'function') return false;

    try {
      return navigator.vibrate(0) !== false;
    } catch {
      return false;
    }
  }
}
