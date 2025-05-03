import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { environment } from '../../../../environments/environment';

type Coordinate = { x: number; y: number };

@Component({
  selector: 'app-chytanka-logo-with-tags',
  standalone: false,

  templateUrl: './chytanka-logo-with-tags.component.html',
  styleUrl: './chytanka-logo-with-tags.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChytankaLogoWithTagsComponent {
  version = environment.version;
  fileTags = input<string[]>([])
  siteTags = input<string[]>([])

  formatTagname(tagname: string) {
    return tagname.replaceAll('.', '').toLowerCase()
  }

  getRandom = (min: number = 10, max: number = 90): number => {
    return Math.random() * (max - min) + min;
  };

  getRandomCoordinates(): Coordinate {
    const x = this.getRandom();
    const y = this.getRandom();

    return { x: parseFloat(x.toFixed(2)), y: parseFloat(y.toFixed(2)) };
  }
}
