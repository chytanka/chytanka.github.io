import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild, WritableSignal, inject, signal } from '@angular/core';
import { LangService } from '../../data-access/lang.service';
import { DOCUMENT } from '@angular/common';
import { VibrationService } from '../../data-access/vibration.service';
import { GamepadService } from '../../data-access/gamepad.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class DialogComponent {
  lang = inject(LangService)
  vibration = inject(VibrationService);
  gamepad = inject(GamepadService);

  private readonly document = inject(DOCUMENT);

  @Output() onToggle: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() title: string = 'Dialog Title'
  @Input() footer: boolean = false
  @Input() closeHeaderButton: boolean = true

  @ViewChild('dialog', { static: true }) dialogRef!: ElementRef;
  dialogElement: WritableSignal<HTMLDialogElement> = signal(this.document.createElement('dialog'));


  ngAfterViewInit() {
    this.dialogElement.set(this.dialogRef.nativeElement);

    this.dialogElement().onclose = () => {
      this.onToggle.emit(false)
      this.vibration.vibrate([0, 10, 20]);
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.dialogElement().close();
      }
    });
  }

  closeDialog(event: Event) {
    if (event.target instanceof HTMLDialogElement) {
      (event.target as HTMLDialogElement).close();
    }
  }

  showDialog() {
    this.dialogElement().showModal()
    this.onToggle.emit(true)
    this.vibration.vibrate(10);
  }
}
