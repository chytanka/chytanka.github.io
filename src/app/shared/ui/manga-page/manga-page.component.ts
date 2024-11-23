import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'manga-page',
    templateUrl: './manga-page.component.html',
    styleUrl: './manga-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class MangaPageComponent {

}
