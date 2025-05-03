import { Component, WritableSignal, inject, signal } from '@angular/core';
import { HistoryService } from '../../data-access/history.service';
import { LangService } from '../../../shared/data-access/lang.service';
import { FileHistoryService } from '../../../file/data-access/file-history.service';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrl: './history-list.component.scss',
  standalone: false
})
export class HistoryListComponent {
  public history: HistoryService = inject(HistoryService);
  public fileHistory: FileHistoryService = inject(FileHistoryService);
  lang: LangService = inject(LangService);

  historyItems: WritableSignal<Promise<any[]>> = signal(this.displayHistory() ?? []);
  historyFiles: WritableSignal<Promise<any[]>> = signal(this.displayFilesHistory() ?? []);

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

  async displayFilesHistory() {
    const history = await this.fileHistory.getAllHistory();
    this.getTotalSizeAndCount()

    return history;
  }

  async clearFileHistory() {
    await this.fileHistory.clearHistory();
    this.historyFiles.update(value => this.fileHistory.getAllHistory())
    this.getTotalSizeAndCount()
  }

  async delFileById(id: number) {
    await this.fileHistory.deleteHistoryItem(id);
    this.historyFiles.update(value => this.fileHistory.getAllHistory())
    this.getTotalSizeAndCount()
  }

  fileSize = signal(0);
  fileCount= signal(0);

  async getTotalSizeAndCount() {
    const {count, size} = await this.fileHistory.getTotalSizeAndCount()

    this.fileSize.set(size)
    this.fileCount.set(count)
  }
}
