import { Component, HostListener, OnInit, ViewChild, inject } from '@angular/core';
import { LangService } from '../../../shared/data-access/lang.service';
import { DialogComponent } from '../../../shared/ui/dialog/dialog.component';

@Component({
  selector: 'lp-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  ngOnInit(): void {
    this.initHotKeys()
  }
  public lang: LangService = inject(LangService);


  @ViewChild('faqDialog') faqDialogComponent!: DialogComponent;
  showHelp = () => this.faqDialogComponent.showDialog();

  @ViewChild('settingsDialog') settingsDialogComponent!: DialogComponent;
  showSettings = () => this.settingsDialogComponent.showDialog();

  hotKeys = new Map<string, Function>()

  initHotKeys() {
    this.hotKeys.set('F1', this.showHelp)
    this.hotKeys.set('F2', this.showSettings)
  }

  @HostListener('window:keydown', ["$event"])
  helpHotKey(event: KeyboardEvent) {
    
    if (this.hotKeys.has(event.key)) {
      event.preventDefault()
      const f: Function = this.hotKeys.get(event.key) as Function;
      f();
    }
  }
}
