import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-manga-page-even',
    templateUrl: './manga-page-even.component.html',
    styleUrl: './manga-page-even.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class MangaPageEvenComponent {

}
