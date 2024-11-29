import { Component, HostListener, inject, input, OnInit, PLATFORM_ID } from '@angular/core';
import { FileService } from '../../../file/data-access/file.service';
import { Router } from '@angular/router';
import { FILE_PATH } from '../../../app-routing.module';
import { LangService } from '../../data-access/lang.service';
import { isPlatformServer } from '@angular/common';

@Component({
  selector: 'app-file-change',
  templateUrl: './file-change.component.html',
  styleUrl: './file-change.component.scss',
  standalone: false
})
export class FileChangeComponent implements OnInit {
  platformId = inject(PLATFORM_ID)
  fs = inject(FileService)
  router = inject(Router)
  lang = inject(LangService)

  accept = input<string[]>([])
  
  input: HTMLInputElement | undefined;
  showDragAndDropZone: boolean = false;

  ngOnInit(): void {
    if (isPlatformServer(this.platformId)) return;

    this.initFileInput();

    if ("launchQueue" in window) {
      (window as any).launchQueue.setConsumer(async (launchParams: FileSystemFileHandle) => {
        console.log((launchParams as any).files[0]);

        // const file: File = await launchParams.getFile();
        const file: File = (launchParams as any).files[0] as File;
        this.fileHandler(file)
      });
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    this.fileHandler(file)
  }

  fileHandler(file: File | undefined) {
    if (!file) return;

    this.fs.file = file;

    // should be output
    const t = this.getRouteType(file)

    if (t) {
      const url = `/${FILE_PATH}/${t}`;
      this.router.navigateByUrl(url)
    }
  }

  getRouteType(file: File): string | undefined {
    const fileType = file.type || file.name.split('.').pop()?.toLowerCase();

    if (!fileType) return undefined;

    if (fileType.includes('pdf')) return 'pdf';
    if (fileType.includes('mobi')) return 'mobi';
    if (/zip|cbz/.test(fileType)) return 'zip';

    return undefined;
  }

  initFileInput() {
    this.input = document.createElement('input')

    this.input.type = 'file';
    this.input.accept = this.accept().join(', ');

    this.input.oninput = (e: Event) => {
      this.onFileSelected(e)
    }
  }

  openFileDialog() {
    if (this.input) this.input.click();
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {

    const code = event.ctrlKey ? `Ctrl+${event.code}` : event.code

    if (code == "Ctrl+KeyO") {
      event.preventDefault();

      this.openFileDialog()
    }
  }

  @HostListener('document:dragover', ["$event"])
  dragOverHandler = (ev: DragEvent) => { ev.preventDefault(); this.showDragAndDropZone = true }

  @HostListener('dragleave', ["$event"])
  @HostListener('dragend', ["$event"])
  dragLeaveHandler = (ev: DragEvent) => { ev.preventDefault(); this.showDragAndDropZone = false }

  dropHandler(ev: DragEvent) {
    ev.preventDefault();

    const file: File | undefined = ev.dataTransfer?.files[0];

    this.fileHandler(file)
  }
}
