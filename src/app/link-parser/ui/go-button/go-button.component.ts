import { Component, input } from '@angular/core';
import { Phrases } from '../../../shared/utils/phrases';

@Component({
  selector: 'app-go-button',
  standalone: false,

  templateUrl: './go-button.component.html',
  styleUrl: './go-button.component.scss'
})
export class GoButtonComponent {
  data = input<any | null>();
  ph = input.required<Phrases>();
}
