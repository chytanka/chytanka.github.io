import { isPlatformServer } from '@angular/common';
import { computed, inject, Injectable, PLATFORM_ID, Signal, signal, WritableSignal } from '@angular/core';

const DOT = 40; // Коротка вібрація для точки
const DASH = 80; // Довга вібрація для тире
const INTRA_LETTER_PAUSE = 64; // Пауза між елементами в одній букві
const LETTER_PAUSE = 96; // Пауза між літерами
const WORD_PAUSE = 128; // Пауза між словами

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

  vibrate(pattern: VibratePattern = DOT) {

    if (isPlatformServer(this._platformId) || !this.vibrationOn()) return

    navigator.vibrate(0);
    navigator.vibrate(pattern)
  }

  vibrateForSettings = (isEnabled: boolean) => this.vibrate(this.getVibrationPattern(isEnabled ? "ON" : "OFF"));

  vibrateLangToggle = (lang: string) => this.vibrate(this.getVibrationPattern(lang.toUpperCase()))

  getVibrationPattern(text: string) {

    let pattern: VibratePattern = [];

    text.toUpperCase().split('').forEach((char, index, array) => {
      const morse = morseCode.get(char);
      if (morse) {
        morse.forEach((signal, signalIndex) => {
          pattern.push(signal === '.' ? DOT : DASH); // Вібрація для точки або тире
          if (signalIndex < morse.length - 1) {
            pattern.push(INTRA_LETTER_PAUSE); // Пауза між елементами букви
          }
        });

        // Пауза між літерами
        if (index < array.length - 1) {
          pattern.push(LETTER_PAUSE);
        }
      }

      // Пауза між словами
      if (index < array.length - 1 && array[index + 1] === ' ') {
        pattern.push(WORD_PAUSE);
      }
    });

    return pattern;
  }
}
