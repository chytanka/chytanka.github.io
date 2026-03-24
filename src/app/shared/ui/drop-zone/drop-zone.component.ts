import { Component, inject } from '@angular/core';
import { LangService } from '../../data-access/lang.service';

@Component({
  selector: 'drop-zone',
  standalone: false,
  
  templateUrl: './drop-zone.component.html',
  styleUrl: './drop-zone.component.scss'
})
export class DropZoneComponent {
  lang = inject(LangService);
}
