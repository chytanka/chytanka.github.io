import { Component, HostListener, OnInit, ViewChild, inject } from '@angular/core';
import { LangService } from '../../../shared/data-access/lang.service';
import { DialogComponent } from '../../../shared/ui/dialog/dialog.component';
import { DomManipulationService } from '../../../shared/data-access';

@Component({
    selector: 'lp-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    standalone: false
})
export class HeaderComponent implements OnInit {
  ngOnInit(): void {
    this.initHotKeys()
  }

  public lang: LangService = inject(LangService);
  private dom: DomManipulationService = inject(DomManipulationService)

  @ViewChild('faqDialog') faqDialogComponent!: DialogComponent;
  showHelp = () => this.faqDialogComponent.showDialog();

  @ViewChild('settingsDialog') settingsDialogComponent!: DialogComponent;
  showSettings = () => this.settingsDialogComponent.showDialog();

  @ViewChild('historyDialog') historyDialogComponent!: DialogComponent;
  showHistory = () => this.historyDialogComponent.showDialog();

  hotKeys = new Map<string, Function>()

  initHotKeys() {
    this.hotKeys.set('F1', this.showHelp)
    this.hotKeys.set('F2', this.showSettings)
    this.hotKeys.set('Ctrl+KeyH', this.showHistory)
  }

  @HostListener('window:keydown', ["$event"])
  helpHotKey(event: KeyboardEvent) {
    this.dom.setHotkeys(event, this.hotKeys)
  }
}
