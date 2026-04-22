import { Component, inject, signal } from '@angular/core';
import { ExtensionService } from './extension.service';

@Component({
  selector: 'app-extension-button',
  imports: [],
  providers: [ExtensionService],
  templateUrl: './extension-button.component.html',
  styleUrl: './extension-button.component.scss'
})
export class ExtensionButtonComponent  {
  extension: ExtensionService = inject(ExtensionService);

  ngOnInit() {
    this.extension.detectExtension();
  }

}