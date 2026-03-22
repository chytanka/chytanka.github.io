import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ViewerService } from '../../data-access';

@Component({
    selector: 'app-manga-page-even',
    templateUrl: './manga-page-even.component.html',
    styleUrl: './manga-page-even.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false,
    host: {
        '[class]': 'viewer.viewModeOption().mode'
    }
})
export class MangaPageEvenComponent {
    viewer = inject(ViewerService);
}
