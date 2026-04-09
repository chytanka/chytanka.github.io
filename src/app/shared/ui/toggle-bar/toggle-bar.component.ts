import { Component, input, output } from '@angular/core';
import { LangService } from '../../data-access';
import { ToggleBarOption } from './toggle-bar.model';

@Component({
  selector: 'app-toggle-bar',
  standalone: false,

  templateUrl: './toggle-bar.component.html',
  styleUrl: './toggle-bar.component.scss'
})
export class ToggleBarComponent<T> {
  options = input.required<ToggleBarOption<T>[]>();
  value = input.required<T>();
  seed = input<string>('seed');

  valueChange = output<T>();

  onChange(value: T) {
    this.valueChange.emit(value)
  }

  constructor(public lang: LangService) {
  }
}
