import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, WritableSignal, inject, signal } from '@angular/core';
import { LangService } from '../../data-access/lang.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  lang = inject(LangService)

  @Output() onToggle: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() title: string = 'Dialog Title'
  @Input() footer: boolean = false
  @Input() closeHeaderButton: boolean = true

  @ViewChild('dialog', { static: true }) dialogRef!: ElementRef;
  dialogElement: WritableSignal<HTMLDialogElement> = signal(document.createElement('dialog'));


  ngAfterViewInit() {
    this.dialogElement.set(this.dialogRef.nativeElement);

    this.dialogElement().onclose = () =>{
      this.onToggle.emit(false)
    }
  }

  closeDialog(event: Event) {
    if (event.target instanceof HTMLDialogElement) {
      (event.target as HTMLDialogElement).close();
    }
  }

  showDialog() {
    this.dialogElement().showModal()
    this.onToggle.emit(true)
  }
}
