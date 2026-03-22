import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ViewerService } from '../../data-access';

@Component({
    selector: 'manga-page',
    templateUrl: './manga-page.component.html',
    styleUrl: './manga-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false,
    host: {
        '[class]': 'viewer.viewModeOption().mode'
    }
})
export class MangaPageComponent {
    viewer = inject(ViewerService);
}
