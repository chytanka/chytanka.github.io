import { Component, WritableSignal, inject, signal } from '@angular/core';
import { HistoryService } from '../../data-access/history.service';
import { LangService } from '../../../shared/data-access/lang.service';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrl: './history-list.component.scss'
})
export class HistoryListComponent {
  public history: HistoryService = inject(HistoryService);
  lang: LangService = inject(LangService);

  historyItems: WritableSignal<Promise<any[]>> = signal(this.displayHistory() ?? []);

  async displayHistory() {
    const history = await this.history.getAllHistory();

    return history;
  }

  async delById(id: number) {
    await this.history.deleteHistoryItem(id);
    this.historyItems.update(value => this.history.getAllHistory())
  }

  async clearHistory() {
    await this.history.clearHistory();
    this.historyItems.update(value => this.history.getAllHistory())
  }
}
