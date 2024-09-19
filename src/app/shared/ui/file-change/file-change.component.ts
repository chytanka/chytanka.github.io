import { Component, HostListener, inject, OnInit } from '@angular/core';
import { FileService } from '../../../file/data-access/file.service';
import { Router } from '@angular/router';
import { FILE_PATH } from '../../../app-routing.module';
import { LangService } from '../../data-access/lang.service';
import { DomManipulationService } from '../../data-access';

@Component({
  selector: 'app-file-change',
  templateUrl: './file-change.component.html',
  styleUrl: './file-change.component.scss'
})
export class FileChangeComponent implements OnInit {
  ngOnInit(): void {
    this.initFileInput();
    
    if ("launchQueue" in window) {
      (window as any).launchQueue.setConsumer(async (launchParams: any) => {
        const file: File = launchParams.files[0];
        this.fileHandler(file)
      });
    }
  }

  // should be input
  accept = [".zip", ".cbz", 'application/vnd.comicbook+zip', 'application/zip', '.pdf']

  fs = inject(FileService)
  router = inject(Router)
  lang = inject(LangService)

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    this.fileHandler(file)
  }

  fileHandler(file: File | undefined) {
    if (!file) return;

    this.fs.file = file;

    // should be output
    const t = this.getRouteType(file.type)

    if (t) {
      const url = `/${FILE_PATH}/${t}`;
      this.router.navigateByUrl(url)
    }
  }

  getRouteType(fileType: string): string | undefined {
    if (fileType.search(/zip|cbz/) >= 0) return "zip"
    else if (fileType.includes('pdf')) return "pdf"

    return;
  }
  input = document.createElement('input')

  initFileInput() {
    this.input = document.createElement('input')

    this.input.type = 'file';
    this.input.accept = this.accept.join(', ');

    this.input.oninput = (e: Event) => {
      this.onFileSelected(e)
    }

  }

  openFileDialog() {
    
    this.input.click();
  }
  
  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {

    const code = event.ctrlKey ? `Ctrl+${event.code}` : event.code

    if(code == "Ctrl+KeyO") {
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

  showDragAndDropZone: boolean = false;
}
