import { Component, computed, HostListener, inject, input, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { FileService } from '../../../file/data-access/file.service';
import { LangService } from '../../data-access/lang.service';
import { isPlatformServer } from '@angular/common';

type LaunchParams = {
  files: FileSystemHandle[];
  targetURL: string
}

@Component({
  selector: 'app-file-change',
  templateUrl: './file-change.component.html',
  styleUrl: './file-change.component.scss',
  standalone: false
})
export class FileChangeComponent implements OnInit {
  private platformId = inject(PLATFORM_ID)
  private fs = inject(FileService)
  protected lang = inject(LangService)

  accept = input<string[]>([])
  label = input<string>(this.lang.ph().openFile)

  private input: HTMLInputElement | undefined;
  protected showDragAndDropZone = signal(false);

  private readonly ctrlKey = signal('Ctrl');
  private readonly symbolKey = signal('KeyO');
  private readonly hotKey = computed(() => `${this.ctrlKey()}+${this.symbolKey()}`);
  protected readonly hotKeyHint = computed(() => ` (${this.hotKey().replace('Key', '')})`);

  ngOnInit(): void {
    if (isPlatformServer(this.platformId)) return;

    this.initFileInput();
    this.initializeFileLaunchQueue();
  }

  private fileHandler(file: File | undefined) {
    if (!file) return;

    this.fs.file = file;
  }

  //#region Launch Queue

  private initializeFileLaunchQueue() {
    if ("launchQueue" in window) {
      (window as any).launchQueue.setConsumer(async (launchParams: LaunchParams) => {
        const fileHandle = launchParams.files?.find(f => f.kind === "file") as FileSystemFileHandle | undefined;
        if (!fileHandle) return;

        const file = await fileHandle.getFile();
        this.fileHandler(file);
      });
    }
  }

  //#endregion

  //#region File Input

  protected openFileDialog() {
    if (this.input) this.input.click();
  }

  private onFileSelected(event: any) {
    const file: File = event.target.files[0];

    this.fileHandler(file)
  }

  private initFileInput() {
    this.input = document.createElement('input')

    this.input.type = 'file';
    this.input.accept = this.accept().join(', ');

    this.input.oninput = (e: Event) => {
      this.onFileSelected(e)
    }
  }

  //#endregion

  //#region Drag & Drop

  @HostListener('window:keydown', ['$event'])
  protected handleKeyboardEvent(event: KeyboardEvent) {
    const code = event.ctrlKey ? `${this.ctrlKey()}+${event.code}` : event.code;

    if (code == this.hotKey()) {
      event.preventDefault();

      this.openFileDialog()
    }
  }

  @HostListener('document:dragover', ["$event"])
  protected dragOverHandler = (ev: DragEvent) => {
    ev.preventDefault();

    const dt = ev.dataTransfer;
    if (!dt) return;

    const hasFile =
      dt.items && Array.from(dt.items).some(i => i.kind === 'file');

    const hasText =
      dt.types?.includes('text/plain') ||
      Array.from(dt.items || []).some(i => i.kind === 'string');

    if (hasFile && !hasText) {
      this.showDragAndDropZone.set(true);
    }
  }

  @HostListener('dragleave', ["$event"])
  @HostListener('dragend', ["$event"])
  protected dragLeaveHandler = (ev: DragEvent) => { ev.preventDefault(); this.showDragAndDropZone.set(false) }

  protected dropHandler(ev: DragEvent) {
    ev.preventDefault();

    const file: File | undefined = ev.dataTransfer?.files[0];

    this.fileHandler(file)
  }

  //#endregion
}
