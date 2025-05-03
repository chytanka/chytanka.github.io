import { ChangeDetectionStrategy, Component, computed, HostBinding, input, Input, signal } from '@angular/core';

@Component({
  selector: 'app-warm-filter',
  templateUrl: './warm-filter.component.html',
  styleUrl: './warm-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class WarmFilterComponent {

  kelvin = input<number>(5000)

  matrixKelvin = computed(() => {
    const { r, g, b } = this.kelvinToRgbMatrix(this.kelvin())

    return `${r} 0 0 0 0 0 ${g} 0 0 0 0 0 ${b} 0 0 0 0 0 1 0`
  })




  kelvinToRgbMatrix(kelvin: number): { r: number, g: number, b: number } {
    if (kelvin < 1000 || kelvin > 6500) {
      throw new Error("Kelvin value must be between 1000 and 6500.");
    }

    // Нормалізація значення K
    const temperature = kelvin / 100;

    // Розрахунок червоного компонента
    const red = temperature <= 66
      ? 255
      : Math.min(255, 329.698727446 * Math.pow(temperature - 60, -0.1332047592));

    // Розрахунок зеленого компонента
    const green = temperature <= 66
      ? Math.min(255, 99.4708025861 * Math.log(temperature) - 161.1195681661)
      : Math.min(255, 288.1221695283 * Math.pow(temperature - 60, -0.0755148492));

    // Розрахунок синього компонента
    const blue = temperature >= 66
      ? 255
      : temperature <= 19
        ? 0
        : Math.min(255, 138.5177312231 * Math.log(temperature - 10) - 305.0447927307);

    // Перетворення значень у діапазон [0, 1] для фільтра feColorMatrix
    const normalize = (value: number) => value / 255;

    return { r: normalize(red), g: normalize(green), b: normalize(blue) };
  }

}
