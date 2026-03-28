import { Component, WritableSignal, computed, inject, signal } from '@angular/core';
import { HistoryService } from '../../data-access/history.service';
import { LangService } from '../../../shared/data-access/lang.service';
import { FileHistoryService } from '../../../file/data-access/file-history.service';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss', '../../../shared/ui/@styles/details.scss'],
  standalone: false
})
export class HistoryListComponent {
  public history: HistoryService = inject(HistoryService);
  public fileHistory: FileHistoryService = inject(FileHistoryService);
  lang: LangService = inject(LangService);

  historyItems: WritableSignal<any[]> = signal([]);
  historyFiles: WritableSignal<any[]> = signal([]);

  historyItemsSites = computed(() => {
    const sites = this.historyItems().map(item => item.site);
    const unique = [...new Set(sites.flat())];
    return unique;
  });
  historySitesFilter = signal('all');

  setHistorySitesFilter(site: string = 'all') {
    this.historySitesFilter.set(site);
  }

  historyItemsFiltered = computed(() => {
    const filter = this.historySitesFilter();
    if (filter === 'all') {
      return this.historyItems();
    }
    return this.historyItems().filter(item => item.site.includes(filter));
  });

  async displayHistory() {
    const history = await this.history.getAllHistory();

    return history;
  }

  async ngOnInit() {
    this.historyItems.set(await this.displayHistory());
    this.historyFiles.set(await this.displayFilesHistory());
  }

  async delById(id: number) {
    await this.history.deleteHistoryItem(id);
    this.historyItems.set(await this.history.getAllHistory());
  }

  async clearHistory() {
    await this.history.clearHistory();
    this.historyItems.set(await this.history.getAllHistory());
  }

  async displayFilesHistory() {
    const history = await this.fileHistory.getAllHistory();
    this.getTotalSizeAndCount()

    return history;
  }

  async clearFileHistory() {
    await this.fileHistory.clearHistory();
    this.historyFiles.set(await this.fileHistory.getAllHistory());
    this.getTotalSizeAndCount()
  }

  async delFileById(id: number) {
    await this.fileHistory.deleteHistoryItem(id);
    this.historyFiles.set(await this.fileHistory.getAllHistory());
    this.getTotalSizeAndCount()
  }

  fileSize = signal(0);
  fileCount = signal(0);

  async getTotalSizeAndCount() {
    const { count, size } = await this.fileHistory.getTotalSizeAndCount()

    this.fileSize.set(size)
    this.fileCount.set(count)
  }
}
