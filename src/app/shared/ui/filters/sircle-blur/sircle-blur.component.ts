import { Component, input } from '@angular/core';

interface Offset {
  dx: number;
  dy: number;
}

@Component({
  selector: 'sircle-blur',
  standalone: false,

  templateUrl: './sircle-blur.component.html',
  styleUrl: './sircle-blur.component.scss'
})
export class SircleBlurComponent {
  radius = input(8);
  samples = input(30); // 31 max in Firefox ???

  get offsets(): Offset[] {
    return this.getUniqueOffsets(this.getCircleOffsets(this.samples(), this.radius()));
  }

  get gaussianBlur(): number {
    return Math.abs(this.radius() / 5);
  }

  getCircleOffsets(count: number, radius: number): Offset[] {
    if (radius === 0) return [{ dx: 0, dy: 0 }];

    const offsets: Offset[] = [];
    const angleIncrement = (2 * Math.PI) / count;

    for (let i = 0; i < count; i++) {
      const angle = i * angleIncrement;
      const dx = Math.round(Math.cos(angle) * radius);
      const dy = Math.round(Math.sin(angle) * radius);
      offsets.push({ dx, dy })
    }

    return offsets;
  }

  getUniqueOffsets(array: Offset[]): Offset[] {
    const map = new Map<string, Offset>();
    array.forEach(o => map.set(JSON.stringify(o), o));
    return Array.from(map.values());
  }

  opacity(index: number): number {
    return (100 / this.offsets.length / 100) * 2;
  }
}
